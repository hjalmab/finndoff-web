import Link from 'next/link'
import Image from 'next/image'

export function Logo({ logoUrl, variant = 'default' }: { logoUrl?: string | null; variant?: 'default' | 'dark' }) {
  return (
    <Link href="/" className="flex items-center">
      {logoUrl ? (
        <Image
          src={logoUrl}
          alt="Finndoff"
          width={140}
          height={40}
          className="h-8 w-auto"
          unoptimized
          priority
        />
      ) : (
        <span className={`font-display text-2xl font-bold ${variant === 'dark' ? 'text-white' : 'text-primary-500'}`}>
          Finndoff
        </span>
      )}
    </Link>
  )
}
