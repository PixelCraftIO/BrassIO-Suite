import { StyleSheet, Pressable } from 'react-native'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { useColorScheme } from '@/hooks/use-color-scheme'

interface PlaybackControlsProps {
  isPlaying: boolean
  onStart: () => void
  onStop: () => void
}

export function PlaybackControls({ isPlaying, onStart, onStop }: PlaybackControlsProps) {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'

  const handlePress = () => {
    if (isPlaying) {
      onStop()
    } else {
      onStart()
    }
  }

  return (
    <ThemedView style={styles.container}>
      <Pressable
        onPress={handlePress}
        style={[
          styles.button,
          { backgroundColor: isDark ? '#D4AF37' : '#B8860B' },
        ]}
      >
        <ThemedText style={[styles.buttonText, { color: '#000' }]}>
          {isPlaying ? '■ STOP' : '▶ START'}
        </ThemedText>
      </Pressable>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 12,
    minWidth: 180,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})
