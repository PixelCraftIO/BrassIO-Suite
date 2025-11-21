'use client'

import { useState } from 'react'
import type { Measure, TimeSignature, BeatConfig } from '@/lib/metronome-core'
import { TIME_SIGNATURES } from '@/lib/metronome-core'
import { BeatVisualizer } from '../metronome/beat-visualizer'
import { BpmModal } from './bpm-modal'
import { CustomTimeSignatureModal } from '../metronome/custom-time-signature-modal'

interface MeasureEditorProps {
  measure: Measure
  measureIndex: number
  totalMeasures: number
  defaultBpm: number
  defaultTimeSignature: TimeSignature
  isCurrentMeasure: boolean
  currentBeat: number
  currentSubBeat: number
  isPlaying: boolean
  onBpmChange: (bpm: number) => void
  onTimeSignatureChange: (ts: TimeSignature) => void
  onBeatConfigChange: (beatIndex: number, config: BeatConfig) => void
  onMoveUp: () => void
  onMoveDown: () => void
  onRemove: () => void
}

export function MeasureEditor({
  measure,
  measureIndex,
  totalMeasures,
  defaultBpm,
  defaultTimeSignature,
  isCurrentMeasure,
  currentBeat,
  currentSubBeat,
  isPlaying,
  onBpmChange,
  onTimeSignatureChange,
  onBeatConfigChange,
  onMoveUp,
  onMoveDown,
  onRemove,
}: MeasureEditorProps) {
  const [bpmModalVisible, setBpmModalVisible] = useState(false)
  const [showTimeSignatureSelector, setShowTimeSignatureSelector] = useState(false)
  const [showCustomTimeSignatureModal, setShowCustomTimeSignatureModal] = useState(false)

  const isDefaultBpm = measure.bpm === defaultBpm
  const isDefaultTimeSignature =
    measure.timeSignature.beats === defaultTimeSignature.beats &&
    measure.timeSignature.noteValue === defaultTimeSignature.noteValue

  return (
    <div className="space-y-4">
      {/* Takt-Header - zentriert */}
      <div className="flex items-center justify-center gap-4">
        {/* Move buttons */}
        <div className="flex gap-1">
          <button
            onClick={onMoveUp}
            disabled={measureIndex === 0}
            className="rounded p-1.5 text-sm disabled:opacity-30 hover:bg-zinc-100 dark:hover:bg-zinc-700"
            title="Nach oben"
          >
            ↑
          </button>
          <button
            onClick={onMoveDown}
            disabled={measureIndex === totalMeasures - 1}
            className="rounded p-1.5 text-sm disabled:opacity-30 hover:bg-zinc-100 dark:hover:bg-zinc-700"
            title="Nach unten"
          >
            ↓
          </button>
        </div>

        {/* Takt-Nummer */}
        <span className={`text-sm font-semibold ${
          isCurrentMeasure && isPlaying ? 'text-[#B8860B] dark:text-[#D4AF37]' : 'opacity-60'
        }`}>
          Takt {measureIndex + 1}
        </span>

        {/* BPM */}
        <button
          onClick={() => setBpmModalVisible(true)}
          className={`rounded-lg px-3 py-1.5 text-sm ${
            isDefaultBpm
              ? 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700'
              : 'bg-[#B8860B] text-black dark:bg-[#D4AF37]'
          }`}
        >
          {measure.bpm} BPM
        </button>

        {/* Time Signature */}
        <div className="relative">
          <button
            onClick={() => setShowTimeSignatureSelector(!showTimeSignatureSelector)}
            className={`rounded-lg px-3 py-1.5 text-sm ${
              isDefaultTimeSignature
                ? 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700'
                : 'bg-[#B8860B] text-black dark:bg-[#D4AF37]'
            }`}
          >
            {measure.timeSignature.beats}/{measure.timeSignature.noteValue}
          </button>

          {/* Time Signature Dropdown */}
          {showTimeSignatureSelector && (
            <div className="absolute left-1/2 top-full z-10 mt-1 -translate-x-1/2 rounded-lg border border-zinc-200 bg-white p-2 shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
              <div className="flex flex-wrap gap-1">
                {TIME_SIGNATURES.map((ts) => (
                  <button
                    key={`${ts.beats}/${ts.noteValue}`}
                    onClick={() => {
                      onTimeSignatureChange(ts)
                      setShowTimeSignatureSelector(false)
                    }}
                    className={`rounded px-2 py-1 text-sm ${
                      ts.beats === measure.timeSignature.beats &&
                      ts.noteValue === measure.timeSignature.noteValue
                        ? 'bg-[#B8860B] text-black dark:bg-[#D4AF37]'
                        : 'hover:bg-zinc-100 dark:hover:bg-zinc-700'
                    }`}
                  >
                    {ts.beats}/{ts.noteValue}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setShowTimeSignatureSelector(false)
                    setShowCustomTimeSignatureModal(true)
                  }}
                  className="rounded px-2 py-1 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700"
                >
                  + Eigene
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Delete button */}
        {totalMeasures > 1 && (
          <button
            onClick={onRemove}
            className="rounded p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
            title="Takt löschen"
          >
            ✕
          </button>
        )}
      </div>

      {/* Beat Visualizer - zentriert */}
      <BeatVisualizer
        currentBeat={isCurrentMeasure ? currentBeat : -1}
        currentSubBeat={isCurrentMeasure ? currentSubBeat : -1}
        totalBeats={measure.timeSignature.beats}
        isPlaying={isPlaying && isCurrentMeasure}
        beatTypes={measure.beatConfigs.map(bc => bc.type)}
        beatConfigs={measure.beatConfigs}
        onBeatConfigChange={onBeatConfigChange}
      />

      {/* BPM Modal */}
      <BpmModal
        visible={bpmModalVisible}
        currentBpm={measure.bpm}
        onBpmChange={onBpmChange}
        onClose={() => setBpmModalVisible(false)}
      />

      {/* Custom Time Signature Modal */}
      <CustomTimeSignatureModal
        isOpen={showCustomTimeSignatureModal}
        onClose={() => setShowCustomTimeSignatureModal(false)}
        onSave={onTimeSignatureChange}
        currentTimeSignature={measure.timeSignature}
      />
    </div>
  )
}
