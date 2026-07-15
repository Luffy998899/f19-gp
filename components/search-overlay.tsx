"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { X, Search, MessageCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

type CatalogProduct = {
  id: string
  name: string
  category: string
  description: string | null
  size: string | null
  width: string | null
  profile: string | null
  rating: number
  reviews_count: number
  image_url: string | null
  is_featured: boolean
  is_active: boolean
  display_order: number
}

const PUBLIC_PRODUCT_COLUMNS =
  "id, name, category, description, size, width, profile, rating, reviews_count, image_url, is_featured, is_active, display_order" as const
import { QuoteModal } from "@/components/quote-modal"

interface SearchOverlayProps {
  open: boolean
  onClose: () => void
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<CatalogProduct[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const [quoteFor, setQuoteFor] = useState<string | null>(null)
  const [quoteOpen, setQuoteOpen] = useState(false)

  // Focus input when overlay opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
      // Lock body scroll
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
      setQuery("")
      setResults([])
      setSearched(false)
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    if (open) window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [open, onClose])

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    if (!q) return

    setLoading(true)
    setSearched(true)
    const supabase = createClient()

    // Search by name and category
    const { data } = await supabase
      .from("products")
      .select(PUBLIC_PRODUCT_COLUMNS)
      .eq("is_active", true)
      .or(`name.ilike.%${q}%,category.ilike.%${q}%,description.ilike.%${q}%`)
      .order("display_order", { ascending: true })
      .limit(20)

    setResults((data as CatalogProduct[]) || [])
    setLoading(false)
  }

  function openQuote(name: string) {
    setQuoteFor(name)
    setQuoteOpen(true)
  }

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-md search-backdrop"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed inset-0 z-[101] flex flex-col search-panel">
        {/* Search bar */}
        <div className="bg-background border-b border-border">
          <div className="mx-auto max-w-[900px] px-6 py-6">
            <form onSubmit={handleSearch} className="flex items-center gap-4">
              <Search className="w-5 h-5 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search wheels, tires, accessories..."
                className="flex-1 bg-transparent text-foreground text-lg md:text-xl font-display uppercase tracking-wide placeholder:text-muted-foreground/50 placeholder:normal-case placeholder:font-sans placeholder:text-base placeholder:tracking-normal outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center border border-border text-foreground hover:border-primary hover:text-primary transition-colors"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Results area */}
        <div className="flex-1 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <div className="mx-auto max-w-[900px] px-6 py-8">
            {loading && (
              <div className="flex items-center justify-center py-20">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {!loading && searched && results.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest">
                  No products found for &ldquo;{query}&rdquo;
                </p>
              </div>
            )}

            {!loading && results.length > 0 && (
              <>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-6">
                  {results.length} result{results.length !== 1 ? "s" : ""} found
                </p>
                <div className="space-y-3">
                  {results.map((p) => (
                    <article
                      key={p.id}
                      className="group flex gap-4 bg-card border border-border hover:border-primary/50 transition-colors p-3"
                    >
                      {/* Image */}
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 bg-background overflow-hidden">
                        {p.image_url ? (
                          <Image
                            src={p.image_url}
                            alt={p.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="120px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            <Search className="w-6 h-6 opacity-30" />
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-primary">
                              {p.category}
                            </span>
                            {p.size && (
                              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                                {p.size}
                              </span>
                            )}
                          </div>
                          <h3 className="font-display uppercase text-foreground text-sm sm:text-base leading-tight line-clamp-1">
                            {p.name}
                          </h3>
                          {p.description && (
                            <p className="mt-1 text-xs text-muted-foreground line-clamp-1 hidden sm:block">
                              {p.description}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => openQuote(p.name)}
                          className="mt-2 self-start inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
                        >
                          <MessageCircle className="w-3 h-3" /> DM for Quote
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}

            {!loading && !searched && (
              <div className="text-center py-20">
                <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest">
                  Type to search &amp; press enter
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <QuoteModal
        open={quoteOpen}
        productName={quoteFor}
        onClose={() => setQuoteOpen(false)}
      />
    </>
  )
}
