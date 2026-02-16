import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Side',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Sidetittel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL-slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO-tittel',
      type: 'string',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO-beskrivelse',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'OG-bilde (deling)',
      type: 'image',
    }),
    defineField({
      name: 'sections',
      title: 'Seksjoner',
      type: 'array',
      of: [
        { type: 'hero' },
        { type: 'featureGrid' },
        { type: 'pricingTable' },
        { type: 'trustBar' },
        { type: 'testimonial' },
        { type: 'videoEmbed' },
        { type: 'ctaSection' },
        { type: 'faqAccordion' },
        { type: 'timeline' },
        { type: 'partnerShowcase' },
        { type: 'comparisonTable' },
        { type: 'textSection' },
        { type: 'pricingCalculator' },
        { type: 'teamGrid' },
        { type: 'contactSection' },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current' },
    prepare({ title, slug }) {
      return { title, subtitle: `/${slug || ''}` }
    },
  },
})
