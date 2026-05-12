const BRANDS = [
  "Fast Wheels",
  "DAI Wheels",
  "Braelin",
  "RTX",
  "Ruffino",
  "American Racing",
  "Touren",
  "Fuel Off-Road",
  "Mayhem",
  "RSSW",
  "Bridgestone",
  "Continental",
  "Michelin",
  "Pirelli",
  "Goodyear",
]

export function BrandLogos() {
  return (
    <section aria-labelledby="brands-heading" className="bg-background border-y border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-14 lg:py-20">
        <div className="flex flex-col items-center text-center mb-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary mb-3">
            / Trusted Partners
          </span>
          <h2
            id="brands-heading"
            className="font-display uppercase text-foreground text-[clamp(1.75rem,3.5vw,2.75rem)] leading-none"
          >
            The Brands We Carry
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            Authorized dealer for the world&apos;s most respected wheel and tire makers.
          </p>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-px bg-border">
          {BRANDS.map((brand) => (
            <li
              key={brand}
              className="bg-background flex items-center justify-center h-24 lg:h-28 px-4 group hover:bg-card transition-colors"
            >
              <span className="font-display uppercase text-foreground/40 group-hover:text-foreground text-lg lg:text-xl tracking-wide transition-colors text-center text-balance leading-tight">
                {brand}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
