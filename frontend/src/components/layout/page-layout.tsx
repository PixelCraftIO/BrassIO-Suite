import { Navigation } from './navigation'
import { Footer } from './footer'

interface PageLayoutProps {
  children: React.ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Navigation />
      <main className="flex-1 overflow-y-auto">{children}</main>
      <Footer />
    </div>
  )
}
