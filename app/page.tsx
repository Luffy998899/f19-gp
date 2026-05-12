import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ProductsSection } from "@/components/products-section"
import { ConfiguratorSection } from "@/components/configurator-section"
import { AboutSection } from "@/components/about-section"
import { PerformanceSection } from "@/components/performance-section"
import { GallerySection } from "@/components/gallery-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FAQSection } from "@/components/faq-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <ProductsSection />
      <ConfiguratorSection />
      <AboutSection />
      <PerformanceSection />
      <GallerySection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
