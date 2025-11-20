import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
} from 'react-native-reanimated'
import { ThemedView } from '@/components/themed-view'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { BeatType, type BeatConfig, calculateVisualBeats, type VisualSubBeat } from '@brassio/metronome-core'
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

export function BeatVisualizer({ currentBeat, currentSubBeat, totalBeats, isPlaying, beatConfigs, onBeatConfigChange }: BeatVisualizerProps) {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'

  const [modalVisible, setModalVisible] = useState(false)
  const [selectedBeatIndex, setSelectedBeatIndex] = useState(0)

  // Calculate visual beats with overflow information
  const visualBeats = calculateVisualBeats(beatConfigs)

  const handleBeatPress = (beatIndex: number) => {
    setSelectedBeatIndex(beatIndex)
    setModalVisible(true)
  }

  const handleConfigChange = (config: BeatConfig) => {
    if (onBeatConfigChange) {
      onBeatConfigChange(selectedBeatIndex, config)
    }
  }

  const selectedConfig = beatConfigs[selectedBeatIndex]

  return (
    <ThemedView style={styles.container}>
      <View style={styles.beatsRow}>
        {visualBeats.map((beatGroup, beatIndex) => (
          <BeatGroup
            key={beatIndex}
            beatIndex={beatIndex}
            currentBeat={currentBeat}
            currentSubBeat={currentSubBeat}
            isPlaying={isPlaying}
            isDark={isDark}
            visualSubBeats={beatGroup}
            onPress={handleBeatPress}
          />
        ))}
      </View>

      {selectedConfig && (
        <BeatConfigModal
          visible={modalVisible}
          beatIndex={selectedBeatIndex}
          currentConfig={selectedConfig}
          onConfigChange={handleConfigChange}
          onClose={() => setModalVisible(false)}
        />
      )}
    </ThemedView>
  )
}

interface BeatGroupProps {
  beatIndex: number
  currentBeat: number
  currentSubBeat: number
  isPlaying: boolean
  isDark: boolean
  visualSubBeats: VisualSubBeat[]
  onPress?: (beatIndex: number) => void
}

function BeatGroup({ beatIndex, currentBeat, currentSubBeat, isPlaying, isDark, visualSubBeats, onPress }: BeatGroupProps) {
  if (visualSubBeats.length === 0) return null

  const mainBeat = visualSubBeats[0]
  const subBeats = visualSubBeats.slice(1)

  return (
    <View style={styles.beatGroup}>
      <BeatDot
        beatIndex={beatIndex}
        subBeatIndex={0}
        currentBeat={currentBeat}
        currentSubBeat={currentSubBeat}
        isPlaying={isPlaying}
        isDark={isDark}
        visualSubBeat={mainBeat}
        isMainBeat={true}
        onPress={onPress}
      />

      {subBeats.length > 0 && (
        <View style={styles.subdivisionDotsContainer}>
          {subBeats.map((subBeat, i) => (
            <BeatDot
              key={i + 1}
              beatIndex={beatIndex}
              subBeatIndex={i + 1}
              currentBeat={currentBeat}
              currentSubBeat={currentSubBeat}
              isPlaying={isPlaying}
              isDark={isDark}
              visualSubBeat={subBeat}
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
  visualSubBeat: VisualSubBeat
  isMainBeat: boolean
  onPress?: (beatIndex: number) => void
}

function BeatDot({ beatIndex, subBeatIndex, currentBeat, currentSubBeat, isPlaying, isDark, visualSubBeat, isMainBeat, onPress }: BeatDotProps) {
  const scale = useSharedValue(1)
  const opacity = useSharedValue(0.3)

  const isCurrent = isPlaying && beatIndex === currentBeat && subBeatIndex === currentSubBeat
  const { config, beatType, isOverflow } = visualSubBeat

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

  // Determine dot color based on type and overflow
  const dotColor = (() => {
    if (isOverflow) {
      return '#9333EA' // Purple for overflow
    }
    switch (beatType) {
      case BeatType.Downbeat:
        return isDark ? '#D4AF37' : '#B8860B'
      case BeatType.Accented:
        return isDark ? '#FF8C00' : '#FF6B00'
      case BeatType.Subdivision:
        return isDark ? '#666666' : '#888888'
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

  // Render rest as empty circle
  if (config.rest) {
    const Content = (
      <Animated.View
        style={[
          styles.beatDot,
          styles.restDot,
          {
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            borderColor: dotColor,
          },
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

  // Normal filled dot with optional dotted indicator
  const Content = (
    <View style={styles.dotWrapper}>
      <Animated.View
        style={[
          styles.beatDot,
          { backgroundColor: dotColor, width: dotSize, height: dotSize, borderRadius: dotSize / 2 },
          animatedStyle
        ]}
      />
      {config.dotted && (
        <View style={[styles.dottedIndicator, { backgroundColor: '#FF9500' }]} />
      )}
    </View>
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
    // Size is dynamic
  },
  restDot: {
    backgroundColor: 'transparent',
    borderWidth: 2,
  },
  dotWrapper: {
    position: 'relative',
  },
  dottedIndicator: {
    position: 'absolute',
    bottom: -4,
    left: '50%',
    marginLeft: -3,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
})
