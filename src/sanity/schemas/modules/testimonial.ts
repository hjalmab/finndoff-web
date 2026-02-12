import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Kundesitat',
  type: 'object',
  fields: [
    defineField({
      name: 'quote',
      title: 'Sitat',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Navn',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Stilling',
      type: 'string',
    }),
    defineField({
      name: 'company',
      title: 'Bedrift',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Bilde',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { quote: 'quote', name: 'name', company: 'company' },
    prepare({ quote, name, company }) {
      return {
        title: `"${(quote || '').substring(0, 50)}..."`,
        subtitle: [name, company].filter(Boolean).join(', '),
      }
    },
  },
})
