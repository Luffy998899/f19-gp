import Image from "next/image"

type Props = {
  content: Record<string, string>
}

export function AboutSection({ content }: Props) {
  return (
    <section id="atelier" className="py-24 md:py-32 border-b border-border bg-foreground text-background">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-y-12 md:gap-x-10">
          {/* Left: editorial image */}
          <div className="col-span-12 lg:col-span-6">
            <div className="relative aspect-[4/5] lg:aspect-[3/4] w-full bg-background/5 overflow-hidden">
              <Image
                src="/images/workshop-editorial.jpg"
                alt="Inside the Formula 19 atelier"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute top-4 left-4 right-4 flex items-start justify-between text-[10px] font-mono uppercase tracking-widest">
                <span>Plate 02 / The Atelier</span>
                <span aria-hidden>↗</span>
              </div>
            </div>
          </div>

          {/* Right: headline + text */}
          <div className="col-span-12 lg:col-span-6 flex flex-col justify-between gap-12">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-background/60 mb-6">
                <span className="inline-block h-px w-8 bg-background" />
                The House
              </div>
              <h2 className="font-serif text-5xl md:text-7xl tracking-tight leading-[0.95]">
                {content.about_title || "An independent atelier,"}
                <br />
                <span className="italic text-accent">for the Okanagan.</span>
              </h2>
              <div className="mt-10 space-y-5 max-w-xl text-background/80 leading-relaxed">
                <p>
                  {content.about_description ||
                    "For over a decade, Formula 19 has been Kelowna's trusted source for premium tyres, wheels, and expert installation."}
                </p>
                <p className="text-background/60">
                  We work by appointment, treat every set of wheels like a commission, and keep a written record of
                  every alignment, balance and torque value for the life of your vehicle.
                </p>
              </div>
            </div>

            {/* Manifesto list */}
            <ul className="border-t border-background/15 grid grid-cols-1 sm:grid-cols-2">
              {[
                { n: "i", t: "Stocked, not drop-shipped" },
                { n: "ii", t: "Calibrated torque on every nut" },
                { n: "iii", t: "Photographic condition report" },
                { n: "iv", t: "Twelve-month workmanship warranty" },
              ].map((item, idx) => (
                <li
                  key={item.n}
                  className={`border-b border-background/15 py-5 flex items-baseline gap-4 ${
                    idx % 2 === 0 ? "sm:border-r sm:border-background/15" : ""
                  }`}
                >
                  <span className="font-serif italic text-background/50">{item.n}.</span>
                  <span className="text-sm">{item.t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
