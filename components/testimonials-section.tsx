"use client"

import Image from "next/image"
import { Star } from "lucide-react"

type Review = {
  name: string
  date: string
  body: string
  avatar?: string
  initial?: string
  initialBg?: string
}

const REVIEWS: Review[] = [
  {
    name: "Alexis Gauthier",
    date: "May 10, 2026",
    body: "Unbeatable prices. Incredible service, even after the sale. I had the wrong size and they walked me through the exchange — couldn't ask for more.",
    avatar: "/images/avatar-1.jpg",
  },
  {
    name: "Christopher Spencer",
    date: "May 4, 2026",
    body: "If you thought quality customer service was a thing of the past, think again. Honest, reliable, and genuinely happy to help. Highly recommended.",
    avatar: "/images/avatar-3.jpg",
  },
  {
    name: "Philip Mario Pompili",
    date: "Apr 30, 2026",
    body: "I still cannot believe how fast these guys got me the tires. They were out of stock everywhere in Canada. Then I found Formula 19 — in stock, shipped next day.",
    avatar: "/images/avatar-2.jpg",
  },
  {
    name: "Éric Savard",
    date: "Apr 29, 2026",
    body: "Excellent service! Loaded the wheels into the car for me, super patient with all my questions, and the price was right.",
    initial: "E",
    initialBg: "#3b3b3b",
  },
  {
    name: "Guillaume Tremblay",
    date: "Apr 28, 2026",
    body: "Easy and stress free. Staff is knowledgeable and eager to help you find a set of wheels that you'll like while being a good fit for your car.",
    initial: "G",
    initialBg: "#0f9d58",
  },
  {
    name: "Erik Heath",
    date: "Apr 28, 2026",
    body: "Great communication, took the time to check fitment on a number of wheels for me. Ordered Friday, had them Tuesday. Very happy.",
    initial: "E",
    initialBg: "#1e88e5",
  },
  {
    name: "Siobhan O'Hanlon",
    date: "Apr 22, 2026",
    body: "Excellent customer service — very helpful and knowledgeable. They even loaded the wheels into my car. I highly recommend them.",
    initial: "S",
    initialBg: "#c2185b",
  },
  {
    name: "Marcus Lin",
    date: "Apr 18, 2026",
    body: "Best tire shop in the Okanagan. The team knew exactly which compound would work for my track car. Install was flawless.",
    initial: "M",
    initialBg: "#6a1b9a",
  },
]

function GoogleG({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-label="Google review">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3 0 5.7 1.1 7.8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.6 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.2 0-9.6-3.3-11.2-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2C41 36 44 30.5 44 24c0-1.2-.1-2.3-.4-3.5z" />
    </svg>
  )
}

function ReviewCard({ r }: { r: Review }) {
  return (
    <article className="w-[320px] sm:w-[360px] shrink-0 bg-card border border-border p-6 flex flex-col">
      <header className="flex items-start gap-3 mb-4">
        {r.avatar ? (
          <div className="relative w-12 h-12 shrink-0 overflow-hidden">
            <Image src={r.avatar} alt={r.name} fill className="object-cover" sizes="48px" />
          </div>
        ) : (
          <div
            className="w-12 h-12 shrink-0 flex items-center justify-center font-display text-xl text-white"
            style={{ backgroundColor: r.initialBg || "#3b3b3b" }}
            aria-hidden
          >
            {r.initial}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-display uppercase text-foreground text-sm tracking-wide leading-tight">
            {r.name}
          </h3>
          <div className="flex items-center gap-1 mt-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
            ))}
          </div>
        </div>
        <GoogleG />
      </header>
      <p className="text-sm text-foreground/80 leading-relaxed line-clamp-5 flex-1">
        &ldquo;{r.body}&rdquo;
      </p>
      <time className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {r.date}
      </time>
    </article>
  )
}

export function TestimonialsSection() {
  const featured = REVIEWS[6] // Siobhan
  const loop = [...REVIEWS, ...REVIEWS]

  return (
    <section id="reviews" className="relative bg-card py-20 lg:py-28 overflow-hidden border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
              / Reviews
            </span>
            <h2 className="mt-3 font-display uppercase text-foreground text-[clamp(2rem,4.5vw,3.75rem)] leading-none">
              What drivers are saying
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <span className="text-foreground num-badge">4.9</span> from 1,200+ Google reviews
            </div>
          </div>
        </div>

        {/* Featured testimonial overlay */}
        <div className="relative aspect-[16/7] min-h-[280px] bg-background overflow-hidden mb-10">
          <Image
            src="/images/cat-ev.jpg"
            alt="Customer car"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1400px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-xl mx-6 lg:mx-12 bg-background/90 backdrop-blur p-6 lg:p-10 border-l-2 border-primary">
              <p className="font-display uppercase text-foreground text-xl lg:text-2xl leading-tight text-balance">
                &ldquo;{featured.body}&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                — {featured.name}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auto-scrolling review cards */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 lg:w-32 bg-gradient-to-r from-card to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 lg:w-32 bg-gradient-to-l from-card to-transparent z-10" />
        <div className="flex gap-4 lg:gap-5 w-max animate-marquee py-2">
          {loop.map((r, i) => (
            <ReviewCard key={`${r.name}-${i}`} r={r} />
          ))}
        </div>
      </div>
    </section>
  )
}
