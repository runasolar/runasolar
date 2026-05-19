"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, LayoutGrid } from "lucide-react";
import { useRef } from "react";
import { SERVICES } from "@/lib/data";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function Services() {
  return (
    <section id="services" className="section-pad">
      <div className="container-x">
        <Reveal>
          <SectionHeader
            index="02 / 04"
            eyebrowIcon={LayoutGrid}
            eyebrowLabel="Що ми робимо"
            title="Чотири рішення для енергонезалежності."
            description="Сонячні станції, накопичувачі енергії та системи автономного живлення під ключ — для дому й бізнесу будь-якого масштабу."
          />
        </Reveal>

        {/* Asymmetric bento: 7-5 / 5-7 spans on desktop, single column on mobile */}
        <ul className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-12 lg:gap-5">
          {SERVICES.map((s, i) => {
            const variant = i % 2 === 0 ? "light" : "dark";
            const spanClass =
              i === 0 || i === 3 ? "lg:col-span-7" : "lg:col-span-5";
            return (
              <Reveal
                as="li"
                key={s.id}
                delay={0.05 + i * 0.08}
                className={spanClass}
              >
                <ServiceCard service={s} variant={variant} />
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

// Real Unsplash photos mapped per service category.
// Domain whitelisted in next.config.mjs.
const SERVICE_IMAGES: Record<string, string> = {
  // УЗЕ — our own install: LuxPower inverters + Dyness battery cabinets
  storage: "/services/storage.webp",
  // СЕС дім — residential rooftop with solar panels at dusk
  home: "/services/home.webp",
  // СЕС бізнес — aerial of a commercial rooftop array (our install)
  business: "/services/business.webp",
  // САЖ — Huawei autonomous power system: inverter + battery cabinet + breaker panel
  ups: "/services/ups.webp",
};

function ServiceCard({
  service,
  variant,
}: {
  service: (typeof SERVICES)[number];
  variant: "light" | "dark";
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const img = SERVICE_IMAGES[service.id] ?? SERVICE_IMAGES.home;

  const isDark = variant === "dark";

  return (
    <a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href="#contact"
      aria-label={`${service.title} — залишити заявку`}
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift ${
        isDark
          ? "bg-ink text-bg"
          : "border border-line bg-bg"
      }`}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-bg-warm">
        <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
          <Image
            src={img}
            alt={`${service.title} — ${service.description.split(".")[0]}`}
            fill
            sizes="(max-width: 1024px) 100vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </motion.div>
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-t from-ink/85 via-ink/30 to-transparent"
              : "bg-gradient-to-t from-bg/40 via-transparent to-transparent"
          }`}
        />

      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 p-5 lg:p-6">
        <div>
          <div
            className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
              isDark ? "text-sun-400" : "text-leaf-600"
            }`}
          >
            {service.short}
          </div>
          <h3 className="h-display mt-2 text-xl font-semibold tracking-tight text-balance lg:text-2xl">
            {service.title}
          </h3>
          <p
            className={`mt-2.5 text-sm text-pretty ${
              isDark ? "text-bg/65" : "text-ink-muted"
            }`}
          >
            {service.description}
          </p>
        </div>

        <ul className="space-y-1.5">
          {service.bullets.map((b) => (
            <li
              key={b}
              className={`flex items-start gap-2 text-xs ${
                isDark ? "text-bg/80" : "text-ink"
              }`}
            >
              <Check
                className={`mt-0.5 h-3.5 w-3.5 flex-shrink-0 ${
                  isDark ? "text-sun-400" : "text-leaf-600"
                }`}
                strokeWidth={2.5}
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>

      </div>
    </a>
  );
}
