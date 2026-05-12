"use client"

import Link from "next/link"
import { Facebook, Instagram, MapPin, Phone, Mail } from "lucide-react"

interface FooterProps {
  content: Record<string, string>
}

const footerLinks = {
  products: [
    { name: "Performance Tires", href: "#products" },
    { name: "Alloy Wheels", href: "#products" },
    { name: "Steel Wheels", href: "#products" },
    { name: "Off-Road Tires", href: "#products" },
  ],
  company: [
    { name: "About Us", href: "#about" },
    { name: "Gallery", href: "#gallery" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ],
}

export function Footer({ content }: FooterProps) {
  const phone = content.contact_phone || "778-999-8473"
  const email = content.contact_email || "formula19tires@gmail.com"
  const addressLine1 = content.contact_address_line1 || "Unit 1, 715 Evans CT"
  const addressLine2 = content.contact_address_line2 || "Kelowna, BC V1X 6G4"

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <footer className="relative border-t border-white/10 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="#home" className="mb-6 inline-block">
              <span className="font-heading text-3xl tracking-wide">
                <span className="text-white">FORMULA</span>
                <span className="text-red-500">19</span>
              </span>
              <span className="mt-1 block text-xs uppercase tracking-widest text-zinc-500">
                Tyres
              </span>
            </Link>
            <p className="mb-6 max-w-md text-sm leading-relaxed text-zinc-400">
              Kelowna&apos;s premier destination for premium tires, alloy
              wheels, and expert installation services.
            </p>

            <div className="space-y-3">
              <a
                href={`tel:+${phone.replace(/\D/g, "")}`}
                className="flex items-center gap-3 text-sm text-zinc-400 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 text-red-500" />
                {phone}
              </a>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 text-sm text-zinc-400 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 text-red-500" />
                {email}
              </a>
              <div className="flex items-start gap-3 text-sm text-zinc-400">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                <span>
                  {addressLine1}
                  <br />
                  {addressLine2}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
              <li>
                <Link
                  href="/admin/login"
                  className="text-sm text-zinc-500 transition-colors hover:text-white"
                >
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-zinc-500">
              &copy; {new Date().getFullYear()} Formula 19 Tyres. All rights
              reserved.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
