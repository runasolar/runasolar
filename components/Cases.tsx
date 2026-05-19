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

    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(!atEnd);

    // Always one dot per case. Active = leftmost card index, except the
    // tail position is sticky — when scrolled past the last reachable
    // snap point, the final dot stays active even if maxScroll didn't
    // line up with the last card's leftmost position (typical on tablet
    // where each card is < 100 % viewport).
    const total = CASES.length;
    setPositions(total);

    const cardStep = getCardStep(el);
    const fromScroll = Math.max(0, Math.round(el.scrollLeft / cardStep));
    const current = atEnd ? total - 1 : Math.min(total - 1, fromScroll);
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
    // Clamp to maxScroll so the trailing dot still works on tablet, where
    // i*cardStep can exceed scrollable distance.
    const target = Math.min(
      idx * getCardStep(el),
      el.scrollWidth - el.clientWidth
    );
    el.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
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
            index="03 / 04"
            eyebrowIcon={Briefcase}
            eyebrowLabel="Реалізовані проєкти"
            title="Збудовані обʼєкти у Хмельницькій області."
            description="Кілька наших робіт у Хмельницькому — від приватних будинків до офісних центрів. Усе під ключ: від проєктування до запуску станції."
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
                  <CaseCard c={c} />
                </li>
              ))}
            </ul>

            {/* Controls strip — hidden on lg+ where all cards fit in a row */}
            <div className="mt-6 flex items-center justify-between gap-4 lg:hidden">
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
function CaseCard({ c }: { c: (typeof CASES)[number] }) {
  const isBusiness = c.type === "Бізнес";

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-full overflow-hidden rounded-3xl shadow-soft transition-shadow duration-500 hover:shadow-lift"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-bg-warm sm:aspect-[4/3]">
        {c.video ? (
          <video
            src={c.video}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label={`${c.title}, ${c.location}`}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          />
        ) : (
          <Image
            src={c.image}
            alt={`${c.title}, ${c.location}`}
            fill
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 60vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />

        {/* Type chip */}
        <div className="absolute left-4 top-4">
          <span
            className={`rounded-full px-3 py-1.5 text-xs font-medium backdrop-blur-md ${
              isBusiness ? "bg-ink/80 text-bg" : "bg-bg/95 text-ink"
            }`}
          >
            {c.type}
          </span>
        </div>

        {/* Power chip */}
        <div className="absolute right-4 top-4">
          <span className="h-display inline-flex items-center gap-1 rounded-full bg-sun-500 px-3 py-1.5 text-sm font-bold tabular-nums text-ink shadow-soft">
            <Zap className="h-3.5 w-3.5" strokeWidth={2.5} />
            {c.power}
          </span>
        </div>

        {/* Location overlay */}
        <div className="absolute inset-x-5 bottom-5 lg:inset-x-6 lg:bottom-6">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-bg/80">
            <MapPin className="h-3 w-3" />
            Локація
          </div>
          <div className="h-display mt-1.5 text-lg font-semibold leading-tight text-bg lg:text-xl">
            {c.location}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
