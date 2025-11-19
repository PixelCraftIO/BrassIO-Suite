import { useEffect, useState } from 'react'
import { StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import { ThemedText } from './themed-text'
import { ThemedView } from './themed-view'
import { supabase } from '@/lib/supabase'
import type { News } from '@/lib/types'

export function NewsList() {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function fetchNews() {
    try {
      setError(null)

      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })

      if (error) throw error

      setNews(data || [])
    } catch (err) {
      console.error('Error fetching news:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch news')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [])

  const onRefresh = () => {
    setRefreshing(true)
    fetchNews()
  }

  if (loading) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ActivityIndicator size="large" />
      </ThemedView>
    )
  }

  if (error) {
    return (
      <ThemedView style={styles.errorContainer}>
        <ThemedText style={styles.errorText}>Error: {error}</ThemedText>
      </ThemedView>
    )
  }

  if (news.length === 0) {
    return (
      <ThemedView style={styles.emptyContainer}>
        <ThemedText>Keine News verfügbar</ThemedText>
      </ThemedView>
    )
  }

  return (
    <FlatList
      data={news}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      renderItem={({ item }) => (
        <ThemedView style={styles.newsItem}>
          <ThemedText type="subtitle" style={styles.title}>
            {item.title}
          </ThemedText>
          <ThemedText style={styles.description}>
            {item.description}
          </ThemedText>
          {item.content && (
            <ThemedText style={styles.content}>
              {item.content}
            </ThemedText>
          )}
          <ThemedText style={styles.date}>
            {new Date(item.created_at).toLocaleDateString('de-DE', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </ThemedText>
        </ThemedView>
      )}
      contentContainerStyle={styles.listContent}
    />
  )
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorContainer: {
    padding: 20,
    backgroundColor: '#fee',
    borderRadius: 8,
    margin: 16,
  },
  errorText: {
    color: '#c00',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
  },
  newsItem: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(128, 128, 128, 0.05)',
  },
  title: {
    marginBottom: 8,
  },
  description: {
    marginBottom: 8,
    opacity: 0.8,
  },
  content: {
    marginBottom: 8,
    fontSize: 14,
    opacity: 0.7,
  },
  date: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 4,
  },
})
