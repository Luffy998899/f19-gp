import { GalleryForm } from "@/components/admin/gallery-form"
import { createGalleryImage } from "@/app/actions/admin"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NewGalleryPage() {
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
        <h1 className="text-3xl font-bold text-white">Add image</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Add a new image to the gallery section.
        </p>
      </div>
      <GalleryForm action={createGalleryImage} />
    </div>
  )
}
