"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { COMPANY } from "@/lib/data";
import { LegalModal, type LegalDocKey } from "./LegalModal";
import {
  IconInstagram,
  IconTikTok,
  IconTelegram,
  IconViber,
} from "./BrandIcons";

const SERVICES_LINKS = [
  { href: "#services", label: "Установки зберігання енергії" },
  { href: "#services", label: "СЕС для дому" },
  { href: "#services", label: "СЕС для бізнесу" },
  { href: "#services", label: "Системи автономного живлення" },
];

const QUICK_LINKS = [
  { href: "#services", label: "Послуги" },
  { href: "#cases", label: "Проєкти" },
  { href: "#calculator", label: "Калькулятор" },
  { href: "#contact", label: "Контакти" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const [legalOpen, setLegalOpen] = useState<LegalDocKey | null>(null);

  return (
    <footer className="relative overflow-hidden border-t border-leaf-700/40 bg-leaf-900 pb-28 text-bg lg:pb-16">
      {/* Subtle decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-sun-400/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-leaf-400/15 blur-3xl"
      />

      <div className="container-x relative">
        {/* MAIN: 4-column grid */}
        <div className="grid gap-10 pt-16 lg:grid-cols-12 lg:gap-12 lg:pt-20">
          {/* Column 1: brand + description + socials */}
          <div className="lg:col-span-5">
            <a
              href="#top"
              className="inline-flex items-center"
              aria-label="RUNA SOLAR — на головну"
            >
              <Image
                src="/logo-light.png"
                alt="RUNA SOLAR"
                width={180}
                height={64}
                className="h-16 w-auto sm:h-20"
              />
            </a>

            <p className="mt-5 max-w-sm text-base text-bg/70 text-pretty">
              Гібридні сонячні станції з резервним живленням під ключ.
              Хмельницький та область — виїжджаємо безкоштовно, документи
              робимо ми.
            </p>

            {/* Socials */}
            <div className="mt-6">
              <div className="text-[10px] uppercase tracking-[0.2em] text-bg/50">
                Соцмережі
              </div>
              <div className="mt-3 flex gap-2">
                <SocialBtn href={COMPANY.instagram} label="Instagram">
                  <IconInstagram className="h-4 w-4" />
                </SocialBtn>
                <SocialBtn href={COMPANY.tiktok} label="TikTok">
                  <IconTikTok className="h-4 w-4" />
                </SocialBtn>
                <SocialBtn
                  href={`https://t.me/${COMPANY.phonesRaw[0].replace("+", "")}`}
                  label="Telegram"
                >
                  <IconTelegram className="h-4 w-4" />
                </SocialBtn>
                <SocialBtn
                  href={`viber://chat?number=${COMPANY.phonesRaw[0]}`}
                  label="Viber"
                >
                  <IconViber className="h-4 w-4" />
                </SocialBtn>
              </div>
            </div>
          </div>

          {/* Column 2: services */}
          <div className="lg:col-span-2">
            <div className="text-[10px] uppercase tracking-[0.2em] text-bg/50">
              Послуги
            </div>
            <ul className="mt-4 space-y-3">
              {SERVICES_LINKS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="group inline-flex items-center gap-1 text-sm text-bg/85 transition-colors hover:text-sun-400"
                  >
                    {s.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: site nav */}
          <div className="lg:col-span-2">
            <div className="text-[10px] uppercase tracking-[0.2em] text-bg/50">
              Сайт
            </div>
            <ul className="mt-4 space-y-3">
              {QUICK_LINKS.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="group inline-flex items-center gap-1 text-sm text-bg/85 transition-colors hover:text-sun-400"
                  >
                    {n.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: contacts + hours */}
          <div className="lg:col-span-3">
            <div className="text-[10px] uppercase tracking-[0.2em] text-bg/50">
              Контакти
            </div>
            <ul className="mt-4 space-y-3">
              {COMPANY.phones.map((p, i) => (
                <li key={p}>
                  <a
                    href={`tel:${COMPANY.phonesRaw[i]}`}
                    className="inline-flex items-start gap-2.5 text-sm text-bg/85 transition-colors hover:text-sun-400"
                  >
                    <Phone className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-sun-400" />
                    <span className="h-display tabular-nums">{p}</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="inline-flex items-start gap-2.5 text-sm text-bg/85 transition-colors hover:text-sun-400"
                >
                  <Mail className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-sun-400" />
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <a
                  href={COMPANY.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-sm text-bg/85 transition-colors hover:text-sun-400"
                >
                  <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-sun-400" />
                  <span>
                    {COMPANY.addressStreet}
                    <br />
                    <span className="text-xs text-bg/55">
                      {COMPANY.addressCity}, {COMPANY.postalCode}
                    </span>
                  </span>
                </a>
              </li>
            </ul>

            {/* Working hours card */}
            <div className="mt-5 rounded-2xl border border-bg/15 bg-bg/[0.04] p-3.5">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-sun-400">
                <Clock className="h-3 w-3" />
                Графік роботи
              </div>
              <div className="mt-2 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-bg/70">Пн–Пт</span>
                  <span className="h-display tabular-nums text-bg">9:00–19:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-bg/70">Сб</span>
                  <span className="h-display tabular-nums text-bg">10:00–17:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-bg/70">Нд</span>
                  <span className="text-bg/50">вихідний</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-10 h-px bg-bg/15 lg:my-14" />

        {/* BOTTOM: legal + © */}
        <div className="flex flex-col items-start gap-4 text-sm text-bg/55 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>© {year} {COMPANY.name}</span>
            <span className="hidden lg:inline">·</span>
            <span>Усі права захищено</span>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <button
              type="button"
              onClick={() => setLegalOpen("privacy")}
              className="transition-colors hover:text-bg"
            >
              Політика конфіденційності
            </button>
            <button
              type="button"
              onClick={() => setLegalOpen("offer")}
              className="transition-colors hover:text-bg"
            >
              Публічна оферта
            </button>
            <a href="#contact" className="transition-colors hover:text-bg">
              Зв'язатись
            </a>
          </div>
        </div>
      </div>

      <LegalModal open={legalOpen} onClose={() => setLegalOpen(null)} />
    </footer>
  );
}

function SocialBtn({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group grid h-10 w-10 place-items-center rounded-full border border-bg/15 bg-bg/[0.04] transition-all hover:-translate-y-0.5 hover:border-bg/40 hover:bg-bg/10"
    >
      {children}
    </a>
  );
}
