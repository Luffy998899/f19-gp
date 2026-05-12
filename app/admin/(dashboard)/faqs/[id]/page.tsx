import { FaqForm } from "@/components/admin/faq-form"
import { updateFaq } from "@/app/actions/admin"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import type { Faq } from "@/lib/data"

export const dynamic = "force-dynamic"

export default async function EditFaqPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: faq } = await supabase
    .from("faqs")
    .select("*")
    .eq("id", id)
    .single()

  if (!faq) notFound()

  const action = async (formData: FormData) => {
    "use server"
    return updateFaq(id, formData)
  }

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
        <h1 className="text-3xl font-bold text-white">Edit FAQ</h1>
      </div>
      <FaqForm faq={faq as Faq} action={action} />
    </div>
  )
}
