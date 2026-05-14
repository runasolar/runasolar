"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Building2,
  ArrowRight,
  Info,
  Sparkles,
} from "lucide-react";
import { Magnetic } from "./Magnetic";
import { HouseScene } from "./HouseScene";
import { formatGrn } from "@/lib/utils";

type ObjectType = "home" | "business";
type PowerLevel = 0 | 1;

const POWER_KW: Record<ObjectType, [number, number]> = {
  home: [10, 35],
  business: [15, 50],
};

type HotspotData = {
  id: string;
  x: number;
  y: number;
  title: string;
  desc: string;
};

// Hotspot positions are per-(type, level) because the small/large renders
// of the same building can have different camera angles, so equipment is
// positioned differently in each.
const HOTSPOT_COPY: Record<ObjectType, Record<string, { title: string; desc: string }>> = {
  home: {
    panels: {
      title: "Tier-1 сонячні панелі",
      desc: "Монокристалічні Longi / JA Solar. Ефективність 21.5%, гарантія 25 років. Працюють при -40°C і витримують навантаження від снігу.",
    },
    inverter: {
      title: "Гібридний інвертор Deye",
      desc: "Перемикання на резерв за 10 мс — техніка не помічає блекауту. Працює з мережею, акумулятором і генератором одночасно.",
    },
    battery: {
      title: "Акумулятор LiFePO4",
      desc: "Резерв 14.4 кВт·год. 6 000+ циклів, 10 років гарантії. Запас на 8–12 годин для холодильника, насоса, котла і світла.",
    },
  },
  business: {
    panels: {
      title: "Промислові панелі",
      desc: "Tier-1 модулі 545–575 Вт. Гарантія 25 років стабільної генерації. Витримують навантаження для промислових об'єктів.",
    },
    inverter: {
      title: "3-фазний гібрид",
      desc: "Промисловий інвертор 30–50 кВт з SCADA-моніторингом. Безперервна робота під час блекаутів і резерв для критичних навантажень.",
    },
    battery: {
      title: "Резервне сховище",
      desc: "LiFePO4 30+ кВт·год для критичних навантажень. Нуль простоїв виробництва — холодильні камери, серверні, виробничі лінії працюють без перерви.",
    },
  },
};

type Pos = { x: number; y: number };

const HOTSPOT_POSITIONS: Record<ObjectType, Record<PowerLevel, Record<string, Pos>>> = {
  home: {
    0: {
      panels: { x: 54, y: 26 },
      inverter: { x: 71, y: 70 },
      battery: { x: 17, y: 73 },
    },
    1: {
      panels: { x: 43, y: 26 },
      inverter: { x: 64, y: 72 },
      battery: { x: 36, y: 78 },
    },
  },
  business: {
    0: {
      panels: { x: 50, y: 25 },
      inverter: { x: 23, y: 65 },
      battery: { x: 75, y: 69 },
    },
    1: {
      panels: { x: 50, y: 22 },
      inverter: { x: 23, y: 63 },
      battery: { x: 78, y: 67 },
    },
  },
};

function getHotspots(type: ObjectType, level: PowerLevel): HotspotData[] {
  const ids = ["panels", "inverter", "battery"] as const;
  return ids.map((id) => ({
    id,
    ...HOTSPOT_POSITIONS[type][level][id],
    ...HOTSPOT_COPY[type][id],
  }));
}

export function Hero() {
  const [type, setType] = useState<ObjectType>("home");
  const [level, setLevel] = useState<PowerLevel>(0);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const powerKw = POWER_KW[type][level];
  const yearlyUah = Math.round(powerKw * 1100 * 4.32 * 1.05);
  const panelsCount = Math.round(powerKw / 0.55);
  const paybackYears =
    type === "home" ? 4.8 - level * 0.6 : 5.5 - level * 1.0;

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-bg pt-24 lg:pt-28"
    >
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-20 z-0 h-[520px] w-[520px] rounded-full bg-sun-200/35 blur-3xl sun-pulse"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-40 h-[420px] w-[420px] rounded-full bg-leaf-100/40 blur-3xl"
      />

      <div className="container-x relative">
        {/* Centered Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="h-display mx-auto mt-6 max-w-4xl text-center text-[clamp(2.25rem,5.4vw,5rem)] font-semibold leading-[1.02] tracking-tight text-balance"
        >
          Світло вдома{" "}
          <br className="hidden sm:block" />
          навіть{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-leaf-600">
              у блекаут
            </span>
            <motion.span
              aria-hidden
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 1,
                delay: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ transformOrigin: "left" }}
              className="absolute inset-x-0 bottom-1.5 h-3 -z-0 rounded-sm bg-sun-200 lg:h-4"
            />
          </span>
        </motion.h1>

        {/* Toggle bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative z-10 mt-8 flex flex-col items-center gap-6 lg:mt-10 lg:flex-row lg:justify-center lg:gap-14"
        >
          {/* Object type */}
          <div className="flex flex-col items-center">
            <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft">
              Тип об'єкту
            </div>
            <div className="mt-2.5 inline-flex gap-1 rounded-full border border-line bg-bg p-1 shadow-soft">
              <ToggleBtn
                active={type === "home"}
                onClick={() => setType("home")}
              >
                <Home className="h-4 w-4" strokeWidth={2.2} />
                Будинок
              </ToggleBtn>
              <ToggleBtn
                active={type === "business"}
                onClick={() => setType("business")}
              >
                <Building2 className="h-4 w-4" strokeWidth={2.2} />
                Бізнес
              </ToggleBtn>
            </div>
          </div>

          {/* Power toggle */}
          <div className="flex flex-col items-center">
            <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft">
              Потужність станції
            </div>
            <div className="mt-2.5 inline-flex gap-1 rounded-full border border-line bg-bg p-1 shadow-soft">
              <ToggleBtn
                active={level === 0}
                onClick={() => setLevel(0)}
              >
                Мала
                <span className="ml-1 text-[10px] font-normal opacity-80 tabular-nums">
                  · {POWER_KW[type][0]} кВт
                </span>
              </ToggleBtn>
              <ToggleBtn
                active={level === 1}
                onClick={() => setLevel(1)}
              >
                Велика
                <span className="ml-1 text-[10px] font-normal opacity-80 tabular-nums">
                  · {POWER_KW[type][1]} кВт
                </span>
              </ToggleBtn>
            </div>
          </div>
        </motion.div>

        {/* SCENE area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-8 lg:mt-10"
        >
          {/* Floating savings card (left) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="absolute left-0 top-[6%] z-20 hidden w-[230px] overflow-hidden rounded-2xl border border-line bg-bg/95 shadow-lift backdrop-blur-md sm:block lg:left-[2%] lg:w-[260px]"
          >
            <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
              <Sparkles className="h-3.5 w-3.5 text-leaf-600" strokeWidth={2.5} />
              <div className="text-[10px] uppercase tracking-[0.18em] text-leaf-700">
                Вигода з Runa Solar
              </div>
            </div>
            <div className="px-4 py-3.5">
              <div className="text-[11px] text-ink-muted">
                Дохід від економії на електроенергії
              </div>
              <motion.div
                key={yearlyUah}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="h-display mt-1.5 text-xl font-bold tabular-nums leading-none lg:text-2xl"
              >
                {formatGrn(yearlyUah)}{" "}
                <span className="text-[11px] font-normal text-ink-muted">
                  грн/рік
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Floating payback card (right) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="absolute right-0 top-[10%] z-20 hidden w-[200px] rounded-2xl border border-line bg-bg/95 p-3.5 shadow-lift backdrop-blur-md sm:block lg:right-[2%] lg:w-[220px]"
          >
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-ink-soft">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf-400" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-leaf-600" />
              </span>
              Окупність
            </div>
            <div className="h-display mt-1.5 flex items-baseline gap-1 leading-none">
              <motion.span
                key={paybackYears}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-2xl font-bold tabular-nums lg:text-3xl"
              >
                {paybackYears.toFixed(1)}
              </motion.span>
              <span className="text-sm text-ink-muted">років</span>
            </div>
            <div className="mt-2.5 text-[11px] text-ink-muted">
              {panelsCount} панелей Tier-1
            </div>
          </motion.div>

          {/* House scene + hotspots */}
          <div className="relative mx-auto aspect-[1200/640] w-full max-w-4xl">
            <AnimatePresence mode="sync">
              <motion.div
                key={type}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <HouseScene type={type} level={level} />
              </motion.div>
            </AnimatePresence>

            {/* Hotspots overlay */}
            <div className="absolute inset-0">
              {getHotspots(type, level).map((h) => (
                <Hotspot
                  key={h.id}
                  hotspot={h}
                  active={activeHotspot === h.id}
                  onToggle={() =>
                    setActiveHotspot((prev) => (prev === h.id ? null : h.id))
                  }
                />
              ))}
            </div>
          </div>

          {/* Mobile-only stat strip — replaces floating cards on small screens */}
          <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-line bg-bg/95 px-4 py-3 shadow-soft backdrop-blur-md sm:hidden">
            <div>
              <div className="text-[9px] uppercase tracking-[0.16em] text-leaf-700">
                Економія
              </div>
              <div className="h-display mt-0.5 text-base font-bold tabular-nums leading-none">
                {formatGrn(yearlyUah)}{" "}
                <span className="text-[10px] font-normal text-ink-muted">
                  грн/рік
                </span>
              </div>
            </div>
            <div className="h-8 w-px bg-line" />
            <div>
              <div className="text-[9px] uppercase tracking-[0.16em] text-ink-soft">
                Окупність
              </div>
              <div className="h-display mt-0.5 text-base font-bold tabular-nums leading-none">
                {paybackYears.toFixed(1)}{" "}
                <span className="text-[10px] font-normal text-ink-muted">
                  років
                </span>
              </div>
            </div>
            <div className="h-8 w-px bg-line" />
            <div>
              <div className="text-[9px] uppercase tracking-[0.16em] text-ink-soft">
                Панелей
              </div>
              <div className="h-display mt-0.5 text-base font-bold tabular-nums leading-none">
                {panelsCount}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-10 flex flex-col items-center gap-4 pb-16 lg:mt-14 lg:pb-24"
        >
          <p className="h-display text-center text-lg font-medium text-ink lg:text-xl">
            Хочете такий проєкт у себе?
          </p>
          <Magnetic strength={10}>
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-leaf-600 px-8 py-4 text-base font-medium text-bg transition-colors hover:bg-leaf-700 active:scale-[0.98]"
            >
              Залишити заявку
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                strokeWidth={2.5}
              />
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Toggle button ─────────────────────────────────────────────── */
function ToggleBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium tracking-wide transition-all ${
        active
          ? "bg-leaf-600 text-bg shadow-soft"
          : "text-ink-muted hover:bg-bg-warm hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}


/* ── Hotspot marker + tooltip ───────────────────────────────────── */
function Hotspot({
  hotspot,
  active,
  onToggle,
}: {
  hotspot: HotspotData;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="absolute"
      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
    >
      <button
        onClick={onToggle}
        aria-label={hotspot.title}
        aria-expanded={active}
        className="group relative -translate-x-1/2 -translate-y-1/2"
      >
        {/* Pulsing halo */}
        <span className="absolute inset-0 -m-2 animate-ping rounded-full bg-leaf-500/30" />
        {/* Marker */}
        <span
          className={`relative grid h-7 w-7 place-items-center rounded-full ring-2 transition-all lg:h-8 lg:w-8 ${
            active
              ? "bg-leaf-700 text-bg ring-leaf-600/30"
              : "bg-bg/95 text-leaf-700 ring-leaf-600/50 group-hover:bg-leaf-600 group-hover:text-bg group-hover:ring-leaf-600/30"
          } shadow-soft backdrop-blur-sm`}
        >
          <Info className="h-3.5 w-3.5 lg:h-4 lg:w-4" strokeWidth={2.5} />
        </span>
      </button>

      <AnimatePresence>
        {active && (
          <TooltipPosition x={hotspot.x}>
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="w-[220px] rounded-2xl border border-line bg-bg p-3.5 shadow-lift sm:w-[240px] sm:p-4 lg:w-[280px]"
            >
              <div className="h-display text-sm font-semibold text-ink lg:text-base">
                {hotspot.title}
              </div>
              <div className="mt-1.5 text-xs leading-relaxed text-ink-muted lg:text-[13px]">
                {hotspot.desc}
              </div>
            </motion.div>
          </TooltipPosition>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Tooltip position wrapper — mobile: above + edge-aware, desktop: right-bottom ── */
function TooltipPosition({
  x,
  children,
}: {
  x: number;
  children: React.ReactNode;
}) {
  // Mobile (default): anchor above the hotspot, horizontally based on x-position
  //   x < 30 % → tooltip's LEFT edge at hotspot (extends right)
  //   x > 70 % → tooltip's RIGHT edge at hotspot (extends left)
  //   otherwise → centered above the hotspot
  // Desktop (lg): original right-bottom position relative to marker
  const baseClasses =
    "absolute z-30 bottom-[calc(100%+0.5rem)] lg:bottom-auto lg:left-5 lg:right-auto lg:top-5 lg:translate-x-0";
  const horizontal =
    x < 30
      ? "left-0"
      : x > 70
        ? "right-0"
        : "left-1/2 -translate-x-1/2";

  return <div className={`${baseClasses} ${horizontal}`}>{children}</div>;
}
