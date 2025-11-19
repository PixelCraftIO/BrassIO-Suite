import { ScrollView, StyleSheet } from 'react-native'
import { ThemedView } from '@/components/themed-view'
import { MarkdownRenderer } from '@/components/markdown-renderer'
import { disclaimerMd } from '@brassio/legal-content'

export default function DisclaimerScreen() {
  return (
    <ScrollView style={styles.container}>
      <ThemedView>
        <MarkdownRenderer content={disclaimerMd} />
      </ThemedView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
