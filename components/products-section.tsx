import Image from "next/image"
import type { Product } from "@/lib/data"

type Props = {
  products: Product[]
}

export function ProductsSection({ products }: Props) {
  if (!products.length) return null

  return (
    <section id="catalogue" className="py-24 md:py-32 border-b border-border">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">
              <span className="inline-block h-px w-8 bg-foreground" />
              The Catalogue — MMXXVI
            </div>
            <h2 className="font-serif text-5xl md:text-7xl tracking-tight leading-[0.95]">
              A curated selection,
              <br />
              <span className="italic text-accent">on the floor today.</span>
            </h2>
          </div>
          <a
            href="#enquiries"
            className="inline-flex items-center gap-3 self-start md:self-end font-mono text-xs uppercase tracking-widest border-b border-foreground pb-2 hover:text-accent hover:border-accent transition-colors"
          >
            <span>Request the full catalogue</span>
            <span aria-hidden>↗</span>
          </a>
        </div>

        {/* Asymmetric editorial grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
          {products.map((p, i) => {
            const isFeature = i % 5 === 0
            return (
              <article
                key={p.id}
                className={`group flex flex-col gap-5 ${
                  isFeature ? "lg:col-span-2 lg:flex-row lg:gap-10" : ""
                }`}
              >
                <div
                  className={`relative bg-secondary overflow-hidden ${
                    isFeature ? "lg:w-3/5 aspect-[4/5] lg:aspect-[4/3]" : "aspect-[4/5]"
                  }`}
                >
                  {p.image_url && (
                    <Image
                      src={p.image_url || "/placeholder.svg"}
                      alt={p.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes={
                        isFeature
                          ? "(max-width: 1024px) 100vw, 60vw"
                          : "(max-width: 768px) 100vw, 33vw"
                      }
                    />
                  )}
                  {p.is_featured && (
                    <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-accent text-accent-foreground px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest">
                      <span className="h-1 w-1 rounded-full bg-current" aria-hidden />
                      House Pick
                    </span>
                  )}
                  <span className="absolute bottom-4 right-4 font-serif text-5xl text-background mix-blend-difference italic">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div
                  className={`flex flex-col gap-3 ${
                    isFeature ? "lg:w-2/5 lg:justify-end lg:pb-2" : ""
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-muted-foreground">
                    <span>{p.category}</span>
                    <span>{p.size || p.width || "—"}</span>
                  </div>
                  <h3
                    className={`font-serif tracking-tight leading-tight ${
                      isFeature ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"
                    }`}
                  >
                    {p.name}
                  </h3>
                  {p.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {p.description}
                    </p>
                  )}
                  <div className="mt-2 flex items-end justify-between border-t border-border pt-4">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                        From
                      </div>
                      <div className="font-serif text-2xl">
                        ${Number(p.price).toFixed(0)}
                        <span className="text-sm text-muted-foreground"> CAD</span>
                      </div>
                    </div>
                    <a
                      href="#enquiries"
                      className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest border-b border-foreground pb-1 hover:text-accent hover:border-accent transition-colors"
                    >
                      Enquire
                      <span aria-hidden>→</span>
                    </a>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
