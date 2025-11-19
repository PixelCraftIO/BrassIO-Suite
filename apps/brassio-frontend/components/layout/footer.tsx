import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            © {currentYear} BrassIO. Alle Rechte vorbehalten.
          </div>
          <div className="flex space-x-6">
            <Link
              href="/legal/impressum"
              className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Impressum
            </Link>
            <Link
              href="/legal/datenschutz"
              className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Datenschutz
            </Link>
            <Link
              href="/legal/disclaimer"
              className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Haftungsausschluss
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
