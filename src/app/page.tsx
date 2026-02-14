import { client } from '@/sanity/lib/client'
import { pageQuery } from '@/sanity/lib/queries'
import { PageBuilder } from '@/components/PageBuilder'
import type { PageDocument } from '@/types/sanity'

export default async function Home() {
  const page = await client.fetch<PageDocument | null>(pageQuery, {
    slug: 'hjem',
  })

  return (
    <main>
      {page?.sections ? (
        <PageBuilder sections={page.sections} />
      ) : (
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-4xl font-bold text-navy-900">
              Finndoff
            </h1>
            <p className="mt-4 text-navy-600">
              Opprett en side med slug &ldquo;hjem&rdquo; i Sanity Studio for å
              komme i gang.
            </p>
          </div>
        </div>
      )}
    </main>
  )
}
