import { StyleSheet, ScrollView } from 'react-native'
import { useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedView } from '@/components/themed-view'
import { ThemedText } from '@/components/themed-text'
import { createAudioEngine } from '@/lib/audio-engine'
import { useMetronome } from '@brassio/metronome-ui'
import { TempoControls } from './tempo-controls'
import { TimeSignatureSelector } from './time-signature-selector'
import { BeatVisualizer } from './beat-visualizer'
import { PlaybackControls } from './playback-controls'

export function RhythmScreen() {
  const audioEngine = useRef(createAudioEngine()).current
  const metronome = useMetronome(audioEngine)

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>BrassIO Rhythm</ThemedText>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <TempoControls
            bpm={metronome.bpm}
            onBpmChange={metronome.setBpm}
            onAdjust={metronome.adjustBpm}
          />

          <TimeSignatureSelector
            value={metronome.timeSignature}
            onChange={metronome.setTimeSignature}
          />

          <BeatVisualizer
            currentBeat={metronome.currentBeat}
            currentSubBeat={metronome.currentSubBeat}
            totalBeats={metronome.totalBeats}
            isPlaying={metronome.isPlaying}
            beatTypes={metronome.beatTypes}
            beatConfigs={metronome.beatConfigs}
            onBeatConfigChange={metronome.setBeatConfig}
          />

          <PlaybackControls
            isPlaying={metronome.isPlaying}
            onStart={metronome.start}
            onStop={metronome.stop}
          />
        </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 24,
  },
})
