import { MarkdownRenderer } from '@/components/legal/markdown-renderer'
import { impressumMd } from '@brassio/legal-content'

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-4xl px-8 py-12">
        <MarkdownRenderer content={impressumMd} />
      </div>
    </div>
  )
}
