'use client'

import { useState, useEffect } from 'react'
import type { RhythmSequence } from '@/lib/metronome-core'

interface SavedRhythm {
  id: string
  name: string
  sequence: RhythmSequence
  createdAt: number
}

interface RhythmLibraryProps {
  currentSequence: RhythmSequence
  onLoad: (sequence: RhythmSequence) => void
}

const STORAGE_KEY = 'brassio-rhythm-library'

export function RhythmLibrary({ currentSequence, onLoad }: RhythmLibraryProps) {
  const [savedRhythms, setSavedRhythms] = useState<SavedRhythm[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [saveName, setSaveName] = useState('')
  const [showSaveDialog, setShowSaveDialog] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setSavedRhythms(JSON.parse(stored))
      } catch {
        console.error('Failed to parse saved rhythms')
      }
    }
  }, [])

  // Save to localStorage when rhythms change
  const saveToStorage = (rhythms: SavedRhythm[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rhythms))
    setSavedRhythms(rhythms)
  }

  const handleSave = () => {
    if (!saveName.trim()) return

    const newRhythm: SavedRhythm = {
      id: Date.now().toString(),
      name: saveName.trim(),
      sequence: currentSequence,
      createdAt: Date.now(),
    }

    saveToStorage([newRhythm, ...savedRhythms])
    setSaveName('')
    setShowSaveDialog(false)
  }

  const handleLoad = (rhythm: SavedRhythm) => {
    onLoad(rhythm.sequence)
    setIsOpen(false)
  }

  const handleDelete = (id: string) => {
    saveToStorage(savedRhythms.filter((r) => r.id !== id))
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  return (
    <div className="space-y-4">
      {/* Action Buttons */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => setShowSaveDialog(true)}
          className="rounded-lg bg-zinc-100 px-4 py-2 font-semibold hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
        >
          💾 Speichern
        </button>
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-lg bg-zinc-100 px-4 py-2 font-semibold hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
        >
          📚 Bibliothek ({savedRhythms.length})
        </button>
      </div>

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6 dark:bg-zinc-900">
            <h3 className="mb-4 text-xl font-bold">Rhythmus speichern</h3>
            <input
              type="text"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              placeholder="Name für diesen Rhythmus..."
              className="mb-4 w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 dark:border-zinc-700 dark:bg-zinc-800"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowSaveDialog(false)
                  setSaveName('')
                }}
                className="rounded-lg px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                Abbrechen
              </button>
              <button
                onClick={handleSave}
                disabled={!saveName.trim()}
                className="rounded-lg bg-[#B8860B] px-4 py-2 font-semibold text-black hover:bg-[#D4AF37] disabled:opacity-50"
              >
                Speichern
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Library Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 max-h-[80vh] w-full max-w-lg overflow-hidden rounded-lg bg-white dark:bg-zinc-900">
            <div className="flex items-center justify-between border-b border-zinc-200 p-4 dark:border-zinc-700">
              <h3 className="text-xl font-bold">Rhythmus-Bibliothek</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-2xl hover:opacity-70"
              >
                ×
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-4">
              {savedRhythms.length === 0 ? (
                <p className="py-8 text-center text-zinc-500">
                  Noch keine Rhythmen gespeichert.
                </p>
              ) : (
                <div className="space-y-3">
                  {savedRhythms.map((rhythm) => (
                    <div
                      key={rhythm.id}
                      className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 dark:border-zinc-700"
                    >
                      <div className="flex-1">
                        <div className="font-semibold">{rhythm.name}</div>
                        <div className="text-sm text-zinc-500">
                          {rhythm.sequence.measures.length} Takte · {rhythm.sequence.defaultBpm} BPM · {formatDate(rhythm.createdAt)}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleLoad(rhythm)}
                          className="rounded-lg bg-[#B8860B] px-3 py-1 text-sm font-semibold text-black hover:bg-[#D4AF37]"
                        >
                          Laden
                        </button>
                        <button
                          onClick={() => handleDelete(rhythm.id)}
                          className="rounded-lg bg-red-500 px-3 py-1 text-sm font-semibold text-white hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
