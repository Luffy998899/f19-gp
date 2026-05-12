const items = [
  "PERFORMANCE TIRES",
  "ALLOY WHEELS",
  "WHEEL ALIGNMENT",
  "BALANCING",
  "TIRE STORAGE",
  "TPMS SERVICE",
  "WINTER SETUP",
  "PERFORMANCE FITTING",
]

export function MarqueeStrip() {
  const list = [...items, ...items, ...items]
  return (
    <section
      aria-hidden="true"
      className="relative bg-primary text-primary-foreground border-y-2 border-foreground overflow-hidden"
    >
      <div className="flex items-center animate-marquee whitespace-nowrap py-5">
        {list.map((item, i) => (
          <div key={i} className="flex items-center gap-6 px-6">
            <span className="font-display text-3xl md:text-4xl uppercase tracking-tight">
              {item}
            </span>
            <span className="inline-block w-3 h-3 rotate-45 bg-primary-foreground" />
          </div>
        ))}
      </div>
    </section>
  )
}
