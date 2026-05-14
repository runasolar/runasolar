"use client";

import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { useRef, useState } from "react";
import {
  PhoneCall,
  ClipboardCheck,
  PenLine,
  Wrench,
  Zap,
  Clock,
  CheckCircle2,
  ArrowRight,
  ListChecks,
} from "lucide-react";
import { PROCESS_STEPS } from "@/lib/data";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const STEP_META: Record<
  string,
  {
    duration: string;
    icon: typeof PhoneCall;
    facts: string[];
    accent: { fg: string; bg: string; ring: string; soft: string };
  }
> = {
  "01": {
    duration: "30 хвилин",
    icon: PhoneCall,
    facts: ["Безкоштовно", "Без зобов'язань"],
    accent: {
      fg: "text-sun-500",
      bg: "bg-sun-500",
      ring: "ring-sun-400/30",
      soft: "bg-sun-200/40",
    },
  },
  "02": {
    duration: "1–2 дні",
    icon: ClipboardCheck,
    facts: ["Виїзд по області", "Фото та заміри"],
    accent: {
      fg: "text-leaf-600",
      bg: "bg-leaf-600",
      ring: "ring-leaf-500/30",
      soft: "bg-leaf-100/60",
    },
  },
  "03": {
    duration: "3–5 днів",
    icon: PenLine,
    facts: ["Технічна схема", "Фінальний кошторис"],
    accent: {
      fg: "text-sky-600",
      bg: "bg-sky-600",
      ring: "ring-sky-mist",
      soft: "bg-sky-mist/40",
    },
  },
  "04": {
    duration: "3–7 днів",
    icon: Wrench,
    facts: ["Своя бригада", "Протоколи випробувань"],
    accent: {
      fg: "text-leaf-700",
      bg: "bg-leaf-700",
      ring: "ring-leaf-600/30",
      soft: "bg-leaf-100/60",
    },
  },
  "05": {
    duration: "5–10 днів",
    icon: Zap,
    facts: ["Усі документи", "Налаштування додатку"],
    accent: {
      fg: "text-sun-600",
      bg: "bg-sun-600",
      ring: "ring-sun-400/30",
      soft: "bg-sun-200/40",
    },
  },
};

export function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 35%", "end 65%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const stepCount = PROCESS_STEPS.length;
    const idx = Math.max(
      0,
      Math.min(stepCount - 1, Math.floor(p * stepCount))
    );
    setActiveStep(idx);
  });

  return (
    <section id="process" className="relative section-pad overflow-clip">
      {/* Background decor */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-32 h-[560px] w-[560px] rounded-full bg-sun-200/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-40 h-[460px] w-[460px] rounded-full bg-leaf-100/50 blur-3xl"
      />

      <div className="container-x relative">
        <Reveal>
          <SectionHeader
            index="06 / 09"
            eyebrowIcon={ListChecks}
            eyebrowLabel="Як ми працюємо"
            title="Від заявки до першого кіловата — 14 днів."
            description="П'ять кроків, кожен з фіксованим терміном. Ви знаєте, що і коли відбувається."
          />
        </Reveal>

        {/* Main scroll-sync layout */}
        <div className="mt-12 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          {/* ── Sticky visual (desktop) ───────────────────────────── */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <StickyVisual activeIndex={activeStep} />
            </div>
          </div>

          {/* ── Step cards column ──────────────────────────────────── */}
          <ol ref={listRef} className="space-y-5 lg:col-span-7 lg:space-y-8">
            {PROCESS_STEPS.map((step, i) => (
              <ProcessCard
                key={step.n}
                step={step}
                index={i}
                total={PROCESS_STEPS.length}
                active={i === activeStep}
              />
            ))}

            {/* Final "Готово" card */}
            <motion.li
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl bg-leaf-700 p-6 text-bg lg:p-8"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-sun-400/25 blur-3xl"
              />
              <div className="relative flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-sun-400 text-ink shadow-lift lg:h-14 lg:w-14">
                  <CheckCircle2 className="h-6 w-6 lg:h-7 lg:w-7" strokeWidth={2.5} />
                </span>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-bg/55">
                    Фініш
                  </div>
                  <div className="h-display mt-1 text-xl font-semibold text-balance lg:text-2xl">
                    Готово —{" "}
                    <span className="text-sun-400">ваша станція генерує.</span>
                  </div>
                </div>
              </div>
            </motion.li>
          </ol>
        </div>

        {/* Summary footer */}
        <Reveal delay={0.2}>
          <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-3xl border border-line bg-bg-warm/80 p-6 backdrop-blur-sm lg:mt-24 lg:flex-row lg:items-center lg:p-8">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              <div>
                <div className="text-xs uppercase tracking-wider text-ink-soft">
                  Загалом
                </div>
                <div className="h-display mt-1 text-2xl font-semibold tabular-nums lg:text-3xl">
                  7–14{" "}
                  <span className="text-base font-normal text-ink-muted">
                    днів
                  </span>
                </div>
              </div>
              <span className="hidden h-10 w-px bg-line lg:block" />
              <div>
                <div className="text-xs uppercase tracking-wider text-ink-soft">
                  Ваша частина
                </div>
                <div className="h-display mt-1 text-2xl font-semibold tabular-nums lg:text-3xl">
                  ~2{" "}
                  <span className="text-base font-normal text-ink-muted">
                    години
                  </span>
                </div>
              </div>
              <span className="hidden h-10 w-px bg-line lg:block" />
              <div>
                <div className="text-xs uppercase tracking-wider text-ink-soft">
                  Документи
                </div>
                <div className="h-display mt-1 text-2xl font-semibold lg:text-3xl">
                  робимо ми
                </div>
              </div>
            </div>

            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-leaf-600 px-6 py-3.5 text-sm font-medium text-bg transition-colors hover:bg-leaf-700"
            >
              Залишити заявку
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                strokeWidth={2.5}
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Sticky visual — morphs between steps ───────────────────────── */

function StickyVisual({ activeIndex }: { activeIndex: number }) {
  const step = PROCESS_STEPS[activeIndex];
  const meta = STEP_META[step.n];
  const Icon = meta.icon;

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line bg-bg shadow-lift">
      {/* Soft accent background per step */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${step.n}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div
            className={`absolute -right-20 -top-20 h-80 w-80 rounded-full ${meta.accent.soft} blur-3xl`}
          />
          <div
            className={`absolute -bottom-32 -left-20 h-72 w-72 rounded-full ${meta.accent.soft} blur-3xl opacity-70`}
          />
        </motion.div>
      </AnimatePresence>

      {/* Subtle dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgb(var(--color-line)) 1px, transparent 0)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />

      <div className="relative flex h-full flex-col p-8">
        {/* Center: morphing icon */}
        <div className="relative flex flex-1 items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={step.n}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col items-center"
            >
              {/* Icon disc */}
              <div className="relative">
                <motion.span
                  aria-hidden
                  animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.9, 0.6] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className={`pointer-events-none absolute inset-0 -m-6 rounded-full ${meta.accent.soft} blur-xl`}
                />
                <span
                  className={`relative grid h-28 w-28 place-items-center rounded-full bg-bg ring-8 transition-all ${meta.accent.ring} shadow-lift`}
                >
                  <Icon
                    className={`h-12 w-12 ${meta.accent.fg}`}
                    strokeWidth={1.8}
                  />
                </span>
              </div>

              {/* Step title under icon */}
              <div className="mt-8 max-w-[280px] text-center">
                <div className="text-[10px] uppercase tracking-[0.22em] text-ink-soft">
                  Поточний крок
                </div>
                <div className="h-display mt-2 text-lg font-semibold text-ink text-balance lg:text-xl">
                  {step.title}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom: duration badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`dur-${step.n}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="flex items-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-bg px-3.5 py-1.5 text-xs font-medium text-ink shadow-soft">
              <Clock className={`h-3.5 w-3.5 ${meta.accent.fg}`} strokeWidth={2.5} />
              {meta.duration}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── Step card ──────────────────────────────────────────────────── */

function ProcessCard({
  step,
  index,
  total,
  active,
}: {
  step: (typeof PROCESS_STEPS)[number];
  index: number;
  total: number;
  active: boolean;
}) {
  const meta = STEP_META[step.n];
  const Icon = meta.icon;

  return (
    <motion.li
      id={`step-${step.n}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{
          borderColor: active
            ? "rgb(var(--color-leaf-600) / 0.4)"
            : "rgb(var(--color-line))",
          boxShadow: active
            ? "0 24px 60px -24px rgba(46,93,58,0.18)"
            : "0 4px 12px -8px rgba(0,0,0,0.04)",
        }}
        transition={{ duration: 0.4 }}
        className="group relative overflow-hidden rounded-3xl border bg-bg/80 p-6 backdrop-blur-sm lg:p-8"
      >
        {/* Top-right huge number watermark */}
        <span
          aria-hidden
          className="h-display pointer-events-none absolute -right-4 -top-6 select-none text-[7rem] font-bold leading-none text-ink/[0.04] lg:-right-6 lg:-top-8 lg:text-[9rem]"
        >
          {step.n}
        </span>

        {/* Active accent glow */}
        <motion.span
          aria-hidden
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className={`pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full ${meta.accent.soft} blur-3xl`}
        />

        <div className="relative">
          {/* Top row: counter + duration + icon */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                Крок {index + 1} з {total}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg px-2.5 py-1 text-xs font-medium text-ink shadow-soft">
                <Clock className={`h-3 w-3 ${meta.accent.fg}`} strokeWidth={2.5} />
                {meta.duration}
              </span>
            </div>

            {/* Small icon — visible on mobile/tablet where there's no sticky visual */}
            <motion.span
              animate={{
                scale: active ? 1.06 : 1,
              }}
              transition={{ duration: 0.35 }}
              className={`grid h-10 w-10 place-items-center rounded-full bg-bg ring-2 lg:hidden ${meta.accent.ring}`}
            >
              <Icon className={`h-4 w-4 ${meta.accent.fg}`} strokeWidth={2.2} />
            </motion.span>
          </div>

          {/* Number + title */}
          <div className="mt-5 flex items-baseline gap-3">
            <span className={`h-display text-3xl font-bold tabular-nums ${meta.accent.fg} lg:text-4xl`}>
              {step.n}
            </span>
            <h3 className="h-display text-xl font-semibold text-balance leading-tight lg:text-2xl">
              {step.title}
            </h3>
          </div>

          <p className="mt-3 max-w-[60ch] text-base text-ink-muted text-pretty">
            {step.text}
          </p>

          {/* Key facts */}
          <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
            {meta.facts.map((fact) => (
              <li
                key={fact}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg-warm/60 px-3 py-1 text-xs font-medium text-ink"
              >
                <CheckCircle2
                  className={`h-3.5 w-3.5 ${meta.accent.fg}`}
                  strokeWidth={2.5}
                />
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.li>
  );
}
