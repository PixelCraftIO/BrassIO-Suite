import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-zinc-900 dark:text-zinc-100">
          404
        </h1>
        <h2 className="mt-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          Seite nicht gefunden
        </h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Die gesuchte Seite existiert leider nicht.
        </p>
      </div>
      <Link
        href="/"
        className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        Zur Startseite
      </Link>
    </div>
  )
}
