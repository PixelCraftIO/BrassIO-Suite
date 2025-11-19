import { NewsList } from '@/components/news-list'

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            BrassIO-Suite
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Dein umfassendes Ökosystem für Musikübungen
          </p>
        </div>

        <section>
          <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Neuigkeiten
          </h2>
          <NewsList />
        </section>
      </main>
    </div>
  )
}
