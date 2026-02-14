import type { CtaSectionSection } from '@/types/sanity'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Button } from '@/components/ui/Button'

export function CtaSection({ section }: { section: CtaSectionSection }) {
  return (
    <SectionWrapper style={section.style}>
      <div className="mx-auto max-w-2xl text-center">
        {section.title && (
          <h2 className="font-display text-3xl font-bold lg:text-4xl">
            {section.title}
          </h2>
        )}
        {section.description && (
          <p className="mt-4 text-lg opacity-80">{section.description}</p>
        )}
        {(section.primaryCta?.text || section.secondaryCta?.text) && (
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {section.primaryCta?.text && (
              <Button href={section.primaryCta.link} variant="primary">
                {section.primaryCta.text}
              </Button>
            )}
            {section.secondaryCta?.text && (
              <Button
                href={section.secondaryCta.link}
                variant={section.style === 'default' ? 'outline' : 'ghost'}
              >
                {section.secondaryCta.text}
              </Button>
            )}
          </div>
        )}
      </div>
    </SectionWrapper>
  )
}
