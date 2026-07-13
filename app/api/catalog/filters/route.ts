import { getCatalogFilters, isCatalogCategory } from "@/lib/data"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const rawCategory = searchParams.get("category") || "Wheels"
  const category = isCatalogCategory(rawCategory) ? rawCategory : "Wheels"

  const filters = await getCatalogFilters(category)
  return NextResponse.json(filters)
}
