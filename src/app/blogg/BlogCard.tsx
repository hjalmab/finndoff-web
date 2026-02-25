import Link from 'next/link'
import { SanityImage } from '@/components/ui/SanityImage'
import type { BlogPostListItem } from '@/types/sanity'

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

export function BlogCard({ post }: { post: BlogPostListItem }) {
  return (
    <Link
      href={`/blogg/${post.slug.current}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-navy-100 bg-white transition-shadow hover:shadow-lg"
    >
      {post.mainImage?.asset && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <SanityImage
            image={post.mainImage}
            width={600}
            height={338}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        {post.category && (
          <span className="mb-2 w-fit rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
            {categoryLabels[post.category] || post.category}
          </span>
        )}
        <h3 className="mb-2 font-display text-lg font-semibold text-navy-900 group-hover:text-primary-600">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="mb-4 flex-1 text-sm leading-relaxed text-navy-600">
            {post.excerpt}
          </p>
        )}
        <div className="flex items-center gap-3 border-t border-navy-100 pt-4">
          {post.author?.image?.asset && (
            <SanityImage
              image={post.author.image}
              width={32}
              height={32}
              className="rounded-full"
            />
          )}
          <div className="text-sm text-navy-500">
            {post.author?.name && <span>{post.author.name}</span>}
            {post.author?.name && post.publishedAt && <span> · </span>}
            {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
          </div>
        </div>
      </div>
    </Link>
  )
}
