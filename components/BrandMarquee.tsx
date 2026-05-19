import { BRANDS } from "@/lib/data";

/**
 * Auto-scrolling logo wall.
 *
 * Loop trick: render the full list twice and animate translateX(-50 %) over
 * the wrapper. At -50 % the visible content is byte-identical to the 0 %
 * position, so the loop is seamless.
 *
 * Uses plain `<img>` (not next/image) so there's no placeholder/lazy-load
 * layout shift mid-scroll — a major source of judder when one logo finishes
 * loading after the animation has started.
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

        <div className="marquee-track flex w-max items-center gap-10 lg:gap-16">
          {items.map((b, i) => (
            <div
              key={`${b.name}-${i}`}
              aria-hidden={i >= BRANDS.length}
              className="flex h-12 w-32 shrink-0 items-center justify-center lg:h-14 lg:w-40"
            >
              {b.logo ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={b.logo}
                  alt={b.name}
                  loading="eager"
                  decoding="async"
                  draggable={false}
                  className="max-h-full max-w-full select-none object-contain"
                />
              ) : (
                <span className="h-display select-none whitespace-nowrap text-xl font-bold tracking-tight text-ink lg:text-2xl">
                  {b.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
