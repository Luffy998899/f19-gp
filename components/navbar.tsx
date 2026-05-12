"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Phone, MessageCircle } from "lucide-react"
import Link from "next/link"

interface NavbarProps {
  content: Record<string, string>
}

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Products", href: "#products" },
  { name: "About", href: "#about" },
  { name: "Gallery", href: "#gallery" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
]

export function Navbar({ content }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const phone = content.contact_phone || "778-999-8473"
  const whatsapp = content.whatsapp_number || "17789998473"

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/5 bg-black/90 py-4 backdrop-blur-lg"
            : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="#home" className="flex items-center gap-3">
              <span className="font-heading text-2xl tracking-wide sm:text-3xl">
                <span className="text-white">FORMULA</span>
                <span className="text-red-500">19</span>
              </span>
              <span className="hidden text-xs uppercase tracking-widest text-zinc-500 sm:block">
                Tyres
              </span>
            </Link>

            <div className="hidden items-center gap-8 lg:flex">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                >
                  {link.name}
                </button>
              ))}
            </div>

            <div className="hidden items-center gap-4 lg:flex">
              <a
                href={`tel:+${phone.replace(/\D/g, "")}`}
                className="flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4" />
                <span>{phone}</span>
              </a>
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white lg:hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black lg:hidden"
          >
            <div className="px-6 pt-24">
              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleNavClick(link.href)}
                    className="border-b border-white/10 py-4 text-left text-2xl font-medium text-white"
                  >
                    {link.name}
                  </motion.button>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4">
                <a
                  href={`tel:+${phone.replace(/\D/g, "")}`}
                  className="flex items-center gap-3 text-lg text-zinc-400"
                >
                  <Phone className="h-5 w-5" />
                  {phone}
                </a>
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-4 font-semibold text-white"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
