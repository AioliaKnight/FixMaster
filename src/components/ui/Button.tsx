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
  const base = 'inline-flex items-center justify-center flat-button font-medium tracking-wide transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  const variants: Record<string, string> = {
    primary: 'bg-neutral-900 text-white hover:bg-black focus:ring-neutral-900',
    outline: 'bg-white text-neutral-800 border border-neutral-300 hover:border-neutral-400 focus:ring-neutral-300',
    ghost: 'bg-transparent text-neutral-700 hover:bg-neutral-50 focus:ring-neutral-200'
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


