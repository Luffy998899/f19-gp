import Image from "next/image"
import type { GalleryImage } from "@/lib/data"

type Props = {
  images: GalleryImage[]
}

const heights = [
  "aspect-[3/4]",
  "aspect-[4/5]",
  "aspect-square",
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[4/5]",
]

export function GallerySection({ images }: Props) {
  if (!images.length) return null

  return (
    <section id="archive" className="py-24 md:py-32 border-b border-border">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">
              <span className="inline-block h-px w-8 bg-foreground" />
              The Archive
            </div>
            <h2 className="font-serif text-5xl md:text-7xl tracking-tight leading-[0.95]">
              Recent fittings,
              <br />
              <span className="italic text-accent">photographed on site.</span>
            </h2>
          </div>
          <p className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
            {String(images.length).padStart(3, "0")} / Plates
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {images.map((img, i) => (
            <figure
              key={img.id}
              className={`group relative overflow-hidden bg-secondary ${heights[i % heights.length]} ${
                i % 7 === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <Image
                src={img.image_url || "/placeholder.svg"}
                alt={img.alt_text || img.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <figcaption className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity bg-foreground/40">
                <div className="flex items-start justify-between text-[10px] font-mono uppercase tracking-widest text-background">
                  <span>{String(i + 1).padStart(3, "0")}</span>
                  <span aria-hidden>↗</span>
                </div>
                <div className="text-background">
                  <div className="text-[10px] font-mono uppercase tracking-widest opacity-80">
                    {img.category}
                  </div>
                  <div className="font-serif text-xl md:text-2xl mt-1">{img.title}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
