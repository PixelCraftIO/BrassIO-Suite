import { AudioContext, OscillatorNode, GainNode } from 'react-native-audio-api'
import type { AudioEngine } from '@brassio/metronome-core'

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

  playClick(isDownbeat: boolean): void {
    if (!this.audioContext || !this.isReady) {
      console.warn('Audio context not ready')
      return
    }

    try {
      const now = this.audioContext.currentTime
      const frequency = isDownbeat ? 800 : 400  // Downbeat: 800Hz, Regular: 400Hz
      const duration = isDownbeat ? 0.05 : 0.03 // Downbeat: 50ms, Regular: 30ms

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
