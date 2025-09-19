'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { trackPageView } from '@/lib/tracking'

export default function ClientAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    trackPageView(url)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams])

  return null
}




