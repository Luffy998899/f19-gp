"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

async function requireAdmin() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/admin/login")
  return { supabase, user }
}

// ============ PRODUCTS ============

export async function createProduct(formData: FormData) {
  const { supabase } = await requireAdmin()
  const payload = {
    name: String(formData.get("name")),
    category: String(formData.get("category")),
    price: Number(formData.get("price") || 0),
    description: String(formData.get("description") || "") || null,
    size: String(formData.get("size") || "") || null,
    width: String(formData.get("width") || "") || null,
    profile: String(formData.get("profile") || "") || null,
    rating: Number(formData.get("rating") || 5),
    reviews_count: Number(formData.get("reviews_count") || 0),
    image_url: String(formData.get("image_url") || "") || null,
    is_featured: formData.get("is_featured") === "on",
    is_active: formData.get("is_active") !== "off",
    display_order: Number(formData.get("display_order") || 0),
  }
  const { error } = await supabase.from("products").insert(payload)
  if (error) return { error: error.message }
  revalidatePath("/admin/products")
  revalidatePath("/")
  redirect("/admin/products")
}

export async function updateProduct(id: string, formData: FormData) {
  const { supabase } = await requireAdmin()
  const payload = {
    name: String(formData.get("name")),
    category: String(formData.get("category")),
    price: Number(formData.get("price") || 0),
    description: String(formData.get("description") || "") || null,
    size: String(formData.get("size") || "") || null,
    width: String(formData.get("width") || "") || null,
    profile: String(formData.get("profile") || "") || null,
    rating: Number(formData.get("rating") || 5),
    reviews_count: Number(formData.get("reviews_count") || 0),
    image_url: String(formData.get("image_url") || "") || null,
    is_featured: formData.get("is_featured") === "on",
    is_active: formData.get("is_active") !== "off",
    display_order: Number(formData.get("display_order") || 0),
    updated_at: new Date().toISOString(),
  }
  const { error } = await supabase.from("products").update(payload).eq("id", id)
  if (error) return { error: error.message }
  revalidatePath("/admin/products")
  revalidatePath("/")
  redirect("/admin/products")
}

export async function deleteProduct(id: string) {
  const { supabase } = await requireAdmin()
  const { error } = await supabase.from("products").delete().eq("id", id)
  if (error) return { error: error.message }
  revalidatePath("/admin/products")
  revalidatePath("/")
  return { success: true }
}

// ============ GALLERY ============

export async function createGalleryImage(formData: FormData) {
  const { supabase } = await requireAdmin()
  const payload = {
    title: String(formData.get("title")),
    category: String(formData.get("category")),
    image_url: String(formData.get("image_url")),
    alt_text: String(formData.get("alt_text") || "") || null,
    display_order: Number(formData.get("display_order") || 0),
    is_active: formData.get("is_active") !== "off",
  }
  const { error } = await supabase.from("gallery_images").insert(payload)
  if (error) return { error: error.message }
  revalidatePath("/admin/gallery")
  revalidatePath("/")
  redirect("/admin/gallery")
}

export async function updateGalleryImage(id: string, formData: FormData) {
  const { supabase } = await requireAdmin()
  const payload = {
    title: String(formData.get("title")),
    category: String(formData.get("category")),
    image_url: String(formData.get("image_url")),
    alt_text: String(formData.get("alt_text") || "") || null,
    display_order: Number(formData.get("display_order") || 0),
    is_active: formData.get("is_active") !== "off",
  }
  const { error } = await supabase
    .from("gallery_images")
    .update(payload)
    .eq("id", id)
  if (error) return { error: error.message }
  revalidatePath("/admin/gallery")
  revalidatePath("/")
  redirect("/admin/gallery")
}

export async function deleteGalleryImage(id: string) {
  const { supabase } = await requireAdmin()
  const { error } = await supabase
    .from("gallery_images")
    .delete()
    .eq("id", id)
  if (error) return { error: error.message }
  revalidatePath("/admin/gallery")
  revalidatePath("/")
  return { success: true }
}

// ============ FAQS ============

export async function createFaq(formData: FormData) {
  const { supabase } = await requireAdmin()
  const payload = {
    question: String(formData.get("question")),
    answer: String(formData.get("answer")),
    display_order: Number(formData.get("display_order") || 0),
    is_active: formData.get("is_active") !== "off",
  }
  const { error } = await supabase.from("faqs").insert(payload)
  if (error) return { error: error.message }
  revalidatePath("/admin/faqs")
  revalidatePath("/")
  redirect("/admin/faqs")
}

export async function updateFaq(id: string, formData: FormData) {
  const { supabase } = await requireAdmin()
  const payload = {
    question: String(formData.get("question")),
    answer: String(formData.get("answer")),
    display_order: Number(formData.get("display_order") || 0),
    is_active: formData.get("is_active") !== "off",
  }
  const { error } = await supabase.from("faqs").update(payload).eq("id", id)
  if (error) return { error: error.message }
  revalidatePath("/admin/faqs")
  revalidatePath("/")
  redirect("/admin/faqs")
}

export async function deleteFaq(id: string) {
  const { supabase } = await requireAdmin()
  const { error } = await supabase.from("faqs").delete().eq("id", id)
  if (error) return { error: error.message }
  revalidatePath("/admin/faqs")
  revalidatePath("/")
  return { success: true }
}

// ============ SITE CONTENT ============

export async function updateSiteContent(formData: FormData) {
  const { supabase } = await requireAdmin()
  const entries: { key: string; value: string }[] = []
  for (const [key, value] of formData.entries()) {
    entries.push({ key, value: String(value) })
  }
  const { error } = await supabase
    .from("site_content")
    .upsert(
      entries.map((e) => ({
        key: e.key,
        value: e.value,
        updated_at: new Date().toISOString(),
      })),
    )
  if (error) return { error: error.message }
  revalidatePath("/admin/content")
  revalidatePath("/")
  return { success: true }
}

// ============ INQUIRIES ============

export async function updateInquiryStatus(id: string, status: string) {
  const { supabase } = await requireAdmin()
  const { error } = await supabase
    .from("inquiries")
    .update({ status })
    .eq("id", id)
  if (error) return { error: error.message }
  revalidatePath("/admin/inquiries")
  return { success: true }
}

export async function deleteInquiry(id: string) {
  const { supabase } = await requireAdmin()
  const { error } = await supabase.from("inquiries").delete().eq("id", id)
  if (error) return { error: error.message }
  revalidatePath("/admin/inquiries")
  return { success: true }
}

// ============ AUTH ============

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/admin/login")
}
