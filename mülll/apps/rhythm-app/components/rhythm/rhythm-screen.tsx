import { StyleSheet } from 'react-native'
import { useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedView } from '@/components/themed-view'
import { ThemedText } from '@/components/themed-text'
import { createAudioEngine } from '@/lib/audio-engine'
import { RhythmSequenceScreen } from './rhythm-sequence-screen'

export function RhythmScreen() {
  const audioEngine = useRef(createAudioEngine()).current

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>BrassIO Rhythm</ThemedText>
        <RhythmSequenceScreen audioEngine={audioEngine} />
      </ThemedView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
})
