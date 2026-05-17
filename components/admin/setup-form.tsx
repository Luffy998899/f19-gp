"use client"

import { useActionState, useState } from "react"
import Link from "next/link"
import { createFirstAdmin } from "@/app/actions/setup"

export function SetupForm() {
  const [state, formAction, pending] = useActionState(createFirstAdmin, {})
  const [pwd, setPwd] = useState("")
  const [confirm, setConfirm] = useState("")
  const mismatch = confirm.length > 0 && pwd !== confirm

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/70">
          Full name
        </label>
        <input
          name="fullName"
          type="text"
          required
          autoComplete="name"
          placeholder="Jane Doe"
          className="mt-2 w-full bg-background border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
        />
      </div>

      <div>
        <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/70">
          Admin email
        </label>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="admin@yourcompany.com"
          className="mt-2 w-full bg-background border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
        />
      </div>

      <div>
        <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/70">
          Password
        </label>
        <input
          name="password"
          type="password"
          required
          minLength={10}
          autoComplete="new-password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          placeholder="At least 10 chars, mixed case + number"
          className="mt-2 w-full bg-background border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
        />
      </div>

      <div>
        <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/70">
          Confirm password
        </label>
        <input
          name="confirmPassword"
          type="password"
          required
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Re-enter password"
          className={`mt-2 w-full bg-background border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none ${
            mismatch ? "border-destructive" : "border-border focus:border-primary"
          }`}
        />
        {mismatch && (
          <p className="mt-2 text-xs text-destructive">Passwords do not match.</p>
        )}
      </div>

      {state?.error && (
        <div className="border border-destructive bg-destructive/10 text-destructive text-sm px-4 py-3">
          {state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={pending || mismatch}
        className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.25em] px-6 py-4 hover:bg-foreground hover:text-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending ? "Creating admin..." : "Create admin account"}
      </button>

      <p className="text-center text-xs text-muted-foreground">
        Already set up?{" "}
        <Link href="/admin/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  )
}
