import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { FinancingHero } from "@/components/financing/financing-hero"
import { FinancingOptions } from "@/components/financing/financing-options"
import { EligibilityCheck } from "@/components/financing/eligibility-check"
import { FinancingSteps } from "@/components/financing/financing-steps"
import { ApprovalForm } from "@/components/financing/approval-form"
import { FinancingFaq } from "@/components/financing/financing-faq"
import { getSiteContent, getSocialLinks } from "@/lib/data"

export const revalidate = 0

export const metadata: Metadata = {
  title: "Financing — No Credit Check Tire & Wheel Payment Plans | Formula 19",
  description:
    "Finance tires, wheels and installation at Formula 19 in Kelowna with Driver Capital. Check your eligibility and max loan in seconds — no credit check, no impact on your score.",
  keywords: [
    "tire financing Kelowna",
    "no credit check financing",
    "Driver Capital",
    "wheel financing BC",
    "pay monthly tires",
  ],
  openGraph: {
    title: "Fix now. Pay monthly. — Formula 19 Financing",
    description:
      "No credit check financing for tires, wheels and installation. Up to $10,000, approved in seconds.",
    type: "website",
  },
}

export default async function FinancingPage() {
  const [content, socials] = await Promise.all([getSiteContent(), getSocialLinks()])

  return (
    <main className="relative bg-background text-foreground">
      <Navbar content={content} />
      <FinancingHero content={content} />
      <FinancingOptions />
      <EligibilityCheck />
      <FinancingSteps />
      <ApprovalForm content={content} />
      <FinancingFaq />
      <Footer content={content} socials={socials} />
      <WhatsAppButton phone={content.whatsapp_number || "17789998473"} />
    </main>
  )
}
