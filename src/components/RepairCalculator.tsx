"use client"

import { useMemo, useState } from 'react'
import { repairPricing, RepairCategory, RepairPriceItem, SymptomKey, symptomToCategories, estimateReleaseYear, formatPrice } from '@/lib/repair'
import { motion } from 'framer-motion'
import { motionTimings } from '@/lib/motion'
import Button from './ui/Button'
import { trackSelectPromotion, trackGenerateLead } from '@/lib/tracking'
import { AlertTriangle } from 'lucide-react'

const CATEGORIES: { key: RepairCategory; label: string }[] = [
  { key: 'frontGlass', label: '正面螢幕' },
  { key: 'backGlass', label: '背板玻璃' },
  { key: 'displayModule', label: '螢幕總成' },
  { key: 'battery', label: '電池' },
  { key: 'rearCamera', label: '後置相機' },
  { key: 'other', label: '整新/換機（參考）' },
]

const SYMPTOMS: { key: SymptomKey; label: string }[] = [
  { key: 'crackedFront', label: '正面玻璃破裂' },
  { key: 'crackedBack', label: '背板玻璃破裂' },
  { key: 'noDisplay', label: '黑屏/無法顯示' },
  { key: 'touchIssue', label: '觸控失靈/延遲' },
  { key: 'batteryDrain', label: '耗電快/電池異常' },
  { key: 'cameraBlur', label: '相機模糊/抖動' },
  { key: 'chargeIssue', label: '無法充電/Type-C 異常' },
  { key: 'noPower', label: '無法開機' },
  { key: 'waterDamage', label: '進水/潮濕' },
]

const HOT_MODELS = [
  'iPhone 17', 'iPhone 17 Pro', 'iPhone 16', 'iPhone 15 Pro', 'iPhone 14', 'iPhone 13'
]

export default function RepairCalculator() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<RepairPriceItem | null>(null)
  const [symptom, setSymptom] = useState<SymptomKey>('crackedFront')
  const [overrideCategory, setOverrideCategory] = useState<RepairCategory | null>(null)
  const [pickup, setPickup] = useState<boolean>(false)

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return repairPricing.filter(r => HOT_MODELS.includes(r.model)).slice(0, 6)
    return repairPricing.filter((item) => item.model.toLowerCase().includes(q)).slice(0, 8)
  }, [query])

  const autoCategories = useMemo(() => symptomToCategories[symptom], [symptom])
  const categoriesToShow = overrideCategory ? [overrideCategory] : autoCategories
  const includesOther = categoriesToShow.includes('other')

  const estimate = useMemo(() => {
    if (!selected) return { min: 0, max: 0 }
    const values = categoriesToShow.map((c) => selected.prices[c]).filter(Boolean) as number[]
    if (values.length === 0) return { min: 0, max: 0 }
    return { min: Math.min(...values), max: Math.max(...values) }
  }, [selected, categoriesToShow])

  const yearHint = useMemo(() => (selected ? estimateReleaseYear(selected.model) : null), [selected])
  const estimateText = estimate.min === estimate.max ? formatPrice(estimate.min) : `${formatPrice(estimate.min)} ~ ${formatPrice(estimate.max)}`

  const suggestedLabel = (overrideCategory ? [overrideCategory] : autoCategories)
    .map(k => CATEGORIES.find(c=>c.key===k)?.label)
    .join('、')

  const buildMessage = () => {
    return [
      '【維修試算】',
      `機型：${selected?.model || ''}`,
      `症狀：${SYMPTOMS.find(s=>s.key===symptom)?.label}`,
      `項目：${suggestedLabel}`,
      `預估價格：${estimate.min ? estimateText : '-'}`,
      pickup ? '需求：到府收送' : '需求：到店／可另詢到府收送',
      '來源：FixMaster 官網 試算器'
    ].join('\n')
  }

  const goStep = (next: 1 | 2 | 3) => {
    setStep(next)
    try { window.scrollTo({ top: (document.getElementById('repair')?.offsetTop || 0) - 24, behavior: 'smooth' }) } catch {}
  }

  const resetAll = () => {
    setStep(1)
    setQuery('')
    setSelected(null)
    setSymptom('crackedFront')
    setOverrideCategory(null)
    setPickup(false)
  }

  return (
    <section id="repair" className="section-padding container-padding">
      <div className="max-w-3xl mx-auto">
        <motion.div className="mb-6 text-center" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={motionTimings.soft}>
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">維修試算器（行動優化）</h2>
          <p className="text-neutral-600 mt-2">三步完成試算：選機型 → 選症狀 → 查看預估與詢問</p>
        </motion.div>

        {/* Step 1: 選擇機型 */}
        <div className="glass-panel p-1 mb-5">
          <div className="glass-content p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-neutral-900">步驟 1：選擇機型</div>
              <div className="flex items-center gap-3 text-xs text-neutral-500">
                {selected && <span>{selected.model}{yearHint ? `（約 ${yearHint} 年）` : ''}</span>}
                {selected && (
                  <button type="button" className="underline hover:text-neutral-900" onClick={resetAll}>重設</button>
                )}
              </div>
            </div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="輸入型號，如 iPhone 15 Pro"
              className="w-full rounded-xl border border-white/40 bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-accent-500"
            />
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s.model}
                  type="button"
                  className={`glass-control px-3 py-1 text-sm ${selected?.model === s.model ? 'shadow-[var(--brand-glow)]' : ''}`}
                  onClick={() => { setSelected(s); goStep(2); trackSelectPromotion({ context: 'repair_calc_mobile', model: s.model }) }}
                >
                  {s.model}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 2: 症狀與建議 */}
        <div className="glass-panel p-1 mb-5">
          <div className="glass-content p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-neutral-900">步驟 2：選擇症狀</div>
              {selected && <div className="text-xs text-neutral-500">已選：{selected.model}</div>}
            </div>
            <select
              value={symptom}
              onChange={(e) => { setSymptom(e.target.value as SymptomKey); setOverrideCategory(null) }}
              className="w-full rounded-xl border border-white/40 bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-accent-500"
            >
              {SYMPTOMS.map((s) => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </select>
            <div className="text-xs text-neutral-500">建議維修項目（可切換）：</div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.filter(c => autoCategories.includes(c.key)).map((c) => (
                <button
                  key={c.key}
                  type="button"
                  className={`glass-control px-3 py-1 text-sm ${(!overrideCategory && autoCategories.includes(c.key) || overrideCategory===c.key) ? 'shadow-[var(--brand-glow)]' : ''}`}
                  onClick={() => setOverrideCategory(c.key)}
                >
                  {c.label}
                </button>
              ))}
            </div>
            {includesOther && (
              <div className="flex items-start gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-3">
                <AlertTriangle className="h-4 w-4 mt-0.5" />
                <div>
                  「整新/換機（參考）」為整新或更換整機的參考價。實際會先免費檢測，若可單項維修（如充電模組/喇叭/主機板級），通常費用會明顯低於此參考價。
                </div>
              </div>
            )}
            {selected && (
              <div className="text-sm text-neutral-700">
                參考價格：<span className="font-semibold text-neutral-900">{estimate.min ? estimateText : '-'}</span>
              </div>
            )}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <label className="inline-flex items-center gap-2 text-sm text-neutral-700">
                <input type="checkbox" checked={pickup} onChange={(e)=>setPickup(e.target.checked)} />
                到府收送需求
              </label>
              <Button disabled={!selected} onClick={() => goStep(3)}>下一步</Button>
            </div>
          </div>
        </div>

        {/* Step 3: 價格與諮詢 */}
        <div className="glass-panel p-1">
          <div className="glass-content p-4 space-y-4">
            <div className="text-sm font-semibold text-neutral-900">步驟 3：查看預估並聯絡我們</div>
            <div className="text-sm text-neutral-700">
              <div><span className="text-neutral-500">機型：</span>{selected?.model || '—'}{yearHint ? `（約 ${yearHint} 年）` : ''}</div>
              <div><span className="text-neutral-500">症狀：</span>{SYMPTOMS.find(s=>s.key===symptom)?.label}</div>
              <div><span className="text-neutral-500">項目：</span>{suggestedLabel}</div>
              <div><span className="text-neutral-500">預估價格：</span><span className="font-semibold text-neutral-900">{estimate.min ? estimateText : '-'}</span></div>
              {(overrideCategory === 'other' || (!overrideCategory && autoCategories.includes('other'))) && (
                <div className="mt-2 flex items-start gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-3">
                  <AlertTriangle className="h-4 w-4 mt-0.5" />
                  <div>
                    此價格為整新或換機的「參考上限」。實際多以單項維修為主，以降低費用；建議先透過 LINE 提交症狀照片，技師將回覆更精準的評估與時程。
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(buildMessage())
                    } catch {}
                  }}
                  disabled={!selected}
                >
                  複製明細
                </Button>
                <Button
                  variant="outline"
                  onClick={async () => {
                    const msg = buildMessage()
                    if (navigator.share) {
                      try { await navigator.share({ title: '維修試算', text: msg }) } catch {}
                    }
                  }}
                  disabled={!selected}
                >
                  分享
                </Button>
              </div>
              <Button
                className="motion-hover-pop"
                onClick={() => {
                  trackGenerateLead({ context: 'repair_calc_mobile', model: selected?.model, symptom, suggested: (overrideCategory ? [overrideCategory] : autoCategories), estimateMin: estimate.min, estimateMax: estimate.max, pickup })
                  const lineId = '@fixmaster'
                  const url = `https://line.me/R/oaMessage/${encodeURIComponent(lineId)}/?${encodeURIComponent(buildMessage())}`
                  window.open(url, '_blank')
                }}
                disabled={!selected}
              >
                透過 LINE 詢問/預約
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile sticky summary */}
        {selected && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-2rem)] max-w-3xl md:hidden">
            <div className="glass-panel p-1">
              <div className="glass-content px-4 py-3 flex items-center justify-between gap-3">
                <div className="text-xs text-neutral-700">
                  <div className="font-semibold text-neutral-900">{selected.model}</div>
                  <div>{SYMPTOMS.find(s=>s.key===symptom)?.label}・{estimate.min ? estimateText : '-'}</div>
                </div>
                <div className="flex gap-2">
                  {step < 3 && (
                    <Button size="sm" onClick={() => goStep(3)}>下一步</Button>
                  )}
                  <Button size="sm" variant="outline" onClick={resetAll}>重設</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
