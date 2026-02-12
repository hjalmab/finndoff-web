import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'videoEmbed',
  title: 'Video',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel (valgfri)',
      type: 'string',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video-URL (YouTube/Vimeo)',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Miniatyrbilde (valgfri)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'caption',
      title: 'Bildetekst',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'title', url: 'videoUrl' },
    prepare({ title, url }) {
      return { title: `Video: ${title || 'Uten tittel'}`, subtitle: url }
    },
  },
})
