"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  MapPin,
  Phone,
  ArrowRight,
  Navigation,
  Clock,
  Map,
} from "lucide-react";
import { COMPANY } from "@/lib/data";
import { SplitText } from "./SplitText";
import { Reveal } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";
import { SectionHeader } from "./SectionHeader";

// Leaflet uses window — load only on client
const ServiceAreaMap = dynamic(() => import("./ServiceAreaMap"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center bg-bg-warm/40">
      <div className="text-xs uppercase tracking-[0.18em] text-ink-soft">
        Завантажуємо карту…
      </div>
    </div>
  ),
});

// Each direction is a compass bearing in degrees → rotates the Navigation icon
const NEIGHBOURS: {
  id: string;
  oblast: string;
  capital: string;
  km: string;
  time: string;
  direction: string;
  bearing: number;
}[] = [
  {
    id: "ter",
    oblast: "Тернопільська",
    capital: "Тернопіль",
    km: "110 км",
    time: "≈ 1 год 30 хв",
    direction: "Захід",
    bearing: 270,
  },
  {
    id: "vin",
    oblast: "Вінницька",
    capital: "Вінниця",
    km: "120 км",
    time: "≈ 1 год 40 хв",
    direction: "Схід",
    bearing: 90,
  },
  {
    id: "riv",
    oblast: "Рівненська",
    capital: "Рівне",
    km: "140 км",
    time: "≈ 2 год",
    direction: "Північ. захід",
    bearing: 315,
  },
  {
    id: "zhy",
    oblast: "Житомирська",
    capital: "Житомир",
    km: "170 км",
    time: "≈ 2 год 30 хв",
    direction: "Північ. схід",
    bearing: 45,
  },
  {
    id: "che",
    oblast: "Чернівецька",
    capital: "Чернівці",
    km: "170 км",
    time: "≈ 2 год 30 хв",
    direction: "Південь",
    bearing: 180,
  },
];

export function ServiceArea() {
  const totalObjects = 3;

  return (
    <section className="section-pad bg-bg">
      <div className="container-x">
        <Reveal>
          <SectionHeader
            index="08 / 09"
            eyebrowIcon={Map}
            eyebrowLabel="Зона роботи"
            title="Хмельницький, область і не тільки."
            description="База — у Хмельницькому. По області виїжджаємо безкоштовно. У сусідні регіони — за домовленістю."
          />
        </Reveal>

        {/* Main map card */}
        <Reveal delay={0.15}>
          <div className="mt-10 overflow-hidden rounded-3xl border border-line bg-bg shadow-soft lg:mt-14">
            <div className="grid lg:grid-cols-12">
              {/* REAL MAP — Leaflet + OSM */}
              <div className="relative col-span-12 lg:col-span-8">
                {/* Top floating badge */}
                <div className="pointer-events-none absolute left-4 top-4 z-[400] flex items-center gap-2 rounded-full border border-line bg-bg/95 px-3 py-1.5 shadow-soft backdrop-blur-md">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-leaf-600 text-bg">
                    <MapPin className="h-3 w-3" strokeWidth={2.5} />
                  </span>
                  <span className="text-xs font-medium">
                    Хмельницька область
                  </span>
                </div>

                {/* Objects pill (top-right) */}
                <div className="pointer-events-none absolute right-4 top-4 z-[400] hidden items-baseline gap-1.5 rounded-full border border-line bg-bg/95 px-3.5 py-1.5 shadow-soft backdrop-blur-md sm:flex">
                  <span className="h-display text-sm font-semibold tabular-nums text-leaf-600">
                    {totalObjects}
                  </span>
                  <span className="text-xs text-ink-muted">
                    об'єкти у Хмельницькому
                  </span>
                </div>

                <div className="h-[420px] sm:h-[520px] lg:h-[600px]">
                  <ServiceAreaMap />
                </div>

                {/* Map attribution */}
                <div className="pointer-events-none absolute bottom-2 right-2 z-[400] text-[10px] text-ink-soft">
                  © OpenStreetMap · CartoDB
                </div>
              </div>

              {/* SIDEBAR — 4 cols on desktop */}
              <div className="col-span-12 flex flex-col gap-6 border-t border-line p-6 lg:col-span-4 lg:border-l lg:border-t-0 lg:p-8">
                {/* Zones legend */}
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                    Зони обслуговування
                  </div>
                  <ul className="mt-4 space-y-3.5">
                    <ZoneRow
                      hub
                      title="Хмельницький — головна база"
                      desc="Тут наш офіс і монтажна бригада, звідси виїжджаємо до клієнтів"
                    />
                    <ZoneRow
                      color="bg-leaf-600"
                      title="Хмельницька область"
                      desc="Працюємо повноцінно, виїзд безкоштовно"
                    />
                    <ZoneRow
                      color="bg-sun-500"
                      dashed
                      title="Сусідні області"
                      desc="Тернопільська, Рівненська, Житомирська, Вінницька, Чернівецька — за домовленістю"
                    />
                  </ul>
                </div>

                <div className="divider" />

                {/* Stats */}
                <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
                  <div className="bg-bg p-4">
                    <div className="text-[10px] uppercase tracking-wider text-ink-soft">
                      Об'єктів встановлено
                    </div>
                    <div className="h-display mt-1 text-2xl font-semibold tabular-nums">
                      {totalObjects}
                    </div>
                  </div>
                  <div className="bg-bg p-4">
                    <div className="text-[10px] uppercase tracking-wider text-ink-soft">
                      Регіонів у досяжності
                    </div>
                    <div className="h-display mt-1 text-2xl font-semibold tabular-nums">
                      {NEIGHBOURS.length + 1}
                    </div>
                  </div>
                </div>

                {/* CTA — call out for distant clients */}
                <div className="mt-auto rounded-2xl border border-line bg-bg-warm/60 p-5">
                  <div className="text-sm font-medium">
                    Ви далі ніж 250 км?
                  </div>
                  <p className="mt-1 text-sm text-ink-muted">
                    Зателефонуйте — у деяких випадках виїжджаємо і далі, якщо
                    проєкт того вартий.
                  </p>
                  <a
                    href={`tel:${COMPANY.phonesRaw[0]}`}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-leaf-600 transition-colors hover:text-leaf-700"
                  >
                    <Phone className="h-4 w-4" />
                    {COMPANY.phones[0]}
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom — neighbouring oblasts grid */}
            <div className="border-t border-line bg-bg-warm/40 px-5 py-7 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                <div className="w-full sm:w-auto">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-leaf-600">
                    <Navigation className="mr-1 inline-block h-3 w-3 -translate-y-px" />
                    Сусідні регіони
                  </span>
                  <h3 className="h-display mt-2 text-lg font-semibold text-balance sm:text-xl lg:text-2xl">
                    Виїжджаємо в{" "}
                    <span className="text-leaf-600">5 областей</span>{" "}
                    за домовленістю.
                  </h3>
                </div>
                <p className="hidden text-xs text-ink-muted sm:block sm:max-w-[260px] sm:text-right">
                  Від Хмельницького — у радіусі до 170 км. Розрахунок виїзду
                  обговорюємо індивідуально.
                </p>
              </div>

              <ul className="mt-5 grid grid-cols-2 gap-2.5 sm:mt-6 sm:grid-cols-3 sm:gap-3 lg:mt-7 lg:grid-cols-5 lg:gap-3.5">
                {NEIGHBOURS.map((n, i) => (
                  <Reveal key={n.id} delay={i * 0.05} as="li">
                    <a
                      href="#contact"
                      className="group flex h-full flex-col gap-2.5 rounded-2xl border border-line bg-bg p-3 transition-all hover:-translate-y-0.5 hover:border-leaf-600/60 hover:shadow-soft sm:gap-3 sm:p-4 lg:p-5"
                    >
                      <div className="flex items-center justify-between gap-1.5">
                        <span className="flex items-center gap-1 text-[9px] uppercase tracking-[0.14em] text-ink-soft sm:text-[10px] sm:tracking-[0.16em]">
                          <span
                            className="grid h-4 w-4 shrink-0 place-items-center rounded-full border border-line bg-bg-warm transition-colors group-hover:border-leaf-600 group-hover:bg-leaf-50 sm:h-5 sm:w-5"
                            aria-hidden
                          >
                            <Navigation
                              className="h-2 w-2 text-leaf-600 sm:h-2.5 sm:w-2.5"
                              strokeWidth={2.5}
                              style={{
                                transform: `rotate(${n.bearing}deg)`,
                              }}
                            />
                          </span>
                          <span className="truncate">{n.direction}</span>
                        </span>
                        <ArrowRight className="h-3 w-3 shrink-0 text-ink-soft transition-all group-hover:translate-x-0.5 group-hover:text-leaf-600 sm:h-3.5 sm:w-3.5" />
                      </div>

                      <div className="mt-auto">
                        <div className="h-display text-base font-semibold leading-tight text-balance sm:text-lg lg:text-xl">
                          {n.oblast}
                        </div>
                        <div className="mt-0.5 text-xs text-ink-muted sm:mt-1 sm:text-sm">
                          {n.capital}
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-line pt-2 text-[10px] sm:pt-2.5 sm:text-xs">
                        <span className="h-display tabular-nums font-medium text-ink">
                          {n.km}
                        </span>
                        <span className="inline-flex items-center gap-1 text-ink-soft">
                          <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                          {n.time}
                        </span>
                      </div>
                    </a>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ZoneRow({
  hub,
  color,
  dashed,
  title,
  desc,
}: {
  hub?: boolean;
  color?: string;
  dashed?: boolean;
  title: string;
  desc: string;
}) {
  return (
    <li className="flex items-start gap-3">
      {hub ? (
        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sun-500 ring-2 ring-ink">
          <MapPin className="h-2.5 w-2.5 text-ink" strokeWidth={3} />
        </span>
      ) : (
        <span
          className={`mt-2 h-1.5 w-5 shrink-0 rounded-full ${color} ${
            dashed
              ? "[mask-image:repeating-linear-gradient(to_right,black_0,black_3px,transparent_3px,transparent_5px)]"
              : ""
          }`}
        />
      )}
      <div className="flex-1">
        <div className="text-sm font-medium text-ink">{title}</div>
        <div className="mt-0.5 text-xs text-ink-muted">{desc}</div>
      </div>
    </li>
  );
}
