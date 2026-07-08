import { createClient } from "@/lib/supabase/server"

/** Columns safe to expose on the public storefront (no price). */
export const PUBLIC_PRODUCT_COLUMNS =
  "id, name, category, description, size, width, profile, rating, reviews_count, image_url, is_featured, is_active, display_order" as const

export type Product = {
  id: string
  name: string
  category: string
  price?: number | null
  description: string | null
  size: string | null
  width: string | null
  profile: string | null
  rating: number
  reviews_count: number
  image_url: string | null
  is_featured: boolean
  is_active: boolean
  display_order: number
  sku?: string | null
}

/** Public catalog product — price is never included. */
export type CatalogProduct = Omit<Product, "price">

export type GalleryImage = {
  id: string
  title: string
  category: string
  image_url: string
  alt_text: string | null
  display_order: number
  is_active: boolean
}

export type Faq = {
  id: string
  question: string
  answer: string
  display_order: number
  is_active: boolean
}

export type Inquiry = {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string | null
  message: string
  status: string
  created_at: string
}

export type SocialLink = {
  id: string
  platform: string
  label: string | null
  url: string
  display_order: number
  is_active: boolean
}

export type CatalogPage = {
  products: CatalogProduct[]
  total: number
  page: number
  limit: number
  category: string
}

const CATALOG_CATEGORIES = ["Wheels", "Tires", "Accessories", "Lighting"] as const
export type CatalogCategory = (typeof CATALOG_CATEGORIES)[number] | "all"

export function isCatalogCategory(value: string): value is CatalogCategory {
  return value === "all" || (CATALOG_CATEGORIES as readonly string[]).includes(value)
}

function applyCategoryFilter<T extends { ilike: Function; eq: Function }>(
  query: T,
  category: CatalogCategory,
): T {
  if (category === "all") return query
  if (category === "Accessories" || category === "Lighting") {
    return query.ilike("category", `${category}%`) as T
  }
  return query.eq("category", category) as T
}

export async function getFeaturedProducts(limit = 16): Promise<CatalogProduct[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("products")
    .select(PUBLIC_PRODUCT_COLUMNS)
    .eq("is_active", true)
    .eq("is_featured", true)
    .not("image_url", "is", null)
    .order("display_order", { ascending: true })
    .limit(limit)
  return (data as CatalogProduct[]) || []
}

export async function getCatalogPage(options: {
  page?: number
  limit?: number
  category?: CatalogCategory
}): Promise<CatalogPage> {
  const page = Math.max(1, options.page ?? 1)
  const limit = Math.min(48, Math.max(12, options.limit ?? 24))
  const category = options.category ?? "all"
  const from = (page - 1) * limit
  const to = from + limit - 1

  const supabase = await createClient()
  let query = supabase
    .from("products")
    .select(PUBLIC_PRODUCT_COLUMNS, { count: "exact" })
    .eq("is_active", true)

  query = applyCategoryFilter(query, category)

  const { data, count, error } = await query
    .order("display_order", { ascending: true })
    .range(from, to)

  if (error) {
    return { products: [], total: 0, page, limit, category }
  }

  return {
    products: (data as CatalogProduct[]) || [],
    total: count ?? 0,
    page,
    limit,
    category,
  }
}

export async function getProductCount(): Promise<number> {
  const supabase = await createClient()
  const { count } = await supabase
    .from("products")
    .select("id", { count: "exact", head: true })
    .eq("is_active", true)
  return count ?? 0
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("gallery_images")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true })
  return (data as GalleryImage[]) || []
}

export async function getFaqs(): Promise<Faq[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("faqs")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true })
  return (data as Faq[]) || []
}

export async function getSiteContent(): Promise<Record<string, string>> {
  const supabase = await createClient()
  const { data } = await supabase.from("site_content").select("key, value")
  const map: Record<string, string> = {}
  for (const row of data || []) {
    map[row.key] = row.value
  }
  return map
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("social_links")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true })
  if (error) {
    return []
  }
  return (data as SocialLink[]) || []
}
