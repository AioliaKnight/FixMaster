'use client'

import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center pill-button font-medium tracking-wide transition-all duration-200 focus:outline-none focus:ring-0'
  const variants: Record<string, string> = {
    primary: 'bg-neutral-900 text-white hover:bg-neutral-950 active:bg-black/90 shadow-[var(--elev-2)]',
    outline: 'glass-control text-neutral-900 hover:bg-white/70 active:bg-white/80',
    ghost: 'bg-transparent text-neutral-900 hover:bg-neutral-100/60 active:bg-neutral-100/80'
  }
  const sizes: Record<string, string> = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className || ''}`} {...props}>
      {children}
    </button>
  )
}

