// Generic tracking utilities unified for GTM/GA/FB/LINE

type GenericParams = Record<string, unknown>

const isBrowser = typeof window !== 'undefined'

function safeGet<T>(getter: () => T): T | undefined {
  try {
    return getter()
  } catch {
    return undefined
  }
}

export function pushToDataLayer(event: GenericParams): void {
  if (!isBrowser) return
  const dataLayer = safeGet(() => (window as unknown as { dataLayer: unknown[] }).dataLayer)
  if (Array.isArray(dataLayer)) {
    dataLayer.push(event)
  } else {
    ;(window as unknown as { dataLayer: unknown[] }).dataLayer = [event]
  }
}

export function trackPageView(url?: string, title?: string): void {
  if (!isBrowser) return

  const pageLocation = url || safeGet(() => window.location.href) || ''
  const pageTitle = title || safeGet(() => document.title) || ''

  // GTM / dataLayer
  pushToDataLayer({
    event: 'page_view',
    page_location: pageLocation,
    page_title: pageTitle,
  })

  // GA4
  const gaId = safeGet(() => (process.env.NEXT_PUBLIC_GA_ID as string | undefined))
  const gtag = safeGet(() => (window as unknown as { gtag: (...args: unknown[]) => void }).gtag)
  if (gaId && typeof gtag === 'function') {
    gtag('config', gaId, {
      page_title: pageTitle,
      page_location: pageLocation,
      send_page_view: false,
    })
  }

  // Facebook Pixel
  const fbq = safeGet(() => (window as unknown as { fbq: (...args: unknown[]) => void }).fbq)
  if (typeof fbq === 'function') {
    fbq('track', 'PageView')
  }

  // LINE Tag (best-effort)
  const ltagSend = safeGet(
    () => (window as unknown as { _ltag: { send?: (...args: unknown[]) => void } })._ltag?.send
  )
  if (typeof ltagSend === 'function') {
    ltagSend('pv')
  }
}

export function trackEvent(eventName: string, params: GenericParams = {}): void {
  if (!isBrowser) return

  // GTM / dataLayer
  pushToDataLayer({ event: eventName, ...params })

  // GA4
  const gtag = safeGet(() => (window as unknown as { gtag: (...args: unknown[]) => void }).gtag)
  if (typeof gtag === 'function') {
    gtag('event', eventName, params)
  }

  // Facebook Pixel (custom events)
  const fbq = safeGet(() => (window as unknown as { fbq: (...args: unknown[]) => void }).fbq)
  if (typeof fbq === 'function') {
    fbq('trackCustom', eventName, params)
  }

  // LINE Tag (best-effort custom event)
  const ltagSend = safeGet(
    () => (window as unknown as { _ltag: { send?: (...args: unknown[]) => void } })._ltag?.send
  )
  if (typeof ltagSend === 'function') {
    ltagSend('event', eventName)
  }
}

export function trackClick(label: string, params: GenericParams = {}): void {
  trackEvent('cta_click', { label, ...params })
}


