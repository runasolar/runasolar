"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Building2,
  ArrowRight,
  Sparkles,
  BatteryCharging,
  Plug,
  ChevronDown,
  Sun,
  Calculator as CalculatorIcon,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { SplitText } from "./SplitText";
import { Magnetic } from "./Magnetic";
import { SectionEyebrow } from "./SectionEyebrow";
import { SectionHeader } from "./SectionHeader";
import { formatGrn } from "@/lib/utils";

type ObjectType = "home" | "business";
type StationType = "grid" | "hybrid";

const TARIFF = 4.32;
const PEAK_SUN_HOURS = 3.5;
const INFLATION = 1.12; // 12% / year
const YEARS = 25;

const PRESETS_HOME = [1500, 2500, 4000, 6000];
const PRESETS_BIZ = [8000, 15000, 25000, 50000];

export function Calculator() {
  const [type, setType] = useState<ObjectType>("home");
  const [stationType, setStationType] = useState<StationType>("hybrid");
  const [bill, setBill] = useState(2500);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const presets = type === "home" ? PRESETS_HOME : PRESETS_BIZ;
  const maxBill = type === "home" ? 8000 : 60000;
  const minBill = 500;

  const result = useMemo(() => {
    const monthlyKwh = bill / TARIFF;
    const yearlyKwh = monthlyKwh * 12;
    const recommendedKw = Math.max(
      type === "home" ? 5 : 15,
      Math.ceil(yearlyKwh / 365 / PEAK_SUN_HOURS)
    );
    const pricePerKw = type === "home" ? 38000 : 32000;
    const basePrice = recommendedKw * pricePerKw;
    const totalPrice =
      stationType === "hybrid" ? Math.round(basePrice * 1.3) : basePrice;
    const yearlySavings = bill * 12 * 0.85;
    const payback = +(totalPrice / yearlySavings).toFixed(1);

    // Cumulative 25-year savings with tariff inflation, minus upfront investment
    let withoutCum = 0;
    for (let y = 1; y <= YEARS; y++) {
      withoutCum += bill * 12 * Math.pow(INFLATION, y - 1);
    }
    const total25 = Math.max(0, withoutCum - totalPrice);

    // Pricing breakdown (approximate)
    const panelsCost = Math.round(totalPrice * 0.45);
    const inverterCost = Math.round(totalPrice * 0.18);
    const batteryCost =
      stationType === "hybrid" ? Math.round(totalPrice * 0.22) : 0;
    const otherCost = totalPrice - panelsCost - inverterCost - batteryCost;

    return {
      recommendedKw,
      totalPrice,
      yearlySavings,
      payback,
      total25,
      basePrice,
      breakdown: {
        panels: panelsCost,
        inverter: inverterCost,
        battery: batteryCost,
        other: otherCost,
      },
    };
  }, [bill, type, stationType]);

  return (
    <section id="calculator" className="section-pad bg-bg">
      <div className="container-x">
        <Reveal>
          <SectionHeader
            index="05 / 09"
            eyebrowIcon={CalculatorIcon}
            eyebrowLabel="Калькулятор економії"
            title="Скільки ви збережете за 25 років?"
            description="Орієнтовний прорахунок за хвилину. Точну ціну дамо після виїзду інженера — безкоштовно."
          />
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 overflow-hidden rounded-3xl border border-line bg-bg shadow-soft lg:mt-14">
            <div className="grid lg:grid-cols-12">
              {/* ── LEFT: Inputs + House visual ─────────────────────── */}
              <div className="col-span-12 flex flex-col gap-8 p-6 lg:col-span-5 lg:gap-10 lg:p-10">
                {/* Inputs */}
                <div className="space-y-7">
                  {/* Type */}
                  <div>
                    <label className="text-sm font-medium text-ink">
                      Тип об'єкта
                    </label>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {(
                        [
                          { id: "home", label: "Дім", Icon: Home },
                          { id: "business", label: "Бізнес", Icon: Building2 },
                        ] as const
                      ).map(({ id, label, Icon }) => (
                        <button
                          key={id}
                          onClick={() => {
                            setType(id);
                            setBill(id === "home" ? 2500 : 15000);
                          }}
                          className={`flex items-center justify-center gap-2 rounded-2xl border px-4 py-3.5 text-sm font-medium transition-all ${
                            type === id
                              ? "border-leaf-600 bg-leaf-50 text-leaf-700"
                              : "border-line bg-bg text-ink-muted hover:border-ink"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Station type */}
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-ink">
                        Тип станції
                      </label>
                      <span className="text-xs text-ink-soft">
                        впливає на ціну та автономність
                      </span>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {(
                        [
                          {
                            id: "grid",
                            label: "Мережева",
                            sub: "дешевша",
                            Icon: Plug,
                          },
                          {
                            id: "hybrid",
                            label: "Гібрид",
                            sub: "з резервом",
                            Icon: BatteryCharging,
                          },
                        ] as const
                      ).map(({ id, label, sub, Icon }) => (
                        <button
                          key={id}
                          onClick={() => setStationType(id)}
                          className={`flex flex-col items-start gap-1 rounded-2xl border px-4 py-3 text-left transition-all ${
                            stationType === id
                              ? "border-leaf-600 bg-leaf-50"
                              : "border-line bg-bg hover:border-ink"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <Icon
                              className={`h-4 w-4 ${
                                stationType === id
                                  ? "text-leaf-600"
                                  : "text-ink-muted"
                              }`}
                            />
                            <span
                              className={`text-sm font-medium ${
                                stationType === id ? "text-leaf-700" : "text-ink"
                              }`}
                            >
                              {label}
                            </span>
                          </span>
                          <span
                            className={`text-xs ${
                              stationType === id
                                ? "text-leaf-600"
                                : "text-ink-soft"
                            }`}
                          >
                            {sub}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bill */}
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="bill"
                        className="text-sm font-medium text-ink"
                      >
                        Місячний рахунок за світло
                      </label>
                      <span className="h-display text-lg font-semibold tabular-nums">
                        {formatGrn(bill)} ₴
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {presets.map((p) => (
                        <button
                          key={p}
                          onClick={() => setBill(p)}
                          className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                            bill === p
                              ? "border-leaf-600 bg-leaf-600 text-bg"
                              : "border-line bg-bg text-ink-muted hover:border-ink hover:text-ink"
                          }`}
                        >
                          {formatGrn(p)} ₴
                        </button>
                      ))}
                    </div>

                    <input
                      id="bill"
                      type="range"
                      min={minBill}
                      max={maxBill}
                      step={100}
                      value={bill}
                      onChange={(e) => setBill(+e.target.value)}
                      className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-line accent-leaf-600"
                    />
                    <div className="mt-2 flex justify-between text-xs text-ink-soft tabular-nums">
                      <span>{formatGrn(minBill)} ₴</span>
                      <span>{formatGrn(maxBill)} ₴</span>
                    </div>
                  </div>
                </div>

                {/* House visualization */}
                <HouseVisual
                  kw={result.recommendedKw}
                  hybrid={stationType === "hybrid"}
                />
              </div>

              {/* ── RIGHT: Results dashboard ───────────────────────── */}
              <div className="relative col-span-12 overflow-hidden bg-leaf-700 p-6 text-bg lg:col-span-7 lg:p-10">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sun-400/25 blur-3xl"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-16 -left-12 h-44 w-44 rounded-full bg-leaf-400/20 blur-3xl"
                />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-bg/70">
                      <Sparkles className="h-3.5 w-3.5 text-sun-400" />
                      Ваш орієнтир
                    </div>
                    <span className="rounded-full border border-bg/20 bg-bg/5 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-bg/60">
                      Live
                    </span>
                  </div>

                  {/* Hero metric */}
                  <div className="mt-6">
                    <div className="text-xs uppercase tracking-[0.2em] text-bg/55">
                      Чистий прибуток за {YEARS} років
                    </div>
                    <div className="h-display mt-2 flex items-baseline gap-1.5 leading-none">
                      <AnimatedNumber
                        value={Math.round(result.total25)}
                        formatter={formatGrn}
                        className="text-[clamp(2.5rem,7vw,5rem)] font-semibold tabular-nums text-sun-400"
                      />
                      <span className="text-2xl text-bg/70 lg:text-3xl">₴</span>
                    </div>
                    <div className="mt-2 text-sm text-bg/60">
                      з урахуванням щорічного зростання тарифу{" "}
                      <span className="text-bg">+{((INFLATION - 1) * 100) | 0}%</span>
                    </div>

                    {/* Context chips */}
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <div className="inline-flex items-center gap-1.5 rounded-full border border-sun-400/30 bg-sun-400/10 px-3 py-1.5 text-xs text-bg">
                        <Sparkles className="h-3 w-3 text-sun-400" strokeWidth={2.5} />
                        ≈{" "}
                        <span className="tabular-nums font-semibold text-sun-400">
                          {formatGrn(Math.round(result.total25 / YEARS / 12))}
                        </span>{" "}
                        ₴/міс до бюджету
                      </div>
                      <div className="inline-flex items-center gap-1.5 rounded-full border border-bg/15 bg-bg/5 px-3 py-1.5 text-xs text-bg/85">
                        повертає інвестицію в{" "}
                        <span className="tabular-nums font-semibold text-bg">
                          ×{((result.total25 + result.totalPrice) / result.totalPrice).toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 4 metric grid */}
                  <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-bg/10 lg:mt-10">
                    <Stat
                      label="Потужність станції"
                      animKey={`${type}-${bill}-${stationType}-kw`}
                      v={result.recommendedKw}
                      suffix=" кВт"
                    />
                    <Stat
                      label="Орієнтовна ціна"
                      animKey={`${type}-${bill}-${stationType}-pr`}
                      v={result.totalPrice}
                      suffix=" ₴"
                      formatter={formatGrn}
                    />
                    <Stat
                      label="Економія / рік"
                      animKey={`${type}-${bill}-yr`}
                      v={result.yearlySavings}
                      suffix=" ₴"
                      formatter={formatGrn}
                    />
                    <Stat
                      label="Окупність"
                      animKey={`${type}-${bill}-${stationType}-pb`}
                      v={result.payback}
                      suffix=" р."
                      decimals={1}
                    />
                  </div>


                  {/* Pricing breakdown — collapsible */}
                  <div className="mt-6 lg:mt-8">
                    <button
                      onClick={() => setShowBreakdown((v) => !v)}
                      className="flex w-full items-center justify-between rounded-2xl border border-bg/15 bg-bg/5 px-5 py-3.5 text-left transition-colors hover:bg-bg/10"
                    >
                      <span className="text-sm font-medium text-bg">
                        Що входить у ціну
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-bg/60 transition-transform ${
                          showBreakdown ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {showBreakdown && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <BreakdownStacked
                            total={result.totalPrice}
                            items={[
                              {
                                label: "Сонячні панелі (Tier-1)",
                                value: result.breakdown.panels,
                                color: "bg-sun-500",
                                dotColor: "bg-sun-500",
                              },
                              {
                                label: "Гібридний інвертор",
                                value: result.breakdown.inverter,
                                color: "bg-leaf-400",
                                dotColor: "bg-leaf-400",
                              },
                              ...(result.breakdown.battery > 0
                                ? [
                                    {
                                      label: "Акумулятор LiFePO4",
                                      value: result.breakdown.battery,
                                      color: "bg-sky-mist",
                                      dotColor: "bg-sky-mist",
                                    },
                                  ]
                                : []),
                              {
                                label: "Монтаж + документи",
                                value: result.breakdown.other,
                                color: "bg-bg/35",
                                dotColor: "bg-bg/35",
                              },
                            ]}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Magnetic strength={6} className="mt-6 block lg:mt-8">
                    <a
                      href="#contact"
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-sun-500 px-6 py-4 text-sm font-medium text-ink transition-colors hover:bg-sun-400"
                    >
                      Замовити точний прорахунок
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        strokeWidth={2.5}
                      />
                    </a>
                  </Magnetic>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="mt-5 text-center text-xs text-ink-soft lg:mt-6">
            * Розрахунок орієнтовний. Реальні цифри залежать від орієнтації даху,
            затінення, обраного обладнання та чинного тарифу.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Atoms ─────────────────────────────────────────────────────────── */

function Stat({
  label,
  animKey,
  v,
  suffix,
  formatter,
  decimals,
}: {
  label: string;
  animKey: string;
  v: number;
  suffix: string;
  formatter?: (n: number) => string;
  decimals?: number;
}) {
  return (
    <div className="bg-leaf-700 p-4 lg:p-5">
      <div className="text-[10px] uppercase tracking-wider text-bg/55">
        {label}
      </div>
      <div className="h-display mt-1 text-xl font-semibold tabular-nums text-bg lg:text-2xl">
        <AnimatedNumber
          key={animKey}
          value={v}
          formatter={formatter}
          decimals={decimals}
        />
        <span className="text-base font-normal text-bg/60">{suffix}</span>
      </div>
    </div>
  );
}

function AnimatedNumber({
  value,
  formatter,
  decimals,
  className,
}: {
  value: number;
  formatter?: (n: number) => string;
  decimals?: number;
  className?: string;
}) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={value}
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -12, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`inline-block ${className ?? ""}`}
      >
        {formatter
          ? formatter(value)
          : decimals
            ? value.toFixed(decimals)
            : value}
      </motion.span>
    </AnimatePresence>
  );
}

function BreakdownStacked({
  total,
  items,
}: {
  total: number;
  items: { label: string; value: number; color: string; dotColor: string }[];
}) {
  return (
    <div className="space-y-4 px-2 py-4">
      {/* Stacked bar */}
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-bg/8">
        {items.map((item, i) => {
          const pct = (item.value / total) * 100;
          return (
            <motion.div
              key={item.label}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`h-full ${item.color}`}
            />
          );
        })}
      </div>

      {/* Legend grid */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {items.map((item, i) => {
          const pct = Math.round((item.value / total) * 100);
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.2 + i * 0.05 }}
              className="flex items-start gap-2.5"
            >
              <span
                className={`mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-sm ${item.dotColor}`}
              />
              <div className="min-w-0 flex-1">
                <div className="text-xs leading-tight text-bg/80">
                  {item.label}
                </div>
                <div className="mt-0.5 text-xs tabular-nums text-bg">
                  {formatGrn(item.value)} ₴{" "}
                  <span className="text-bg/55">· {pct}%</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}


/* ── House visual: photoreal render ───────────────────────────────── */

function HouseVisual({ kw, hybrid }: { kw: number; hybrid: boolean }) {
  // Panel count scales with kW: 1 panel ≈ 0.55 kW
  const panelCount = Math.max(6, Math.round(kw / 0.55));

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-bg-warm/60">
      <div className="flex items-center justify-between px-5 pb-2 pt-4">
        <div className="text-xs uppercase tracking-[0.18em] text-ink-soft">
          Ваша станція
        </div>
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-ink-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-leaf-600" />
          {panelCount} панелей · {kw} кВт
        </div>
      </div>

      <div className="relative aspect-[3/2] w-full bg-bg-warm">
        <Image
          src="/hero/calculator-home.webp"
          alt="Будинок з сонячною станцією, інвертором та акумулятором"
          fill
          sizes="(max-width: 768px) 100vw, 500px"
          className="object-contain"
        />
      </div>

      <div className="flex items-center justify-between px-5 py-3 text-xs">
        <span className="flex items-center gap-1.5 text-ink-muted">
          <Sun className="h-3 w-3 text-sun-500" />
          {hybrid ? "Гібрид з акумулятором" : "Мережева станція"}
        </span>
        <span className="text-ink-soft">південна сторона даху</span>
      </div>
    </div>
  );
}

