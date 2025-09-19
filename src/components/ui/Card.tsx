'use client'

import React from 'react'

type CardProps = React.HTMLAttributes<HTMLDivElement>

export default function Card({ className, children, ...props }: CardProps) {
  return (
    <div className={`bg-white flat-card border border-neutral-200 ${className || ''}`} {...props}>
      {children}
    </div>
  )
}


