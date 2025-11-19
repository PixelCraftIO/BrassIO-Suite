'use client'

import { useEffect, useRef } from 'react'
import { BeatType, type BeatConfig, SubdivisionType } from '@brassio/metronome-core'
import { SubdivisionDropdown } from './subdivision-dropdown'

interface BeatVisualizerProps {
  currentBeat: number
  currentSubBeat: number
  totalBeats: number
  isPlaying: boolean
  beatTypes: BeatType[]
  beatConfigs: BeatConfig[]
  onBeatTypeChange?: (beatIndex: number, newType: BeatType) => void
  onSubdivisionChange?: (beatIndex: number, subdivision: SubdivisionType) => void
}

export function BeatVisualizer({ 
  currentBeat, 
  currentSubBeat, 
  totalBeats, 
  isPlaying, 
  beatTypes, 
  beatConfigs, 
  onBeatTypeChange,
  onSubdivisionChange 
}: BeatVisualizerProps) {
  return (
    <div className="space-y-5 text-center">
      <div className="text-lg font-semibold">
        Schlag {isPlaying ? currentBeat + 1 : '-'} von {totalBeats}
      </div>

      <div className="flex justify-center gap-6 flex-wrap">
        {Array.from({ length: totalBeats }, (_, i) => (
          <BeatGroup
            key={i}
            beatIndex={i}
            currentBeat={currentBeat}
            currentSubBeat={currentSubBeat}
            isPlaying={isPlaying}
            beatType={beatTypes[i] || BeatType.Normal}
            beatConfig={beatConfigs[i]}
            onBeatTypeChange={onBeatTypeChange}
            onSubdivisionChange={onSubdivisionChange}
          />
        ))}
      </div>
    </div>
  )
}

interface BeatGroupProps {
  beatIndex: number
  currentBeat: number
  currentSubBeat: number
  isPlaying: boolean
  beatType: BeatType
  beatConfig: BeatConfig
  onBeatTypeChange?: (beatIndex: number, newType: BeatType) => void
  onSubdivisionChange?: (beatIndex: number, subdivision: SubdivisionType) => void
}

function BeatGroup({ 
  beatIndex, 
  currentBeat, 
  currentSubBeat, 
  isPlaying, 
  beatType, 
  beatConfig, 
  onBeatTypeChange,
  onSubdivisionChange 
}: BeatGroupProps) {
  const subdivisions = beatConfig.subdivision

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Main beat dot with subdivision dots */}
      <div className="flex flex-col items-center gap-1.5">
        <BeatDot
          beatIndex={beatIndex}
          subBeatIndex={0}
          currentBeat={currentBeat}
          currentSubBeat={currentSubBeat}
          isPlaying={isPlaying}
          beatType={beatType}
          isMainBeat={true}
          onPress={onBeatTypeChange}
        />

        {subdivisions > 1 && (
          <div className="flex gap-1">
            {Array.from({ length: subdivisions - 1 }, (_, i) => (
              <BeatDot
                key={i + 1}
                beatIndex={beatIndex}
                subBeatIndex={i + 1}
                currentBeat={currentBeat}
                currentSubBeat={currentSubBeat}
                isPlaying={isPlaying}
                beatType={BeatType.Subdivision}
                isMainBeat={false}
              />
            ))}
          </div>
        )}
      </div>

      {/* Subdivision dropdown */}
      {onSubdivisionChange && (
        <SubdivisionDropdown
          value={beatConfig.subdivision}
          onChange={(subdivision) => onSubdivisionChange(beatIndex, subdivision)}
          beatNumber={beatIndex + 1}
        />
      )}
    </div>
  )
}

interface BeatDotProps {
  beatIndex: number
  subBeatIndex: number
  currentBeat: number
  currentSubBeat: number
  isPlaying: boolean
  beatType: BeatType
  isMainBeat: boolean
  onPress?: (beatIndex: number, newType: BeatType) => void
}

function BeatDot({ beatIndex, subBeatIndex, currentBeat, currentSubBeat, isPlaying, beatType, isMainBeat, onPress }: BeatDotProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prevBeat = useRef(currentBeat)
  const prevSubBeat = useRef(currentSubBeat)

  const isCurrent = isPlaying && beatIndex === currentBeat && subBeatIndex === currentSubBeat

  useEffect(() => {
    if (isCurrent && (prevBeat.current !== currentBeat || prevSubBeat.current !== currentSubBeat) && ref.current) {
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
    prevSubBeat.current = currentSubBeat
  }, [isCurrent, currentBeat, currentSubBeat])

  const dotColor = (() => {
    switch (beatType) {
      case BeatType.Downbeat:
        return 'bg-[#B8860B] dark:bg-[#D4AF37]'
      case BeatType.Accented:
        return 'bg-[#FF6B00] dark:bg-[#FF8C00]'
      case BeatType.Subdivision:
        return 'bg-zinc-500 dark:bg-zinc-500'
      case BeatType.Normal:
      default:
        return 'bg-zinc-600 dark:bg-zinc-400'
    }
  })()

  const opacity = isCurrent ? 'opacity-100' : 'opacity-30'
  const size = isMainBeat ? 'h-12 w-12' : 'h-7 w-7'

  const handleClick = () => {
    if (!onPress || !isMainBeat) return

    const nextType = (() => {
      switch (beatType) {
        case BeatType.Normal:
          return BeatType.Accented
        case BeatType.Accented:
          return BeatType.Downbeat
        case BeatType.Downbeat:
          return BeatType.Normal
        default:
          return BeatType.Normal
      }
    })()

    onPress(beatIndex, nextType)
  }

  const className = [size, 'rounded-full', 'transition-opacity', dotColor, opacity]
  if (isMainBeat && onPress) {
    className.push('cursor-pointer', 'hover:opacity-50')
  }

  return (
    <div
      ref={ref}
      onClick={handleClick}
      className={className.join(' ')}
    />
  )
}
