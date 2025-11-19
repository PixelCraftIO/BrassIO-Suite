import type { TimeSignature } from './types'

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
