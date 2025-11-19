import type { MetronomeConfig, AudioEngine, BeatCallback } from './types'
import { createDefaultBeatTypes } from './constants'

export class MetronomeEngine {
  private config: MetronomeConfig
  private audioEngine: AudioEngine
  private isRunning = false
  private currentBeat = 0
  private nextBeatTime = 0
  private scheduleAheadTime = 0.1 // seconds
  private timerID: any = null
  private onBeatCallback: BeatCallback | null = null

  constructor(config: MetronomeConfig, audioEngine: AudioEngine) {
    // Ensure beatTypes array exists and matches timeSignature
    this.config = {
      ...config,
      beatTypes: config.beatTypes || createDefaultBeatTypes(config.timeSignature.beats)
    }
    this.audioEngine = audioEngine
  }

  async start(onBeat: BeatCallback): Promise<void> {
    if (this.isRunning) return

    await this.audioEngine.prepare()
    this.isRunning = true
    this.currentBeat = 0
    this.nextBeatTime = this.now()
    this.onBeatCallback = onBeat

    this.schedule()
  }

  stop(): void {
    this.isRunning = false
    if (this.timerID) {
      clearTimeout(this.timerID)
      this.timerID = null
    }
    this.onBeatCallback = null
  }

  private schedule(): void {
    if (!this.isRunning) return

    const now = this.now()
    const intervalMs = (60 / this.config.bpm) * 1000

    // Schedule beats that fall within the look-ahead window
    while (this.nextBeatTime < now + this.scheduleAheadTime * 1000) {
      const beatNumber = this.currentBeat
      const beatType = this.config.beatTypes[this.currentBeat]

      // Schedule audio playback
      const delay = Math.max(0, this.nextBeatTime - now)
      setTimeout(() => {
        this.audioEngine.playClick(beatType)
      }, delay)

      // Notify callback on UI thread
      if (this.onBeatCallback) {
        setTimeout(() => {
          if (this.onBeatCallback) {
            this.onBeatCallback(beatNumber, beatType)
          }
        }, delay)
      }

      // Advance beat
      this.nextBeatTime += intervalMs
      this.currentBeat = (this.currentBeat + 1) % this.config.timeSignature.beats
    }

    // Schedule next scheduling check
    this.timerID = setTimeout(() => this.schedule(), 25)
  }

  updateConfig(config: Partial<MetronomeConfig>): void {
    const oldConfig = this.config

    // Update config
    this.config = { ...this.config, ...config }

    // If time signature changed, reset beatTypes to default
    if (config.timeSignature) {
      const beatsChanged = config.timeSignature.beats !== oldConfig.timeSignature.beats
      const noteValueChanged = config.timeSignature.noteValue !== oldConfig.timeSignature.noteValue

      if (beatsChanged || noteValueChanged) {
        // Reset to default beat types (first beat is downbeat)
        this.config.beatTypes = createDefaultBeatTypes(config.timeSignature.beats)

        // If playing, restart from beat 0
        if (this.isRunning) {
          const callback = this.onBeatCallback
          this.stop()
          if (callback) {
            this.start(callback)
          }
        }
      }
    }

    // If only beatTypes changed, update them
    if (config.beatTypes && !config.timeSignature) {
      this.config.beatTypes = config.beatTypes
    }

    // BPM changes are applied automatically in the next schedule() call
  }

  async dispose(): Promise<void> {
    this.stop()
    await this.audioEngine.dispose()
  }

  private now(): number {
    // Use performance.now() if available, otherwise Date.now()
    return typeof performance !== 'undefined' && performance.now
      ? performance.now()
      : Date.now()
  }
}
