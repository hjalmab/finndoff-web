import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { SanityImage as SanityImageType } from '@/types/sanity'

export function SanityImage({
  image,
  width = 800,
  height = 600,
  className = '',
  sizes,
  priority = false,
}: {
  image?: SanityImageType
  width?: number
  height?: number
  className?: string
  sizes?: string
  priority?: boolean
}) {
  if (!image?.asset) return null

  return (
    <Image
      src={urlFor(image).width(width).height(height).url()}
      alt={image.alt || ''}
      width={width}
      height={height}
      className={className}
      sizes={sizes}
      priority={priority}
    />
  )
}
