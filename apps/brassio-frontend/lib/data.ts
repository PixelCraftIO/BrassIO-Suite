import { supabase } from './supabase'
import type { News } from './types'

export async function getPublishedNews(): Promise<News[]> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching news:', error)
    throw new Error('Failed to fetch news')
  }

  return data || []
}
