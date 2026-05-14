"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { TrendingUp, ZapOff, Wallet, ArrowRight, Lightbulb } from "lucide-react";
import { Reveal } from "./Reveal";
import { SplitText } from "./SplitText";
import { CountUp } from "./CountUp";
import { SectionEyebrow } from "./SectionEyebrow";
import { SectionHeader } from "./SectionHeader";

type Item = {
  id: string;
  label: string;
  short: string;
  problem: string;
  solution: string;
  metricValue: number;
  metricSuffix: string;
  metricLabel: string;
  icon: typeof TrendingUp;
};

const ITEMS: Item[] = [
  {
    id: "tariff",
    label: "Тарифи зростають",
    short: "Тариф",
    problem:
      "За останні роки електрика для побутових споживачів подорожчала більш ніж удвічі. І це не межа.",
    solution:
      "Власна сонячна станція фіксує вашу собівартість кВт·год на 25 років. Тариф НКРЕКП на вас більше не діє.",
    metricValue: 118,
    metricSuffix: "%",
    metricLabel: "зростання тарифу за 3 роки",
    icon: TrendingUp,
  },
  {
    id: "blackout",
    label: "Блекаути зупиняють життя",
    short: "Блекаут",
    problem:
      "Графіки відключень — це 4–12 годин на добу без світла, котла, інтернету та холодильника.",
    solution:
      "Гібрид з акумулятором тримає основні лінії без перебоїв. Перемикання на резерв за 0,02 секунди.",
    metricValue: 0.02,
    metricSuffix: " с",
    metricLabel: "перемикання на резерв",
    icon: ZapOff,
  },
  {
    id: "asset",
    label: "Витрати замість активу",
    short: "Інвестиція",
    problem:
      "Кожна платіжка йде «в нікуди». Десятки тисяч гривень на рік — це просто витрата без сліду.",
    solution:
      "Станція окупається за 4–6 років і працює 25. На додачу — підвищує вартість нерухомості.",
    metricValue: 8,
    metricSuffix: "%",
    metricLabel: "до вартості будинку",
    icon: Wallet,
  },
];

const ROTATE_MS = 10000;

export function ProblemSolution() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { margin: "-30%" });

  useEffect(() => {
    if (!inView) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % ITEMS.length), ROTATE_MS);
    return () => clearTimeout(id);
  }, [active, inView]);

  const current = ITEMS[active];

  return (
    <section
      ref={sectionRef}
      className="section-pad bg-bg"
    >
      <div className="container-x">
        <Reveal>
          <SectionHeader
            index="01 / 09"
            eyebrowIcon={Lightbulb}
            eyebrowLabel="Чому зараз"
            title="Власні кіловати — це вже не питання моди."
            description="Три причини, через які господарі переходять на сонце сьогодні — а не «колись потім»."
          />
        </Reveal>

        {/* Tabs */}
        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-wrap gap-2 lg:mt-16 lg:gap-3">
            {ITEMS.map((it, i) => {
              const isActive = i === active;
              return (
                <button
                  key={it.id}
                  onClick={() => setActive(i)}
                  className={`group flex items-center gap-2.5 rounded-full border py-2 pl-2 pr-4 text-sm font-medium transition-all lg:py-2 lg:pl-2 lg:pr-5 lg:text-base ${
                    isActive
                      ? "border-leaf-600 bg-leaf-600 text-bg"
                      : "border-line bg-bg py-2.5 pl-4 text-ink-muted hover:border-ink hover:text-ink lg:py-3 lg:pl-5"
                  }`}
                >
                  {isActive ? (
                    <span className="relative grid h-8 w-8 shrink-0 place-items-center">
                      {/* Background ring */}
                      <svg
                        className="absolute inset-0 -rotate-90"
                        viewBox="0 0 32 32"
                      >
                        <circle
                          cx="16"
                          cy="16"
                          r="14"
                          fill="none"
                          stroke="#E8B340"
                          strokeOpacity="0.25"
                          strokeWidth="2"
                        />
                        {inView && (
                          <motion.circle
                            key={`${active}-ring`}
                            cx="16"
                            cy="16"
                            r="14"
                            fill="none"
                            stroke="#E8B340"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeDasharray={2 * Math.PI * 14}
                            initial={{ strokeDashoffset: 2 * Math.PI * 14 }}
                            animate={{ strokeDashoffset: 0 }}
                            transition={{
                              duration: ROTATE_MS / 1000,
                              ease: "linear",
                            }}
                          />
                        )}
                      </svg>
                      <it.icon
                        className="relative h-3.5 w-3.5 text-sun-400"
                        strokeWidth={2.5}
                      />
                    </span>
                  ) : (
                    <it.icon className="h-4 w-4 lg:ml-0" strokeWidth={2} />
                  )}
                  <span className="hidden sm:inline">{it.label}</span>
                  <span className="sm:hidden">{it.short}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Active card */}
        <Reveal delay={0.2}>
          <div className="mt-6 overflow-hidden rounded-3xl border border-line bg-bg shadow-soft lg:mt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="grid lg:grid-cols-12"
              >
                {/* Left — visual */}
                <div className="relative col-span-12 overflow-hidden bg-ink p-6 lg:col-span-7 lg:p-12">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sun-400/15 blur-3xl"
                  />
                  <Visual id={current.id} />
                </div>

                {/* Right — text */}
                <div className="col-span-12 flex flex-col justify-between gap-8 p-6 lg:col-span-5 lg:gap-10 lg:p-12">
                  <div>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-ink-soft">
                      <span className="h-1 w-6 bg-ink-soft" />
                      Проблема
                    </div>
                    <p className="mt-3 text-lg text-ink text-pretty lg:text-xl">
                      {current.problem}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-leaf-600">
                      <span className="h-1 w-6 bg-leaf-600" />
                      Як це знімає станція
                    </div>
                    <p className="mt-3 text-base text-ink-muted text-pretty lg:text-lg">
                      {current.solution}
                    </p>
                  </div>

                  <a
                    href="#calculator"
                    className="group inline-flex items-center gap-2 self-start text-sm font-medium text-leaf-600 transition-colors hover:text-leaf-700"
                  >
                    Порахувати на моєму будинку
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Visual layer per tab ─────────────────────────────────────────── */
function Visual({ id }: { id: string }) {
  if (id === "tariff") return <TariffViz />;
  if (id === "blackout") return <BlackoutViz />;
  return <AssetViz />;
}

function MetricBlock({
  value,
  prefix,
  suffix,
  decimals,
  label,
}: {
  value: number;
  prefix?: string;
  suffix: string;
  decimals?: number;
  label: string;
}) {
  return (
    <div className="text-bg">
      <div className="text-xs uppercase tracking-[0.22em] text-bg/50">
        {label}
      </div>
      <div className="h-display mt-2 flex items-baseline gap-1 text-[clamp(3rem,8vw,7rem)] font-semibold leading-none tabular-nums">
        {prefix && <span className="text-sun-400">{prefix}</span>}
        {decimals ? (
          <span className="tabular-nums">{value.toFixed(decimals)}</span>
        ) : (
          <CountUp to={value} />
        )}
        <span className="text-3xl text-sun-400 lg:text-5xl">{suffix}</span>
      </div>
    </div>
  );
}

/* — Tariff: animated bar chart of rising prices — */
function TariffViz() {
  const bars = [
    { y: "2021", v: 1.68, h: 32 },
    { y: "2022", v: 1.68, h: 32 },
    { y: "2023", v: 2.64, h: 50 },
    { y: "2024", v: 4.32, h: 82 },
    { y: "сьогодні", v: 4.32, h: 82, hl: true },
  ];
  return (
    <div className="flex h-full flex-col justify-between gap-8">
      <MetricBlock value={118} prefix="+" suffix="%" label="зростання тарифу" />

      <div className="rounded-2xl border border-bg/10 bg-bg/[0.03] p-5">
        <div className="mb-4 flex items-center justify-between text-xs text-bg/60">
          <span>Тариф для населення, ₴ / кВт·год</span>
          <span className="rounded-full bg-bg/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-bg/70">
            НКРЕКП
          </span>
        </div>
        <div className="flex items-end gap-3 lg:gap-5">
          {bars.map((b, i) => (
            <div key={b.y} className="flex flex-1 flex-col items-center gap-2">
              <div className="relative flex h-32 w-full items-end lg:h-40">
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.15 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    height: `${b.h}%`,
                    transformOrigin: "bottom",
                  }}
                  className={`w-full rounded-t-md ${
                    b.hl ? "bg-sun-500" : "bg-bg/25"
                  }`}
                />
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <span
                  className={`text-[10px] uppercase tracking-wider lg:text-xs ${
                    b.hl ? "text-sun-400" : "text-bg/50"
                  }`}
                >
                  {b.y}
                </span>
                <span
                  className={`text-[10px] tabular-nums lg:text-xs ${
                    b.hl ? "font-semibold text-sun-400" : "text-bg/35"
                  }`}
                >
                  {b.v.toFixed(2)} ₴
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* — Blackout: line that drops and is caught by backup — */
function BlackoutViz() {
  return (
    <div className="flex h-full flex-col justify-between gap-8">
      <MetricBlock
        value={0.02}
        suffix=" с"
        decimals={2}
        label="перемикання на резерв"
      />

      <div className="rounded-2xl border border-bg/10 bg-bg/[0.03] p-5">
        <div className="mb-4 flex items-center justify-between text-xs text-bg/60">
          <span>Напруга в розетці під час блекауту</span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-sun-400" />
            <span className="text-[10px] uppercase tracking-wider text-sun-400">
              акумулятор
            </span>
          </span>
        </div>

        <svg viewBox="0 0 400 140" className="h-32 w-full lg:h-40">
          <defs>
            <linearGradient id="bo-grid" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#FAFAF7" stopOpacity="0.08" />
              <stop offset="1" stopColor="#FAFAF7" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* horizontal grid */}
          {[0.25, 0.5, 0.75].map((p) => (
            <line
              key={p}
              x1="0"
              x2="400"
              y1={140 * p}
              y2={140 * p}
              stroke="#FAFAF7"
              strokeOpacity="0.06"
              strokeDasharray="2 4"
            />
          ))}

          {/* Mains line — sharply drops at x=180, ends at x=210 */}
          <motion.path
            d="M 0,40 L 178,40 L 182,120 L 210,120"
            fill="none"
            stroke="#8A938D"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Backup line — picks up at the switch point */}
          <motion.path
            d="M 180,40 L 400,40"
            fill="none"
            stroke="#E8B340"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Pulse exactly at switch point (180, 40) */}
          <motion.circle
            cx="180"
            cy="40"
            r="4"
            fill="#E8B340"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.4 }}
          />
          <circle cx="180" cy="40" r="8" fill="none" stroke="#E8B340" strokeWidth="1" opacity="0.5">
            <animate attributeName="r" values="5;13;5" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0;0.6" dur="1.8s" repeatCount="indefinite" />
          </circle>

          {/* Labels */}
          <text x="40" y="32" fill="#FAFAF7" fillOpacity="0.45" fontSize="9" letterSpacing="1">
            МЕРЕЖА
          </text>
          <text x="280" y="32" fill="#E8B340" fontSize="9" letterSpacing="1" fontWeight="600">
            RUNA SOLAR
          </text>
        </svg>

        <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-wider text-bg/50">
          <span>відключення</span>
          <span>живлення продовжується</span>
        </div>
      </div>
    </div>
  );
}

/* — Asset: investment growing area chart — */
function AssetViz() {
  // path for filled area showing cumulative savings over 25 years
  return (
    <div className="flex h-full flex-col justify-between gap-8">
      <MetricBlock value={8} prefix="+" suffix="%" label="до вартості будинку" />

      <div className="rounded-2xl border border-bg/10 bg-bg/[0.03] p-5">
        <div className="mb-4 flex items-center justify-between text-xs text-bg/60">
          <span>Кумулятивна економія, тис. ₴</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-bg/40" />
              <span className="text-[10px] uppercase tracking-wider">
                витрати
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-leaf-400" />
              <span className="text-[10px] uppercase tracking-wider text-leaf-400">
                актив
              </span>
            </span>
          </div>
        </div>

        <svg viewBox="0 0 400 140" className="h-32 w-full lg:h-40">
          <defs>
            <linearGradient id="asset-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#5A8C66" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#5A8C66" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Without solar — slow value loss (linear 25y scale: x = years * 16) */}
          <motion.path
            d="M 0,30 L 80,55 L 160,80 L 240,98 L 320,112 L 400,120"
            fill="none"
            stroke="#8A938D"
            strokeWidth="2"
            strokeDasharray="3 4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4 }}
          />
          <text x="318" y="112" fill="#8A938D" fontSize="9" letterSpacing="1">
            БЕЗ СЕС
          </text>

          {/* With solar — growth curve crossing grey line at x=80 (year 5) */}
          <motion.path
            d="M 0,120 L 40,108 L 80,55 L 160,32 L 240,20 L 320,12 L 400,8 L 400,125 L 0,125 Z"
            fill="url(#asset-fill)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.4 }}
          />
          <motion.path
            d="M 0,120 L 40,108 L 80,55 L 160,32 L 240,20 L 320,12 L 400,8"
            fill="none"
            stroke="#5A8C66"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Break-even marker — at x=80 (5 years), exactly where the curves cross */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            <line x1="80" x2="80" y1="22" y2="125" stroke="#E8B340" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
            <circle cx="80" cy="55" r="5" fill="#E8B340" stroke="#1A1F1B" strokeWidth="1.5" />
            <rect x="52" y="4" width="56" height="18" rx="9" fill="#E8B340" />
            <text x="80" y="16" fill="#1A1F1B" fontSize="9" fontWeight="700" textAnchor="middle">
              окупність
            </text>
          </motion.g>

          {/* Years axis (text-anchor middle so labels sit ON tick) */}
          <g fill="#FAFAF7" fillOpacity="0.4" fontSize="9" textAnchor="middle">
            <text x="14" y="138">0 р.</text>
            <text x="80" y="138">5</text>
            <text x="160" y="138">10</text>
            <text x="240" y="138">15</text>
            <text x="392" y="138">25</text>
          </g>
        </svg>
      </div>
    </div>
  );
}
