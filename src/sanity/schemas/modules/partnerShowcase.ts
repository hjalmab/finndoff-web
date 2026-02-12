import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'partnerShowcase',
  title: 'Partnervisning',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Undertekst',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'partners',
      title: 'Partnere',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'partner' }] }],
    }),
    defineField({
      name: 'style',
      title: 'Stil',
      type: 'string',
      options: {
        list: [
          { title: 'Grid', value: 'grid' },
          { title: 'Slider', value: 'slider' },
        ],
      },
      initialValue: 'grid',
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { title: `Partnere: ${title || 'Uten tittel'}` }
    },
  },
})
