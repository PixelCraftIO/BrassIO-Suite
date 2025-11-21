import { Modal, View, StyleSheet, Pressable, ScrollView } from 'react-native'
import { ThemedText } from '@/components/themed-text'
import { BeatType, SubdivisionType, type SubBeatConfig, type BeatConfig, createDefaultSubBeatConfigs } from '@brassio/metronome-core'
import { useColorScheme } from '@/hooks/use-color-scheme'

interface BeatConfigModalProps {
  visible: boolean
  beatIndex: number
  currentConfig: BeatConfig
  onConfigChange: (config: BeatConfig) => void
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
  currentConfig,
  onConfigChange,
  onClose,
}: BeatConfigModalProps) {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'

  const handleTypeChange = (type: BeatType) => {
    onConfigChange({ ...currentConfig, type })
  }

  const handleSubdivisionChange = (subdivision: SubdivisionType) => {
    onConfigChange({
      ...currentConfig,
      subdivision,
      subBeatConfigs: createDefaultSubBeatConfigs(subdivision),
    })
  }

  const handleSubBeatConfigChange = (subBeatIndex: number, updates: Partial<SubBeatConfig>) => {
    const newSubBeatConfigs = [...currentConfig.subBeatConfigs]
    newSubBeatConfigs[subBeatIndex] = {
      ...newSubBeatConfigs[subBeatIndex],
      ...updates,
    }
    onConfigChange({ ...currentConfig, subBeatConfigs: newSubBeatConfigs })
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={[styles.modalContent, isDark && styles.modalContentDark]} onPress={e => e.stopPropagation()}>
          <ScrollView showsVerticalScrollIndicator={false}>
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
                      currentConfig.type === option.type && styles.optionSelected,
                      currentConfig.type === option.type && { borderColor: option.color },
                    ]}
                    onPress={() => handleTypeChange(option.type)}
                  >
                    <View style={[styles.colorDot, { backgroundColor: option.color }]} />
                    <ThemedText style={[
                      styles.optionLabel,
                      currentConfig.type === option.type && styles.optionLabelSelected
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
                      currentConfig.subdivision === option.type && styles.optionSelected,
                    ]}
                    onPress={() => handleSubdivisionChange(option.type)}
                  >
                    <View style={styles.subdivisionDots}>
                      {Array.from({ length: option.count }).map((_, i) => (
                        <View key={i} style={styles.smallDot} />
                      ))}
                    </View>
                    <ThemedText style={[
                      styles.optionLabel,
                      currentConfig.subdivision === option.type && styles.optionLabelSelected
                    ]}>
                      {option.label}
                    </ThemedText>
                  </Pressable>
                ))}
              </View>
            </View>

            {currentConfig.subBeatConfigs && currentConfig.subBeatConfigs.length > 0 && (
              <View style={styles.section}>
                <ThemedText style={styles.sectionTitle}>SubBeat-Optionen</ThemedText>
                <View style={styles.subBeatList}>
                  {currentConfig.subBeatConfigs.map((subConfig, idx) => (
                    <View
                      key={idx}
                      style={[styles.subBeatRow, isDark && styles.subBeatRowDark]}
                    >
                      <ThemedText style={styles.subBeatLabel}>
                        SubBeat {idx + 1}
                      </ThemedText>
                      <View style={styles.subBeatButtons}>
                        <Pressable
                          onPress={() => handleSubBeatConfigChange(idx, { dotted: !subConfig.dotted })}
                          style={[
                            styles.subBeatButton,
                            subConfig.dotted && styles.subBeatButtonActiveDotted
                          ]}
                        >
                          <ThemedText style={[
                            styles.subBeatButtonText,
                            subConfig.dotted && styles.subBeatButtonTextActive
                          ]}>
                            ·
                          </ThemedText>
                        </Pressable>
                        <Pressable
                          onPress={() => handleSubBeatConfigChange(idx, { rest: !subConfig.rest })}
                          style={[
                            styles.subBeatButton,
                            subConfig.rest && styles.subBeatButtonActiveRest
                          ]}
                        >
                          <ThemedText style={[
                            styles.subBeatButtonText,
                            subConfig.rest && styles.subBeatButtonTextActive
                          ]}>
                            𝄽
                          </ThemedText>
                        </Pressable>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}

            <Pressable style={styles.closeButton} onPress={onClose}>
              <ThemedText style={styles.closeButtonText}>Fertig</ThemedText>
            </Pressable>
          </ScrollView>
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
    maxHeight: '80%',
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
  subBeatList: {
    gap: 8,
  },
  subBeatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
    borderRadius: 8,
  },
  subBeatRowDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  subBeatLabel: {
    fontSize: 14,
  },
  subBeatButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  subBeatButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: 'rgba(128, 128, 128, 0.2)',
  },
  subBeatButtonActiveDotted: {
    backgroundColor: '#FF9500',
  },
  subBeatButtonActiveRest: {
    backgroundColor: '#FF3B30',
  },
  subBeatButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  subBeatButtonTextActive: {
    color: '#fff',
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
