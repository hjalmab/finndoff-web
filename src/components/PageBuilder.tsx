import type { Section } from '@/types/sanity'
import { Hero } from './modules/Hero'
import { CtaSection } from './modules/CtaSection'
import { FeatureGrid } from './modules/FeatureGrid'
import { PricingTable } from './modules/PricingTable'
import { TrustBar } from './modules/TrustBar'
import { Testimonial } from './modules/Testimonial'
import { FaqAccordion } from './modules/FaqAccordion'
import { VideoEmbed } from './modules/VideoEmbed'
import { Timeline } from './modules/Timeline'
import { PartnerShowcase } from './modules/PartnerShowcase'
import { ComparisonTable } from './modules/ComparisonTable'
import { TextSection } from './modules/TextSection'

const componentMap: Record<string, React.ComponentType<{ section: any }>> = {
  hero: Hero,
  ctaSection: CtaSection,
  featureGrid: FeatureGrid,
  pricingTable: PricingTable,
  trustBar: TrustBar,
  testimonial: Testimonial,
  faqAccordion: FaqAccordion,
  videoEmbed: VideoEmbed,
  timeline: Timeline,
  partnerShowcase: PartnerShowcase,
  comparisonTable: ComparisonTable,
  textSection: TextSection,
}

export function PageBuilder({ sections }: { sections?: Section[] }) {
  if (!sections?.length) return null

  return (
    <>
      {sections.map((section) => {
        const Component = componentMap[section._type]
        if (!Component) return null
        return <Component key={section._key} section={section} />
      })}
    </>
  )
}
