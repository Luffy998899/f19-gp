import Image from "next/image"
import { ArrowUpRight, Zap, ShieldCheck, Wrench } from "lucide-react"

interface HeroSectionProps {
  content: Record<string, string>
}

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section id="top" className="relative bg-background overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 pt-12 pb-20 lg:pt-16 lg:pb-32">
        {/* Top meta bar */}
        <div className="flex items-center justify-between mb-8 lg:mb-12 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-primary animate-pulse" />
            Now Servicing · Kelowna BC
          </div>
          <div className="hidden md:block">Est. 2014 — N° 0719</div>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left content */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs uppercase tracking-widest bg-primary text-primary-foreground px-3 py-1">
                Performance Atelier
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Vol. 24
              </span>
            </div>

            <h1 className="font-display text-foreground uppercase leading-[0.85] tracking-tight">
              <span className="block text-[clamp(3.5rem,10vw,9rem)]">Built for</span>
              <span className="block text-[clamp(3.5rem,10vw,9rem)] text-primary">the road.</span>
              <span className="block text-[clamp(3.5rem,10vw,9rem)]">Engineered</span>
              <span className="block text-[clamp(3.5rem,10vw,9rem)]">
                <span className="inline-flex items-center flex-wrap gap-3">
                  for the
                  <span className="inline-flex items-center">
                    <span className="text-primary">track</span>
                    <span className="ml-2 inline-block w-12 h-12 lg:w-20 lg:h-20 checkered" />
                  </span>
                  .
                </span>
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-base lg:text-lg text-muted-foreground leading-relaxed">
              {content.hero_description ||
                "Kelowna's most trusted shop for performance tires, alloy wheels, and certified service. From your daily commute to your weekend autocross — we keep you planted."}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#products"
                className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-7 py-4 font-display text-lg uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors"
              >
                Shop Tires
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 border-2 border-foreground text-foreground px-7 py-4 font-display text-lg uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors"
              >
                Book Service
              </a>
            </div>

            {/* Stats row */}
            <div className="mt-14 grid grid-cols-3 gap-6 max-w-2xl border-t border-border pt-8">
              {[
                { value: "10+", label: "Years in BC" },
                { value: "12K+", label: "Tires Fitted" },
                { value: "4.9", label: "Avg Rating" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display text-4xl lg:text-5xl text-foreground num-badge">
                    {s.value}
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - image + spec card */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] bg-card overflow-hidden">
              <Image
                src="/images/racing-hero.jpg"
                alt="Performance racing tire on track"
                fill
                priority
                className="object-cover"
              />
              {/* Corner brackets */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary" />

              {/* Floating spec card */}
              <div className="absolute bottom-6 left-6 right-6 bg-background border-2 border-primary p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                    Live Spec
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground num-badge">
                    255/35R19
                  </span>
                </div>
                <div className="font-display text-xl text-foreground uppercase">
                  Apex RS Pro Compound
                </div>
                <div className="mt-3 flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-primary" />
                    <span className="font-mono uppercase tracking-wider text-muted-foreground">
                      Grip A+
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                    <span className="font-mono uppercase tracking-wider text-muted-foreground">
                      Wear AA
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tagline below image */}
            <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <span>F19 / Performance Division</span>
              <span className="flex items-center gap-1.5">
                <Wrench className="w-3 h-3" /> Certified Install
              </span>
            </div>
          </div>
        </div>

        {/* Bottom tick row */}
        <div className="mt-16 h-3 tick-row opacity-30" />
      </div>
    </section>
  )
}
