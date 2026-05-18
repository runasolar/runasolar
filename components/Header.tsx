"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { NAV } from "@/lib/data";
import { PhonePopup } from "./PhonePopup";

export function Header() {
  const [open, setOpen] = useState(false);
  const [phoneOpen, setPhoneOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-3 z-50 lg:top-5"
      >
        <div className="container-x">
          <div
            className="mx-auto flex items-center justify-between gap-4 rounded-full border border-line bg-bg px-3 py-2 shadow-soft lg:px-4 lg:py-2.5"
          >
            <a
              href="#top"
              className="flex shrink-0 items-center"
              aria-label="RUNA SOLAR — на головну"
            >
              <Image
                src="/logo.png"
                alt="RUNA SOLAR"
                width={160}
                height={56}
                priority
                className="h-12 w-auto sm:h-14 lg:h-16"
              />
            </a>

            <nav className="hidden items-center gap-0.5 lg:flex">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-bg-warm hover:text-ink"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPhoneOpen(true)}
                aria-label="Звʼязатися"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-ink transition-all hover:border-ink lg:h-10 lg:w-10"
              >
                <Phone className="h-4 w-4" />
              </button>
              <a
                href="#calculator"
                className="hidden h-10 items-center justify-center gap-1.5 rounded-full bg-leaf-600 px-5 text-sm font-medium text-bg transition-all hover:bg-leaf-700 md:inline-flex"
              >
                Розрахунок
              </a>
              <button
                onClick={() => setOpen(true)}
                aria-label="Меню"
                className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink transition-all lg:hidden"
              >
                <Menu className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-0 h-full w-[88%] max-w-sm bg-bg p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <Image
                  src="/logo.png"
                  alt="RUNA SOLAR"
                  width={160}
                  height={56}
                  className="h-14 w-auto"
                />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Закрити"
                  className="grid h-10 w-10 place-items-center rounded-full border border-line"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="mt-10 flex flex-col gap-1">
                {NAV.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="h-display py-3 text-2xl font-medium tracking-tight"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="divider my-6" />
              <button
                onClick={() => {
                  setOpen(false);
                  setPhoneOpen(true);
                }}
                className="flex w-full items-center gap-2 py-2 text-base font-medium"
              >
                <Phone className="h-4 w-4 text-leaf-600" />
                Контакти й месенджери
              </button>
              <a
                href="#calculator"
                onClick={() => setOpen(false)}
                className="btn-primary mt-6 w-full"
              >
                Розрахувати станцію
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <PhonePopup open={phoneOpen} onClose={() => setPhoneOpen(false)} />
    </>
  );
}
