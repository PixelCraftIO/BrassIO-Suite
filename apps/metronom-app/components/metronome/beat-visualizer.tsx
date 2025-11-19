import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { useEffect } from 'react'
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
import { BeatType, type BeatConfig } from '@brassio/metronome-core'

interface BeatVisualizerProps {
  currentBeat: number
  currentSubBeat: number
  totalBeats: number
  isPlaying: boolean
  beatTypes: BeatType[]
  beatConfigs: BeatConfig[]
  onBeatTypeChange?: (beatIndex: number, newType: BeatType) => void
}

export function BeatVisualizer({ currentBeat, currentSubBeat, totalBeats, isPlaying, beatTypes, beatConfigs, onBeatTypeChange }: BeatVisualizerProps) {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'

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
            onPress={onBeatTypeChange}
          />
        ))}
      </View>
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
  onPress?: (beatIndex: number, newType: BeatType) => void
}

function BeatGroup({ beatIndex, currentBeat, currentSubBeat, isPlaying, isDark, beatType, beatConfig, onPress }: BeatGroupProps) {
  const subdivisions = beatConfig.subdivision
  const isCurrent = beatIndex === currentBeat

  return (
    <View style={styles.beatGroup}>
      {/* Main beat dot */}
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

      {/* Subdivision dots (if more than 1) */}
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
  onPress?: (beatIndex: number, newType: BeatType) => void
}

function BeatDot({ beatIndex, subBeatIndex, currentBeat, currentSubBeat, isPlaying, isDark, beatType, isMainBeat, onPress }: BeatDotProps) {
  const scale = useSharedValue(1)
  const opacity = useSharedValue(0.3)

  const isCurrent = isPlaying && beatIndex === currentBeat && subBeatIndex === currentSubBeat

  useEffect(() => {
    if (isCurrent) {
      // Fast, snappy animation - smaller max size, quicker
      scale.value = withSequence(
        withSpring(1.2, { damping: 12, stiffness: 300 }),
        withTiming(1, { duration: 100 })
      )
      opacity.value = withTiming(1, { duration: 30 })
    } else {
      // Reset when not current
      scale.value = withTiming(1, { duration: 150 })
      opacity.value = withTiming(0.3, { duration: 150 })
    }
  }, [isCurrent])

  // Reset when stopped
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

  // Color based on beat type
  const dotColor = (() => {
    switch (beatType) {
      case BeatType.Downbeat:
        return isDark ? '#D4AF37' : '#B8860B'  // Gold
      case BeatType.Accented:
        return isDark ? '#FF8C00' : '#FF6B00'  // Orange
      case BeatType.Normal:
      default:
        return isDark ? '#888888' : '#666666'  // Gray
    }
  })()

  const handlePress = () => {
    if (!onPress || !isMainBeat) return

    // Cycle through beat types: Normal → Accented → Downbeat → Normal
    const nextType = (() => {
      switch (beatType) {
        case BeatType.Normal:
          return BeatType.Accented
        case BeatType.Accented:
          return BeatType.Downbeat
        case BeatType.Downbeat:
          return BeatType.Normal
        default:
          return BeatType.Normal
      }
    })()

    onPress(beatIndex, nextType)
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
