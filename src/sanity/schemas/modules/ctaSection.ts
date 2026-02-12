import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ctaSection',
  title: 'CTA-seksjon',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Beskrivelse',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primær CTA',
      type: 'object',
      fields: [
        { name: 'text', title: 'Tekst', type: 'string' },
        { name: 'link', title: 'Lenke', type: 'string' },
      ],
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Sekundær CTA',
      type: 'object',
      fields: [
        { name: 'text', title: 'Tekst', type: 'string' },
        { name: 'link', title: 'Lenke', type: 'string' },
      ],
    }),
    defineField({
      name: 'style',
      title: 'Stil',
      type: 'string',
      options: {
        list: [
          { title: 'Standard (lys)', value: 'default' },
          { title: 'Mørk (navy)', value: 'dark' },
          { title: 'Brand (teal)', value: 'brand' },
        ],
      },
      initialValue: 'default',
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { title: `CTA: ${title || 'Uten tittel'}` }
    },
  },
})
