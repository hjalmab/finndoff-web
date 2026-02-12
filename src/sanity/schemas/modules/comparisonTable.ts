import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'comparisonTable',
  title: 'Sammenligningstabell',
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
      name: 'columns',
      title: 'Kolonner',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Kolonnenavn', type: 'string', validation: (Rule: any) => Rule.required() },
            { name: 'highlighted', title: 'Fremhevet', type: 'boolean', initialValue: false },
          ],
          preview: {
            select: { title: 'name', highlighted: 'highlighted' },
            prepare({ title, highlighted }: { title?: string; highlighted?: boolean }) {
              return { title: title || 'Uten navn', subtitle: highlighted ? 'Fremhevet' : undefined }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'rows',
      title: 'Rader',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'feature', title: 'Funksjon', type: 'string', validation: (Rule: any) => Rule.required() },
            {
              name: 'values',
              title: 'Verdier (en per kolonne)',
              type: 'array',
              of: [{ type: 'string' }],
            },
          ],
          preview: {
            select: { title: 'feature' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { title: `Sammenligning: ${title || 'Uten tittel'}` }
    },
  },
})
