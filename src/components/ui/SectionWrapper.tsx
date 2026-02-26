import type { SectionStyle } from '@/types/sanity'

const styleMap: Record<SectionStyle, string> = {
  default: 'text-navy-900',
  dark: 'bg-navy-900 text-white',
  brand: 'bg-primary-500 text-white',
}

export function SectionWrapper({
  children,
  style = 'default',
  className = '',
}: {
  children: React.ReactNode
  style?: SectionStyle
  className?: string
}) {
  return (
    <section className={`${styleMap[style]} py-16 lg:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-6">{children}</div>
    </section>
  )
}
