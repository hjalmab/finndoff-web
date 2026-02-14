import Link from 'next/link'
import { Logo } from './Logo'

const productLinks = [
  { label: 'Varsling', href: '/varsling' },
  { label: 'Innsikt', href: '/innsikt' },
  { label: 'Anbudshjelp AI', href: '/anbudshjelp-ai' },
  { label: 'Konsulent', href: '/konsulent' },
  { label: 'Priser', href: '/priser' },
]

const companyLinks = [
  { label: 'Om oss', href: '/om-oss' },
  { label: 'Blogg', href: '/blogg' },
  { label: 'Personvern', href: '/personvern' },
  { label: 'Kontakt', href: '/kontakt' },
]

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand column */}
          <div className="md:col-span-2">
            <Logo className="text-white" />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-navy-400">
              Menneske + Maskin = Bedre anbudsresultater
            </p>
            <p className="mt-4 text-sm text-navy-400">
              Finndoff AS &middot; Org. 927 436 442
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-navy-300">
              Produkter
            </h3>
            <ul className="mt-4 space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-navy-300">
              Selskap
            </h3>
            <ul className="mt-4 space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-navy-700 pt-8 sm:flex-row">
          <p className="text-sm text-navy-400">
            &copy; {new Date().getFullYear()} Finndoff AS. Alle rettigheter reservert.
          </p>
          <a
            href="https://www.linkedin.com/company/finndoff"
            target="_blank"
            rel="noopener noreferrer"
            className="text-navy-400 transition-colors hover:text-white"
            aria-label="Finndoff på LinkedIn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
