"use client";

import {
  ShieldCheck,
  Zap,
  Clock,
  Wallet,
  TrendingUp,
  Sun,
  Sparkles,
  Wrench,
} from "lucide-react";

type Metric = {
  value: string;
  label: string;
  icon: typeof Sun;
};

const METRICS: Metric[] = [
  { value: "+118%", label: "зростання тарифу за 3 р.", icon: TrendingUp },
  { value: "25 р.", label: "гарантія на панелі", icon: ShieldCheck },
  { value: "0.02 с", label: "перемикання на резерв", icon: Zap },
  { value: "4–6 р.", label: "окупність станції", icon: Clock },
  { value: "до 90%", label: "економії на електриці", icon: Sparkles },
  { value: "7 днів", label: "до запуску станції", icon: Wrench },
  { value: "+8%", label: "до вартості будинку", icon: Wallet },
];

export function FactsMarquee() {
  const metricsDoubled = [...METRICS, ...METRICS];

  return (
    <section
      aria-label="Ключові факти"
      className="relative overflow-hidden bg-bg py-8 lg:py-12"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg to-transparent lg:w-32"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg to-transparent lg:w-32"
      />

      {/* Metric tiles, moving left */}
      <div className="overflow-hidden">
        <div className="flex w-max animate-marquee gap-3 lg:gap-4">
          {metricsDoubled.map((m, i) => (
            <MetricTile key={`m-${i}`} {...m} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MetricTile({ value, label, icon: Icon }: Metric) {
  return (
    <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-line bg-bg px-4 py-3 lg:gap-4 lg:px-5 lg:py-3.5">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-leaf-600 text-bg lg:h-10 lg:w-10">
        <Icon className="h-4 w-4 lg:h-5 lg:w-5" strokeWidth={2} />
      </span>
      <div className="flex flex-col leading-tight">
        <span className="h-display whitespace-nowrap text-lg font-semibold tabular-nums tracking-tight text-leaf-700 lg:text-xl">
          {value}
        </span>
        <span className="whitespace-nowrap text-[11px] uppercase tracking-[0.14em] text-ink-soft lg:text-xs">
          {label}
        </span>
      </div>
    </div>
  );
}

