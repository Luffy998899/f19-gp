"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowUpRight, ChevronDown, Loader2, MessageCircle, Star, X } from "lucide-react"
import type { CatalogCategory, CatalogFilters, CatalogProduct } from "@/lib/data"
import { QuoteModal } from "@/components/quote-modal"

type ActiveFilters = { size: string; width: string; profile: string }
const EMPTY_FILTERS: ActiveFilters = { size: "", width: "", profile: "" }

const CATEGORIES: { id: CatalogCategory; label: string }[] = [
  // { id: "all", label: "All" },
  { id: "Wheels", label: "Wheels" },
  // { id: "Tires", label: "Tires" },
  // { id: "Accessories", label: "Accessories" },
  // { id: "Lighting", label: "Lighting" },
]

interface ProductsSectionProps {
  initialTotal?: number
}

export function ProductsSection({ initialTotal = 0 }: ProductsSectionProps) {
  const [category, setCategory] = useState<CatalogCategory>("Wheels")
  const [products, setProducts] = useState<CatalogProduct[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(initialTotal)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [quoteFor, setQuoteFor] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useState<ActiveFilters>(EMPTY_FILTERS)
  const [filterOptions, setFilterOptions] = useState<CatalogFilters>({ sizes: [], widths: [], profiles: [] })
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    fetch(`/api/catalog/filters?category=Wheels`)
      .then((r) => r.json())
      .then(setFilterOptions)
      .catch(() => {})
  }, [])

  const fetchPage = useCallback(
    async (nextPage: number, nextCategory: CatalogCategory, append: boolean, f: ActiveFilters) => {
      // Cancel any previous non-append fetch to avoid stale results
      if (!append) {
        abortRef.current?.abort()
        abortRef.current = new AbortController()
      }

      if (append) setLoadingMore(true)
      else setLoading(true)

      let aborted = false
      try {
        const params = new URLSearchParams({ page: String(nextPage), limit: "24", category: nextCategory })
        if (f.size) params.set("size", f.size)
        if (f.width) params.set("width", f.width)
        if (f.profile) params.set("profile", f.profile)
        const signal = append ? undefined : abortRef.current?.signal
        const res = await fetch(`/api/catalog?${params}`, { signal })
        const data = await res.json()
        setTotal(data.total ?? 0)
        setProducts((prev) => (append ? [...prev, ...(data.products || [])] : data.products || []))
        setPage(nextPage)
      } catch (e) {
        if (e instanceof Error && e.name === "AbortError") {
          aborted = true
        }
      } finally {
        if (!aborted) {
          setLoading(false)
          setLoadingMore(false)
        }
      }
    },
    [],
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchPage(1, category, false, filters) }, [category, filters])

  function openQuote(name?: string | null) {
    setQuoteFor(name ?? null)
    setOpen(true)
  }

  function changeCategory(next: CatalogCategory) {
    if (next === category) return
    setLoading(true)
    setCategory(next)
    setFilters(EMPTY_FILTERS)
    setProducts([])
    setPage(1)
  }

  function setFilter(key: keyof ActiveFilters, val: string) {
    setLoading(true)
    setProducts([])
    setFilters((f) => ({ ...f, [key]: val }))
  }

  const hasMore = products.length < total
  const hasActiveFilters = !!(filters.size || filters.width || filters.profile)
  const hasFilterOptions =
    filterOptions.sizes.length > 0 || filterOptions.widths.length > 0 || filterOptions.profiles.length > 0

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

        <div className="flex flex-wrap gap-2 mb-0">
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

        {hasFilterOptions && (
          <div className="border-t border-border mt-6 pt-5 mb-12 flex flex-wrap items-center gap-3">
            {filterOptions.sizes.length > 0 && (
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Size</span>
                <div className="relative">
                  <select
                    value={filters.size}
                    onChange={(e) => setFilter("size", e.target.value)}
                    className={`appearance-none pl-3 pr-8 py-2 font-mono text-[10px] uppercase tracking-widest border bg-background cursor-pointer transition-colors focus:outline-none ${
                      filters.size ? "border-primary text-foreground" : "border-border text-muted-foreground"
                    }`}
                  >
                    <option value="">All sizes</option>
                    {filterOptions.sizes.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                </div>
              </div>
            )}

            {filterOptions.widths.length > 0 && (
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Width</span>
                <div className="relative">
                  <select
                    value={filters.width}
                    onChange={(e) => setFilter("width", e.target.value)}
                    className={`appearance-none pl-3 pr-8 py-2 font-mono text-[10px] uppercase tracking-widest border bg-background cursor-pointer transition-colors focus:outline-none ${
                      filters.width ? "border-primary text-foreground" : "border-border text-muted-foreground"
                    }`}
                  >
                    <option value="">All widths</option>
                    {filterOptions.widths.map((w) => (
                      <option key={w} value={w}>{w}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                </div>
              </div>
            )}

            {filterOptions.profiles.length > 0 && (
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Profile</span>
                <div className="relative">
                  <select
                    value={filters.profile}
                    onChange={(e) => setFilter("profile", e.target.value)}
                    className={`appearance-none pl-3 pr-8 py-2 font-mono text-[10px] uppercase tracking-widest border bg-background cursor-pointer transition-colors focus:outline-none ${
                      filters.profile ? "border-primary text-foreground" : "border-border text-muted-foreground"
                    }`}
                  >
                    <option value="">All profiles</option>
                    {filterOptions.profiles.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                </div>
              </div>
            )}

            {hasActiveFilters && (
              <button
                type="button"
                onClick={() => { setLoading(true); setProducts([]); setFilters(EMPTY_FILTERS) }}
                className="self-end mb-0.5 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors border border-transparent hover:border-border px-2 py-2"
              >
                <X className="w-3 h-3" /> Reset
              </button>
            )}
          </div>
        )}

        {!hasFilterOptions && <div className="mb-12" />}

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
                    {p.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.image_url}
                        alt={p.name}
                        loading="eager"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                        <div className="w-20 h-20 rounded-full border border-border opacity-30" />
                        <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/40">
                          No image
                        </span>
                      </div>
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
                  onClick={() => fetchPage(page + 1, category, true, filters)}
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
