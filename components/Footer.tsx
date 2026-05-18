"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Instagram,
  Music2,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import { COMPANY, NAV } from "@/lib/data";
import { LegalModal, type LegalDocKey } from "./LegalModal";

const SERVICES_LINKS = [
  { href: "#services", label: "Установки збереження енергії" },
  { href: "#services", label: "СЕС для дому" },
  { href: "#services", label: "СЕС для бізнесу" },
  { href: "#services", label: "Системи безперебійного живлення" },
];

const QUICK_LINKS = [
  { href: "#calculator", label: "Калькулятор" },
  { href: "#process", label: "Як працюємо" },
  { href: "#cases", label: "Проєкти" },
  { href: "#contact", label: "Контакти" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const [legalOpen, setLegalOpen] = useState<LegalDocKey | null>(null);

  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg pb-28 lg:pb-16">
      {/* Subtle decorative blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-sun-200/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-leaf-100/40 blur-3xl"
      />

      <div className="container-x relative">
        {/* MAIN: 4-column grid */}
        <div className="grid gap-10 pt-16 lg:grid-cols-12 lg:gap-12 lg:pt-20">
          {/* Column 1: brand + description + socials + alt channels */}
          <div className="lg:col-span-5">
            <a
              href="#top"
              className="inline-flex items-center"
              aria-label="RUNA SOLAR — на головну"
            >
              <Image
                src="/logo.png"
                alt="RUNA SOLAR"
                width={180}
                height={64}
                className="h-16 w-auto sm:h-20"
              />
            </a>

            <p className="mt-5 max-w-sm text-base text-ink-muted text-pretty">
              Гібридні сонячні станції з резервним живленням під ключ.
              Хмельницький та область — виїжджаємо безкоштовно, документи
              робимо ми.
            </p>

            {/* Socials */}
            <div className="mt-6">
              <div className="text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                Соцмережі
              </div>
              <div className="mt-3 flex gap-2">
                <SocialBtn
                  href={COMPANY.instagram}
                  icon={Instagram}
                  label="Instagram"
                />
                <SocialBtn
                  href={COMPANY.tiktok}
                  icon={Music2}
                  label="TikTok"
                />
                <SocialBtn
                  href={`https://t.me/${COMPANY.phonesRaw[0].replace("+", "")}`}
                  icon={Send}
                  label="Telegram"
                />
                <SocialBtn
                  href={`viber://chat?number=${COMPANY.phonesRaw[0]}`}
                  icon={MessageCircle}
                  label="Viber"
                />
              </div>
            </div>

          </div>

          {/* Column 2: services */}
          <div className="lg:col-span-2">
            <div className="text-[10px] uppercase tracking-[0.2em] text-ink-soft">
              Послуги
            </div>
            <ul className="mt-4 space-y-3">
              {SERVICES_LINKS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="group inline-flex items-center gap-1 text-sm text-ink transition-colors hover:text-leaf-600"
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
            <div className="text-[10px] uppercase tracking-[0.2em] text-ink-soft">
              Сайт
            </div>
            <ul className="mt-4 space-y-3">
              {QUICK_LINKS.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="group inline-flex items-center gap-1 text-sm text-ink transition-colors hover:text-leaf-600"
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
            <div className="text-[10px] uppercase tracking-[0.2em] text-ink-soft">
              Контакти
            </div>
            <ul className="mt-4 space-y-3">
              {COMPANY.phones.map((p, i) => (
                <li key={p}>
                  <a
                    href={`tel:${COMPANY.phonesRaw[i]}`}
                    className="inline-flex items-start gap-2.5 text-sm text-ink transition-colors hover:text-leaf-600"
                  >
                    <Phone className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-leaf-600" />
                    <span className="h-display tabular-nums">{p}</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="inline-flex items-start gap-2.5 text-sm text-ink transition-colors hover:text-leaf-600"
                >
                  <Mail className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-leaf-600" />
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <a
                  href={COMPANY.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-sm text-ink transition-colors hover:text-leaf-600"
                >
                  <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-leaf-600" />
                  <span>
                    {COMPANY.addressStreet}
                    <br />
                    <span className="text-xs text-ink-soft">
                      {COMPANY.addressCity}, {COMPANY.postalCode}
                    </span>
                  </span>
                </a>
              </li>
            </ul>

            {/* Working hours card */}
            <div className="mt-5 rounded-2xl border border-line bg-bg-warm/60 p-3.5">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-leaf-600">
                <Clock className="h-3 w-3" />
                Графік роботи
              </div>
              <div className="mt-2 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-ink-muted">Пн–Пт</span>
                  <span className="h-display tabular-nums">9:00–19:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Сб</span>
                  <span className="h-display tabular-nums">10:00–17:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Нд</span>
                  <span className="text-ink-soft">вихідний</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-10 h-px bg-line lg:my-14" />

        {/* BOTTOM: legal + © */}
        <div className="flex flex-col items-start gap-4 text-sm text-ink-soft lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>© {year} {COMPANY.name}</span>
            <span className="hidden lg:inline">·</span>
            <span>Усі права захищено</span>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <button
              type="button"
              onClick={() => setLegalOpen("privacy")}
              className="transition-colors hover:text-ink"
            >
              Політика конфіденційності
            </button>
            <button
              type="button"
              onClick={() => setLegalOpen("offer")}
              className="transition-colors hover:text-ink"
            >
              Публічна оферта
            </button>
            <a href="#contact" className="transition-colors hover:text-ink">
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
  icon: Icon,
  label,
}: {
  href: string;
  icon: typeof Instagram;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group grid h-10 w-10 place-items-center rounded-full border border-line bg-bg transition-all hover:-translate-y-0.5 hover:border-leaf-600 hover:bg-leaf-600 hover:text-bg hover:shadow-soft"
    >
      <Icon className="h-4 w-4" strokeWidth={2} />
    </a>
  );
}
