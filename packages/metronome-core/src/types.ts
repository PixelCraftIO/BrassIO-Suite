export interface TimeSignature {
  beats: number      // 2, 3, 4, 5, 6
  noteValue: number  // 4, 8, 16
}

export enum BeatType {
  Normal = 'normal',      // Regular beat - 400 Hz
  Accented = 'accented',  // Accented beat - 600 Hz
  Downbeat = 'downbeat',  // Downbeat - 800 Hz
}

export interface MetronomeConfig {
  bpm: number
  timeSignature: TimeSignature
  beatTypes: BeatType[]  // One for each beat in the measure
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

export type BeatCallback = (beat: number, beatType: BeatType) => void
