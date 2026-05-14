import { COMPANY } from "@/lib/data";
import { SITE_URL as BASE_URL } from "@/lib/site";

// LocalBusiness schema — critical for Google Maps / Local Pack ranking
// for queries like "сонячні станції Хмельницький"
export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/#business`,
    name: COMPANY.name,
    alternateName: COMPANY.shortName,
    description:
      "Монтаж гібридних сонячних електростанцій з резервом під ключ. Tier-1 обладнання, гарантія до 25 років, документи 'Зеленого тарифу'.",
    url: BASE_URL,
    logo: `${BASE_URL}/icon.svg`,
    image: `${BASE_URL}/og-image.jpg`,
    telephone: COMPANY.phonesRaw[0],
    email: COMPANY.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "проспект Миру, 58/3",
      addressLocality: COMPANY.city,
      addressRegion: COMPANY.region,
      postalCode: "29027",
      addressCountry: "UA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 49.4229,
      longitude: 26.9871,
    },
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Хмельницька область",
      },
      {
        "@type": "AdministrativeArea",
        name: "Тернопільська область",
      },
      {
        "@type": "AdministrativeArea",
        name: "Вінницька область",
      },
      {
        "@type": "AdministrativeArea",
        name: "Рівненська область",
      },
      {
        "@type": "AdministrativeArea",
        name: "Житомирська область",
      },
      {
        "@type": "AdministrativeArea",
        name: "Чернівецька область",
      },
    ],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 49.4229,
        longitude: 26.9871,
      },
      geoRadius: 170000, // meters
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
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Сонячна станція для дому під ключ",
          description:
            "Гібридна СЕС 5–35 кВт з акумулятором для приватних будинків.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Сонячна станція для бізнесу",
          description:
            "Промислові гібридні СЕС 15–50 кВт з SCADA-моніторингом.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Резервне живлення",
          description:
            "Акумуляторні системи LiFePO4 з автоматичним переключенням за 10 мс.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Organization + WebSite — додаткові схеми для брендових запитів
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: COMPANY.name,
    url: BASE_URL,
    logo: `${BASE_URL}/icon.svg`,
    sameAs: [COMPANY.instagram, COMPANY.tiktok],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: COMPANY.name,
    inLanguage: "uk-UA",
    publisher: { "@id": `${BASE_URL}/#organization` },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
