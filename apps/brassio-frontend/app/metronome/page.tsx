import { MetronomeWidget } from '@/components/metronome/metronome-widget'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Metronom - BrassIO-Suite',
  description: 'Professionelles Metronom mit individuellen Unterteilungen pro Schlag, Taktarten und Akzenten',
}

export default function MetronomePage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="mb-8 text-center text-4xl font-bold text-zinc-900 dark:text-zinc-50">
          BrassIO Metronom
        </h1>
        <MetronomeWidget />
      </main>
    </div>
  )
}
