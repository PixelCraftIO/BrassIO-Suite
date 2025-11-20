'use client'

import { useState, useEffect } from 'react'
import { MIN_BPM, MAX_BPM } from '@brassio/metronome-core'

interface BpmModalProps {
  visible: boolean
  currentBpm: number
  onBpmChange: (bpm: number) => void
  onClose: () => void
}

export function BpmModal({ visible, currentBpm, onBpmChange, onClose }: BpmModalProps) {
  const [inputValue, setInputValue] = useState(currentBpm.toString())

  useEffect(() => {
    if (visible) {
      setInputValue(currentBpm.toString())
    }
  }, [visible, currentBpm])

  const handleConfirm = () => {
    const value = parseInt(inputValue, 10)
    if (!isNaN(value)) {
      const clampedValue = Math.max(MIN_BPM, Math.min(MAX_BPM, value))
      onBpmChange(clampedValue)
    }
    onClose()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, '')
    setInputValue(numericValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleConfirm()
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-white dark:bg-zinc-800 rounded-2xl p-6 w-[90%] max-w-[300px]"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-center mb-6">
          Tempo einstellen
        </h2>

        <div className="flex items-center justify-center gap-3 mb-2">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="text-5xl font-bold text-center w-36 p-2 rounded-lg bg-zinc-100 dark:bg-zinc-700"
            maxLength={3}
            autoFocus
          />
          <span className="text-xl opacity-70">BPM</span>
        </div>

        <p className="text-center text-sm opacity-50 mb-6">
          {MIN_BPM} - {MAX_BPM}
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-lg bg-zinc-200 dark:bg-zinc-700 font-semibold"
          >
            Abbrechen
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-3 rounded-lg bg-blue-500 text-white font-semibold"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  )
}
