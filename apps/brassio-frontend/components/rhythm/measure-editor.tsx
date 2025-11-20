'use client'

import { useState } from 'react'
import type { Measure, TimeSignature, BeatConfig } from '@brassio/metronome-core'
import { TIME_SIGNATURES } from '@brassio/metronome-core'
import { BeatVisualizer } from '../metronome/beat-visualizer'
import { BpmModal } from './bpm-modal'

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

  const isDefaultBpm = measure.bpm === defaultBpm
  const isDefaultTimeSignature =
    measure.timeSignature.beats === defaultTimeSignature.beats &&
    measure.timeSignature.noteValue === defaultTimeSignature.noteValue

  return (
    <div
      className={`rounded-lg border p-4 ${
        isCurrentMeasure && isPlaying
          ? 'border-amber-500 bg-amber-50 dark:border-amber-400 dark:bg-amber-900/20'
          : 'border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800'
      }`}
    >
      {/* Controls Row */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Move buttons */}
          <div className="flex gap-1">
            <button
              onClick={onMoveUp}
              disabled={measureIndex === 0}
              className="rounded p-1 text-sm disabled:opacity-30 hover:bg-zinc-100 dark:hover:bg-zinc-700"
              title="Nach oben"
            >
              ↑
            </button>
            <button
              onClick={onMoveDown}
              disabled={measureIndex === totalMeasures - 1}
              className="rounded p-1 text-sm disabled:opacity-30 hover:bg-zinc-100 dark:hover:bg-zinc-700"
              title="Nach unten"
            >
              ↓
            </button>
          </div>

          {/* BPM */}
          <button
            onClick={() => setBpmModalVisible(true)}
            className={`rounded px-3 py-1 text-sm ${
              isDefaultBpm
                ? 'text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300'
                : 'font-semibold text-amber-600 dark:text-amber-400'
            }`}
          >
            {measure.bpm} BPM
          </button>

          {/* Time Signature */}
          <div className="relative">
            <button
              onClick={() => setShowTimeSignatureSelector(!showTimeSignatureSelector)}
              className={`rounded px-3 py-1 text-sm ${
                isDefaultTimeSignature
                  ? 'text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300'
                  : 'font-semibold text-amber-600 dark:text-amber-400'
              }`}
            >
              {measure.timeSignature.beats}/{measure.timeSignature.noteValue}
            </button>

            {/* Time Signature Dropdown */}
            {showTimeSignatureSelector && (
              <div className="absolute left-0 top-full z-10 mt-1 rounded-lg border border-zinc-200 bg-white p-2 shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
                <div className="flex gap-1">
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
                          ? 'bg-amber-500 text-white'
                          : 'hover:bg-zinc-100 dark:hover:bg-zinc-700'
                      }`}
                    >
                      {ts.beats}/{ts.noteValue}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Delete button */}
        {totalMeasures > 1 && (
          <button
            onClick={onRemove}
            className="rounded p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
            title="Takt löschen"
          >
            ✕
          </button>
        )}
      </div>

      {/* Beat Visualizer */}
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
    </div>
  )
}
