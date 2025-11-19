import { ThemeToggle } from '@/components/settings/theme-toggle'
import Link from 'next/link'

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-4xl p-8">
        <h1 className="mb-8 text-4xl font-bold text-zinc-900 dark:text-zinc-100">
          Einstellungen
        </h1>

        <div className="space-y-8">
          <ThemeToggle />

          <div className="border-t border-zinc-200 pt-8 dark:border-zinc-800">
            <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Rechtliches
            </h2>
            <div className="flex flex-col space-y-2">
              <Link
                href="/legal/impressum"
                className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
              >
                Impressum
              </Link>
              <Link
                href="/legal/datenschutz"
                className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
              >
                Datenschutzerklärung
              </Link>
              <Link
                href="/legal/disclaimer"
                className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
              >
                Haftungsausschluss
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
