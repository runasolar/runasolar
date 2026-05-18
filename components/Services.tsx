"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Home,
  Building2,
  Battery,
  BatteryCharging,
  ArrowUpRight,
  Check,
  LayoutGrid,
} from "lucide-react";
import { useRef } from "react";
import { SERVICES } from "@/lib/data";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const ICONS: Record<string, typeof Home> = {
  storage: Battery,
  home: Home,
  business: Building2,
  ups: BatteryCharging,
};

export function Services() {
  return (
    <section id="services" className="section-pad">
      <div className="container-x">
        <Reveal>
          <SectionHeader
            index="02 / 05"
            eyebrowIcon={LayoutGrid}
            eyebrowLabel="Що ми робимо"
            title="Чотири рішення для енергонезалежності."
            description="Від накопичувача для котла й насоса до промислових 500 кВт. Підбираємо систему під ваше споживання, дах і бюджет."
          />
        </Reveal>

        {/* 4-card grid — competitor-style horizontal layout */}
        <ul className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-4 lg:gap-5">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.id] ?? Home;
            const variant = i % 2 === 0 ? "light" : "dark";
            return (
              <Reveal as="li" key={s.id} delay={0.05 + i * 0.08}>
                <ServiceCard service={s} icon={Icon} variant={variant} />
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
  // УЗЄ — close-up of monocrystalline panels (storage / energy capture vibe)
  storage:
    "https://images.unsplash.com/photo-1745187946672-2c1d8cf26a2b?w=1200&q=80&auto=format&fit=crop",
  // СЕС дім — close-up of solar panel on residential roof
  home: "https://images.unsplash.com/photo-1694248581706-a645f65a2f27?w=1200&q=80&auto=format&fit=crop",
  // СЕС бізнес — industrial / commercial roof with solar panels
  business:
    "https://images.unsplash.com/photo-1745321633881-d2d2218911bd?w=1200&q=80&auto=format&fit=crop",
  // ДБЖ — electrician working on electrical panel
  ups: "https://images.unsplash.com/photo-1758101755915-462eddc23f57?w=1200&q=80&auto=format&fit=crop",
};

function ServiceCard({
  service,
  icon: Icon,
  variant,
}: {
  service: (typeof SERVICES)[number];
  icon: typeof Home;
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
    <article
      ref={ref}
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl shadow-soft transition-shadow duration-500 hover:shadow-lift ${
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
            alt={service.title}
            fill
            priority
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

        {/* Icon badge */}
        <div className="absolute left-4 top-4">
          <span
            className={`grid h-11 w-11 place-items-center rounded-2xl backdrop-blur-md ${
              isDark
                ? "bg-bg/10 text-sun-400 ring-1 ring-bg/20"
                : "bg-bg/85 text-leaf-600 ring-1 ring-line"
            }`}
          >
            <Icon className="h-5 w-5" strokeWidth={2} />
          </span>
        </div>

        {/* Range chip */}
        <div className="absolute right-4 top-4">
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium backdrop-blur-md ${
              isDark
                ? "border border-bg/20 bg-bg/10 text-bg/85"
                : "border border-line bg-bg/90 text-ink-muted"
            }`}
          >
            {service.range}
          </span>
        </div>
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

        {/* Bottom: price + CTA arrow */}
        <div
          className={`mt-auto flex items-end justify-between pt-4 ${
            isDark ? "border-t border-bg/15" : "border-t border-line"
          }`}
        >
          <div>
            <div
              className={`text-[10px] uppercase tracking-wider ${
                isDark ? "text-bg/45" : "text-ink-soft"
              }`}
            >
              Ціна
            </div>
            <div className="h-display mt-0.5 text-sm font-semibold tabular-nums">
              {service.priceFrom}
            </div>
          </div>
          <a
            href="#contact"
            aria-label={`Замовити ${service.title}`}
            className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-all ${
              isDark
                ? "border border-bg/25 group-hover:border-sun-400 group-hover:bg-sun-400 group-hover:text-ink"
                : "border border-line group-hover:border-leaf-600 group-hover:bg-leaf-600 group-hover:text-bg"
            }`}
          >
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </a>
        </div>
      </div>
    </article>
  );
}
