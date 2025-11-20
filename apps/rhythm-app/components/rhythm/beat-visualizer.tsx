import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
} from 'react-native-reanimated'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { BeatType, SubdivisionType, type BeatConfig } from '@brassio/metronome-core'
import { BeatConfigModal } from './beat-config-modal'

interface BeatVisualizerProps {
  currentBeat: number
  currentSubBeat: number
  totalBeats: number
  isPlaying: boolean
  beatTypes: BeatType[]
  beatConfigs: BeatConfig[]
  onBeatConfigChange?: (beatIndex: number, config: BeatConfig) => void
}

export function BeatVisualizer({ currentBeat, currentSubBeat, totalBeats, isPlaying, beatTypes, beatConfigs, onBeatConfigChange }: BeatVisualizerProps) {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'

  const [modalVisible, setModalVisible] = useState(false)
  const [selectedBeatIndex, setSelectedBeatIndex] = useState(0)

  const handleBeatPress = (beatIndex: number) => {
    setSelectedBeatIndex(beatIndex)
    setModalVisible(true)
  }

  const handleSelectType = (type: BeatType) => {
    if (onBeatConfigChange) {
      const currentConfig = beatConfigs[selectedBeatIndex]
      onBeatConfigChange(selectedBeatIndex, {
        ...currentConfig,
        type,
      })
    }
  }

  const handleSelectSubdivision = (subdivision: SubdivisionType) => {
    if (onBeatConfigChange) {
      const currentConfig = beatConfigs[selectedBeatIndex]
      onBeatConfigChange(selectedBeatIndex, {
        ...currentConfig,
        subdivision,
      })
    }
  }

  const selectedConfig = beatConfigs[selectedBeatIndex] || { type: BeatType.Normal, subdivision: SubdivisionType.None }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.beatLabel}>
        Schlag {isPlaying ? currentBeat + 1 : '-'} von {totalBeats}
      </ThemedText>

      <View style={styles.beatsRow}>
        {Array.from({ length: totalBeats }, (_, i) => (
          <BeatGroup
            key={i}
            beatIndex={i}
            currentBeat={currentBeat}
            currentSubBeat={currentSubBeat}
            isPlaying={isPlaying}
            isDark={isDark}
            beatType={beatTypes[i] || BeatType.Normal}
            beatConfig={beatConfigs[i]}
            onPress={handleBeatPress}
          />
        ))}
      </View>

      <BeatConfigModal
        visible={modalVisible}
        beatIndex={selectedBeatIndex}
        currentType={selectedConfig.type}
        currentSubdivision={selectedConfig.subdivision}
        onSelectType={handleSelectType}
        onSelectSubdivision={handleSelectSubdivision}
        onClose={() => setModalVisible(false)}
      />
    </ThemedView>
  )
}

interface BeatGroupProps {
  beatIndex: number
  currentBeat: number
  currentSubBeat: number
  isPlaying: boolean
  isDark: boolean
  beatType: BeatType
  beatConfig: BeatConfig
  onPress?: (beatIndex: number) => void
}

function BeatGroup({ beatIndex, currentBeat, currentSubBeat, isPlaying, isDark, beatType, beatConfig, onPress }: BeatGroupProps) {
  const subdivisions = beatConfig.subdivision

  return (
    <View style={styles.beatGroup}>
      <BeatDot
        beatIndex={beatIndex}
        subBeatIndex={0}
        currentBeat={currentBeat}
        currentSubBeat={currentSubBeat}
        isPlaying={isPlaying}
        isDark={isDark}
        beatType={beatType}
        isMainBeat={true}
        onPress={onPress}
      />

      {subdivisions > 1 && (
        <View style={styles.subdivisionDotsContainer}>
          {Array.from({ length: subdivisions - 1 }, (_, i) => (
            <BeatDot
              key={i + 1}
              beatIndex={beatIndex}
              subBeatIndex={i + 1}
              currentBeat={currentBeat}
              currentSubBeat={currentSubBeat}
              isPlaying={isPlaying}
              isDark={isDark}
              beatType={BeatType.Subdivision}
              isMainBeat={false}
            />
          ))}
        </View>
      )}
    </View>
  )
}

interface BeatDotProps {
  beatIndex: number
  subBeatIndex: number
  currentBeat: number
  currentSubBeat: number
  isPlaying: boolean
  isDark: boolean
  beatType: BeatType
  isMainBeat: boolean
  onPress?: (beatIndex: number) => void
}

function BeatDot({ beatIndex, subBeatIndex, currentBeat, currentSubBeat, isPlaying, isDark, beatType, isMainBeat, onPress }: BeatDotProps) {
  const scale = useSharedValue(1)
  const opacity = useSharedValue(0.3)

  const isCurrent = isPlaying && beatIndex === currentBeat && subBeatIndex === currentSubBeat

  useEffect(() => {
    if (isCurrent) {
      scale.value = withSequence(
        withSpring(1.2, { damping: 12, stiffness: 300 }),
        withTiming(1, { duration: 100 })
      )
      opacity.value = withTiming(1, { duration: 30 })
    } else {
      scale.value = withTiming(1, { duration: 150 })
      opacity.value = withTiming(0.3, { duration: 150 })
    }
  }, [isCurrent])

  useEffect(() => {
    if (!isPlaying) {
      scale.value = withTiming(1, { duration: 300 })
      opacity.value = withTiming(0.3, { duration: 300 })
    }
  }, [isPlaying])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }))

  const dotColor = (() => {
    switch (beatType) {
      case BeatType.Downbeat:
        return isDark ? '#D4AF37' : '#B8860B'
      case BeatType.Accented:
        return isDark ? '#FF8C00' : '#FF6B00'
      case BeatType.Normal:
      default:
        return isDark ? '#888888' : '#666666'
    }
  })()

  const handlePress = () => {
    if (!onPress || !isMainBeat) return
    onPress(beatIndex)
  }

  const dotSize = isMainBeat ? 48 : 28

  const Content = (
    <Animated.View
      style={[
        styles.beatDot,
        { backgroundColor: dotColor, width: dotSize, height: dotSize, borderRadius: dotSize / 2 },
        animatedStyle
      ]}
    />
  )

  if (isMainBeat && onPress) {
    return (
      <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
        {Content}
      </TouchableOpacity>
    )
  }

  return Content
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  beatLabel: {
    fontSize: 20,
    marginBottom: 24,
    fontWeight: '600',
  },
  beatsRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  beatGroup: {
    alignItems: 'center',
    gap: 6,
  },
  subdivisionDotsContainer: {
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
  },
  beatDot: {
    // Size is dynamic based on isMainBeat
  },
})
