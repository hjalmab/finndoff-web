// Fetch page by slug (page builder)
export const pageQuery = `*[_type == "page" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  seoTitle,
  seoDescription,
  ogImage,
  sections[] {
    _type,
    _key,
    ...
  }
}`

// Fetch all blog posts
export const blogPostsQuery = `*[_type == "blogPost"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  category,
  author-> { name, image }
}`

// Fetch single blog post
export const blogPostQuery = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  body,
  mainImage,
  publishedAt,
  category,
  seoTitle,
  seoDescription,
  author-> { name, role, image }
}`

// Fetch product by slug
export const productQuery = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  subtitle,
  description,
  icon,
  price,
  priceLabel,
  isAddon,
  seoTitle,
  seoDescription,
  sections[] {
    _type,
    _key,
    ...,
    _type == "partnerShowcase" => {
      ...,
      partners[]-> { name, slug, logo, description, website }
    }
  }
}`

// Fetch all products
export const productsQuery = `*[_type == "product"] | order(title asc) {
  _id,
  title,
  slug,
  subtitle,
  description,
  icon,
  price,
  priceLabel,
  isAddon
}`

// Fetch site settings (singleton)
export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  siteName,
  siteDescription,
  logo,
  logoDark,
  primaryCta,
  secondaryCta,
  contactEmail,
  contactPhone,
  address,
  orgNumber,
  socialMedia,
  hubSpotPortalId,
  googleAnalyticsId
}`

// Fetch all FAQs, grouped by category
export const faqsQuery = `*[_type == "faq"] | order(category asc) {
  _id,
  question,
  answer,
  category,
  product-> { title, slug }
}`

// Fetch all partners
export const partnersQuery = `*[_type == "partner"] | order(name asc) {
  _id,
  name,
  slug,
  logo,
  description,
  website,
  type,
  referralCode
}`

// Fetch partner by slug (landing page)
export const partnerQuery = `*[_type == "partner" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  logo,
  description,
  website,
  type,
  referralCode,
  discountDescription,
  sections[] {
    _type,
    _key,
    ...
  }
}`

// Fetch all persons
export const personsQuery = `*[_type == "person"] | order(name asc) {
  _id,
  name,
  role,
  image,
  bio,
  email,
  phone,
  linkedIn,
  type
}`

// Fetch all customer cases
export const customerCasesQuery = `*[_type == "customerCase"] | order(title asc) {
  _id,
  title,
  slug,
  customer,
  quote,
  logo,
  image,
  industry,
  products[]-> { title, slug }
}`
