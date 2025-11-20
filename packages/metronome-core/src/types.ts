export interface TimeSignature {
  beats: number      // 2, 3, 4, 5, 6
  noteValue: number  // 4, 8, 16
}

export enum BeatType {
  Normal = 'normal',         // Regular beat - 400 Hz
  Accented = 'accented',     // Accented beat - 600 Hz
  Downbeat = 'downbeat',     // Downbeat - 800 Hz
  Subdivision = 'subdivision', // Subdivision beat - 300 Hz
}

export enum SubdivisionType {
  None = 1,        // 1 click per beat (quarter note)
  Eighth = 2,      // 2 clicks (eighth notes)
  Triplet = 3,     // 3 clicks (triplets)
  Sixteenth = 4,   // 4 clicks (sixteenth notes)
  Quintuplet = 5,  // 5 clicks (quintuplets)
  Sextuplet = 6,   // 6 clicks (sextuplets)
}

export interface SubBeatConfig {
  dotted: boolean   // 1.5x duration
  rest: boolean     // No sound
}

export interface BeatConfig {
  type: BeatType               // Beat emphasis (normal/accented/downbeat)
  subdivision: SubdivisionType // Number of subdivisions for this beat
  subBeatConfigs: SubBeatConfig[] // Config for each sub-beat
}

// Visual representation of a sub-beat (calculated from BeatConfig)
export interface VisualSubBeat {
  beatIndex: number
  subBeatIndex: number
  isOverflow: boolean
  overflowFromBeat: number
  config: SubBeatConfig
  beatType: BeatType
}

export interface MetronomeConfig {
  bpm: number
  timeSignature: TimeSignature
  beatTypes: BeatType[]     // Deprecated: kept for backwards compatibility
  beatConfigs?: BeatConfig[] // New: per-beat configuration with subdivisions
}

export interface MetronomeState {
  config: MetronomeConfig
  isPlaying: boolean
  currentBeat: number  // 0-indexed
}

export interface AudioEngine {
  playClick(beatType: BeatType): void | Promise<void>
  prepare(): void | Promise<void>
  dispose(): void | Promise<void>
}

export type BeatCallback = (
  beat: number,           // Main beat number (0-indexed)
  beatType: BeatType,     // Type of the click
  subBeat: number,        // Subdivision index within the beat (0-indexed)
  totalSubBeats: number   // Total subdivisions for this beat
) => void

// Rhythm Sequence Types (Multi-Measure)
export interface Measure {
  id: string
  timeSignature: TimeSignature
  bpm: number
  beatConfigs: BeatConfig[]
}

export interface RhythmSequence {
  measures: Measure[]
  defaultBpm: number
  defaultTimeSignature: TimeSignature
}

export type SequenceBeatCallback = (
  measureIndex: number,   // Current measure (0-indexed)
  beat: number,           // Beat within measure (0-indexed)
  beatType: BeatType,
  subBeat: number,
  totalSubBeats: number
) => void
