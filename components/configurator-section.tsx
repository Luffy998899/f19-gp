"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Check, RotateCcw } from "lucide-react"
import Image from "next/image"

const wheelStyles = [
  { id: "sport", name: "Sport", color: "#1a1a1a" },
  { id: "chrome", name: "Chrome", color: "#c0c0c0" },
  { id: "matte", name: "Matte Black", color: "#2d2d2d" },
  { id: "gold", name: "Gold", color: "#d4af37" },
]

const wheelSizes = ["17\"", "18\"", "19\"", "20\"", "21\"", "22\""]

const accentColors = [
  { id: "red", name: "Racing Red", color: "#dc2626" },
  { id: "blue", name: "Electric Blue", color: "#2563eb" },
  { id: "green", name: "Lime Green", color: "#84cc16" },
  { id: "orange", name: "Sunset Orange", color: "#ea580c" },
  { id: "white", name: "Pure White", color: "#ffffff" },
]

const carImages = [
  "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=1200&h=600&fit=crop",
]

export function ConfiguratorSection() {
  const [selectedStyle, setSelectedStyle] = useState(wheelStyles[0])
  const [selectedSize, setSelectedSize] = useState("19\"")
  const [selectedAccent, setSelectedAccent] = useState(accentColors[0])
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const resetConfig = () => {
    setSelectedStyle(wheelStyles[0])
    setSelectedSize("19\"")
    setSelectedAccent(accentColors[0])
  }

  return (
    <section ref={sectionRef} id="configurator" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950" />
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[150px] -translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-red-500 text-sm font-medium tracking-widest uppercase mb-4">
            Interactive Experience
          </span>
          <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white mb-4 tracking-wide">
            BUILD YOUR DREAM RIDE
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Customize your perfect wheel setup with our interactive configurator.
            See your choices come to life in real-time.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Configurator Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden glass">
              <Image
                src={carImages[0]}
                alt="Car Preview"
                fill
                className="object-cover"
              />
              {/* Overlay with accent color tint */}
              <div
                className="absolute inset-0 mix-blend-overlay opacity-20 transition-colors duration-500"
                style={{ backgroundColor: selectedAccent.color }}
              />
              {/* Wheel indicator overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="glass rounded-xl p-4 text-center">
                  <div className="text-lg font-bold text-white mb-1">
                    {selectedStyle.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {selectedSize} • {selectedAccent.name}
                  </div>
                </div>
              </div>
            </div>

            {/* Config Summary */}
            <motion.div
              layout
              className="mt-6 p-6 glass rounded-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Your Configuration</h3>
                <button
                  onClick={resetConfig}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Style</div>
                  <div className="text-sm font-medium text-white">{selectedStyle.name}</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Size</div>
                  <div className="text-sm font-medium text-white">{selectedSize}</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Accent</div>
                  <div className="text-sm font-medium text-white">{selectedAccent.name}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Configurator Controls */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Wheel Style */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Wheel Style</h3>
              <div className="grid grid-cols-2 gap-3">
                {wheelStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style)}
                    className={`flex items-center gap-3 p-4 rounded-lg transition-all duration-200 ${
                      selectedStyle.id === style.id
                        ? "glass border-red-500"
                        : "glass hover:bg-white/10"
                    }`}
                  >
                    <div
                      className="w-10 h-10 rounded-full border-2 border-white/20"
                      style={{ backgroundColor: style.color }}
                    />
                    <span className="text-white font-medium">{style.name}</span>
                    {selectedStyle.id === style.id && (
                      <Check className="w-5 h-5 text-red-500 ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Wheel Size */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Wheel Size</h3>
              <div className="flex flex-wrap gap-3">
                {wheelSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                      selectedSize === size
                        ? "bg-red-600 text-white"
                        : "glass text-white hover:bg-white/10"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Accent Color */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Accent Color</h3>
              <div className="flex flex-wrap gap-3">
                {accentColors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedAccent(color)}
                    className={`relative w-12 h-12 rounded-full transition-all duration-200 ${
                      selectedAccent.id === color.id
                        ? "ring-2 ring-white ring-offset-2 ring-offset-black scale-110"
                        : "hover:scale-105"
                    }`}
                    style={{ backgroundColor: color.color }}
                    title={color.name}
                  >
                    {selectedAccent.id === color.id && (
                      <Check className="absolute inset-0 m-auto w-5 h-5 text-white drop-shadow-lg" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-4 pt-4">
              <button className="flex-1 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded transition-all duration-300 hover:scale-105">
                Get Quote
              </button>
              <button className="px-8 py-4 glass hover:bg-white/10 text-white font-semibold rounded transition-colors">
                Save Config
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
