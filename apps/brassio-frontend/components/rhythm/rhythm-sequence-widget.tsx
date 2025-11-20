'use client'

import { useRef, useState } from 'react'
import { WebAudioEngine } from '@brassio/metronome-audio-web'
import { useRhythmSequence } from '@brassio/metronome-ui'
import { TIME_SIGNATURES, MAX_MEASURES } from '@brassio/metronome-core'
import { MeasureEditor } from './measure-editor'
import { BpmModal } from './bpm-modal'

export function RhythmSequenceWidget() {
  const audioEngine = useRef(new WebAudioEngine()).current
  const rhythm = useRhythmSequence(audioEngine)

  const [defaultBpmModalVisible, setDefaultBpmModalVisible] = useState(false)
  const [showDefaultTimeSignatureSelector, setShowDefaultTimeSignatureSelector] = useState(false)

  return (
    <div className="space-y-6">
      {/* Global Settings */}
      <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900">
        <h3 className="mb-3 text-sm font-semibold opacity-70">Standard-Einstellungen</h3>
        <div className="flex flex-wrap gap-4">
          {/* Default BPM */}
          <button
            onClick={() => setDefaultBpmModalVisible(true)}
            className="rounded-lg bg-white px-4 py-2 shadow-sm hover:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          >
            <span className="text-2xl font-bold">{rhythm.defaultBpm}</span>
            <span className="ml-1 text-sm opacity-60">BPM</span>
          </button>

          {/* Default Time Signature */}
          <div className="relative">
            <button
              onClick={() => setShowDefaultTimeSignatureSelector(!showDefaultTimeSignatureSelector)}
              className="rounded-lg bg-white px-4 py-2 shadow-sm hover:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-700"
            >
              <span className="text-2xl font-bold">
                {rhythm.defaultTimeSignature.beats}/{rhythm.defaultTimeSignature.noteValue}
              </span>
            </button>

            {showDefaultTimeSignatureSelector && (
              <div className="absolute left-0 top-full z-10 mt-1 rounded-lg border border-zinc-200 bg-white p-2 shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
                <div className="flex gap-1">
                  {TIME_SIGNATURES.map((ts) => (
                    <button
                      key={`${ts.beats}/${ts.noteValue}`}
                      onClick={() => {
                        rhythm.setDefaultTimeSignature(ts)
                        setShowDefaultTimeSignatureSelector(false)
                      }}
                      className={`rounded px-3 py-2 ${
                        ts.beats === rhythm.defaultTimeSignature.beats &&
                        ts.noteValue === rhythm.defaultTimeSignature.noteValue
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
      </div>

      {/* Measures */}
      <div className="space-y-4">
        {rhythm.measures.map((measure, index) => (
          <MeasureEditor
            key={measure.id}
            measure={measure}
            measureIndex={index}
            totalMeasures={rhythm.measures.length}
            defaultBpm={rhythm.defaultBpm}
            defaultTimeSignature={rhythm.defaultTimeSignature}
            isCurrentMeasure={rhythm.currentMeasureIndex === index}
            currentBeat={rhythm.currentBeat}
            currentSubBeat={rhythm.currentSubBeat}
            isPlaying={rhythm.isPlaying}
            onBpmChange={(bpm) => rhythm.setMeasureBpm(measure.id, bpm)}
            onTimeSignatureChange={(ts) => rhythm.setMeasureTimeSignature(measure.id, ts)}
            onBeatConfigChange={(beatIndex, config) =>
              rhythm.setMeasureBeatConfig(measure.id, beatIndex, config)
            }
            onMoveUp={() => rhythm.moveMeasureUp(measure.id)}
            onMoveDown={() => rhythm.moveMeasureDown(measure.id)}
            onRemove={() => rhythm.removeMeasure(measure.id)}
          />
        ))}
      </div>

      {/* Add Measure Button */}
      {rhythm.measures.length < MAX_MEASURES && (
        <button
          onClick={rhythm.addMeasure}
          className="w-full rounded-lg border-2 border-dashed border-zinc-300 py-3 text-zinc-500 hover:border-amber-500 hover:text-amber-500 dark:border-zinc-600 dark:text-zinc-400 dark:hover:border-amber-400 dark:hover:text-amber-400"
        >
          + Takt hinzufügen
        </button>
      )}

      {/* Playback Controls */}
      <div className="flex justify-center">
        <button
          onClick={rhythm.toggle}
          className={`rounded-lg px-8 py-4 text-lg font-bold ${
            rhythm.isPlaying
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-amber-500 text-black hover:bg-amber-400'
          }`}
        >
          {rhythm.isPlaying ? '■ STOP' : '▶ START'}
        </button>
      </div>

      {/* Default BPM Modal */}
      <BpmModal
        visible={defaultBpmModalVisible}
        currentBpm={rhythm.defaultBpm}
        onBpmChange={rhythm.setDefaultBpm}
        onClose={() => setDefaultBpmModalVisible(false)}
      />
    </div>
  )
}
