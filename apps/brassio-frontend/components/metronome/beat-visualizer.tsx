'use client'

import { useEffect, useRef } from 'react'
import { BeatType } from '@brassio/metronome-core'

interface BeatVisualizerProps {
  currentBeat: number
  totalBeats: number
  isPlaying: boolean
  beatTypes: BeatType[]
  onBeatTypeChange?: (beatIndex: number, newType: BeatType) => void
}

export function BeatVisualizer({ currentBeat, totalBeats, isPlaying, beatTypes, onBeatTypeChange }: BeatVisualizerProps) {
  return (
    <div className="space-y-5 text-center">
      <div className="text-lg font-semibold">
        Schlag {isPlaying ? currentBeat + 1 : '-'} von {totalBeats}
      </div>

      <div className="flex justify-center gap-4 flex-wrap">
        {Array.from({ length: totalBeats }, (_, i) => (
          <BeatDot
            key={i}
            beatIndex={i}
            currentBeat={currentBeat}
            isPlaying={isPlaying}
            beatType={beatTypes[i] || BeatType.Normal}
            onPress={onBeatTypeChange}
          />
        ))}
      </div>
    </div>
  )
}

interface BeatDotProps {
  beatIndex: number
  currentBeat: number
  isPlaying: boolean
  beatType: BeatType
  onPress?: (beatIndex: number, newType: BeatType) => void
}

function BeatDot({ beatIndex, currentBeat, isPlaying, beatType, onPress }: BeatDotProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prevBeat = useRef(currentBeat)

  const isCurrent = isPlaying && beatIndex === currentBeat

  useEffect(() => {
    if (isCurrent && prevBeat.current !== currentBeat && ref.current) {
      // Trigger animation - faster and smaller
      ref.current.animate(
        [
          { transform: 'scale(1)', opacity: '0.3' },
          { transform: 'scale(1.2)', opacity: '1' },
          { transform: 'scale(1)', opacity: '1' },
        ],
        {
          duration: 150,
          easing: 'ease-out',
        }
      )
    }

    prevBeat.current = currentBeat
  }, [isCurrent, currentBeat])

  // Color based on beat type
  const dotColor = (() => {
    switch (beatType) {
      case BeatType.Downbeat:
        return 'bg-[#B8860B] dark:bg-[#D4AF37]'  // Gold
      case BeatType.Accented:
        return 'bg-[#FF6B00] dark:bg-[#FF8C00]'  // Orange
      case BeatType.Normal:
      default:
        return 'bg-zinc-600 dark:bg-zinc-400'    // Gray
    }
  })()

  const opacity = isCurrent ? 'opacity-100' : 'opacity-30'

  const handleClick = () => {
    if (!onPress) return

    // Cycle through beat types: Normal → Accented → Downbeat → Normal
    const nextType = (() => {
      switch (beatType) {
        case BeatType.Normal:
          return BeatType.Accented
        case BeatType.Accented:
          return BeatType.Downbeat
        case BeatType.Downbeat:
          return BeatType.Normal
      }
    })()

    onPress(beatIndex, nextType)
  }

  return (
    <div
      ref={ref}
      onClick={handleClick}
      className={`h-12 w-12 rounded-full transition-opacity ${dotColor} ${opacity} ${onPress ? 'cursor-pointer hover:opacity-50' : ''}`}
    />
  )
}
