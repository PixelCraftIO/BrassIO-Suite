'use client'

import { TIME_SIGNATURES } from '@brassio/metronome-core'
import type { TimeSignature } from '@brassio/metronome-core'

interface TimeSignatureSelectorProps {
  value: TimeSignature
  onChange: (ts: TimeSignature) => void
}

export function TimeSignatureSelector({ value, onChange }: TimeSignatureSelectorProps) {
  const isSelected = (ts: TimeSignature) =>
    ts.beats === value.beats && ts.noteValue === value.noteValue

  return (
    <div className="space-y-3">
      <div className="text-center font-semibold">Taktart</div>
      <div className="flex flex-wrap justify-center gap-2">
        {TIME_SIGNATURES.map((ts) => (
          <button
            key={`${ts.beats}/${ts.noteValue}`}
            onClick={() => onChange(ts)}
            className={`rounded-lg px-4 py-2 font-semibold transition-colors ${
              isSelected(ts)
                ? 'bg-[#B8860B] text-black dark:bg-[#D4AF37]'
                : 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700'
            }`}
          >
            {ts.beats}/{ts.noteValue}
          </button>
        ))}
      </div>
    </div>
  )
}
