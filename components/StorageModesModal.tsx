"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";

type Mode = {
  code: string;
  title: string;
  bullets: string[];
};

const MODES: Mode[] = [
  {
    code: "SELF-USE",
    title: "Основний режим",
    bullets: [
      "PV живить навантаження → заряджає батарею → надлишок віддається в мережу.",
      "Задаються мінімальний SOC, графік роботи батареї та можливість заряджання від мережі.",
      "Підходить там, де вигідніше споживати власну енергію, ніж продавати.",
    ],
  },
  {
    code: "TOU",
    title: "Режим за тарифами часу доби",
    bullets: [
      "Система працює за заданим графіком відповідно до вартості електроенергії.",
      "У дешеві години батарея заряджається, у дорогі — віддає енергію на навантаження.",
      "Підходить там, де є денні/нічні тарифи або потрібно зменшити витрати в пікові години.",
    ],
  },
  {
    code: "FEED-IN PRIORITY",
    title: "Режим пріоритету віддачі в мережу",
    bullets: [
      "PV живить навантаження → надлишок у мережу → заряд батареї.",
      "Пріоритет — продаж або віддача електроенергії в мережу.",
      'Підходить для об’єктів із вигідним "зеленим" або комерційним тарифом.',
    ],
  },
  {
    code: "MANUAL",
    title: "Ручний режим",
    bullets: [
      "Ручне керування роботою системи.",
      "Примусовий заряд, розряд або зупинка обміну енергією.",
      "Для сервісу, тестування та аварійних сценаріїв.",
    ],
  },
  {
    code: "АРБІТРАЖ",
    title: "Режим енергетичного арбітражу",
    bullets: [
      "Заряд у дешеві години → використання або віддача енергії в дорогі години.",
      "Система працює за різницею тарифів протягом доби.",
      "Підходить для об’єктів із погодинними або піковими тарифами.",
    ],
  },
];

export function StorageModesModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/60 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={onClose}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-bg shadow-lift sm:rounded-3xl"
          >
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-line bg-bg px-6 py-5 lg:px-8">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-leaf-600">
                  УЗЕ
                </div>
                <h3 className="h-display mt-1.5 text-xl font-semibold tracking-tight lg:text-2xl">
                  Режими роботи системи зберігання
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Закрити"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-ink-muted transition-colors hover:border-ink hover:text-ink"
              >
                <X className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>

            <ul
              data-lenis-prevent
              className="min-h-0 flex-1 overflow-y-auto px-6 py-6 lg:px-8 lg:py-8"
            >
              {MODES.map((m, i) => (
                <li
                  key={m.code}
                  className={
                    i === 0
                      ? ""
                      : "mt-7 border-t border-line pt-7 lg:mt-8 lg:pt-8"
                  }
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs tabular-nums text-ink-soft">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sun-600">
                        {m.code}
                      </div>
                      <h4 className="h-display mt-1 text-lg font-semibold tracking-tight lg:text-xl">
                        {m.title}
                      </h4>
                    </div>
                  </div>
                  <ul className="mt-3 space-y-2 pl-9">
                    {m.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2.5 text-sm text-ink-muted text-pretty"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-leaf-600"
                          strokeWidth={2.5}
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
