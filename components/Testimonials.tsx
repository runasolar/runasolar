"use client";

import { motion } from "framer-motion";
import {
  Quote,
  Star,
  MapPin,
  Zap,
  Calendar,
  MessageSquareQuote,
} from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

// Each row needs the content duplicated so the loop appears seamless.
const ROW = [...TESTIMONIALS, ...TESTIMONIALS];

export function Testimonials() {
  // Aggregate stats
  const avgRating =
    TESTIMONIALS.reduce((s, t) => s + t.rating, 0) / TESTIMONIALS.length;
  const totalReviews = TESTIMONIALS.length;

  return (
    <section className="relative section-pad overflow-clip">
      {/* Background decor */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-32 h-[460px] w-[460px] rounded-full bg-sun-200/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-20 h-[420px] w-[420px] rounded-full bg-leaf-100/40 blur-3xl"
      />

      <div className="container-x relative">
        <Reveal>
          <SectionHeader
            eyebrowIcon={MessageSquareQuote}
            eyebrowLabel="Відгуки клієнтів"
            title="Не наші слова — їхні."
            description="Реальні власники з реальних об'єктів — про економію, спокій і енергонезалежність."
          />
        </Reveal>

        {/* Aggregate rating strip */}
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-2xl border border-line bg-bg/80 px-6 py-5 backdrop-blur-sm sm:flex-row sm:gap-10 lg:mt-12">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-sun-400 text-sun-400"
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <span className="h-display text-2xl font-semibold tabular-nums text-ink lg:text-3xl">
                {avgRating.toFixed(1)}
                <span className="text-base font-normal text-ink-soft"> / 5</span>
              </span>
            </div>

            <span className="hidden h-8 w-px bg-line sm:block" />

            <div className="text-center sm:text-left">
              <div className="text-xs uppercase tracking-[0.18em] text-ink-soft">
                На основі
              </div>
              <div className="h-display mt-0.5 text-sm font-semibold text-ink lg:text-base">
                {totalReviews}+ відгуків клієнтів
              </div>
            </div>

            <span className="hidden h-8 w-px bg-line sm:block" />

            <div className="text-center sm:text-left">
              <div className="text-xs uppercase tracking-[0.18em] text-ink-soft">
                Рекомендують
              </div>
              <div className="h-display mt-0.5 text-sm font-semibold text-leaf-600 lg:text-base">
                100% клієнтів
              </div>
            </div>
          </div>
        </Reveal>

        {/* Marquee rows */}
        <div className="mt-10 space-y-5 lg:mt-12 lg:space-y-6">
          <MarqueeRow direction="left" duration={48} />
          <MarqueeRow direction="right" duration={56} />
        </div>
      </div>
    </section>
  );
}

/* ── Marquee row ─────────────────────────────────────────────────── */

function MarqueeRow({
  direction,
  duration,
}: {
  direction: "left" | "right";
  duration: number;
}) {
  const xRange =
    direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"];

  return (
    <div className="mask-fade-x relative overflow-hidden">
      <motion.div
        animate={{ x: xRange }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex w-fit gap-5"
      >
        {ROW.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} t={t} />
        ))}
      </motion.div>
    </div>
  );
}

/* ── Testimonial card ────────────────────────────────────────────── */

function TestimonialCard({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <article className="relative flex w-[340px] shrink-0 flex-col gap-4 rounded-3xl border border-line bg-bg p-6 shadow-soft sm:w-[400px] sm:p-7">
      {/* Top: rating + quote icon */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < t.rating
                  ? "fill-sun-400 text-sun-400"
                  : "text-line"
              }`}
              strokeWidth={1.5}
            />
          ))}
        </div>
        <Quote
          className="h-6 w-6 text-leaf-600/40"
          strokeWidth={2}
        />
      </div>

      {/* Quote text */}
      <p className="text-base leading-relaxed text-ink text-pretty sm:text-[17px]">
        «{t.text}»
      </p>

      {/* Footer: initials + name + meta */}
      <div className="mt-auto flex items-center gap-3 border-t border-line pt-4">
        <span
          className="h-display grid h-11 w-11 shrink-0 place-items-center rounded-full bg-leaf-600 text-sm font-semibold text-bg shadow-soft"
          aria-hidden
        >
          {initials(t.name)}
        </span>
        <div className="min-w-0 flex-1">
          <div className="h-display text-sm font-semibold text-ink">
            {t.name}
          </div>
          <div className="mt-0.5 truncate text-xs text-ink-muted">
            {t.role}
          </div>
        </div>
      </div>

      {/* Tags row: location + station + date */}
      <div className="flex flex-wrap items-center gap-1.5 text-[10px] uppercase tracking-wider text-ink-soft">
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {t.location.split(",")[0]}
        </span>
        <span>·</span>
        <span className="inline-flex items-center gap-1">
          <Zap className="h-3 w-3" />
          {t.project.split("+")[0].trim()}
        </span>
        <span>·</span>
        <span className="inline-flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          {t.date}
        </span>
      </div>
    </article>
  );
}

/* ── Utils ───────────────────────────────────────────────────────── */

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "";
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
