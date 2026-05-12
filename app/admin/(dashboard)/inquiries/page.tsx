import { createClient } from "@/lib/supabase/server"
import { InquiriesList } from "@/components/admin/inquiries-list"
import type { Inquiry } from "@/lib/data"

export const dynamic = "force-dynamic"

export default async function AdminInquiriesPage() {
  const supabase = await createClient()
  const { data: inquiries } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Customer Inquiries</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Messages submitted through the contact form.
        </p>
      </div>

      <InquiriesList inquiries={(inquiries as Inquiry[]) || []} />
    </div>
  )
}
