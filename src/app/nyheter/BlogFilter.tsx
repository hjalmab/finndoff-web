'use client'

import { useState } from 'react'
import type { BlogPostListItem } from '@/types/sanity'
import { BlogCard } from './BlogCard'

const categories = [
  { value: 'all', label: 'Alle' },
  { value: 'komme-i-gang', label: 'Komme i gang' },
  { value: 'produkttips', label: 'Produkttips' },
  { value: 'bransje', label: 'Bransje' },
  { value: 'nyheter', label: 'Nyheter' },
  { value: 'partnerskap', label: 'Partnerskap' },
]

export function BlogFilter({ posts }: { posts: BlogPostListItem[] }) {
  const [active, setActive] = useState('all')

  const filtered =
    active === 'all' ? posts : posts.filter((p) => p.category === active)

  // Only show categories that have posts
  const activeCategories = categories.filter(
    (c) => c.value === 'all' || posts.some((p) => p.category === c.value)
  )

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {activeCategories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActive(cat.value)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active === cat.value
                ? 'bg-primary-500 text-white'
                : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <p className="py-12 text-center text-navy-500">
          Ingen innlegg i denne kategorien ennå.
        </p>
      )}
    </>
  )
}
