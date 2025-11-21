import { useState, useEffect, useCallback, useRef } from 'react'
import { MetronomeEngine } from '../../metronome-core'
import type { MetronomeConfig, AudioEngine, TimeSignature, BeatType, BeatConfig, SubdivisionType } from '../../metronome-core'
import { DEFAULT_BPM, DEFAULT_TIME_SIGNATURE, MIN_BPM, MAX_BPM, createDefaultBeatTypes, createDefaultBeatConfigs } from '../../metronome-core'

interface UseMetronomeResult {
  bpm: number
  setBpm: (bpm: number) => void
  adjustBpm: (delta: number) => void
  timeSignature: TimeSignature
  setTimeSignature: (ts: TimeSignature) => void
  beatTypes: BeatType[]
  setBeatType: (beatIndex: number, newType: BeatType) => void
  beatConfigs: BeatConfig[]
  setBeatConfig: (beatIndex: number, config: BeatConfig) => void
  setSubdivision: (beatIndex: number, subdivision: SubdivisionType) => void
  isPlaying: boolean
  start: () => void
  stop: () => void
  toggle: () => void
  currentBeat: number
  currentSubBeat: number
  totalBeats: number
}

export function useMetronome(audioEngine: AudioEngine): UseMetronomeResult {
  const [bpm, setBpmState] = useState(DEFAULT_BPM)
  const [timeSignature, setTimeSignatureState] = useState(DEFAULT_TIME_SIGNATURE)
  const [beatConfigs, setBeatConfigsState] = useState<BeatConfig[]>(() => createDefaultBeatConfigs(DEFAULT_TIME_SIGNATURE.beats))
  const [beatTypes, setBeatTypesState] = useState<BeatType[]>(() => beatConfigs.map(bc => bc.type))
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentBeat, setCurrentBeat] = useState(0)
  const [currentSubBeat, setCurrentSubBeat] = useState(0)

  const engineRef = useRef<MetronomeEngine | null>(null)

  // Sync beatTypes with beatConfigs
  useEffect(() => {
    setBeatTypesState(beatConfigs.map(bc => bc.type))
  }, [beatConfigs])

  // Initialize engine
  useEffect(() => {
    const config: MetronomeConfig = { bpm, timeSignature, beatTypes, beatConfigs }
    engineRef.current = new MetronomeEngine(config, audioEngine)

    return () => {
      engineRef.current?.dispose()
    }
  }, [audioEngine])

  // Update engine config when bpm, time signature, or beat configs change
  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.updateConfig({ bpm, timeSignature, beatConfigs })
    }
  }, [bpm, timeSignature, beatConfigs])

  const start = useCallback(async () => {
    if (!engineRef.current || isPlaying) return

    setIsPlaying(true)
    await engineRef.current.start((beat, beatType, subBeat, totalSubBeats) => {
      setCurrentBeat(beat)
      setCurrentSubBeat(subBeat)
    })
  }, [isPlaying])

  const stop = useCallback(() => {
    if (!engineRef.current || !isPlaying) return

    engineRef.current.stop()
    setIsPlaying(false)
    setCurrentBeat(0)
    setCurrentSubBeat(0)
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
      setCurrentSubBeat(0)
    }
    setTimeSignatureState(ts)
    // Reset beat configs to default when time signature changes
    setBeatConfigsState(createDefaultBeatConfigs(ts.beats))
  }, [isPlaying])

  const setBeatType = useCallback((beatIndex: number, newType: BeatType) => {
    setBeatConfigsState(prev => {
      const newBeatConfigs = [...prev]
      newBeatConfigs[beatIndex] = { ...newBeatConfigs[beatIndex], type: newType }
      return newBeatConfigs
    })
  }, [])

  const setBeatConfig = useCallback((beatIndex: number, config: BeatConfig) => {
    setBeatConfigsState(prev => {
      const newBeatConfigs = [...prev]
      newBeatConfigs[beatIndex] = config
      return newBeatConfigs
    })
  }, [])

  const setSubdivision = useCallback((beatIndex: number, subdivision: SubdivisionType) => {
    setBeatConfigsState(prev => {
      const newBeatConfigs = [...prev]
      newBeatConfigs[beatIndex] = { ...newBeatConfigs[beatIndex], subdivision }
      return newBeatConfigs
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
    beatConfigs,
    setBeatConfig,
    setSubdivision,
    isPlaying,
    start,
    stop,
    toggle,
    currentBeat,
    currentSubBeat,
    totalBeats: timeSignature.beats,
  }
}
