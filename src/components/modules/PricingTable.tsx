import type { PricingTableSection } from '@/types/sanity'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Button } from '@/components/ui/Button'
import { Check } from 'lucide-react'

export function PricingTable({ section }: { section: PricingTableSection }) {
  return (
    <SectionWrapper>
      {(section.title || section.subtitle) && (
        <div className="mb-12 text-center">
          {section.title && (
            <h2 className="font-display text-3xl font-bold lg:text-4xl">
              {section.title}
            </h2>
          )}
          {section.subtitle && (
            <p className="mt-4 text-lg text-navy-600">{section.subtitle}</p>
          )}
        </div>
      )}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {section.plans?.map((plan) => (
          <div
            key={plan._key}
            className={`relative flex flex-col rounded-2xl border-2 p-8 ${
              plan.highlighted
                ? 'border-primary-500 shadow-xl'
                : 'border-navy-100'
            }`}
          >
            {plan.isAddon && (
              <span className="mb-4 inline-block w-fit rounded-full bg-accent-100 px-3 py-1 text-xs font-semibold text-accent-800">
                Tillegg
              </span>
            )}
            <h3 className="font-display text-xl font-bold">{plan.name}</h3>
            <div className="mt-4">
              {plan.price != null ? (
                <p className="font-display text-3xl font-bold text-primary-500">
                  {plan.price} <span className="text-base font-normal text-navy-500">kr/mnd</span>
                </p>
              ) : plan.priceLabel ? (
                <p className="font-display text-xl font-semibold text-primary-500">
                  {plan.priceLabel}
                </p>
              ) : null}
            </div>
            {plan.description && (
              <p className="mt-3 text-sm text-navy-600">{plan.description}</p>
            )}
            {plan.features && plan.features.length > 0 && (
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
            {plan.ctaText && (
              <div className="mt-8">
                <Button
                  href={plan.ctaLink}
                  variant={plan.highlighted ? 'primary' : 'outline'}
                  className="w-full text-center"
                >
                  {plan.ctaText}
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
