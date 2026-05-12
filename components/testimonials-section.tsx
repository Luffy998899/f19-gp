"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

import "swiper/css"
import "swiper/css/pagination"

const testimonials = [
  {
    id: 1,
    name: "James Mitchell",
    role: "Car Enthusiast",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
    rating: 5,
    text: "Absolutely incredible quality. The wheels transformed my BMW completely. The attention to detail is unmatched.",
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Track Day Driver",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
    rating: 5,
    text: "These tyres perform exceptionally on the track. Perfect grip, excellent durability. Worth every penny.",
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    role: "Automotive Journalist",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
    rating: 5,
    text: "Having tested countless wheels, Formula 19 stands out for their engineering precision and premium finish.",
  },
  {
    id: 4,
    name: "Emma Thompson",
    role: "Luxury Car Owner",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces",
    rating: 5,
    text: "The customer service was exceptional. They helped me choose the perfect wheels for my Mercedes.",
  },
  {
    id: 5,
    name: "David Park",
    role: "Racing Team Manager",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
    rating: 5,
    text: "We equip all our racing vehicles with Formula 19 tyres. Consistent performance lap after lap.",
  },
]

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="glass rounded-2xl p-8 h-full flex flex-col">
      {/* Quote Icon */}
      <Quote className="w-10 h-10 text-red-500/30 mb-4" />
      
      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < testimonial.rating
                ? "fill-yellow-500 text-yellow-500"
                : "text-zinc-600"
            }`}
          />
        ))}
      </div>

      {/* Text */}
      <p className="text-lg text-white/90 leading-relaxed flex-grow mb-6">
        &quot;{testimonial.text}&quot;
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <div className="font-semibold text-white">{testimonial.name}</div>
          <div className="text-sm text-muted-foreground">{testimonial.role}</div>
        </div>
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-red-500 text-sm font-medium tracking-widest uppercase mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what automotive enthusiasts
            have to say about their Formula 19 experience.
          </p>
        </motion.div>

        {/* Testimonials Slider */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-16"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id} className="h-auto">
                <TestimonialCard testimonial={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}
