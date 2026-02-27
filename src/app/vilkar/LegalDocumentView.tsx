'use client'

import { useState } from 'react'
import { PortableTextRenderer } from '@/components/ui/PortableTextRenderer'
import type { LegalDocument } from '@/types/sanity'

type Lang = 'no' | 'en'

export function LegalDocumentView({ doc }: { doc: LegalDocument }) {
  const [lang, setLang] = useState<Lang>('no')

  const title = doc.title[lang] || doc.title.no
  const body = doc.body[lang] || doc.body.no

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-bold text-navy-900 sm:text-4xl">
          {title}
        </h1>
        <div className="flex shrink-0 overflow-hidden rounded-lg border border-navy-200">
          <button
            onClick={() => setLang('no')}
            className={`px-3 py-1.5 text-sm font-medium transition-colors ${
              lang === 'no'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-navy-600 hover:bg-navy-50'
            }`}
          >
            Norsk
          </button>
          <button
            onClick={() => setLang('en')}
            className={`px-3 py-1.5 text-sm font-medium transition-colors ${
              lang === 'en'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-navy-600 hover:bg-navy-50'
            }`}
          >
            English
          </button>
        </div>
      </div>

      {doc.lastUpdated && (
        <p className="mb-8 text-sm text-navy-500">
          {lang === 'no' ? 'Sist oppdatert' : 'Last updated'}:{' '}
          {new Date(doc.lastUpdated).toLocaleDateString(
            lang === 'no' ? 'no-NO' : 'en-GB',
            { day: 'numeric', month: 'long', year: 'numeric' }
          )}
        </p>
      )}

      <div className="prose-navy max-w-none text-navy-700">
        <PortableTextRenderer value={body} />
      </div>
    </section>
  )
}
