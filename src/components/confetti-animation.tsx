'use client'

import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'

type ConfettiAnimationProps = {
  infinite?: boolean
  enabled?: boolean
}

export const ConfettiAnimation = ({
  infinite = false,
  enabled = true,
}: ConfettiAnimationProps) => {
  const [size, setSize] = useState({ width: 1920, height: 1080 })

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!enabled) return null

  return (
    <Confetti
      width={size.width}
      height={size.height}
      numberOfPieces={180}
      recycle={infinite}
      gravity={0.25}
    />
  )
}
