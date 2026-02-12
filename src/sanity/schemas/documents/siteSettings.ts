import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Nettstedsinnstillinger',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Nettstedsnavn',
      type: 'string',
      initialValue: 'Finndoff',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Nettstedsbeskrivelse',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'logoDark',
      title: 'Logo (mørk bakgrunn)',
      type: 'image',
    }),
    defineField({
      name: 'primaryCta',
      title: 'Global primær CTA',
      type: 'object',
      fields: [
        { name: 'text', title: 'Tekst', type: 'string', initialValue: 'Prøv gratis' },
        { name: 'link', title: 'Lenke', type: 'string', initialValue: 'https://app.finndoff.no/register' },
      ],
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Global sekundær CTA',
      type: 'object',
      fields: [
        { name: 'text', title: 'Tekst', type: 'string', initialValue: 'Book en demo' },
        { name: 'link', title: 'Lenke', type: 'string' },
      ],
    }),
    defineField({
      name: 'contactEmail',
      title: 'Kontakt e-post',
      type: 'string',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Kontakt telefon',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'orgNumber',
      title: 'Org.nr.',
      type: 'string',
      initialValue: '927 436 442',
    }),
    defineField({
      name: 'socialMedia',
      title: 'Sosiale medier',
      type: 'object',
      fields: [
        { name: 'linkedin', title: 'LinkedIn', type: 'url' },
        { name: 'facebook', title: 'Facebook', type: 'url' },
      ],
    }),
    defineField({
      name: 'hubSpotPortalId',
      title: 'HubSpot Portal ID',
      type: 'string',
      initialValue: '25684435',
    }),
    defineField({
      name: 'googleAnalyticsId',
      title: 'Google Analytics ID',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Nettstedsinnstillinger' }
    },
  },
})
