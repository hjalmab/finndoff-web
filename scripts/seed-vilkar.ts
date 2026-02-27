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
  block("Generelle vilkår for Finndoff-tjenester", "h2"),
  block(
    "Disse generelle vilkårene gjelder for Finndoff-tjenestene som er oppført nedenfor («Generelle vilkår»)."
  ),
  block("Finndoff Anbudsvarsling"),
  block("Finndoff Innsikt"),
  block("Finndoff Anbudshjelp AI"),
  block("Andre abonnementstyper for Finndoff og gratis prøveperioder"),
  block(
    "De ovennevnte tjenestene, samt varianter av disse (tilleggstjenester osv.), vil heretter samlet bli omtalt som «Finndoff-tjenester». Kunden har bestilt én eller flere av Finndoff-tjenestene fra Finndoff AS."
  ),

  block("1 Avtaleparter", "h3"),
  block(
    "Avtalepartene er Finndoff AS (org.nr. 927 436 442), heretter omtalt som Finndoff, og kjøperen, heretter omtalt som Kunden. Med «Kunden» menes den juridiske enheten eller enkeltpersonforetaket som er angitt i ordrebekreftelsen. Avtalen, inkludert disse generelle vilkårene, anses som akseptert og godkjent av Kunden ved bestilling av én eller flere Finndoff-tjenester gjennom Finndoffs nettsider eller plattformer, eller ved skriftlig bekreftelse av bestillingen."
  ),

  block("2 Avtalens omfang", "h3"),
  block(
    "Ved inngåelse av avtalen med Finndoff gir Kunden, i samsvar med brukerprofilen/brukerinnstillingene som er opprettet for Kunden, Finndoff i oppdrag å levere informasjon om offentlige anskaffelser i henhold til det som inngår i de Finndoff-tjenestene Kunden har bestilt. Kunden har rett til å søke, hente og motta denne informasjonen om offentlige anskaffelser til eget bruk. Automatiserte uttrekk av informasjon fra Finndoffs tjenester og nettsider er ikke tillatt."
  ),
  block(
    "Kunden er ansvarlig for at faktura- og innloggingsinformasjon er korrekt registrert hos Finndoff. Kunden er videre ansvarlig for at all informasjon som Kunden eller dennes brukere lagrer, bruker eller på annen måte behandler innenfor rammen av Finndoff-tjenestene, er i samsvar med gjeldende lover og forskrifter."
  ),
  block(
    "Kunden har en ikke-eksklusiv rett til, gjennom Finndoffs tjenester, å bruke informasjonen og tjenestene som beskrevet i ordrebekreftelsen. For Finndoffs tjenester og nettsider gjelder bruksretten kun for det antall brukere som er angitt i ordrebekreftelsen. Dersom en navngitt person slutter i sin stilling eller skifter rolle, har Kunden rett til å endre brukeren av Finndoff-tjenesten. I slike tilfeller skal Kunden på forhånd informere Finndoff om den nye brukeren. Avtalens omfang fremgår av ordrebekreftelsen."
  ),

  block("3 Avtaleperiode og oppsigelse", "h3"),
  block(
    "Avtalen gjelder for én (1) måned av gangen, med mindre annet er avtalt, fra bestillingen er lagt inn gjennom Finndoffs nettsider eller plattformer, eller når Kunden skriftlig bekrefter bestillingen i tilfeller der bestillingen gjøres på annen måte."
  ),
  block(
    "Dersom abonnementet ikke sies opp før gjeldende periode utløper, fornyes abonnementet for en ny periode og Finndoff AS vil belaste for den nye perioden."
  ),
  block(
    "I tilfeller der Kunden sier opp brukerlisensen for en av Finndoff-tjenestene, eller der den gratis prøveperioden utløper, vil Finndoff deaktivere den oppsagte brukerlisensen etter utløpet av avtaleperioden. Dette innebærer at Kundens brukere ikke lenger kan logge inn på tjenesten og at eventuelle e-postvarsler deaktiveres. Kunden kan be Finndoff om å reaktivere lisensen under gjeldende kommersielle vilkår og vil da få tilgang til tidligere registrerte data, søk og varsler knyttet til sin brukerprofil."
  ),
  block(
    "Finndoff vil automatisk avslutte og slette brukerprofiler, uten forhåndsvarsel til Kunden, dersom Kundens brukere har vært inaktive (ikke logget inn) på kontoen i en sammenhengende periode på mer enn tre år."
  ),

  block("4 Tilgang til Finndoff-tjenester", "h3"),
  block(
    "Finndoff-tjenestene er normalt tilgjengelige 24/7. Finndoff forbeholder seg retten til midlertidig å stenge Finndoff-tjenestene for vedlikehold. Vedlikehold vil hovedsakelig finne sted om natten og i helger for å minimere påvirkningen på Kundens bruk av tjenestene."
  ),

  block("5 Priser", "h3"),
  block(
    "Prisene for Finndoff-tjenestene som omfattes av avtalen, fremgår av ordrebekreftelsen. De oppgitte prisene gjelder per bruker og et angitt antall e-postmottakere innenfor brukerens bedrift."
  ),
  block(
    "Begrensningen på antall e-postmottakere vil variere med abonnementstypen. Ytterligere brukere og e-postmottakere kan legges til i henhold til gjeldende prisliste."
  ),
  block(
    "Alle priser er eksklusive merverdiavgift og eventuelle andre offentlige avgifter. Finndoff forbeholder seg retten til å justere prisene årlig."
  ),

  block("6 Betalingsvilkår", "h3"),
  block(
    "Betaling skjer forskuddsvis per måned mot faktura med betalingsfrist 10 dager etter fakturadato, eller ved bruk av betalingskort som støttes av Finndoff. Ved forsinket betaling påløper forsinkelsesrenter i henhold til forsinkelsesrenteloven. Refusjon vil kun bli gitt dersom Kunden har lidd tap i henhold til punkt 7 i denne avtalen."
  ),

  block("7 Ansvar", "h3"),
  block(
    "Informasjonen som Kunden mottar fra Finndoffs tjenester og nettsider er hentet fra offentlig tilgjengelig informasjon. Finndoff har ikke verifisert riktigheten eller fullstendigheten av denne informasjonen og har ikke ressurser til å gjennomføre slike kontroller. Finndoff påtar seg derfor ikke noe ansvar for den registrerte informasjonen. Ansvaret for den registrerte informasjonen ligger hos den enkelte informasjonsleverandøren. Finndoff vil imidlertid rette eventuelle feil i informasjonen så snart Finndoff blir gjort oppmerksom på feilen."
  ),
  block(
    "Finndoffs nettsider og tjenester kan inneholde lenker til andre nettsider. Finndoff er ikke ansvarlig for tilgjengeligheten til slike nettsider eller for deres innhold, sikkerhet eller håndtering av personopplysninger. Finndoff skal ikke holdes ansvarlig for direkte eller indirekte tap eller følgeskader knyttet til Finndoff-tjenestene, inkludert tapt inntekt eller lignende, selv om Finndoff er informert om muligheten for slikt tap."
  ),
  block(
    "Finndoff er ansvarlig for direkte tap som følge av forsett eller grov uaktsomhet. Finndoffs ansvar er i alle tilfeller begrenset til direkte tap opptil et samlet beløp tilsvarende ett (1) års avgift."
  ),
  block(
    "Finndoffs AI-verktøy, inkludert Anbudshjelp AI, genererer innhold basert på maskinlæring og offentlig tilgjengelig informasjon. Finndoff garanterer ikke riktigheten, fullstendigheten eller egnetheten av AI-generert innhold. Kunden er selv ansvarlig for å verifisere AI-generert innhold før det benyttes i anbudsprosesser eller andre forretningsbeslutninger."
  ),

  block("8 Konfidensialitet", "h3"),
  block(
    "Kunden påtar seg å sørge for at brukernavn og passord holdes konfidensielt slik at de ikke benyttes av uvedkommende. Med mindre slik funksjonalitet er inkludert i Finndoff-tjenesten, forplikter Kunden seg til ikke å videreformidle eller på annen måte gjøre tilgjengelig informasjon som er hentet direkte fra Finndoff eller via Finndoffs tjenester til andre, og å sørge for at ingen andre enn ansatte som arbeider for Kunden har tilgang til slik informasjon. Videre har Kunden ingen rettigheter til slik informasjon utover det som er fastsatt i avtalen. Med unntak av offentlig tilgjengelig informasjon har Finndoff og dets leverandører full eiendomsrett og opphavsrett til informasjonen som er hentet direkte fra Finndoff eller via Finndoffs tjenester og nettsider."
  ),

  block("9 Force majeure", "h3"),
  block(
    "Dersom en part er forhindret fra å oppfylle sine forpliktelser i henhold til avtalen på grunn av omstendigheter utenfor partenes kontroll, som lynnedslag, arbeidskonflikter, forstyrrelser i den offentlige strømforsyningen, brann, vedtak av offentlig myndighet, systemfeil eller svikt i ekstern nettverkstilgjengelighet, skal dette utgjøre grunnlag for fritak som medfører utsettelse av oppfyllelsesfrister og fritak fra ansvar."
  ),

  block("10 Endringer i vilkårene", "h3"),
  block(
    "Finndoff forbeholder seg retten til å endre utseendet og funksjonaliteten til Finndoff-tjenestene. Videre har Finndoff rett til å endre vilkårene i avtalen, inkludert disse generelle vilkårene, og gjeldende tekniske og administrative prosedyrer. Vesentlige endringer i vilkårene trer i kraft 30 dager etter at Kunden og/eller Kundens brukere har blitt varslet om disse endringene på en måte Finndoff finner hensiktsmessig. I tilfeller der Kunden ikke aksepterer Finndoffs endrede vilkår, har Kunden rett til å si opp Finndoff-tjenesten med 30 dagers varsel. Dette må gjøres innen 30 dager fra det tidspunktet Kunden eller Kundens brukere fikk tilgang til de endrede vilkårene. Slik oppsigelse må sendes skriftlig til Finndoff. Dersom Kunden ikke har benyttet seg av denne muligheten til å si opp Finndoff-tjenesten, anses Kunden å ha akseptert de endrede vilkårene."
  ),

  block("11 Overdragelse", "h3"),
  block(
    "Kunden har ikke rett til å overdra avtalen til andre uten forutgående skriftlig godkjenning fra Finndoff. Vilkåret for slik godkjenning er at den nye brukeren overtar avtalen på samme vilkår eller med nye vilkår tilpasset den nye brukeren av Finndoff. Kunden har heller ikke rett til å gi eller overføre brukernavn eller passord til andre."
  ),

  block("12 Mislighold", "h3"),
  block(
    "Dersom Kunden misligholder vilkårene i avtalen, kan Finndoff umiddelbart si opp avtalen og stenge tilgangen til Finndoff-tjenestene som er angitt i ordrebekreftelsen. Videre har Finndoff rett til å si opp avtalen umiddelbart i tilfeller der Kunden er slått konkurs, det er oppnevnt en bostyrer for Kunden, ved tvangsakkord, gjeldsforhandling eller lignende, eller dersom Kunden for øvrig anses som insolvent. Abonnementsavgiften vil ikke bli refundert."
  ),

  block("13 Tolkning", "h3"),
  block(
    "Ved motstridende opplysninger i avtaledokumentene skal dokumentene gis prioritet i følgende rekkefølge, med mindre annet er uttrykkelig angitt:"
  ),
  block("1. Ordrebekreftelse"),
  block("2. Faktura"),
  block("3. Generelle vilkår"),

  block("14 Tvisteløsning", "h3"),
  block(
    "Tvister vedrørende tolkning eller oppfyllelse av avtalen skal avgjøres av norsk domstol etter norsk rett, med Oslo tingrett som verneting i første instans."
  ),
];

// ── English version ───────────────────────────────────────────────
const bodyEn = [
  block("General Terms and Conditions for Finndoff Services", "h2"),
  block(
    'These General Terms and Conditions apply to the Finndoff services listed below ("General Terms").'
  ),
  block("Finndoff Anbudsvarsling (Tender Alerts)"),
  block("Finndoff Innsikt (Insights)"),
  block("Finndoff Anbudshjelp AI (AI Tender Assistant)"),
  block("Other subscription types for Finndoff and free trials thereof"),
  block(
    'The above-mentioned services, as well as variants thereof (add-ons, etc.), will hereinafter be collectively referred to as "Finndoff Services". The Customer has ordered one or more of the Finndoff Services from Finndoff AS.'
  ),

  block("1 Parties to the Agreement", "h3"),
  block(
    'The parties to the agreement are Finndoff AS (Org no. 927 436 442), hereinafter referred to as Finndoff, and the purchaser, hereinafter referred to as the Customer. The term "Customer" refers to the legal entity or individual entrepreneur specified in the order confirmation. The agreement, including these General Terms and Conditions, is considered accepted and approved by the Customer upon ordering one or more Finndoff Services through Finndoff\'s websites or platforms, or upon confirmation of the order in writing.'
  ),

  block("2 Scope of the Agreement", "h3"),
  block(
    "Upon entering into the agreement with Finndoff, the Customer assigns Finndoff, in accordance with the user profile/user settings created for the Customer, to provide information about public procurement in accordance with what is included in the Finndoff Services the Customer has ordered. The Customer has the right to search, retrieve and receive this information about public procurement for their own use. Automated retrievals of information from Finndoff's Services and websites are not allowed."
  ),
  block(
    "The Customer is responsible for ensuring that billing and login information is correctly registered with Finndoff. The Customer is further responsible for ensuring that all information that the Customer or their users store, use or otherwise process within the scope of the Finndoff Services is in compliance with applicable laws and regulations."
  ),
  block(
    "The Customer has a non-exclusive right through Finndoff's Services to use the information and services described in the order confirmation. For Finndoff's Services and websites, the right to use applies only to the number of users specified in the order confirmation. However, in cases where a named person leaves their job or changes position, the Customer has the right to change the user of the Finndoff Service. In such cases, the Customer shall inform Finndoff in advance of the new user using the access to information and services. The scope of the agreement is stated in the order confirmation."
  ),

  block("3 Term of Agreement and Termination", "h3"),
  block(
    "The agreement is valid for one (1) month at a time, unless otherwise agreed, from the order is placed through Finndoff's websites or platforms, or when the Customer confirms the order in writing in cases where the order is made in another way."
  ),
  block(
    "If the subscription is not terminated before the current period expires, the subscription will be renewed for the same term and Finndoff AS will charge for the new period."
  ),
  block(
    "In cases where the Customer terminates the user license for one of the Finndoff Services or where the free trial period expires, Finndoff will deactivate the terminated user license after the end of the agreement period. This means that the Customer's users can no longer log in to the service and that any email notifications are deactivated. The Customer can ask Finndoff to reactivate the license under the applicable commercial terms and will then regain access to previously registered data, searches and alerts associated with their user profile."
  ),
  block(
    "Finndoff will automatically terminate and delete user profiles, without prior notice to the Customer, if the Customer's users have been inactive (not logged in) on the account for a continuous period of more than three years."
  ),

  block("4 Access to Finndoff Services", "h3"),
  block(
    "The Finndoff Services are normally available 24/7. Finndoff reserves the right to temporarily shut down the Finndoff Services for maintenance. Maintenance will mainly take place during the night and on weekends to minimize the impact on the Customer's use of the Services."
  ),

  block("5 Prices", "h3"),
  block(
    "The prices for the Finndoff Services covered by the agreement are stated in the order confirmation. The prices quoted apply to one user and a specified number of email recipients within the user's company."
  ),
  block(
    "The limit on the number of email recipients will vary with the subscription type. Additional users and email recipients may be added in accordance with the current price list."
  ),
  block(
    "All prices are subject to value-added tax and any other applicable public charges. Finndoff reserves the right to adjust prices annually."
  ),

  block("6 Payment Terms", "h3"),
  block(
    "Payment must be made in advance per month against invoice with a payment deadline of 10 days after the invoice date, or by using a payment card supported by Finndoff. Late payment will result in interest charges in accordance with the Interest Act. Refunds will only be made if the Customer has suffered a loss in accordance with Section 7 of this agreement."
  ),

  block("7 Liability", "h3"),
  block(
    "The information that the Customer receives from Finndoff's Services and websites is obtained from publicly available information. Finndoff has not verified the accuracy or completeness of this information and does not have the resources to carry out such checks. Therefore, Finndoff does not assume any responsibility for the registered information. Responsibility for the registered information lies with the individual information provider. However, Finndoff will correct any erroneous information as soon as Finndoff becomes aware of the error."
  ),
  block(
    "Finndoff's websites and Services may contain links to other websites. Finndoff is not responsible for the availability of such websites or for their content, security, or how they handle personal data. Finndoff shall not be liable for direct or indirect loss or consequential damages related to the Finndoff Services, including lost income or similar, even if Finndoff is informed of the possibility of such loss."
  ),
  block(
    "Finndoff is liable for direct loss resulting from intent or gross negligence. Finndoff's liability is in any case limited to direct loss up to a total amount equivalent to one (1) annual fee."
  ),
  block(
    "Finndoff's AI tools, including Anbudshjelp AI, generate content based on machine learning and publicly available information. Finndoff does not guarantee the accuracy, completeness, or suitability of AI-generated content. The Customer is solely responsible for verifying AI-generated content before using it in procurement processes or other business decisions."
  ),

  block("8 Confidentiality", "h3"),
  block(
    "The Customer undertakes to ensure that usernames and passwords are kept confidential so that they are not used by unauthorized persons. Except when such functionality is included in the Finndoff Service, the Customer agrees not to disclose or otherwise make available information that has been obtained directly by Finndoff or via Finndoff's Services to others, and to ensure that no one other than employees working for the Customer has access to such information. Furthermore, the Customer has no right to such information except as provided in the agreement. With the exception of publicly available information, Finndoff and its suppliers have full ownership and copyright to the information obtained directly by Finndoff or via Finndoff's Services and websites."
  ),

  block("9 Force Majeure", "h3"),
  block(
    "If a party is prevented from fulfilling its obligations under the agreement due to circumstances beyond the parties' control, such as lightning strikes, labor disputes, disruption in the public power supply, fire, decision of a public authority, system failure or failure in external network availability, this shall constitute grounds for exemption that entail postponement of fulfillment deadlines and exemption from liability."
  ),

  block("10 Changes and Amendments to the Terms", "h3"),
  block(
    "Finndoff reserves the right to change the appearance and functionality of the Finndoff Services. Furthermore, Finndoff has the right to change the terms of the agreement, including these General Terms and Conditions, and applicable technical and administrative procedures. Material changes to the terms will take effect 30 days after the Customer and/or the Customer's users have been notified of these changes in a manner that Finndoff finds appropriate. In cases where the Customer does not accept Finndoff's changed terms, the Customer has the right to terminate the Finndoff Service with 30 days' notice. This must be done within 30 days from the time the Customer or the Customer's users gained access to the changed terms. Such termination must be submitted in writing to Finndoff. If the Customer has not availed themselves of this opportunity to terminate the Finndoff Service, it is considered that the Customer has accepted the changed terms."
  ),

  block("11 Assignment", "h3"),
  block(
    "The Customer has no right to assign the agreement to others without prior written approval from Finndoff. The condition for such approval is that the new user assumes the agreement under the same terms or with new terms adapted to the new user of Finndoff. The Customer also has no right to provide or transfer usernames or passwords to others."
  ),

  block("12 Breach", "h3"),
  block(
    "If the Customer breaches the terms of the agreement, Finndoff may immediately terminate the agreement and suspend access to the Finndoff Services specified in the order confirmation. Furthermore, Finndoff has the right to terminate the agreement immediately in cases where the Customer is declared bankrupt, the Customer is appointed an administrator, in case of compulsory composition, corporate reconstruction or similar, or if the Customer is otherwise deemed insolvent. The subscription fee will not be refunded."
  ),

  block("13 Interpretation", "h3"),
  block(
    "In the event of conflicting information in the agreement documents, the documents shall be given priority in the following order, unless otherwise expressly stated:"
  ),
  block("1. Order confirmation"),
  block("2. Invoice"),
  block("3. General Terms and Conditions"),

  block("14 Dispute Resolution", "h3"),
  block(
    "Disputes concerning interpretation or fulfillment of the agreement shall be decided by a Norwegian court under Norwegian law, with the Oslo District Court as the first instance."
  ),
];

const vilkar = {
  _id: "legal-vilkar",
  _type: "legalDocument",
  title: {
    no: "Generelle vilkår for Finndoff-tjenester",
    en: "General Terms and Conditions for Finndoff Services",
  },
  slug: { _type: "slug", current: "vilkar" },
  body: {
    no: bodyNo,
    en: bodyEn,
  },
  lastUpdated: "2026-02-27",
  seoTitle: "Vilkår | Finndoff",
  seoDescription:
    "Generelle vilkår og betingelser for bruk av Finndoff sine tjenester.",
};

async function main() {
  console.log("Seeding vilkår...");
  await client.createOrReplace(vilkar);
  console.log("✓ Vilkår (legal-vilkar) seeded");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
