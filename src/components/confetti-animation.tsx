'use client'

import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'

interface ConfettiAnimationProps {
  enabled?: boolean
  infinite?: boolean
  intensity?: number // novo: controla a quantidade de confete
}

export function ConfettiAnimation({
  enabled = true,
  infinite = false,
  intensity = 180,
}: ConfettiAnimationProps) {
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    // Ajusta o tamanho inicial e atualiza ao redimensionar
    const updateSize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight })

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  if (!enabled || size.width === 0) return null

  return (
    <Confetti
      width={size.width}
      height={size.height}
      numberOfPieces={intensity}
      recycle={infinite}
      gravity={0.25}
      wind={0.005}
      colors={['#A855F7', '#EC4899', '#F97316', '#FDE68A']}
    />
  )
}
