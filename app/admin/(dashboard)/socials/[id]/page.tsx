import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { SocialForm } from "@/components/admin/social-form"
import { updateSocialLink } from "@/app/actions/admin"
import type { SocialLink } from "@/lib/data"

export const dynamic = "force-dynamic"

export default async function EditSocialLinkPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from("social_links")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (!data) notFound()
  const social = data as SocialLink

  async function action(formData: FormData) {
    "use server"
    return updateSocialLink(id, formData)
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/admin/socials"
        className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to socials
      </Link>
      <h1 className="mb-6 text-3xl font-bold text-white">Edit social link</h1>
      <SocialForm socialLink={social} action={action} />
    </div>
  )
}
