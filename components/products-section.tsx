"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules"
import { Star, Eye, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-coverflow"

const products = [
  {
    id: 1,
    name: "Apex RS Pro",
    category: "Performance",
    price: "$899",
    rating: 4.9,
    reviews: 234,
    specs: { size: '19"', width: "255mm", profile: "35" },
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",
  },
  {
    id: 2,
    name: "Velocity X7",
    category: "Track",
    price: "$1,199",
    rating: 5.0,
    reviews: 189,
    specs: { size: '20"', width: "275mm", profile: "30" },
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&h=600&fit=crop",
  },
  {
    id: 3,
    name: "Shadow Stealth",
    category: "Luxury",
    price: "$1,499",
    rating: 4.8,
    reviews: 156,
    specs: { size: '21"', width: "285mm", profile: "35" },
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&h=600&fit=crop",
  },
  {
    id: 4,
    name: "Chrome Elite",
    category: "Premium",
    price: "$1,299",
    rating: 4.9,
    reviews: 312,
    specs: { size: '19"', width: "265mm", profile: "40" },
    image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&h=600&fit=crop",
  },
  {
    id: 5,
    name: "Turbo GT",
    category: "Sport",
    price: "$999",
    rating: 4.7,
    reviews: 278,
    specs: { size: '18"', width: "245mm", profile: "45" },
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=600&fit=crop",
  },
]

interface ProductCardProps {
  product: typeof products[0]
  onQuickView: (product: typeof products[0]) => void
}

function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative glass rounded-xl overflow-hidden">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-zinc-900 to-black">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover transition-transform duration-500 ${
              isHovered ? "scale-110 rotate-3" : "scale-100"
            }`}
          />
          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-60"
            }`}
          />
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-xs font-medium bg-red-600 text-white rounded-full">
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
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded hover:bg-white/20 transition-colors"
            >
              <Eye className="w-4 h-4" />
              Quick View
            </button>
            <button className="flex items-center justify-center p-3 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
              <ShoppingCart className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-xl font-bold text-white mb-1">{product.name}</h3>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
              <span className="text-sm text-white font-medium">
                {product.rating}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.reviews} reviews)
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {product.specs.size} • {product.specs.width} • {product.specs.profile}
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
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl glass rounded-2xl overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
        >
          <span className="sr-only">Close</span>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square bg-gradient-to-br from-zinc-900 to-black">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-8">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-red-600 text-white rounded-full mb-4">
              {product.category}
            </span>
            <h2 className="text-3xl font-bold text-white mb-2">{product.name}</h2>
            <div className="flex items-center gap-2 mb-4">
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
              <span className="text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-muted-foreground">Size</span>
                <span className="text-white font-medium">{product.specs.size}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-muted-foreground">Width</span>
                <span className="text-white font-medium">{product.specs.width}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-muted-foreground">Profile</span>
                <span className="text-white font-medium">{product.specs.profile}</span>
              </div>
            </div>

            <div className="text-3xl font-bold text-red-500 mb-6">
              {product.price}
            </div>

            <div className="flex gap-4">
              <button className="flex-1 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded transition-colors">
                Add to Cart
              </button>
              <button className="px-6 py-4 glass hover:bg-white/10 text-white font-semibold rounded transition-colors">
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
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-red-500 text-sm font-medium tracking-widest uppercase mb-4">
            Premium Collection
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Featured Products
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium tyres and alloy wheels,
            engineered for performance and designed for perfection.
          </p>
        </motion.div>

        {/* Products Slider */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <Swiper
            modules={[Navigation, Pagination, EffectCoverflow]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              prevEl: ".swiper-button-prev-custom",
              nextEl: ".swiper-button-next-custom",
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-16"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} onQuickView={setSelectedProduct} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 glass rounded-full hover:bg-white/10 transition-colors hidden lg:flex">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 glass rounded-full hover:bg-white/10 transition-colors hidden lg:flex">
            <ChevronRight className="w-6 h-6" />
          </button>
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button className="px-8 py-4 glass hover:bg-white/10 text-white font-semibold rounded transition-all duration-300 hover:scale-105">
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
