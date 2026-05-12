import { SignUpForm } from "@/components/admin/sign-up-form"
import Link from "next/link"

export const metadata = {
  title: "Create Admin | Formula 19 Tyres",
}

export default function AdminSignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-black to-zinc-950" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/10 blur-[150px]" />

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <span className="font-heading text-3xl tracking-wide">
              <span className="text-white">FORMULA</span>
              <span className="text-red-500">19</span>
            </span>
          </Link>
          <p className="mt-2 text-sm uppercase tracking-widest text-zinc-500">
            Admin Portal
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-8 backdrop-blur-sm">
          <h1 className="mb-2 text-2xl font-bold text-white">Create account</h1>
          <p className="mb-6 text-sm text-zinc-400">
            Set up your admin account
          </p>
          <SignUpForm />
        </div>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link
            href="/admin/login"
            className="text-red-500 transition-colors hover:text-red-400"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
