import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Spørsmål',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Svar',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Generelt', value: 'generelt' },
          { title: 'Priser', value: 'priser' },
          { title: 'Varsling', value: 'varsling' },
          { title: 'Innsikt', value: 'innsikt' },
          { title: 'Anbudshjelp AI', value: 'anbudshjelp-ai' },
          { title: 'Konto', value: 'konto' },
        ],
      },
    }),
    defineField({
      name: 'product',
      title: 'Tilknyttet produkt',
      type: 'reference',
      to: [{ type: 'product' }],
    }),
  ],
  orderings: [
    {
      title: 'Kategori',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'question', category: 'category' },
    prepare({ title, category }) {
      return { title, subtitle: category }
    },
  },
})
