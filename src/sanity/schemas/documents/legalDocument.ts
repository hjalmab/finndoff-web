import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'legalDocument',
  title: 'Juridisk dokument',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'object',
      fields: [
        { name: 'no', type: 'string', title: 'Norsk' },
        { name: 'en', type: 'string', title: 'English' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL-slug',
      type: 'slug',
      options: { source: 'title.no' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Innhold',
      type: 'object',
      fields: [
        {
          name: 'no',
          title: 'Norsk',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [
                { title: 'Normal', value: 'normal' },
                { title: 'H2', value: 'h2' },
                { title: 'H3', value: 'h3' },
                { title: 'H4', value: 'h4' },
              ],
            },
          ],
        },
        {
          name: 'en',
          title: 'English',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [
                { title: 'Normal', value: 'normal' },
                { title: 'H2', value: 'h2' },
                { title: 'H3', value: 'h3' },
                { title: 'H4', value: 'h4' },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Sist oppdatert',
      type: 'date',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO-tittel',
      type: 'string',
      description: 'Maks 60 tegn',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO-beskrivelse',
      type: 'text',
      rows: 2,
      description: 'Maks 160 tegn',
      validation: (Rule) => Rule.max(160),
    }),
  ],
  preview: {
    select: {
      title: 'title.no',
      subtitle: 'lastUpdated',
    },
  },
})
