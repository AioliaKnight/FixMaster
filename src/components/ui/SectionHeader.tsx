'use client'

import React from 'react'

type SectionHeaderProps = {
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}

export default function SectionHeader({ title, description, align = 'center', className, as = 'h2' }: SectionHeaderProps) {
  const isCenter = align === 'center'
  const Tag = as
  
  return (
    <div className={`${isCenter ? 'text-center' : ''} space-y-4 ${className || ''}`}>
      <Tag className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter text-neutral-900 leading-[1.1]">
        {title}
      </Tag>
      {description && (
        <p
          className={`text-neutral-600 text-lg sm:text-xl leading-relaxed text-balance ${
            isCenter ? 'mx-auto' : ''
          } max-w-2xl font-medium opacity-90`}
        >
          {description}
        </p>
      )}
    </div>
  )
}
