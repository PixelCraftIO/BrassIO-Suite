import { MarkdownRenderer } from '@/components/legal/markdown-renderer'
import { disclaimerMd } from '@brassio/legal-content'

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-4xl px-8 py-12">
        <MarkdownRenderer content={disclaimerMd} />
      </div>
    </div>
  )
}
