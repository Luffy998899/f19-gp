import Link from "next/link"
import { redirect } from "next/navigation"
import { adminExists } from "@/app/actions/setup"
import { SetupForm } from "@/components/admin/setup-form"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "force-no-store"

export const metadata = {
  title: "First-time Setup | Formula 19",
  description: "Create your administrator account.",
}

export default async function SetupPage() {
  if (await adminExists()) {
    redirect("/admin/login")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-16">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[150px]" />

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <span className="font-display text-3xl uppercase tracking-wide text-foreground">
              FORMULA<span className="text-primary">19</span>
            </span>
          </Link>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            First-time Setup
          </p>
        </div>

        <div className="border border-border bg-card p-8 backdrop-blur">
          <h1 className="mb-2 font-display text-2xl uppercase text-foreground">
            Create your admin account
          </h1>
          <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
            This screen is shown once on a fresh deployment. Choose the email and
            password you&apos;ll use to manage your store.
          </p>
          <SetupForm />
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            ← Back to website
          </Link>
        </p>
      </div>
    </div>
  )
}
