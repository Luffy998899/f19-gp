import { getCatalogPage, isCatalogCategory } from "@/lib/data"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number(searchParams.get("page") || "1")
  const limit = Number(searchParams.get("limit") || "24")
  const rawCategory = searchParams.get("category") || "all"
  const category = isCatalogCategory(rawCategory) ? rawCategory : "all"
  const size = searchParams.get("size") || undefined
  const width = searchParams.get("width") || undefined
  const profile = searchParams.get("profile") || undefined

  const result = await getCatalogPage({ page, limit, category, size, width, profile })
  return NextResponse.json(result)
}
