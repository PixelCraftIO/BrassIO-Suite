'use client'

import { MIN_BPM, MAX_BPM, BPM_ADJUSTMENTS } from '@brassio/metronome-core'

interface TempoControlsProps {
  bpm: number
  onBpmChange: (bpm: number) => void
  onAdjust: (delta: number) => void
}

export function TempoControls({ bpm, onBpmChange, onAdjust }: TempoControlsProps) {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="text-7xl font-bold">{bpm}</div>
        <div className="text-sm opacity-60">BPM</div>
      </div>

      <input
        type="range"
        min={MIN_BPM}
        max={MAX_BPM}
        value={bpm}
        onChange={(e) => onBpmChange(Number(e.target.value))}
        className="w-full accent-[#B8860B] dark:accent-[#D4AF37]"
      />

      <div className="flex justify-between text-xs opacity-50">
        <span>{MIN_BPM}</span>
        <span>{MAX_BPM}</span>
      </div>

      <div className="flex justify-center gap-2">
        <button
          onClick={() => onAdjust(-BPM_ADJUSTMENTS.LARGE)}
          className="rounded-lg bg-zinc-100 px-5 py-3 font-semibold transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
        >
          -10
        </button>
        <button
          onClick={() => onAdjust(-BPM_ADJUSTMENTS.SMALL)}
          className="rounded-lg bg-zinc-100 px-5 py-3 font-semibold transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
        >
          -1
        </button>
        <button
          onClick={() => onAdjust(BPM_ADJUSTMENTS.SMALL)}
          className="rounded-lg bg-zinc-100 px-5 py-3 font-semibold transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
        >
          +1
        </button>
        <button
          onClick={() => onAdjust(BPM_ADJUSTMENTS.LARGE)}
          className="rounded-lg bg-zinc-100 px-5 py-3 font-semibold transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
        >
          +10
        </button>
      </div>
    </div>
  )
}
