import type { DeviceFrameType, SectionStyle } from '@/types/sanity'

interface DeviceFrameProps {
  type?: DeviceFrameType
  style?: SectionStyle
  children: React.ReactNode
}

function getFrameColors(style?: SectionStyle) {
  switch (style) {
    case 'dark':
      return {
        bezel: 'bg-navy-600',
        shadow: 'shadow-[0_8px_30px_rgba(0,0,0,0.4)]',
        stand: 'bg-navy-600',
        standBase: 'bg-navy-600',
        notch: 'bg-navy-500',
        homeIndicator: 'bg-navy-400',
      }
    case 'brand':
      return {
        bezel: 'bg-navy-800',
        shadow: 'shadow-[0_8px_30px_rgba(0,132,137,0.3)]',
        stand: 'bg-navy-800',
        standBase: 'bg-navy-800',
        notch: 'bg-navy-700',
        homeIndicator: 'bg-navy-600',
      }
    default:
      return {
        bezel: 'bg-navy-800',
        shadow: 'shadow-[0_8px_30px_rgba(11,35,51,0.15)]',
        stand: 'bg-navy-800',
        standBase: 'bg-navy-700',
        notch: 'bg-navy-700',
        homeIndicator: 'bg-navy-600',
      }
  }
}

function LaptopFrame({
  colors,
  children,
}: {
  colors: ReturnType<typeof getFrameColors>
  children: React.ReactNode
}) {
  return (
    <div className="w-full">
      {/* Screen */}
      <div className={`${colors.bezel} ${colors.shadow} rounded-t-xl p-2`}>
        <div className="aspect-[16/10] overflow-hidden rounded-sm">
          {children}
        </div>
      </div>
      {/* Keyboard base */}
      <div className={`${colors.bezel} mx-auto h-3 w-[104%] -translate-x-[2%] rounded-b-xl`}>
        <div className="mx-auto h-[2px] w-16 translate-y-1 rounded-full bg-navy-500/50" />
      </div>
    </div>
  )
}

function DesktopFrame({
  colors,
  children,
}: {
  colors: ReturnType<typeof getFrameColors>
  children: React.ReactNode
}) {
  return (
    <div className="w-full">
      {/* Screen */}
      <div className={`${colors.bezel} ${colors.shadow} rounded-xl p-3`}>
        <div className="aspect-[16/9] overflow-hidden rounded-sm">
          {children}
        </div>
      </div>
      {/* Stand neck */}
      <div className={`${colors.stand} mx-auto h-6 w-12`} />
      {/* Stand base */}
      <div className={`${colors.standBase} mx-auto h-2 w-28 rounded-b-lg`} />
    </div>
  )
}

function TabletFrame({
  colors,
  children,
}: {
  colors: ReturnType<typeof getFrameColors>
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto max-w-lg">
      <div className={`${colors.bezel} ${colors.shadow} rounded-2xl p-3`}>
        <div className="aspect-[4/3] overflow-hidden rounded-lg">
          {children}
        </div>
      </div>
    </div>
  )
}

function PhoneFrame({
  colors,
  children,
}: {
  colors: ReturnType<typeof getFrameColors>
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto max-w-[280px]">
      <div className={`${colors.bezel} ${colors.shadow} rounded-[2rem] p-3`}>
        {/* Notch */}
        <div className="flex justify-center pb-2">
          <div className={`${colors.notch} h-5 w-24 rounded-full`} />
        </div>
        {/* Screen */}
        <div className="aspect-[9/19.5] overflow-hidden rounded-xl">
          {children}
        </div>
        {/* Home indicator */}
        <div className="flex justify-center pt-2">
          <div className={`${colors.homeIndicator} h-1 w-24 rounded-full`} />
        </div>
      </div>
    </div>
  )
}

export function DeviceFrame({ type, style, children }: DeviceFrameProps) {
  if (!type || type === 'none') {
    return <div className="overflow-hidden rounded-2xl">{children}</div>
  }

  const colors = getFrameColors(style)

  switch (type) {
    case 'laptop':
      return <LaptopFrame colors={colors}>{children}</LaptopFrame>
    case 'desktop':
      return <DesktopFrame colors={colors}>{children}</DesktopFrame>
    case 'tablet':
      return <TabletFrame colors={colors}>{children}</TabletFrame>
    case 'phone':
      return <PhoneFrame colors={colors}>{children}</PhoneFrame>
    default:
      return <div className="overflow-hidden rounded-2xl">{children}</div>
  }
}
