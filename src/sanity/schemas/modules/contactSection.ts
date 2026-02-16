import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactSection',
  title: 'Kontaktseksjon',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Undertittel',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'email',
      title: 'E-post',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Telefon',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'hubspotPortalId',
      title: 'HubSpot Portal ID',
      type: 'string',
    }),
    defineField({
      name: 'hubspotFormId',
      title: 'HubSpot Form ID',
      type: 'string',
    }),
    defineField({
      name: 'contactPersons',
      title: 'Kontaktpersoner',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Navn', type: 'string' }),
            defineField({ name: 'role', title: 'Rolle', type: 'string' }),
            defineField({ name: 'phone', title: 'Telefon', type: 'string' }),
            defineField({ name: 'email', title: 'E-post', type: 'string' }),
            defineField({
              name: 'bookingLink',
              title: 'Bookinglenke',
              type: 'url',
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'role' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { title: `Kontakt: ${title || 'Uten tittel'}` }
    },
  },
})
