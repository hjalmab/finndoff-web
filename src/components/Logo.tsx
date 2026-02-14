import Link from 'next/link'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`font-display text-2xl font-bold ${className}`}>
      Finndoff
    </Link>
  )
}
