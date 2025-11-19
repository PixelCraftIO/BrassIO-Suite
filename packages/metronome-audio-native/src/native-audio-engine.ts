import { AudioContext, OscillatorNode, GainNode } from 'react-native-audio-api'
import type { AudioEngine } from '@brassio/metronome-core'
import { BeatType } from '@brassio/metronome-core'

export class NativeAudioEngine implements AudioEngine {
  private audioContext: AudioContext | null = null
  private isReady = false

  async prepare(): Promise<void> {
    if (this.isReady) return

    try {
      this.audioContext = new AudioContext()
      this.isReady = true
    } catch (error) {
      console.error('Failed to initialize audio context:', error)
      throw error
    }
  }

  playClick(beatType: BeatType): void {
    if (!this.audioContext || !this.isReady) {
      console.warn('Audio context not ready')
      return
    }

    try {
      const now = this.audioContext.currentTime

      // Different frequencies and durations for each beat type
      let frequency: number
      let duration: number

      switch (beatType) {
        case BeatType.Downbeat:
          frequency = 800  // Highest pitch for downbeat
          duration = 0.05  // Longest duration
          break
        case BeatType.Accented:
          frequency = 600  // Medium pitch for accented beats
          duration = 0.04  // Medium duration
          break
        case BeatType.Normal:
        default:
          frequency = 400  // Lowest pitch for normal beats
          duration = 0.03  // Shortest duration
          break
      }

      // Create oscillator
      const oscillator = new OscillatorNode(this.audioContext, {
        frequency,
        type: 'sine',
      })

      // Create gain (volume) node
      const gainNode = new GainNode(this.audioContext, {
        gain: 0,
      })

      // Connect: Oscillator → Gain → Output
      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)

      // Envelope (ADSR: Attack-Decay)
      const gain = gainNode.gain
      gain.setValueAtTime(0, now)
      gain.linearRampToValueAtTime(0.3, now + 0.005)  // Attack (5ms)
      gain.linearRampToValueAtTime(0, now + duration)  // Decay to 0

      // Start and stop oscillator
      oscillator.start(now)
      oscillator.stop(now + duration)
    } catch (error) {
      console.error('Failed to play click:', error)
    }
  }

  async dispose(): Promise<void> {
    if (this.audioContext) {
      await this.audioContext.close()
      this.audioContext = null
      this.isReady = false
    }
  }
}
