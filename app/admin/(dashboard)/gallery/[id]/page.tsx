import { GalleryForm } from "@/components/admin/gallery-form"
import { updateGalleryImage } from "@/app/actions/admin"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import type { GalleryImage } from "@/lib/data"

export const dynamic = "force-dynamic"

export default async function EditGalleryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: image } = await supabase
    .from("gallery_images")
    .select("*")
    .eq("id", id)
    .single()

  if (!image) notFound()

  const action = async (formData: FormData) => {
    "use server"
    return updateGalleryImage(id, formData)
  }

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        href="/admin/gallery"
        className="mb-4 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to gallery
      </Link>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Edit image</h1>
      </div>
      <GalleryForm image={image as GalleryImage} action={action} />
    </div>
  )
}
