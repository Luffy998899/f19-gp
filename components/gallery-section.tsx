"use client"

import { useState, useRef, useMemo } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import Image from "next/image"
import type { GalleryImage } from "@/lib/data"

interface GallerySectionProps {
  images: GalleryImage[]
}

function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: GalleryImage[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const currentImage = images[currentIndex]
  if (!currentImage) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-6 top-6 z-10 rounded-full bg-white/10 p-3 transition-colors hover:bg-white/20"
      >
        <X className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation()
          onPrev()
        }}
        className="absolute left-6 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 transition-colors hover:bg-white/20"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation()
          onNext()
        }}
        className="absolute right-6 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 transition-colors hover:bg-white/20"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      <motion.div
        key={currentImage.id}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative mx-4 aspect-square w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={currentImage.image_url || "/placeholder.svg"}
          alt={currentImage.alt_text || currentImage.title}
          fill
          className="object-contain"
        />
      </motion.div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        <p className="mb-1 font-medium text-white">{currentImage.title}</p>
        <p className="text-sm text-zinc-500">
          {currentIndex + 1} / {images.length}
        </p>
      </div>
    </motion.div>
  )
}

export function GallerySection({ images }: GallerySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const categories = useMemo(() => {
    const set = new Set(images.map((img) => img.category))
    return ["All", ...Array.from(set)]
  }, [images])

  const filteredImages = useMemo(
    () =>
      selectedCategory === "All"
        ? images
        : images.filter((img) => img.category === selectedCategory),
    [images, selectedCategory],
  )

  return (
    <section ref={sectionRef} id="gallery" className="relative py-24">
      <div className="absolute inset-0 bg-black" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-red-500">
            Gallery
          </span>
          <h2 className="mb-6 font-heading text-5xl tracking-wide text-white md:text-6xl lg:text-7xl">
            OUR PRODUCTS
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-zinc-400">
            Browse our collection of premium wheels and tires.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 flex flex-wrap justify-center gap-3"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
                selectedCategory === category
                  ? "bg-red-600 text-white"
                  : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {filteredImages.length === 0 ? (
          <div className="rounded-2xl border border-white/5 bg-zinc-900/50 p-12 text-center text-zinc-400">
            No gallery images yet.
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-2 gap-4 md:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-zinc-900 to-black"
                  onClick={() => setLightboxIndex(index)}
                >
                  <div className="relative aspect-square p-4">
                    {/* Dark glow frame */}
                    <div className="absolute inset-6 rounded-full bg-red-600/10 blur-2xl" />
                    <Image
                      src={image.image_url || "/placeholder.svg"}
                      alt={image.alt_text || image.title}
                      fill
                      className="object-contain p-4 mix-blend-screen brightness-110 transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/60">
                      <div className="text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="mb-2 inline-block rounded-full bg-white/10 p-3">
                          <ZoomIn className="h-6 w-6 text-white" />
                        </div>
                        <p className="text-sm font-medium text-white">
                          {image.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={filteredImages}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={() =>
              setLightboxIndex(
                (lightboxIndex - 1 + filteredImages.length) %
                  filteredImages.length,
              )
            }
            onNext={() =>
              setLightboxIndex((lightboxIndex + 1) % filteredImages.length)
            }
          />
        )}
      </AnimatePresence>
    </section>
  )
}
