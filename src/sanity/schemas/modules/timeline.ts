import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'timeline',
  title: 'Tidslinje',
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
      name: 'steps',
      title: 'Steg',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'stepNumber', title: 'Stegnummer', type: 'number' },
            { name: 'title', title: 'Tittel', type: 'string', validation: (Rule: any) => Rule.required() },
            { name: 'description', title: 'Beskrivelse', type: 'text', rows: 2 },
            { name: 'icon', title: 'Ikon (Lucide-navn)', type: 'string' },
            { name: 'duration', title: 'Varighet (f.eks. "3 dager")', type: 'string' },
          ],
          preview: {
            select: { step: 'stepNumber', title: 'title' },
            prepare({ step, title }: { step?: number; title?: string }) {
              return { title: `${step ? `Steg ${step}: ` : ''}${title || 'Uten tittel'}` }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', steps: 'steps' },
    prepare({ title, steps }) {
      const count = steps?.length || 0
      return { title: `Tidslinje: ${title || 'Uten tittel'}`, subtitle: `${count} steg` }
    },
  },
})
