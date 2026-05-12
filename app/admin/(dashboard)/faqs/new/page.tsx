import { FaqForm } from "@/components/admin/faq-form"
import { createFaq } from "@/app/actions/admin"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NewFaqPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/admin/faqs"
        className="mb-4 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to FAQs
      </Link>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Add FAQ</h1>
      </div>
      <FaqForm action={createFaq} />
    </div>
  )
}
