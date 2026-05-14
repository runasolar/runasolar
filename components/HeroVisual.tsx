"use client";

import { motion } from "framer-motion";

export function HeroVisual() {
  // Panel grid: 4×3
  const PANELS = Array.from({ length: 4 }).flatMap((_, c) =>
    Array.from({ length: 3 }).map((_, r) => ({ c, r, i: c * 3 + r }))
  );

  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 600 700"
        className="block h-auto w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Sky — warm morning */}
          <linearGradient id="hv-sky" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#FFE6C7" />
            <stop offset="55%" stopColor="#F5E5D0" />
            <stop offset="100%" stopColor="#F2EDE4" />
          </linearGradient>

          {/* Ground / grass */}
          <linearGradient id="hv-ground" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#B0CDB6" />
            <stop offset="100%" stopColor="#7FA888" />
          </linearGradient>

          {/* House walls */}
          <linearGradient id="hv-wall" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#FAFAF7" />
            <stop offset="100%" stopColor="#E5DCC8" />
          </linearGradient>

          {/* Roof */}
          <linearGradient id="hv-roof" x1="0.2" x2="0.8" y1="0" y2="1">
            <stop offset="0%" stopColor="#2E5D3A" />
            <stop offset="100%" stopColor="#13261A" />
          </linearGradient>

          {/* Panel */}
          <linearGradient id="hv-panel" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#1A2E22" />
            <stop offset="50%" stopColor="#2E5D3A" />
            <stop offset="100%" stopColor="#13261A" />
          </linearGradient>

          {/* Sun glow */}
          <radialGradient id="hv-sun-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF7E2" stopOpacity="1" />
            <stop offset="40%" stopColor="#F7DD92" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#E8B340" stopOpacity="0" />
          </radialGradient>

          {/* Warm window light */}
          <radialGradient id="hv-window" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#FFE6A6" />
            <stop offset="100%" stopColor="#E8B340" stopOpacity="0.55" />
          </radialGradient>

          {/* Path for sun arc (used for energy particles) */}
          <path
            id="hv-energy-path"
            d="M 130,150 Q 240,200 320,290"
            fill="none"
          />
        </defs>

        {/* Sky background */}
        <rect x="0" y="0" width="600" height="500" fill="url(#hv-sky)" />

        {/* Distant hills */}
        <path
          d="M 0,470 Q 80,440 160,455 T 320,450 T 500,455 T 600,460 L 600,500 L 0,500 Z"
          fill="#9DB7C4"
          opacity="0.35"
        />
        <path
          d="M 0,485 Q 100,460 220,470 T 440,475 T 600,478 L 600,500 L 0,500 Z"
          fill="#5A8C66"
          opacity="0.28"
        />

        {/* Drifting clouds */}
        <motion.g
          initial={{ x: -40 }}
          animate={{ x: 30 }}
          transition={{
            duration: 28,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          opacity="0.7"
        >
          <ellipse cx="380" cy="120" rx="40" ry="13" fill="#FFFFFF" />
          <ellipse cx="405" cy="112" rx="25" ry="10" fill="#FFFFFF" />
          <ellipse cx="360" cy="115" rx="18" ry="9" fill="#FFFFFF" />
        </motion.g>
        <motion.g
          initial={{ x: 20 }}
          animate={{ x: -30 }}
          transition={{
            duration: 36,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          opacity="0.5"
        >
          <ellipse cx="510" cy="180" rx="30" ry="10" fill="#FFFFFF" />
          <ellipse cx="525" cy="172" rx="20" ry="8" fill="#FFFFFF" />
        </motion.g>

        {/* SUN with rotating rays */}
        <g>
          {/* Rotating rays */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "120px 130px" }}
          >
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i * 360) / 12;
              const inner = 52;
              const outer = 72;
              const rad = (a * Math.PI) / 180;
              return (
                <line
                  key={i}
                  x1={120 + Math.cos(rad) * inner}
                  y1={130 + Math.sin(rad) * inner}
                  x2={120 + Math.cos(rad) * outer}
                  y2={130 + Math.sin(rad) * outer}
                  stroke="#E8B340"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity={i % 2 === 0 ? 0.85 : 0.45}
                />
              );
            })}
          </motion.g>
          {/* Glow + core */}
          <motion.circle
            cx="120"
            cy="130"
            r="78"
            fill="url(#hv-sun-glow)"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "120px 130px" }}
          />
          <circle cx="120" cy="130" r="34" fill="#FFF7E2" />
          <circle cx="120" cy="130" r="24" fill="#E8B340" />
        </g>

        {/* Energy particles — sun → panels */}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={`p-${i}`}>
            <circle r="5" fill="#FFE6A6">
              <animateMotion
                dur={`${2.6 + i * 0.5}s`}
                repeatCount="indefinite"
                begin={`${i * 0.6}s`}
                path="M 150,180 Q 240,210 320,290"
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.15;0.8;1"
                dur={`${2.6 + i * 0.5}s`}
                repeatCount="indefinite"
                begin={`${i * 0.6}s`}
              />
            </circle>
            <circle r="2" fill="#FFFFFF">
              <animateMotion
                dur={`${2.6 + i * 0.5}s`}
                repeatCount="indefinite"
                begin={`${i * 0.6}s`}
                path="M 150,180 Q 240,210 320,290"
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.15;0.8;1"
                dur={`${2.6 + i * 0.5}s`}
                repeatCount="indefinite"
                begin={`${i * 0.6}s`}
              />
            </circle>
          </g>
        ))}

        {/* Tree (left of house) */}
        <g>
          <rect x="178" y="445" width="9" height="40" rx="2" fill="#7A5A3C" />
          <ellipse cx="183" cy="430" rx="34" ry="38" fill="#3F7350" />
          <ellipse cx="170" cy="420" rx="18" ry="22" fill="#5A8C66" opacity="0.85" />
          <ellipse cx="195" cy="425" rx="17" ry="20" fill="#5A8C66" opacity="0.7" />
        </g>

        {/* House shadow */}
        <ellipse
          cx="395"
          cy="500"
          rx="160"
          ry="9"
          fill="#1A1F1B"
          opacity="0.14"
        />

        {/* House body */}
        <motion.g
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <rect
            x="260"
            y="340"
            width="270"
            height="150"
            fill="url(#hv-wall)"
            stroke="#9C8E73"
            strokeWidth="1.5"
          />
          <rect x="260" y="340" width="6" height="150" fill="#1A1F1B" opacity="0.06" />

          {/* Windows */}
          <g>
            <rect x="285" y="375" width="36" height="36" rx="2" fill="url(#hv-window)" stroke="#7A5A3C" strokeWidth="2" />
            <line x1="303" y1="375" x2="303" y2="411" stroke="#7A5A3C" strokeWidth="1.2" />
            <line x1="285" y1="393" x2="321" y2="393" stroke="#7A5A3C" strokeWidth="1.2" />
          </g>
          <g>
            <rect x="463" y="375" width="36" height="36" rx="2" fill="url(#hv-window)" stroke="#7A5A3C" strokeWidth="2" />
            <line x1="481" y1="375" x2="481" y2="411" stroke="#7A5A3C" strokeWidth="1.2" />
            <line x1="463" y1="393" x2="499" y2="393" stroke="#7A5A3C" strokeWidth="1.2" />
          </g>

          {/* Door */}
          <rect x="370" y="425" width="50" height="65" fill="#3F2A1A" />
          <rect x="375" y="432" width="40" height="12" fill="#7A5A3C" opacity="0.5" />
          <circle cx="408" cy="460" r="2.5" fill="#E8B340" />

          {/* Roof shadow line */}
          <rect x="260" y="338" width="270" height="6" fill="#1A1F1B" opacity="0.18" />

          {/* Roof — south-facing slope */}
          <path
            d="M 260,340 L 395,232 L 530,340 Z"
            fill="url(#hv-roof)"
            stroke="#0B1A13"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* Solar panels — 4×3 grid, skewed for roof perspective */}
          <g transform="translate(305, 252) skewX(-14)">
            {PANELS.map(({ c, r, i }) => {
              const px = c * 38;
              const py = r * 26;
              return (
                <motion.g
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.6 + i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ transformOrigin: `${px + 16}px ${py + 11}px` }}
                >
                  <rect
                    x={px}
                    y={py}
                    width="34"
                    height="22"
                    fill="url(#hv-panel)"
                    stroke="#0F1F16"
                    strokeWidth="0.8"
                  />
                  {/* 3×2 cells */}
                  {[0, 1, 2].map((cx) =>
                    [0, 1].map((cy) => (
                      <rect
                        key={`${cx}-${cy}`}
                        x={px + 2 + cx * 10.5}
                        y={py + 2 + cy * 9.5}
                        width="9"
                        height="8.5"
                        fill="#1F3D2A"
                        opacity="0.9"
                      />
                    ))
                  )}
                  {/* Glint */}
                  <line
                    x1={px}
                    y1={py + 2}
                    x2={px + 34}
                    y2={py + 2}
                    stroke="#FAFAF7"
                    strokeOpacity="0.2"
                    strokeWidth="0.6"
                  />
                  {/* Subtle shine sweep (animated) — only on first row */}
                  {r === 0 && (
                    <motion.line
                      x1={px}
                      y1={py + 11}
                      x2={px + 34}
                      y2={py + 11}
                      stroke="#FFF7E2"
                      strokeOpacity="0.35"
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: [0, 1, 1, 0] }}
                      transition={{
                        duration: 3,
                        delay: 1.5 + c * 0.3,
                        repeat: Infinity,
                        repeatDelay: 4,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </motion.g>
              );
            })}
          </g>
        </motion.g>

        {/* Inverter */}
        <g>
          <path
            d="M 540,340 Q 552,355 558,380"
            fill="none"
            stroke="#1A1F1B"
            strokeWidth="1.5"
            strokeOpacity="0.45"
          />
          <rect x="546" y="382" width="36" height="48" rx="3.5" fill="#1A1F1B" />
          <rect x="551" y="390" width="26" height="6" rx="1" fill="#5A8C66" />
          <rect x="551" y="400" width="26" height="3.5" fill="#23492D" opacity="0.7" />
          <motion.circle
            cx="564"
            cy="418"
            r="3"
            fill="#E8B340"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <text
            x="564"
            y="446"
            fontSize="9"
            fill="#5C6660"
            textAnchor="middle"
            letterSpacing="0.5"
          >
            ІНВЕРТОР
          </text>
        </g>

        {/* Ground */}
        <rect x="0" y="490" width="600" height="210" fill="url(#hv-ground)" />
        {/* Grass blades */}
        {[40, 90, 145, 220, 580, 555, 525].map((x, i) => (
          <g key={i}>
            <line
              x1={x}
              y1="498"
              x2={x - 2}
              y2="491"
              stroke="#3F7350"
              strokeWidth="1.4"
            />
            <line
              x1={x + 3}
              y1="498"
              x2={x + 5}
              y2="491"
              stroke="#3F7350"
              strokeWidth="1.4"
            />
          </g>
        ))}
      </svg>

      {/* ── Floating cards (HTML, positioned over SVG) ────────── */}
      {/* Tier-1 badge */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-line bg-bg/95 px-3 py-1.5 text-xs font-medium text-ink shadow-soft backdrop-blur-md lg:left-6 lg:top-6"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-leaf-600" />
        Tier-1 обладнання
      </motion.div>

      {/* Savings pill — top right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="absolute right-4 top-4 rounded-2xl bg-sun-500 px-4 py-2.5 text-ink shadow-lift lg:right-6 lg:top-6"
      >
        <div className="text-[10px] uppercase tracking-[0.18em] opacity-80">
          Економія
        </div>
        <div className="h-display mt-0.5 text-lg font-bold tabular-nums leading-none">
          60 000 ₴/рік
        </div>
      </motion.div>

      {/* Live generation card — bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.2 }}
        className="absolute bottom-4 left-4 w-[200px] rounded-2xl border border-line bg-bg/95 p-3.5 shadow-lift backdrop-blur-md lg:bottom-6 lg:left-6 lg:w-[220px] lg:p-4"
      >
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-ink-soft">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf-400" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-leaf-600" />
            </span>
            Live генерація
          </span>
        </div>
        <div className="h-display mt-2 text-2xl font-semibold tabular-nums lg:text-3xl">
          8.4{" "}
          <span className="text-base font-normal text-ink-muted">кВт</span>
        </div>
        <div className="mt-3 flex items-end gap-0.5">
          {[6, 10, 8, 14, 12, 18, 15, 22, 19, 26, 24, 30].map((h, i) => (
            <motion.span
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 1.4 + i * 0.04, duration: 0.4 }}
              style={{ height: `${h}px`, transformOrigin: "bottom" }}
              className="block w-1 rounded-sm bg-leaf-600"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
