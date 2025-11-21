import { useState } from 'react'
import { View, Pressable, StyleSheet, Modal } from 'react-native'
import type { Measure, TimeSignature, BeatConfig } from '@brassio/metronome-core'
import { TIME_SIGNATURES } from '@brassio/metronome-core'
import { ThemedText } from '@/components/themed-text'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { BeatVisualizer } from './beat-visualizer'
import { BpmModal } from './bpm-modal'

interface MeasureEditorProps {
  measure: Measure
  measureIndex: number
  totalMeasures: number
  defaultBpm: number
  defaultTimeSignature: TimeSignature
  isCurrentMeasure: boolean
  currentBeat: number
  currentSubBeat: number
  isPlaying: boolean
  onBpmChange: (bpm: number) => void
  onTimeSignatureChange: (ts: TimeSignature) => void
  onBeatConfigChange: (beatIndex: number, config: BeatConfig) => void
  onMoveUp: () => void
  onMoveDown: () => void
  onRemove: () => void
}

export function MeasureEditor({
  measure,
  measureIndex,
  totalMeasures,
  defaultBpm,
  defaultTimeSignature,
  isCurrentMeasure,
  currentBeat,
  currentSubBeat,
  isPlaying,
  onBpmChange,
  onTimeSignatureChange,
  onBeatConfigChange,
  onMoveUp,
  onMoveDown,
  onRemove,
}: MeasureEditorProps) {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'

  const [bpmModalVisible, setBpmModalVisible] = useState(false)
  const [showTimeSignatureSelector, setShowTimeSignatureSelector] = useState(false)

  const isDefaultBpm = measure.bpm === defaultBpm
  const isDefaultTimeSignature =
    measure.timeSignature.beats === defaultTimeSignature.beats &&
    measure.timeSignature.noteValue === defaultTimeSignature.noteValue

  return (
    <View
      style={[
        styles.container,
        isDark ? styles.containerDark : styles.containerLight,
        isCurrentMeasure && isPlaying && styles.containerActive,
      ]}
    >
      {/* Controls Row */}
      <View style={styles.controlsRow}>
        <View style={styles.leftControls}>
          {/* Move buttons */}
          <View style={styles.moveButtons}>
            <Pressable
              onPress={onMoveUp}
              disabled={measureIndex === 0}
              style={[styles.moveButton, measureIndex === 0 && styles.moveButtonDisabled]}
            >
              <ThemedText style={styles.moveButtonText}>↑</ThemedText>
            </Pressable>
            <Pressable
              onPress={onMoveDown}
              disabled={measureIndex === totalMeasures - 1}
              style={[styles.moveButton, measureIndex === totalMeasures - 1 && styles.moveButtonDisabled]}
            >
              <ThemedText style={styles.moveButtonText}>↓</ThemedText>
            </Pressable>
          </View>

          {/* BPM */}
          <Pressable
            onPress={() => setBpmModalVisible(true)}
            style={styles.controlButton}
          >
            <ThemedText
              style={[
                styles.controlText,
                !isDefaultBpm && styles.controlTextHighlight,
              ]}
            >
              {measure.bpm} BPM
            </ThemedText>
          </Pressable>

          {/* Time Signature */}
          <Pressable
            onPress={() => setShowTimeSignatureSelector(true)}
            style={styles.controlButton}
          >
            <ThemedText
              style={[
                styles.controlText,
                !isDefaultTimeSignature && styles.controlTextHighlight,
              ]}
            >
              {measure.timeSignature.beats}/{measure.timeSignature.noteValue}
            </ThemedText>
          </Pressable>
        </View>

        {/* Delete button */}
        {totalMeasures > 1 && (
          <Pressable onPress={onRemove} style={styles.deleteButton}>
            <ThemedText style={styles.deleteButtonText}>✕</ThemedText>
          </Pressable>
        )}
      </View>

      {/* Beat Visualizer */}
      <BeatVisualizer
        currentBeat={isCurrentMeasure ? currentBeat : -1}
        currentSubBeat={isCurrentMeasure ? currentSubBeat : -1}
        totalBeats={measure.timeSignature.beats}
        isPlaying={isPlaying && isCurrentMeasure}
        beatTypes={measure.beatConfigs.map(bc => bc.type)}
        beatConfigs={measure.beatConfigs}
        onBeatConfigChange={onBeatConfigChange}
      />

      {/* BPM Modal */}
      <BpmModal
        visible={bpmModalVisible}
        currentBpm={measure.bpm}
        onBpmChange={onBpmChange}
        onClose={() => setBpmModalVisible(false)}
      />

      {/* Time Signature Modal */}
      <Modal
        visible={showTimeSignatureSelector}
        transparent
        animationType="fade"
        onRequestClose={() => setShowTimeSignatureSelector(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowTimeSignatureSelector(false)}
        >
          <View style={[styles.timeSignatureModal, isDark && styles.timeSignatureModalDark]}>
            <ThemedText style={styles.modalTitle}>Taktart</ThemedText>
            <View style={styles.timeSignatureOptions}>
              {TIME_SIGNATURES.map((ts) => (
                <Pressable
                  key={`${ts.beats}/${ts.noteValue}`}
                  onPress={() => {
                    onTimeSignatureChange(ts)
                    setShowTimeSignatureSelector(false)
                  }}
                  style={[
                    styles.timeSignatureOption,
                    ts.beats === measure.timeSignature.beats &&
                    ts.noteValue === measure.timeSignature.noteValue &&
                    styles.timeSignatureOptionSelected,
                  ]}
                >
                  <ThemedText
                    style={[
                      styles.timeSignatureText,
                      ts.beats === measure.timeSignature.beats &&
                      ts.noteValue === measure.timeSignature.noteValue &&
                      styles.timeSignatureTextSelected,
                    ]}
                  >
                    {ts.beats}/{ts.noteValue}
                  </ThemedText>
                </Pressable>
              ))}
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  containerLight: {
    borderColor: '#e4e4e7',
    backgroundColor: '#fff',
  },
  containerDark: {
    borderColor: '#3f3f46',
    backgroundColor: '#27272a',
  },
  containerActive: {
    borderColor: '#f59e0b',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  leftControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  moveButtons: {
    flexDirection: 'row',
    gap: 4,
  },
  moveButton: {
    padding: 4,
  },
  moveButtonDisabled: {
    opacity: 0.3,
  },
  moveButtonText: {
    fontSize: 14,
  },
  controlButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  controlText: {
    fontSize: 14,
    color: '#a1a1aa',
  },
  controlTextHighlight: {
    fontWeight: '600',
    color: '#f59e0b',
  },
  deleteButton: {
    padding: 4,
  },
  deleteButtonText: {
    fontSize: 14,
    color: '#ef4444',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeSignatureModal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '80%',
    maxWidth: 320,
  },
  timeSignatureModalDark: {
    backgroundColor: '#1c1c1e',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  timeSignatureOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  timeSignatureOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
  },
  timeSignatureOptionSelected: {
    backgroundColor: '#f59e0b',
  },
  timeSignatureText: {
    fontSize: 14,
  },
  timeSignatureTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
})
