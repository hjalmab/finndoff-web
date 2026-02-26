import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Overskrift',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheadline',
      title: 'Undertekst',
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
      name: 'showSearchBar',
      title: 'Vis søkebar',
      description: 'Erstatter CTA-knappene med en søkebar for anbudssøk',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'image',
      title: 'Bilde',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Alt-tekst', type: 'string' },
      ],
    }),
    defineField({
      name: 'deviceFrame',
      title: 'Enhetsramme',
      description: 'Vis bildet i en enhetsramme (laptop, skjerm, nettbrett eller mobil)',
      type: 'string',
      options: {
        list: [
          { title: 'Ingen', value: 'none' },
          { title: 'Laptop', value: 'laptop' },
          { title: 'Skjerm', value: 'desktop' },
          { title: 'Nettbrett', value: 'tablet' },
          { title: 'Mobil', value: 'phone' },
        ],
      },
      initialValue: 'none',
      hidden: ({ parent }) => !parent?.image,
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
    select: { title: 'headline' },
    prepare({ title }) {
      return { title: `Hero: ${title || 'Uten tittel'}` }
    },
  },
})
