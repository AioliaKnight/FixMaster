'use client'

import React from 'react'

type CardProps = React.HTMLAttributes<HTMLDivElement>

export default function Card({ className, children, ...props }: CardProps) {
  return (
    <div className={`glass-surface ${className || ''}`} {...props}>
      {children}
    </div>
  )
}

