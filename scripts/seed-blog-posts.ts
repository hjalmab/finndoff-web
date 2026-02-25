import { createClient } from "@sanity/client";
import { config } from "dotenv";
import { randomUUID } from "crypto";

config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
});

const key = () => randomUUID().slice(0, 8);

const block = (text: string, style = "normal") => ({
  _type: "block",
  _key: key(),
  style,
  markDefs: [],
  children: [{ _type: "span", _key: key(), text, marks: [] }],
});

const h2 = (text: string) => block(text, "h2");
const h3 = (text: string) => block(text, "h3");
const p = (text: string) => block(text);

// ── Blog posts ────────────────────────────────────────────────────

const posts = [
  {
    _id: "blog-komme-i-gang-anbud",
    _type: "blogPost",
    title: "Slik kommer du i gang med offentlige anbud",
    slug: { _type: "slug", current: "komme-i-gang-med-offentlige-anbud" },
    author: { _type: "reference", _ref: "person-thomas" },
    category: "komme-i-gang",
    publishedAt: "2026-02-10T09:00:00Z",
    excerpt:
      "Offentlige anbud representerer en enorm mulighet for norske bedrifter. Her er en enkel guide for å komme i gang.",
    seoTitle: "Slik kommer du i gang med offentlige anbud | Finndoff",
    seoDescription:
      "Lær steg for steg hvordan du finner og vinner offentlige anbud. En praktisk guide for norske SMB-er.",
    body: [
      h2("Hvorfor offentlige anbud?"),
      p("Offentlig sektor i Norge kjøper varer og tjenester for over 600 milliarder kroner årlig. For mange små og mellomstore bedrifter representerer dette en betydelig vekstmulighet — men mange vet ikke hvordan de skal komme i gang."),
      p("I denne guiden tar vi deg gjennom de viktigste stegene for å finne og vinne dine første offentlige anbud."),
      h2("Steg 1: Forstå regelverket"),
      p("Offentlige anskaffelser reguleres av Lov om offentlige anskaffelser og tilhørende forskrifter. Det viktigste å vite er at alle anskaffelser over terskelverdi (1,3 millioner for statlige og 2 millioner for kommunale) skal kunngjøres på Doffin — den nasjonale kunngjøringsdatabasen."),
      p("For anbud under EU-terskelverdi gjelder norske regler, mens anbud over EU-terskelverdi også kunngjøres på TED (Tenders Electronic Daily)."),
      h2("Steg 2: Finn relevante anbud"),
      p("Du kan søke på Doffin manuelt, men det er tidkrevende og lett å gå glipp av muligheter. Med Finndoff Varsling får du automatiske varsler basert på dine CPV-koder, geografiske områder og nøkkelord — slik at du aldri går glipp av et relevant anbud."),
      h3("Tips: Bruk CPV-koder strategisk"),
      p("CPV-koder (Common Procurement Vocabulary) er klassifiseringssystemet som brukes for å kategorisere anbud. Velg koder som dekker både dine hovedtjenester og tilgrensende områder for å fange opp flere muligheter."),
      h2("Steg 3: Vurder og prioriter"),
      p("Ikke svar på alle anbud — velg de du har best forutsetninger for å vinne. Se på tildelingskriteriene, kravene til erfaring og referanser, og om tidslinjen passer din kapasitet."),
      h2("Steg 4: Skriv et godt tilbud"),
      p("Et godt anbud svarer presist på det oppdragsgiver etterspør. Les konkurransegrunnlaget nøye, svar på alle krav punkt for punkt, og vis hvordan din løsning gir best verdi."),
      p("Med Finndoff Anbudshjelp AI kan du få hjelp til å analysere konkurransegrunnlag og strukturere ditt tilbud — slik at du sparer tid og øker kvaliteten."),
      h2("Kom i gang i dag"),
      p("Det trenger ikke være vanskelig å komme i gang med offentlige anbud. Med riktige verktøy og en systematisk tilnærming kan du bygge en lønnsom portefølje av offentlige kontrakter."),
    ],
  },
  {
    _id: "blog-5-tips-varsling",
    _type: "blogPost",
    title: "5 tips for å vinne flere anbud med Finndoff Varsling",
    slug: { _type: "slug", current: "5-tips-vinne-anbud-varsling" },
    author: { _type: "reference", _ref: "person-daniel" },
    category: "produkttips",
    publishedAt: "2026-02-17T10:00:00Z",
    excerpt:
      "Få mest mulig ut av Finndoff Varsling med disse fem konkrete tipsene fra vårt ekspertteam.",
    seoTitle: "5 tips for å vinne flere anbud med Finndoff Varsling",
    seoDescription:
      "Lær hvordan du konfigurerer Finndoff Varsling for å fange opp de beste anbudene og aldri gå glipp av en mulighet.",
    body: [
      p("Finndoff Varsling gir deg automatiske varsler når relevante anbud publiseres. Men visste du at måten du setter opp varslingsprofilen din på kan ha stor innvirkning på resultatene? Her er våre fem beste tips."),
      h2("1. Vær spesifikk med CPV-koder"),
      p("Mange starter med for brede kategorier og drukner i irrelevante varsler. Start heller smalt — med de CPV-kodene som treffer dine kjernetjenester — og utvid gradvis etter hvert som du får erfaring."),
      h2("2. Kombiner geografi og kategori"),
      p("Anbud i ditt nærområde gir deg en naturlig fordel. Kombiner geografiske filtre med CPV-koder for å finne de mest relevante mulighetene. Husk at mange oppdragsgivere foretrekker lokale leverandører for oppfølging og service."),
      h2("3. Sett opp nøkkelordvarsler"),
      p("I tillegg til CPV-koder kan du legge til nøkkelord som fanger opp anbud som kanskje bruker andre kategoriseringer. For eksempel: hvis du driver med ventilasjon, legg til nøkkelord som «ventilasjon», «klima» og «HVAC»."),
      h2("4. Sjekk varslene daglig"),
      p("De beste anbudene har ofte korte frister. Gjør det til en rutine å sjekke varslene dine hver morgen. Med Finndoff får du varslene rett i innboksen, så det tar bare et par minutter."),
      h2("5. Bruk Innsikt for å prioritere"),
      p("Finndoff Innsikt gir deg kontekst om oppdragsgivere og historiske anbud. Bruk denne informasjonen til å prioritere hvilke anbud du skal bruke tid på — og hvilke du kan la gå."),
      p("Med disse tipsene på plass er du godt rustet til å fange opp flere relevante anbud og øke vinnersjansenene dine."),
    ],
  },
  {
    _id: "blog-lansering-anbudshjelp-ai",
    _type: "blogPost",
    title: "Finndoff lanserer Anbudshjelp AI",
    slug: { _type: "slug", current: "lansering-anbudshjelp-ai" },
    author: { _type: "reference", _ref: "person-thomas" },
    category: "nyheter",
    publishedAt: "2026-02-24T08:00:00Z",
    excerpt:
      "Vi er stolte av å lansere Anbudshjelp AI — din AI-drevne assistent for å analysere og vinne offentlige anbud.",
    seoTitle: "Finndoff lanserer Anbudshjelp AI | Nyheter",
    seoDescription:
      "Anbudshjelp AI bruker kunstig intelligens til å hjelpe deg analysere konkurransegrunnlag og skrive bedre tilbud.",
    body: [
      p("I dag lanserer vi Anbudshjelp AI — et helt nytt verktøy som bruker kunstig intelligens for å hjelpe deg med å analysere konkurransegrunnlag, identifisere krav og strukturere bedre tilbud."),
      h2("Menneske + Maskin = Bedre anbudsresultater"),
      p("Vår filosofi har alltid vært at teknologi skal forsterke menneskelig kompetanse, ikke erstatte den. Anbudshjelp AI er bygget på dette prinsippet: AI-en gjør det tunge analysearbeidet, mens du bringer bransjekunnskapen og den strategiske vurderingen."),
      h2("Hva kan Anbudshjelp AI gjøre?"),
      h3("Analysere konkurransegrunnlag"),
      p("Last opp et konkurransegrunnlag og få en strukturert oversikt over alle krav, tildelingskriterier og viktige frister. AI-en trekker ut det viktigste slik at du raskt kan vurdere om anbudet er relevant for deg."),
      h3("Foreslå tilbudsstruktur"),
      p("Basert på kravene i konkurransegrunnlaget foreslår AI-en en struktur for ditt tilbud — inkludert hvilke punkter du bør svare på og hvordan du best kan presentere din løsning."),
      h3("Kvalitetssjekke tilbudet"),
      p("Før du sender inn kan AI-en sjekke at du har svart på alle krav og at tilbudet ditt er komplett. Dette reduserer risikoen for avvisning på grunn av formaliteter."),
      h2("Tilgjengelig som tilleggsmodul"),
      p("Anbudshjelp AI er tilgjengelig som tilleggsmodul for alle Finndoff-kunder med Varsling. Prisen er 1.499 kr/mnd, og du kan teste det gratis i 14 dager."),
      h2("Kom i gang"),
      p("Besøk finndoff.no/anbudshjelp-ai for å lære mer, eller ta kontakt med oss for en demo. Vi gleder oss til å hjelpe deg vinne flere anbud!"),
    ],
  },
];

async function main() {
  console.log("🌱 Seeding 3 blog posts...");

  for (const post of posts) {
    await client.createOrReplace(post);
    console.log(`  ✅ ${post.title}`);
  }

  console.log("\n✨ Done! Visit /blogg to see the posts.");
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
