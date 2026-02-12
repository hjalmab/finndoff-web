import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'trustBar',
  title: 'Tillitsbar (logoer)',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel (valgfri)',
      type: 'string',
    }),
    defineField({
      name: 'logos',
      title: 'Logoer',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Bedriftsnavn', type: 'string', validation: (Rule: any) => Rule.required() },
            { name: 'logo', title: 'Logo', type: 'image' },
            { name: 'link', title: 'Lenke (valgfri)', type: 'url' },
          ],
          preview: {
            select: { title: 'name', media: 'logo' },
          },
        },
      ],
    }),
    defineField({
      name: 'style',
      title: 'Stil',
      type: 'string',
      options: {
        list: [
          { title: 'Grid', value: 'grid' },
          { title: 'Scrollende', value: 'scrolling' },
        ],
      },
      initialValue: 'scrolling',
    }),
  ],
  preview: {
    select: { title: 'title', logos: 'logos' },
    prepare({ title, logos }) {
      const count = logos?.length || 0
      return { title: `Logoer: ${title || 'Uten tittel'}`, subtitle: `${count} logoer` }
    },
  },
})
