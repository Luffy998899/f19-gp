"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import Image from "next/image"

const galleryImages = [
  {
    id: 1,
    src: "/images/wheel-1.png",
    alt: "BBS Sport Alloy Wheel",
    category: "Alloy Wheels",
  },
  {
    id: 2,
    src: "/images/wheel-2.png",
    alt: "Lexani Performance Tyre",
    category: "Tyres",
  },
  {
    id: 3,
    src: "/images/wheel-3.png",
    alt: "Steel Wheel Rim",
    category: "Steel Wheels",
  },
  {
    id: 4,
    src: "/images/wheel-4.png",
    alt: "Off-Road Mud Terrain",
    category: "Tyres",
  },
  {
    id: 5,
    src: "/images/wheel-5.png",
    alt: "Winter Tyre",
    category: "Tyres",
  },
  {
    id: 6,
    src: "/images/wheel-6.png",
    alt: "Steel Utility Wheel",
    category: "Steel Wheels",
  },
]

const categories = ["All", "Alloy Wheels", "Steel Wheels", "Tyres"]

interface LightboxProps {
  images: typeof galleryImages
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

function Lightbox({ images, currentIndex, onClose, onPrev, onNext }: LightboxProps) {
  const currentImage = images[currentIndex]

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
        className="absolute top-6 right-6 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-10"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation()
          onPrev()
        }}
        className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-10"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      
      <button
        onClick={(e) => {
          e.stopPropagation()
          onNext()
        }}
        className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-10"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      <motion.div
        key={currentImage.id}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-4xl aspect-square mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          fill
          className="object-contain"
        />
      </motion.div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        <p className="text-white font-medium mb-1">{currentImage.alt}</p>
        <p className="text-zinc-500 text-sm">
          {currentIndex + 1} / {images.length}
        </p>
      </div>
    </motion.div>
  )
}

export function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const filteredImages = selectedCategory === "All"
    ? galleryImages
    : galleryImages.filter((img) => img.category === selectedCategory)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length)
    }
  }
  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length)
    }
  }

  return (
    <section ref={sectionRef} id="gallery" className="py-24 relative">
      <div className="absolute inset-0 bg-zinc-950" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-red-500 text-sm font-semibold tracking-widest uppercase mb-4">
            Gallery
          </span>
          <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white mb-6 tracking-wide">
            OUR PRODUCTS
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Browse our collection of premium wheels and tyres.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-red-600 text-white"
                  : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="relative group cursor-pointer overflow-hidden rounded-xl bg-zinc-900"
                onClick={() => openLightbox(index)}
              >
                <div className="relative aspect-square p-4">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                      <div className="p-3 bg-white/10 rounded-full inline-block mb-2">
                        <ZoomIn className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-white font-medium text-sm">{image.alt}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={filteredImages}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
