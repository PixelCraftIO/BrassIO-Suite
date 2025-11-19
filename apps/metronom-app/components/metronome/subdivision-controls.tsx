import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { SubdivisionType, type BeatConfig } from '@brassio/metronome-core'

interface SubdivisionControlsProps {
  beatConfigs: BeatConfig[]
  onSubdivisionChange: (beatIndex: number, subdivision: SubdivisionType) => void
}

const SUBDIVISION_OPTIONS = [
  { value: SubdivisionType.None, label: '1', description: 'Viertel' },
  { value: SubdivisionType.Eighth, label: '2', description: 'Achtel' },
  { value: SubdivisionType.Triplet, label: '3', description: 'Triolen' },
  { value: SubdivisionType.Sixteenth, label: '4', description: 'Sechzehntel' },
  { value: SubdivisionType.Quintuplet, label: '5', description: 'Fünfer' },
  { value: SubdivisionType.Sextuplet, label: '6', description: 'Sechser' },
]

export function SubdivisionControls({ beatConfigs, onSubdivisionChange }: SubdivisionControlsProps) {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Subdivision pro Schlag</ThemedText>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.beatsContainer}
      >
        {beatConfigs.map((beatConfig, beatIndex) => (
          <View key={beatIndex} style={styles.beatColumn}>
            <ThemedText style={styles.beatLabel}>
              {beatIndex + 1}
            </ThemedText>

            <View style={styles.subdivisionButtons}>
              {SUBDIVISION_OPTIONS.map((option) => {
                const isSelected = beatConfig.subdivision === option.value
                return (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.subdivisionButton,
                      isSelected && (isDark ? styles.subdivisionButtonSelectedDark : styles.subdivisionButtonSelected),
                    ]}
                    onPress={() => onSubdivisionChange(beatIndex, option.value)}
                  >
                    <ThemedText
                      style={[
                        styles.subdivisionButtonText,
                        isSelected && styles.subdivisionButtonTextSelected,
                      ]}
                    >
                      {option.label}
                    </ThemedText>
                  </TouchableOpacity>
                )
              })}
            </View>

            <ThemedText style={styles.descriptionText}>
              {SUBDIVISION_OPTIONS.find(o => o.value === beatConfig.subdivision)?.description || ''}
            </ThemedText>
          </View>
        ))}
      </ScrollView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  beatsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  beatColumn: {
    alignItems: 'center',
    minWidth: 80,
  },
  beatLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  subdivisionButtons: {
    gap: 6,
  },
  subdivisionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    minWidth: 50,
  },
  subdivisionButtonSelected: {
    backgroundColor: '#007AFF',
  },
  subdivisionButtonSelectedDark: {
    backgroundColor: '#0A84FF',
  },
  subdivisionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  subdivisionButtonTextSelected: {
    color: '#FFFFFF',
  },
  descriptionText: {
    fontSize: 12,
    marginTop: 8,
    opacity: 0.7,
  },
})
