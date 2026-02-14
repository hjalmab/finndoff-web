import type { TimelineSection } from '@/types/sanity'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { DynamicIcon } from '@/components/ui/DynamicIcon'

export function Timeline({ section }: { section: TimelineSection }) {
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
      <div className="relative mx-auto max-w-2xl">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary-200" />

        <div className="space-y-12">
          {section.steps?.map((step, index) => (
            <div key={step._key} className="relative flex gap-6 pl-0">
              {/* Circle */}
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-500 text-white">
                {step.icon ? (
                  <DynamicIcon name={step.icon} className="h-5 w-5" />
                ) : (
                  <span className="font-display text-sm font-bold">
                    {step.stepNumber ?? index + 1}
                  </span>
                )}
              </div>

              <div className="pt-1">
                <h3 className="font-display text-lg font-bold text-navy-900">
                  {step.title}
                </h3>
                {step.description && (
                  <p className="mt-2 text-navy-600">{step.description}</p>
                )}
                {step.duration && (
                  <p className="mt-2 text-sm font-medium text-primary-500">
                    {step.duration}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
