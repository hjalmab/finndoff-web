import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pricingCalculator',
  title: 'Priskalkulator',
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
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { title: `Kalkulator: ${title || 'Uten tittel'}` }
    },
  },
})
