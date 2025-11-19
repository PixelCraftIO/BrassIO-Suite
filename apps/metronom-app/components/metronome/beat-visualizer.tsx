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
import { BeatType } from '@brassio/metronome-core'

interface BeatVisualizerProps {
  currentBeat: number
  totalBeats: number
  isPlaying: boolean
  beatTypes: BeatType[]
  onBeatTypeChange?: (beatIndex: number, newType: BeatType) => void
}

export function BeatVisualizer({ currentBeat, totalBeats, isPlaying, beatTypes, onBeatTypeChange }: BeatVisualizerProps) {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.beatLabel}>
        Schlag {isPlaying ? currentBeat + 1 : '-'} von {totalBeats}
      </ThemedText>

      <View style={styles.beatsRow}>
        {Array.from({ length: totalBeats }, (_, i) => (
          <BeatDot
            key={i}
            beatIndex={i}
            currentBeat={currentBeat}
            isPlaying={isPlaying}
            isDark={isDark}
            beatType={beatTypes[i] || BeatType.Normal}
            onPress={onBeatTypeChange}
          />
        ))}
      </View>
    </ThemedView>
  )
}

interface BeatDotProps {
  beatIndex: number
  currentBeat: number
  isPlaying: boolean
  isDark: boolean
  beatType: BeatType
  onPress?: (beatIndex: number, newType: BeatType) => void
}

function BeatDot({ beatIndex, currentBeat, isPlaying, isDark, beatType, onPress }: BeatDotProps) {
  const scale = useSharedValue(1)
  const opacity = useSharedValue(0.3)

  const isCurrent = isPlaying && beatIndex === currentBeat

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
    if (!onPress) return

    // Cycle through beat types: Normal → Accented → Downbeat → Normal
    const nextType = (() => {
      switch (beatType) {
        case BeatType.Normal:
          return BeatType.Accented
        case BeatType.Accented:
          return BeatType.Downbeat
        case BeatType.Downbeat:
          return BeatType.Normal
      }
    })()

    onPress(beatIndex, nextType)
  }

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <Animated.View
        style={[
          styles.beatDot,
          { backgroundColor: dotColor },
          animatedStyle
        ]}
      />
    </TouchableOpacity>
  )
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
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  beatDot: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
})
