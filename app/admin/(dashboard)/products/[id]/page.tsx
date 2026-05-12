import { ProductForm } from "@/components/admin/product-form"
import { updateProduct } from "@/app/actions/admin"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import type { Product } from "@/lib/data"

export const dynamic = "force-dynamic"

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single()

  if (!product) notFound()

  const action = async (formData: FormData) => {
    "use server"
    return updateProduct(id, formData)
  }

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
        <h1 className="text-3xl font-bold text-white">Edit product</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Update details for {product.name}.
        </p>
      </div>
      <ProductForm product={product as Product} action={action} />
    </div>
  )
}
