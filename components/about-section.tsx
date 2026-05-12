"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Cog, Feather, Sparkles, Shield, Grip } from "lucide-react"
import Image from "next/image"

const features = [
  {
    icon: Cog,
    title: "Precision Engineering",
    description: "Every wheel is crafted with meticulous attention to detail, ensuring perfect balance and performance.",
  },
  {
    icon: Feather,
    title: "Lightweight Performance",
    description: "Advanced materials and design reduce unsprung weight for improved handling and acceleration.",
  },
  {
    icon: Sparkles,
    title: "Premium Finish",
    description: "Multi-layer coating process delivers lasting shine and protection against the elements.",
  },
  {
    icon: Shield,
    title: "Track-Tested Durability",
    description: "Rigorously tested under extreme conditions to ensure reliability when it matters most.",
  },
  {
    icon: Grip,
    title: "Maximum Grip",
    description: "Engineered compound and tread patterns deliver exceptional traction in all conditions.",
  },
]

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} id="about" className="py-24 relative">
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
            Why Choose Us
          </span>
          <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white mb-6 tracking-wide">
            ENGINEERING EXCELLENCE
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Over 15 years of expertise in delivering premium automotive solutions
            that exceed expectations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Glow */}
              <div className="absolute inset-0 bg-red-500/10 rounded-full blur-3xl scale-75" />
              
              <Image
                src="/images/wheel-1.png"
                alt="Premium BBS Alloy Wheel"
                fill
                className="object-contain drop-shadow-2xl"
              />
              
              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -bottom-4 -right-4 bg-zinc-900 border border-white/10 rounded-xl p-6"
              >
                <div className="text-4xl font-bold text-red-500 mb-1">15+</div>
                <div className="text-sm text-zinc-400">Years of Excellence</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Features Side */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="group flex gap-4 p-5 bg-white/5 border border-white/5 rounded-xl hover:border-red-500/30 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-red-600/20 rounded-lg group-hover:bg-red-600/30 transition-colors">
                  <feature.icon className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
