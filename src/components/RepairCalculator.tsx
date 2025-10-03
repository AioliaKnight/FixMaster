"use client"

import { useMemo, useState } from 'react'
import { repairPricing, RepairCategory, RepairPriceItem } from '@/lib/repair'
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

export default function RepairCalculator() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<RepairCategory>('frontGlass')
  const [selected, setSelected] = useState<RepairPriceItem | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return repairPricing.filter((item) => item.model.toLowerCase().includes(q))
  }, [query])

  const estimate = useMemo(() => {
    if (!selected) return 0
    return selected.prices[category] || 0
  }, [selected, category])

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
          <p className="text-neutral-600 mt-2">快速查詢各機型常見維修項目之參考價格，實際以檢測為準</p>
        </motion.div>

        {/* Controls */}
        <div className="glass-panel p-1 mb-6">
          <div className="glass-content p-4 md:p-6 grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm text-neutral-600 mb-2">搜尋機型</label>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="例如：iPhone 14 Pro Max"
                className="w-full rounded-xl border border-white/40 bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-accent-500"
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-600 mb-2">維修項目</label>
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
            <div className="flex items-end">
              <div className="w-full glass-control glass-strong px-4 py-3 text-center">
                <div className="text-xs text-neutral-500">預估價格</div>
                <div className="text-xl font-semibold text-neutral-900">{estimate ? `$${estimate.toLocaleString()}` : '-'}</div>
              </div>
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
                        {item.prices[c.key] ? `$${item.prices[c.key]!.toLocaleString()}` : '-'}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-right">
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelected(item)
                          trackSelectPromotion({ context: 'repair_calculator', model: item.model, category })
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

        {/* CTA */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-neutral-600 text-sm">
            上述為參考價格，實際費用依檢測與零件供應為準。
          </div>
          <Button
            className="motion-hover-pop"
            onClick={() => {
              trackGenerateLead({ context: 'repair_calculator', model: selected?.model, category })
              const msg = encodeURIComponent(`您好，我想諮詢 ${selected?.model || ''} 的 ${CATEGORIES.find(c=>c.key===category)?.label} 維修。`)
              window.open(`https://line.me/R/ti/p/@fixmaster?utm_source=website&utm_medium=repair_calc&utm_campaign=contact_line&text=${msg}`, '_blank')
            }}
          >
            透過 LINE 詢問/預約
          </Button>
        </div>
      </div>
    </section>
  )
}
