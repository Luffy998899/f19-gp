"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"

interface PerformanceMetric {
  label: string
  value: number
  maxValue: number
  unit: string
  color: string
}

const metrics: PerformanceMetric[] = [
  { label: "Grip Rating", value: 98, maxValue: 100, unit: "%", color: "#dc2626" },
  { label: "Heat Resistance", value: 95, maxValue: 100, unit: "%", color: "#ea580c" },
  { label: "Lightweight Score", value: 92, maxValue: 100, unit: "%", color: "#84cc16" },
  { label: "Racing Performance", value: 97, maxValue: 100, unit: "%", color: "#2563eb" },
]

function AnimatedCounter({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      setCount(Math.floor(progress * value))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [isInView, value, duration])

  return <span ref={ref}>{count}</span>
}

function CircularProgress({ metric, index }: { metric: PerformanceMetric; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (metric.value / metric.maxValue) * circumference

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative flex flex-col items-center"
    >
      <div className="relative w-40 h-40 md:w-48 md:h-48">
        {/* Background Circle */}
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
          />
          {/* Progress Circle */}
          <motion.circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke={metric.color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset } : { strokeDashoffset: circumference }}
            transition={{ duration: 1.5, delay: index * 0.15, ease: "easeOut" }}
            style={{
              filter: `drop-shadow(0 0 10px ${metric.color}50)`,
            }}
          />
        </svg>
        {/* Center Value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl md:text-5xl font-bold text-white">
            <AnimatedCounter value={metric.value} />
          </span>
          <span className="text-lg text-muted-foreground">{metric.unit}</span>
        </div>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white text-center">
        {metric.label}
      </h3>
    </motion.div>
  )
}

function SpeedometerGauge() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [needleAngle, setNeedleAngle] = useState(-90)

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        setNeedleAngle(60)
      }, 500)
      return () => clearTimeout(timeout)
    }
  }, [isInView])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="relative w-64 h-32 mx-auto mb-12"
    >
      <svg viewBox="0 0 200 100" className="w-full h-full">
        {/* Gauge Background */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Gauge Progress */}
        <motion.path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray="251.2"
          initial={{ strokeDashoffset: 251.2 }}
          animate={isInView ? { strokeDashoffset: 50 } : { strokeDashoffset: 251.2 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="50%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#84cc16" />
          </linearGradient>
        </defs>
        {/* Needle */}
        <motion.line
          x1="100"
          y1="100"
          x2="100"
          y2="30"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
          style={{ transformOrigin: "100px 100px" }}
          initial={{ rotate: -90 }}
          animate={{ rotate: needleAngle }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        {/* Center Circle */}
        <circle cx="100" cy="100" r="8" fill="#dc2626" />
      </svg>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
        <div className="text-2xl font-bold text-white">Track Ready</div>
        <div className="text-sm text-muted-foreground">Performance Grade: A+</div>
      </div>
    </motion.div>
  )
}

export function PerformanceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-[200px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-red-500 text-sm font-medium tracking-widest uppercase mb-4">
            Performance Metrics
          </span>
          <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white mb-4 tracking-wide">
            BUILT FOR SPEED
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our tyres undergo rigorous testing to deliver exceptional performance
            metrics across all conditions.
          </p>
        </motion.div>

        {/* Speedometer */}
        <SpeedometerGauge />

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {metrics.map((metric, index) => (
            <CircularProgress key={metric.label} metric={metric} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
