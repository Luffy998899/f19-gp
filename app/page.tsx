import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ProductsSection } from "@/components/products-section"
import { AboutSection } from "@/components/about-section"
import { GallerySection } from "@/components/gallery-section"
import { FAQSection } from "@/components/faq-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { getFaqs, getGalleryImages, getProducts, getSiteContent } from "@/lib/data"

export const revalidate = 0

export default async function Home() {
  const [products, gallery, faqs, content] = await Promise.all([
    getProducts(),
    getGalleryImages(),
    getFaqs(),
    getSiteContent(),
  ])

  return (
    <main className="relative bg-black">
      <Navbar content={content} />
      <HeroSection content={content} />
      <ProductsSection products={products} />
      <AboutSection content={content} />
      <GallerySection images={gallery} />
      <FAQSection faqs={faqs} />
      <ContactSection content={content} />
      <Footer content={content} />
      <WhatsAppButton phone={content.whatsapp_number || "17789998473"} />
    </main>
  )
}
