"use server"

import { createClient } from "@/lib/supabase/server"

export type ContactFormState = {
  status: "idle" | "success" | "error"
  message: string
}

export async function submitInquiry(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get("name") || "").trim()
  const email = String(formData.get("email") || "").trim()
  const phone = String(formData.get("phone") || "").trim()
  const subject = String(formData.get("subject") || "").trim()
  const message = String(formData.get("message") || "").trim()

  if (!name || !email || !message) {
    return {
      status: "error",
      message: "Please fill out all required fields.",
    }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email address." }
  }

  const supabase = await createClient()
  const { error } = await supabase.from("inquiries").insert({
    name,
    email,
    phone: phone || null,
    subject: subject || null,
    message,
    status: "new",
  })

  if (error) {
    return {
      status: "error",
      message: "Something went wrong. Please try again.",
    }
  }

  return {
    status: "success",
    message: "Thank you! We will get back to you within 24 hours.",
  }
}
