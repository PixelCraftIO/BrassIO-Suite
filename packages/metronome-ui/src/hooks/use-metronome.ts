import { useState, useEffect, useCallback, useRef } from 'react'
import { MetronomeEngine } from '@brassio/metronome-core'
import type { MetronomeConfig, AudioEngine, TimeSignature, BeatType } from '@brassio/metronome-core'
import { DEFAULT_BPM, DEFAULT_TIME_SIGNATURE, MIN_BPM, MAX_BPM, createDefaultBeatTypes } from '@brassio/metronome-core'

interface UseMetronomeResult {
  bpm: number
  setBpm: (bpm: number) => void
  adjustBpm: (delta: number) => void
  timeSignature: TimeSignature
  setTimeSignature: (ts: TimeSignature) => void
  beatTypes: BeatType[]
  setBeatType: (beatIndex: number, newType: BeatType) => void
  isPlaying: boolean
  start: () => void
  stop: () => void
  toggle: () => void
  currentBeat: number
  totalBeats: number
}

export function useMetronome(audioEngine: AudioEngine): UseMetronomeResult {
  const [bpm, setBpmState] = useState(DEFAULT_BPM)
  const [timeSignature, setTimeSignatureState] = useState(DEFAULT_TIME_SIGNATURE)
  const [beatTypes, setBeatTypesState] = useState<BeatType[]>(() => createDefaultBeatTypes(DEFAULT_TIME_SIGNATURE.beats))
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentBeat, setCurrentBeat] = useState(0)

  const engineRef = useRef<MetronomeEngine | null>(null)

  // Initialize engine
  useEffect(() => {
    const config: MetronomeConfig = { bpm, timeSignature, beatTypes }
    engineRef.current = new MetronomeEngine(config, audioEngine)

    return () => {
      engineRef.current?.dispose()
    }
  }, [audioEngine])

  // Update engine config when bpm, time signature, or beat types change
  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.updateConfig({ bpm, timeSignature, beatTypes })
    }
  }, [bpm, timeSignature, beatTypes])

  const start = useCallback(async () => {
    if (!engineRef.current || isPlaying) return

    setIsPlaying(true)
    await engineRef.current.start((beat, beatType) => {
      setCurrentBeat(beat)
    })
  }, [isPlaying])

  const stop = useCallback(() => {
    if (!engineRef.current || !isPlaying) return

    engineRef.current.stop()
    setIsPlaying(false)
    setCurrentBeat(0)
  }, [isPlaying])

  const toggle = useCallback(() => {
    if (isPlaying) {
      stop()
    } else {
      start()
    }
  }, [isPlaying, start, stop])

  const setBpm = useCallback((newBpm: number) => {
    const clampedBpm = Math.max(MIN_BPM, Math.min(MAX_BPM, Math.round(newBpm)))
    setBpmState(clampedBpm)
  }, [])

  const adjustBpm = useCallback((delta: number) => {
    setBpm(bpm + delta)
  }, [bpm, setBpm])

  const setTimeSignature = useCallback((ts: TimeSignature) => {
    // Stop playback when changing time signature (user must restart)
    if (isPlaying && engineRef.current) {
      engineRef.current.stop()
      setIsPlaying(false)
      setCurrentBeat(0)
    }
    setTimeSignatureState(ts)
    // Reset beat types to default when time signature changes
    setBeatTypesState(createDefaultBeatTypes(ts.beats))
  }, [isPlaying])

  const setBeatType = useCallback((beatIndex: number, newType: BeatType) => {
    setBeatTypesState(prev => {
      const newBeatTypes = [...prev]
      newBeatTypes[beatIndex] = newType
      return newBeatTypes
    })
  }, [])

  return {
    bpm,
    setBpm,
    adjustBpm,
    timeSignature,
    setTimeSignature,
    beatTypes,
    setBeatType,
    isPlaying,
    start,
    stop,
    toggle,
    currentBeat,
    totalBeats: timeSignature.beats,
  }
}
