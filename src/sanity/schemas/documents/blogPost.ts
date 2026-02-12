import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'blogPost',
  title: 'Blogginnlegg',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
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
      name: 'author',
      title: 'Forfatter',
      type: 'reference',
      to: [{ type: 'person' }],
    }),
    defineField({
      name: 'mainImage',
      title: 'Hovedbilde',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt-tekst' },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Komme i gang', value: 'komme-i-gang' },
          { title: 'Produkttips', value: 'produkttips' },
          { title: 'Bransje', value: 'bransje' },
          { title: 'Nyheter', value: 'nyheter' },
          { title: 'Partnerskap', value: 'partnerskap' },
        ],
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Utdrag',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'body',
      title: 'Innhold',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Sitat', value: 'blockquote' },
          ],
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt-tekst' },
            { name: 'caption', type: 'string', title: 'Bildetekst' },
          ],
        },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publiseringsdato',
      type: 'datetime',
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
  orderings: [
    {
      title: 'Publiseringsdato (nyeste først)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      date: 'publishedAt',
    },
    prepare({ title, author, media, date }) {
      return {
        title,
        subtitle: [author, date?.split('T')[0]].filter(Boolean).join(' — '),
        media,
      }
    },
  },
})
