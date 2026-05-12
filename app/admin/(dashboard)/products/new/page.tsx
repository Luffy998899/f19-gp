import { ProductForm } from "@/components/admin/product-form"
import { createProduct } from "@/app/actions/admin"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NewProductPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <Link
        href="/admin/products"
        className="mb-4 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to products
      </Link>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Add product</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Create a new tire or wheel listing.
        </p>
      </div>
      <ProductForm action={createProduct} />
    </div>
  )
}
