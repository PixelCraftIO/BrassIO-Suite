import { ScrollView, StyleSheet } from 'react-native'
import { ThemedView } from '@/components/themed-view'
import { MarkdownRenderer } from '@/components/markdown-renderer'
import { datenschutzMd } from '@brassio/legal-content'

export default function DatenschutzScreen() {
  return (
    <ScrollView style={styles.container}>
      <ThemedView>
        <MarkdownRenderer content={datenschutzMd} />
      </ThemedView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
