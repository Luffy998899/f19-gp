"use client"

import Image from "next/image"
import { useState } from "react"
import { ArrowUpRight, Pause, Play } from "lucide-react"
import type { Product } from "@/lib/data"

interface ProductsCarouselProps {
  products: Product[]
}

export function ProductsCarousel({ products }: ProductsCarouselProps) {
  const [paused, setPaused] = useState(false)
  if (!products.length) return null

  // Duplicate the list so the marquee can loop seamlessly
  const loop = [...products, ...products]

  return (
    <section id="popular" className="relative bg-background py-20 lg:py-28 overflow-hidden border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
              / Popular Wheels
            </span>
            <h2 className="mt-3 font-display uppercase text-foreground text-[clamp(2rem,4.5vw,3.75rem)] leading-none">
              Shop our best-sellers
            </h2>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground">
              Hand-picked alloys and performance tires moving fastest this season.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              className="flex items-center gap-2 border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-foreground hover:border-primary hover:text-primary transition-colors"
              aria-pressed={paused}
            >
              {paused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
              {paused ? "Play" : "Pause"}
            </button>
            <a
              href="#products"
              className="hidden sm:flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-foreground hover:text-primary underline-grow"
            >
              View all <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Edge fades */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 lg:w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 lg:w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex gap-5 lg:gap-7 w-max animate-marquee" style={{ animationPlayState: paused ? "paused" : "running" }}>
          {loop.map((p, i) => (
            <article
              key={`${p.id}-${i}`}
              className="w-[260px] sm:w-[300px] lg:w-[340px] shrink-0 bg-card border border-border product-card"
            >
              <div className="relative aspect-square bg-background">
                {p.image_url ? (
                  <Image
                    src={p.image_url}
                    alt={p.name}
                    fill
                    className="object-cover"
                    sizes="340px"
                  />
                ) : null}
                {p.is_featured && (
                  <span className="absolute top-3 right-3 bg-primary text-primary-foreground font-mono text-[10px] uppercase tracking-widest px-2 py-1">
                    Sale
                  </span>
                )}
              </div>
              <div className="p-5 lg:p-6">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                  {p.category}
                </div>
                <h3 className="font-display uppercase text-foreground text-lg leading-tight line-clamp-2 min-h-[2.6em]">
                  {p.name}
                </h3>
                <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                      From
                    </div>
                    <div className="font-display text-2xl text-foreground num-badge">
                      ${Number(p.price).toFixed(0)}
                      <span className="text-xs text-muted-foreground ml-1">CAD</span>
                    </div>
                  </div>
                  <a
                    href="#contact"
                    className="font-mono text-[10px] uppercase tracking-widest text-foreground hover:text-primary inline-flex items-center gap-1"
                  >
                    Shop <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
