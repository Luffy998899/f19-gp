"use client"

import Image from "next/image"
import { useState } from "react"
import { ArrowUpRight, MessageCircle, Star } from "lucide-react"
import type { Product } from "@/lib/data"
import { QuoteModal } from "@/components/quote-modal"

interface ProductsSectionProps {
  products: Product[]
}

export function ProductsSection({ products }: ProductsSectionProps) {
  const [quoteFor, setQuoteFor] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  function openQuote(name?: string | null) {
    setQuoteFor(name ?? null)
    setOpen(true)
  }

  if (!products.length) return null

  return (
    <section id="products" className="relative bg-card py-24 lg:py-32 border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                / Catalog
              </span>
              <span className="w-12 h-px bg-primary" />
            </div>
            <h2 className="font-display text-foreground uppercase text-[clamp(2.5rem,7vw,6rem)] leading-[0.9]">
              The
              <br />
              <span className="text-primary">lineup.</span>
            </h2>
          </div>
          <div className="flex items-center gap-6 text-sm font-mono uppercase tracking-widest text-muted-foreground">
            <span>{String(products.length).padStart(2, "0")} Products</span>
            <button
              type="button"
              onClick={() => openQuote(null)}
              className="flex items-center gap-2 text-foreground hover:text-primary underline-grow"
            >
              Request quote <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {products.map((p, i) => (
            <article
              key={p.id}
              className="group relative bg-background product-card border border-transparent overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-square bg-card overflow-hidden">
                {p.image_url && (
                  <Image
                    src={p.image_url}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                )}
                {/* Top tag row */}
                <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-foreground bg-background/80 backdrop-blur px-2 py-1">
                    N {String(i + 1).padStart(2, "0")}
                  </span>
                  {p.is_featured && (
                    <span className="font-mono text-[10px] uppercase tracking-widest bg-primary text-primary-foreground px-2 py-1">
                      Featured
                    </span>
                  )}
                </div>
                {/* Bottom big number */}
                <div className="absolute bottom-4 right-4 font-display text-5xl text-primary opacity-80">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 border-t border-border">
                <div className="flex items-center justify-between mb-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  <span>{p.category}</span>
                  <span className="num-badge">{p.size || p.width || "-"}</span>
                </div>
                <h3 className="font-display text-2xl uppercase tracking-tight text-foreground mb-2">
                  {p.name}
                </h3>
                {p.description && (
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                    {p.description}
                  </p>
                )}

                {/* Specs */}
                <div className="flex items-center gap-3 mb-4 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  {p.size && <span>SIZE {p.size}</span>}
                  {p.width && <span>W {p.width}</span>}
                  {p.profile && <span>P {p.profile}</span>}
                </div>

                {/* Footer */}
                <div className="flex items-end justify-between gap-4 pt-4 border-t border-border">
                  <button
                    type="button"
                    onClick={() => openQuote(p.name)}
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-3 py-2 font-mono text-[10px] uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> DM us for the quote
                  </button>
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="w-3 h-3 fill-primary text-primary" />
                    <span className="font-mono num-badge text-foreground">{p.rating}</span>
                    <span className="text-muted-foreground font-mono text-[10px]">
                      ({p.reviews_count})
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <QuoteModal
        open={open}
        productName={quoteFor}
        onClose={() => setOpen(false)}
      />
    </section>
  )
}
