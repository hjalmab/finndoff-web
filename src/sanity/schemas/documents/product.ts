import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Produkt',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Produktnavn',
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
      name: 'subtitle',
      title: 'Undertittel',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Kort beskrivelse',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'icon',
      title: 'Ikon (Lucide-navn)',
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: 'Pris (kr/mnd)',
      type: 'number',
    }),
    defineField({
      name: 'priceLabel',
      title: 'Prisetkett (f.eks. "+649 kr/mnd")',
      type: 'string',
    }),
    defineField({
      name: 'isAddon',
      title: 'Er tilleggsmodul',
      type: 'boolean',
      initialValue: false,
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
      ],
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
  ],
  preview: {
    select: { title: 'title', subtitle: 'subtitle', price: 'price' },
    prepare({ title, subtitle, price }) {
      return {
        title,
        subtitle: [subtitle, price ? `${price} kr/mnd` : null].filter(Boolean).join(' — '),
      }
    },
  },
})
