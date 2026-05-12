const services = [
  {
    n: "01",
    title: "Tyre & Wheel Fitting",
    text: "Hand-balanced, hub-centred installation with calibrated torque. Every set is road-tested before handover.",
  },
  {
    n: "02",
    title: "Four-Wheel Alignment",
    text: "Hunter precision alignment with printed before/after report. We restore factory geometry on every visit.",
  },
  {
    n: "03",
    title: "Seasonal Changeover",
    text: "Indoor climate-controlled tyre storage with photographic condition log between seasons.",
  },
  {
    n: "04",
    title: "Wheel Refinishing",
    text: "Curb-rash repair, refinishing and powder coating handled by appointment with our in-house specialist.",
  },
  {
    n: "05",
    title: "TPMS & Sensors",
    text: "Programming, replacement and rebuild of OEM tyre-pressure monitoring systems for all makes.",
  },
  {
    n: "06",
    title: "Performance Consultation",
    text: "Sizing, load and speed-rating advice for track, off-road and lifted setups. Bring your spec sheet.",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-24 md:py-32 border-b border-border">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">
              <span className="inline-block h-px w-8 bg-foreground" />
              The Workshop
            </div>
            <h2 className="font-serif text-5xl md:text-7xl tracking-tight leading-[0.95]">
              Six disciplines.
              <br />
              <span className="italic text-accent">One standard.</span>
            </h2>
          </div>
          <p className="text-base text-muted-foreground max-w-sm">
            Every service performed in-house by certified technicians, with a written record kept on file for the
            life of the vehicle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-border">
          {services.map((s) => (
            <article
              key={s.n}
              className="group relative border-b border-r border-border p-8 md:p-10 flex flex-col gap-4 transition-colors hover:bg-foreground hover:text-background"
            >
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-muted-foreground group-hover:text-background/60">
                <span>N° {s.n}</span>
                <span aria-hidden className="opacity-0 group-hover:opacity-100 transition-opacity">
                  ↗
                </span>
              </div>
              <h3 className="font-serif text-3xl md:text-4xl tracking-tight leading-tight mt-12 md:mt-20">
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-background/80 mt-2">
                {s.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
