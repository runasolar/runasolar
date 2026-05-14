"use client";

import { motion } from "framer-motion";
import { Sun, CloudRain, Moon, Home, Building2, Info, Zap } from "lucide-react";
import { useState } from "react";
import { formatGrn } from "@/lib/utils";

type ObjectType = "home" | "business";
type Mode = "sun" | "rain" | "night";

const OBJECTS = [
  { id: "business" as const, label: "Бізнес", Icon: Building2 },
  { id: "home" as const, label: "Будинок", Icon: Home },
];

const MODES = [
  { id: "sun" as const, label: "Сонце", Icon: Sun },
  { id: "rain" as const, label: "Дощ", Icon: CloudRain },
  { id: "night" as const, label: "Ніч", Icon: Moon },
];

// Generation rate per mode (kW for 30kW station)
const GENERATION: Record<Mode, number> = {
  sun: 28,
  rain: 6,
  night: 0,
};

const TYPE_POWER: Record<ObjectType, number> = {
  home: 12,
  business: 30,
};

export function HeroScene() {
  const [type, setType] = useState<ObjectType>("home");
  const [mode, setMode] = useState<Mode>("sun");

  const power = TYPE_POWER[type];
  const yearly = power * 1100 * 4.32 * 1.05; // approximate
  const isNight = mode === "night";
  const isRain = mode === "rain";

  return (
    <div className="relative w-full">
      {/* TOGGLE BAR — top of the scene */}
      <div className="relative z-20 flex flex-wrap items-end justify-center gap-x-8 gap-y-5 lg:gap-x-14">
        <ToggleGroup
          label="Тип об'єкту"
          value={type}
          onChange={setType}
          options={OBJECTS}
        />
        <ToggleGroup
          label="Режим генерації"
          value={mode}
          onChange={setMode}
          options={MODES}
        />
      </div>

      {/* SCENE — house + sun + hills */}
      <div className="relative mt-10 lg:mt-12">
        {/* Sky tint when night */}
        <motion.div
          aria-hidden
          animate={{
            background: isNight
              ? "linear-gradient(180deg, rgb(var(--color-bg-deep) / 0.04) 0%, rgb(var(--color-bg) / 0) 60%)"
              : isRain
                ? "linear-gradient(180deg, rgb(var(--color-sky-mist) / 0.18) 0%, rgb(var(--color-bg) / 0) 65%)"
                : "linear-gradient(180deg, rgb(var(--color-sun-200) / 0.25) 0%, rgb(var(--color-bg) / 0) 70%)",
          }}
          transition={{ duration: 0.7 }}
          className="pointer-events-none absolute -inset-x-20 -top-10 bottom-20 -z-10 rounded-[4rem]"
        />

        {/* SVG scene */}
        <svg
          viewBox="0 0 1200 640"
          className="block h-auto w-full"
          preserveAspectRatio="xMidYMax meet"
        >
          <defs>
            {/* House walls */}
            <linearGradient id="hs-wall" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#FAFAF7" />
              <stop offset="100%" stopColor="#E5DCC8" />
            </linearGradient>
            {/* Roof */}
            <linearGradient id="hs-roof" x1="0.3" x2="0.7" y1="0" y2="1">
              <stop offset="0%" stopColor="#2E5D3A" />
              <stop offset="100%" stopColor="#13261A" />
            </linearGradient>
            {/* Panel */}
            <linearGradient id="hs-panel" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#0F1F16" />
              <stop offset="50%" stopColor="#1F3D2A" />
              <stop offset="100%" stopColor="#0F1F16" />
            </linearGradient>
            {/* Window light */}
            <radialGradient id="hs-window" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#FFE6A6" />
              <stop offset="100%" stopColor="#E8B340" stopOpacity="0.5" />
            </radialGradient>
            <radialGradient id="hs-window-night" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#FFF7E2" />
              <stop offset="100%" stopColor="#E8B340" />
            </radialGradient>
            {/* Sun glow */}
            <radialGradient id="hs-sun-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E8B340" stopOpacity="0.55" />
              <stop offset="60%" stopColor="#E8B340" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#E8B340" stopOpacity="0" />
            </radialGradient>
            {/* Moon glow */}
            <radialGradient id="hs-moon-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#9DB7C4" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#9DB7C4" stopOpacity="0" />
            </radialGradient>
            {/* Ground */}
            <linearGradient id="hs-ground" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#B0CDB6" />
              <stop offset="100%" stopColor="#7FA888" />
            </linearGradient>
          </defs>

          {/* ── Sun / Moon (right side, big) ─────────────────────── */}
          {!isNight && (
            <motion.g
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isRain ? 0.35 : 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              style={{ transformOrigin: "950px 240px" }}
            >
              {/* Glow */}
              <motion.circle
                cx="950"
                cy="240"
                r="200"
                fill="url(#hs-sun-glow)"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ transformOrigin: "950px 240px" }}
              />
              {/* Disc */}
              <circle cx="950" cy="240" r="135" fill="#E8B340" />
              {/* Inner highlight */}
              <circle cx="922" cy="218" r="40" fill="#F5C857" opacity="0.55" />
            </motion.g>
          )}
          {isNight && (
            <motion.g
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <circle cx="950" cy="220" r="180" fill="url(#hs-moon-glow)" />
              <circle cx="950" cy="220" r="100" fill="#E8EEF4" />
              <circle cx="950" cy="220" r="78" fill="#FAFAF7" />
              {/* Craters */}
              <circle cx="930" cy="205" r="10" fill="#9DB7C4" opacity="0.45" />
              <circle cx="965" cy="225" r="6" fill="#9DB7C4" opacity="0.4" />
              <circle cx="945" cy="240" r="4" fill="#9DB7C4" opacity="0.4" />
            </motion.g>
          )}

          {/* Stars (night only) */}
          {isNight &&
            [
              [220, 110],
              [340, 160],
              [490, 90],
              [680, 130],
              [800, 75],
              [1100, 110],
              [1140, 200],
              [150, 200],
            ].map(([x, y], i) => (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r="1.6"
                fill="#FAFAF7"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 2 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              />
            ))}

          {/* Power line silhouette (right) */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <line x1="1100" y1="200" x2="1100" y2="500" stroke="#5C6660" strokeWidth="2.5" />
            <line x1="1080" y1="240" x2="1120" y2="240" stroke="#5C6660" strokeWidth="2" />
            <line x1="1085" y1="280" x2="1115" y2="280" stroke="#5C6660" strokeWidth="2" />
            <line x1="1080" y1="320" x2="1120" y2="320" stroke="#5C6660" strokeWidth="2" />
            {/* Diagonal supports */}
            <line x1="1080" y1="260" x2="1100" y2="280" stroke="#5C6660" strokeWidth="1.2" />
            <line x1="1120" y1="260" x2="1100" y2="280" stroke="#5C6660" strokeWidth="1.2" />
            {/* Wires drooping */}
            <path
              d="M 1080,240 Q 990,265 900,255"
              fill="none"
              stroke="#5C6660"
              strokeWidth="0.8"
            />
            <path
              d="M 1085,280 Q 990,305 900,295"
              fill="none"
              stroke="#5C6660"
              strokeWidth="0.8"
            />
          </motion.g>

          {/* Rain drops (rain mode only) */}
          {isRain && (
            <g>
              {Array.from({ length: 28 }).map((_, i) => {
                const x = 80 + (i % 14) * 80 + (i % 3) * 18;
                const startY = 80 + (i % 4) * 30;
                return (
                  <motion.line
                    key={i}
                    x1={x}
                    y1={startY}
                    x2={x - 5}
                    y2={startY + 14}
                    stroke="#5C6660"
                    strokeOpacity="0.5"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 480, opacity: [0, 0.6, 0] }}
                    transition={{
                      duration: 1.4 + (i % 5) * 0.2,
                      repeat: Infinity,
                      delay: (i * 0.07) % 1.5,
                      ease: "linear",
                    }}
                  />
                );
              })}
            </g>
          )}

          {/* Clouds */}
          <motion.g
            initial={{ x: 0 }}
            animate={{ x: isRain ? -20 : 40 }}
            transition={{
              duration: 30,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            opacity={isNight ? 0.3 : isRain ? 0.85 : 0.7}
          >
            <ellipse cx="280" cy="180" rx="55" ry="16" fill={isRain ? "#8A938D" : "#FFFFFF"} />
            <ellipse cx="310" cy="170" rx="34" ry="13" fill={isRain ? "#8A938D" : "#FFFFFF"} />
            <ellipse cx="250" cy="172" rx="24" ry="11" fill={isRain ? "#8A938D" : "#FFFFFF"} />
          </motion.g>
          <motion.g
            initial={{ x: 0 }}
            animate={{ x: isRain ? 25 : -35 }}
            transition={{
              duration: 36,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            opacity={isNight ? 0.2 : isRain ? 0.8 : 0.55}
          >
            <ellipse cx="780" cy="130" rx="40" ry="13" fill={isRain ? "#8A938D" : "#FFFFFF"} />
            <ellipse cx="805" cy="122" rx="25" ry="10" fill={isRain ? "#8A938D" : "#FFFFFF"} />
          </motion.g>

          {/* ── Ground hills (under house) ───────────────────────── */}
          <path
            d="M 0,500 Q 200,470 400,490 T 800,485 T 1200,495 L 1200,640 L 0,640 Z"
            fill="url(#hs-ground)"
          />
          <path
            d="M 0,520 Q 250,495 500,515 T 950,510 T 1200,520 L 1200,640 L 0,640 Z"
            fill="#5A8C66"
            opacity="0.35"
          />

          {/* ── HOUSE (center) ───────────────────────────────────── */}
          <motion.g
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* House shadow */}
            <ellipse cx="600" cy="520" rx="240" ry="10" fill="#1A1F1B" opacity="0.18" />

            {/* Main body */}
            <rect x="430" y="320" width="340" height="190" fill="url(#hs-wall)" stroke="#9C8E73" strokeWidth="1.6" />
            <rect x="430" y="320" width="6" height="190" fill="#1A1F1B" opacity="0.06" />

            {/* Garage (right side, lower) — appears for "home" only */}
            {type === "home" && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <rect x="770" y="395" width="120" height="115" fill="url(#hs-wall)" stroke="#9C8E73" strokeWidth="1.6" />
                <rect x="780" y="408" width="100" height="95" rx="3" fill="#3F2A1A" />
                {/* Garage door panels */}
                {[0, 1, 2, 3].map((i) => (
                  <line
                    key={i}
                    x1="780"
                    y1={428 + i * 18}
                    x2="880"
                    y2={428 + i * 18}
                    stroke="#5C3F22"
                    strokeWidth="0.8"
                  />
                ))}
              </motion.g>
            )}

            {/* Business: extra story */}
            {type === "business" && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <rect x="770" y="320" width="80" height="190" fill="url(#hs-wall)" stroke="#9C8E73" strokeWidth="1.6" />
                {/* Office windows grid */}
                {[0, 1, 2, 3].map((r) => (
                  <rect
                    key={r}
                    x="784"
                    y={335 + r * 42}
                    width="52"
                    height="28"
                    fill={
                      isNight
                        ? "url(#hs-window-night)"
                        : "url(#hs-window)"
                    }
                    stroke="#7A5A3C"
                    strokeWidth="1"
                    opacity={isNight ? 0.95 : 0.85}
                  />
                ))}
              </motion.g>
            )}

            {/* Windows on main body */}
            <g>
              <rect
                x="465"
                y="358"
                width="50"
                height="50"
                rx="2"
                fill={isNight ? "url(#hs-window-night)" : "url(#hs-window)"}
                stroke="#7A5A3C"
                strokeWidth="2"
              />
              <line x1="490" y1="358" x2="490" y2="408" stroke="#7A5A3C" strokeWidth="1.2" />
              <line x1="465" y1="383" x2="515" y2="383" stroke="#7A5A3C" strokeWidth="1.2" />
            </g>
            <g>
              <rect
                x="700"
                y="358"
                width="50"
                height="50"
                rx="2"
                fill={isNight ? "url(#hs-window-night)" : "url(#hs-window)"}
                stroke="#7A5A3C"
                strokeWidth="2"
              />
              <line x1="725" y1="358" x2="725" y2="408" stroke="#7A5A3C" strokeWidth="1.2" />
              <line x1="700" y1="383" x2="750" y2="383" stroke="#7A5A3C" strokeWidth="1.2" />
            </g>

            {/* Door */}
            <rect x="575" y="425" width="50" height="85" fill="#3F2A1A" />
            <rect x="582" y="432" width="36" height="14" fill="#7A5A3C" opacity="0.45" />
            <circle cx="615" cy="468" r="2.5" fill="#E8B340" />

            {/* Roof shadow line */}
            <rect x="430" y="318" width="340" height="6" fill="#1A1F1B" opacity="0.2" />

            {/* Roof — gabled */}
            <path
              d="M 430,320 L 600,200 L 770,320 Z"
              fill="url(#hs-roof)"
              stroke="#0B1A13"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />

            {/* Solar panels — 4×3 grid */}
            <g transform="translate(478, 232) skewX(-14)">
              {Array.from({ length: 4 }).map((_, c) =>
                Array.from({ length: 3 }).map((_, r) => {
                  const i = c * 3 + r;
                  const px = c * 50;
                  const py = r * 30;
                  return (
                    <motion.g
                      key={i}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.45,
                        delay: 0.7 + i * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      style={{ transformOrigin: `${px + 22}px ${py + 12}px` }}
                    >
                      <rect
                        x={px}
                        y={py}
                        width="45"
                        height="26"
                        fill="url(#hs-panel)"
                        stroke="#0F1F16"
                        strokeWidth="0.6"
                      />
                      {[0, 1, 2].map((cx) =>
                        [0, 1].map((cy) => (
                          <rect
                            key={`${cx}-${cy}`}
                            x={px + 3 + cx * 14}
                            y={py + 3 + cy * 11}
                            width="12"
                            height="9.5"
                            fill="#2E5D3A"
                            opacity={isNight ? 0.4 : isRain ? 0.6 : 0.95}
                          />
                        ))
                      )}
                      {/* Sunny shine */}
                      {mode === "sun" && r === 0 && (
                        <motion.line
                          x1={px}
                          y1={py + 13}
                          x2={px + 45}
                          y2={py + 13}
                          stroke="#FFF7E2"
                          strokeOpacity="0.45"
                          strokeWidth="1.2"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: [0, 1, 1, 0] }}
                          transition={{
                            duration: 3,
                            delay: 1.5 + c * 0.3,
                            repeat: Infinity,
                            repeatDelay: 3,
                            ease: "easeInOut",
                          }}
                        />
                      )}
                    </motion.g>
                  );
                })
              )}
            </g>
          </motion.g>

          {/* Energy particles — sun → panels (only in sun mode) */}
          {mode === "sun" &&
            [0, 1, 2, 3].map((i) => (
              <g key={`ep-${i}`}>
                <circle r="4" fill="#FFE6A6">
                  <animateMotion
                    dur={`${2.4 + i * 0.5}s`}
                    repeatCount="indefinite"
                    begin={`${i * 0.6}s`}
                    path="M 870,260 Q 770,280 680,290"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.15;0.8;1"
                    dur={`${2.4 + i * 0.5}s`}
                    repeatCount="indefinite"
                    begin={`${i * 0.6}s`}
                  />
                </circle>
              </g>
            ))}
        </svg>

        {/* ── Floating info cards (HTML) ───────────────────────── */}
        {/* Power card — top center floating */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="absolute left-1/2 top-[8%] z-10 -translate-x-1/2 rounded-2xl border border-line bg-bg/95 px-4 py-2.5 text-center shadow-soft backdrop-blur-md"
        >
          <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft">
            Потужність станції
          </div>
          <div className="h-display mt-0.5 text-base font-bold tabular-nums lg:text-lg">
            {power} кВт
          </div>
        </motion.div>

        {/* Yearly savings card — left */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute left-[2%] top-[28%] z-10 hidden w-[200px] rounded-2xl border border-line bg-bg shadow-soft sm:block lg:left-[6%] lg:w-[220px]"
        >
          <div className="border-b border-line px-4 py-2.5">
            <div className="text-[10px] uppercase tracking-[0.16em] text-leaf-600">
              Вигода
            </div>
          </div>
          <div className="px-4 py-3">
            <div className="text-[11px] text-ink-muted">
              Дохід від економії на електриці
            </div>
            <div className="h-display mt-2 text-xl font-bold tabular-nums leading-none lg:text-2xl">
              {formatGrn(yearly)}{" "}
              <span className="text-xs font-normal text-ink-muted">грн/рік</span>
            </div>
          </div>
        </motion.div>

        {/* Live generation card — right */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="absolute right-[2%] top-[58%] z-10 hidden w-[180px] rounded-2xl border border-line bg-bg/95 p-3.5 shadow-soft backdrop-blur-md sm:block lg:right-[5%] lg:w-[200px]"
        >
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-ink-soft">
            <span className="relative flex h-1.5 w-1.5">
              <span
                className={`absolute inline-flex h-full w-full animate-ping rounded-full ${
                  isNight ? "bg-sky-mist" : "bg-leaf-400"
                }`}
              />
              <span
                className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
                  isNight ? "bg-sky-mist" : "bg-leaf-600"
                }`}
              />
            </span>
            Live генерація
          </div>
          <div className="h-display mt-1.5 flex items-baseline gap-1 leading-none">
            <span className="text-2xl font-bold tabular-nums lg:text-3xl">
              {((GENERATION[mode] / 30) * power).toFixed(1)}
            </span>
            <span className="text-sm text-ink-muted">кВт</span>
          </div>
          <div className="mt-2 flex items-end gap-0.5">
            {Array.from({ length: 12 }).map((_, i) => {
              const base = isNight ? 4 : isRain ? 8 : 18;
              const h = base + ((i * 7) % 14);
              return (
                <span
                  key={i}
                  style={{ height: `${h}px` }}
                  className={`block w-1 rounded-sm ${
                    isNight
                      ? "bg-sky-mist/60"
                      : isRain
                        ? "bg-sun-500/70"
                        : "bg-leaf-600"
                  }`}
                />
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Toggle group ───────────────────────────────────────────────── */
function ToggleGroup<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { id: T; label: string; Icon: typeof Sun }[];
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-[10px] uppercase tracking-[0.2em] text-ink-soft">
        {label}
      </div>
      <div className="mt-3 flex gap-2 rounded-full border border-line bg-bg p-1 shadow-soft">
        {options.map(({ id, label: l, Icon }) => {
          const active = id === value;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={`group flex flex-col items-center gap-1 rounded-full px-3 py-2 text-[10px] font-medium uppercase tracking-[0.1em] transition-all ${
                active
                  ? "bg-sun-500 text-ink shadow-soft"
                  : "text-ink-muted hover:bg-bg-warm hover:text-ink"
              }`}
            >
              <Icon className="h-4 w-4" strokeWidth={2.2} />
              {l}
            </button>
          );
        })}
      </div>
    </div>
  );
}
