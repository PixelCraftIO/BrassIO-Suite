import { RhythmSequenceWidget } from '@/components/rhythm/rhythm-sequence-widget'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rhythm Trainer - BrassIO-Suite',
  description: 'Erstelle Multi-Takt-Sequenzen mit verschiedenen Tempi und Taktarten',
}

export default function RhythmPage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-zinc-900 dark:text-zinc-50">
          Rhythmus Trainer
        </h1>
        <RhythmSequenceWidget />
      </main>
    </div>
  )
}
