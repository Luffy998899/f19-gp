import Link from "next/link"
import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react"

interface FooterProps {
  content: Record<string, string>
}

export function Footer({ content }: FooterProps) {
  const phone = content.contact_phone || "778-999-8473"
  const email = content.contact_email || "formula19tires@gmail.com"
  const addressLine1 = content.contact_address_line1 || "Unit 1, 715 Evans CT"
  const addressLine2 = content.contact_address_line2 || "Kelowna, BC V1X 6G4"

  return (
    <footer className="bg-background text-foreground border-t-2 border-primary">
      {/* Massive wordmark */}
      <div className="border-b border-border py-16 lg:py-24 overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6">
          <Link href="#top" className="block group">
            <div className="font-display text-[clamp(4rem,18vw,18rem)] leading-[0.8] tracking-[-0.02em] uppercase">
              FORMULA <span className="text-primary">19</span>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground">
              <span>Tires & Wheels</span>
              <span className="w-1 h-1 bg-primary" />
              <span>Kelowna, BC</span>
              <span className="w-1 h-1 bg-primary" />
              <span>Est. 2014</span>
              <span className="w-1 h-1 bg-primary" />
              <span>N° 0719</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Columns */}
      <div className="mx-auto max-w-[1400px] px-6 py-16 grid grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="col-span-2">
          <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-4">
            / The Garage
          </div>
          <address className="not-italic font-display text-xl uppercase tracking-tight text-foreground leading-tight">
            {addressLine1}
            <br />
            {addressLine2}
          </address>
          <div className="mt-6 space-y-3 text-sm">
            <a
              href={`tel:${phone.replace(/\D/g, "")}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary"
            >
              <Phone className="w-3.5 h-3.5" /> {phone}
            </a>
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary break-all"
            >
              <Mail className="w-3.5 h-3.5" /> {email}
            </a>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-3.5 h-3.5" /> Kelowna, BC
            </div>
          </div>
        </div>

        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-4">
            / Catalog
          </div>
          <ul className="space-y-3 text-sm">
            <li><a href="#products" className="text-muted-foreground hover:text-primary">Performance Tires</a></li>
            <li><a href="#products" className="text-muted-foreground hover:text-primary">Alloy Wheels</a></li>
            <li><a href="#products" className="text-muted-foreground hover:text-primary">Winter Range</a></li>
            <li><a href="#products" className="text-muted-foreground hover:text-primary">Off-Road</a></li>
          </ul>
        </div>

        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-4">
            / Shop
          </div>
          <ul className="space-y-3 text-sm">
            <li><a href="#about" className="text-muted-foreground hover:text-primary">About</a></li>
            <li><a href="#services" className="text-muted-foreground hover:text-primary">Services</a></li>
            <li><a href="#gallery" className="text-muted-foreground hover:text-primary">Gallery</a></li>
            <li><a href="#contact" className="text-muted-foreground hover:text-primary">Contact</a></li>
            <li>
              <Link href="/admin/login" className="text-muted-foreground/60 hover:text-primary">
                Staff Login
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Colophon */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            © {new Date().getFullYear()} Formula 19 Tires. Built for the road.
          </p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Follow
            </span>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-foreground hover:text-primary"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-foreground hover:text-primary"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom checkered band */}
      <div className="h-2 checkered" />
    </footer>
  )
}
