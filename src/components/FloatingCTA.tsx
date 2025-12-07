'use client'

import { MessageCircle } from 'lucide-react'
import React from 'react'
import { trackClick } from '@/lib/tracking'

type FloatingCTAProps = {
  lineUrl?: string
}

export default function FloatingCTA({ lineUrl }: FloatingCTAProps) {
  const base = lineUrl || process.env.NEXT_PUBLIC_LINE_URL || 'https://line.me/R/ti/p/@fixmaster'
  const hasQuery = base.includes('?')
  const href = `${base}${hasQuery ? '&' : '?'}utm_source=website&utm_medium=floating_cta&utm_campaign=contact_line`

  return (
    <div className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-[9998] pb-safe pr-safe">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="透過 LINE 聯絡我們"
        className="group inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 glass-control bg-[#06C755]/90 hover:bg-[#06C755] text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#18d36a] shadow-lg hover:shadow-2xl hover:-translate-y-1 active:scale-95"
        onClick={() => trackClick('floating_line_cta', { location: 'global_fixed_button' })}
      >
        <MessageCircle className="w-7 h-7 md:w-8 md:h-8 fill-current" aria-hidden="true" />
        <span className="sr-only">LINE 線上諮詢</span>
        
        {/* Pulse effect */}
        <span className="absolute inset-0 rounded-full animate-ping bg-[#06C755] opacity-20 duration-1000 pointer-events-none"></span>
      </a>
    </div>
  )
}
