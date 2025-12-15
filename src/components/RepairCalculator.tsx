"use client"

import { useMemo, useState } from 'react'
import { repairPricing, RepairCategory, RepairPriceItem, SymptomKey, symptomToCategories, estimateReleaseYear, formatPrice } from '@/lib/repair'
import { motion } from 'framer-motion'
import { motionTimings } from '@/lib/motion'
import Button from './ui/Button'
import SectionHeader from './ui/SectionHeader'
import { trackSelectPromotion, trackGenerateLead, trackViewPromotion } from '@/lib/tracking'
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, categoriesToShow])

  const yearHint = useMemo(() => (selected ? estimateReleaseYear(selected.model) : null), [selected])
  const estimateText = estimate.min === estimate.max ? formatPrice(estimate.min) : `${formatPrice(estimate.min)} ~ ${formatPrice(estimate.max)}`

  return (
    <section id="repair" className="section-padding container-padding">
      <div className="max-w-3xl mx-auto">
        <motion.div className="mb-10 text-center" variants={{ initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } }} initial="initial" whileInView="animate" transition={motionTimings.soft} onViewportEnter={() => trackViewPromotion({ section: 'repair_calc', label: '維修試算器' })}>
          <SectionHeader
            title="iPhone 維修試算器"
            description="士林專業維修：電池更換・螢幕維修・快速報價｜三步完成試算"
            as="h2"
          />
        </motion.div>

        {/* Step 1: 選擇機型 */}
        <div className="glass-panel mb-6">
          <div className="p-6 md:p-8 space-y-4 md:space-y-5">
            <div className="flex items-center justify-between">
              <div className="text-[15px] font-bold text-neutral-900">步驟 1：選擇機型</div>
              {selected && <div className="text-xs font-medium text-neutral-500">{selected.model}{yearHint ? `（約 ${yearHint} 年）` : ''}</div>}
            </div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="輸入型號，如 iPhone 15 Pro"
              className="input-ios w-full font-medium placeholder:text-neutral-400 text-neutral-900"
            />
            <div className="flex flex-wrap gap-2.5">
              {suggestions.map((s) => (
                <button
                  key={s.model}
                  type="button"
                  className={`px-4 py-2 text-[13px] font-medium rounded-full transition-all duration-300 ${
                    selected?.model === s.model 
                      ? 'bg-neutral-900 text-white shadow-lg scale-[1.02]' 
                      : 'glass-control text-neutral-600 hover:text-neutral-900 hover:bg-white/80'
                  }`}
                  onClick={() => { setSelected(s); setStep(2); trackSelectPromotion({ section: 'repair_calc', action: 'option_select', target: 'model', label: s.model, context: 'mobile' }) }}
                >
                  {s.model}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 2: 症狀與建議 */}
        <div className="glass-panel mb-6">
          <div className="p-6 md:p-8 space-y-4 md:space-y-5">
            <div className="flex items-center justify-between">
              <div className="text-[15px] font-bold text-neutral-900">步驟 2：選擇症狀</div>
              {selected && <div className="text-xs font-medium text-neutral-500">已選：{selected.model}</div>}
            </div>
            <div className="relative">
              <select
                value={symptom}
                onChange={(e) => { setSymptom(e.target.value as SymptomKey); setOverrideCategory(null); trackSelectPromotion({ section: 'repair_calc', action: 'option_select', target: 'symptom', label: e.target.value }) }}
                className="input-ios w-full appearance-none font-medium text-neutral-900"
              >
                {SYMPTOMS.map((s) => (
                  <option key={s.key} value={s.key}>{s.label}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
            <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider">建議維修項目（可切換）：</div>
            <div className="flex flex-wrap gap-2.5">
              {CATEGORIES.filter(c => autoCategories.includes(c.key)).map((c) => (
                <button
                  key={c.key}
                  type="button"
                  className={`px-4 py-2 text-[13px] font-medium rounded-full transition-all duration-300 ${
                    (!overrideCategory && autoCategories.includes(c.key) || overrideCategory===c.key)
                      ? 'bg-neutral-900 text-white shadow-lg scale-[1.02]' 
                      : 'glass-control text-neutral-600 hover:text-neutral-900 hover:bg-white/80'
                  }`}
                  onClick={() => setOverrideCategory(c.key)}
                >
                  {c.label}
                </button>
              ))}
            </div>
            {includesOther && (
              <div className="flex items-start gap-3 text-[13px] text-amber-700 bg-amber-50/80 border border-amber-100 rounded-[16px] p-4">
                <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
                <div className="font-medium leading-relaxed">
                  「整新/換機（參考）」為整新或更換整機的參考價。實際會先免費檢測，若可單項維修（如充電模組/喇叭/主機板級），通常費用會明顯低於此參考價。
                </div>
              </div>
            )}
            {selected && (
              <div className="flex items-center justify-between pt-2">
                <div className="text-[15px] text-neutral-600 font-medium">參考價格</div>
                <div className="text-xl font-bold text-neutral-900">{estimate.min ? estimateText : '-'}</div>
              </div>
            )}
            <div className="flex justify-end pt-2">
              <Button disabled={!selected} onClick={() => { setStep(3); trackSelectPromotion({ section: 'repair_calc', action: 'step_next', target: 'to_step_3', label: 'next' }) }} className="w-full md:w-auto">下一步</Button>
            </div>
          </div>
        </div>

        {/* Step 3: 價格與諮詢 */}
        <div className="glass-panel">
          <div className="p-6 md:p-8 space-y-5 md:space-y-6">
            <div className="text-[15px] font-bold text-neutral-900">步驟 3：查看預估並聯絡我們</div>
            <div className="bg-white/40 rounded-[20px] p-5 space-y-3 border border-white/40">
              <div className="flex justify-between items-center text-[15px]">
                <span className="text-neutral-500 font-medium">機型</span>
                <span className="text-neutral-900 font-semibold">{selected?.model || '—'}{yearHint ? `（約 ${yearHint} 年）` : ''}</span>
              </div>
              <div className="flex justify-between items-center text-[15px]">
                <span className="text-neutral-500 font-medium">症狀</span>
                <span className="text-neutral-900 font-semibold">{SYMPTOMS.find(s=>s.key===symptom)?.label}</span>
              </div>
              <div className="flex justify-between items-center text-[15px]">
                <span className="text-neutral-500 font-medium">項目</span>
                <span className="text-neutral-900 font-semibold text-right">{(overrideCategory ? [overrideCategory] : autoCategories).map(k => CATEGORIES.find(c=>c.key===k)?.label).join('、')}</span>
              </div>
              <div className="pt-3 mt-3 border-t border-neutral-200/50 flex justify-between items-center">
                <span className="text-neutral-500 font-medium">預估價格</span>
                <span className="text-2xl font-bold text-neutral-900">{estimate.min ? estimateText : '-'}</span>
              </div>
            </div>
              {(overrideCategory === 'other' || (!overrideCategory && autoCategories.includes('other'))) && (
                <div className="flex items-start gap-3 text-[13px] text-amber-700 bg-amber-50/80 border border-amber-100 rounded-[16px] p-4">
                  <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
                  <div className="font-medium leading-relaxed">
                    此價格為整新或換機的「參考上限」。實際多以單項維修為主，以降低費用；建議先透過 LINE 提交症狀照片，技師將回覆更精準的評估與時程。
                  </div>
                </div>
              )}
            <Button
              className="w-full motion-hover-pop text-base py-4"
              onClick={() => {
                trackGenerateLead({ section: 'repair_calc', action: 'cta_click', target: 'line', label: 'send_inquiry', model: selected?.model, symptom, suggested: (overrideCategory ? [overrideCategory] : autoCategories), estimateMin: estimate.min, estimateMax: estimate.max })
                const suggested = (overrideCategory ? [overrideCategory] : autoCategories).map(k => CATEGORIES.find(c=>c.key===k)?.label).join('、')
                const message = [
                  '【維修試算】',
                  `機型：${selected?.model || ''}`,
                  `症狀：${SYMPTOMS.find(s=>s.key===symptom)?.label}`,
                  `項目：${suggested}`,
                  `預估價格：${estimate.min ? estimateText : '-'}`,
                  '想了解：時程／實際報價／到府收送是否可行',
                  '來源：FixMaster 官網 試算器'
                ].join('\n')
                const lineId = '@fixmaster'
                const url = `https://line.me/R/oaMessage/${encodeURIComponent(lineId)}/?${encodeURIComponent(message)}`
                window.open(url, '_blank')
              }}
              disabled={!selected}
            >
              透過 LINE 詢問/預約
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
