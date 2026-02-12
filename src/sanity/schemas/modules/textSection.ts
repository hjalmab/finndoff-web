import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'textSection',
  title: 'Tekstseksjon',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel (valgfri)',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Innhold',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt-tekst', type: 'string' },
            { name: 'caption', title: 'Bildetekst', type: 'string' },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { title: `Tekst: ${title || 'Uten tittel'}` }
    },
  },
})
