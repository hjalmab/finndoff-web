import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { pageQuery } from '@/sanity/lib/queries'
import { PageBuilder } from '@/components/PageBuilder'
import type { PageDocument } from '@/types/sanity'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch<PageDocument | null>(pageQuery, {
    slug: 'priser',
  })

  return {
    title: page?.seoTitle || 'Priser — Finndoff',
    description:
      page?.seoDescription ||
      'Enkel og modulær prising. Start med Varsling og legg til det du trenger.',
  }
}

export default async function PriserPage() {
  const page = await client.fetch<PageDocument | null>(pageQuery, {
    slug: 'priser',
  })

  return page?.sections ? (
    <PageBuilder sections={page.sections} />
  ) : (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-4xl font-bold text-navy-900">
          Priser
        </h1>
        <p className="mt-4 text-navy-600">
          Opprett en side med slug &ldquo;priser&rdquo; i Sanity Studio for å
          komme i gang.
        </p>
      </div>
    </div>
  )
}
