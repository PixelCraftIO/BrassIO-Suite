'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Etwas ist schiefgelaufen!
        </h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Es ist ein unerwarteter Fehler aufgetreten.
        </p>
        {error.digest && (
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-500">
            Fehler-ID: {error.digest}
          </p>
        )}
      </div>
      <button
        onClick={reset}
        className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        Erneut versuchen
      </button>
    </div>
  )
}
