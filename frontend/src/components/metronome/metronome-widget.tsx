'use client'

import { useMemo } from 'react'
import { WebAudioEngine } from '@/lib/metronome-audio-web'
import { useMetronome } from '@/lib/metronome-ui'
import { TempoControls } from './tempo-controls'
import { TimeSignatureSelector } from './time-signature-selector'
import { BeatVisualizer } from './beat-visualizer'
import { PlaybackControls } from './playback-controls'

export function MetronomeWidget() {
  const audioEngine = useMemo(() => new WebAudioEngine(), [])
  const metronome = useMetronome(audioEngine)

  return (
    <div className="space-y-8 rounded-lg border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
      <TempoControls
        bpm={metronome.bpm}
        onBpmChange={metronome.setBpm}
        onAdjust={metronome.adjustBpm}
      />

      <TimeSignatureSelector
        value={metronome.timeSignature}
        onChange={metronome.setTimeSignature}
      />

      <BeatVisualizer
        currentBeat={metronome.currentBeat}
        currentSubBeat={metronome.currentSubBeat}
        totalBeats={metronome.totalBeats}
        isPlaying={metronome.isPlaying}
        beatTypes={metronome.beatTypes}
        beatConfigs={metronome.beatConfigs}
        onBeatConfigChange={metronome.setBeatConfig}
      />

      <PlaybackControls
        isPlaying={metronome.isPlaying}
        onStart={metronome.start}
        onStop={metronome.stop}
      />
    </div>
  )
}
