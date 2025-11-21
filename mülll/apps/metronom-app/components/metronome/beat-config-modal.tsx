import { Modal, View, StyleSheet, Pressable } from 'react-native'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { BeatType, SubdivisionType } from '@brassio/metronome-core'
import { useColorScheme } from '@/hooks/use-color-scheme'

interface BeatConfigModalProps {
  visible: boolean
  beatIndex: number
  currentType: BeatType
  currentSubdivision: SubdivisionType
  onSelectType: (type: BeatType) => void
  onSelectSubdivision: (subdivision: SubdivisionType) => void
  onClose: () => void
}

const beatTypeOptions = [
  { type: BeatType.Normal, label: 'Normal', color: '#888888' },
  { type: BeatType.Accented, label: 'Akzent', color: '#FF8C00' },
  { type: BeatType.Downbeat, label: 'Downbeat', color: '#D4AF37' },
]

const subdivisionOptions = [
  { type: SubdivisionType.None, label: 'Viertel', count: 1 },
  { type: SubdivisionType.Eighth, label: 'Achtel', count: 2 },
  { type: SubdivisionType.Triplet, label: 'Triole', count: 3 },
  { type: SubdivisionType.Sixteenth, label: 'Sechzehntel', count: 4 },
]

export function BeatConfigModal({
  visible,
  beatIndex,
  currentType,
  currentSubdivision,
  onSelectType,
  onSelectSubdivision,
  onClose,
}: BeatConfigModalProps) {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={[styles.modalContent, isDark && styles.modalContentDark]} onPress={e => e.stopPropagation()}>
          <ThemedText type="subtitle" style={styles.title}>
            Beat {beatIndex + 1} konfigurieren
          </ThemedText>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Betonung</ThemedText>
            <View style={styles.optionsRow}>
              {beatTypeOptions.map(option => (
                <Pressable
                  key={option.type}
                  style={[
                    styles.option,
                    currentType === option.type && styles.optionSelected,
                    currentType === option.type && { borderColor: option.color },
                  ]}
                  onPress={() => onSelectType(option.type)}
                >
                  <View style={[styles.colorDot, { backgroundColor: option.color }]} />
                  <ThemedText style={[
                    styles.optionLabel,
                    currentType === option.type && styles.optionLabelSelected
                  ]}>
                    {option.label}
                  </ThemedText>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Unterteilung</ThemedText>
            <View style={styles.optionsRow}>
              {subdivisionOptions.map(option => (
                <Pressable
                  key={option.type}
                  style={[
                    styles.option,
                    currentSubdivision === option.type && styles.optionSelected,
                  ]}
                  onPress={() => onSelectSubdivision(option.type)}
                >
                  <View style={styles.subdivisionDots}>
                    {Array.from({ length: option.count }).map((_, i) => (
                      <View key={i} style={styles.smallDot} />
                    ))}
                  </View>
                  <ThemedText style={[
                    styles.optionLabel,
                    currentSubdivision === option.type && styles.optionLabelSelected
                  ]}>
                    {option.label}
                  </ThemedText>
                </Pressable>
              ))}
            </View>
          </View>

          <Pressable style={styles.closeButton} onPress={onClose}>
            <ThemedText style={styles.closeButtonText}>Fertig</ThemedText>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalContentDark: {
    backgroundColor: '#1c1c1e',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    opacity: 0.7,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  option: {
    flex: 1,
    minWidth: 70,
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
    alignItems: 'center',
  },
  optionSelected: {
    borderColor: '#007AFF',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  colorDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginBottom: 6,
  },
  optionLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  optionLabelSelected: {
    fontWeight: '600',
  },
  subdivisionDots: {
    flexDirection: 'row',
    gap: 3,
    marginBottom: 6,
    height: 20,
    alignItems: 'center',
  },
  smallDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#888',
  },
  closeButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
})
