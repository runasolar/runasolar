"use client";

import Image from "next/image";
import { BRANDS } from "@/lib/data";

/**
 * Auto-scrolling logo wall (marquee).
 *
 * Loop trick: render the full list twice and animate translateX(-50 %) over
 * the wrapper. When the first copy scrolls out of view, the second copy is
 * already in place, so the user never sees a "jump".
 *
 * Brands with a logo path render the SVG via next/image. The rest fall back
 * to a wordmark in the brand-family display font.
 */
export function BrandMarquee() {
  // Double the list for a seamless infinite loop
  const items = [...BRANDS, ...BRANDS];

  return (
    <section
      aria-label="Бренди, з якими ми працюємо"
      className="relative overflow-hidden border-y border-line bg-bg py-10 lg:py-12"
    >
      <div className="container-x">
        <div className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-ink">
          Працюємо з лідерами індустрії
        </div>
      </div>

      <div className="relative mt-6 lg:mt-8">
        {/* Edge fades */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg via-bg/60 to-transparent lg:w-28"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg via-bg/60 to-transparent lg:w-28"
        />

        <div className="marquee-track flex w-max items-center gap-12 lg:gap-20">
          {items.map((b, i) =>
            b.logo ? (
              <Image
                key={`${b.name}-${i}`}
                src={b.logo}
                alt={b.name}
                width={200}
                height={48}
                aria-hidden={i >= BRANDS.length}
                className="h-10 w-auto shrink-0 select-none object-contain lg:h-12"
              />
            ) : (
              <span
                key={`${b.name}-${i}`}
                aria-hidden={i >= BRANDS.length}
                className="h-display select-none whitespace-nowrap text-xl font-bold tracking-tight text-ink lg:text-2xl"
              >
                {b.name}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
