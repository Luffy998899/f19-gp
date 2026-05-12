import Image from "next/image"

type Props = {
  content: Record<string, string>
}

export function HeroSection({ content }: Props) {
  return (
    <section className="relative pt-28 md:pt-36 pb-12 md:pb-20 overflow-hidden">
      {/* Top meta line */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 flex items-end justify-between text-xs font-mono uppercase tracking-widest text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          <span>Kelowna, BC — Est. 2014</span>
        </div>
        <div className="hidden sm:block">N° 0001 — Vol. XII</div>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 md:px-10 mt-8 md:mt-12">
        <div className="grid grid-cols-12 gap-y-8 md:gap-x-8">
          {/* Left: massive serif headline */}
          <div className="col-span-12 lg:col-span-8">
            <h1 className="font-serif font-light tracking-[-0.02em] leading-[0.88] text-[clamp(3.5rem,11vw,12rem)]">
              <span className="block">Tyres &amp;</span>
              <span className="block italic">wheels</span>
              <span className="block">
                of <span className="text-accent italic">distinction.</span>
              </span>
            </h1>

            <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 gap-y-6 sm:gap-x-12 max-w-3xl">
              <p className="text-base md:text-lg leading-relaxed text-foreground/80">
                {content.hero_description ||
                  "An independent atelier for premium tyres, alloy wheels, and precision installation. Serving Kelowna and the Okanagan since 2014."}
              </p>
              <div className="flex flex-col gap-4">
                <a
                  href="#catalogue"
                  className="inline-flex items-center justify-between border-b border-foreground pb-3 text-sm font-mono uppercase tracking-widest hover:text-accent hover:border-accent transition-colors"
                >
                  <span>Browse the catalogue</span>
                  <span aria-hidden>→</span>
                </a>
                <a
                  href="#enquiries"
                  className="inline-flex items-center justify-between border-b border-border pb-3 text-sm font-mono uppercase tracking-widest hover:text-accent hover:border-accent transition-colors"
                >
                  <span>Book a fitting</span>
                  <span aria-hidden>↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: editorial photo */}
          <div className="col-span-12 lg:col-span-4">
            <div className="relative aspect-[3/4] w-full bg-secondary overflow-hidden">
              <Image
                src="/images/hero-editorial.jpg"
                alt="Premium alloy wheel on cream background"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute top-4 left-4 right-4 flex items-start justify-between text-[10px] font-mono uppercase tracking-widest text-background mix-blend-difference">
                <span>Plate 01 / Catalogue MMXXVI</span>
                <span>↗</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-[10px] font-mono uppercase tracking-widest text-background mix-blend-difference">
                Apex RS — 19&quot; Forged Alloy
              </div>
            </div>
          </div>
        </div>

        {/* Statistics row */}
        <div className="mt-16 md:mt-24 border-t border-border pt-8 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
          {[
            { num: "12", label: "Years serving the Okanagan", suffix: "+" },
            { num: "240", label: "Wheel & tyre specs catalogued", suffix: "+" },
            { num: "98", label: "Customer satisfaction", suffix: "%" },
            { num: "24", label: "Hour turnaround on stocked sizes", suffix: "h" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col gap-2">
              <div className="font-serif text-5xl md:text-6xl tracking-tight leading-none">
                {s.num}
                <span className="text-accent">{s.suffix}</span>
              </div>
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground max-w-[14ch]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
