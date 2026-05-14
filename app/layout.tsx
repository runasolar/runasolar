import type { Metadata, Viewport } from "next";
import { Inter, Unbounded } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CursorGlow } from "@/components/CursorGlow";

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
  metadataBase: new URL("https://runasolar.com.ua"),
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
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: "https://runasolar.com.ua",
    siteName: "RUNA SOLAR",
    title: "RUNA SOLAR — Сонячні станції, що не вимикаються разом зі світлом",
    description:
      "Гібридні СЕС під ключ для дому та бізнесу. Tier-1 обладнання, гарантія до 25 років.",
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
      <body>
        <SmoothScroll />
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
