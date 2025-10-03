"use client"

import { useMemo, useState } from 'react'
import { repairPricing, RepairCategory, RepairPriceItem, SymptomKey, symptomToCategories, estimateReleaseYear, formatPrice } from '@/lib/repair'
import { motion } from 'framer-motion'
import { motionTimings } from '@/lib/motion'
import Button from './ui/Button'
import { trackSelectPromotion, trackGenerateLead } from '@/lib/tracking'

const CATEGORIES: { key: RepairCategory; label: string }[] = [
  { key: 'frontGlass', label: '正面螢幕' },
  { key: 'backGlass', label: '背板玻璃' },
  { key: 'displayModule', label: '螢幕總成' },
  { key: 'battery', label: '電池' },
  { key: 'rearCamera', label: '後置相機' },
  { key: 'other', label: '其他損壞' },
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

export default function RepairCalculator() {
  const [query, setQuery] = useState('')
  const [symptom, setSymptom] = useState<SymptomKey>('crackedFront')
  const [category, setCategory] = useState<RepairCategory>('frontGlass')
  const [selected, setSelected] = useState<RepairPriceItem | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return repairPricing.filter((item) => item.model.toLowerCase().includes(q))
  }, [query])

  const autoCategories = useMemo(() => symptomToCategories[symptom], [symptom])

  const estimate = useMemo(() => {
    if (!selected) return { min: 0, max: 0 }
    const cats = autoCategories.length ? autoCategories : [category]
    const values = cats.map((c) => selected.prices[c]).filter(Boolean) as number[]
    if (values.length === 0) return { min: 0, max: 0 }
    return { min: Math.min(...values), max: Math.max(...values) }
  }, [selected, autoCategories, category])

  const yearHint = useMemo(() => (selected ? estimateReleaseYear(selected.model) : null), [selected])

  const estimateText = estimate.min === estimate.max
    ? formatPrice(estimate.min)
    : `${formatPrice(estimate.min)} ~ ${formatPrice(estimate.max)}`

  return (
    <section id="repair" className="section-padding container-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-6 md:mb-8 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={motionTimings.soft}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">維修試算器</h2>
          <p className="text-neutral-600 mt-2">輸入機型與症狀，系統自動建議可能維修項目與價格區間（實際以檢測為準）</p>
        </motion.div>

        {/* Controls */}
        <div className="glass-panel p-1 mb-6">
          <div className="glass-content p-4 md:p-6 grid gap-4 md:grid-cols-4">
            <div className="md:col-span-2">
              <label className="block text-sm text-neutral-600 mb-2">搜尋機型</label>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="例如：iPhone 14 Pro Max"
                className="w-full rounded-xl border border-white/40 bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-accent-500"
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-600 mb-2">症狀</label>
              <select
                value={symptom}
                onChange={(e) => setSymptom(e.target.value as SymptomKey)}
                className="w-full rounded-xl border border-white/40 bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-accent-500"
              >
                {SYMPTOMS.map((s) => (
                  <option key={s.key} value={s.key}>{s.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-neutral-600 mb-2">手動覆蓋（維修項目）</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as RepairCategory)}
                className="w-full rounded-xl border border-white/40 bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-accent-500"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.key} value={c.key}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="glass-surface p-1">
          <div className="glass-content overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-neutral-600">
                  <th className="px-4 py-3">型號</th>
                  {CATEGORIES.map((c) => (
                    <th key={c.key} className="px-4 py-3 whitespace-nowrap">{c.label}</th>
                  ))}
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.model} className="border-t border-white/40 hover:bg-white/60">
                    <td className="px-4 py-3 font-medium text-neutral-900 whitespace-nowrap">{item.model}</td>
                    {CATEGORIES.map((c) => (
                      <td key={c.key} className="px-4 py-3 text-neutral-800">
                        {formatPrice(item.prices[c.key])}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-right">
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelected(item)
                          trackSelectPromotion({ context: 'repair_calculator', model: item.model, symptom, suggested: autoCategories })
                        }}
                      >
                        試算
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-6 glass-panel p-1">
          <div className="glass-content p-4 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="text-sm text-neutral-700">
              <div><span className="text-neutral-500">機型：</span>{selected?.model || '—' }{yearHint ? `（約 ${yearHint} 年）` : ''}</div>
              <div><span className="text-neutral-500">症狀：</span>{SYMPTOMS.find(s=>s.key===symptom)?.label}</div>
              <div><span className="text-neutral-500">建議項目：</span>{autoCategories.map(k => CATEGORIES.find(c=>c.key===k)?.label).join('、') || CATEGORIES.find(c=>c.key===category)?.label}</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs text-neutral-500">預估價格</div>
                <div className="text-xl font-semibold text-neutral-900">{estimate.min ? estimateText : '-'}</div>
              </div>
              <Button
                className="motion-hover-pop"
                onClick={() => {
                  trackGenerateLead({ context: 'repair_calculator', model: selected?.model, symptom, suggested: autoCategories, estimateMin: estimate.min, estimateMax: estimate.max })
                  const suggested = autoCategories.map(k => CATEGORIES.find(c=>c.key===k)?.label).join('、')
                  const msg = encodeURIComponent(`您好，我的 ${selected?.model || ''} 有「${SYMPTOMS.find(s=>s.key===symptom)?.label}」，建議項目：${suggested || CATEGORIES.find(c=>c.key===category)?.label}，想了解維修時程與報價。`)
                  window.open(`https://line.me/R/ti/p/@fixmaster?utm_source=website&utm_medium=repair_calc&utm_campaign=contact_line&text=${msg}`, '_blank')
                }}
                disabled={!selected}
              >
                透過 LINE 詢問/預約
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
