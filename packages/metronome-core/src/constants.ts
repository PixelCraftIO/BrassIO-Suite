import type { TimeSignature } from './types'
import { BeatType } from './types'

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
  }
}
