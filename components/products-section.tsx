"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Star, Eye, ShoppingCart, ChevronLeft, ChevronRight, X } from "lucide-react"
import Image from "next/image"

const products = [
  {
    id: 1,
    name: "BBS Sport Alloy",
    category: "Performance",
    price: "$899",
    rating: 4.9,
    reviews: 234,
    specs: { size: '19"', width: "255mm", profile: "35" },
    image: "/images/wheel-1.png",
  },
  {
    id: 2,
    name: "Lexani UHP-207",
    category: "Ultra High Performance",
    price: "$1,199",
    rating: 5.0,
    reviews: 189,
    specs: { size: '20"', width: "275mm", profile: "30" },
    image: "/images/wheel-2.png",
  },
  {
    id: 3,
    name: "Steel Classic",
    category: "Standard",
    price: "$299",
    rating: 4.8,
    reviews: 156,
    specs: { size: '17"', width: "225mm", profile: "45" },
    image: "/images/wheel-3.png",
  },
  {
    id: 4,
    name: "Off-Road Mud Terrain",
    category: "Off-Road",
    price: "$1,499",
    rating: 4.9,
    reviews: 312,
    specs: { size: '18"', width: "285mm", profile: "70" },
    image: "/images/wheel-4.png",
  },
  {
    id: 5,
    name: "Winter Pro",
    category: "All-Season",
    price: "$799",
    rating: 4.7,
    reviews: 278,
    specs: { size: '18"', width: "245mm", profile: "45" },
    image: "/images/wheel-5.png",
  },
  {
    id: 6,
    name: "Steel Utility",
    category: "Standard",
    price: "$249",
    rating: 4.6,
    reviews: 198,
    specs: { size: '16"', width: "205mm", profile: "55" },
    image: "/images/wheel-6.png",
  },
]

interface ProductCardProps {
  product: typeof products[0]
  onQuickView: (product: typeof products[0]) => void
  index: number
}

function ProductCard({ product, onQuickView, index }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden hover:border-red-500/30 transition-all duration-300">
        {/* Image Container */}
        <div className="relative aspect-square bg-gradient-to-br from-zinc-800 to-zinc-900 p-6">
          <div className="relative w-full h-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className={`object-contain transition-transform duration-500 ${
                isHovered ? "scale-110" : "scale-100"
              }`}
            />
          </div>
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 text-xs font-semibold bg-red-600 text-white rounded-full">
              {product.category}
            </span>
          </div>
          
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            className="absolute bottom-4 left-4 right-4 flex gap-2"
          >
            <button
              onClick={() => onQuickView(product)}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/10 backdrop-blur-md text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-colors"
            >
              <Eye className="w-4 h-4" />
              Quick View
            </button>
            <button className="flex items-center justify-center p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              <ShoppingCart className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
          
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
              <span className="text-sm text-white font-medium">{product.rating}</span>
            </div>
            <span className="text-sm text-zinc-500">({product.reviews} reviews)</span>
          </div>
          
          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <div className="text-sm text-zinc-400">
              {product.specs.size} | {product.specs.width}
            </div>
            <div className="text-xl font-bold text-red-500">{product.price}</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

interface QuickViewModalProps {
  product: typeof products[0] | null
  onClose: () => void
}

function QuickViewModal({ product, onClose }: QuickViewModalProps) {
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
        className="relative w-full max-w-4xl bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square bg-gradient-to-br from-zinc-800 to-zinc-900 p-8">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-8"
            />
          </div>
          <div className="p-8 flex flex-col justify-center">
            <span className="inline-block px-3 py-1 text-xs font-semibold bg-red-600 text-white rounded-full w-fit mb-4">
              {product.category}
            </span>
            <h2 className="text-3xl font-bold text-white mb-3">{product.name}</h2>
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-zinc-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-zinc-400">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between py-3 border-b border-white/10">
                <span className="text-zinc-400">Size</span>
                <span className="text-white font-medium">{product.specs.size}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/10">
                <span className="text-zinc-400">Width</span>
                <span className="text-white font-medium">{product.specs.width}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/10">
                <span className="text-zinc-400">Profile</span>
                <span className="text-white font-medium">{product.specs.profile}</span>
              </div>
            </div>

            <div className="text-4xl font-bold text-red-500 mb-6">{product.price}</div>

            <div className="flex gap-4">
              <button className="flex-1 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors">
                Add to Cart
              </button>
              <button className="px-6 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold rounded-lg transition-colors">
                Enquire
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ProductsSection() {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} id="products" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-red-500 text-sm font-semibold tracking-widest uppercase mb-4">
            Premium Collection
          </span>
          <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white mb-6 tracking-wide">
            FEATURED PRODUCTS
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Discover our handpicked selection of premium tyres and alloy wheels,
            engineered for performance and designed for perfection.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={setSelectedProduct}
              index={index}
            />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold rounded-lg transition-all duration-300">
            View All Products
          </button>
        </motion.div>
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  )
}
