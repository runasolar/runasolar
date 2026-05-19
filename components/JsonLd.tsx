import { COMPANY, SERVICES, TESTIMONIALS } from "@/lib/data";
import { SITE_URL as BASE_URL } from "@/lib/site";

/* ── Helpers ──────────────────────────────────────────────────────── */

function renderJsonLd(data: unknown) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ── LocalBusiness — critical for Local Pack / Google Maps ───────── */

export function LocalBusinessJsonLd() {
  const reviewCount = TESTIMONIALS.length;
  const avgRating =
    Math.round(
      (TESTIMONIALS.reduce((s, t) => s + t.rating, 0) / reviewCount) * 10
    ) / 10;

  // LocalBusiness IS-A Organization (Schema.org hierarchy) — declaring both
  // @types on one node prevents Google from auto-merging two separate
  // entities that share name/logo into a single display node with
  // duplicated url/logo/sameAs properties.
  const data = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ElectricalContractor", "Organization"],
    "@id": `${BASE_URL}/#business`,
    name: COMPANY.name,
    alternateName: COMPANY.shortName,
    legalName: COMPANY.name,
    description:
      "Монтаж гібридних сонячних електростанцій з резервом під ключ. Tier-1 обладнання, гарантія до 25 років, документи 'Зеленого тарифу'.",
    slogan: COMPANY.tagline,
    url: BASE_URL,
    foundingDate: "2021",
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/icon.svg`,
      width: 192,
      height: 192,
    },
    image: [`${BASE_URL}/opengraph-image`],
    telephone: COMPANY.phonesRaw[0],
    email: COMPANY.email,
    knowsAbout: [
      "Сонячна енергетика",
      "Гібридні сонячні електростанції",
      "Накопичувачі енергії LiFePO4",
      "Системи автономного живлення",
      "Зелений тариф",
    ],
    contactPoint: COMPANY.phonesRaw.map((phone, i) => ({
      "@type": "ContactPoint",
      telephone: phone,
      contactType: i === 0 ? "sales" : "customer service",
      availableLanguage: ["Ukrainian", "Russian"],
      areaServed: "UA",
    })),
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.addressStreet,
      addressLocality: COMPANY.addressCity,
      addressRegion: COMPANY.region,
      postalCode: COMPANY.postalCode,
      addressCountry: "UA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 49.4229,
      longitude: 26.9871,
    },
    hasMap: COMPANY.mapsUrl,
    areaServed: [
      "Хмельницька область",
      "Тернопільська область",
      "Вінницька область",
      "Рівненська область",
      "Житомирська область",
      "Чернівецька область",
    ].map((name) => ({ "@type": "AdministrativeArea", name })),
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 49.4229,
        longitude: 26.9871,
      },
      geoRadius: 170000,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    sameAs: [COMPANY.instagram, COMPANY.tiktok],
    priceRange: "$$",
    currenciesAccepted: "UAH, USD",
    paymentAccepted: "Готівка, безготівковий розрахунок, розстрочка",
    knowsLanguage: ["uk", "en"],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avgRating.toFixed(1),
      reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    review: TESTIMONIALS.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating,
        bestRating: 5,
      },
      reviewBody: t.text,
      datePublished: t.date,
    })),
    makesOffer: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        description: s.description,
      },
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    })),
  };

  return renderJsonLd(data);
}

/* ── WebSite ─────────────────────────────────────────────────────── */

export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: COMPANY.name,
    inLanguage: "uk-UA",
    publisher: { "@id": `${BASE_URL}/#business` },
  };

  return renderJsonLd(data);
}

/* ── WebPage — homepage as a discoverable web resource ───────────── */

export function WebPageJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE_URL}/#webpage`,
    url: BASE_URL,
    name: "RUNA SOLAR — Сонячні станції під ключ у Хмельницькому",
    description:
      "Монтаж гібридних сонячних електростанцій, накопичувачів та САЖ під ключ. Хмельницький та область.",
    inLanguage: "uk-UA",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#business` },
    primaryImageOfPage: `${BASE_URL}/opengraph-image`,
  };

  return renderJsonLd(data);
}

/* ── BreadcrumbList — section navigation hint ────────────────────── */

export function BreadcrumbJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Головна",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Послуги",
        item: `${BASE_URL}/#services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Проєкти",
        item: `${BASE_URL}/#cases`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Калькулятор",
        item: `${BASE_URL}/#calculator`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Контакти",
        item: `${BASE_URL}/#contact`,
      },
    ],
  };

  return renderJsonLd(data);
}

/* ── Service — one per offered service ───────────────────────────── */

export function ServiceJsonLd() {
  const services = SERVICES.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE_URL}/#service-${s.id}`,
    name: s.title,
    alternateName: s.short,
    description: s.description,
    provider: { "@id": `${BASE_URL}/#business` },
    areaServed: "Хмельницька область",
    serviceType: s.title,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      url: `${BASE_URL}/#services`,
      availability: "https://schema.org/InStock",
      eligibleRegion: { "@type": "Country", name: "Ukraine" },
    },
  }));

  return (
    <>
      {services.map((data) => (
        <script
          key={data["@id"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}
