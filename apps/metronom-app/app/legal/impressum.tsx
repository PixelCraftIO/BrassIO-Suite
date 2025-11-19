import { ScrollView, StyleSheet } from 'react-native'
import { ThemedView } from '@/components/themed-view'
import { MarkdownRenderer } from '@/components/markdown-renderer'
import { impressumMd } from '@brassio/legal-content'

export default function ImpressumScreen() {
  return (
    <ScrollView style={styles.container}>
      <ThemedView>
        <MarkdownRenderer content={impressumMd} />
      </ThemedView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
