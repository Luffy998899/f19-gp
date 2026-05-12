import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const CATEGORIES = [
  {
    eyebrow: "Wheels & Tires for EV",
    title: "Powering the Future",
    image: "/images/cat-ev.jpg",
    className: "lg:col-span-7 lg:row-span-2",
    href: "#products",
  },
  {
    eyebrow: "Top Tires & Wheels for Trucks",
    title: "Built for Strength",
    image: "/images/cat-truck.jpg",
    className: "lg:col-span-3",
    href: "#products",
  },
  {
    eyebrow: "Off-Road Tires & Wheels",
    title: "Conquer Any Terrain",
    image: "/images/cat-offroad.jpg",
    className: "lg:col-span-2",
    href: "#products",
  },
  {
    eyebrow: "Tires & Wheels Accessories",
    title: "Upgrade Your Ride",
    image: "/images/cat-accessories.jpg",
    className: "lg:col-span-5",
    href: "#products",
  },
]

export function CategoriesGrid() {
  return (
    <section aria-labelledby="categories-heading" className="bg-background py-20 lg:py-28 border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
              / Shop by Drive
            </span>
            <h2
              id="categories-heading"
              className="mt-3 font-display uppercase text-foreground text-[clamp(2rem,4.5vw,3.75rem)] leading-none"
            >
              For every kind of ride
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            From electric to off-road, find a set engineered for the way you actually drive.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-10 lg:auto-rows-[280px] gap-4 lg:gap-5">
          {CATEGORIES.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className={`group relative overflow-hidden bg-card border border-border h-[260px] lg:h-auto ${c.className}`}
            >
              <Image
                src={c.image}
                alt={c.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end">
                <span className="font-mono text-[10px] lg:text-xs uppercase tracking-[0.25em] text-foreground/80 mb-2">
                  {c.eyebrow}
                </span>
                <div className="flex items-end justify-between gap-3">
                  <h3 className="font-display uppercase text-foreground text-2xl lg:text-3xl xl:text-4xl leading-[0.95] text-balance">
                    {c.title}
                  </h3>
                  <span className="shrink-0 w-10 h-10 lg:w-12 lg:h-12 bg-primary text-primary-foreground flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
                    <ArrowUpRight className="w-5 h-5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
