"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "What wheel sizes do you offer?",
    answer: "We offer a comprehensive range of wheel sizes from 15\" to 24\". Our most popular sizes are 18\", 19\", and 20\" which fit most modern sports cars and luxury vehicles. Contact us for custom sizing options.",
  },
  {
    question: "Do you offer installation services?",
    answer: "Yes, we provide professional installation services at our Kelowna location. Our certified technicians ensure proper mounting, balancing, and alignment for every wheel and tyre set.",
  },
  {
    question: "What warranty do you provide?",
    answer: "All Formula 19 products come with a comprehensive 5-year warranty covering manufacturing defects. Our premium line includes extended coverage for road hazards.",
  },
  {
    question: "Can I return or exchange products?",
    answer: "We offer a 30-day return policy for unmounted products in original condition. Mounted products can be exchanged within 7 days if there are any fitment issues.",
  },
  {
    question: "How do I know which wheels fit my car?",
    answer: "Contact our specialists with your vehicle make, model, year, and trim level. Our team will recommend the perfect wheel and tyre combination for optimal performance and fitment.",
  },
  {
    question: "Do you offer financing options?",
    answer: "Yes, we offer flexible financing through our partners. Options include 0% APR for qualified buyers, and payment plans ranging from 6 to 24 months.",
  },
]

function FAQItem({ faq, index, isOpen, onToggle }: {
  faq: typeof faqs[0]
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-zinc-900 border border-white/5 rounded-xl overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
      >
        <span className="text-lg font-medium text-white pr-4">{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-red-500" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-6">
              <p className="text-zinc-400 leading-relaxed">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section ref={sectionRef} id="faq" className="py-24 relative">
      <div className="absolute inset-0 bg-black" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-red-500 text-sm font-semibold tracking-widest uppercase mb-4">
            FAQ
          </span>
          <h2 className="font-heading text-5xl md:text-6xl text-white mb-6 tracking-wide">
            COMMON QUESTIONS
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Find answers to frequently asked questions about our products and services.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-zinc-400 mb-4">
            Still have questions? We&apos;re here to help.
          </p>
          <a
            href="#contact"
            className="inline-flex px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  )
}
