"use client"

import { useMemo, useState } from 'react'
import { repairPricing, RepairCategory, RepairPriceItem, SymptomKey, symptomToCategories, estimateReleaseYear, formatPrice } from '@/lib/repair'
import { motion } from 'framer-motion'
import { motionTimings } from '@/lib/motion'
import Button from './ui/Button'
import SectionHeader from './ui/SectionHeader'
import { trackSelectPromotion, trackGenerateLead, trackViewPromotion } from '@/lib/tracking'
import { 
  AlertTriangle, 
  Smartphone, 
  Battery, 
  Camera, 
  Wifi, 
  Mic, 
  Zap, 
  Cpu, 
  Droplets, 
  Monitor,
  Check
} from 'lucide-react'

const SYMPTOMS: { key: SymptomKey; label: string; icon: any }[] = [
  { key: 'crackedFront', label: '正面螢幕破裂', icon: Smartphone },
  { key: 'crackedBack', label: '背板玻璃破裂', icon: Smartphone },
  { key: 'noDisplay', label: '黑屏/顯示異常', icon: Monitor },
  { key: 'touchIssue', label: '觸控失靈/亂跳', icon:  Zap},
  { key: 'batteryDrain', label: '耗電快/膨脹', icon: Battery },
  { key: 'cameraBlur', label: '相機模糊/抖動', icon: Camera },
  { key: 'chargeIssue', label: '無法充電/接觸不良', icon: Zap },
  { key: 'noPower', label: '無法開機', icon: Cpu },
  { key: 'waterDamage', label: '進水/受潮', icon: Droplets },
]

const CATEGORIES: { key: RepairCategory; label: string }[] = [
  { key: 'frontGlass', label: '正面螢幕' },
  { key: 'backGlass', label: '背板玻璃' },
  { key: 'displayModule', label: '螢幕總成' },
  { key: 'battery', label: '電池' },
  { key: 'rearCamera', label: '後置相機' },
  { key: 'other', label: '整新/換機（參考）' },
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
        {step >= 2 && (
          <motion.div 
            className="glass-panel mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={motionTimings.soft}
          >
            <div className="p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="text-[15px] font-bold text-neutral-900">步驟 2：選擇症狀</div>
              {selected && <div className="text-xs font-medium text-neutral-500">已選：{selected.model}</div>}
            </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {SYMPTOMS.map((s) => {
                  const isSelected = symptom === s.key
                  return (
                    <button
                      key={s.key}
                      type="button"
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 active:scale-95 ${
                        isSelected
                          ? 'bg-neutral-900 border-neutral-900 text-white shadow-md scale-[1.02]'
                          : 'bg-white/40 border-white/60 text-neutral-600 hover:bg-white/80 hover:border-white'
                      }`}
                      onClick={() => { setSymptom(s.key); setOverrideCategory(null); trackSelectPromotion({ section: 'repair_calc', action: 'option_select', target: 'symptom', label: s.label }) }}
                    >
                      <s.icon className={`w-6 h-6 mb-2 ${isSelected ? 'text-white' : 'text-neutral-500'}`} />
                      <span className="text-xs font-bold text-center">{s.label}</span>
                    </button>
                  )
                })}
              </div>

              <div className="space-y-3 pt-2">
            <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider">建議維修項目（可切換）：</div>
            <div className="flex flex-wrap gap-2.5">
              {CATEGORIES.filter(c => autoCategories.includes(c.key)).map((c) => (
                <button
                  key={c.key}
                  type="button"
                      className={`px-4 py-2 text-[13px] font-medium rounded-full transition-all duration-300 flex items-center gap-1.5 ${
                    (!overrideCategory && autoCategories.includes(c.key) || overrideCategory===c.key)
                      ? 'bg-neutral-900 text-white shadow-lg scale-[1.02]' 
                      : 'glass-control text-neutral-600 hover:text-neutral-900 hover:bg-white/80'
                  }`}
                  onClick={() => setOverrideCategory(c.key)}
                >
                      {((!overrideCategory && autoCategories.includes(c.key)) || overrideCategory===c.key) && <Check className="w-3 h-3" />}
                  {c.label}
                </button>
              ))}
                </div>
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
          </motion.div>
        )}

        {/* Step 3: 價格與諮詢 */}
        {step >= 3 && (
          <motion.div 
            className="glass-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={motionTimings.soft}
          >
            <div className="p-6 md:p-8 space-y-6">
            <div className="text-[15px] font-bold text-neutral-900">步驟 3：查看預估並聯絡我們</div>
              
              {/* 收據樣式卡片 */}
              <div className="relative bg-white shadow-sm border border-neutral-200 rounded-2xl overflow-hidden">
                {/* 頂部裝飾條 */}
                <div className="h-1.5 w-full bg-[repeating-linear-gradient(45deg,#171717,#171717_10px,#ffffff_10px,#ffffff_20px)] opacity-20" />
                
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start pb-4 border-b border-dashed border-neutral-200">
                    <div>
                      <p className="text-xs text-neutral-500 uppercase tracking-wider font-semibold mb-1">估價單</p>
                      <h3 className="text-lg font-bold text-neutral-900">{selected?.model}</h3>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-2.5 py-1 bg-green-50 text-green-700 text-[10px] font-bold rounded-full uppercase tracking-wider border border-green-100">Estimated</span>
                    </div>
                  </div>

                  <div className="space-y-3.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">故障症狀</span>
                      <span className="font-medium text-neutral-900">{SYMPTOMS.find(s=>s.key===symptom)?.label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">維修項目</span>
                      <span className="font-medium text-neutral-900 text-right">
                        {(overrideCategory ? [overrideCategory] : autoCategories).map(k => CATEGORIES.find(c=>c.key===k)?.label).join('、')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">檢測費</span>
                      <span className="font-medium text-neutral-900">$0</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-200 flex justify-between items-end">
                    <div>
                      <p className="text-xs text-neutral-500 mb-0.5">預估總額</p>
                      <p className="text-[10px] text-neutral-400">含工帶料・90天保固</p>
                    </div>
                    <div className="text-2xl font-bold text-neutral-900 tracking-tight">
                      {estimate.min ? estimateText : '-'}
              </div>
              </div>
              </div>
                
                {/* 底部鋸齒裝飾 (CSS 模擬) */}
                <div className="h-3 bg-[radial-gradient(circle_at_10px_0,_transparent_0,_transparent_6px,_#ffffff_6px)] bg-[size:20px_20px] border-t border-transparent -mt-1 relative z-10" />
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
                className="w-full motion-hover-pop text-base py-4 shadow-lg"
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
                傳送估價單並預約 (LINE)
            </Button>
          </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
