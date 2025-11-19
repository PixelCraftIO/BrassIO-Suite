import { StyleSheet, View } from 'react-native'
import Slider from '@react-native-community/slider'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { MIN_BPM, MAX_BPM, BPM_ADJUSTMENTS } from '@brassio/metronome-core'
import { useColorScheme } from '@/hooks/use-color-scheme'

interface TempoControlsProps {
  bpm: number
  onBpmChange: (bpm: number) => void
  onAdjust: (delta: number) => void
}

export function TempoControls({ bpm, onBpmChange, onAdjust }: TempoControlsProps) {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'

  return (
    <ThemedView style={styles.container}>
      <View style={styles.bpmDisplayContainer}>
        <ThemedText type="title" style={styles.bpmDisplay}>
          {bpm}
        </ThemedText>
      </View>
      <ThemedText style={styles.bpmLabel}>BPM</ThemedText>

      <Slider
        style={styles.slider}
        minimumValue={MIN_BPM}
        maximumValue={MAX_BPM}
        value={bpm}
        onValueChange={onBpmChange}
        minimumTrackTintColor={isDark ? '#D4AF37' : '#B8860B'}
        maximumTrackTintColor={isDark ? '#444' : '#ddd'}
        thumbTintColor={isDark ? '#D4AF37' : '#B8860B'}
        step={1}
      />

      <View style={styles.minMaxLabels}>
        <ThemedText style={styles.minMaxText}>{MIN_BPM}</ThemedText>
        <ThemedText style={styles.minMaxText}>{MAX_BPM}</ThemedText>
      </View>

      <View style={styles.buttonRow}>
        <TempoButton onPress={() => onAdjust(-BPM_ADJUSTMENTS.LARGE)} label="-10" />
        <TempoButton onPress={() => onAdjust(-BPM_ADJUSTMENTS.SMALL)} label="-1" />
        <TempoButton onPress={() => onAdjust(BPM_ADJUSTMENTS.SMALL)} label="+1" />
        <TempoButton onPress={() => onAdjust(BPM_ADJUSTMENTS.LARGE)} label="+10" />
      </View>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  bpmDisplay: {
    fontSize: 72,
    fontWeight: 'bold',
    marginBottom: 0,
    textAlign: 'center',
  },
  bpmLabel: {
    fontSize: 16,
    opacity: 0.6,
    marginBottom: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  minMaxLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  minMaxText: {
    fontSize: 12,
    opacity: 0.5,
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
