import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { legalDocumentQuery } from '@/sanity/lib/queries'
import { buildAlternates, stripTitleSuffix } from '@/lib/metadata'
import type { LegalDocument } from '@/types/sanity'
import { LegalDocumentView } from './LegalDocumentView'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const doc = await client.fetch<LegalDocument | null>(legalDocumentQuery, {
    slug: 'vilkar',
  })

  const title = doc?.seoTitle ? stripTitleSuffix(doc.seoTitle) : 'Vilkår'
  const description =
    doc?.seoDescription || 'Brukervilkår for Finndoff AS.'

  return {
    title,
    description,
    alternates: buildAlternates('/vilkar'),
  }
}

export default async function VilkarPage() {
  const doc = await client.fetch<LegalDocument | null>(legalDocumentQuery, {
    slug: 'vilkar',
  })

  if (!doc) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold text-navy-900">
          Brukervilkår
        </h1>
        <div className="mt-8 space-y-4 text-navy-700">
          <p>
            Brukervilkår er under utarbeidelse og vil bli publisert her snart.
          </p>
          <p>
            Har du spørsmål, ta kontakt på{' '}
            <a
              href="mailto:kontakt@finndoff.no"
              className="text-primary-600 underline hover:text-primary-700"
            >
              kontakt@finndoff.no
            </a>
            .
          </p>
        </div>
      </section>
    )
  }

  return <LegalDocumentView doc={doc} />
}
