'use client'

import React from 'react'

type SectionHeaderProps = {
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export default function SectionHeader({ title, description, align = 'center', className }: SectionHeaderProps) {
  const isCenter = align === 'center'
  return (
    <div className={`${isCenter ? 'text-center' : ''} ${className || ''}`}>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-4">{title}</h2>
      {description && (
        <p className="text-neutral-600 text-lg sm:text-xl max-w-2xl mx-auto">
          {description}
        </p>
      )}
      <div className={`w-16 h-px bg-neutral-900 ${isCenter ? 'mx-auto' : ''} mt-6`}></div>
    </div>
  )
}


