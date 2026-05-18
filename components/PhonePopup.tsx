"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  X,
  Mail,
  MapPin,
  Send,
  MessageCircle,
  Instagram,
  Clock,
} from "lucide-react";
import { COMPANY } from "@/lib/data";

const TIKTOK_ICON_PATH =
  "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.81a8.16 8.16 0 0 0 4.77 1.52V6.88a4.85 4.85 0 0 1-1.84-.19Z";

export function PhonePopup({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/55 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Контакти"
        >
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-t-3xl bg-bg p-6 shadow-lift sm:rounded-3xl sm:p-8"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                  Звʼязок з нами
                </div>
                <h3 className="h-display mt-1.5 text-2xl font-semibold tracking-tight">
                  Як зручніше?
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Закрити"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-ink transition-colors hover:bg-bg-warm"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Phones */}
            <div className="mt-6 space-y-2">
              {COMPANY.phones.map((p, i) => (
                <a
                  key={p}
                  href={`tel:${COMPANY.phonesRaw[i]}`}
                  onClick={onClose}
                  className="group flex items-center gap-3 rounded-2xl border border-line bg-bg-warm/40 px-4 py-3 transition-all hover:border-leaf-600 hover:bg-leaf-50"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-leaf-600 text-bg">
                    <Phone className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                  <div className="flex-1">
                    <div className="h-display text-base font-semibold text-ink">
                      {p}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-ink-soft">
                      {i === 0 ? "Київстар · головний" : "Vodafone"}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Messengers + socials */}
            <div className="mt-5">
              <div className="text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                Або напишіть
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2">
                <ChannelBtn
                  href={`https://t.me/${COMPANY.phonesRaw[0].replace("+", "")}`}
                  label="Telegram"
                  icon={Send}
                />
                <ChannelBtn
                  href={`viber://chat?number=${COMPANY.phonesRaw[0]}`}
                  label="Viber"
                  icon={MessageCircle}
                />
                <ChannelBtn
                  href={COMPANY.instagram}
                  label="Instagram"
                  icon={Instagram}
                />
                <ChannelBtn href={COMPANY.tiktok} label="TikTok">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d={TIKTOK_ICON_PATH} />
                  </svg>
                </ChannelBtn>
              </div>
            </div>

            {/* Email + address */}
            <div className="mt-5 space-y-2">
              <a
                href={`mailto:${COMPANY.email}`}
                onClick={onClose}
                className="flex items-center gap-3 rounded-2xl border border-line px-4 py-3 text-sm transition-colors hover:bg-bg-warm"
              >
                <Mail className="h-4 w-4 shrink-0 text-leaf-600" />
                <span className="truncate">{COMPANY.email}</span>
              </a>
              <a
                href={COMPANY.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-start gap-3 rounded-2xl border border-line px-4 py-3 text-sm transition-colors hover:bg-bg-warm"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-leaf-600" />
                <span>
                  {COMPANY.addressStreet}
                  <br />
                  <span className="text-xs text-ink-muted">
                    {COMPANY.addressCity}
                  </span>
                </span>
              </a>
            </div>

            {/* Hours */}
            <div className="mt-5 flex items-center gap-2 rounded-full bg-bg-warm px-4 py-2 text-xs text-ink-muted">
              <Clock className="h-3.5 w-3.5 text-leaf-600" />
              {COMPANY.workingHours}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ChannelBtn({
  href,
  label,
  icon: Icon,
  children,
}: {
  href: string;
  label: string;
  icon?: typeof Send;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-line bg-bg py-3 text-[11px] font-medium text-ink-muted transition-all hover:border-leaf-600 hover:bg-leaf-50 hover:text-leaf-700"
    >
      <span className="grid h-7 w-7 place-items-center text-leaf-600">
        {Icon ? <Icon className="h-4 w-4" strokeWidth={2} /> : children}
      </span>
      {label}
    </a>
  );
}
