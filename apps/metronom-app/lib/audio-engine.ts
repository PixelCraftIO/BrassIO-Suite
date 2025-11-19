import { Platform } from 'react-native'
import type { AudioEngine } from '@brassio/metronome-core'
import { BeatType } from '@brassio/metronome-core'

/**
 * Web Audio API implementation for React Native Web
 */
class WebAudioEngine implements AudioEngine {
  private audioContext: AudioContext | null = null
  private isReady = false

  async prepare(): Promise<void> {
    if (this.isReady) return

    try {
      // @ts-ignore - AudioContext exists in browser
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
      this.isReady = true
    } catch (error) {
      console.error('Failed to initialize Web Audio context:', error)
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

      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()

      oscillator.frequency.value = frequency
      oscillator.type = 'sine'

      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)

      gainNode.gain.setValueAtTime(0, now)
      gainNode.gain.linearRampToValueAtTime(0.3, now + 0.005)
      gainNode.gain.linearRampToValueAtTime(0, now + duration)

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

/**
 * Placeholder for native platforms
 * react-native-audio-api requires a development build (not available in Expo Go)
 */
class MockAudioEngine implements AudioEngine {
  async prepare(): Promise<void> {
    console.warn(
      'Native audio not available in Expo Go. ' +
      'Please use the web version or create a development build with EAS.'
    )
  }

  playClick(beatType: BeatType): void {
    // Silent - no audio in Expo Go
  }

  async dispose(): Promise<void> {
    // No-op
  }
}

/**
 * Create the appropriate audio engine for the current platform
 */
export function createAudioEngine(): AudioEngine {
  if (Platform.OS === 'web') {
    return new WebAudioEngine()
  }

  // For iOS/Android in Expo Go, use mock engine
  // In a dev build, you would import and use NativeAudioEngine
  return new MockAudioEngine()
}
