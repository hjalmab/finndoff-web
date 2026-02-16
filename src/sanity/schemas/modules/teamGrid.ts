import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'teamGrid',
  title: 'Teamvisning',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Undertittel',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'persons',
      title: 'Personer',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [{ title: 'Grid', value: 'grid' }],
      },
      initialValue: 'grid',
    }),
  ],
  preview: {
    select: { title: 'title', persons: 'persons' },
    prepare({ title, persons }) {
      return {
        title: `Team: ${title || 'Uten tittel'}`,
        subtitle: `${persons?.length || 0} personer`,
      }
    },
  },
})
