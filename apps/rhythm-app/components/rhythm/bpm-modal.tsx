import { Modal, View, StyleSheet, Pressable, TextInput } from 'react-native'
import { useState, useEffect } from 'react'
import { ThemedText } from '@/components/themed-text'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { MIN_BPM, MAX_BPM } from '@brassio/metronome-core'

interface BpmModalProps {
  visible: boolean
  currentBpm: number
  onBpmChange: (bpm: number) => void
  onClose: () => void
}

export function BpmModal({ visible, currentBpm, onBpmChange, onClose }: BpmModalProps) {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'
  const [inputValue, setInputValue] = useState(currentBpm.toString())

  useEffect(() => {
    if (visible) {
      setInputValue(currentBpm.toString())
    }
  }, [visible, currentBpm])

  const handleConfirm = () => {
    const value = parseInt(inputValue, 10)
    if (!isNaN(value)) {
      const clampedValue = Math.max(MIN_BPM, Math.min(MAX_BPM, value))
      onBpmChange(clampedValue)
    }
    onClose()
  }

  const handleInputChange = (text: string) => {
    // Only allow numbers
    const numericValue = text.replace(/[^0-9]/g, '')
    setInputValue(numericValue)
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
          <ThemedText type="subtitle" style={styles.title}>
            Tempo einstellen
          </ThemedText>

          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                isDark && styles.inputDark,
              ]}
              value={inputValue}
              onChangeText={handleInputChange}
              keyboardType="number-pad"
              maxLength={3}
              selectTextOnFocus
              autoFocus
            />
            <ThemedText style={styles.bpmLabel}>BPM</ThemedText>
          </View>

          <ThemedText style={styles.rangeHint}>
            {MIN_BPM} - {MAX_BPM}
          </ThemedText>

          <View style={styles.buttonRow}>
            <Pressable style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <ThemedText style={styles.cancelButtonText}>Abbrechen</ThemedText>
            </Pressable>
            <Pressable style={[styles.button, styles.confirmButton]} onPress={handleConfirm}>
              <ThemedText style={styles.confirmButtonText}>OK</ThemedText>
            </Pressable>
          </View>
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
    width: '80%',
    maxWidth: 300,
  },
  modalContentDark: {
    backgroundColor: '#1c1c1e',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 8,
  },
  input: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 140,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    color: '#000',
  },
  inputDark: {
    backgroundColor: '#333',
    color: '#fff',
  },
  bpmLabel: {
    fontSize: 20,
    opacity: 0.7,
  },
  rangeHint: {
    textAlign: 'center',
    fontSize: 12,
    opacity: 0.5,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'rgba(128, 128, 128, 0.2)',
  },
  confirmButton: {
    backgroundColor: '#007AFF',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})
