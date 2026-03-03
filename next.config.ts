import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async redirects() {
    return [
      // ── WIX page redirects (paths that changed) ───────────────
      { source: '/anbudsvarsling', destination: '/varsling', permanent: true },
      { source: '/kompetansenettverk', destination: '/konsulent', permanent: true },
      { source: '/kontakt', destination: '/om-oss#kontakt', permanent: true },

      // ── Blogg → Nyheter rename ───────────────────────────────
      { source: '/blogg', destination: '/nyheter', permanent: true },
      { source: '/blogg/:slug', destination: '/nyheter/:slug', permanent: true },

      // ── WIX blog-redirects (auto-generert) ──────────────────
      { source: '/nyheter/finndoff-og-mef-nord%3A-status%2C-kundehistorier-og-et-nytt-ki-initiativ', destination: '/nyheter/finndoff-og-mef-nord-status-kundehistorier-og-et-nytt-ki-initiativ-finndoff-no', permanent: true },
      { source: '/nyheter/finndoff-inng%C3%A5r-samarbeid-med-neso%E2%80%94skreddersydd-anbudsvarsling-til-medlemspris', destination: '/nyheter/finndoff-inngar-samarbeid-med-neso-skreddersydd-anbudsvarsling-til-medlemspris-finndoff-no', permanent: true },
      { source: '/nyheter/en-kundehistorie-om-lidenskap-og-dr%C3%B8mmer', destination: '/nyheter/en-kundehistorie-om-lidenskap-og-drommer-finndoff-no', permanent: true },
      { source: '/nyheter/kunstig-intelligens%3A-n%C3%B8kkelen-til-%C3%A5-mestre-offentlige-anskaffelser%3F', destination: '/nyheter/kunstig-intelligens-nokkelen-til-a-mestre-offentlige-anskaffelser-finndoff-no', permanent: true },
      { source: '/nyheter/oppsummering-fra-webinar%3A-anbudshjelp-ai-og-hvordan-kunstig-intelligens-effektiviserer-ditt-anbudsarbeid', destination: '/nyheter/oppsummering-fra-webinar-anbudshjelp-ai-og-hvordan-kunstig-intelligens-effektiviserer-ditt-anbud', permanent: true },
      { source: '/nyheter/alt-fra-webinaret-%22finndoff-anbudshjelp-ai%22%3A-menneske-%2B-maskin-%3D-flere-vinnende-anbud', destination: '/nyheter/alt-fra-webinaret-finndoff-anbudshjelp-ai-menneske-maskin-flere-vinnende-anbud-finndoff-no', permanent: true },
      { source: '/nyheter/finndoff-gj%C3%B8r-det-litt-mer-g%C3%B8y-%C3%A5-v%C3%A6re-arkitekt', destination: '/nyheter/finndoff-gjor-det-litt-mer-goy-a-vaere-arkitekt-finndoff-no', permanent: true },
      { source: '/nyheter/f%C3%B8lg-oppdragsgiver-f%C3%A5-varsel-om-alle-nye-anbud-fra-dine-viktigste-kilder', destination: '/nyheter/folg-oppdragsgiver-fa-varsel-om-alle-nye-anbud-fra-dine-viktigste-kilder-finndoff-no', permanent: true },
      { source: '/nyheter/godt-nytt-%C3%A5r!', destination: '/nyheter/godt-nytt-ar-finndoff-no', permanent: true },
      { source: '/nyheter/oppdag-finndoff-%E2%80%93-din-neste-stopp-for-anbudsvarslinger-av-doffinkunngj%C3%B8ringer!', destination: '/nyheter/oppdag-finndoff-din-neste-stopp-for-anbudsvarslinger-av-doffinkunngjoringer-finndoff-no', permanent: true },
      { source: '/nyheter/finndoff-utvider-teamet', destination: '/nyheter/finndoff-utvider-teamet-send-inn-jobbsoknad-finndoff-no', permanent: true },
      { source: '/nyheter/ki-oppsummering-gj%C3%B8r-anbud-enklere-og-mer-oversiktlig', destination: '/nyheter/ki-oppsummering-gjor-anbud-enklere-og-mer-oversiktlig-finndoff-no', permanent: true },
      { source: '/nyheter/finndoff-lanserer-offentlige-%C3%B8konomiplaner-med-investeringer', destination: '/nyheter/finndoff-lanserer-offentlige-okonomiplaner-med-investeringer-finndoff-no', permanent: true },
      { source: '/nyheter/finndoff-bare-funker-for-nesna-maskinstasjon', destination: '/nyheter/finndoff-bare-funker-for-nesna-maskinstasjon-finndoff-no', permanent: true },
      { source: '/nyheter/partnerskap-med-maskinentrepren%C3%B8renes-forbund-(mef)-nord', destination: '/nyheter/partnerskap-med-maskinentreprenorenes-forbund-mef-nord-finndoff-no', permanent: true },
      { source: '/nyheter/derfor-er-finndoff-s%C3%A5-viktig-for-maskinentrepren%C3%B8rer-i-nord-norge.', destination: '/nyheter/derfor-er-finndoff-sa-viktig-for-maskinentreprenorer-i-nord-norge-finndoff-no', permanent: true },
      { source: '/nyheter/spennende-nyheter-fra-finndoff!', destination: '/nyheter/spennende-nyheter-fra-finndoff-finndoff-no', permanent: true },
      { source: '/nyheter/finndoff-er-en-viktig-brikke-i-et-godt-smurt-maskineri%2C-men-kan-vi-ta-det-ett-steg-lenger%3F-', destination: '/nyheter/finndoff-er-en-viktig-brikke-i-et-godt-smurt-maskineri-men-kan-vi-ta-det-ett-steg-lenger-finndof', permanent: true },
      { source: '/nyheter/%F0%9F%9B%A0-snart-lanserer-vi-anbudshjelp-%E2%80%93-en-ny-m%C3%A5te-%C3%A5-%C2%ABfinne-og-vinne%C2%BB-ditt-neste-oppdrag', destination: '/nyheter/snart-lanserer-vi-anbudshjelp-en-ny-mate-a-finne-og-vinne-ditt-neste-oppdrag-finndoff-no', permanent: true },
      { source: '/nyheter/slik-kan-bedrifter-spare-penger-p%C3%A5-offentlige-anbud', destination: '/nyheter/slik-kan-bedrifter-spare-penger-pa-offentlige-anbud-finndoff-no', permanent: true },
      { source: '/nyheter/finn-de-riktige-anbudene-for-deg-med-finndoffs-avanserte-s%C3%B8kemotor', destination: '/nyheter/finn-de-riktige-anbudene-for-deg-med-finndoffs-avanserte-sokemotor-finndoff-no', permanent: true },
      { source: '/nyheter/finndoff-%26-din-anbudshjelp', destination: '/nyheter/finndoff-din-anbudshjelp-finndoff-no', permanent: true },
      { source: '/nyheter/offentlige-anbud---nyttig-%C3%A5-vite-for-bedrifter', destination: '/nyheter/offentlige-anbud-nyttig-a-vite-for-bedrifter-finndoff-no', permanent: true },
      { source: '/nyheter/praktisk-anbudshjelp-%E2%80%93-n%C3%A5-kan-vi-hjelpe-deg-med-mye-mer-enn-varsling', destination: '/nyheter/fra-varsling-til-vinnende-anbud-nar-mennesker-og-teknologi-jobber-sammen-finndoff-no', permanent: true },
      { source: '/nyheter/man-trenger-ikke-mercell-abonnement-for-%C3%A5-levere-anbud!', destination: '/nyheter/man-trenger-ikke-mercell-abonnement-for-a-levere-anbud-finndoff-no', permanent: true },
      { source: '/nyheter/finndoff-fremtidige-anbud-s%C3%B8k-i-over-400-offentlige-investeringsplaner', destination: '/nyheter/finndoff-fremtidige-anbud-sok-i-naer-400-offentlige-investeringsplaner-finndoff-no', permanent: true },
      { source: '/nyheter/ny-tjeneste-for-smartere-innkj%C3%B8p-og-leverand%C3%B8rs%C3%B8k', destination: '/nyheter/finndoff-leverandormatching-ny-tjeneste-for-smartere-samarbeid-finndoff-no', permanent: true },
      { source: '/nyheter/tips-for-deltakelse-i-offentlige-anbudskonkurranser', destination: '/nyheter/tips-for-deltakelse-i-offentlige-anbudskonkurranser-finndoff-no', permanent: true },
      { source: '/nyheter/samarbeidsavtale-med-byggmesterforbundet', destination: '/nyheter/samarbeidsavtale-med-byggmesterforbundet-finndoff-no', permanent: true },
      { source: '/nyheter/trekvart-billion-kroner', destination: '/nyheter/trekvart-billion-kroner-finndoff-no', permanent: true },
      // ── END WIX blog-redirects ─────────────────────────────

    ];
  },
};

export default nextConfig;
