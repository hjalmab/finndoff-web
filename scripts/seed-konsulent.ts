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

const portableText = (text: string) => [
  {
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  },
];

const product = {
  _id: "product-konsulent",
  _type: "product",
  title: "Anbudskonsulent",
  slug: { _type: "slug", current: "konsulent" },
  subtitle:
    "Vi kombinerer kraftig teknologi med erfarne fagfolk — eksperter når du trenger dem.",
  description:
    "Finndoffs kompetansenettverk kobler deg med erfarne anbudskonsulenter som kjenner plattformen og bransjen. Fra strategi til ferdig tilbud.",
  icon: "users",
  priceLabel: "Etter avtale",
  isAddon: true,
  seoTitle: "Anbudskonsulent — Eksperter når du trenger dem | Finndoff",
  seoDescription:
    "Få hjelp av erfarne anbudskonsulenter som kjenner Finndoff-plattformen. Strategi, tilbudsskriving og prosessveiledning — fra TendPro og Din Anbudshjelp.",
  sections: [
    // 1. Hero
    {
      _type: "hero",
      _key: key(),
      headline: "Eksperter når du trenger dem",
      subheadline:
        "Vi kombinerer kraftig teknologi med erfarne fagfolk — slik at du kan vinne flere anbud.",
      primaryCta: {
        text: "Book gratis konsultasjon",
        link: "https://www.tendpro.no/book-et-mote",
      },
      secondaryCta: {
        text: "Kontakt oss",
        link: "/kontakt",
      },
      style: "default",
    },

    // 2. TextSection — intro
    {
      _type: "textSection",
      _key: key(),
      title: "Verktøy + eksperter = bedre resultater",
      content: [
        ...portableText(
          "Finndoff gir deg verktøyene for å finne og analysere anbud effektivt. Men noen ganger trenger du mer enn teknologi — du trenger erfarne fagfolk som kan hjelpe deg med strategi, tilbudsskriving og prosessforståelse."
        ),
        ...portableText(
          "Derfor har vi bygget et kompetansenettverk med håndplukkede partnere som kjenner Finndoff-plattformen og bransjen din. De kan hjelpe deg fra første vurdering til ferdig innlevert tilbud."
        ),
      ],
    },

    // 3. FeatureGrid (2 features, 2 columns) — partnerne
    {
      _type: "featureGrid",
      _key: key(),
      title: "Våre partnere",
      subtitle:
        "Erfarne konsulenter som kjenner plattformen og forstår offentlige anskaffelser.",
      columns: 2,
      features: [
        {
          _key: key(),
          title: "TendPro",
          description:
            "Spesialister på anbudsstrategi, tilbudsskriving, gjennomgang og opplæring. Tilbyr 20 minutters gratis konsultasjon for nye kunder.",
          icon: "award",
        },
        {
          _key: key(),
          title: "Din Anbudshjelp",
          description:
            "Eksperter på tolkning av konkurransegrunnlag, strategisk rådgivning, tilbudsutforming og prosessveiledning fra A til Å.",
          icon: "book-open",
        },
      ],
    },

    // 4. FeatureGrid (3 features, 3 columns) — hvorfor Finndoffs partnere
    {
      _type: "featureGrid",
      _key: key(),
      title: "Hvorfor Finndoffs partnere?",
      subtitle:
        "Ikke hvilke som helst konsulenter — våre partnere er kuratert for kvalitet og kjennskap til plattformen.",
      columns: 3,
      features: [
        {
          _key: key(),
          title: "Kuratert kvalitet",
          description:
            "Vi velger partnere basert på erfaring, kompetanse og dokumenterte resultater innen offentlige anskaffelser.",
          icon: "shield-check",
        },
        {
          _key: key(),
          title: "Kjenner plattformen",
          description:
            "Våre partnere bruker Finndoff daglig og forstår hvordan verktøyene fungerer — de gir råd i kontekst av dine data.",
          icon: "puzzle",
        },
        {
          _key: key(),
          title: "Trygghet og tillit",
          description:
            "Du får en trygg vei inn til profesjonell hjelp, anbefalt av Finndoff — uten risiko og med kvalitetsgaranti.",
          icon: "heart-handshake",
        },
      ],
    },

    // 5. Testimonial
    {
      _type: "testimonial",
      _key: key(),
      quote:
        "Vi har et bevisst forhold til vår rolle som samfunnsbygger. Finndoff hjelper oss å bruke tiden på det vi er best på – å bygge.",
      name: "Tore Killi",
      role: "Daglig leder",
      company: "Brødrene Killi AS",
    },

    // 6. CtaSection
    {
      _type: "ctaSection",
      _key: key(),
      title: "Trenger du veiledning?",
      description:
        "Book en gratis konsultasjon med TendPro, eller ta kontakt med oss for å finne riktig hjelp for din bedrift.",
      primaryCta: {
        text: "Book gratis konsultasjon",
        link: "https://www.tendpro.no/book-et-mote",
      },
      secondaryCta: {
        text: "Kontakt oss",
        link: "/kontakt",
      },
      style: "brand",
    },
  ],
};

async function seed() {
  console.log("Seeding Konsulent product to Sanity...");

  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error(
      "Missing SANITY_API_WRITE_TOKEN in .env.local\n" +
        "Create a write token at sanity.io/manage → API → Tokens"
    );
    process.exit(1);
  }

  try {
    await client.createOrReplace(product);
    console.log(
      "Konsulent product created/updated successfully (id: product-konsulent)"
    );
  } catch (err) {
    console.error("Failed to seed Konsulent:", err);
    process.exit(1);
  }
}

seed();
