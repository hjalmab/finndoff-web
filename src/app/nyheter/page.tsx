import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { blogPostsQuery } from '@/sanity/lib/queries'
import { buildAlternates } from '@/lib/metadata'
import type { BlogPostListItem } from '@/types/sanity'
import { BlogFilter } from './BlogFilter'

export const revalidate = 60

export function generateMetadata(): Metadata {
  return {
    title: 'Nyheter',
    description:
      'Tips, nyheter og innsikt om offentlige anbud. Lær hvordan du vinner flere anbud med Finndoff.',
    alternates: buildAlternates('/nyheter'),
    openGraph: {
      title: 'Nyheter | Finndoff',
      description:
        'Tips, nyheter og innsikt om offentlige anbud. Lær hvordan du vinner flere anbud med Finndoff.',
    },
  }
}

export default async function NyheterPage() {
  const posts = await client.fetch<BlogPostListItem[]>(blogPostsQuery)

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="font-display text-4xl font-bold text-navy-900">
          Nyheter
        </h1>
        <p className="mt-3 text-lg text-navy-600">
          Tips, nyheter og innsikt om offentlige anbud
        </p>
      </div>

      {posts && posts.length > 0 ? (
        <BlogFilter posts={posts} />
      ) : (
        <p className="py-12 text-center text-navy-500">
          Ingen innlegg publisert ennå.
        </p>
      )}
    </section>
  )
}
