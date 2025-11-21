import { useState, useEffect, useCallback, useRef } from 'react'
import { RhythmSequenceEngine } from '../../metronome-core'
import type {
  AudioEngine,
  TimeSignature,
  BeatConfig,
  Measure,
  RhythmSequence
} from '../../metronome-core'
import {
  DEFAULT_BPM,
  DEFAULT_TIME_SIGNATURE,
  MIN_BPM,
  MAX_BPM,
  MAX_MEASURES,
  createDefaultMeasure,
  createDefaultBeatConfigs,
  createDefaultRhythmSequence
} from '../../metronome-core'

interface UseRhythmSequenceResult {
  // Sequence state
  measures: Measure[]
  defaultBpm: number
  defaultTimeSignature: TimeSignature

  // Playback state
  isPlaying: boolean
  currentMeasureIndex: number
  currentBeat: number
  currentSubBeat: number

  // Global controls
  setDefaultBpm: (bpm: number) => void
  setDefaultTimeSignature: (ts: TimeSignature) => void

  // Measure controls
  addMeasure: () => void
  removeMeasure: (measureId: string) => void
  moveMeasureUp: (measureId: string) => void
  moveMeasureDown: (measureId: string) => void

  // Individual measure updates
  setMeasureBpm: (measureId: string, bpm: number) => void
  setMeasureTimeSignature: (measureId: string, ts: TimeSignature) => void
  setMeasureBeatConfig: (measureId: string, beatIndex: number, config: BeatConfig) => void

  // Playback controls
  start: () => void
  stop: () => void
  toggle: () => void

  // Library
  loadSequence: (sequence: RhythmSequence) => void
  getSequence: () => RhythmSequence
}

export function useRhythmSequence(audioEngine: AudioEngine): UseRhythmSequenceResult {
  const [sequence, setSequence] = useState<RhythmSequence>(createDefaultRhythmSequence)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentMeasureIndex, setCurrentMeasureIndex] = useState(0)
  const [currentBeat, setCurrentBeat] = useState(0)
  const [currentSubBeat, setCurrentSubBeat] = useState(0)

  const engineRef = useRef<RhythmSequenceEngine | null>(null)

  // Initialize engine
  useEffect(() => {
    engineRef.current = new RhythmSequenceEngine(sequence, audioEngine)

    return () => {
      engineRef.current?.dispose()
    }
  }, [audioEngine])

  // Update engine when sequence changes
  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.updateSequence(sequence)
    }
  }, [sequence])

  // Global controls
  const setDefaultBpm = useCallback((bpm: number) => {
    const clampedBpm = Math.max(MIN_BPM, Math.min(MAX_BPM, Math.round(bpm)))
    setSequence(prev => ({ ...prev, defaultBpm: clampedBpm }))
  }, [])

  const setDefaultTimeSignature = useCallback((ts: TimeSignature) => {
    setSequence(prev => ({ ...prev, defaultTimeSignature: ts }))
  }, [])

  // Measure controls
  const addMeasure = useCallback(() => {
    setSequence(prev => {
      if (prev.measures.length >= MAX_MEASURES) return prev

      const newMeasure = createDefaultMeasure(
        prev.defaultTimeSignature,
        prev.defaultBpm
      )

      return {
        ...prev,
        measures: [...prev.measures, newMeasure]
      }
    })
  }, [])

  const removeMeasure = useCallback((measureId: string) => {
    setSequence(prev => {
      if (prev.measures.length <= 1) return prev

      return {
        ...prev,
        measures: prev.measures.filter(m => m.id !== measureId)
      }
    })
  }, [])

  const moveMeasureUp = useCallback((measureId: string) => {
    setSequence(prev => {
      const index = prev.measures.findIndex(m => m.id === measureId)
      if (index <= 0) return prev

      const newMeasures = [...prev.measures]
      const temp = newMeasures[index - 1]
      newMeasures[index - 1] = newMeasures[index]
      newMeasures[index] = temp

      return { ...prev, measures: newMeasures }
    })
  }, [])

  const moveMeasureDown = useCallback((measureId: string) => {
    setSequence(prev => {
      const index = prev.measures.findIndex(m => m.id === measureId)
      if (index < 0 || index >= prev.measures.length - 1) return prev

      const newMeasures = [...prev.measures]
      const temp = newMeasures[index + 1]
      newMeasures[index + 1] = newMeasures[index]
      newMeasures[index] = temp

      return { ...prev, measures: newMeasures }
    })
  }, [])

  // Individual measure updates
  const setMeasureBpm = useCallback((measureId: string, bpm: number) => {
    const clampedBpm = Math.max(MIN_BPM, Math.min(MAX_BPM, Math.round(bpm)))
    setSequence(prev => ({
      ...prev,
      measures: prev.measures.map(m =>
        m.id === measureId ? { ...m, bpm: clampedBpm } : m
      )
    }))
  }, [])

  const setMeasureTimeSignature = useCallback((measureId: string, ts: TimeSignature) => {
    setSequence(prev => ({
      ...prev,
      measures: prev.measures.map(m =>
        m.id === measureId
          ? {
              ...m,
              timeSignature: ts,
              beatConfigs: createDefaultBeatConfigs(ts.beats)
            }
          : m
      )
    }))
  }, [])

  const setMeasureBeatConfig = useCallback((measureId: string, beatIndex: number, config: BeatConfig) => {
    setSequence(prev => ({
      ...prev,
      measures: prev.measures.map(m => {
        if (m.id !== measureId) return m

        const newBeatConfigs = [...m.beatConfigs]
        newBeatConfigs[beatIndex] = config

        return { ...m, beatConfigs: newBeatConfigs }
      })
    }))
  }, [])

  // Playback controls
  const start = useCallback(async () => {
    if (!engineRef.current || isPlaying) return

    // Stop playback when sequence changes during play
    if (isPlaying && engineRef.current) {
      engineRef.current.stop()
      setIsPlaying(false)
      setCurrentMeasureIndex(0)
      setCurrentBeat(0)
      setCurrentSubBeat(0)
    }

    setIsPlaying(true)
    await engineRef.current.start((measureIndex, beat, beatType, subBeat, totalSubBeats) => {
      setCurrentMeasureIndex(measureIndex)
      setCurrentBeat(beat)
      setCurrentSubBeat(subBeat)
    })
  }, [isPlaying])

  const stop = useCallback(() => {
    if (!engineRef.current || !isPlaying) return

    engineRef.current.stop()
    setIsPlaying(false)
    setCurrentMeasureIndex(0)
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

  // Library functions
  const loadSequence = useCallback((newSequence: RhythmSequence) => {
    if (isPlaying) {
      stop()
    }
    setSequence(newSequence)
  }, [isPlaying, stop])

  const getSequence = useCallback(() => {
    return sequence
  }, [sequence])

  return {
    measures: sequence.measures,
    defaultBpm: sequence.defaultBpm,
    defaultTimeSignature: sequence.defaultTimeSignature,
    isPlaying,
    currentMeasureIndex,
    currentBeat,
    currentSubBeat,
    setDefaultBpm,
    setDefaultTimeSignature,
    addMeasure,
    removeMeasure,
    moveMeasureUp,
    moveMeasureDown,
    setMeasureBpm,
    setMeasureTimeSignature,
    setMeasureBeatConfig,
    start,
    stop,
    toggle,
    loadSequence,
    getSequence,
  }
}
