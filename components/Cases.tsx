"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowUpRight,
  Quote,
  MapPin,
  Zap,
  Wallet,
  Clock,
  LayoutGrid,
  Briefcase,
} from "lucide-react";
import { useRef } from "react";
import { CASES } from "@/lib/data";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function Cases() {
  const totalKw = CASES.reduce((s, c) => s + c.powerKw, 0);
  const totalYearly = CASES.reduce((s, c) => s + c.yearlyKwh, 0);
  const totalPanels = CASES.reduce((s, c) => s + c.panels, 0);

  const [featured, ...rest] = CASES;

  return (
    <section id="cases" className="relative section-pad overflow-clip">
      {/* Background decor */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-60 h-[500px] w-[500px] rounded-full bg-leaf-100/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-20 h-[420px] w-[420px] rounded-full bg-sun-200/30 blur-3xl"
      />

      <div className="container-x relative">
        <Reveal>
          <SectionHeader
            index="07 / 09"
            eyebrowIcon={Briefcase}
            eyebrowLabel="Наші кейси"
            title="Реальні об'єкти у вашому регіоні."
            description="Три встановлені станції у Хмельницькому — приватний дім, готель і виробничий цех. Реальні цифри генерації та окупності."
            right={
              <a href="#contact" className="btn-secondary group">
                Хочу так само
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            }
          />
        </Reveal>

        {/* Aggregate stats strip */}
        <Reveal delay={0.15}>
          <div className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:mt-10">
            <Aggregate label="Сумарна потужність" value={`${totalKw} кВт`} />
            <Aggregate
              label="Генерують щорічно"
              value={`${(totalYearly / 1000).toFixed(0)}+ тис. кВт·год`}
            />
            <Aggregate label="Tier-1 панелей" value={`${totalPanels} шт`} />
          </div>
        </Reveal>

        {/* Bento grid: 1 featured + 2 compact */}
        <ul className="mt-8 grid gap-5 lg:mt-10 lg:auto-rows-fr lg:grid-cols-12 lg:gap-6">
          <Reveal as="li" delay={0.1} className="lg:col-span-7 lg:row-span-2">
            <FeaturedCase c={featured} />
          </Reveal>
          {rest.map((c, i) => (
            <Reveal
              key={c.title}
              as="li"
              delay={0.2 + i * 0.1}
              className="lg:col-span-5"
            >
              <CompactCase c={c} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Featured (large) case ───────────────────────────────────────── */

function FeaturedCase({ c }: { c: (typeof CASES)[number] }) {
  const tilt = useTilt(2);
  const isBusiness = c.type === "Бізнес";

  return (
    <motion.article
      ref={tilt.ref}
      onMouseMove={tilt.onMove}
      onMouseLeave={tilt.onLeave}
      style={{
        rotateX: tilt.rx,
        rotateY: tilt.ry,
        transformPerspective: 1400,
      }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-bg shadow-soft will-change-transform"
    >
      {/* IMAGE */}
      <div className="relative aspect-[16/10] overflow-hidden bg-bg-warm lg:aspect-[16/9]">
        <Image
          src={c.image}
          alt={c.title}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/15 to-transparent" />

        {/* Featured ribbon */}
        <div className="absolute left-3 top-3 flex items-center gap-1.5 sm:left-5 sm:top-5 sm:gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-sun-400 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-ink shadow-soft sm:gap-1.5 sm:px-3 sm:py-1 sm:text-[10px] sm:tracking-[0.16em]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink/60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ink" />
            </span>
            Featured
          </span>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-medium backdrop-blur-md sm:px-3 sm:py-1 sm:text-xs ${
              isBusiness ? "bg-ink/80 text-bg" : "bg-bg/95 text-ink"
            }`}
          >
            {c.type}
          </span>
        </div>

        {/* Power chip */}
        <div className="absolute right-3 top-3 sm:right-5 sm:top-5">
          <span className="h-display inline-flex items-center gap-1 rounded-full bg-bg/95 px-2.5 py-1 text-sm font-bold tabular-nums text-ink shadow-lift sm:gap-1.5 sm:px-4 sm:py-2 sm:text-base">
            <Zap className="h-3.5 w-3.5 text-sun-500 sm:h-4 sm:w-4" strokeWidth={2.5} />
            {c.power}
          </span>
        </div>

        {/* Title + location overlay */}
        <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6 lg:inset-x-8 lg:bottom-8">
          <div className="flex items-center gap-1 text-[10px] uppercase tracking-[0.14em] text-bg/85 sm:gap-1.5 sm:text-xs sm:tracking-[0.16em]">
            <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            {c.location}
          </div>
          <h3 className="h-display mt-1.5 text-xl font-semibold leading-tight text-bg sm:mt-2 sm:text-2xl lg:text-4xl">
            {c.title.split(",")[0]}
          </h3>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col gap-4 p-4 sm:gap-6 sm:p-6 lg:gap-7 lg:p-8">
        {/* Metric row — horizontal */}
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <BigMetric
            icon={Zap}
            label="Генерація / рік"
            value={c.yearly.replace(" / рік", "")}
          />
          <BigMetric
            icon={Wallet}
            label="Економія / рік"
            value={c.savings.replace(" / рік", "")}
          />
          <BigMetric icon={Clock} label="Окупність" value={c.payback} />
          <BigMetric
            icon={LayoutGrid}
            label="Панелей"
            value={`${c.panels} шт`}
          />
        </ul>

        {/* Quote */}
        <div className="relative flex items-start gap-3 rounded-2xl border border-line bg-bg-warm/60 p-4 sm:p-5 lg:p-6">
          <Quote
            className="absolute -top-2 left-4 h-4 w-4 -translate-y-1/2 bg-bg-warm px-0.5 text-leaf-600 sm:left-5 sm:h-5 sm:w-5"
            strokeWidth={2}
          />
          <div className="flex-1">
            <p className="text-sm text-ink text-pretty sm:text-base lg:text-lg">{c.quote}</p>
            <div className="mt-2.5 flex items-center gap-2.5 sm:mt-3">
              <span className="h-display grid h-8 w-8 shrink-0 place-items-center rounded-full bg-leaf-600 text-xs font-semibold text-bg sm:h-9 sm:w-9 sm:text-sm">
                {initials(c.client)}
              </span>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-ink">{c.client}</div>
                <div className="text-xs text-ink-soft">Власник станції</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Compact (small) case ────────────────────────────────────────── */

function CompactCase({ c }: { c: (typeof CASES)[number] }) {
  const tilt = useTilt(3);
  const isBusiness = c.type === "Бізнес";

  return (
    <motion.article
      ref={tilt.ref}
      onMouseMove={tilt.onMove}
      onMouseLeave={tilt.onLeave}
      style={{
        rotateX: tilt.rx,
        rotateY: tilt.ry,
        transformPerspective: 1200,
      }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-bg shadow-soft will-change-transform"
    >
      {/* IMAGE */}
      <div className="relative aspect-[16/9] overflow-hidden bg-bg-warm">
        <Image
          src={c.image}
          alt={c.title}
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />

        {/* Type chip */}
        <div className="absolute left-4 top-4">
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium backdrop-blur-md ${
              isBusiness ? "bg-ink/80 text-bg" : "bg-bg/95 text-ink"
            }`}
          >
            {c.type}
          </span>
        </div>

        {/* Power chip */}
        <div className="absolute right-4 top-4">
          <span className="h-display inline-flex items-center gap-1 rounded-full bg-sun-500 px-3 py-1 text-sm font-bold tabular-nums text-ink">
            <Zap className="h-3 w-3" strokeWidth={2.5} />
            {c.power}
          </span>
        </div>

        {/* Title overlay */}
        <div className="absolute inset-x-4 bottom-3.5">
          <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-bg/75">
            <MapPin className="h-2.5 w-2.5" />
            {c.location.split(",")[0]}
          </div>
          <h3 className="h-display mt-1 text-base font-semibold leading-tight text-bg lg:text-lg">
            {c.title.split(",")[0]}
          </h3>
        </div>
      </div>

      {/* CONTENT — compact */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        <ul className="grid grid-cols-2 gap-2">
          <SmallMetric
            icon={Wallet}
            label="Економія"
            value={c.savings.replace(" / рік", "/рік")}
          />
          <SmallMetric icon={Clock} label="Окупність" value={c.payback} />
        </ul>

        {/* Compact quote */}
        <div className="flex items-start gap-2 border-t border-line pt-4">
          <Quote className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-leaf-600" strokeWidth={2} />
          <p className="line-clamp-2 text-xs text-ink-muted text-pretty">
            "{c.quote}" <span className="text-ink-soft">— {c.client}</span>
          </p>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Tilt hook ───────────────────────────────────────────────────── */

function useTilt(intensity = 4) {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useTransform(
    useSpring(my, { stiffness: 200, damping: 20 }),
    [0, 1],
    [intensity, -intensity]
  );
  const ry = useTransform(
    useSpring(mx, { stiffness: 200, damping: 20 }),
    [0, 1],
    [-intensity, intensity]
  );

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return { ref, rx, ry, onMove, onLeave };
}

/* ── Metric components ──────────────────────────────────────────── */

function BigMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Zap;
  label: string;
  value: string;
}) {
  return (
    <li className="rounded-xl border border-line bg-bg-warm/40 p-3 sm:p-3.5 lg:p-4">
      <div className="flex items-center gap-1.5">
        <Icon className="h-3 w-3 shrink-0 text-leaf-600 sm:h-3.5 sm:w-3.5" strokeWidth={2} />
        <div className="truncate text-[9px] uppercase tracking-wider text-ink-soft sm:text-[10px]">
          {label}
        </div>
      </div>
      <div className="h-display mt-1.5 truncate text-sm font-semibold tabular-nums leading-tight text-ink sm:text-base lg:text-lg">
        {value}
      </div>
    </li>
  );
}

function SmallMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Zap;
  label: string;
  value: string;
}) {
  return (
    <li className="flex items-start gap-2">
      <Icon className="mt-0.5 h-3 w-3 flex-shrink-0 text-leaf-600" strokeWidth={2} />
      <div className="min-w-0">
        <div className="text-[9px] uppercase tracking-wider text-ink-soft">
          {label}
        </div>
        <div className="h-display mt-0.5 truncate text-sm font-semibold tabular-nums leading-tight text-ink">
          {value}
        </div>
      </div>
    </li>
  );
}

function Aggregate({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-bg p-4 lg:p-6">
      <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft lg:text-xs">
        {label}
      </div>
      <div className="h-display mt-1.5 text-xl font-semibold tabular-nums leading-tight lg:text-3xl">
        {value}
      </div>
    </div>
  );
}

/* ── Utils ───────────────────────────────────────────────────────── */

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "";
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
