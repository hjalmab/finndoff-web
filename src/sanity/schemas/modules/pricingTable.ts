import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pricingTable',
  title: 'Pristabell',
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
      name: 'plans',
      title: 'Prisplaner',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Plannavn', type: 'string', validation: (Rule: any) => Rule.required() },
            { name: 'price', title: 'Pris (kr/mnd)', type: 'number' },
            { name: 'priceLabel', title: 'Prisetkett (f.eks. "Etter avtale")', type: 'string' },
            { name: 'description', title: 'Kort beskrivelse', type: 'text', rows: 2 },
            { name: 'isAddon', title: 'Er tillegg (ikke selvstendig)', type: 'boolean', initialValue: false },
            { name: 'highlighted', title: 'Fremhevet', type: 'boolean', initialValue: false },
            {
              name: 'features',
              title: 'Inkluderte funksjoner',
              type: 'array',
              of: [{ type: 'string' }],
            },
            { name: 'ctaText', title: 'CTA-tekst', type: 'string' },
            { name: 'ctaLink', title: 'CTA-lenke', type: 'string' },
          ],
          preview: {
            select: { name: 'name', price: 'price', priceLabel: 'priceLabel' },
            prepare({ name, price, priceLabel }: { name?: string; price?: number; priceLabel?: string }) {
              return {
                title: name || 'Uten navn',
                subtitle: priceLabel || (price ? `${price} kr/mnd` : undefined),
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', plans: 'plans' },
    prepare({ title, plans }) {
      const count = plans?.length || 0
      return { title: `Priser: ${title || 'Uten tittel'}`, subtitle: `${count} planer` }
    },
  },
})
