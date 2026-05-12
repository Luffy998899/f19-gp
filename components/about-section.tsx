"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Cog, Feather, Sparkles, Shield, Grip } from "lucide-react"
import Image from "next/image"

interface AboutSectionProps {
  content: Record<string, string>
}

const features = [
  {
    icon: Cog,
    title: "Precision Engineering",
    description:
      "Every wheel is crafted with meticulous attention to detail for perfect balance and performance.",
  },
  {
    icon: Feather,
    title: "Lightweight Performance",
    description:
      "Advanced materials reduce unsprung weight for improved handling and acceleration.",
  },
  {
    icon: Sparkles,
    title: "Premium Finish",
    description:
      "Multi-layer coating delivers lasting shine and protection against the elements.",
  },
  {
    icon: Shield,
    title: "Track-Tested Durability",
    description:
      "Rigorously tested under extreme conditions to ensure reliability when it matters most.",
  },
  {
    icon: Grip,
    title: "Maximum Grip",
    description:
      "Engineered compound and tread patterns deliver exceptional traction in all conditions.",
  },
]

export function AboutSection({ content }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} id="about" className="relative py-24">
      <div className="absolute inset-0 bg-zinc-950" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-red-600/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-red-500">
            Why Choose Us
          </span>
          <h2 className="mb-6 font-heading text-5xl tracking-wide text-white md:text-6xl lg:text-7xl">
            {content.about_title || "ENGINEERING EXCELLENCE"}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-zinc-400">
            {content.about_description ||
              "Over a decade of expertise delivering premium automotive solutions that exceed expectations."}
          </p>
        </motion.div>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Workshop image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/images/workshop.jpg"
                alt="Formula 19 workshop"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute bottom-6 left-6 right-6 rounded-xl border border-white/10 bg-black/70 p-5 backdrop-blur-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-heading text-4xl text-red-500">10+</div>
                    <div className="text-xs uppercase tracking-wider text-white/60">
                      Years of Excellence
                    </div>
                  </div>
                  <div className="h-12 w-px bg-white/10" />
                  <div>
                    <div className="font-heading text-4xl text-red-500">5K+</div>
                    <div className="text-xs uppercase tracking-wider text-white/60">
                      Happy Customers
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Features list */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
                className="group flex gap-4 rounded-xl border border-white/5 bg-white/5 p-5 transition-all duration-300 hover:border-red-500/30 hover:bg-white/[0.07]"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-red-600/20 transition-colors group-hover:bg-red-600/30">
                  <feature.icon className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-400">
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
