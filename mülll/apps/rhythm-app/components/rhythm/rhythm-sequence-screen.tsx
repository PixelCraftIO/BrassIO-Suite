import { useState } from 'react'
import { View, ScrollView, Pressable, StyleSheet } from 'react-native'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { useRhythmSequence } from '@brassio/metronome-ui'
import { MAX_MEASURES } from '@brassio/metronome-core'
import type { AudioEngine } from '@brassio/metronome-core'
import { MeasureEditor } from './measure-editor'
import { BpmModal } from './bpm-modal'

interface RhythmSequenceScreenProps {
  audioEngine: AudioEngine
}

export function RhythmSequenceScreen({ audioEngine }: RhythmSequenceScreenProps) {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'

  const [defaultBpmModalVisible, setDefaultBpmModalVisible] = useState(false)

  const {
    measures,
    defaultBpm,
    defaultTimeSignature,
    isPlaying,
    currentMeasureIndex,
    currentBeat,
    currentSubBeat,
    setDefaultBpm,
    addMeasure,
    removeMeasure,
    moveMeasureUp,
    moveMeasureDown,
    setMeasureBpm,
    setMeasureTimeSignature,
    setMeasureBeatConfig,
    toggle,
  } = useRhythmSequence(audioEngine)

  return (
    <ThemedView style={styles.container}>
      {/* Header Controls */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable
            onPress={() => setDefaultBpmModalVisible(true)}
            style={styles.defaultBpmButton}
          >
            <ThemedText style={styles.defaultBpmText}>
              Standard: {defaultBpm} BPM
            </ThemedText>
          </Pressable>
        </View>

        <Pressable
          onPress={toggle}
          style={[
            styles.playButton,
            isPlaying ? styles.playButtonActive : styles.playButtonInactive,
          ]}
        >
          <ThemedText style={styles.playButtonText}>
            {isPlaying ? '⏹' : '▶'}
          </ThemedText>
        </Pressable>
      </View>

      {/* Measures List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {measures.map((measure, index) => (
          <MeasureEditor
            key={measure.id}
            measure={measure}
            measureIndex={index}
            totalMeasures={measures.length}
            defaultBpm={defaultBpm}
            defaultTimeSignature={defaultTimeSignature}
            isCurrentMeasure={index === currentMeasureIndex}
            currentBeat={currentBeat}
            currentSubBeat={currentSubBeat}
            isPlaying={isPlaying}
            onBpmChange={(bpm) => setMeasureBpm(measure.id, bpm)}
            onTimeSignatureChange={(ts) => setMeasureTimeSignature(measure.id, ts)}
            onBeatConfigChange={(beatIndex, config) => setMeasureBeatConfig(measure.id, beatIndex, config)}
            onMoveUp={() => moveMeasureUp(measure.id)}
            onMoveDown={() => moveMeasureDown(measure.id)}
            onRemove={() => removeMeasure(measure.id)}
          />
        ))}

        {/* Add Measure Button */}
        {measures.length < MAX_MEASURES && (
          <Pressable
            onPress={addMeasure}
            style={[styles.addButton, isDark && styles.addButtonDark]}
          >
            <ThemedText style={styles.addButtonText}>+ Takt hinzufügen</ThemedText>
          </Pressable>
        )}
      </ScrollView>

      {/* Default BPM Modal */}
      <BpmModal
        visible={defaultBpmModalVisible}
        currentBpm={defaultBpm}
        onBpmChange={setDefaultBpm}
        onClose={() => setDefaultBpmModalVisible(false)}
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(128, 128, 128, 0.2)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  defaultBpmButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
  },
  defaultBpmText: {
    fontSize: 14,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonInactive: {
    backgroundColor: '#007AFF',
  },
  playButtonActive: {
    backgroundColor: '#FF3B30',
  },
  playButtonText: {
    fontSize: 20,
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  addButton: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#d4d4d8',
    alignItems: 'center',
  },
  addButtonDark: {
    borderColor: '#52525b',
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#a1a1aa',
  },
})
