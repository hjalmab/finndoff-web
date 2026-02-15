import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { productQuery } from '@/sanity/lib/queries'
import { PageBuilder } from '@/components/PageBuilder'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import type { ProductDocument } from '@/types/sanity'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await client.fetch<ProductDocument | null>(productQuery, {
    slug,
  })

  if (!product) return {}

  return {
    title: product.seoTitle || product.title,
    description: product.seoDescription || product.description,
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await client.fetch<ProductDocument | null>(productQuery, {
    slug,
  })

  if (!product) notFound()

  return (
    <>
      {/* Product header */}
      <section className="bg-white pb-8 pt-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          {product.icon && (
            <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-primary-50 p-4">
              <DynamicIcon
                name={product.icon}
                className="h-8 w-8 text-primary-600"
              />
            </div>
          )}
          {product.title && (
            <h1 className="font-display text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
              {product.title}
            </h1>
          )}
          {product.subtitle && (
            <p className="mt-4 text-lg text-navy-600">{product.subtitle}</p>
          )}
          {product.priceLabel && (
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent-50 px-4 py-2 text-sm font-medium text-accent-700">
              {product.isAddon && (
                <span className="rounded-full bg-accent-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide">
                  Tillegg
                </span>
              )}
              {product.priceLabel}
            </div>
          )}
        </div>
      </section>

      {/* Sections from Sanity */}
      <PageBuilder sections={product.sections} />
    </>
  )
}
