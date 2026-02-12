export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <h1 className="font-display text-5xl font-bold text-navy-900">
        Finndoff
      </h1>
      <p className="text-lg text-navy-600">
        Menneske + Maskin = Bedre anbudsresultater
      </p>

      {/* Color palette preview */}
      <div className="flex flex-col gap-6">
        <div className="flex gap-2">
          <div className="h-12 w-12 rounded-lg bg-primary-50" title="primary-50" />
          <div className="h-12 w-12 rounded-lg bg-primary-100" title="primary-100" />
          <div className="h-12 w-12 rounded-lg bg-primary-200" title="primary-200" />
          <div className="h-12 w-12 rounded-lg bg-primary-300" title="primary-300" />
          <div className="h-12 w-12 rounded-lg bg-primary-400" title="primary-400" />
          <div className="h-12 w-12 rounded-lg bg-primary-500" title="primary-500" />
          <div className="h-12 w-12 rounded-lg bg-primary-600" title="primary-600" />
          <div className="h-12 w-12 rounded-lg bg-primary-700" title="primary-700" />
          <div className="h-12 w-12 rounded-lg bg-primary-800" title="primary-800" />
          <div className="h-12 w-12 rounded-lg bg-primary-900" title="primary-900" />
        </div>
        <div className="flex gap-2">
          <div className="h-12 w-12 rounded-lg bg-accent-50" title="accent-50" />
          <div className="h-12 w-12 rounded-lg bg-accent-100" title="accent-100" />
          <div className="h-12 w-12 rounded-lg bg-accent-200" title="accent-200" />
          <div className="h-12 w-12 rounded-lg bg-accent-300" title="accent-300" />
          <div className="h-12 w-12 rounded-lg bg-accent-400" title="accent-400" />
          <div className="h-12 w-12 rounded-lg bg-accent-500" title="accent-500" />
          <div className="h-12 w-12 rounded-lg bg-accent-600" title="accent-600" />
          <div className="h-12 w-12 rounded-lg bg-accent-700" title="accent-700" />
          <div className="h-12 w-12 rounded-lg bg-accent-800" title="accent-800" />
          <div className="h-12 w-12 rounded-lg bg-accent-900" title="accent-900" />
        </div>
        <div className="flex gap-2">
          <div className="h-12 w-12 rounded-lg bg-navy-50" title="navy-50" />
          <div className="h-12 w-12 rounded-lg bg-navy-100" title="navy-100" />
          <div className="h-12 w-12 rounded-lg bg-navy-200" title="navy-200" />
          <div className="h-12 w-12 rounded-lg bg-navy-300" title="navy-300" />
          <div className="h-12 w-12 rounded-lg bg-navy-400" title="navy-400" />
          <div className="h-12 w-12 rounded-lg bg-navy-500" title="navy-500" />
          <div className="h-12 w-12 rounded-lg bg-navy-600" title="navy-600" />
          <div className="h-12 w-12 rounded-lg bg-navy-700" title="navy-700" />
          <div className="h-12 w-12 rounded-lg bg-navy-800" title="navy-800" />
          <div className="h-12 w-12 rounded-lg bg-navy-900" title="navy-900" />
        </div>

        {/* CTA preview */}
        <div className="flex items-center gap-4">
          <button className="rounded-lg bg-accent-500 px-6 py-3 font-display font-semibold text-navy-900 hover:bg-accent-600">
            Prøv gratis
          </button>
          <button className="rounded-lg border-2 border-primary-500 px-6 py-3 font-display font-semibold text-primary-500 hover:bg-primary-50">
            Book en demo
          </button>
          <a href="#" className="font-medium text-primary-500 underline hover:text-primary-600">
            Les mer
          </a>
        </div>

        {/* Font preview */}
        <div className="flex flex-col gap-2">
          <p className="font-display text-2xl font-bold text-navy-900">Work Sans (display)</p>
          <p className="text-base text-navy-700">Roboto (body) — Finndoff hjelper deg med å finne offentlige anbud.</p>
          <p className="text-sm font-light text-navy-500">Roboto light 300 — sekundær tekst</p>
        </div>

        {/* Status colors */}
        <div className="flex gap-2">
          <div className="h-8 w-8 rounded-full bg-success" title="success" />
          <div className="h-8 w-8 rounded-full bg-warning" title="warning" />
          <div className="h-8 w-8 rounded-full bg-error" title="error" />
        </div>
      </div>
    </main>
  );
}
