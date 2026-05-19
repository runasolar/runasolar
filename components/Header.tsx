"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { COMPANY, NAV } from "@/lib/data";
import { cn } from "@/lib/utils";
import { PhonePopup } from "./PhonePopup";
import { IconInstagram, IconTikTok, IconGoogleMaps } from "./BrandIcons";

function IconLink({
  href,
  label,
  external,
  dark,
  children,
}: {
  href: string;
  label: string;
  external?: boolean;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors",
        dark ? "hover:bg-bg/10" : "text-ink-muted hover:bg-bg-warm hover:text-ink"
      )}
    >
      {children}
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [phoneOpen, setPhoneOpen] = useState(false);
  // Past-hero state: header switches to dark pill once Hero scrolls out of
  // view, so it stands out on the light sections below.
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Hero min-height ranges 640 → 760 px across breakpoints. Trigger a
      // bit earlier so the swap happens as the user enters Services.
      setPastHero(window.scrollY > 560);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
            className={cn(
              "mx-auto flex items-center justify-between gap-3 rounded-full border px-3 py-1 shadow-soft transition-colors duration-300 lg:px-4 lg:py-1.5",
              pastHero
                ? "border-ink/20 bg-ink/70 backdrop-blur-xl"
                : "border-line bg-bg"
            )}
          >
            <a
              href="#top"
              className="relative flex shrink-0 items-center"
              aria-label="RUNA SOLAR — на головну"
            >
              {/* Dark-text logo for the light pill (Hero state) */}
              <Image
                src="/logo.png"
                alt="RUNA SOLAR"
                width={160}
                height={56}
                priority
                className={cn(
                  "h-12 w-auto transition-opacity duration-300 sm:h-14 lg:h-16",
                  pastHero ? "opacity-0" : "opacity-100"
                )}
              />
              {/* Light-text variant for the dark pill (past-hero state) */}
              <Image
                src="/logo-light.png"
                alt=""
                aria-hidden
                width={160}
                height={56}
                className={cn(
                  "absolute inset-0 h-12 w-auto transition-opacity duration-300 sm:h-14 lg:h-16",
                  pastHero ? "opacity-100" : "opacity-0"
                )}
              />
            </a>

            <nav className="hidden items-center gap-0.5 lg:flex">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors",
                    pastHero
                      ? "text-bg hover:bg-bg/10"
                      : "text-ink-muted hover:bg-bg-warm hover:text-ink"
                  )}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-1.5 lg:gap-2">
              {/* Socials + map — desktop only */}
              <div
                className={cn(
                  "hidden items-center gap-0.5 border-r pr-2 transition-colors duration-300 lg:flex",
                  pastHero ? "border-bg/20" : "border-line"
                )}
              >
                <IconLink
                  href={COMPANY.instagram}
                  label="Instagram"
                  external
                  dark={pastHero}
                >
                  <IconInstagram className="h-[18px] w-[18px]" />
                </IconLink>
                <IconLink
                  href={COMPANY.tiktok}
                  label="TikTok"
                  external
                  dark={pastHero}
                >
                  <IconTikTok className="h-[18px] w-[18px]" />
                </IconLink>
                <IconLink
                  href={COMPANY.mapsUrl}
                  label="Ми на мапі"
                  external
                  dark={pastHero}
                >
                  <IconGoogleMaps className="h-[20px] w-[20px]" />
                </IconLink>
              </div>

              <button
                onClick={() => setPhoneOpen(true)}
                aria-label="Звʼязатися"
                className={cn(
                  "grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors duration-300 lg:h-11 lg:w-11",
                  pastHero
                    ? "border-bg/30 text-bg hover:border-bg hover:bg-bg/10"
                    : "border-line text-ink hover:border-ink"
                )}
              >
                <Phone className="h-[18px] w-[18px]" strokeWidth={2} />
              </button>
              <a
                href="#calculator"
                className="hidden h-11 items-center justify-center gap-1.5 rounded-full bg-leaf-600 px-5 text-[15px] font-medium text-bg transition-all hover:bg-leaf-700 md:inline-flex"
              >
                Розрахунок
              </a>
              <button
                onClick={() => setOpen(true)}
                aria-label="Меню"
                className={cn(
                  "grid h-10 w-10 place-items-center rounded-full border transition-colors duration-300 lg:hidden",
                  pastHero
                    ? "border-bg/30 text-bg hover:border-bg"
                    : "border-line text-ink"
                )}
              >
                <Menu className="h-[18px] w-[18px]" strokeWidth={2} />
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
              className="absolute right-0 top-0 h-full w-[88%] max-w-sm overflow-y-auto bg-bg p-6"
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

              {/* Socials + map in drawer */}
              <div className="flex items-center gap-2">
                <IconLink href={COMPANY.instagram} label="Instagram" external>
                  <IconInstagram className="h-5 w-5" />
                </IconLink>
                <IconLink href={COMPANY.tiktok} label="TikTok" external>
                  <IconTikTok className="h-5 w-5" />
                </IconLink>
                <IconLink href={COMPANY.mapsUrl} label="Ми на мапі" external>
                  <IconGoogleMaps className="h-5 w-5" />
                </IconLink>
              </div>

              <button
                onClick={() => {
                  setOpen(false);
                  setPhoneOpen(true);
                }}
                className="mt-4 flex w-full items-center gap-2 py-2 text-base font-medium"
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
