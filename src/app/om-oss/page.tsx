import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { pageQuery } from '@/sanity/lib/queries'
import { PageBuilder } from '@/components/PageBuilder'
import type { PageDocument } from '@/types/sanity'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch<PageDocument | null>(pageQuery, {
    slug: 'om-oss',
  })

  return {
    title: page?.seoTitle || 'Om oss — Finndoff',
    description:
      page?.seoDescription ||
      'Møt teamet bak Finndoff. Vi kombinerer teknologi og ekspertise for å hjelpe norske bedrifter vinne flere anbud.',
  }
}

export default async function OmOssPage() {
  const page = await client.fetch<PageDocument | null>(pageQuery, {
    slug: 'om-oss',
  })

  return page?.sections ? (
    <PageBuilder sections={page.sections} />
  ) : (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-4xl font-bold text-navy-900">
          Om oss
        </h1>
        <p className="mt-4 text-navy-600">
          Opprett en side med slug &ldquo;om-oss&rdquo; i Sanity Studio for å
          komme i gang.
        </p>
      </div>
    </div>
  )
}
