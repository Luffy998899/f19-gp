import { createClient } from "@/lib/supabase/server"

export type Product = {
  id: string
  name: string
  category: string
  price: number
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
}

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

export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true })
  return (data as Product[]) || []
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
