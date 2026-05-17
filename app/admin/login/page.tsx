import { LoginForm } from "@/components/admin/login-form"
import Link from "next/link"
import { redirect } from "next/navigation"
import { adminExists } from "@/app/actions/setup"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Admin Login | Formula 19 Tyres",
}

export default async function AdminLoginPage() {
  // If no admin exists yet, send the user to first-time setup.
  // Wrap in try/catch so transient Supabase issues don't render a confusing 404.
  try {
    if (!(await adminExists())) {
      redirect("/setup")
    }
  } catch (err) {
    if ((err as { digest?: string })?.digest?.startsWith?.("NEXT_REDIRECT")) {
      throw err
    }
    console.error("[v0] adminExists check failed:", err)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[150px]" />

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <span className="font-display text-3xl uppercase tracking-wide text-foreground">
              FORMULA<span className="text-primary">19</span>
            </span>
          </Link>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            Admin Portal
          </p>
        </div>

        <div className="border border-border bg-card p-8 backdrop-blur">
          <h1 className="mb-2 font-display text-2xl uppercase text-foreground">
            Welcome back
          </h1>
          <p className="mb-6 text-sm text-muted-foreground">
            Sign in to manage your store.
          </p>
          <LoginForm />
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            ← Back to website
          </Link>
        </p>
      </div>
    </div>
  )
}
