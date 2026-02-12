import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'customerCase',
  title: 'Kundecase',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL-slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({
      name: 'customer',
      title: 'Bedrift',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contactPerson',
      title: 'Kontaktperson',
      type: 'string',
    }),
    defineField({
      name: 'contactRole',
      title: 'Stilling',
      type: 'string',
    }),
    defineField({
      name: 'quote',
      title: 'Kundesitat',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'logo',
      title: 'Bedriftslogo',
      type: 'image',
    }),
    defineField({
      name: 'image',
      title: 'Case-bilde',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'industry',
      title: 'Bransje',
      type: 'string',
    }),
    defineField({
      name: 'challenge',
      title: 'Utfordring',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'solution',
      title: 'Løsning',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'result',
      title: 'Resultat',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'products',
      title: 'Produkter i bruk',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    }),
  ],
  preview: {
    select: { title: 'title', customer: 'customer', media: 'logo' },
    prepare({ title, customer, media }) {
      return { title, subtitle: customer, media }
    },
  },
})
