"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Wallet,
  Wrench,
  FileText,
  Headphones,
  LayoutList,
  Phone,
  MessageCircle,
  HelpCircle,
} from "lucide-react";
import { FAQ as FAQ_DATA, FAQ_CATEGORIES, COMPANY, type FaqCategory } from "@/lib/data";
import { Reveal } from "./Reveal";
import { SplitText } from "./SplitText";
import { SectionEyebrow } from "./SectionEyebrow";

const CATEGORY_ICONS: Record<FaqCategory, typeof Wallet> = {
  Ціни: Wallet,
  Технічно: Wrench,
  Документи: FileText,
  Сервіс: Headphones,
};

type Filter = "Усі" | FaqCategory;

export function FAQ() {
  const [filter, setFilter] = useState<Filter>("Усі");
  const [open, setOpen] = useState<number | null>(0);

  const filtered = useMemo(
    () =>
      FAQ_DATA.filter((q) => filter === "Усі" || q.category === filter),
    [filter]
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { Усі: FAQ_DATA.length };
    FAQ_CATEGORIES.forEach((cat) => {
      c[cat] = FAQ_DATA.filter((q) => q.category === cat).length;
    });
    return c;
  }, []);

  return (
    <section id="faq" className="section-pad bg-bg">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left column — header + categories + contact card */}
          <div className="lg:col-span-4">
            <Reveal>
              <SectionEyebrow icon={HelpCircle} label="Часті питання" />
              <SplitText
                as="h2"
                text="Відповідаємо по-чесному."
                className="h-display mt-4 text-display-2 font-semibold text-balance"
              />
              <p className="mt-5 text-base text-ink-muted lg:text-lg">
                Зібрали найпоширеніше. Не знайшли відповідь? Зателефонуйте —
                пояснимо без води.
              </p>
            </Reveal>

            {/* Category filter */}
            <Reveal delay={0.1}>
              <div className="mt-8 lg:mt-10">
                <div className="text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                  Категорії
                </div>
                <ul className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:gap-1.5">
                  <li className="lg:w-full">
                    <CategoryButton
                      active={filter === "Усі"}
                      onClick={() => {
                        setFilter("Усі");
                        setOpen(0);
                      }}
                      icon={LayoutList}
                      label="Усі"
                      count={counts["Усі"]}
                    />
                  </li>
                  {FAQ_CATEGORIES.map((cat) => (
                    <li key={cat} className="lg:w-full">
                      <CategoryButton
                        active={filter === cat}
                        onClick={() => {
                          setFilter(cat);
                          setOpen(0);
                        }}
                        icon={CATEGORY_ICONS[cat]}
                        label={cat}
                        count={counts[cat]}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Contact CTA card */}
            <Reveal delay={0.2}>
              <div className="mt-8 rounded-2xl border border-line bg-bg p-5 lg:mt-10">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-leaf-600">
                  <MessageCircle className="h-3.5 w-3.5" />
                  Не знайшли відповідь?
                </div>
                <p className="mt-2 text-sm text-ink-muted">
                  Зателефонуйте — за 5 хвилин пояснимо все, що цікавить.
                </p>
                <a
                  href={`tel:${COMPANY.phonesRaw[0]}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-leaf-600 transition-colors hover:text-leaf-700"
                >
                  <Phone className="h-4 w-4" />
                  {COMPANY.phones[0]}
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right column — accordion */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.ul
                key={filter}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-2.5"
              >
                {filtered.map((item, i) => {
                  const isOpen = open === i;
                  const Icon = CATEGORY_ICONS[item.category];
                  return (
                    <motion.li
                      key={`${filter}-${item.q}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.04 }}
                      className={`overflow-hidden rounded-2xl border bg-bg transition-all ${
                        isOpen
                          ? "border-leaf-600/30 shadow-soft"
                          : "border-line hover:border-ink/30"
                      }`}
                    >
                      <button
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="relative flex w-full items-start justify-between gap-6 px-5 py-5 text-left lg:px-7 lg:py-6"
                        aria-expanded={isOpen}
                      >
                        {/* Left accent bar when open */}
                        <span
                          aria-hidden
                          className={`absolute inset-y-0 left-0 w-1 origin-top transition-transform duration-300 ${
                            isOpen
                              ? "scale-y-100 bg-leaf-600"
                              : "scale-y-0 bg-leaf-600"
                          }`}
                        />

                        <div className="flex items-start gap-3 lg:gap-4">
                          <span
                            className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg transition-colors lg:h-8 lg:w-8 ${
                              isOpen
                                ? "bg-leaf-600 text-bg"
                                : "bg-bg-warm text-ink-muted"
                            }`}
                          >
                            <Icon className="h-3.5 w-3.5 lg:h-4 lg:w-4" strokeWidth={2} />
                          </span>
                          <span className="h-display text-base font-medium text-balance text-ink lg:text-lg">
                            {item.q}
                          </span>
                        </div>

                        <motion.span
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.3 }}
                          className={`mt-0.5 grid h-9 w-9 flex-shrink-0 place-items-center rounded-full border transition-colors ${
                            isOpen
                              ? "border-leaf-600 bg-leaf-600 text-bg"
                              : "border-line"
                          }`}
                        >
                          <Plus className="h-4 w-4" strokeWidth={2.5} />
                        </motion.span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.35,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-6 pl-[60px] pr-12 lg:px-7 lg:pb-7 lg:pl-[72px]">
                              <p className="text-base text-ink-muted text-pretty">
                                {item.a}
                              </p>
                              <div className="mt-4 flex items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-bg-warm px-2.5 py-1 text-[11px] font-medium text-ink-muted">
                                  <Icon className="h-3 w-3 text-leaf-600" />
                                  {item.category}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryButton({
  active,
  onClick,
  icon: Icon,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof Wallet;
  label: string;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
        active
          ? "border-leaf-600 bg-leaf-600 text-bg shadow-soft"
          : "border-line bg-bg text-ink-muted hover:border-ink/40 hover:text-ink"
      }`}
    >
      <span className="flex items-center gap-2.5">
        <Icon className="h-4 w-4" strokeWidth={2} />
        {label}
      </span>
      <span
        className={`h-display rounded-full px-2 py-0.5 text-[10px] font-semibold tabular-nums transition-colors ${
          active ? "bg-bg/15 text-bg" : "bg-bg-warm text-ink-soft"
        }`}
      >
        {count}
      </span>
    </button>
  );
}
