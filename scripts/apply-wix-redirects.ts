/**
 * scripts/apply-wix-redirects.ts
 *
 * Leser scripts/wix-export/next-redirects.json og fletter dem inn i
 * next.config.ts automatisk — under seksjonen "WIX blog-redirects".
 *
 * Kjør: npx tsx scripts/apply-wix-redirects.ts
 * Forutsetter: scripts/wix-export/next-redirects.json finnes
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const REDIRECTS_FILE = join(process.cwd(), "scripts/wix-export/next-redirects.json");
const CONFIG_FILE = join(process.cwd(), "next.config.ts");

// Markør i next.config.ts der vi setter inn redirect-blokkene
const INSERT_MARKER = "// ── WIX blog-redirects (auto-generert) ──────────────────";
const SECTION_END_MARKER = "// ── END WIX blog-redirects ─────────────────────────────";

type Redirect = { source: string; destination: string; permanent: boolean };

function main() {
  if (!existsSync(REDIRECTS_FILE)) {
    console.error(`❌ Finner ikke ${REDIRECTS_FILE}`);
    console.error("   Kjør først: npx tsx scripts/crawl-wix-blog.ts");
    process.exit(1);
  }

  const redirects: Redirect[] = JSON.parse(readFileSync(REDIRECTS_FILE, "utf-8"));
  console.log(`📋 Fant ${redirects.length} redirects å legge til`);

  const configContent = readFileSync(CONFIG_FILE, "utf-8");

  // Bygg redirect-blokken
  const redirectLines = redirects
    .map(({ source, destination, permanent }) =>
      `      { source: '${source}', destination: '${destination}', permanent: ${permanent} },`
    )
    .join("\n");

  const newBlock = `${INSERT_MARKER}\n${redirectLines}\n      ${SECTION_END_MARKER}`;

  let newContent: string;

  if (configContent.includes(INSERT_MARKER)) {
    // Erstatt eksisterende blokk
    const regex = new RegExp(
      `${escapeRegex(INSERT_MARKER)}[\\s\\S]*?${escapeRegex(SECTION_END_MARKER)}`,
      "m"
    );
    newContent = configContent.replace(regex, newBlock);
    console.log("🔄 Oppdaterer eksisterende WIX-redirect-seksjon");
  } else {
    // Sett inn etter "// ── Blogg → Nyheter rename" seksjonen
    const insertAfter = "{ source: '/blogg/:slug', destination: '/nyheter/:slug', permanent: true },";
    if (!configContent.includes(insertAfter)) {
      console.error("❌ Finner ikke innsettingspunkt i next.config.ts");
      console.error("   Legg til redirectene manuelt fra scripts/wix-export/next-redirects.json");
      process.exit(1);
    }
    newContent = configContent.replace(
      insertAfter,
      `${insertAfter}\n\n      ${newBlock}`
    );
    console.log("✅ Setter inn ny WIX-redirect-seksjon");
  }

  writeFileSync(CONFIG_FILE, newContent, "utf-8");

  console.log(`\n✨ next.config.ts oppdatert med ${redirects.length} nye redirects`);
  console.log("\n📋 Oversikt:");
  for (const r of redirects.slice(0, 10)) {
    console.log(`   ${r.source} → ${r.destination}`);
  }
  if (redirects.length > 10) {
    console.log(`   ... og ${redirects.length - 10} til`);
  }
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

main();
