import { StyleSheet, View, Pressable } from 'react-native'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { TIME_SIGNATURES } from '@brassio/metronome-core'
import type { TimeSignature } from '@brassio/metronome-core'
import { useColorScheme } from '@/hooks/use-color-scheme'

interface TimeSignatureSelectorProps {
  value: TimeSignature
  onChange: (ts: TimeSignature) => void
}

export function TimeSignatureSelector({ value, onChange }: TimeSignatureSelectorProps) {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'

  const isSelected = (ts: TimeSignature) =>
    ts.beats === value.beats && ts.noteValue === value.noteValue

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.label}>Taktart</ThemedText>
      <View style={styles.buttonRow}>
        {TIME_SIGNATURES.map((ts) => (
          <Pressable
            key={`${ts.beats}/${ts.noteValue}`}
            onPress={() => onChange(ts)}
            style={[
              styles.button,
              isSelected(ts) && styles.buttonSelected,
              isSelected(ts) && { backgroundColor: isDark ? '#D4AF37' : '#B8860B' },
              !isSelected(ts) && { backgroundColor: isDark ? '#333' : '#f0f0f0' },
            ]}
          >
            <ThemedText
              style={[
                styles.buttonText,
                isSelected(ts) && styles.buttonTextSelected,
                isSelected(ts) && { color: '#000' },
              ]}
            >
              {ts.beats}/{ts.noteValue}
            </ThemedText>
          </Pressable>
        ))}
      </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 0,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 60,
    alignItems: 'center',
  },
  buttonSelected: {
    // backgroundColor set dynamically
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextSelected: {
    // color set dynamically
  },
})
