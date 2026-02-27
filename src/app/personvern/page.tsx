import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { legalDocumentQuery } from '@/sanity/lib/queries'
import { buildAlternates, stripTitleSuffix } from '@/lib/metadata'
import type { LegalDocument } from '@/types/sanity'
import { LegalDocumentView } from '../vilkar/LegalDocumentView'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const doc = await client.fetch<LegalDocument | null>(legalDocumentQuery, {
    slug: 'personvern',
  })

  const title = doc?.seoTitle
    ? stripTitleSuffix(doc.seoTitle)
    : 'Personvern'
  const description =
    doc?.seoDescription || 'Personvernerklæring for Finndoff AS.'

  return {
    title,
    description,
    alternates: buildAlternates('/personvern'),
  }
}

export default async function PersonvernPage() {
  const doc = await client.fetch<LegalDocument | null>(legalDocumentQuery, {
    slug: 'personvern',
  })

  if (!doc) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold text-navy-900">
          Personvernerklæring
        </h1>
        <div className="mt-8 space-y-4 text-navy-700">
          <p>
            Personvernerklæring er under utarbeidelse og vil bli publisert her
            snart.
          </p>
          <p>
            Har du spørsmål om personvern, ta kontakt på{' '}
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
