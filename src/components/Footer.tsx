'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { MapPin, Phone, MessageCircle, Mail, Clock, ArrowRight, ExternalLink } from 'lucide-react'

import Button from './ui/Button'
import SectionHeader from './ui/SectionHeader'
import { trackClick } from '@/lib/tracking'
import { scrollToSectionId } from '@/lib/scroll'

const quickLinks = [
  { label: '服務項目', href: '#services' },
  { label: '顧客好評', href: '#testimonials' },
  { label: '常見問答', href: '#faq' },
  { label: '安心承諾', href: '#trust' },
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
    href: 'https://line.me/R/ti/p/@fixmaster?utm_source=website&utm_medium=footer&utm_campaign=contact_line',
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
    <footer className="relative overflow-hidden pt-20 pb-10" aria-labelledby="footer-heading">
      <div
        className="pointer-events-none absolute inset-x-[-10%] top-0 h-96 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08),_rgba(255,255,255,0))] blur-[120px]"
        aria-hidden="true"
      />
      <div className="container mx-auto container-padding relative">
        <div className="max-w-6xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="glass-panel overflow-hidden"
          >
            <div className="px-8 py-10 md:px-12 md:py-12 flex flex-col-reverse gap-12 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl space-y-10 text-center lg:text-left flex-1">
                <div className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">FixMaster 維修大師</h2>
                  <p className="text-neutral-600 text-base md:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                    IRP 認證・原廠零件・全程錄影存證・不維修不收費・90 天保固。提供到店快速維修與台北市區到府收送服務。
                  </p>
                </div>
                
                <div className="grid gap-8 sm:grid-cols-2 text-left">
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-widest">聯絡資訊</h3>
                    <div className="flex flex-col gap-3">
                      {contactItems.map(({ icon: Icon, label, href, tracker, external }) => (
                        <a
                          key={label}
                          href={href}
                          target={external ? '_blank' : undefined}
                          rel={external ? 'noopener noreferrer' : undefined}
                          className="flex items-center gap-3 text-neutral-600 hover:text-neutral-900 transition-colors group"
                          onClick={tracker}
                        >
                          <div className="w-8 h-8 rounded-full glass-control flex items-center justify-center bg-white/50 group-hover:bg-white">
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          </div>
                          <span className="text-sm font-medium">{label}</span>
                          {external && <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-50 transition-opacity" />}
                        </a>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-widest">營業時間</h3>
                    <div className="flex flex-col gap-3">
                      {hours.map((item) => (
                        <div key={item.label} className="flex items-center gap-3 text-neutral-600">
                          <div className="w-8 h-8 rounded-full glass-control flex items-center justify-center bg-white/50">
                            <Clock className="h-4 w-4" aria-hidden="true" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-medium text-neutral-500">{item.label}</span>
                            <span className="text-sm font-bold text-neutral-900">{item.value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-8 lg:items-end lg:w-72">
                <Image
                  src="/logo.svg"
                  alt="FixMaster 維修大師"
                  width={160}
                  height={48}
                  className="h-12 w-auto"
                />
                <div className="flex flex-col gap-3 w-full sm:w-auto">
                  <Button
                    className="w-full justify-center shadow-lg"
                    onClick={() => {
                      trackClick('footer_primary_cta_click')
                      scrollToSectionId('contact')
                    }}
                  >
                    預約維修
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-center bg-white/50"
                    onClick={() => {
                      trackClick('footer_line_cta_click')
                      window.open('https://line.me/R/ti/p/@fixmaster?utm_source=website&utm_medium=footer&utm_campaign=contact_line', '_blank')
                    }}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    LINE 諮詢
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
            className="flex flex-wrap justify-center gap-4 md:gap-8 py-4 border-b border-neutral-200/50 pb-8"
          >
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors px-2 py-1"
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
            className="flex flex-col items-center justify-between gap-4 text-xs text-neutral-500 md:flex-row"
          >
            <p>© {new Date().getFullYear()} FixMaster 維修大師｜聯豐通信有限公司</p>
            <div className="flex gap-4">
              <span>隱私權政策</span>
              <span>服務條款</span>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
