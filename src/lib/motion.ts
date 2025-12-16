export const motionTimings = {
  soft: {
    duration: 0.22,
    ease: [0.26, 0.1, 0.25, 1] as [number, number, number, number],
  },
  medium: {
    duration: 0.28,
    ease: [0.3, 0, 0.3, 1] as [number, number, number, number],
  },
  slow: {
    duration: 0.36,
    ease: [0.22, 0.05, 0.25, 1] as [number, number, number, number],
  },
  spring: {
    type: 'spring',
    stiffness: 500,
    damping: 30,
    mass: 1,
  },
}

export const motionViewport = { once: true, amount: 0.3 }

export const motionHover = {
  scale: 1.02,
  transition: motionTimings.soft,
}

export const motionExit = {
  opacity: 0,
  y: 10,
  transition: motionTimings.soft,
}

export const motionVariants = {
  fadeUp: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
}
