import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from 'next-sanity'
import { SanityImage } from './SanityImage'

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 font-display text-3xl font-bold">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 font-display text-2xl font-semibold">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 mb-2 font-display text-xl font-semibold">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-primary-300 pl-4 italic text-navy-600">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 ml-6 list-disc space-y-1">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 ml-6 list-decimal space-y-1">{children}</ol>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || '#'
      const isExternal = href.startsWith('http')
      return (
        <a
          href={href}
          className="text-primary-500 underline hover:text-primary-600"
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      )
    },
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
  },
  types: {
    image: ({ value }) => (
      <figure className="my-6">
        <SanityImage
          image={value}
          width={1200}
          height={800}
          className="rounded-lg"
          sizes="(max-width: 768px) 100vw, 800px"
        />
        {value.caption && (
          <figcaption className="mt-2 text-center text-sm text-navy-500">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
}

export function PortableTextRenderer({ value }: { value?: PortableTextBlock[] }) {
  if (!value) return null
  return <PortableText value={value} components={components} />
}
