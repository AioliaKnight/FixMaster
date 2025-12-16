'use client'

import React from 'react'

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: 'surface' | 'panel' | 'elevated'
}

export default function Card({ 
  className, 
  children, 
  variant = 'surface',
  ...props 
}: CardProps) {
  const variantClass = {
    surface: 'glass-surface',
    panel: 'glass-panel',
    elevated: 'glass-control shadow-(--elev-2)' // Slightly more raised than standard control
  }[variant]

  return (
    <div className={`${variantClass} ${className || ''}`} {...props}>
      {children}
    </div>
  )
}
