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

type Style = "normal" | "h2" | "h3" | "h4";

function block(text: string, style: Style = "normal") {
  return {
    _type: "block" as const,
    _key: key(),
    style,
    markDefs: [],
    children: [{ _type: "span" as const, _key: key(), text, marks: [] }],
  };
}

// ── Norwegian version ─────────────────────────────────────────────
const bodyNo = [
  block("Personvernerklæring for Finndoff AS", "h2"),
  block(
    "Denne personvernerklæringen beskriver hvordan Finndoff AS (org.nr. 927 436 442) samler inn, bruker, lagrer og beskytter personopplysninger i forbindelse med våre tjenester. Finndoff er behandlingsansvarlig for personopplysningene som behandles i henhold til denne erklæringen."
  ),

  block("1 Hvem vi er", "h3"),
  block(
    "Finndoff AS er en norsk teknologibedrift som leverer verktøy og tjenester for overvåking, analyse og deltakelse i offentlige anskaffelsesprosesser. Våre tjenester inkluderer Anbudsvarsling, Innsikt og Anbudshjelp AI."
  ),
  block("Kontaktinformasjon:"),
  block("Finndoff AS"),
  block("Haakon VIIs gate 6, 0191 Oslo"),
  block("E-post: kontakt@finndoff.no"),
  block("Org.nr.: 927 436 442"),

  block("2 Hvilke personopplysninger vi samler inn", "h3"),
  block(
    "Vi samler inn og behandler følgende kategorier av personopplysninger:"
  ),
  block("Kontaktinformasjon: Navn, e-postadresse, telefonnummer, bedriftsnavn og adresse."),
  block("Kontoinformasjon: Brukernavn, passord (kryptert), brukerinnstillinger og abonnementstype."),
  block("Bruksdata: Innloggingshistorikk, søkehistorikk, lagrede varsler og preferanser i tjenesten."),
  block("Betalingsinformasjon: Fakturainformasjon og betalingshistorikk. Kortnumre lagres ikke hos oss, men hos vår betalingspartner."),
  block("Teknisk informasjon: IP-adresse, nettlesertype, enhetsinformasjon og informasjonskapsler (cookies)."),
  block("Kommunikasjon: E-postkorrespondanse og henvendelser via kundeservice."),

  block("3 Formål og rettslig grunnlag", "h3"),
  block("Vi behandler personopplysninger for følgende formål:"),
  block(
    "Levering av tjenester (rettslig grunnlag: avtale): For å opprette og administrere din konto, levere anbudsvarsler, innsiktsrapporter og AI-basert anbudsbistand, samt håndtere fakturering."
  ),
  block(
    "Forbedring av tjenester (rettslig grunnlag: berettiget interesse): For å analysere brukeratferd i aggregert form for å forbedre funksjonalitet, ytelse og brukeropplevelse."
  ),
  block(
    "Kommunikasjon (rettslig grunnlag: avtale/berettiget interesse): For å sende driftsrelaterte meldinger, varsler om endringer i tjenesten og svar på henvendelser."
  ),
  block(
    "Markedsføring (rettslig grunnlag: samtykke): For å sende nyhetsbrev og informasjon om nye produkter og tjenester. Du kan når som helst melde deg av."
  ),
  block(
    "Juridiske forpliktelser (rettslig grunnlag: lov): For å oppfylle krav i bokføringsloven, skatteloven og annen relevant lovgivning."
  ),

  block("4 AI-tjenester og databehandling", "h3"),
  block(
    "Finndoffs AI-verktøy, inkludert Anbudshjelp AI, behandler offentlig tilgjengelig informasjon om anskaffelser kombinert med brukerens søkekriterier og preferanser. Vi bruker følgende prinsipper for AI-behandling:"
  ),
  block(
    "Brukerdata som legges inn i AI-verktøyet brukes kun til å levere tjenesten og forbedres ikke til trening av AI-modeller uten eksplisitt samtykke."
  ),
  block(
    "AI-genererte analyser og anbefalinger er basert på offentlig tilgjengelig informasjon og skal ikke anses som juridisk eller faglig rådgivning."
  ),
  block(
    "Kunden kan når som helst be om innsyn i eller sletting av data som er behandlet av AI-tjenesten."
  ),

  block("5 Deling av personopplysninger", "h3"),
  block(
    "Vi deler personopplysninger med følgende kategorier av mottakere, og kun i den grad det er nødvendig:"
  ),
  block(
    "Underleverandører og databehandlere: Vi benytter tredjepartsleverandører for hosting, e-postlevering, betalingsbehandling og analyseverktøy. Alle databehandlere er bundet av databehandleravtaler i henhold til GDPR."
  ),
  block(
    "Offentlige myndigheter: Dersom vi er pålagt ved lov å utlevere opplysninger."
  ),
  block(
    "Vi selger aldri personopplysninger til tredjeparter. Vi overfører ikke personopplysninger til land utenfor EØS uten at tilstrekkelige beskyttelsestiltak er på plass, som EU-godkjente standardkontraktsklausuler."
  ),

  block("6 Informasjonskapsler (cookies)", "h3"),
  block("Vi bruker følgende typer informasjonskapsler:"),
  block(
    "Nødvendige: Påkrevd for at tjenesten skal fungere, som innlogging og øktadministrasjon."
  ),
  block(
    "Analytiske: For å forstå hvordan brukere interagerer med nettsiden (Google Analytics). Disse samles kun inn med ditt samtykke."
  ),
  block(
    "Du kan administrere dine cookie-preferanser via nettleserinnstillingene eller via vårt samtykkevindu."
  ),

  block("7 Lagring og sletting", "h3"),
  block(
    "Personopplysninger lagres så lenge det er nødvendig for formålet de ble samlet inn for:"
  ),
  block(
    "Kontoinformasjon: Lagres så lenge kundeforholdet er aktivt, og slettes senest tre (3) år etter siste innlogging, i henhold til vilkårenes § 3."
  ),
  block(
    "Faktureringsinformasjon: Lagres i fem (5) år etter regnskapsårets slutt, i henhold til bokføringsloven."
  ),
  block(
    "Bruksdata og logger: Lagres i inntil tolv (12) måneder for feilsøking og tjenesteoptimalisering."
  ),
  block(
    "Markedsføringssamtykke: Lagres til du trekker samtykket tilbake."
  ),

  block("8 Dine rettigheter", "h3"),
  block("I henhold til personvernforordningen (GDPR) har du følgende rettigheter:"),
  block("Innsyn: Du har rett til å få vite hvilke personopplysninger vi har registrert om deg."),
  block("Retting: Du har rett til å få rettet uriktige opplysninger om deg."),
  block("Sletting: Du har rett til å be om sletting av dine personopplysninger, med mindre vi har et lovpålagt grunnlag for å beholde dem."),
  block("Dataportabilitet: Du har rett til å motta dine personopplysninger i et strukturert, maskinlesbart format."),
  block("Begrensning: Du har rett til å be om at behandlingen av dine opplysninger begrenses."),
  block("Innsigelse: Du har rett til å protestere mot behandling basert på berettiget interesse."),
  block(
    "For å utøve dine rettigheter, kontakt oss på kontakt@finndoff.no. Vi vil svare innen 30 dager."
  ),

  block("9 Sikkerhet", "h3"),
  block(
    "Vi tar datasikkerhet på alvor og har implementert tekniske og organisatoriske tiltak for å beskytte personopplysninger, herunder:"
  ),
  block("Kryptering av data i transitt (TLS) og i hvile."),
  block("Tilgangskontroll med rollbasert autentisering."),
  block("Regelmessig sikkerhetsgjennomgang og oppdatering av systemer."),
  block("Logging og overvåking av tilgang til personopplysninger."),

  block("10 Endringer i personvernerklæringen", "h3"),
  block(
    "Vi kan oppdatere denne personvernerklæringen fra tid til annen. Vesentlige endringer vil bli varslet via e-post eller i tjenesten. Den til enhver tid gjeldende versjonen er tilgjengelig på denne siden med dato for siste oppdatering."
  ),

  block("11 Klage", "h3"),
  block(
    "Dersom du mener at vi behandler personopplysninger i strid med personvernregelverket, har du rett til å klage til Datatilsynet (datatilsynet.no)."
  ),

  block("12 Kontakt", "h3"),
  block("For spørsmål om personvern, kontakt oss:"),
  block("Finndoff AS"),
  block("E-post: kontakt@finndoff.no"),
  block("Adresse: Haakon VIIs gate 6, 0191 Oslo"),
];

// ── English version ───────────────────────────────────────────────
const bodyEn = [
  block("Privacy Policy for Finndoff AS", "h2"),
  block(
    "This privacy policy describes how Finndoff AS (Org. no. 927 436 442) collects, uses, stores and protects personal data in connection with our services. Finndoff is the data controller for the personal data processed under this policy."
  ),

  block("1 Who We Are", "h3"),
  block(
    "Finndoff AS is a Norwegian technology company that provides tools and services for monitoring, analyzing and participating in public procurement processes. Our services include Anbudsvarsling (Tender Alerts), Innsikt (Insights) and Anbudshjelp AI (AI Tender Assistant)."
  ),
  block("Contact information:"),
  block("Finndoff AS"),
  block("Haakon VIIs gate 6, 0191 Oslo, Norway"),
  block("Email: kontakt@finndoff.no"),
  block("Org. no.: 927 436 442"),

  block("2 Personal Data We Collect", "h3"),
  block("We collect and process the following categories of personal data:"),
  block("Contact information: Name, email address, phone number, company name and address."),
  block("Account information: Username, password (encrypted), user settings and subscription type."),
  block("Usage data: Login history, search history, saved alerts and preferences within the service."),
  block("Payment information: Invoice details and payment history. Card numbers are not stored by us, but by our payment partner."),
  block("Technical information: IP address, browser type, device information and cookies."),
  block("Communication: Email correspondence and customer service inquiries."),

  block("3 Purposes and Legal Basis", "h3"),
  block("We process personal data for the following purposes:"),
  block(
    "Service delivery (legal basis: contract): To create and manage your account, deliver tender alerts, insight reports and AI-based tender assistance, and handle invoicing."
  ),
  block(
    "Service improvement (legal basis: legitimate interest): To analyze user behavior in aggregated form to improve functionality, performance and user experience."
  ),
  block(
    "Communication (legal basis: contract/legitimate interest): To send operational messages, notifications about changes to the service, and responses to inquiries."
  ),
  block(
    "Marketing (legal basis: consent): To send newsletters and information about new products and services. You can opt out at any time."
  ),
  block(
    "Legal obligations (legal basis: law): To comply with requirements under the Norwegian Bookkeeping Act, tax legislation and other relevant regulations."
  ),

  block("4 AI Services and Data Processing", "h3"),
  block(
    "Finndoff's AI tools, including Anbudshjelp AI, process publicly available procurement information combined with the user's search criteria and preferences. We apply the following principles for AI processing:"
  ),
  block(
    "User data entered into the AI tool is only used to deliver the service and is not used for AI model training without explicit consent."
  ),
  block(
    "AI-generated analyses and recommendations are based on publicly available information and should not be considered legal or professional advice."
  ),
  block(
    "The Customer may at any time request access to or deletion of data processed by the AI service."
  ),

  block("5 Sharing of Personal Data", "h3"),
  block(
    "We share personal data with the following categories of recipients, and only to the extent necessary:"
  ),
  block(
    "Sub-processors and data processors: We use third-party providers for hosting, email delivery, payment processing and analytics tools. All data processors are bound by data processing agreements in accordance with GDPR."
  ),
  block(
    "Public authorities: If we are required by law to disclose information."
  ),
  block(
    "We never sell personal data to third parties. We do not transfer personal data to countries outside the EEA without adequate safeguards in place, such as EU-approved standard contractual clauses."
  ),

  block("6 Cookies", "h3"),
  block("We use the following types of cookies:"),
  block(
    "Necessary: Required for the service to function, such as login and session management."
  ),
  block(
    "Analytical: To understand how users interact with the website (Google Analytics). These are only collected with your consent."
  ),
  block(
    "You can manage your cookie preferences through your browser settings or through our consent banner."
  ),

  block("7 Storage and Deletion", "h3"),
  block(
    "Personal data is stored for as long as necessary for the purpose for which it was collected:"
  ),
  block(
    "Account information: Stored for the duration of the customer relationship, and deleted no later than three (3) years after the last login, in accordance with Section 3 of the Terms and Conditions."
  ),
  block(
    "Billing information: Stored for five (5) years after the end of the financial year, in accordance with the Norwegian Bookkeeping Act."
  ),
  block(
    "Usage data and logs: Stored for up to twelve (12) months for troubleshooting and service optimization."
  ),
  block(
    "Marketing consent: Stored until you withdraw your consent."
  ),

  block("8 Your Rights", "h3"),
  block("Under the General Data Protection Regulation (GDPR), you have the following rights:"),
  block("Access: You have the right to know what personal data we have registered about you."),
  block("Rectification: You have the right to have inaccurate data about you corrected."),
  block("Erasure: You have the right to request deletion of your personal data, unless we have a legal basis for retaining it."),
  block("Data portability: You have the right to receive your personal data in a structured, machine-readable format."),
  block("Restriction: You have the right to request that the processing of your data be restricted."),
  block("Objection: You have the right to object to processing based on legitimate interest."),
  block(
    "To exercise your rights, contact us at kontakt@finndoff.no. We will respond within 30 days."
  ),

  block("9 Security", "h3"),
  block(
    "We take data security seriously and have implemented technical and organizational measures to protect personal data, including:"
  ),
  block("Encryption of data in transit (TLS) and at rest."),
  block("Access control with role-based authentication."),
  block("Regular security reviews and system updates."),
  block("Logging and monitoring of access to personal data."),

  block("10 Changes to This Privacy Policy", "h3"),
  block(
    "We may update this privacy policy from time to time. Material changes will be notified via email or within the service. The current version is always available on this page with the date of the last update."
  ),

  block("11 Complaints", "h3"),
  block(
    "If you believe that we process personal data in violation of data protection regulations, you have the right to file a complaint with the Norwegian Data Protection Authority (datatilsynet.no)."
  ),

  block("12 Contact", "h3"),
  block("For questions about privacy, contact us:"),
  block("Finndoff AS"),
  block("Email: kontakt@finndoff.no"),
  block("Address: Haakon VIIs gate 6, 0191 Oslo, Norway"),
];

const personvern = {
  _id: "legal-personvern",
  _type: "legalDocument",
  title: {
    no: "Personvernerklæring",
    en: "Privacy Policy",
  },
  slug: { _type: "slug", current: "personvern" },
  body: {
    no: bodyNo,
    en: bodyEn,
  },
  lastUpdated: "2026-02-27",
  seoTitle: "Personvern | Finndoff",
  seoDescription:
    "Personvernerklæring for Finndoff AS — hvordan vi samler inn, bruker og beskytter dine personopplysninger.",
};

async function main() {
  console.log("Seeding personvernerklæring...");
  await client.createOrReplace(personvern);
  console.log("✓ Personvern (legal-personvern) seeded");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
