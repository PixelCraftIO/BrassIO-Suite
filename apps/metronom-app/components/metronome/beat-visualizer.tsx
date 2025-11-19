import { StyleSheet, View } from 'react-native'
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

interface BeatVisualizerProps {
  currentBeat: number
  totalBeats: number
  isPlaying: boolean
}

export function BeatVisualizer({ currentBeat, totalBeats, isPlaying }: BeatVisualizerProps) {
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
}

function BeatDot({ beatIndex, currentBeat, isPlaying, isDark }: BeatDotProps) {
  const scale = useSharedValue(1)
  const opacity = useSharedValue(0.3)

  const isDownbeat = beatIndex === 0
  const isCurrent = isPlaying && beatIndex === currentBeat

  useEffect(() => {
    if (isCurrent) {
      // Trigger animation when this beat becomes active
      scale.value = withSequence(
        withSpring(1.4, { damping: 8, stiffness: 150 }),
        withTiming(1, { duration: 150 })
      )
      opacity.value = withTiming(1, { duration: 50 })
    } else {
      // Reset when not current
      scale.value = withTiming(1, { duration: 200 })
      opacity.value = withTiming(0.3, { duration: 200 })
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

  const dotColor = isDownbeat
    ? isDark
      ? '#D4AF37'  // Gold for downbeat (dark mode)
      : '#B8860B'  // Dark gold for downbeat (light mode)
    : isDark
    ? '#888888'  // Gray for regular beats (dark mode)
    : '#666666'  // Darker gray for regular beats (light mode)

  return (
    <Animated.View
      style={[
        styles.beatDot,
        { backgroundColor: dotColor },
        animatedStyle
      ]}
    />
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
