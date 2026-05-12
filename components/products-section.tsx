"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Star, Eye, X, Phone } from "lucide-react"
import Image from "next/image"
import type { Product } from "@/lib/data"

interface ProductCardProps {
  product: Product
  onQuickView: (product: Product) => void
  index: number
}

function ProductCard({ product, onQuickView, index }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-zinc-900 to-zinc-950 transition-all duration-300 hover:border-red-500/40 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]">
        {/* Dark image frame */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-zinc-800/40 via-black to-zinc-900/60 p-6">
          {/* Red radial glow */}
          <div className="absolute inset-8 rounded-full bg-red-600/10 blur-3xl" />
          {/* Inner ring */}
          <div className="absolute inset-4 rounded-full border border-white/[0.04]" />

          <div className="relative h-full w-full">
            {product.image_url && (
              <Image
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                fill
                className={`object-contain mix-blend-screen brightness-110 transition-transform duration-500 ${
                  isHovered ? "scale-110" : "scale-100"
                }`}
              />
            )}
          </div>

          <div className="absolute left-4 top-4">
            <span className="rounded-full bg-red-600 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white">
              {product.category}
            </span>
          </div>

          {product.is_featured && (
            <div className="absolute right-4 top-4">
              <span className="rounded-full border border-white/20 bg-black/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                Featured
              </span>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            className="absolute bottom-4 left-4 right-4"
          >
            <button
              onClick={() => onQuickView(product)}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-white/10 py-3 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              <Eye className="h-4 w-4" />
              Quick View
            </button>
          </motion.div>
        </div>

        <div className="p-5">
          <h3 className="mb-2 text-lg font-bold text-white">{product.name}</h3>

          <div className="mb-3 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              <span className="text-sm font-medium text-white">{product.rating}</span>
            </div>
            <span className="text-sm text-zinc-500">
              ({product.reviews_count} reviews)
            </span>
          </div>

          <div className="flex items-center justify-between border-t border-white/5 pt-3">
            <div className="text-sm text-zinc-400">
              {product.size && product.width
                ? `${product.size} | ${product.width}`
                : product.size || product.width}
            </div>
            <div className="text-xl font-bold text-red-500">${product.price}</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function QuickViewModal({
  product,
  onClose,
}: {
  product: Product | null
  onClose: () => void
}) {
  if (!product) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-900"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20"
        >
          <X className="h-6 w-6 text-white" />
        </button>

        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square bg-gradient-to-br from-zinc-800/40 via-black to-zinc-900/60 p-8">
            <div className="absolute inset-12 rounded-full bg-red-600/10 blur-3xl" />
            {product.image_url && (
              <Image
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain p-8 mix-blend-screen brightness-110"
              />
            )}
          </div>
          <div className="flex flex-col justify-center p-8">
            <span className="mb-4 inline-block w-fit rounded-full bg-red-600 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
              {product.category}
            </span>
            <h2 className="mb-3 text-3xl font-bold text-white">{product.name}</h2>
            <div className="mb-6 flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-zinc-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-zinc-400">
                {product.rating} ({product.reviews_count} reviews)
              </span>
            </div>

            {product.description && (
              <p className="mb-6 text-sm leading-relaxed text-zinc-400">
                {product.description}
              </p>
            )}

            <div className="mb-6 space-y-3">
              {product.size && (
                <div className="flex justify-between border-b border-white/10 py-3">
                  <span className="text-zinc-400">Size</span>
                  <span className="font-medium text-white">{product.size}</span>
                </div>
              )}
              {product.width && (
                <div className="flex justify-between border-b border-white/10 py-3">
                  <span className="text-zinc-400">Width</span>
                  <span className="font-medium text-white">{product.width}</span>
                </div>
              )}
              {product.profile && (
                <div className="flex justify-between border-b border-white/10 py-3">
                  <span className="text-zinc-400">Profile</span>
                  <span className="font-medium text-white">{product.profile}</span>
                </div>
              )}
            </div>

            <div className="mb-6 text-4xl font-bold text-red-500">
              ${product.price}
            </div>

            <a
              href="#contact"
              onClick={onClose}
              className="flex items-center justify-center gap-2 rounded-lg bg-red-600 py-4 font-semibold text-white transition-colors hover:bg-red-700"
            >
              <Phone className="h-5 w-5" />
              Enquire Now
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

interface ProductsSectionProps {
  products: Product[]
}

export function ProductsSection({ products }: ProductsSectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} id="products" className="relative py-24">
      <div className="absolute inset-0 bg-black" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-red-600/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-red-500">
            Premium Collection
          </span>
          <h2 className="mb-6 font-heading text-5xl tracking-wide text-white md:text-6xl lg:text-7xl">
            FEATURED PRODUCTS
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-zinc-400">
            Hand-picked tires and wheels engineered for performance and designed
            for the road ahead.
          </p>
        </motion.div>

        {products.length === 0 ? (
          <div className="rounded-2xl border border-white/5 bg-zinc-900/50 p-12 text-center text-zinc-400">
            No products available yet. Check back soon.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setSelectedProduct}
                index={index}
              />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <QuickViewModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
