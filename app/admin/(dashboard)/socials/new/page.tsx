import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SocialForm } from "@/components/admin/social-form"
import { createSocialLink } from "@/app/actions/admin"

export default function NewSocialLinkPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/admin/socials"
        className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to socials
      </Link>
      <h1 className="mb-6 text-3xl font-bold text-white">Add social link</h1>
      <SocialForm action={createSocialLink} />
    </div>
  )
}
