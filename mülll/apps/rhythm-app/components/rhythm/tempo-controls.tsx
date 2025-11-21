import { StyleSheet, View, Pressable } from 'react-native'
import { useState } from 'react'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { BPM_ADJUSTMENTS } from '@brassio/metronome-core'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { BpmModal } from './bpm-modal'

interface TempoControlsProps {
  bpm: number
  onBpmChange: (bpm: number) => void
  onAdjust: (delta: number) => void
}

export function TempoControls({ bpm, onBpmChange, onAdjust }: TempoControlsProps) {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <ThemedView style={styles.container}>
      <Pressable onPress={() => setModalVisible(true)} style={styles.bpmDisplayContainer}>
        <ThemedText type="title" style={styles.bpmDisplay}>
          {bpm}
        </ThemedText>
        <ThemedText style={styles.bpmLabel}>BPM</ThemedText>
        <ThemedText style={styles.tapHint}>Tippen zum Bearbeiten</ThemedText>
      </Pressable>

      <View style={styles.buttonRow}>
        <TempoButton onPress={() => onAdjust(-BPM_ADJUSTMENTS.LARGE)} label="-10" />
        <TempoButton onPress={() => onAdjust(-BPM_ADJUSTMENTS.SMALL)} label="-1" />
        <TempoButton onPress={() => onAdjust(BPM_ADJUSTMENTS.SMALL)} label="+1" />
        <TempoButton onPress={() => onAdjust(BPM_ADJUSTMENTS.LARGE)} label="+10" />
      </View>

      <BpmModal
        visible={modalVisible}
        currentBpm={bpm}
        onBpmChange={onBpmChange}
        onClose={() => setModalVisible(false)}
      />
    </ThemedView>
  )
}

interface TempoButtonProps {
  onPress: () => void
  label: string
}

function TempoButton({ onPress, label }: TempoButtonProps) {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'

  return (
    <ThemedView
      style={[
        styles.button,
        { backgroundColor: isDark ? '#333' : '#f0f0f0' },
      ]}
      onTouchEnd={onPress}
    >
      <ThemedText style={styles.buttonText}>{label}</ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  bpmDisplayContainer: {
    minWidth: 200,
    minHeight: 120,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    marginBottom: 20,
  },
  bpmDisplay: {
    fontSize: 72,
    fontWeight: 'bold',
    marginBottom: 0,
    textAlign: 'center',
    lineHeight: 86,
    includeFontPadding: false,
  },
  bpmLabel: {
    fontSize: 16,
    opacity: 0.6,
    marginBottom: 4,
  },
  tapHint: {
    fontSize: 12,
    opacity: 0.4,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 60,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
})
