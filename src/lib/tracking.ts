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

  // GA4: send page_view as event to avoid duplicate page_view
  const gtag = safeGet(() => (window as unknown as { gtag: (...args: unknown[]) => void }).gtag)
  if (typeof gtag === 'function') {
    gtag('event', 'page_view', {
      page_title: pageTitle,
      page_location: pageLocation,
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
    // Map common events to FB conventions if needed, default to trackCustom
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

// GA4 recommended events helpers
export function trackGenerateLead(params: GenericParams = {}): void {
  trackEvent('generate_lead', params)
}

export function trackSelectPromotion(params: GenericParams = {}): void {
  trackEvent('select_promotion', params)
}

export function trackViewPromotion(params: GenericParams = {}): void {
  trackEvent('view_promotion', params)
}

// Backward compatible click tracking: default to generate_lead
export function trackClick(label: string, params: GenericParams = {}): void {
  trackGenerateLead({ label, ...params })
}


