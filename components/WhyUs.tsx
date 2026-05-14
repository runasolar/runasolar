"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Award,
  Hammer,
  FileCheck2,
  Headphones,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { WHY_US } from "@/lib/data";
import { Reveal } from "./Reveal";
import { SplitText } from "./SplitText";
import { SectionEyebrow } from "./SectionEyebrow";
import { SectionHeader } from "./SectionHeader";

const ICONS = {
  ShieldCheck,
  Zap,
  Award,
  Hammer,
  FileCheck2,
  Headphones,
} as const;

export function WhyUs() {
  const featured = WHY_US.find((x) => x.featured)!;
  const rest = WHY_US.filter((x) => !x.featured);

  return (
    <section className="bg-bg py-6 lg:py-10">
      <div className="container-x">
        <div className="relative overflow-clip rounded-[2rem] bg-ink text-bg lg:rounded-[3rem]">
          {/* Decorative background */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-leaf-600/25 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-40 bottom-0 h-[520px] w-[520px] rounded-full bg-sun-500/15 blur-3xl"
          />
          {/* Subtle grid texture */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgb(var(--color-bg)) 1px, transparent 1px), linear-gradient(to right, rgb(var(--color-bg)) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />

          <div className="relative px-5 py-16 lg:px-10 lg:py-24">
        <Reveal>
          <SectionHeader
            index="09 / 09"
            eyebrowIcon={Sparkles}
            eyebrowLabel="Чому RUNA SOLAR"
            variant="onDark"
            title="Шість речей, які роблять нас різними."
            description="Не маркетингові обіцянки, а технічні рішення і людський підхід, який ми витримуємо роками."
          />
        </Reveal>

        {/* Bento grid */}
        <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-12 lg:gap-5">
          {/* Featured card */}
          <Reveal delay={0.05} className="lg:col-span-7 lg:row-span-2">
            <FeaturedCard item={featured} />
          </Reveal>

          {/* Remaining 5 cards */}
          {rest.map((item, i) => (
            <Reveal
              key={item.title}
              delay={0.1 + i * 0.06}
              className={
                i < 2
                  ? "lg:col-span-5"
                  : "lg:col-span-4"
              }
            >
              <FeatureCard item={item} />
            </Reveal>
          ))}
        </div>

        {/* Footer CTA strip */}
        <Reveal delay={0.4}>
          <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-3xl border border-bg/15 bg-bg/5 p-6 lg:mt-16 lg:flex-row lg:items-center lg:p-8">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-sun-400">
                Готові побачити свій будинок з СЕС?
              </div>
              <p className="h-display mt-2 max-w-xl text-xl font-semibold text-balance text-bg lg:text-2xl">
                Залиште заявку — інженер передзвонить за 30 хвилин і дасть
                орієнтовну ціну.
              </p>
            </div>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-sun-500 px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-sun-400"
            >
              Залишити заявку
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={2.5}
              />
            </a>
          </div>
        </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Featured card (big, with illustration) ───────────────────────── */

function FeaturedCard({ item }: { item: (typeof WHY_US)[number] }) {
  const Icon = ICONS[item.icon as keyof typeof ICONS];
  return (
    <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-bg/15 bg-gradient-to-br from-leaf-700 to-leaf-900 p-7 transition-all duration-500 hover:border-sun-400/40 lg:p-10">
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-sun-400/20 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 right-10 h-40 w-40 rounded-full bg-leaf-400/20 blur-2xl"
      />

      <div className="relative">
        <div className="flex items-center gap-3">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-sun-400 text-ink shadow-lg ring-1 ring-bg/10">
            <Icon className="h-6 w-6" strokeWidth={2.2} />
          </span>
          <span className="rounded-full border border-bg/20 bg-bg/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-sun-400">
            Головна перевага
          </span>
        </div>

        <h3 className="h-display mt-7 text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-[1.05] tracking-tight text-balance">
          {item.title}
        </h3>
        <p className="mt-4 max-w-lg text-base text-bg/75 text-pretty lg:text-lg">
          {item.text}
        </p>
      </div>

      {/* Stat block */}
      <div className="relative mt-10 flex items-end justify-between gap-6 border-t border-bg/10 pt-7">
        <div>
          <div className="h-display flex items-baseline gap-1 leading-none">
            <span className="text-[clamp(3rem,7vw,5.5rem)] font-semibold tabular-nums text-sun-400">
              {item.stat}
            </span>
            <span className="text-2xl text-sun-400/80 lg:text-3xl">
              {item.statSuffix}
            </span>
          </div>
          <div className="mt-2 text-xs uppercase tracking-[0.16em] text-bg/55 lg:text-sm">
            {item.statLabel}
          </div>
        </div>

        {/* Mini lightning visualization */}
        <div className="hidden items-end gap-1 sm:flex">
          {[14, 22, 18, 30, 24, 38, 28, 44].map((h, i) => (
            <motion.span
              key={i}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                delay: 0.4 + i * 0.05,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                height: `${h * 1.2}px`,
                transformOrigin: "bottom",
              }}
              className="block w-1.5 rounded-sm bg-sun-400"
            />
          ))}
        </div>
      </div>
    </article>
  );
}

/* ── Regular feature card ─────────────────────────────────────────── */

function FeatureCard({ item }: { item: (typeof WHY_US)[number] }) {
  const Icon = ICONS[item.icon as keyof typeof ICONS];
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-bg/15 bg-bg/[0.03] p-6 transition-all duration-500 hover:border-sun-400/30 hover:bg-bg/[0.06] lg:p-7">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-sun-400/0 blur-2xl transition-opacity duration-500 group-hover:bg-sun-400/15"
      />

      <div className="relative flex items-center justify-between gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-bg/8 text-sun-400 ring-1 ring-bg/10">
          <Icon className="h-5 w-5" strokeWidth={2} />
        </span>
        <div className="text-right">
          <div className="h-display text-2xl font-semibold tabular-nums leading-none text-bg lg:text-3xl">
            {item.stat}
            <span className="ml-0.5 text-sun-400">{item.statSuffix}</span>
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-wider text-bg/45">
            {item.statLabel}
          </div>
        </div>
      </div>

      <h3 className="h-display mt-6 text-xl font-semibold text-balance text-bg lg:text-2xl">
        {item.title}
      </h3>
      <p className="mt-2.5 text-sm text-bg/65 text-pretty lg:text-base">
        {item.text}
      </p>
    </article>
  );
}
