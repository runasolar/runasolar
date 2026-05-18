"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Zap,
  Wallet,
  Clock,
  Briefcase,
} from "lucide-react";
import { CASES } from "@/lib/data";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function Cases() {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [active, setActive] = useState(0);
  const [positions, setPositions] = useState(1);

  const getCardStep = (el: HTMLElement) => {
    const card = el.querySelector<HTMLElement>("[data-case-card]");
    return card ? card.offsetWidth + 20 : el.clientWidth;
  };

  const updateNav = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;

    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);

    const cardStep = getCardStep(el);
    // How many cards fit fully in the viewport (round handles peek/teaser)
    const visibleCount = Math.max(1, Math.round(el.clientWidth / cardStep));
    // Distinct snap-positions = where each non-trailing card can be leftmost
    const total = Math.max(1, CASES.length - visibleCount + 1);
    setPositions(total);

    const current = Math.min(
      total - 1,
      Math.max(0, Math.round(el.scrollLeft / cardStep))
    );
    setActive(current);
  }, []);

  useEffect(() => {
    updateNav();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateNav, { passive: true });
    window.addEventListener("resize", updateNav);
    return () => {
      el.removeEventListener("scroll", updateNav);
      window.removeEventListener("resize", updateNav);
    };
  }, [updateNav]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * getCardStep(el), behavior: "smooth" });
  };

  const scrollToPosition = (idx: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: idx * getCardStep(el), behavior: "smooth" });
  };

  return (
    <section id="cases" className="relative section-pad overflow-clip">
      {/* Background decor */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-60 h-[500px] w-[500px] rounded-full bg-leaf-100/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-20 h-[420px] w-[420px] rounded-full bg-sun-200/30 blur-3xl"
      />

      <div className="container-x relative">
        <Reveal>
          <SectionHeader
            index="03 / 05"
            eyebrowIcon={Briefcase}
            eyebrowLabel="Реалізовані проєкти"
            title="Збудовані обʼєкти у Хмельницькій області."
            description="Приватні будинки, готелі, виробництва й агро — реальні цифри генерації та окупності, які можна перевірити."
            right={
              <a href="#contact" className="btn-secondary group">
                Хочу так само
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            }
          />
        </Reveal>

        {/* Carousel */}
        <Reveal delay={0.15}>
          <div className="relative mt-10 lg:mt-14">
            <ul
              ref={scrollerRef}
              className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-4 lg:-mx-8 lg:gap-5 lg:scroll-px-8 lg:px-8"
              style={{ scrollbarWidth: "none" }}
            >
              {CASES.map((c, i) => (
                <li
                  key={c.title}
                  data-case-card
                  className="w-[92%] shrink-0 snap-start sm:w-[60%] lg:w-[calc((100%-2.5rem)/3)]"
                >
                  <CaseCard c={c} index={i} />
                </li>
              ))}
            </ul>

            {/* Controls strip */}
            <div className="mt-6 flex items-center justify-between gap-4 lg:mt-8">
              {/* Dots — one per reachable snap position */}
              {positions > 1 ? (
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: positions }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => scrollToPosition(i)}
                      aria-label={`Позиція ${i + 1}`}
                      aria-current={i === active}
                      className={`h-1 rounded-full transition-all ${
                        i === active
                          ? "w-8 bg-leaf-600"
                          : "w-4 bg-line hover:bg-ink-soft"
                      }`}
                    />
                  ))}
                </div>
              ) : (
                <span aria-hidden />
              )}

              {/* Counter + prev / next */}
              <div className="flex items-center gap-3">
                <span className="h-display text-sm tabular-nums text-ink-soft">
                  <span className="text-ink">
                    {String(active + 1).padStart(2, "0")}
                  </span>
                  <span> / {String(positions).padStart(2, "0")}</span>
                </span>
                <button
                  onClick={() => scrollByCard(-1)}
                  disabled={!canPrev}
                  aria-label="Попередній проєкт"
                  className="grid h-11 w-11 place-items-center rounded-full border border-line bg-bg text-ink transition-all hover:border-ink hover:bg-bg-warm disabled:cursor-not-allowed disabled:opacity-30 lg:h-12 lg:w-12"
                >
                  <ChevronLeft className="h-5 w-5" strokeWidth={2} />
                </button>
                <button
                  onClick={() => scrollByCard(1)}
                  disabled={!canNext}
                  aria-label="Наступний проєкт"
                  className="grid h-11 w-11 place-items-center rounded-full border border-line bg-bg text-ink transition-all hover:border-ink hover:bg-bg-warm disabled:cursor-not-allowed disabled:opacity-30 lg:h-12 lg:w-12"
                >
                  <ChevronRight className="h-5 w-5" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Project card ────────────────────────────────────────────────── */
function CaseCard({
  c,
  index,
}: {
  c: (typeof CASES)[number];
  index: number;
}) {
  const isBusiness = c.type === "Бізнес";

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-bg shadow-soft transition-shadow duration-500 hover:shadow-lift"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-bg-warm">
        <Image
          src={c.image}
          alt={c.title}
          fill
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 58vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          priority={index === 0}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-transparent" />

        {/* Type chip */}
        <div className="absolute left-4 top-4">
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium backdrop-blur-md ${
              isBusiness ? "bg-ink/80 text-bg" : "bg-bg/95 text-ink"
            }`}
          >
            {c.type}
          </span>
        </div>

        {/* Power chip */}
        <div className="absolute right-4 top-4">
          <span className="h-display inline-flex items-center gap-1 rounded-full bg-sun-500 px-3 py-1 text-sm font-bold tabular-nums text-ink shadow-soft">
            <Zap className="h-3.5 w-3.5" strokeWidth={2.5} />
            {c.power}
          </span>
        </div>

        {/* Title overlay */}
        <div className="absolute inset-x-5 bottom-5">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-bg/80">
            <MapPin className="h-3 w-3" />
            {c.location.split(",")[0]}
          </div>
          <h3 className="h-display mt-1.5 text-lg font-semibold leading-tight text-bg lg:text-xl">
            {c.title.split(",")[0]}
          </h3>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-1 flex-col gap-4 p-5 lg:p-6">
        {/* Two-metric strip */}
        <ul className="grid grid-cols-2 gap-3">
          <Metric icon={Wallet} label="Економія" value={c.savings.replace(" / рік", "/рік")} />
          <Metric icon={Clock} label="Окупність" value={c.payback} />
        </ul>

        {/* Quote */}
        <p className="line-clamp-2 text-sm text-ink-muted text-pretty">
          “{c.quote}” <span className="text-ink-soft">— {c.client}</span>
        </p>

        {/* Bottom: Детальніше */}
        <a
          href="#contact"
          className="mt-auto inline-flex items-center justify-between gap-2 rounded-full border border-line bg-bg-warm/40 px-4 py-3 text-sm font-medium text-ink transition-all hover:border-leaf-600 hover:bg-leaf-50 hover:text-leaf-700"
        >
          Детальніше про проєкт
          <ArrowUpRight
            className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={2}
          />
        </a>
      </div>
    </motion.article>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Zap;
  label: string;
  value: string;
}) {
  return (
    <li className="rounded-2xl border border-line bg-bg-warm/40 p-3">
      <div className="flex items-center gap-1.5">
        <Icon className="h-3 w-3 shrink-0 text-leaf-600" strokeWidth={2} />
        <div className="truncate text-[9px] uppercase tracking-wider text-ink-soft">
          {label}
        </div>
      </div>
      <div className="h-display mt-1 truncate text-sm font-semibold tabular-nums leading-tight text-ink">
        {value}
      </div>
    </li>
  );
}
