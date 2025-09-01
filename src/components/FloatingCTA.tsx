'use client'

import { MessageCircle } from 'lucide-react'
import React from 'react'

type FloatingCTAProps = {
  lineUrl?: string
}

export default function FloatingCTA({ lineUrl }: FloatingCTAProps) {
  const href = lineUrl || process.env.NEXT_PUBLIC_LINE_URL || 'https://line.me/R/ti/p/@yourlineid'

  return (
    <div className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-[9998]">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="透過 LINE 聯絡我們"
        className="group inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#06C755] hover:bg-[#07b94f] text-white shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#06C755]"
      >
        <MessageCircle className="w-7 h-7 md:w-8 md:h-8" aria-hidden="true" />
        <span className="sr-only">LINE</span>
      </a>
    </div>
  )
}
