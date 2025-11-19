'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { News } from '@/lib/types'

export function NewsList() {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true)
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
      }
    }

    fetchNews()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-100" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
        <p className="text-sm text-red-800 dark:text-red-200">
          Error: {error}
        </p>
      </div>
    )
  }

  if (news.length === 0) {
    return (
      <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-zinc-600 dark:text-zinc-400">
          Keine News verfügbar
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {news.map((item) => (
        <article
          key={item.id}
          className="rounded-lg border border-zinc-200 bg-white p-6 transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
        >
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            {item.title}
          </h2>
          <p className="mb-3 text-zinc-600 dark:text-zinc-400">
            {item.description}
          </p>
          {item.content && (
            <p className="mb-3 text-sm text-zinc-700 dark:text-zinc-300">
              {item.content}
            </p>
          )}
          <time className="text-xs text-zinc-500 dark:text-zinc-500">
            {new Date(item.created_at).toLocaleDateString('de-DE', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </article>
      ))}
    </div>
  )
}
