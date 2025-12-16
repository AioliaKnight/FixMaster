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
  const base = 'inline-flex items-center justify-center font-semibold tracking-tight transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 tap-48 rounded-full active:scale-98'
  
  const variants: Record<string, string> = {
    primary: 'btn-primary', // Defined in globals.css for that complex iOS look
    outline: 'glass-control text-neutral-900 hover:text-black', 
    ghost: 'bg-transparent text-neutral-600 hover:text-neutral-900 hover:bg-black/5'
  }
  
  const sizes: Record<string, string> = {
    sm: 'px-4 py-2 text-sm h-9',
    md: 'px-6 py-3 text-[15px] h-11',
    lg: 'px-8 py-4 text-lg h-14'
  }

  return (
    <button 
      className={`${base} ${variants[variant]} ${sizes[size]} ${className || ''}`} 
      {...props}
    >
      {children}
    </button>
  )
}
