import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'featureGrid',
  title: 'Funksjonsgrid',
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
      title: 'Antall kolonner',
      type: 'number',
      options: { list: [2, 3, 4] },
      initialValue: 3,
    }),
    defineField({
      name: 'features',
      title: 'Funksjoner',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Tittel', type: 'string', validation: (Rule: any) => Rule.required() },
            { name: 'description', title: 'Beskrivelse', type: 'text', rows: 2 },
            { name: 'icon', title: 'Ikon (Lucide-navn)', type: 'string' },
            { name: 'link', title: 'Lenke (valgfri)', type: 'string' },
          ],
          preview: {
            select: { title: 'title', icon: 'icon' },
            prepare({ title, icon }: { title?: string; icon?: string }) {
              return { title: title || 'Uten tittel', subtitle: icon ? `Ikon: ${icon}` : undefined }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', features: 'features' },
    prepare({ title, features }) {
      const count = features?.length || 0
      return { title: `Funksjoner: ${title || 'Uten tittel'}`, subtitle: `${count} elementer` }
    },
  },
})
