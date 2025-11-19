'use client'

import { useEffect, useRef } from 'react'

interface BeatVisualizerProps {
  currentBeat: number
  totalBeats: number
  isPlaying: boolean
}

export function BeatVisualizer({ currentBeat, totalBeats, isPlaying }: BeatVisualizerProps) {
  return (
    <div className="space-y-5 text-center">
      <div className="text-lg font-semibold">
        Schlag {isPlaying ? currentBeat + 1 : '-'} von {totalBeats}
      </div>

      <div className="flex justify-center gap-4">
        {Array.from({ length: totalBeats }, (_, i) => (
          <BeatDot
            key={i}
            beatIndex={i}
            currentBeat={currentBeat}
            isPlaying={isPlaying}
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
}

function BeatDot({ beatIndex, currentBeat, isPlaying }: BeatDotProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prevBeat = useRef(currentBeat)

  const isDownbeat = beatIndex === 0
  const isCurrent = isPlaying && beatIndex === currentBeat

  useEffect(() => {
    if (isCurrent && prevBeat.current !== currentBeat && ref.current) {
      // Trigger animation
      ref.current.animate(
        [
          { transform: 'scale(1)', opacity: '0.3' },
          { transform: 'scale(1.3)', opacity: '1' },
          { transform: 'scale(1)', opacity: '1' },
        ],
        {
          duration: 200,
          easing: 'ease-out',
        }
      )
    }

    prevBeat.current = currentBeat
  }, [isCurrent, currentBeat])

  const dotColor = isDownbeat
    ? 'bg-[#B8860B] dark:bg-[#D4AF37]'
    : 'bg-zinc-600 dark:bg-zinc-400'

  const opacity = isCurrent ? 'opacity-100' : 'opacity-30'

  return (
    <div
      ref={ref}
      className={`h-12 w-12 rounded-full transition-opacity ${dotColor} ${opacity}`}
    />
  )
}
