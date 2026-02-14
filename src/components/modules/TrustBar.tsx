import type { TrustBarSection } from '@/types/sanity'
import { SanityImage } from '@/components/ui/SanityImage'

export function TrustBar({ section }: { section: TrustBarSection }) {
  const isScrolling = section.style === 'scrolling'

  return (
    <section className="bg-navy-50 py-12">
      <div className="mx-auto max-w-7xl px-6">
        {section.title && (
          <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-navy-500">
            {section.title}
          </p>
        )}
        {isScrolling ? (
          <div className="overflow-hidden">
            <div className="animate-scroll flex gap-12">
              {/* Double logos for seamless loop */}
              {[...(section.logos || []), ...(section.logos || [])].map(
                (logo, i) => (
                  <LogoItem key={`${logo._key}-${i}`} logo={logo} />
                ),
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {section.logos?.map((logo) => (
              <LogoItem key={logo._key} logo={logo} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function LogoItem({
  logo,
}: {
  logo: NonNullable<TrustBarSection['logos']>[number]
}) {
  const img = (
    <SanityImage
      image={logo.logo}
      width={160}
      height={60}
      className="h-10 w-auto shrink-0 object-contain grayscale transition-all hover:grayscale-0"
    />
  )

  if (logo.link) {
    return (
      <a href={logo.link} target="_blank" rel="noopener noreferrer" title={logo.name}>
        {img}
      </a>
    )
  }

  return <div title={logo.name}>{img}</div>
}
