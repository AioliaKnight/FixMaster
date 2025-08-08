export function scrollToSectionId(targetId: string, offset = 20): void {
  if (typeof window === 'undefined') return
  const element = document.getElementById(targetId)
  if (!element) return

  const rect = element.getBoundingClientRect()
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const navbarHeight = window.innerWidth >= 768 ? 80 : 64
  const targetPosition = rect.top + scrollTop - navbarHeight - offset

  window.scrollTo({
    top: Math.max(0, targetPosition),
    behavior: 'smooth',
  })
}


