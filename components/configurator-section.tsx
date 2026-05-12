"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Check, RotateCcw } from "lucide-react"
import Image from "next/image"

const wheelStyles = [
  { id: "sport", name: "Sport Alloy", image: "/images/wheel-1.png" },
  { id: "performance", name: "Performance", image: "/images/wheel-2.png" },
  { id: "steel", name: "Steel", image: "/images/wheel-3.png" },
  { id: "offroad", name: "Off-Road", image: "/images/wheel-4.png" },
]

const wheelSizes = ["16\"", "17\"", "18\"", "19\"", "20\"", "21\""]

const accentColors = [
  { id: "red", name: "Racing Red", color: "#dc2626" },
  { id: "blue", name: "Electric Blue", color: "#2563eb" },
  { id: "green", name: "Lime Green", color: "#84cc16" },
  { id: "orange", name: "Sunset Orange", color: "#ea580c" },
  { id: "white", name: "Pure White", color: "#ffffff" },
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
    <section ref={sectionRef} id="configurator" className="py-24 relative">
      <div className="absolute inset-0 bg-zinc-950" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-red-500 text-sm font-semibold tracking-widest uppercase mb-4">
            Interactive Experience
          </span>
          <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white mb-6 tracking-wide">
            BUILD YOUR SETUP
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Customize your perfect wheel and tyre setup with our interactive configurator.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:sticky lg:top-24"
          >
            <div className="relative aspect-square bg-zinc-900 border border-white/10 rounded-2xl p-8">
              {/* Glow Effect */}
              <div 
                className="absolute inset-0 opacity-20 rounded-2xl transition-colors duration-500"
                style={{ backgroundColor: selectedAccent.color }}
              />
              
              <div className="relative w-full h-full">
                <Image
                  src={selectedStyle.image}
                  alt={selectedStyle.name}
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Config Summary */}
            <div className="mt-6 p-6 bg-zinc-900 border border-white/10 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Your Configuration</h3>
                <button
                  onClick={resetConfig}
                  className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-xs text-zinc-500 mb-1">Style</div>
                  <div className="text-sm font-medium text-white">{selectedStyle.name}</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-xs text-zinc-500 mb-1">Size</div>
                  <div className="text-sm font-medium text-white">{selectedSize}</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-xs text-zinc-500 mb-1">Accent</div>
                  <div className="text-sm font-medium text-white">{selectedAccent.name}</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Controls */}
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
                    className={`relative p-4 rounded-xl transition-all duration-200 ${
                      selectedStyle.id === style.id
                        ? "bg-white/10 border-2 border-red-500"
                        : "bg-white/5 border-2 border-transparent hover:bg-white/10"
                    }`}
                  >
                    <div className="relative w-full aspect-square mb-2">
                      <Image
                        src={style.image}
                        alt={style.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-white font-medium text-sm">{style.name}</span>
                    {selectedStyle.id === style.id && (
                      <Check className="absolute top-2 right-2 w-5 h-5 text-red-500" />
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
                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                      selectedSize === size
                        ? "bg-red-600 text-white"
                        : "bg-white/5 text-white hover:bg-white/10"
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
                        ? "ring-2 ring-white ring-offset-2 ring-offset-zinc-950 scale-110"
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
            <div className="flex gap-4 pt-6">
              <button className="flex-1 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300">
                Get Quote
              </button>
              <button className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold rounded-lg transition-colors">
                Save
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
