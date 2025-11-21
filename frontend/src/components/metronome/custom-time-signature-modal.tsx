'use client'

import { useState } from 'react'
import type { TimeSignature } from '@/lib/metronome-core'

interface CustomTimeSignatureModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (timeSignature: TimeSignature) => void
  currentTimeSignature?: TimeSignature
}

export function CustomTimeSignatureModal({
  isOpen,
  onClose,
  onSave,
  currentTimeSignature,
}: CustomTimeSignatureModalProps) {
  const [beats, setBeats] = useState(currentTimeSignature?.beats || 4)
  const [noteValue, setNoteValue] = useState(currentTimeSignature?.noteValue || 4)

  if (!isOpen) return null

  const handleSave = () => {
    onSave({ beats, noteValue })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl dark:bg-zinc-800">
        <h2 className="mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-50">
          Eigene Taktart
        </h2>

        <div className="mb-6 space-y-4">
          {/* Beats (Zähler) */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Schläge pro Takt
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setBeats(Math.max(1, beats - 1))}
                className="rounded bg-zinc-200 px-3 py-2 font-bold hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600"
              >
                -
              </button>
              <input
                type="number"
                min={1}
                max={16}
                value={beats}
                onChange={(e) => setBeats(Math.max(1, Math.min(16, parseInt(e.target.value) || 1)))}
                className="w-20 rounded border border-zinc-300 bg-white px-3 py-2 text-center dark:border-zinc-600 dark:bg-zinc-700"
              />
              <button
                onClick={() => setBeats(Math.min(16, beats + 1))}
                className="rounded bg-zinc-200 px-3 py-2 font-bold hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600"
              >
                +
              </button>
            </div>
          </div>

          {/* Note Value (Nenner) */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Notenwert
            </label>
            <div className="flex gap-2">
              {[2, 4, 8, 16].map((value) => (
                <button
                  key={value}
                  onClick={() => setNoteValue(value)}
                  className={`flex-1 rounded px-3 py-2 font-medium ${
                    noteValue === value
                      ? 'bg-blue-500 text-white'
                      : 'bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="rounded bg-zinc-100 p-4 text-center dark:bg-zinc-700">
            <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              {beats}/{noteValue}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 rounded bg-zinc-200 px-4 py-2 font-medium hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600"
          >
            Abbrechen
          </button>
          <button
            onClick={handleSave}
            className="flex-1 rounded bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
          >
            Übernehmen
          </button>
        </div>
      </div>
    </div>
  )
}
