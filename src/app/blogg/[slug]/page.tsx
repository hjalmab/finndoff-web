import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { blogPostQuery, blogPostsQuery } from '@/sanity/lib/queries'
import { SanityImage } from '@/components/ui/SanityImage'
import { PortableTextRenderer } from '@/components/ui/PortableTextRenderer'
import type { BlogPostDocument, BlogPostListItem } from '@/types/sanity'

export const revalidate = 60

const categoryLabels: Record<string, string> = {
  'komme-i-gang': 'Komme i gang',
  produkttips: 'Produkttips',
  bransje: 'Bransje',
  nyheter: 'Nyheter',
  partnerskap: 'Partnerskap',
}

function formatDate(dateString?: string) {
  if (!dateString) return null
  return new Date(dateString).toLocaleDateString('no-NO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export async function generateStaticParams() {
  const posts = await client.fetch<BlogPostListItem[]>(blogPostsQuery)
  return posts.map((post) => ({ slug: post.slug.current }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await client.fetch<BlogPostDocument | null>(blogPostQuery, {
    slug,
  })

  if (!post) return { title: 'Innlegg ikke funnet — Finndoff' }

  return {
    title: post.seoTitle || `${post.title} — Finndoff Blogg`,
    description: post.seoDescription || post.excerpt,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await client.fetch<BlogPostDocument | null>(blogPostQuery, {
    slug,
  })

  if (!post) notFound()

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      {/* Back link */}
      <Link
        href="/blogg"
        className="mb-8 inline-flex items-center gap-1 text-sm text-navy-500 hover:text-primary-600"
      >
        &larr; Tilbake til bloggen
      </Link>

      {/* Main image */}
      {post.mainImage?.asset && (
        <div className="mb-8 overflow-hidden rounded-xl">
          <SanityImage
            image={post.mainImage}
            width={1200}
            height={675}
            className="w-full"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>
      )}

      {/* Meta */}
      <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-navy-500">
        {post.category && (
          <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
            {categoryLabels[post.category] || post.category}
          </span>
        )}
        {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
        {post.author?.name && <span>· {post.author.name}</span>}
      </div>

      {/* Title */}
      <h1 className="mb-8 font-display text-3xl font-bold text-navy-900 sm:text-4xl">
        {post.title}
      </h1>

      {/* Body */}
      <div className="prose-navy max-w-none text-navy-700">
        <PortableTextRenderer value={post.body} />
      </div>

      {/* Author box */}
      {post.author && (
        <div className="mt-12 flex items-center gap-4 rounded-xl border border-navy-100 bg-navy-50 p-6">
          {post.author.image?.asset && (
            <SanityImage
              image={post.author.image}
              width={64}
              height={64}
              className="rounded-full"
            />
          )}
          <div>
            <p className="font-display font-semibold text-navy-900">
              {post.author.name}
            </p>
            {post.author.role && (
              <p className="text-sm text-navy-500">{post.author.role}</p>
            )}
          </div>
        </div>
      )}

      {/* Back link */}
      <div className="mt-12">
        <Link
          href="/blogg"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          &larr; Se alle innlegg
        </Link>
      </div>
    </article>
  )
}
