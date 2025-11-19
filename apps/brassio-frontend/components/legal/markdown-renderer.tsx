'use client'

import React from 'react'

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const renderMarkdown = (markdown: string) => {
    const lines = markdown.split('\n')
    const elements: React.ReactElement[] = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      // H1
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={i} className="mb-6 mt-8 text-4xl font-bold text-zinc-900 dark:text-zinc-100">
            {line.substring(2)}
          </h1>
        )
      }
      // H2
      else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={i} className="mb-4 mt-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {line.substring(3)}
          </h2>
        )
      }
      // H3
      else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={i} className="mb-3 mt-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            {line.substring(4)}
          </h3>
        )
      }
      // Bold text
      else if (line.startsWith('**') && line.endsWith('**')) {
        elements.push(
          <p key={i} className="mb-2 font-semibold text-zinc-900 dark:text-zinc-100">
            {line.substring(2, line.length - 2)}
          </p>
        )
      }
      // List item
      else if (line.startsWith('- ')) {
        elements.push(
          <li key={i} className="mb-1 ml-4 text-zinc-700 dark:text-zinc-300">
            {line.substring(2)}
          </li>
        )
      }
      // Regular paragraph
      else if (line.trim()) {
        elements.push(
          <p key={i} className="mb-3 text-zinc-700 dark:text-zinc-300">
            {line}
          </p>
        )
      }
      // Empty line
      else {
        elements.push(<div key={i} className="h-2" />)
      }
    }

    return elements
  }

  return <div className="prose prose-zinc dark:prose-invert max-w-none">{renderMarkdown(content)}</div>
}
