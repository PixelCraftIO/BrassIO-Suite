import type { News } from '@/lib/types'

interface NewsListProps {
  news: News[]
}

export function NewsList({ news }: NewsListProps) {
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
