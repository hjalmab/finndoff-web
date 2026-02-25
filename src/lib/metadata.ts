import type { PortableTextBlock } from 'next-sanity'
import { urlFor } from '@/sanity/lib/image'
import type { SanityImage } from '@/types/sanity'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://finndoff.no'

/**
 * Strip trailing "| Finndoff" or "— Finndoff" suffix from a title.
 * Prevents double suffix when combined with the title template.
 */
export function stripTitleSuffix(title: string): string {
  return (
    title
      .replace(/(\s*\|\s*[^|]+)+\s*$/, '') // strip all trailing pipe segments (e.g. "| Nyheter | Finndoff")
      .replace(/\s*[—–-]\s*Finndoff\s*$/i, '') // strip trailing dash-Finndoff
      .trim() || title
  )
}

/**
 * Build an OG image URL from a Sanity image reference.
 * Returns a 1200×630 cropped URL string, or undefined if no image.
 */
export function buildOgImageUrl(image?: SanityImage): string | undefined {
  if (!image?.asset) return undefined
  return urlFor(image).width(1200).height(630).fit('crop').url()
}

/**
 * Build a canonical URL from a path segment.
 */
export function canonical(path: string): string {
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`
}

/**
 * Build alternates object with canonical URL for Next.js metadata.
 */
export function buildAlternates(path: string) {
  return { canonical: canonical(path) }
}

/**
 * Convert PortableText blocks to a plain-text string.
 * Useful for generating descriptions from rich text (e.g. FAQ answers).
 */
export function portableTextToPlain(blocks?: PortableTextBlock[]): string {
  if (!blocks) return ''
  return blocks
    .filter((block) => block._type === 'block')
    .map((block) => {
      const children = block.children as Array<{ text?: string }> | undefined
      if (!children) return ''
      return children.map((child) => child.text || '').join('')
    })
    .join(' ')
    .trim()
}
