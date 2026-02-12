import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'partner',
  title: 'Partner',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Partnernavn',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL-slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'description',
      title: 'Beskrivelse',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'website',
      title: 'Nettside',
      type: 'url',
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Bransjeorganisasjon', value: 'bransjeorganisasjon' },
          { title: 'Konsulentpartner', value: 'konsulentpartner' },
          { title: 'Annet', value: 'annet' },
        ],
      },
    }),
    defineField({
      name: 'referralCode',
      title: 'Referral-kode (for UTM)',
      type: 'string',
    }),
    defineField({
      name: 'discountDescription',
      title: 'Rabattbeskrivelse',
      type: 'string',
    }),
    defineField({
      name: 'sections',
      title: 'Landingsside-seksjoner',
      type: 'array',
      of: [
        { type: 'hero' },
        { type: 'featureGrid' },
        { type: 'trustBar' },
        { type: 'testimonial' },
        { type: 'ctaSection' },
        { type: 'faqAccordion' },
        { type: 'textSection' },
      ],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'type', media: 'logo' },
  },
})
