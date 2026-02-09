import { defineField, defineType } from 'sanity'

const heroSection = {
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    { name: 'headline', title: 'Headline', type: 'string' },
    { name: 'subheadline', title: 'Subheadline', type: 'text', rows: 2 },
    { name: 'ctaText', title: 'CTA Text', type: 'string' },
    { name: 'ctaLink', title: 'CTA Link', type: 'string' },
    { name: 'backgroundImage', title: 'Background Image', type: 'image' },
  ],
  preview: {
    select: { title: 'headline' },
    prepare(selection: Record<string, unknown>) { return { title: `Hero: ${selection.title || 'Untitled'}` } },
  },
}

const featuresSection = {
  name: 'featuresSection',
  title: 'Features Section',
  type: 'object',
  fields: [
    { name: 'title', title: 'Section Title', type: 'string' },
    { name: 'subtitle', title: 'Subtitle', type: 'text', rows: 2 },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
            { name: 'icon', title: 'Icon', type: 'string' },
          ],
        },
      ],
    },
  ],
  preview: {
    select: { title: 'title' },
    prepare(selection: Record<string, unknown>) { return { title: `Features: ${selection.title || 'Untitled'}` } },
  },
}

const ctaSection = {
  name: 'ctaSection',
  title: 'CTA Section',
  type: 'object',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'description', title: 'Description', type: 'text', rows: 2 },
    { name: 'buttonText', title: 'Button Text', type: 'string' },
    { name: 'buttonLink', title: 'Button Link', type: 'string' },
    {
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Dark Background', value: 'dark' },
          { title: 'Brand Background', value: 'brand' },
        ],
      },
      initialValue: 'default',
    },
  ],
  preview: {
    select: { title: 'title' },
    prepare(selection: Record<string, unknown>) { return { title: `CTA: ${selection.title || 'Untitled'}` } },
  },
}

const faqSection = {
  name: 'faqSection',
  title: 'FAQ Section',
  type: 'object',
  fields: [
    { name: 'title', title: 'Section Title', type: 'string' },
    {
      name: 'questions',
      title: 'Questions & Answers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'string' },
            { name: 'answer', title: 'Answer', type: 'text', rows: 3 },
          ],
        },
      ],
    },
  ],
  preview: {
    select: { title: 'title' },
    prepare(selection: Record<string, unknown>) { return { title: `FAQ: ${selection.title || 'Untitled'}` } },
  },
}

const textSection = {
  name: 'textSection',
  title: 'Text Section',
  type: 'object',
  fields: [
    { name: 'title', title: 'Title (optional)', type: 'string' },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
      ],
    },
  ],
  preview: {
    select: { title: 'title' },
    prepare(selection: Record<string, unknown>) { return { title: `Text: ${selection.title || 'Untitled'}` } },
  },
}

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        heroSection,
        featuresSection,
        ctaSection,
        faqSection,
        textSection,
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({ title, slug }) {
      return { title, subtitle: `/${slug || ''}` }
    },
  },
})
