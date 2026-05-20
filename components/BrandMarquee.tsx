import { BRANDS } from "@/lib/data";

/**
 * Static grid of partner logos. 15 brands lay out across responsive columns:
 * 3 on phones (5 rows) → 5 on tablets/desktop (3 rows) — exact division, no orphans.
 */
export function BrandMarquee() {
  return (
    <section
      aria-label="Бренди, з якими ми працюємо"
      className="border-y border-line bg-bg py-10 lg:py-14"
    >
      <div className="container-x">
        <div className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-ink">
          Працюємо з лідерами індустрії
        </div>

        <ul className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-6 sm:gap-x-6 lg:mt-10 lg:gap-x-8 lg:gap-y-8">
          {BRANDS.map((b) => (
            <li
              key={b.name}
              className="flex h-12 shrink-0 basis-[calc((100%-2rem)/3)] items-center justify-center sm:basis-[calc((100%-6rem)/5)] lg:h-14 lg:basis-[calc((100%-8rem)/5)]"
            >
              {b.logo ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={b.logo}
                  alt={b.name}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="max-h-full max-w-full select-none object-contain"
                />
              ) : (
                <span className="h-display select-none whitespace-nowrap text-lg font-bold tracking-tight text-ink lg:text-xl">
                  {b.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
