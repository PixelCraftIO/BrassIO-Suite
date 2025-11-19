import type { TimeSignature, BeatConfig } from './types'
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
