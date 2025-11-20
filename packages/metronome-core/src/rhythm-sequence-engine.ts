import type {
  RhythmSequence,
  Measure,
  AudioEngine,
  SequenceBeatCallback,
  BeatConfig
} from './types'
import { BeatType } from './types'

export class RhythmSequenceEngine {
  private sequence: RhythmSequence
  private audioEngine: AudioEngine
  private isRunning = false
  private intervalId: ReturnType<typeof setTimeout> | null = null
  private currentMeasureIndex = 0
  private currentBeat = 0
  private currentSubBeat = 0

  constructor(sequence: RhythmSequence, audioEngine: AudioEngine) {
    this.sequence = sequence
    this.audioEngine = audioEngine
  }

  updateSequence(sequence: RhythmSequence): void {
    this.sequence = sequence
  }

  async start(callback: SequenceBeatCallback): Promise<void> {
    if (this.isRunning) return

    await this.audioEngine.prepare()
    this.isRunning = true
    this.currentMeasureIndex = 0
    this.currentBeat = 0
    this.currentSubBeat = 0

    this.scheduleNextBeat(callback)
  }

  stop(): void {
    this.isRunning = false
    if (this.intervalId) {
      clearTimeout(this.intervalId)
      this.intervalId = null
    }
    this.currentMeasureIndex = 0
    this.currentBeat = 0
    this.currentSubBeat = 0
  }

  dispose(): void {
    this.stop()
    this.audioEngine.dispose()
  }

  private scheduleNextBeat(callback: SequenceBeatCallback): void {
    if (!this.isRunning || this.sequence.measures.length === 0) return

    const measure = this.sequence.measures[this.currentMeasureIndex]
    const beatConfig = measure.beatConfigs[this.currentBeat]
    const totalSubBeats = beatConfig.subdivision

    // Determine beat type for this sub-beat
    let beatType: BeatType
    if (this.currentSubBeat === 0) {
      beatType = beatConfig.type
    } else {
      beatType = BeatType.Subdivision
    }

    // Play the click
    this.audioEngine.playClick(beatType)

    // Notify callback
    callback(
      this.currentMeasureIndex,
      this.currentBeat,
      beatType,
      this.currentSubBeat,
      totalSubBeats
    )

    // Calculate interval for next beat
    const msPerBeat = 60000 / measure.bpm
    const msPerSubBeat = msPerBeat / totalSubBeats

    // Schedule next beat
    this.intervalId = setTimeout(() => {
      this.advancePosition()
      this.scheduleNextBeat(callback)
    }, msPerSubBeat)
  }

  private advancePosition(): void {
    const measure = this.sequence.measures[this.currentMeasureIndex]
    const beatConfig = measure.beatConfigs[this.currentBeat]
    const totalSubBeats = beatConfig.subdivision

    // Advance sub-beat
    this.currentSubBeat++

    // Check if we need to advance to next beat
    if (this.currentSubBeat >= totalSubBeats) {
      this.currentSubBeat = 0
      this.currentBeat++

      // Check if we need to advance to next measure
      if (this.currentBeat >= measure.timeSignature.beats) {
        this.currentBeat = 0
        this.currentMeasureIndex++

        // Loop back to first measure
        if (this.currentMeasureIndex >= this.sequence.measures.length) {
          this.currentMeasureIndex = 0
        }
      }
    }
  }
}
