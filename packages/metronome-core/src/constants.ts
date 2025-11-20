import type { TimeSignature, BeatConfig, Measure, RhythmSequence } from './types'
import { BeatType, SubdivisionType } from './types'

export const MIN_BPM = 30
export const MAX_BPM = 300
export const DEFAULT_BPM = 120

export const TIME_SIGNATURES: TimeSignature[] = [
  { beats: 2, noteValue: 4 },
  { beats: 3, noteValue: 4 },
  { beats: 4, noteValue: 4 },
  { beats: 5, noteValue: 4 },
  { beats: 6, noteValue: 8 },
]

export const DEFAULT_TIME_SIGNATURE: TimeSignature = { beats: 4, noteValue: 4 }

export const BPM_ADJUSTMENTS = {
  SMALL: 1,
  LARGE: 10,
}

/**
 * Creates default beat types for a given number of beats
 * First beat is Downbeat, rest are Normal
 */
export function createDefaultBeatTypes(numBeats: number): BeatType[] {
  return Array.from({ length: numBeats }, (_, i) =>
    i === 0 ? BeatType.Downbeat : BeatType.Normal
  )
}

/**
 * Cycles to the next beat type
 * Normal -> Accented -> Downbeat -> Normal
 */
export function cycleBeatType(current: BeatType): BeatType {
  switch (current) {
    case BeatType.Normal:
      return BeatType.Accented
    case BeatType.Accented:
      return BeatType.Downbeat
    case BeatType.Downbeat:
      return BeatType.Normal
    case BeatType.Subdivision:
      return BeatType.Normal
    default:
      return BeatType.Normal
  }
}

/**
 * Creates default beat configs for a given number of beats
 * First beat is Downbeat with no subdivision, rest are Normal with no subdivision
 */
export function createDefaultBeatConfigs(numBeats: number): BeatConfig[] {
  return Array.from({ length: numBeats }, (_, i) => ({
    type: i === 0 ? BeatType.Downbeat : BeatType.Normal,
    subdivision: SubdivisionType.None,
  }))
}

/**
 * Cycles to the next subdivision type
 */
export function cycleSubdivision(current: SubdivisionType): SubdivisionType {
  switch (current) {
    case SubdivisionType.None:
      return SubdivisionType.Eighth
    case SubdivisionType.Eighth:
      return SubdivisionType.Triplet
    case SubdivisionType.Triplet:
      return SubdivisionType.Sixteenth
    case SubdivisionType.Sixteenth:
      return SubdivisionType.Quintuplet
    case SubdivisionType.Quintuplet:
      return SubdivisionType.Sextuplet
    case SubdivisionType.Sextuplet:
      return SubdivisionType.None
    default:
      return SubdivisionType.None
  }
}

// Rhythm Sequence Constants
export const MAX_MEASURES = 4

/**
 * Generates a unique ID for measures
 */
export function generateMeasureId(): string {
  return `measure-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Creates a new measure with default values
 */
export function createDefaultMeasure(
  timeSignature: TimeSignature = DEFAULT_TIME_SIGNATURE,
  bpm: number = DEFAULT_BPM
): Measure {
  return {
    id: generateMeasureId(),
    timeSignature,
    bpm,
    beatConfigs: createDefaultBeatConfigs(timeSignature.beats),
  }
}

/**
 * Creates a default rhythm sequence with one measure
 */
export function createDefaultRhythmSequence(): RhythmSequence {
  return {
    measures: [createDefaultMeasure()],
    defaultBpm: DEFAULT_BPM,
    defaultTimeSignature: DEFAULT_TIME_SIGNATURE,
  }
}
