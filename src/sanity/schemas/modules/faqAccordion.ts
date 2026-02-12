import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'faqAccordion',
  title: 'FAQ-trekkspill',
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
      name: 'items',
      title: 'Spørsmål og svar',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Spørsmål', type: 'string', validation: (Rule: any) => Rule.required() },
            {
              name: 'answer',
              title: 'Svar',
              type: 'array',
              of: [{ type: 'block' }],
            },
          ],
          preview: {
            select: { title: 'question' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', items: 'items' },
    prepare({ title, items }) {
      const count = items?.length || 0
      return { title: `FAQ: ${title || 'Uten tittel'}`, subtitle: `${count} spørsmål` }
    },
  },
})
