'use client'

import { BeatType, SubdivisionType } from '@brassio/metronome-core'

interface BeatConfigModalProps {
  visible: boolean
  beatIndex: number
  currentType: BeatType
  currentSubdivision: SubdivisionType
  onSelectType: (type: BeatType) => void
  onSelectSubdivision: (subdivision: SubdivisionType) => void
  onClose: () => void
}

const beatTypeOptions = [
  { type: BeatType.Normal, label: 'Normal', color: '#888888' },
  { type: BeatType.Accented, label: 'Akzent', color: '#FF8C00' },
  { type: BeatType.Downbeat, label: 'Downbeat', color: '#D4AF37' },
]

const subdivisionOptions = [
  { type: SubdivisionType.None, label: 'Viertel', count: 1 },
  { type: SubdivisionType.Eighth, label: 'Achtel', count: 2 },
  { type: SubdivisionType.Triplet, label: 'Triole', count: 3 },
  { type: SubdivisionType.Sixteenth, label: 'Sechzehntel', count: 4 },
]

export function BeatConfigModal({
  visible,
  beatIndex,
  currentType,
  currentSubdivision,
  onSelectType,
  onSelectSubdivision,
  onClose,
}: BeatConfigModalProps) {
  if (!visible) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-zinc-900 rounded-2xl p-6 w-[90%] max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-center mb-6 text-zinc-900 dark:text-zinc-100">
          Beat {beatIndex + 1} konfigurieren
        </h2>

        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-3 text-zinc-600 dark:text-zinc-400">
            Betonung
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {beatTypeOptions.map((option) => (
              <button
                key={option.type}
                onClick={() => onSelectType(option.type)}
                className={`p-3 rounded-lg border-2 flex flex-col items-center transition-colors ${
                  currentType === option.type
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                    : 'border-transparent bg-zinc-100 dark:bg-zinc-800'
                }`}
              >
                <div
                  className="w-5 h-5 rounded-full mb-2"
                  style={{ backgroundColor: option.color }}
                />
                <span className={`text-xs ${
                  currentType === option.type ? 'font-semibold' : ''
                } text-zinc-900 dark:text-zinc-100`}>
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-3 text-zinc-600 dark:text-zinc-400">
            Unterteilung
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {subdivisionOptions.map((option) => (
              <button
                key={option.type}
                onClick={() => onSelectSubdivision(option.type)}
                className={`p-3 rounded-lg border-2 flex flex-col items-center transition-colors ${
                  currentSubdivision === option.type
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                    : 'border-transparent bg-zinc-100 dark:bg-zinc-800'
                }`}
              >
                <div className="flex gap-0.5 mb-2 h-5 items-center">
                  {Array.from({ length: option.count }).map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                  ))}
                </div>
                <span className={`text-xs ${
                  currentSubdivision === option.type ? 'font-semibold' : ''
                } text-zinc-900 dark:text-zinc-100`}>
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          Fertig
        </button>
      </div>
    </div>
  )
}
