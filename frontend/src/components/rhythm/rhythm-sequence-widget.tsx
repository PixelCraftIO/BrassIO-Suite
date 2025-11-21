'use client'

import { useMemo, useState } from 'react'
import { WebAudioEngine } from '@/lib/metronome-audio-web'
import { useRhythmSequence } from '@/lib/metronome-ui'
import { TIME_SIGNATURES, MAX_MEASURES } from '@/lib/metronome-core'
import { MeasureEditor } from './measure-editor'
import { BpmModal } from './bpm-modal'
import { CustomTimeSignatureModal } from '../metronome/custom-time-signature-modal'
import { RhythmLibrary } from './rhythm-library'

export function RhythmSequenceWidget() {
  const audioEngine = useMemo(() => new WebAudioEngine(), [])
  const rhythm = useRhythmSequence(audioEngine)

  const [defaultBpmModalVisible, setDefaultBpmModalVisible] = useState(false)
  const [showCustomTimeSignatureModal, setShowCustomTimeSignatureModal] = useState(false)

  return (
    <div className="space-y-8 rounded-lg border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
      {/* Default BPM - zentriert wie im Metronom */}
      <div className="text-center">
        <button
          onClick={() => setDefaultBpmModalVisible(true)}
          className="group"
        >
          <span className="text-6xl font-bold">{rhythm.defaultBpm}</span>
          <span className="ml-2 text-xl opacity-60 group-hover:opacity-100">BPM</span>
        </button>
      </div>

      {/* Default Time Signature - zentriert */}
      <div className="space-y-3">
        <div className="text-center font-semibold">Standard-Taktart</div>
        <div className="flex flex-wrap justify-center gap-2">
          {TIME_SIGNATURES.map((ts) => (
            <button
              key={`${ts.beats}/${ts.noteValue}`}
              onClick={() => rhythm.setDefaultTimeSignature(ts)}
              className={`rounded-lg px-4 py-2 font-semibold transition-colors ${
                ts.beats === rhythm.defaultTimeSignature.beats &&
                ts.noteValue === rhythm.defaultTimeSignature.noteValue
                  ? 'bg-[#B8860B] text-black dark:bg-[#D4AF37]'
                  : 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700'
              }`}
            >
              {ts.beats}/{ts.noteValue}
            </button>
          ))}
          <button
            onClick={() => setShowCustomTimeSignatureModal(true)}
            className={`rounded-lg px-4 py-2 font-semibold transition-colors ${
              !TIME_SIGNATURES.some(
                (ts) =>
                  ts.beats === rhythm.defaultTimeSignature.beats &&
                  ts.noteValue === rhythm.defaultTimeSignature.noteValue
              )
                ? 'bg-[#B8860B] text-black dark:bg-[#D4AF37]'
                : 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700'
            }`}
          >
            {!TIME_SIGNATURES.some(
              (ts) =>
                ts.beats === rhythm.defaultTimeSignature.beats &&
                ts.noteValue === rhythm.defaultTimeSignature.noteValue
            )
              ? `${rhythm.defaultTimeSignature.beats}/${rhythm.defaultTimeSignature.noteValue}`
              : '+ Eigene'}
          </button>
        </div>
      </div>

      {/* Measures - ohne starke Umrandung */}
      <div className="space-y-6">
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

      {/* Add Measure Button - zentriert */}
      {rhythm.measures.length < MAX_MEASURES && (
        <div className="text-center">
          <button
            onClick={rhythm.addMeasure}
            className="rounded-lg bg-zinc-100 px-6 py-3 font-semibold hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          >
            + Takt hinzufügen
          </button>
        </div>
      )}

      {/* Playback Controls - zentriert */}
      <div className="flex justify-center">
        <button
          onClick={rhythm.toggle}
          className={`rounded-lg px-12 py-4 text-xl font-bold ${
            rhythm.isPlaying
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-[#B8860B] text-black hover:bg-[#D4AF37] dark:bg-[#D4AF37]'
          }`}
        >
          {rhythm.isPlaying ? '■ STOP' : '▶ START'}
        </button>
      </div>

      {/* Modals */}
      <BpmModal
        visible={defaultBpmModalVisible}
        currentBpm={rhythm.defaultBpm}
        onBpmChange={rhythm.setDefaultBpm}
        onClose={() => setDefaultBpmModalVisible(false)}
      />

      <CustomTimeSignatureModal
        isOpen={showCustomTimeSignatureModal}
        onClose={() => setShowCustomTimeSignatureModal(false)}
        onSave={rhythm.setDefaultTimeSignature}
        currentTimeSignature={rhythm.defaultTimeSignature}
      />

      {/* Rhythm Library */}
      <RhythmLibrary
        currentSequence={rhythm.getSequence()}
        onLoad={rhythm.loadSequence}
      />
    </div>
  )
}
