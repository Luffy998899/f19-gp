"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Facebook, Instagram, Send, MapPin, Phone, Mail } from "lucide-react"

const footerLinks = {
  products: [
    { name: "Performance Tyres", href: "#products" },
    { name: "Alloy Wheels", href: "#products" },
    { name: "Steel Wheels", href: "#products" },
    { name: "Off-Road Tyres", href: "#products" },
  ],
  company: [
    { name: "About Us", href: "#about" },
    { name: "Gallery", href: "#gallery" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ],
}

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
]

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="relative bg-zinc-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="#home" className="inline-block mb-6">
              <span className="font-heading text-3xl tracking-wide">
                <span className="text-white">FORMULA</span>
                <span className="text-red-500">19</span>
              </span>
              <span className="block text-xs text-zinc-500 tracking-widest uppercase mt-1">
                Tyres
              </span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Premium performance tyres and luxury alloy wheels in Kelowna, BC.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="tel:+17789998473"
                className="flex items-center gap-3 text-sm text-zinc-400 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-red-500" />
                778-999-8473
              </a>
              <a
                href="mailto:formula19tires@gmail.com"
                className="flex items-center gap-3 text-sm text-zinc-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-red-500" />
                formula19tires@gmail.com
              </a>
              <div className="flex items-start gap-3 text-sm text-zinc-400">
                <MapPin className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span>Unit 1, 715 Evans CT<br />Kelowna, BC V1X 6G4</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-4">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-zinc-400 mb-4">
              Get updates on new products and offers.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                <Send className="w-4 h-4" />
                Subscribe
              </button>
            </form>
            {isSubscribed && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-400 text-sm mt-3"
              >
                Thank you for subscribing!
              </motion.p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-zinc-500 text-sm">
              &copy; {new Date().getFullYear()} Formula 19 Tyres. All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
