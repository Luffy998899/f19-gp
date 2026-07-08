"use client"

import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { ArrowUpRight, Loader2, MessageCircle, Star } from "lucide-react"
import type { CatalogCategory, CatalogProduct } from "@/lib/data"
import { QuoteModal } from "@/components/quote-modal"

const CATEGORIES: { id: CatalogCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "Wheels", label: "Wheels" },
  { id: "Tires", label: "Tires" },
  { id: "Accessories", label: "Accessories" },
  { id: "Lighting", label: "Lighting" },
]

interface ProductsSectionProps {
  initialTotal?: number
}

export function ProductsSection({ initialTotal = 0 }: ProductsSectionProps) {
  const [category, setCategory] = useState<CatalogCategory>("all")
  const [products, setProducts] = useState<CatalogProduct[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(initialTotal)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [quoteFor, setQuoteFor] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  const fetchPage = useCallback(
    async (nextPage: number, nextCategory: CatalogCategory, append: boolean) => {
      if (append) setLoadingMore(true)
      else setLoading(true)

      try {
        const params = new URLSearchParams({
          page: String(nextPage),
          limit: "24",
          category: nextCategory,
        })
        const res = await fetch(`/api/catalog?${params}`)
        const data = await res.json()
        setTotal(data.total ?? 0)
        setProducts((prev) => (append ? [...prev, ...(data.products || [])] : data.products || []))
        setPage(nextPage)
      } finally {
        setLoading(false)
        setLoadingMore(false)
      }
    },
    [],
  )

  useEffect(() => {
    fetchPage(1, category, false)
  }, [category, fetchPage])

  function openQuote(name?: string | null) {
    setQuoteFor(name ?? null)
    setOpen(true)
  }

  function changeCategory(next: CatalogCategory) {
    if (next === category) return
    setCategory(next)
    setProducts([])
    setPage(1)
  }

  const hasMore = products.length < total

  return (
    <section id="products" className="relative bg-card py-24 lg:py-32 border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-6">
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
            <span>{String(total).padStart(2, "0")} Products</span>
            <button
              type="button"
              onClick={() => openQuote(null)}
              className="flex items-center gap-2 text-foreground hover:text-primary underline-grow"
            >
              Request quote <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => changeCategory(cat.id)}
              className={`px-4 py-2 font-mono text-[10px] uppercase tracking-widest border transition-colors ${
                category === cat.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {loading && products.length === 0 ? (
          <div className="flex items-center justify-center py-24 text-muted-foreground gap-3">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="font-mono text-xs uppercase tracking-widest">Loading catalog…</span>
          </div>
        ) : products.length === 0 ? (
          <div className="py-24 text-center text-muted-foreground font-mono text-xs uppercase tracking-widest">
            No products in this category yet.
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              {products.map((p, i) => (
                <article
                  key={p.id}
                  className="group relative bg-background product-card border border-transparent overflow-hidden"
                >
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
                    <div className="absolute bottom-4 right-4 font-display text-5xl text-primary opacity-80">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>

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

                    <div className="flex items-center gap-3 mb-4 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                      {p.size && <span>SIZE {p.size}</span>}
                      {p.width && <span>W {p.width}</span>}
                      {p.profile && <span>P {p.profile}</span>}
                    </div>

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

            {hasMore && (
              <div className="mt-12 flex justify-center">
                <button
                  type="button"
                  disabled={loadingMore}
                  onClick={() => fetchPage(page + 1, category, true)}
                  className="inline-flex items-center gap-2 border border-border px-8 py-3 font-mono text-[10px] uppercase tracking-widest text-foreground hover:border-primary hover:text-primary transition-colors disabled:opacity-50"
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Loading…
                    </>
                  ) : (
                    <>Load more ({products.length} of {total})</>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <QuoteModal open={open} productName={quoteFor} onClose={() => setOpen(false)} />
    </section>
  )
}
