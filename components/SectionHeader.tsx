"use client";

import { type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { SectionEyebrow } from "./SectionEyebrow";

type Props = {
  eyebrowIcon: LucideIcon;
  eyebrowLabel: string;
  /** Use "onDark" on dark sections (HowItWorks, WhyUs). */
  variant?: "default" | "onDark";
  title: string;
  description?: string;
  /** Optional content slotted to the right of the top divider (CTA buttons). */
  right?: React.ReactNode;
  /** Optional chapter index — adds “04 / 09” style indicator on top bar. */
  index?: string;
};

export function SectionHeader({
  eyebrowIcon,
  eyebrowLabel,
  variant = "default",
  title,
  description,
  right,
  index,
}: Props) {
  const isDark = variant === "onDark";

  return (
    <header className="relative">
      {/* TOP BAR — eyebrow + (index / CTA) */}
      <div
        className={`flex flex-wrap items-center justify-between gap-3 border-b pb-5 lg:gap-6 ${
          isDark ? "border-bg/15" : "border-line"
        }`}
      >
        <SectionEyebrow
          icon={eyebrowIcon}
          label={eyebrowLabel}
          variant={variant}
        />

        <div className="flex items-center gap-4">
          {index && (
            <span
              className={`h-display text-xs font-medium tabular-nums tracking-[0.2em] ${
                isDark ? "text-bg/45" : "text-ink-soft"
              }`}
            >
              {index}
            </span>
          )}
          {right}
        </div>
      </div>

      {/* HEADING + DESCRIPTION — top-aligned on the same baseline */}
      <div className="mt-8 grid gap-8 lg:mt-12 lg:grid-cols-12 lg:items-start lg:gap-12">
        <div className="lg:col-span-8">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`h-display text-[clamp(1.625rem,5vw,4.5rem)] font-semibold leading-[1.05] tracking-tight text-balance hyphens-auto ${
              isDark ? "text-bg" : "text-ink"
            }`}
            lang="uk"
          >
            {title}
          </motion.h2>
        </div>

        {description && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={`lg:col-span-4 ${
              isDark
                ? "lg:border-l lg:border-sun-400/40"
                : "lg:border-l lg:border-leaf-600/40"
            } lg:pl-6`}
          >
            <span
              aria-hidden
              className={`mb-3 inline-block h-px w-12 lg:hidden ${
                isDark ? "bg-sun-400/50" : "bg-leaf-600/50"
              }`}
            />
            <p
              className={`text-base text-pretty lg:text-[15px] lg:leading-relaxed ${
                isDark ? "text-bg/70" : "text-ink-muted"
              }`}
            >
              {description}
            </p>
          </motion.div>
        )}
      </div>
    </header>
  );
}
