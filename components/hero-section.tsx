"use client"

import { motion } from "framer-motion"
import { ArrowRight, Phone, Shield, Award, Wrench } from "lucide-react"
import Image from "next/image"

interface HeroSectionProps {
  content: Record<string, string>
}

export function HeroSection({ content }: HeroSectionProps) {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-black"
    >
      {/* Cinematic background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-50"
        />
        {/* Layered overlays for cinematic depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
      </div>

      {/* Red atmospheric glow */}
      <div className="pointer-events-none absolute -right-32 top-1/3 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-red-600/20 blur-[140px]" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-red-500/10 blur-[120px]" />

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pb-20 pt-32 lg:px-12 lg:pt-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          {/* Left text */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-300">
                {content.hero_eyebrow || "All About Tires"}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-5xl leading-[0.95] tracking-wide text-white sm:text-6xl lg:text-7xl xl:text-[5.5rem]"
            >
              <span className="block">{content.hero_title_1 || "PRECISION."}</span>
              <span className="block">{content.hero_title_2 || "PERFORMANCE."}</span>
              <span className="block bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                {content.hero_title_3 || "POWER."}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
            >
              {content.hero_description ||
                "Kelowna's premier destination for premium tires and wheels. We deliver the perfect combination of style, safety, and performance."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <button
                onClick={() => scrollTo("#products")}
                className="group inline-flex items-center gap-2 rounded-full bg-red-600 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-red-700 hover:shadow-[0_0_40px_rgba(239,68,68,0.5)]"
              >
                Shop Tires
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href={`tel:+${content.whatsapp_number || "17789998473"}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="mt-10 flex flex-wrap gap-x-8 gap-y-3"
            >
              <div className="flex items-center gap-2 text-white/60">
                <Shield className="h-4 w-4 text-red-500" />
                <span className="text-xs font-medium uppercase tracking-wider">
                  Certified Installers
                </span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <Award className="h-4 w-4 text-red-500" />
                <span className="text-xs font-medium uppercase tracking-wider">
                  Premium Brands
                </span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <Wrench className="h-4 w-4 text-red-500" />
                <span className="text-xs font-medium uppercase tracking-wider">
                  Free Installation
                </span>
              </div>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-6"
            >
              <div>
                <div className="font-heading text-3xl text-red-500">10+</div>
                <div className="mt-1 text-[10px] uppercase tracking-wider text-white/50">
                  Years
                </div>
              </div>
              <div>
                <div className="font-heading text-3xl text-red-500">5K+</div>
                <div className="mt-1 text-[10px] uppercase tracking-wider text-white/50">
                  Drivers
                </div>
              </div>
              <div>
                <div className="font-heading text-3xl text-red-500">100%</div>
                <div className="mt-1 text-[10px] uppercase tracking-wider text-white/50">
                  Quality
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right wheel display - dark cinematic frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative mx-auto aspect-square w-full max-w-[520px]">
              {/* Outer red glow */}
              <div className="absolute -inset-4 rounded-full bg-red-600/20 blur-3xl" />

              {/* Dark frame layers */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-zinc-900 via-black to-zinc-900 shadow-[inset_0_0_60px_rgba(0,0,0,0.8),inset_0_0_30px_rgba(239,68,68,0.15)]" />
              <div className="absolute inset-3 rounded-full border border-white/5" />
              <div className="absolute inset-6 rounded-full border border-white/[0.03]" />

              {/* Rotating outer ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 40,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="absolute inset-1 rounded-full border-2 border-dashed border-red-500/15"
              />

              {/* Wheel image */}
              <div className="absolute inset-0 flex items-center justify-center p-16">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 25,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  className="relative h-full w-full"
                >
                  <Image
                    src="/images/wheel-2.png"
                    alt="Premium performance tire"
                    fill
                    className="object-contain mix-blend-screen brightness-110 contrast-110"
                    priority
                  />
                </motion.div>
              </div>

              {/* Center red dot */}
              <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)]" />
            </div>

            {/* Floating badge top */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="absolute -left-2 top-8 rounded-xl border border-white/10 bg-zinc-900/90 px-5 py-3 backdrop-blur-md"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600/20">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-white/50">
                    Now Available
                  </div>
                  <div className="text-sm font-semibold text-white">
                    Winter Tires 2026
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating badge bottom */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="absolute -right-2 bottom-16 rounded-xl border border-red-500/30 bg-red-600/15 px-5 py-3 backdrop-blur-md"
            >
              <div className="text-[10px] uppercase tracking-widest text-red-300">
                Free Installation
              </div>
              <div className="text-sm font-semibold text-white">
                On Any Set of 4
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo("#products")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        aria-label="Scroll to products"
      >
        <div className="flex h-10 w-6 justify-center rounded-full border border-white/20 p-1.5">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
            }}
            className="h-1.5 w-1 rounded-full bg-white/60"
          />
        </div>
      </motion.button>
    </section>
  )
}
