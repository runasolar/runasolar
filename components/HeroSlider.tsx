"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calculator as CalculatorIcon,
  ChevronLeft,
  ChevronRight,
  Phone,
} from "lucide-react";
import { Magnetic } from "./Magnetic";

// Unsplash photos — solar panels, residential roofs & utility farms.
// Loaded via Next/Image; domain whitelisted in next.config.mjs.
const SLIDE_IMAGES = [
  // Large solar panel against open sky — cinematic hero shot
  "https://images.unsplash.com/photo-1679046410011-b6bf7ce71f22?w=1600&q=75&auto=format&fit=crop",
  // Close-up solar panels on rooftop — texture, blue tones
  "https://images.unsplash.com/photo-1745187946672-2c1d8cf26a2b?w=1600&q=75&auto=format&fit=crop",
  // Aerial solar farm in field — commercial / utility scale
  "https://images.unsplash.com/photo-1756913454165-246d96a20b67?w=1600&q=75&auto=format&fit=crop",
  // Solar farm with rows of panels — industrial / agro
  "https://images.unsplash.com/photo-1680355065203-43ad84bb6e69?w=1600&q=75&auto=format&fit=crop",
];

const HERO = {
  eyebrow: "Альтернативна енергетика",
  titleStart: "ЧИСТА, БЕЗПЕЧНА,",
  titleHighlight: "ВІДНОВЛЮВАНА",
  descriptionLead:
    "Основний профіль компанії RUNA SOLAR — сонячні електростанції, системи безперебійного живлення та накопичувачі енергії під ключ.",
  descriptionBody:
    "Наша команда має багаторічний досвід в альтернативній енергетиці. З нами у вашій оселі завжди буде світло не тільки від мережі, а й завдяки природним та альтернативним ресурсам.",
};

const AUTOPLAY_MS = 8500;

export function HeroSlider() {
  const [active, setActive] = useState(0);

  const goto = useCallback((i: number) => {
    setActive(((i % SLIDE_IMAGES.length) + SLIDE_IMAGES.length) % SLIDE_IMAGES.length);
  }, []);
  const next = useCallback(() => goto(active + 1), [active, goto]);
  const prev = useCallback(() => goto(active - 1), [active, goto]);

  useEffect(() => {
    const id = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [active, next]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-ink text-bg"
    >
      {/* Background images — all 4 rendered + preloaded, only active one visible */}
      <div className="absolute inset-0 -z-10">
        {SLIDE_IMAGES.map((src, i) => (
          <motion.div
            key={src}
            initial={false}
            animate={{
              opacity: i === active ? 1 : 0,
              scale: i === active ? 1 : 1.06,
            }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={src}
              alt=""
              aria-hidden
              fill
              priority={i === 0}
              loading={i === 0 ? undefined : "eager"}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/65 to-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
      </div>

      <div className="container-x relative">
        <div className="flex min-h-[640px] flex-col justify-end pb-12 pt-32 sm:min-h-[720px] sm:pb-16 sm:pt-36 lg:min-h-[760px] lg:pb-24 lg:pt-40">
          {/* Static content — same on every slide */}
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-sun-400">
              <span className="h-px w-8 bg-sun-400/70" />
              {HERO.eyebrow}
            </div>
            <h1 className="h-display mt-5 text-[clamp(2rem,5.2vw,4.75rem)] font-semibold uppercase leading-[1.05] tracking-tight text-balance">
              {HERO.titleStart}{" "}
              <span className="text-sun-400">{HERO.titleHighlight}</span>
            </h1>
            <div className="mt-6 max-w-xl space-y-4 text-base text-bg/80 text-pretty sm:text-lg">
              <p>{HERO.descriptionLead}</p>
              <p>{HERO.descriptionBody}</p>
            </div>

            {/* CTAs */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Magnetic strength={8}>
                <a
                  href="#contact"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-sun-500 px-7 py-4 text-base font-medium text-ink transition-colors hover:bg-sun-400 sm:w-auto"
                >
                  <Phone className="h-4 w-4" strokeWidth={2.5} />
                  Замовити консультацію
                </a>
              </Magnetic>
              <Magnetic strength={6}>
                <a
                  href="#calculator"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-bg/30 bg-bg/5 px-7 py-4 text-base font-medium text-bg backdrop-blur-md transition-all hover:border-bg hover:bg-bg/10 sm:w-auto"
                >
                  <CalculatorIcon className="h-4 w-4" strokeWidth={2.2} />
                  Розрахувати станцію
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={2.5}
                  />
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Bottom controls strip */}
          <div className="mt-12 flex items-center justify-between gap-4 border-t border-bg/15 pt-6 sm:mt-16">
            <div className="flex items-center gap-5 sm:gap-7">
              <div className="h-display flex items-baseline gap-1 text-lg font-semibold tabular-nums">
                <span className="text-bg">
                  {String(active + 1).padStart(2, "0")}
                </span>
                <span className="text-bg/70">
                  /{String(SLIDE_IMAGES.length).padStart(2, "0")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {SLIDE_IMAGES.map((_, i) => {
                  const isActive = i === active;
                  return (
                    <button
                      key={i}
                      onClick={() => goto(i)}
                      aria-label={`Слайд ${i + 1}`}
                      aria-current={isActive}
                      className={`relative h-1 overflow-hidden rounded-full transition-all ${
                        isActive
                          ? "w-12 bg-bg/25"
                          : "w-4 bg-bg/30 hover:bg-bg/60"
                      }`}
                    >
                      {isActive && (
                        <span
                          key={active}
                          className="slide-progress-bar absolute inset-0 rounded-full bg-sun-400"
                          style={{
                            animationDuration: `${AUTOPLAY_MS}ms`,
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                aria-label="Попередній слайд"
                className="grid h-11 w-11 place-items-center rounded-full border border-bg/25 bg-bg/5 text-bg backdrop-blur-md transition-all hover:border-bg hover:bg-bg/15 sm:h-12 sm:w-12"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={2} />
              </button>
              <button
                onClick={next}
                aria-label="Наступний слайд"
                className="grid h-11 w-11 place-items-center rounded-full border border-bg/25 bg-bg/5 text-bg backdrop-blur-md transition-all hover:border-bg hover:bg-bg/15 sm:h-12 sm:w-12"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
