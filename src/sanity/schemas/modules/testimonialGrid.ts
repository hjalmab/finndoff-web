import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonialGrid',
  title: 'Kundesitat-grid',
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
      title: 'Sitater',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'quote', title: 'Sitat', type: 'text', rows: 3, validation: (Rule: any) => Rule.required() },
            { name: 'name', title: 'Navn', type: 'string' },
            { name: 'role', title: 'Stilling', type: 'string' },
            { name: 'company', title: 'Bedrift', type: 'string' },
            { name: 'image', title: 'Bilde', type: 'image', options: { hotspot: true } },
          ],
          preview: {
            select: { quote: 'quote', name: 'name', company: 'company' },
            prepare({ quote, name, company }: { quote?: string; name?: string; company?: string }) {
              return {
                title: `"${(quote || '').slice(0, 50)}..."`,
                subtitle: [name, company].filter(Boolean).join(', '),
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', items: 'items' },
    prepare({ title, items }: { title?: string; items?: unknown[] }) {
      return {
        title: `Sitater: ${title || 'Uten tittel'}`,
        subtitle: `${items?.length ?? 0} sitater`,
      }
    },
  },
})
