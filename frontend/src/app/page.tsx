import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BrassIO-Suite - Dein umfassendes Ökosystem für Musikübungen',
  description: 'Dein umfassendes Ökosystem für Musikübungen - Metronom, Stimmgerät und mehr',
}

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

        <section className="grid gap-6 md:grid-cols-2">
          <Link
            href="/metronome"
            className="rounded-lg border-2 border-zinc-200 p-6 transition-colors hover:border-blue-500 dark:border-zinc-700"
          >
            <h2 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              Metronom
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Professionelles Metronom mit individuellen Unterteilungen pro Schlag, Taktarten und Akzenten
            </p>
          </Link>

          <Link
            href="/rhythm"
            className="rounded-lg border-2 border-zinc-200 p-6 transition-colors hover:border-blue-500 dark:border-zinc-700"
          >
            <h2 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              Rhythm Trainer
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Erstelle Multi-Takt-Sequenzen mit verschiedenen Tempi und Taktarten
            </p>
          </Link>
        </section>
      </main>
    </div>
  )
}
