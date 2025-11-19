export interface TimeSignature {
  beats: number      // 2, 3, 4, 5, 6
  noteValue: number  // 4, 8, 16
}

export interface MetronomeConfig {
  bpm: number
  timeSignature: TimeSignature
}

export interface MetronomeState {
  config: MetronomeConfig
  isPlaying: boolean
  currentBeat: number  // 0-indexed
}

export interface AudioEngine {
  playClick(isDownbeat: boolean): void | Promise<void>
  prepare(): void | Promise<void>
  dispose(): void | Promise<void>
}

export type BeatCallback = (beat: number, isDownbeat: boolean) => void
