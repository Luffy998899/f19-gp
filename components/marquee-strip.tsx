const items = [
  "Performance",
  "Alignment",
  "Balancing",
  "Seasonal storage",
  "Forged alloys",
  "Winter studding",
  "On-site fitting",
  "Wheel refinishing",
  "TPMS service",
  "Nitrogen fill",
]

export function MarqueeStrip() {
  return (
    <section
      aria-hidden="true"
      className="border-y border-border bg-foreground text-background py-5 md:py-6 overflow-hidden"
    >
      <div className="flex whitespace-nowrap animate-marquee">
        {[...items, ...items, ...items, ...items].map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="inline-flex items-center gap-8 md:gap-12 px-6 md:px-8 font-serif text-2xl md:text-4xl italic"
          >
            {label}
            <span className="text-accent text-3xl md:text-5xl leading-none" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </div>
    </section>
  )
}
