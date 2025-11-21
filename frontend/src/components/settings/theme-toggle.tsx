'use client'

import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'

// Custom hook for client-side mounting detection without useEffect
function useIsMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
}

export function ThemeToggle() {
  const mounted = useIsMounted()
  const { theme, setTheme } = useTheme()

  if (!mounted) {
    return null
  }

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Darstellung</h2>

      <div className="flex items-center space-x-4">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Theme auswählen:
        </label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
        >
          <option value="system">System</option>
          <option value="light">Hell</option>
          <option value="dark">Dunkel</option>
        </select>
      </div>

      <div className="mt-4 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Aktuelles Theme: <span className="font-semibold">{theme === 'system' ? 'System' : theme === 'light' ? 'Hell' : 'Dunkel'}</span>
        </p>
      </div>
    </div>
  )
}
