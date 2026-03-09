import type { ReactNode } from 'react'
import { Header } from './Header'

type BoardLayoutProps = {
  children: ReactNode
}

export function BoardLayout({ children }: BoardLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-lavender-50">
      <Header />
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  )
}
