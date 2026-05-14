import type { Metadata, Viewport } from "next";
import { Inter, Unbounded } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CursorGlow } from "@/components/CursorGlow";
import {
  LocalBusinessJsonLd,
  OrganizationJsonLd,
  WebSiteJsonLd,
} from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";

const display = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "RUNA SOLAR — Сонячні станції під ключ у Хмельницькому",
    template: "%s | RUNA SOLAR",
  },
  description:
    "Гібридні сонячні електростанції з резервним живленням під ключ у Хмельницькому та області. Tier-1 обладнання, гарантія до 25 років, 'Зелений тариф'.",
  keywords: [
    "сонячні електростанції Хмельницький",
    "СЕС під ключ Хмельницький",
    "гібридна сонячна станція Хмельницька область",
    "сонячні панелі Хмельницький",
    "резервне живлення",
    "зелений тариф",
    "RUNA SOLAR",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: SITE_URL,
    siteName: "RUNA SOLAR",
    title: "RUNA SOLAR — Сонячні станції, що не вимикаються разом зі світлом",
    description:
      "Гібридні СЕС під ключ для дому та бізнесу. Tier-1 обладнання, гарантія до 25 років.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RUNA SOLAR — Сонячні станції під ключ у Хмельницькому",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RUNA SOLAR — Сонячні станції з резервом у Хмельницькому",
    description:
      "Гібридні СЕС під ключ. Tier-1 обладнання, гарантія до 25 років.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "j6TAr6Be_T4C13Olt9oDsTgjnP_Sgr66ahGjUYvG77o",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAFAF7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className={`${display.variable} ${sans.variable}`}>
      <head>
        <LocalBusinessJsonLd />
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body>
        <SmoothScroll />
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
