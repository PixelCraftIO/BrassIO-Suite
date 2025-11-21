'use client'

import { useEffect, useRef, useState } from 'react'
import { BeatType, type BeatConfig, SubdivisionType, calculateVisualBeats, createDefaultSubBeatConfigs } from '@/lib/metronome-core'
import { BeatConfigModal } from './beat-config-modal'

interface BeatVisualizerProps {
  currentBeat: number
  currentSubBeat: number
  totalBeats: number
  isPlaying: boolean
  beatTypes: BeatType[]
  beatConfigs: BeatConfig[]
  onBeatConfigChange?: (beatIndex: number, config: BeatConfig) => void
}

export function BeatVisualizer({
  currentBeat,
  currentSubBeat,
  totalBeats,
  isPlaying,
  beatTypes,
  beatConfigs,
  onBeatConfigChange
}: BeatVisualizerProps) {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedBeatIndex, setSelectedBeatIndex] = useState(0)

  const handleBeatPress = (beatIndex: number) => {
    setSelectedBeatIndex(beatIndex)
    setModalVisible(true)
  }

  const handleConfigChange = (config: BeatConfig) => {
    if (onBeatConfigChange) {
      onBeatConfigChange(selectedBeatIndex, config)
    }
  }

  // Ensure selectedConfig has subBeatConfigs
  const selectedConfig = beatConfigs[selectedBeatIndex] || {
    type: BeatType.Normal,
    subdivision: SubdivisionType.None,
    subBeatConfigs: createDefaultSubBeatConfigs(SubdivisionType.None)
  }

  // Ensure subBeatConfigs exists
  const configWithSubBeats = {
    ...selectedConfig,
    subBeatConfigs: selectedConfig.subBeatConfigs || createDefaultSubBeatConfigs(selectedConfig.subdivision)
  }

  // Calculate visual beats with overflow
  const visualBeats = calculateVisualBeats(beatConfigs)

  return (
    <div className="py-4">
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
            visualSubBeats={visualBeats[i] || []}
            onPress={handleBeatPress}
          />
        ))}
      </div>

      <BeatConfigModal
        visible={modalVisible}
        beatIndex={selectedBeatIndex}
        currentConfig={configWithSubBeats}
        onConfigChange={handleConfigChange}
        onClose={() => setModalVisible(false)}
      />
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
  visualSubBeats: Array<{
    beatIndex: number
    subBeatIndex: number
    isOverflow: boolean
    overflowFromBeat: number
    config: { dotted: boolean; rest: boolean }
    beatType: BeatType
  }>
  onPress?: (beatIndex: number) => void
}

function BeatGroup({
  beatIndex,
  currentBeat,
  currentSubBeat,
  isPlaying,
  beatType,
  beatConfig,
  visualSubBeats,
  onPress
}: BeatGroupProps) {
  const subdivisions = beatConfig.subdivision

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex flex-col items-center gap-1.5">
        <BeatDot
          beatIndex={beatIndex}
          subBeatIndex={0}
          currentBeat={currentBeat}
          currentSubBeat={currentSubBeat}
          isPlaying={isPlaying}
          beatType={beatType}
          isMainBeat={true}
          isRest={visualSubBeats[0]?.config.rest || false}
          isDotted={visualSubBeats[0]?.config.dotted || false}
          isOverflow={visualSubBeats[0]?.isOverflow || false}
          onPress={onPress}
        />

        {subdivisions > 1 && (
          <div className="flex gap-1">
            {Array.from({ length: subdivisions - 1 }, (_, i) => {
              const visual = visualSubBeats[i + 1]
              return (
                <BeatDot
                  key={i + 1}
                  beatIndex={beatIndex}
                  subBeatIndex={i + 1}
                  currentBeat={currentBeat}
                  currentSubBeat={currentSubBeat}
                  isPlaying={isPlaying}
                  beatType={BeatType.Subdivision}
                  isMainBeat={false}
                  isRest={visual?.config.rest || false}
                  isDotted={visual?.config.dotted || false}
                  isOverflow={visual?.isOverflow || false}
                />
              )
            })}
          </div>
        )}
      </div>
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
  isRest: boolean
  isDotted: boolean
  isOverflow: boolean
  onPress?: (beatIndex: number) => void
}

function BeatDot({
  beatIndex,
  subBeatIndex,
  currentBeat,
  currentSubBeat,
  isPlaying,
  beatType,
  isMainBeat,
  isRest,
  isDotted,
  isOverflow,
  onPress
}: BeatDotProps) {
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
    if (isOverflow) {
      return 'bg-purple-400 dark:bg-purple-500' // Overflow color
    }
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
    onPress(beatIndex)
  }

  // For rests, show empty circle (border only)
  const restStyle = isRest ? 'bg-transparent border-2 border-current' : ''

  const className = [
    size,
    'rounded-full',
    'transition-opacity',
    'relative',
    isRest ? restStyle : dotColor,
    opacity
  ]

  if (isMainBeat && onPress) {
    className.push('cursor-pointer', 'hover:opacity-50')
  }

  return (
    <div className="relative inline-flex items-center">
      <div
        ref={ref}
        onClick={handleClick}
        className={className.join(' ')}
        style={isRest ? { borderColor: 'currentColor' } : undefined}
      />
      {/* Dot indicator for dotted notes */}
      {isDotted && (
        <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-amber-500" />
      )}
    </div>
  )
}
