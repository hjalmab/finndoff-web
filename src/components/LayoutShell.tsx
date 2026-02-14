'use client'

import { usePathname } from 'next/navigation'
import { Navigation } from './Navigation'
import { Footer } from './Footer'

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isStudio = pathname.startsWith('/studio')

  if (isStudio) {
    return <>{children}</>
  }

  return (
    <>
      <Navigation />
      <main className="pt-[72px]">{children}</main>
      <Footer />
    </>
  )
}
