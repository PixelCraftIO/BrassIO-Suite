import type { MetronomeConfig, AudioEngine, BeatCallback, BeatConfig } from './types'
import { BeatType, SubdivisionType } from './types'
import { createDefaultBeatTypes, createDefaultBeatConfigs, createDefaultSubBeatConfigs } from './constants'

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
    // Ensure beatConfigs array exists and matches timeSignature
    // Support both old (beatTypes) and new (beatConfigs) format for backwards compatibility
    let beatConfigs: BeatConfig[]

    if (config.beatConfigs && config.beatConfigs.length === config.timeSignature.beats) {
      beatConfigs = config.beatConfigs
    } else if (config.beatTypes && config.beatTypes.length === config.timeSignature.beats) {
      // Migrate from old format
      beatConfigs = config.beatTypes.map(type => ({
        type,
        subdivision: SubdivisionType.None,
        subBeatConfigs: createDefaultSubBeatConfigs(SubdivisionType.None),
      }))
    } else {
      beatConfigs = createDefaultBeatConfigs(config.timeSignature.beats)
    }

    this.config = {
      ...config,
      beatTypes: beatConfigs.map(bc => bc.type), // Keep for backwards compatibility
      beatConfigs,
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
    const beatIntervalMs = (60 / this.config.bpm) * 1000

    // Schedule beats that fall within the look-ahead window
    while (this.nextBeatTime < now + this.scheduleAheadTime * 1000) {
      const beatNumber = this.currentBeat
      const beatConfig = this.config.beatConfigs![this.currentBeat]
      const subdivisions = beatConfig.subdivision

      // Schedule each subdivision within this beat
      for (let subBeat = 0; subBeat < subdivisions; subBeat++) {
        const subBeatIntervalMs = beatIntervalMs / subdivisions
        const clickTime = this.nextBeatTime + (subBeat * subBeatIntervalMs)

        // First subdivision uses the beat's configured type, rest use Subdivision type
        const clickType = subBeat === 0 ? beatConfig.type : BeatType.Subdivision

        // Calculate delay from now
        const delay = Math.max(0, clickTime - now)

        // Schedule audio playback
        setTimeout(() => {
          this.audioEngine.playClick(clickType)
        }, delay)

        // Notify callback on UI thread
        if (this.onBeatCallback) {
          setTimeout(() => {
            if (this.onBeatCallback) {
              this.onBeatCallback(beatNumber, clickType, subBeat, subdivisions)
            }
          }, delay)
        }
      }

      // Advance to next beat
      this.nextBeatTime += beatIntervalMs
      this.currentBeat = (this.currentBeat + 1) % this.config.timeSignature.beats
    }

    // Schedule next scheduling check
    this.timerID = setTimeout(() => this.schedule(), 25)
  }

  updateConfig(config: Partial<MetronomeConfig>): void {
    const oldConfig = this.config

    // Update config
    this.config = { ...this.config, ...config }

    // If time signature changed, reset beatConfigs to default
    if (config.timeSignature) {
      const beatsChanged = config.timeSignature.beats !== oldConfig.timeSignature.beats
      const noteValueChanged = config.timeSignature.noteValue !== oldConfig.timeSignature.noteValue

      if (beatsChanged || noteValueChanged) {
        // Reset to default beat configs
        this.config.beatConfigs = createDefaultBeatConfigs(config.timeSignature.beats)
        this.config.beatTypes = this.config.beatConfigs.map(bc => bc.type)

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

    // If beatConfigs changed, update them (and sync beatTypes for backwards compat)
    if (config.beatConfigs && !config.timeSignature) {
      this.config.beatConfigs = config.beatConfigs
      this.config.beatTypes = config.beatConfigs.map(bc => bc.type)
    }

    // If only beatTypes changed (legacy), migrate to beatConfigs
    if (config.beatTypes && !config.beatConfigs && !config.timeSignature) {
      this.config.beatTypes = config.beatTypes
      this.config.beatConfigs = config.beatTypes.map((type, index) => {
        const existingConfig = this.config.beatConfigs![index]
        const subdivision = existingConfig?.subdivision || SubdivisionType.None
        return {
          type,
          subdivision,
          subBeatConfigs: existingConfig?.subBeatConfigs || createDefaultSubBeatConfigs(subdivision),
        }
      })
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
