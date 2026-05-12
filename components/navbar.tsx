"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

type Props = {
  content: Record<string, string>
}

const links = [
  { label: "Index", href: "#top", number: "01" },
  { label: "Catalogue", href: "#catalogue", number: "02" },
  { label: "Atelier", href: "#atelier", number: "03" },
  { label: "Archive", href: "#archive", number: "04" },
  { label: "Enquiries", href: "#enquiries", number: "05" },
]

export function Navbar({ content }: Props) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <header
        id="top"
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          scrolled ? "bg-background/85 backdrop-blur-md border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
          <Link href="#top" className="flex items-baseline gap-2 group">
            <span className="font-serif text-2xl md:text-3xl tracking-tight">Formula</span>
            <span className="font-mono text-xs md:text-sm tracking-widest text-accent">/19</span>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {links.slice(1).map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group flex items-baseline gap-1.5 text-sm font-medium hover:text-accent transition-colors"
              >
                <span className="font-mono text-[10px] text-muted-foreground group-hover:text-accent">
                  {l.number}
                </span>
                <span>{l.label}</span>
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${content.contact_phone || "778-999-8473"}`}
              className="font-mono text-xs tracking-wider text-muted-foreground hover:text-foreground"
            >
              {content.contact_phone || "778-999-8473"}
            </a>
            <a
              href="#enquiries"
              className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 text-xs font-mono uppercase tracking-widest hover:bg-accent transition-colors"
            >
              Book a fitting
              <span aria-hidden>→</span>
            </a>
          </div>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 -mr-2"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-50 bg-foreground text-background transition-transform duration-500 md:hidden ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 h-16">
          <Link
            href="#top"
            onClick={() => setOpen(false)}
            className="flex items-baseline gap-2"
          >
            <span className="font-serif text-2xl">Formula</span>
            <span className="font-mono text-xs text-accent">/19</span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center w-10 h-10 -mr-2"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="px-6 pt-10 flex flex-col gap-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline justify-between border-b border-background/20 py-5"
            >
              <span className="font-serif text-4xl">{l.label}</span>
              <span className="font-mono text-xs text-background/50">{l.number}</span>
            </a>
          ))}
        </nav>
        <div className="px-6 mt-10 flex flex-col gap-2 font-mono text-xs tracking-wider text-background/70">
          <a href={`tel:${content.contact_phone || "778-999-8473"}`}>
            {content.contact_phone || "778-999-8473"}
          </a>
          <a href={`mailto:${content.contact_email || "formula19tires@gmail.com"}`}>
            {content.contact_email || "formula19tires@gmail.com"}
          </a>
        </div>
      </div>
    </>
  )
}
