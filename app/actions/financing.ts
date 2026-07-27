"use server"

import { createClient } from "@/lib/supabase/server"
import { FINANCING_PROGRAMS, LOAN_MAX, LOAN_MIN } from "@/lib/financing"

export type FinancingFormState = {
  status: "idle" | "success" | "error"
  message: string
  /** Present on success — the client opens it so the shop gets an instant ping. */
  whatsappUrl?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function digitsOnly(input: string) {
  return input.replace(/\D/g, "")
}

function programName(id: string) {
  return FINANCING_PROGRAMS.find((p) => p.id === id)?.name ?? "Not selected yet"
}

/**
 * Financing enquiry: the customer has run Driver Capital's Max Loan Calculator,
 * knows their approved amount, and wants us to book the work against it.
 *
 * Stored in the same `inquiries` table as every other lead so it shows up in the
 * admin inbox, with the financing detail packed into the message body.
 */
export async function submitFinancingLead(
  _prevState: FinancingFormState,
  formData: FormData,
): Promise<FinancingFormState> {
  const name = String(formData.get("name") || "").trim()
  const email = String(formData.get("email") || "").trim()
  const phone = String(formData.get("phone") || "").trim()
  const vehicle = String(formData.get("vehicle") || "").trim()
  const amountRaw = String(formData.get("approved_amount") || "").trim()
  const guaranteeCode = String(formData.get("guarantee_code") || "").trim()
  const program = String(formData.get("program") || "").trim()
  const details = String(formData.get("details") || "").trim()

  if (!name || !phone || !vehicle) {
    return {
      status: "error",
      message: "Please fill out your name, phone number and vehicle.",
    }
  }
  if (email && !EMAIL_RE.test(email)) {
    return { status: "error", message: "Please enter a valid email address." }
  }
  if (digitsOnly(phone).length < 10) {
    return { status: "error", message: "Please enter a valid phone number." }
  }

  // The approved amount is optional — some customers call before running the
  // calculator — but if it is given it has to sit inside Driver Capital's range.
  const amount = amountRaw ? Number(digitsOnly(amountRaw)) : null
  if (amountRaw && (!Number.isFinite(amount) || amount === null)) {
    return { status: "error", message: "Please enter your approved amount as a number." }
  }
  if (amount !== null && (amount < LOAN_MIN || amount > LOAN_MAX)) {
    return {
      status: "error",
      message: `Driver Capital loans run from $${LOAN_MIN} to $${LOAN_MAX.toLocaleString()}.`,
    }
  }

  const amountLabel = amount !== null ? `$${amount.toLocaleString()}` : "Not calculated yet"

  const messageLines = [
    `Approved amount: ${amountLabel}`,
    `Program: ${programName(program)}`,
    `Vehicle: ${vehicle}`,
    guaranteeCode ? `Max Loan guarantee code: ${guaranteeCode}` : null,
    `Phone: ${phone}`,
    email ? `Email: ${email}` : null,
    "",
    details || "No additional notes.",
  ].filter((line) => line !== null) as string[]

  const supabase = await createClient()

  const { data: contentRows } = await supabase
    .from("site_content")
    .select("key, value")
    .in("key", ["whatsapp_number"])
  const whatsappRaw =
    contentRows?.find((r) => r.key === "whatsapp_number")?.value || "17789998473"
  const whatsappNumber = digitsOnly(whatsappRaw) || "17789998473"

  const { error } = await supabase.from("inquiries").insert({
    name,
    // `email` is NOT NULL on the table; financing leads lead with a phone
    // number, so synthesise a placeholder when no email was given.
    email: email || `${digitsOnly(phone)}@phone.lead`,
    phone,
    subject: `Financing — ${amountLabel} · ${programName(program)}`,
    message: messageLines.join("\n"),
    status: "new",
  })

  if (error) {
    return {
      status: "error",
      message: "Could not send your request. Please call us at 778-999-8473.",
    }
  }

  const waLines = [
    "Hi Formula 19, I'd like to use Driver Capital financing.",
    `Name: ${name}`,
    `Vehicle: ${vehicle}`,
    `Approved for: ${amountLabel}`,
    `Program: ${programName(program)}`,
    guaranteeCode ? `Guarantee code: ${guaranteeCode}` : null,
    details ? `Work needed: ${details}` : null,
  ].filter((line) => line !== null) as string[]

  return {
    status: "success",
    message:
      "Got it. We'll confirm your appointment and what your approval covers — usually within a few hours during shop hours.",
    whatsappUrl: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waLines.join("\n"))}`,
  }
}
