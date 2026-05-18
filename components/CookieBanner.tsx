"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { LegalModal, type LegalDocKey } from "./LegalModal";

const STORAGE_KEY = "runasolar:cookie-consent";
const CONSENT_EVENT = "runasolar:consent-change";

export type ConsentValue = "accepted" | "rejected";

/** Sync read for code outside React (e.g. Analytics gate). */
export function getStoredConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "accepted" || v === "rejected" ? v : null;
}

/** React hook — re-renders when consent changes (banner click). */
export function useCookieConsent(): ConsentValue | null {
  const [consent, setConsent] = useState<ConsentValue | null>(null);

  useEffect(() => {
    setConsent(getStoredConsent());
    const onChange = (e: Event) => {
      const next = (e as CustomEvent<ConsentValue>).detail;
      setConsent(next);
    };
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  return consent;
}

function setConsent(value: ConsentValue) {
  window.localStorage.setItem(STORAGE_KEY, value);
  window.dispatchEvent(new CustomEvent<ConsentValue>(CONSENT_EVENT, { detail: value }));
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [legalOpen, setLegalOpen] = useState<LegalDocKey | null>(null);

  useEffect(() => {
    // Defer slightly so the banner doesn't fight the hero animation
    const id = window.setTimeout(() => {
      if (getStoredConsent() === null) setVisible(true);
    }, 1200);
    return () => window.clearTimeout(id);
  }, []);

  const accept = () => {
    setConsent("accepted");
    setVisible(false);
  };
  const reject = () => {
    setConsent("rejected");
    setVisible(false);
  };

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-3xl rounded-2xl border border-line bg-bg/95 p-4 shadow-lift backdrop-blur-md sm:bottom-5 sm:p-5 lg:left-1/2 lg:right-auto lg:-translate-x-1/2"
            role="dialog"
            aria-label="Згода на використання cookies"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-leaf-50 text-leaf-600">
                <Cookie className="h-5 w-5" strokeWidth={2} />
              </span>

              <div className="flex-1 text-sm text-ink">
                <p className="text-pretty">
                  Ми використовуємо cookies для аналітики (Google Analytics) — це
                  допомагає робити сайт зручнішим. Без вашої згоди аналітика не
                  запускається.{" "}
                  <button
                    type="button"
                    onClick={() => setLegalOpen("privacy")}
                    className="font-medium text-leaf-600 underline-offset-2 hover:underline"
                  >
                    Детальніше у Політиці
                  </button>
                  .
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={accept}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-leaf-600 px-5 py-2 text-sm font-medium text-bg transition-colors hover:bg-leaf-700"
                  >
                    Прийняти
                  </button>
                  <button
                    type="button"
                    onClick={reject}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full border border-line px-5 py-2 text-sm font-medium text-ink-muted transition-colors hover:border-ink hover:text-ink"
                  >
                    Лише необхідні
                  </button>
                </div>
              </div>

              <button
                onClick={reject}
                aria-label="Закрити (відхилити)"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink-soft transition-colors hover:bg-bg-warm hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LegalModal open={legalOpen} onClose={() => setLegalOpen(null)} />
    </>
  );
}
