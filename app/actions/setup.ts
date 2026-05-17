"use server"

import { createServerClient } from "@supabase/ssr"
import { createClient as createSupabaseAdminClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type SetupState = { error?: string; ok?: boolean }

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * Returns true when an admin profile already exists.
 * Safe to call from server components / actions.
 */
export async function adminExists(): Promise<boolean> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) return false

  const admin = createSupabaseAdminClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
  const { count, error } = await admin
    .from("admin_profiles")
    .select("id", { count: "exact", head: true })

  if (error) return false
  return (count ?? 0) > 0
}

/**
 * Server action used by the setup page to create the first admin account.
 * Will refuse if any admin already exists.
 */
export async function createFirstAdmin(
  _prev: SetupState,
  formData: FormData,
): Promise<SetupState> {
  const email = String(formData.get("email") || "").trim().toLowerCase()
  const password = String(formData.get("password") || "")
  const confirmPassword = String(formData.get("confirmPassword") || "")
  const fullName = String(formData.get("fullName") || "").trim() || "Admin"

  if (!isValidEmail(email)) return { error: "Please enter a valid email address." }
  if (password.length < 10)
    return { error: "Password must be at least 10 characters long." }
  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password))
    return {
      error: "Password must include upper case, lower case, and a number.",
    }
  if (password !== confirmPassword)
    return { error: "Passwords do not match." }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey || !anonKey)
    return {
      error:
        "Supabase environment variables are missing. Set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY before running setup.",
    }

  // Refuse if an admin already exists.
  if (await adminExists())
    return { error: "Setup is already complete. Please sign in." }

  const admin = createSupabaseAdminClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  // Create the auth user (email auto-confirmed so they can log in immediately).
  const { data: created, error: createErr } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName },
  })
  if (createErr || !created?.user) {
    return {
      error:
        createErr?.message || "Could not create admin account. Please try again.",
    }
  }

  // Make sure an admin_profiles row exists (trigger may already insert one).
  const { error: profileErr } = await admin
    .from("admin_profiles")
    .upsert({ id: created.user.id, email, full_name: fullName }, { onConflict: "id" })
  if (profileErr) {
    return { error: `Account created but profile setup failed: ${profileErr.message}` }
  }

  // Sign the new admin in immediately by setting a session cookie via SSR client.
  const cookieStore = await cookies()
  const supabase = createServerClient(
    url,
    anonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          )
        },
      },
    },
  )
  await supabase.auth.signInWithPassword({ email, password })

  redirect("/admin")
}
