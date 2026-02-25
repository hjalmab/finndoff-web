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

      // ── 30 WIX blog slug redirects ────────────────────────────
      // All old posts under market.finndoff.no/nyheter/ → /blogg
      { source: '/nyheter/:slug', destination: '/blogg', permanent: true },
    ];
  },
};

export default nextConfig;
