"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Home,
  Building2,
  Battery,
  ArrowUpRight,
  Check,
  Sparkles,
  LayoutGrid,
} from "lucide-react";
import { useRef } from "react";
import { SERVICES } from "@/lib/data";
import { Reveal } from "./Reveal";
import { SplitText } from "./SplitText";
import { SectionEyebrow } from "./SectionEyebrow";
import { SectionHeader } from "./SectionHeader";

const ICONS = { home: Home, business: Building2, backup: Battery } as const;

export function Services() {
  const homeService = SERVICES.find((s) => s.id === "home")!;
  const businessService = SERVICES.find((s) => s.id === "business")!;
  const backupService = SERVICES.find((s) => s.id === "backup")!;

  return (
    <section id="services" className="section-pad">
      <div className="container-x">
        <Reveal>
          <SectionHeader
            index="02 / 09"
            eyebrowIcon={LayoutGrid}
            eyebrowLabel="Послуги"
            title="Три рішення для трьох різних потреб."
            description="Підбираємо систему під ваше споживання та бюджет — від простого резерву до промислових 500 кВт."
          />
        </Reveal>

        {/* Bento grid */}
        <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-12 lg:gap-6">
          {/* Featured: СЕС для дому */}
          <Reveal delay={0.05} className="lg:col-span-7 lg:row-span-2">
            <FeaturedCard
              service={homeService}
              icon={ICONS.home}
            />
          </Reveal>

          {/* Secondary: Бізнес */}
          <Reveal delay={0.15} className="lg:col-span-5">
            <DarkCard service={businessService} icon={ICONS.business} />
          </Reveal>

          {/* Secondary: Резерв */}
          <Reveal delay={0.25} className="lg:col-span-5">
            <GreenCard service={backupService} icon={ICONS.backup} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Featured (light, big with image) ─────────────────────────────── */
function FeaturedCard({
  service,
  icon: Icon,
}: {
  service: (typeof SERVICES)[number];
  icon: typeof Home;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <article
      ref={ref}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-bg shadow-soft transition-shadow duration-500 hover:shadow-lift"
    >
      {/* Featured tag */}
      <div className="absolute left-5 top-5 z-10 flex items-center gap-1.5 rounded-full bg-sun-500 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink lg:left-7 lg:top-7">
        <Sparkles className="h-3 w-3" strokeWidth={2.5} />
        Найпопулярніше
      </div>

      {/* Big image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-bg-warm lg:aspect-[16/9]">
        <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
          <Image
            src="/hero/services-closeup.webp"
            alt="Сонячні панелі на даху приватного будинку"
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg/30 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-6 p-6 lg:gap-8 lg:p-10">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-leaf-600 text-bg">
            <Icon className="h-5 w-5" strokeWidth={2} />
          </span>
          <span className="chip">{service.range}</span>
        </div>

        <div>
          <h3 className="h-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold tracking-tight text-balance">
            {service.title}
          </h3>
          <p className="mt-3 text-base text-ink-muted text-pretty lg:text-lg">
            {service.description}
          </p>
        </div>

        <ul className="grid gap-2.5 sm:grid-cols-2">
          {service.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-sm">
              <Check
                className="mt-0.5 h-4 w-4 flex-shrink-0 text-leaf-600"
                strokeWidth={2.5}
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-end sm:justify-between sm:gap-3">
          <div>
            <div className="text-xs uppercase tracking-wider text-ink-soft">
              Ціна
            </div>
            <div className="h-display mt-1 text-2xl font-semibold tabular-nums lg:text-3xl">
              {service.priceFrom}
            </div>
          </div>
          <a
            href="#contact"
            className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-bg transition-colors hover:bg-leaf-700 sm:w-auto"
          >
            Замовити прорахунок
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
              strokeWidth={2}
            />
          </a>
        </div>
      </div>
    </article>
  );
}

/* ── Dark secondary (Business) ────────────────────────────────────── */
function DarkCard({
  service,
  icon: Icon,
}: {
  service: (typeof SERVICES)[number];
  icon: typeof Building2;
}) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-ink p-6 text-bg shadow-soft transition-all duration-500 hover:shadow-lift lg:p-8">
      {/* Decorative lines (industrial vibe) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(250,250,247,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-sun-400/10 blur-3xl"
      />

      <div className="relative flex flex-1 flex-col gap-5 lg:gap-6">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-bg/10 text-sun-400 ring-1 ring-bg/15">
            <Icon className="h-5 w-5" strokeWidth={2} />
          </span>
          <span className="rounded-full border border-bg/15 bg-bg/5 px-3 py-1 text-xs font-medium text-bg/70">
            {service.range}
          </span>
        </div>

        <div>
          <h3 className="h-display text-2xl font-semibold tracking-tight text-balance lg:text-3xl">
            {service.title}
          </h3>
          <p className="mt-2.5 text-sm text-bg/65 text-pretty lg:text-base">
            {service.description}
          </p>
        </div>

        <ul className="space-y-2">
          {service.bullets.slice(0, 2).map((b) => (
            <li
              key={b}
              className="flex items-start gap-2 text-sm text-bg/85"
            >
              <Check
                className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-sun-400"
                strokeWidth={2.5}
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-end justify-between border-t border-bg/10 pt-5">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-bg/40">
              Ціна
            </div>
            <div className="h-display mt-0.5 text-base font-medium tabular-nums">
              {service.priceFrom}
            </div>
          </div>
          <a
            href="#contact"
            aria-label={`Замовити ${service.title}`}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-bg/20 transition-all group-hover:border-sun-400 group-hover:bg-sun-400 group-hover:text-ink"
          >
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </a>
        </div>
      </div>
    </article>
  );
}

/* ── Green accent secondary (Backup) ──────────────────────────────── */
function GreenCard({
  service,
  icon: Icon,
}: {
  service: (typeof SERVICES)[number];
  icon: typeof Battery;
}) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-leaf-700 p-6 text-bg shadow-soft transition-all duration-500 hover:shadow-lift lg:p-8">
      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-sun-400/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -left-12 h-44 w-44 rounded-full bg-leaf-400/20 blur-3xl"
      />

      <div className="relative flex flex-1 flex-col gap-5 lg:gap-6">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-bg/15 text-bg ring-1 ring-bg/20">
            <Icon className="h-5 w-5" strokeWidth={2} />
          </span>
          <span className="rounded-full border border-bg/25 bg-bg/10 px-3 py-1 text-xs font-medium">
            {service.range}
          </span>
        </div>

        <div>
          <h3 className="h-display text-2xl font-semibold tracking-tight text-balance lg:text-3xl">
            {service.title}
          </h3>
          <p className="mt-2.5 text-sm text-bg/85 text-pretty lg:text-base">
            {service.description}
          </p>
        </div>

        <ul className="space-y-2">
          {service.bullets.slice(0, 2).map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm">
              <Check
                className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-sun-400"
                strokeWidth={2.5}
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-end justify-between border-t border-bg/15 pt-5">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-bg/60">
              Ціна
            </div>
            <div className="h-display mt-0.5 text-base font-medium tabular-nums">
              {service.priceFrom}
            </div>
          </div>
          <a
            href="#contact"
            aria-label={`Замовити ${service.title}`}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-bg/30 transition-all group-hover:border-sun-400 group-hover:bg-sun-400 group-hover:text-ink"
          >
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </a>
        </div>
      </div>
    </article>
  );
}
