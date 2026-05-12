"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
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
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section ref={sectionRef} id="about" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-red-500 text-sm font-medium tracking-widest uppercase mb-4">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Engineering Excellence
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Over 15 years of expertise in delivering premium automotive solutions
            that exceed expectations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <motion.div style={{ y: imageY }} className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=1000&fit=crop"
                  alt="Premium Tyre"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -bottom-6 -right-6 glass rounded-xl p-6 max-w-[200px]"
              >
                <div className="text-4xl font-bold text-red-500 mb-1">15+</div>
                <div className="text-sm text-muted-foreground">Years of Excellence</div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Features Side */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="group flex gap-5 p-5 glass rounded-xl hover:bg-white/5 transition-colors"
              >
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-red-600/20 rounded-lg group-hover:bg-red-600/30 transition-colors">
                  <feature.icon className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
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
