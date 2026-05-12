import Image from "next/image"
import type { GalleryImage } from "@/lib/data"

interface GallerySectionProps {
  images: GalleryImage[]
}

export function GallerySection({ images }: GallerySectionProps) {
  if (!images.length) return null

  return (
    <section id="gallery" className="relative bg-card py-24 lg:py-32 border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                / Archive
              </span>
              <span className="w-12 h-px bg-primary" />
            </div>
            <h2 className="font-display text-foreground uppercase text-[clamp(2.5rem,7vw,6rem)] leading-[0.9]">
              Recent
              <br />
              <span className="text-primary">work.</span>
            </h2>
          </div>
          <div className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
            {String(images.length).padStart(3, "0")} Plates / 2025
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {images.map((img, i) => {
            const featured = i % 5 === 0
            return (
              <figure
                key={img.id}
                className={`group relative overflow-hidden bg-background border border-border ${
                  featured ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
                }`}
              >
                <Image
                  src={img.image_url}
                  alt={img.alt_text || img.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/70 transition-colors duration-500 flex flex-col justify-between p-4">
                  <div className="flex items-start justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="font-mono text-[10px] uppercase tracking-widest bg-primary text-primary-foreground px-2 py-0.5">
                      {String(i + 1).padStart(3, "0")}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-foreground bg-background/80 px-2 py-0.5">
                      {img.category}
                    </span>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-500">
                    <div className="font-display text-2xl uppercase tracking-tight text-foreground">
                      {img.title}
                    </div>
                  </div>
                </div>
                {/* Always visible plate number */}
                <span className="absolute bottom-2 right-2 font-mono text-[10px] uppercase tracking-widest text-foreground bg-background/80 px-2 py-0.5 group-hover:opacity-0 transition-opacity">
                  {String(i + 1).padStart(3, "0")}
                </span>
              </figure>
            )
          })}
        </div>
      </div>
    </section>
  )
}
