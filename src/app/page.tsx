import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { pageQuery } from '@/sanity/lib/queries'
import { PageBuilder } from '@/components/PageBuilder'
import { JsonLd } from '@/components/JsonLd'
import { buildOgImageUrl, buildAlternates, portableTextToPlain, stripTitleSuffix } from '@/lib/metadata'
import type { PageDocument, FaqAccordionSection } from '@/types/sanity'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch<PageDocument | null>(pageQuery, {
    slug: 'hjem',
  })

  const ogImage = buildOgImageUrl(page?.ogImage)

  return {
    title: page?.seoTitle ? stripTitleSuffix(page.seoTitle) : 'Finndoff — Finn og vinn offentlige anbud',
    description:
      page?.seoDescription ||
      'Finndoff hjelper norske bedrifter med å finne, forstå og vinne offentlige anbud. Anbudsvarsling, innsikt og AI-drevet anbudshjelp.',
    alternates: buildAlternates('/'),
    openGraph: {
      title: page?.seoTitle ? stripTitleSuffix(page.seoTitle) : 'Finndoff — Finn og vinn offentlige anbud',
      description:
        page?.seoDescription ||
        'Finndoff hjelper norske bedrifter med å finne, forstå og vinne offentlige anbud.',
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630 }] }),
    },
  }
}

export default async function Home() {
  const page = await client.fetch<PageDocument | null>(pageQuery, {
    slug: 'hjem',
  })

  // Extract FAQ items for JSON-LD
  const faqSection = page?.sections?.find(
    (s): s is FaqAccordionSection => s._type === 'faqAccordion'
  )
  const faqItems = faqSection?.items

  return (
    <>
      {faqItems && faqItems.length > 0 && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqItems.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: portableTextToPlain(item.answer),
              },
            })),
          }}
        />
      )}
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
    </>
  )
}
