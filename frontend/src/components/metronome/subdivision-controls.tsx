'use client'

import { SubdivisionType, type BeatConfig } from '@/lib/metronome-core'

interface SubdivisionControlsProps {
  beatConfigs: BeatConfig[]
  onSubdivisionChange: (beatIndex: number, subdivision: SubdivisionType) => void
}

const SUBDIVISION_OPTIONS = [
  { value: SubdivisionType.None, label: '1', description: 'Viertel' },
  { value: SubdivisionType.Eighth, label: '2', description: 'Achtel' },
  { value: SubdivisionType.Triplet, label: '3', description: 'Triolen' },
  { value: SubdivisionType.Sixteenth, label: '4', description: 'Sechzehntel' },
  { value: SubdivisionType.Quintuplet, label: '5', description: 'Fünfer' },
  { value: SubdivisionType.Sextuplet, label: '6', description: 'Sechser' },
]

export function SubdivisionControls({ beatConfigs, onSubdivisionChange }: SubdivisionControlsProps) {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 shadow-md">
      <h3 className="text-center font-semibold text-base mb-3">
        Subdivision pro Schlag
      </h3>

      <div className="flex overflow-x-auto gap-4 pb-2">
        {beatConfigs.map((beatConfig, beatIndex) => (
          <div key={beatIndex} className="flex flex-col items-center min-w-[80px] flex-shrink-0">
            <div className="font-semibold text-sm mb-2">
              {beatIndex + 1}
            </div>

            <div className="flex flex-col gap-1.5">
              {SUBDIVISION_OPTIONS.map((option) => {
                const isSelected = beatConfig.subdivision === option.value
                return (
                  <button
                    key={option.value}
                    onClick={() => onSubdivisionChange(beatIndex, option.value)}
                    className={`
                      px-4 py-2 rounded-lg font-semibold text-base min-w-[50px]
                      transition-colors
                      ${isSelected
                        ? 'bg-blue-600 dark:bg-blue-500 text-white'
                        : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-600'
                      }
                    `}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>

            <div className="text-xs mt-2 opacity-70">
              {SUBDIVISION_OPTIONS.find(o => o.value === beatConfig.subdivision)?.description || ''}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
