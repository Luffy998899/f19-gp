"use client"

import Image from "next/image"
import { useState } from "react"
import { ArrowRight, Search } from "lucide-react"

interface HeroSectionProps {
  content: Record<string, string>
}

const TABS = [
  { id: "vehicle", label: "Search by Vehicle", fields: ["Year", "Make", "Model", "Submodel", "Option"] },
  { id: "wheel", label: "Search by Wheel", fields: ["Diameter", "Width", "Bolt Pattern", "Offset"] },
  { id: "tire", label: "Search by Tire", fields: ["Width", "Profile", "Diameter", "Season"] },
  { id: "keywords", label: "Search by Keywords", fields: ["Keyword"] },
]

export function HeroSection({ content }: HeroSectionProps) {
  const [activeTab, setActiveTab] = useState("vehicle")
  const tab = TABS.find((t) => t.id === activeTab) ?? TABS[0]

  return (
    <section id="top" className="relative bg-background overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-car.jpg"
          alt="Performance vehicle at our showroom"
          fill
          priority
          className="object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/10" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 pt-16 pb-12 lg:pt-24 lg:pb-20 min-h-[620px] lg:min-h-[720px] flex flex-col justify-end">
        {/* Headline block */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/80">
              Spring Wheel & Tire Event
            </span>
          </div>
          <h1 className="font-display uppercase text-foreground leading-[0.9] tracking-tight text-[clamp(2.75rem,7vw,5.75rem)]">
            Wheels & Tires
            <br />
            Sale{" "}
            <span className="inline-flex items-center bg-primary text-primary-foreground px-4 py-1 align-middle">
              Up to 75% Off
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base lg:text-lg text-foreground/70 leading-relaxed">
            {content.hero_description ||
              "Find the perfect set for your ride. Free shipping across BC on orders over $1,000. Certified install at our Kelowna shop."}
          </p>
        </div>

        {/* Search widget */}
        <div className="relative mt-10 lg:mt-14">
          {/* Tabs */}
          <div className="flex flex-wrap gap-1">
            {TABS.map((t) => {
              const active = t.id === activeTab
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTab(t.id)}
                  className={`relative px-5 py-3 lg:px-7 lg:py-4 font-mono text-[10px] lg:text-xs uppercase tracking-[0.2em] transition-colors ${
                    active
                      ? "bg-background text-foreground border-t-2 border-primary"
                      : "bg-background/40 text-foreground/60 hover:bg-background/70 hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              )
            })}
          </div>
          {/* Form panel */}
          <div className="bg-background/95 backdrop-blur border-t border-primary p-5 lg:p-6">
            <div className="grid gap-3 lg:gap-4" style={{ gridTemplateColumns: `repeat(${tab.fields.length + 1}, minmax(0, 1fr))` }}>
              {tab.fields.map((f) => (
                <select
                  key={f}
                  aria-label={f}
                  className="h-12 bg-secondary border border-border text-foreground/80 font-mono text-xs uppercase tracking-wider px-3 focus:outline-none focus:border-primary"
                >
                  <option>{f}</option>
                </select>
              ))}
              <button
                type="button"
                className="h-12 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-display uppercase text-base tracking-wider hover:bg-foreground hover:text-background transition-colors"
              >
                <Search className="w-4 h-4" /> Search
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
