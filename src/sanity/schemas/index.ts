// Document schemas
import page from './documents/page'
import blogPost from './documents/blogPost'
import product from './documents/product'
import person from './documents/person'
import partner from './documents/partner'
import faq from './documents/faq'
import customerCase from './documents/customerCase'
import siteSettings from './documents/siteSettings'
import legalDocument from './documents/legalDocument'

// Page builder modules
import hero from './modules/hero'
import featureGrid from './modules/featureGrid'
import pricingTable from './modules/pricingTable'
import trustBar from './modules/trustBar'
import testimonial from './modules/testimonial'
import videoEmbed from './modules/videoEmbed'
import ctaSection from './modules/ctaSection'
import faqAccordion from './modules/faqAccordion'
import timeline from './modules/timeline'
import partnerShowcase from './modules/partnerShowcase'
import comparisonTable from './modules/comparisonTable'
import textSection from './modules/textSection'
import pricingCalculator from './modules/pricingCalculator'
import teamGrid from './modules/teamGrid'
import contactSection from './modules/contactSection'

export const schemaTypes = [
  // Documents
  page,
  blogPost,
  product,
  person,
  partner,
  faq,
  customerCase,
  siteSettings,
  legalDocument,

  // Modules
  hero,
  featureGrid,
  pricingTable,
  trustBar,
  testimonial,
  videoEmbed,
  ctaSection,
  faqAccordion,
  timeline,
  partnerShowcase,
  comparisonTable,
  textSection,
  pricingCalculator,
  teamGrid,
  contactSection,
]
