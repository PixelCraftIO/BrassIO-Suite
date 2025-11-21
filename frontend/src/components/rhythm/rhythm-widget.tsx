'use client'

import { useMemo } from 'react'
import { WebAudioEngine } from '@/lib/metronome-audio-web'
import { useMetronome } from '@/lib/metronome-ui'
import { TempoControls } from './tempo-controls'
import { TimeSignatureSelector } from '../metronome/time-signature-selector'
import { BeatVisualizer } from '../metronome/beat-visualizer'
import { PlaybackControls } from '../metronome/playback-controls'

export function RhythmWidget() {
  const audioEngine = useMemo(() => new WebAudioEngine(), [])
  const metronome = useMetronome(audioEngine)

  return (
    <div className="space-y-8">
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
