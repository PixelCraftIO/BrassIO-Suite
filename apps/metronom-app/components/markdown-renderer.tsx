import { StyleSheet, ScrollView, View } from 'react-native'
import { ThemedText } from './themed-text'
import { ThemedView } from './themed-view'

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const lines = content.split('\n')

  const renderLine = (line: string, index: number) => {
    // H1
    if (line.startsWith('# ')) {
      return (
        <ThemedText key={index} type="title" style={styles.h1}>
          {line.substring(2)}
        </ThemedText>
      )
    }
    // H2
    if (line.startsWith('## ')) {
      return (
        <ThemedText key={index} type="subtitle" style={styles.h2}>
          {line.substring(3)}
        </ThemedText>
      )
    }
    // H3
    if (line.startsWith('### ')) {
      return (
        <ThemedText key={index} style={styles.h3}>
          {line.substring(4)}
        </ThemedText>
      )
    }
    // Bold text
    if (line.startsWith('**') && line.endsWith('**')) {
      return (
        <ThemedText key={index} style={styles.bold}>
          {line.substring(2, line.length - 2)}
        </ThemedText>
      )
    }
    // List item
    if (line.startsWith('- ')) {
      return (
        <ThemedText key={index} style={styles.listItem}>
          • {line.substring(2)}
        </ThemedText>
      )
    }
    // Empty line
    if (!line.trim()) {
      return <View key={index} style={styles.spacing} />
    }
    // Regular paragraph
    return (
      <ThemedText key={index} style={styles.paragraph}>
        {line}
      </ThemedText>
    )
  }

  return (
    <ThemedView style={styles.container}>
      {lines.map(renderLine)}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  h1: {
    marginTop: 24,
    marginBottom: 16,
  },
  h2: {
    marginTop: 20,
    marginBottom: 12,
  },
  h3: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  bold: {
    fontWeight: '600',
    marginBottom: 8,
  },
  paragraph: {
    marginBottom: 12,
    lineHeight: 22,
  },
  listItem: {
    marginBottom: 6,
    marginLeft: 16,
    lineHeight: 22,
  },
  spacing: {
    height: 8,
  },
})
