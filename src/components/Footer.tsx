'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { MapPin, Phone, MessageCircle, Mail, Clock } from 'lucide-react'

import Button from './ui/Button'
import SectionHeader from './ui/SectionHeader'
import { trackClick } from '@/lib/tracking'
import { scrollToSectionId } from '@/lib/scroll'

const quickLinks = [
  { label: '服務項目', href: '#services' },
  { label: '顧客好評', href: '#testimonials' },
  { label: '常見問答', href: '#faq' },
  { label: '安心承諾', href: '#trust' },
  { label: '優惠活動', href: '#promotions' },
  { label: '聯絡我們', href: '#contact' },
]

const contactItems = [
  {
    icon: Phone,
    label: '02-2816-6666',
    href: 'tel:+886-2-2816-6666',
    tracker: () => trackClick('footer_tel_click'),
  },
  {
    icon: MessageCircle,
    label: '@fixmaster',
    href: 'https://line.me/R/ti/p/@fixmaster',
    tracker: () => trackClick('footer_line_click'),
    external: true,
  },
  {
    icon: Mail,
    label: 'fixmastertw@gmail.com',
    href: 'mailto:fixmastertw@gmail.com',
  },
  {
    icon: MapPin,
    label: '台北市士林區文林路 60 號',
    href: 'https://maps.google.com/?q=台北市士林區文林路60號',
    external: true,
  },
]

const hours = [
  { label: '週一至週五', value: '14:00 – 23:00' },
  { label: '週六 / 週日', value: '15:00 – 23:00' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden pt-20" aria-labelledby="footer-heading">
      <div
        className="pointer-events-none absolute inset-x-[-10%] top-0 h-72 bg-[radial-gradient(circle_at_center,_rgba(239,68,68,0.16),_rgba(239,68,68,0))] blur-[140px]"
        aria-hidden="true"
      />
      <div className="container mx-auto container-padding relative">
        <div className="max-w-6xl mx-auto space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="glass-surface glass-strong px-8 py-10 md:px-12 md:py-12"
          >
            <div className="flex flex-col-reverse gap-10 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl space-y-8 text-center lg:text-left">
                <SectionHeader
                  title="FixMaster 維修大師"
                  description="Apple IRP 認證．原廠零件．透明錄影，全台最可信賴的 iPhone 維修夥伴。"
                  align="left"
                />
                <div className="flex flex-col gap-3 text-sm text-neutral-600 md:text-base">
                  {contactItems.map(({ icon: Icon, label, href, tracker, external }) => (
                    <a
                      key={label}
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className="flex items-center justify-center gap-3 text-neutral-700 hover:text-neutral-900 lg:justify-start"
                      onClick={tracker}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      <span>{label}</span>
                    </a>
                  ))}
                </div>
                <div className="grid gap-2 text-sm text-neutral-500 md:grid-cols-2">
                  {hours.map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-neutral-400" aria-hidden="true" />
                      <span>{item.label}</span>
                      <span className="text-neutral-700">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center gap-6 lg:items-end">
                <Image
                  src="/logo.svg"
                  alt="FixMaster 維修大師"
                  width={140}
                  height={40}
                  className="h-10 w-auto"
                />
                <div className="flex flex-col items-center gap-3 lg:items-end">
                  <Button
                    className="w-full lg:w-auto"
                    onClick={() => {
                      trackClick('footer_primary_cta_click')
                      scrollToSectionId('contact')
                    }}
                  >
                    預約維修
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full lg:w-auto"
                    onClick={() => {
                      trackClick('footer_secondary_cta_click')
                      scrollToSectionId('services')
                    }}
                  >
                    查看服務
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="glass-surface glass-strong px-5 py-4 text-sm font-medium text-neutral-700 transition-transform duration-200 hover:-translate-y-0.5"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.18 }}
            className="flex flex-col items-center justify-between gap-4 border-t border-white/40 py-6 text-xs text-neutral-500 md:flex-row"
          >
            <p>© {new Date().getFullYear()} FixMaster 維修大師｜聯豐通信有限公司</p>
            <p>本網站內容僅供維修服務說明使用</p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
