import { RhythmSequenceWidget } from '@/components/rhythm/rhythm-sequence-widget'

export default function RhythmPage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-center mb-8">Rhythm Trainer</h1>
      <RhythmSequenceWidget />
    </main>
  )
}
