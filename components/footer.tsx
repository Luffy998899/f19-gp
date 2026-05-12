import Link from "next/link"
import { Facebook, Instagram } from "lucide-react"

type Props = {
  content: Record<string, string>
}

export function Footer({ content }: Props) {
  const phone = content.contact_phone || "778-999-8473"
  const email = content.contact_email || "formula19tires@gmail.com"
  const addressLine1 = content.contact_address_line1 || "Unit 1, 715 Evans CT"
  const addressLine2 = content.contact_address_line2 || "Kelowna, BC V1X 6G4"

  return (
    <footer className="bg-foreground text-background">
      {/* Massive wordmark band */}
      <div className="border-b border-background/10 py-16 md:py-24 overflow-hidden">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <Link href="#top" className="block group">
            <div className="font-serif text-[clamp(4rem,18vw,18rem)] leading-[0.85] tracking-[-0.03em]">
              Formula <span className="italic text-accent">19</span>
            </div>
            <div className="mt-4 flex flex-wrap items-baseline gap-x-8 gap-y-2 font-mono text-[10px] md:text-xs uppercase tracking-widest text-background/60">
              <span>Tyres &amp; Wheels</span>
              <span>·</span>
              <span>Kelowna, BC</span>
              <span>·</span>
              <span>Est. 2014</span>
              <span>·</span>
              <span>Vol. XII — MMXXVI</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Columns */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-16 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6">
        <div className="col-span-2">
          <div className="text-[10px] font-mono uppercase tracking-widest text-background/50 mb-4">
            The Atelier
          </div>
          <address className="not-italic font-serif text-xl leading-snug">
            {addressLine1}
            <br />
            {addressLine2}
          </address>
          <div className="mt-6 flex flex-col gap-2 text-sm text-background/70">
            <a href={`tel:+${phone.replace(/\D/g, "")}`} className="hover:text-accent">
              {phone}
            </a>
            <a href={`mailto:${email}`} className="hover:text-accent break-all">
              {email}
            </a>
          </div>
        </div>

        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-background/50 mb-4">
            Catalogue
          </div>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="#catalogue" className="hover:text-accent">
                Performance tyres
              </a>
            </li>
            <li>
              <a href="#catalogue" className="hover:text-accent">
                Alloy wheels
              </a>
            </li>
            <li>
              <a href="#catalogue" className="hover:text-accent">
                Winter range
              </a>
            </li>
            <li>
              <a href="#catalogue" className="hover:text-accent">
                Off-road
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-background/50 mb-4">
            The House
          </div>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="#atelier" className="hover:text-accent">
                About
              </a>
            </li>
            <li>
              <a href="#archive" className="hover:text-accent">
                Archive
              </a>
            </li>
            <li>
              <a href="#enquiries" className="hover:text-accent">
                Enquiries
              </a>
            </li>
            <li>
              <Link href="/admin/login" className="text-background/50 hover:text-accent">
                Staff entrance
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Colophon */}
      <div className="border-t border-background/10">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-widest text-background/50">
          <p>© {new Date().getFullYear()} Formula 19 Tyres. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Follow</span>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-accent"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-accent"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
