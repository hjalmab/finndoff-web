import type { HeroSection } from '@/types/sanity'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Button } from '@/components/ui/Button'
import { SanityImage } from '@/components/ui/SanityImage'
import { DeviceFrame } from '@/components/ui/DeviceFrame'
import { HeroSearchBar } from './HeroSearchBar'

export function Hero({ section }: { section: HeroSection }) {
  return (
    <SectionWrapper style={section.style}>
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <h1 className="font-display text-4xl font-bold leading-tight lg:text-5xl xl:text-6xl">
            {section.headline}
          </h1>
          {section.subheadline && (
            <p className="mt-6 text-lg leading-relaxed opacity-80 lg:text-xl">
              {section.subheadline}
            </p>
          )}
          {section.showSearchBar ? (
            <HeroSearchBar />
          ) : (
            (section.primaryCta?.text || section.secondaryCta?.text) && (
              <div className="mt-8 flex flex-wrap gap-4">
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
            )
          )}
          {section.stats && section.stats.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-8 border-t border-navy-100 pt-8">
              {section.stats.map((stat, i) => (
                <div key={i}>
                  <p className="font-display text-3xl font-bold text-primary-600">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-sm text-navy-500">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        {section.image?.asset && (
          <DeviceFrame type={section.deviceFrame} style={section.style}>
            <SanityImage
              image={section.image}
              width={800}
              height={600}
              className="h-full w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </DeviceFrame>
        )}
      </div>
    </SectionWrapper>
  )
}
