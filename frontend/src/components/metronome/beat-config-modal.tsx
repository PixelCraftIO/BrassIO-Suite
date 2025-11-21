'use client'

import { BeatType, SubdivisionType, type SubBeatConfig, type BeatConfig, createDefaultSubBeatConfigs } from '@/lib/metronome-core'

interface BeatConfigModalProps {
  visible: boolean
  beatIndex: number
  currentConfig: BeatConfig
  onConfigChange: (config: BeatConfig) => void
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
  currentConfig,
  onConfigChange,
  onClose,
}: BeatConfigModalProps) {
  if (!visible) return null

  const handleTypeChange = (type: BeatType) => {
    onConfigChange({ ...currentConfig, type })
  }

  const handleSubdivisionChange = (subdivision: SubdivisionType) => {
    onConfigChange({
      ...currentConfig,
      subdivision,
      subBeatConfigs: createDefaultSubBeatConfigs(subdivision),
    })
  }

  const handleSubBeatConfigChange = (subBeatIndex: number, updates: Partial<SubBeatConfig>) => {
    const newSubBeatConfigs = [...currentConfig.subBeatConfigs]
    newSubBeatConfigs[subBeatIndex] = {
      ...newSubBeatConfigs[subBeatIndex],
      ...updates,
    }
    onConfigChange({ ...currentConfig, subBeatConfigs: newSubBeatConfigs })
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-zinc-900 rounded-2xl p-6 w-[90%] max-w-md shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-center mb-6 text-zinc-900 dark:text-zinc-100">
          Beat {beatIndex + 1} konfigurieren
        </h2>

        {/* Beat Type */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-3 text-zinc-600 dark:text-zinc-400">
            Betonung
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {beatTypeOptions.map((option) => (
              <button
                key={option.type}
                onClick={() => handleTypeChange(option.type)}
                className={`p-3 rounded-lg border-2 flex flex-col items-center transition-colors ${
                  currentConfig.type === option.type
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                    : 'border-transparent bg-zinc-100 dark:bg-zinc-800'
                }`}
              >
                <div
                  className="w-5 h-5 rounded-full mb-2"
                  style={{ backgroundColor: option.color }}
                />
                <span className={`text-xs ${
                  currentConfig.type === option.type ? 'font-semibold' : ''
                } text-zinc-900 dark:text-zinc-100`}>
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Subdivision */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-3 text-zinc-600 dark:text-zinc-400">
            Unterteilung
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {subdivisionOptions.map((option) => (
              <button
                key={option.type}
                onClick={() => handleSubdivisionChange(option.type)}
                className={`p-3 rounded-lg border-2 flex flex-col items-center transition-colors ${
                  currentConfig.subdivision === option.type
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
                  currentConfig.subdivision === option.type ? 'font-semibold' : ''
                } text-zinc-900 dark:text-zinc-100`}>
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* SubBeat Options */}
        {currentConfig.subBeatConfigs && currentConfig.subBeatConfigs.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-3 text-zinc-600 dark:text-zinc-400">
              SubBeat-Optionen
            </h3>
            <div className="space-y-2">
              {currentConfig.subBeatConfigs.map((subConfig, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg"
                >
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">
                    SubBeat {idx + 1}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSubBeatConfigChange(idx, { dotted: !subConfig.dotted })}
                      className={`px-3 py-1 text-xs rounded ${
                        subConfig.dotted
                          ? 'bg-amber-500 text-white'
                          : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
                      }`}
                      title="Punktiert"
                    >
                      ·
                    </button>
                    <button
                      onClick={() => handleSubBeatConfigChange(idx, { rest: !subConfig.rest })}
                      className={`px-3 py-1 text-xs rounded ${
                        subConfig.rest
                          ? 'bg-red-500 text-white'
                          : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
                      }`}
                      title="Pause"
                    >
                      𝄽
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
