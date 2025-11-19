import type { AudioEngine } from '@brassio/metronome-core'

export class WebAudioEngine implements AudioEngine {
  private audioContext: AudioContext | null = null
  private isReady = false

  async prepare(): Promise<void> {
    if (this.isReady) return

    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

      // Resume context if suspended (iOS Safari requirement)
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume()
      }

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
      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)

      oscillator.frequency.value = frequency
      oscillator.type = 'sine'

      // Envelope (attack-decay)
      gainNode.gain.setValueAtTime(0, now)
      gainNode.gain.linearRampToValueAtTime(0.3, now + 0.005) // Attack
      gainNode.gain.linearRampToValueAtTime(0, now + duration) // Decay

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
