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

    ];
  },
};

export default nextConfig;
