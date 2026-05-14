"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Sun, Moon, Cloud, Battery, Clock, Sunrise, Sunset } from "lucide-react";
import { SplitText } from "./SplitText";
import { Reveal } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";
import { SectionHeader } from "./SectionHeader";

// 24 hours of typical generation vs consumption (kW) + battery state (%)
const HOURS = [
  { h: 0, gen: 0, cons: 0.7, bat: 70 },
  { h: 1, gen: 0, cons: 0.6, bat: 60 },
  { h: 2, gen: 0, cons: 0.5, bat: 52 },
  { h: 3, gen: 0, cons: 0.5, bat: 44 },
  { h: 4, gen: 0, cons: 0.5, bat: 38 },
  { h: 5, gen: 0.1, cons: 0.6, bat: 33 },
  { h: 6, gen: 0.5, cons: 1.2, bat: 30 },
  { h: 7, gen: 1.5, cons: 1.8, bat: 30 },
  { h: 8, gen: 3.2, cons: 2.0, bat: 38 },
  { h: 9, gen: 5.5, cons: 1.5, bat: 55 },
  { h: 10, gen: 7.8, cons: 1.4, bat: 75 },
  { h: 11, gen: 9.4, cons: 1.5, bat: 90 },
  { h: 12, gen: 10.0, cons: 1.8, bat: 100 },
  { h: 13, gen: 9.7, cons: 1.7, bat: 100 },
  { h: 14, gen: 8.8, cons: 1.5, bat: 100 },
  { h: 15, gen: 7.0, cons: 1.4, bat: 100 },
  { h: 16, gen: 4.9, cons: 1.6, bat: 95 },
  { h: 17, gen: 2.8, cons: 2.2, bat: 90 },
  { h: 18, gen: 1.0, cons: 3.4, bat: 82 },
  { h: 19, gen: 0.2, cons: 4.0, bat: 75 },
  { h: 20, gen: 0, cons: 3.6, bat: 70 },
  { h: 21, gen: 0, cons: 2.5, bat: 78 },
  { h: 22, gen: 0, cons: 1.6, bat: 76 },
  { h: 23, gen: 0, cons: 1.0, bat: 73 },
];

const W = 1000;
const H = 540;
const PADDING = { l: 56, r: 36, t: 150, b: 60 };
const MAX = 11;
const ARC_HEIGHT = 64;
const SKY_BOTTOM = PADDING.t - 14; // baseline where the sun "sits" on the horizon
const STRIP_Y = 30;
const CYCLE_SECONDS = 36; // one full day-night cycle takes 36 s

const innerW = W - PADDING.l - PADDING.r;
const innerH = H - PADDING.t - PADDING.b;

function scaleX(h: number) {
  return PADDING.l + (h / 23) * innerW;
}
function scaleY(v: number) {
  return PADDING.t + (1 - v / MAX) * innerH;
}

function buildPath(key: "gen" | "cons", close = false) {
  const pts = HOURS.map((p) => `${scaleX(p.h)},${scaleY(p[key])}`);
  let d = `M ${pts[0]} ` + pts.slice(1).map((p) => `L ${p}`).join(" ");
  if (close) {
    d += ` L ${scaleX(23)},${scaleY(0)} L ${scaleX(0)},${scaleY(0)} Z`;
  }
  return d;
}

const HIGHLIGHTS = [
  { icon: Moon, hour: "00:00 – 06:00", label: "Ніч на акумуляторі", note: "до 100% автономії" },
  { icon: Sun, hour: "12:00", label: "Пік генерації", note: "10 кВт у мережу" },
  { icon: Cloud, hour: "16:00", label: "Заряджаємо акумулятор", note: "до 100% запасу" },
  { icon: Battery, hour: "20:00 – 22:00", label: "Перехід на резерв", note: "плавно, без перебоїв" },
];

function useDayCycle(active: boolean) {
  const [t, setT] = useState(8);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    let last = performance.now();
    // Start near sunrise so the first thing user sees is the sun rising
    let elapsed = (8 / 24) * CYCLE_SECONDS * 1000;

    const tick = () => {
      const now = performance.now();
      const dt = now - last;
      last = now;
      elapsed = (elapsed + dt) % (CYCLE_SECONDS * 1000);
      setT((elapsed / (CYCLE_SECONDS * 1000)) * 24);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);
  return t;
}

const SUN_START = 6;
const SUN_END = 19;
const FADE = 1.0; // cross-fade window (hours on each side of horizon)

// Smooth cosine ease — turns linear progress 0..1 into eased 0..1
function easeInOut(x: number) {
  return 0.5 - 0.5 * Math.cos(Math.PI * Math.max(0, Math.min(1, x)));
}

// Returns sun's opacity at time t (0..1). Moon opacity = 1 - sunOpacity.
function sunOpacity(t: number) {
  if (t < SUN_START - FADE || t > SUN_END + FADE) return 0;
  if (t >= SUN_START && t <= SUN_END) return 1;
  if (t < SUN_START) return easeInOut((t - (SUN_START - FADE)) / FADE);
  return 1 - easeInOut((t - SUN_END) / FADE);
}

function sunPosition(t: number) {
  const clamped = Math.max(SUN_START, Math.min(SUN_END, t));
  const phase = (clamped - SUN_START) / (SUN_END - SUN_START);
  const x = scaleX(SUN_START) + phase * (scaleX(SUN_END) - scaleX(SUN_START));
  const arc = 4 * phase * (1 - phase);
  const y = SKY_BOTTOM - arc * ARC_HEIGHT;
  return { x, y, opacity: sunOpacity(t) };
}

function moonPosition(t: number) {
  // Moon's "day" runs 19:00 → 06:00 (11 hours), virtual time 19..30
  const virtualT = t >= SUN_END ? t : t + 24;
  const moonStart = SUN_END;
  const moonEnd = SUN_START + 24;
  const phase = Math.max(0, Math.min(1, (virtualT - moonStart) / (moonEnd - moonStart)));

  // Moon rises in the east (left), sets in the west (right) — SAME direction as the sun
  const x = scaleX(SUN_START) + phase * (scaleX(SUN_END) - scaleX(SUN_START));
  const arc = 4 * phase * (1 - phase);
  const y = SKY_BOTTOM - arc * (ARC_HEIGHT + 6);

  return { x, y, opacity: 1 - sunOpacity(t) };
}

function interpolate(t: number, key: "gen" | "cons" | "bat") {
  const i = Math.floor(t) % 24;
  const j = (i + 1) % 24;
  const f = t - Math.floor(t);
  return HOURS[i][key] + (HOURS[j][key] - HOURS[i][key]) * f;
}

export function DayInLife() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { margin: "-100px" });
  const t = useDayCycle(inView);

  const sun = sunPosition(t);
  const moon = moonPosition(t);
  const cursorX = scaleX(t);
  const gen = interpolate(t, "gen");
  const cons = interpolate(t, "cons");
  const bat = interpolate(t, "bat");

  const hh = Math.floor(t) % 24;
  const mm = Math.floor((t - Math.floor(t)) * 60);
  const timeStr = `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;

  // Tooltip flips to the other side of cursor when near right edge
  const tipOnLeft = cursorX > W * 0.65;
  const tipOffsetX = tipOnLeft ? -156 : 12;

  // Day brightness factor — used for ambient bg gradient strength
  const brightness =
    t < SUN_START || t > SUN_END
      ? 0.15
      : 4 * ((t - SUN_START) / 13) * (1 - (t - SUN_START) / 13);

  return (
    <section ref={sectionRef} className="section-pad bg-bg">
      <div className="container-x">
        <Reveal>
          <SectionHeader
            index="04 / 09"
            eyebrowIcon={Clock}
            eyebrowLabel="24 години з СЕС"
            title="День, коли ви забуваєте про мережу."
            description="Реальний приклад роботи 10 кВт станції з акумулятором 10 кВт·год для дому 150 м²."
          />
        </Reveal>

        {/* Mobile-only: compact day-timeline (replaces animated chart) */}
        <Reveal delay={0.15}>
          <MobileDayTimeline />
        </Reveal>

        {/* Animated chart — tablet & desktop only */}
        <Reveal delay={0.15}>
          <div className="mt-12 hidden overflow-hidden rounded-3xl border border-line bg-ink p-3 shadow-soft sm:block sm:p-4 lg:mt-16 lg:p-6">
            {/* Legend */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 px-1 text-[11px] sm:gap-x-5 sm:px-2 sm:text-xs lg:text-sm">
              <span className="flex items-center gap-1.5 text-bg/80 sm:gap-2">
                <span className="h-2 w-2 rounded-sm bg-leaf-400 sm:h-2.5 sm:w-2.5" />
                Генерація
              </span>
              <span className="flex items-center gap-1.5 text-bg/80 sm:gap-2">
                <span className="h-2 w-2 rounded-sm bg-sun-500 sm:h-2.5 sm:w-2.5" />
                Споживання
              </span>
              <span className="hidden items-center gap-2 text-bg/55 sm:flex">
                <span className="h-display tabular-nums">кВт</span>
              </span>
              <span className="ml-auto flex items-center gap-1.5 rounded-full border border-bg/15 bg-bg/5 px-2 py-0.5 text-[9px] uppercase tracking-wider text-bg/65 sm:gap-2 sm:px-2.5 sm:text-[10px]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sun-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sun-400" />
                </span>
                симуляція 24 год
              </span>
            </div>

            {/* Chart — horizontal scroll on small screens with edge fade hint */}
            <div className="relative mt-3 sm:mt-4">
              <div className="overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  className="block h-auto w-full min-w-[560px] sm:min-w-[680px]"
                  preserveAspectRatio="xMidYMid meet"
                >
                <defs>
                  <linearGradient id="day-strip" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#0E1A28" />
                    <stop offset="22%" stopColor="#3F4A56" />
                    <stop offset="32%" stopColor="#E8B340" stopOpacity="0.55" />
                    <stop offset="50%" stopColor="#FFF7E2" stopOpacity="0.7" />
                    <stop offset="68%" stopColor="#E8B340" stopOpacity="0.55" />
                    <stop offset="80%" stopColor="#7C5A3C" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#0E1A28" />
                  </linearGradient>

                  <linearGradient id="genFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#5A8C66" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#5A8C66" stopOpacity="0.04" />
                  </linearGradient>
                  <linearGradient id="consFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#E8B340" stopOpacity="0.42" />
                    <stop offset="100%" stopColor="#E8B340" stopOpacity="0.04" />
                  </linearGradient>

                  <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFF7E2" stopOpacity="1" />
                    <stop offset="60%" stopColor="#E8B340" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#E8B340" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#E8EEF4" stopOpacity="1" />
                    <stop offset="60%" stopColor="#9DB7C4" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#9DB7C4" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Day-of-day ambient strip */}
                <rect
                  x={PADDING.l}
                  y={STRIP_Y}
                  width={innerW}
                  height={6}
                  rx="3"
                  fill="url(#day-strip)"
                  opacity="0.85"
                />
                {/* Position dot on strip — tracks current time */}
                <circle cx={cursorX} cy={STRIP_Y + 3} r="3.5" fill="#FAFAF7" />
                <circle
                  cx={cursorX}
                  cy={STRIP_Y + 3}
                  r="3.5"
                  fill="none"
                  stroke="#FAFAF7"
                  strokeOpacity="0.4"
                  strokeWidth="1"
                >
                  <animate attributeName="r" values="3.5;7;3.5" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
                </circle>

                {/* Stars background — visible at night */}
                <g
                  opacity={moon.opacity * 0.55}
                  style={{ transition: "opacity 0.6s ease" }}
                >
                  {[
                    [120, 60],
                    [220, 50],
                    [320, 70],
                    [880, 55],
                    [780, 75],
                    [680, 50],
                    [580, 90],
                    [180, 110],
                  ].map(([cx, cy], i) => (
                    <circle
                      key={i}
                      cx={cx}
                      cy={cy}
                      r={i % 2 ? 1 : 1.5}
                      fill="#FAFAF7"
                      fillOpacity={(i % 3) * 0.15 + 0.4}
                    >
                      <animate
                        attributeName="opacity"
                        values="0.3;1;0.3"
                        dur={`${2 + (i % 3)}s`}
                        repeatCount="indefinite"
                        begin={`${i * 0.3}s`}
                      />
                    </circle>
                  ))}
                </g>

                {/* SUN — three-layer disc */}
                <g
                  opacity={sun.opacity}
                  transform={`translate(${sun.x} ${sun.y}) scale(${0.6 + 0.4 * sun.opacity})`}
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                >
                  <circle r="26" fill="url(#sunGlow)" />
                  <circle r="11" fill="#FFF7E2" />
                  <circle r="7" fill="#E8B340" />
                </g>

                {/* MOON — disc with two craters */}
                <g
                  opacity={moon.opacity}
                  transform={`translate(${moon.x} ${moon.y}) scale(${0.6 + 0.4 * moon.opacity})`}
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                >
                  <circle r="22" fill="url(#moonGlow)" />
                  <circle r="10" fill="#E8EEF4" />
                  <circle cx="-3.5" cy="-2" r="2" fill="#9DB7C4" opacity="0.45" />
                  <circle cx="3" cy="2.5" r="1.4" fill="#9DB7C4" opacity="0.5" />
                </g>

                {/* Horizontal grid lines */}
                {[0, 2.5, 5, 7.5, 10].map((v) => (
                  <g key={v}>
                    <line
                      x1={PADDING.l}
                      x2={W - PADDING.r}
                      y1={scaleY(v)}
                      y2={scaleY(v)}
                      stroke="#FAFAF7"
                      strokeOpacity="0.06"
                      strokeDasharray="2 4"
                    />
                    <text
                      x={PADDING.l - 10}
                      y={scaleY(v) + 4}
                      fontSize="11"
                      fill="#FAFAF7"
                      fillOpacity="0.4"
                      textAnchor="end"
                    >
                      {v}
                    </text>
                  </g>
                ))}

                {/* Hour ticks */}
                {[0, 4, 8, 12, 16, 20, 23].map((h) => (
                  <g key={h}>
                    <line
                      x1={scaleX(h)}
                      x2={scaleX(h)}
                      y1={PADDING.t}
                      y2={H - PADDING.b}
                      stroke="#FAFAF7"
                      strokeOpacity="0.04"
                    />
                    <text
                      x={scaleX(h)}
                      y={H - PADDING.b + 22}
                      fontSize="11"
                      fill="#FAFAF7"
                      fillOpacity="0.45"
                      textAnchor="middle"
                    >
                      {String(h).padStart(2, "0")}:00
                    </text>
                  </g>
                ))}

                {/* Subtle day brightness backwash beneath the chart */}
                <rect
                  x={PADDING.l}
                  y={PADDING.t}
                  width={innerW}
                  height={innerH}
                  fill="#E8B340"
                  fillOpacity={brightness * 0.05}
                  style={{ transition: "fill-opacity 0.6s linear" }}
                />

                {/* Consumption fill */}
                <path d={buildPath("cons", true)} fill="url(#consFill)" />
                <path
                  d={buildPath("cons")}
                  fill="none"
                  stroke="#E8B340"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Generation fill */}
                <path d={buildPath("gen", true)} fill="url(#genFill)" />
                <path
                  d={buildPath("gen")}
                  fill="none"
                  stroke="#5A8C66"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Time cursor — vertical line + dots on both curves */}
                <g>
                  <line
                    x1={cursorX}
                    x2={cursorX}
                    y1={PADDING.t - 4}
                    y2={H - PADDING.b + 4}
                    stroke="#FAFAF7"
                    strokeOpacity="0.4"
                    strokeDasharray="2 3"
                    strokeWidth="1"
                  />
                  <circle
                    cx={cursorX}
                    cy={scaleY(gen)}
                    r="5"
                    fill="#5A8C66"
                    stroke="#0F1411"
                    strokeWidth="2"
                  />
                  <circle
                    cx={cursorX}
                    cy={scaleY(cons)}
                    r="5"
                    fill="#E8B340"
                    stroke="#0F1411"
                    strokeWidth="2"
                  />
                </g>

                {/* Tooltip */}
                <g transform={`translate(${cursorX + tipOffsetX} ${PADDING.t + 4})`}>
                  <rect
                    x="0"
                    y="0"
                    width="144"
                    height="76"
                    rx="10"
                    fill="#0F1411"
                    stroke="#FAFAF7"
                    strokeOpacity="0.18"
                  />
                  <text x="14" y="20" fontSize="10" fill="#FAFAF7" fillOpacity="0.5" letterSpacing="1.6">
                    ЗАРАЗ
                  </text>
                  <text
                    x="130"
                    y="20"
                    fontSize="13"
                    fill="#FAFAF7"
                    fontWeight="700"
                    textAnchor="end"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {timeStr}
                  </text>

                  <line x1="14" x2="130" y1="28" y2="28" stroke="#FAFAF7" strokeOpacity="0.1" />

                  <circle cx="20" cy="42" r="3" fill="#5A8C66" />
                  <text x="28" y="46" fontSize="11" fill="#FAFAF7" fillOpacity="0.65">
                    Ген
                  </text>
                  <text
                    x="130"
                    y="46"
                    fontSize="12"
                    fill="#5A8C66"
                    fontWeight="600"
                    textAnchor="end"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {gen.toFixed(1)} кВт
                  </text>

                  <circle cx="20" cy="60" r="3" fill="#E8B340" />
                  <text x="28" y="64" fontSize="11" fill="#FAFAF7" fillOpacity="0.65">
                    Спож
                  </text>
                  <text
                    x="130"
                    y="64"
                    fontSize="12"
                    fill="#E8B340"
                    fontWeight="600"
                    textAnchor="end"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {cons.toFixed(1)} кВт
                  </text>
                </g>

                {/* Battery state strip */}
                <g>
                  <text
                    x={PADDING.l}
                    y={H - 18}
                    fontSize="10"
                    fill="#FAFAF7"
                    fillOpacity="0.5"
                    letterSpacing="1.4"
                  >
                    АКУМУЛЯТОР {Math.round(bat)}%
                  </text>
                  <rect
                    x={PADDING.l}
                    y={H - 12}
                    width={innerW}
                    height="6"
                    rx="3"
                    fill="#FAFAF7"
                    fillOpacity="0.06"
                  />
                  <rect
                    x={PADDING.l}
                    y={H - 12}
                    width={(innerW * bat) / 100}
                    height="6"
                    rx="3"
                    fill={bat > 70 ? "#5A8C66" : bat > 40 ? "#E8B340" : "#A07835"}
                    style={{ transition: "fill 0.6s ease" }}
                  />
                </g>
                </svg>
              </div>
              {/* Scroll-edge fade hint on mobile */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-ink to-transparent sm:hidden"
              />
            </div>
          </div>
        </Reveal>

        {/* Highlights row */}
        <ul className="mt-6 grid gap-3 lg:mt-8 lg:grid-cols-4 lg:gap-4">
          {HIGHLIGHTS.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.06} as="li">
              <div className="flex items-start gap-4 rounded-2xl border border-line bg-bg p-4 transition-colors hover:border-leaf-600/40 lg:p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-leaf-50 text-leaf-600">
                  <item.icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <div>
                  <div className="h-display text-sm font-semibold tabular-nums">
                    {item.hour}
                  </div>
                  <div className="text-sm text-ink lg:text-base">
                    {item.label}
                  </div>
                  <div className="mt-0.5 text-xs text-ink-soft">
                    {item.note}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Mobile-only compact day overview (chart replacement) ──────────── */

const TIMELINE_STEPS = [
  { icon: Moon, label: "Ніч", time: "00–06" },
  { icon: Sunrise, label: "Схід", time: "06–09" },
  { icon: Sun, label: "Пік", time: "12–14" },
  { icon: Sunset, label: "Захід", time: "17–20" },
  { icon: Moon, label: "Ніч", time: "20–24" },
];

function MobileDayTimeline() {
  // Aggregate from HOURS data: total generation, total consumption, peak generation
  const totalGen = HOURS.reduce((s, h) => s + h.gen, 0);
  const totalCons = HOURS.reduce((s, h) => s + h.cons, 0);
  const peakGen = Math.max(...HOURS.map((h) => h.gen));

  return (
    <div className="mt-8 overflow-hidden rounded-3xl border border-line bg-ink p-5 shadow-soft sm:hidden">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sun-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sun-400" />
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-bg/65">
            типовий день станції
          </span>
        </div>
      </div>

      {/* Day-cycle icon strip with horizon line */}
      <div className="mt-5">
        {/* Icon row — fixed height so the line can center perfectly */}
        <div className="relative h-9">
          {/* Horizon line — vertically centered in the icon row */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-6 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-bg/10 via-sun-400/40 to-bg/10"
          />
          <ul className="relative flex h-full items-center justify-between">
            {TIMELINE_STEPS.map((step, i) => {
              const isPeak = i === 2;
              return (
                <li key={i} className="flex h-9 w-9 items-center justify-center">
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 ${
                      isPeak
                        ? "border-sun-400/40 bg-sun-400 text-ink"
                        : "border-bg/20 bg-ink text-bg/85"
                    }`}
                  >
                    <step.icon className="h-4 w-4" strokeWidth={2} />
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        {/* Time labels row — each cell w-9 to align under its icon */}
        <ul className="mt-2 flex items-center justify-between">
          {TIMELINE_STEPS.map((step, i) => (
            <li
              key={i}
              className="w-9 text-center text-[9px] uppercase tracking-wider text-bg/55 tabular-nums"
            >
              {step.time}
            </li>
          ))}
        </ul>
      </div>

      {/* Key stats */}
      <ul className="mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-bg/10">
        <li className="bg-ink p-3">
          <div className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-bg/55">
            <span className="h-1.5 w-1.5 rounded-sm bg-leaf-400" />
            Генерує
          </div>
          <div className="h-display mt-1 text-base font-bold tabular-nums leading-tight text-bg">
            {Math.round(totalGen)}{" "}
            <span className="text-[10px] font-normal text-bg/55">кВт·год</span>
          </div>
        </li>
        <li className="bg-ink p-3">
          <div className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-bg/55">
            <span className="h-1.5 w-1.5 rounded-sm bg-sun-500" />
            Спожив
          </div>
          <div className="h-display mt-1 text-base font-bold tabular-nums leading-tight text-bg">
            {Math.round(totalCons)}{" "}
            <span className="text-[10px] font-normal text-bg/55">кВт·год</span>
          </div>
        </li>
        <li className="bg-ink p-3">
          <div className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-bg/55">
            <Sun className="h-2.5 w-2.5 text-sun-400" strokeWidth={2.5} />
            Пік
          </div>
          <div className="h-display mt-1 text-base font-bold tabular-nums leading-tight text-bg">
            {peakGen.toFixed(0)}{" "}
            <span className="text-[10px] font-normal text-bg/55">кВт</span>
          </div>
        </li>
      </ul>

      {/* Quick summary line */}
      <div className="mt-4 flex items-center gap-2 text-xs text-bg/65">
        <Battery className="h-3.5 w-3.5 text-leaf-400" strokeWidth={2} />
        <span>
          Надлишок дня покриває{" "}
          <span className="font-semibold text-bg">100% ночі</span> на акумуляторі.
        </span>
      </div>
    </div>
  );
}
