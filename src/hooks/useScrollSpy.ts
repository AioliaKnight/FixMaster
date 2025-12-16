import { useState, useEffect, RefObject } from 'react'

/**
 * 監聽水平滾動容器，回傳當前最明顯可見的子元素索引
 * @param containerRef 滾動容器的 ref
 * @param itemSelector 子元素選擇器（若不提供則預設為所有直接子元素）
 * @returns [activeIndex, setActiveIndex]
 */
export function useScrollSpy(
  containerRef: RefObject<HTMLElement | null>,
  options?: {
    threshold?: number
    axis?: 'x' | 'y'
  }
) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!el) return
          const children = Array.from(el.children) as HTMLElement[]
          if (children.length === 0) return

          // 簡單判斷：假設每個項目寬度/高度差不多，用 scrollOffset / itemSize 計算
          // 針對原本的邏輯進行通用化
          const first = children[0]
          const second = children[1]
          
          if (!first) return

          let index = 0
          if (options?.axis === 'y') {
             // 垂直滾動邏輯 (未來擴充用)
             const step = second ? second.offsetTop - first.offsetTop : first.clientHeight
             if (step > 0) {
                index = Math.round(el.scrollTop / step)
             }
          } else {
             // 水平滾動邏輯 (預設)
             const step = second ? second.offsetLeft - first.offsetLeft : first.clientWidth
             if (step > 0) {
                index = Math.round(el.scrollLeft / step)
             }
          }

          setActiveIndex(Math.max(0, Math.min(children.length - 1, index)))
          ticking = false
        })
        ticking = true
      }
    }

    el.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => el.removeEventListener('scroll', handleScroll)
  }, [containerRef, options?.axis])

  return activeIndex
}

