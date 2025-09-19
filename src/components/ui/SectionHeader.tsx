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
    <div className={`${isCenter ? 'text-center' : ''} space-y-3 ${className || ''}`}>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900">
        {title}
      </h2>
      {description && (
        <p
          className={`text-neutral-600 text-base sm:text-lg md:text-xl leading-relaxed ${
            isCenter ? 'mx-auto' : ''
          } max-w-3xl`}
        >
          {description}
        </p>
      )}
      <div
        className={`inline-flex h-[2px] w-16 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-transparent via-neutral-900/70 to-transparent ${
          isCenter ? '' : ''
        }`}
        aria-hidden="true"
      />
    </div>
  )
}

