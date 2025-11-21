'use client'

import { useState } from 'react'
import { BPM_ADJUSTMENTS } from '@/lib/metronome-core'
import { BpmModal } from './bpm-modal'

interface TempoControlsProps {
  bpm: number
  onBpmChange: (bpm: number) => void
  onAdjust: (delta: number) => void
}

export function TempoControls({ bpm, onBpmChange, onAdjust }: TempoControlsProps) {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <div className="text-center space-y-5">
      <button
        onClick={() => setModalVisible(true)}
        className="cursor-pointer hover:opacity-80 transition-opacity"
      >
        <div className="text-7xl font-bold">{bpm}</div>
        <div className="text-sm opacity-60">BPM</div>
        <div className="text-xs opacity-40">Klicken zum Bearbeiten</div>
      </button>

      <div className="flex justify-center gap-2">
        <button
          onClick={() => onAdjust(-BPM_ADJUSTMENTS.LARGE)}
          className="px-5 py-3 rounded-lg bg-zinc-200 dark:bg-zinc-700 font-semibold min-w-[60px]"
        >
          -10
        </button>
        <button
          onClick={() => onAdjust(-BPM_ADJUSTMENTS.SMALL)}
          className="px-5 py-3 rounded-lg bg-zinc-200 dark:bg-zinc-700 font-semibold min-w-[60px]"
        >
          -1
        </button>
        <button
          onClick={() => onAdjust(BPM_ADJUSTMENTS.SMALL)}
          className="px-5 py-3 rounded-lg bg-zinc-200 dark:bg-zinc-700 font-semibold min-w-[60px]"
        >
          +1
        </button>
        <button
          onClick={() => onAdjust(BPM_ADJUSTMENTS.LARGE)}
          className="px-5 py-3 rounded-lg bg-zinc-200 dark:bg-zinc-700 font-semibold min-w-[60px]"
        >
          +10
        </button>
      </div>

      <BpmModal
        visible={modalVisible}
        currentBpm={bpm}
        onBpmChange={onBpmChange}
        onClose={() => setModalVisible(false)}
      />
    </div>
  )
}
