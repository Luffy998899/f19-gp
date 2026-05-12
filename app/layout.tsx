import type { Metadata } from "next"
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
})

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Formula 19 — Tyres & Wheels of Distinction. Kelowna, BC.",
  description:
    "An independent atelier for premium tyres, alloy wheels, and precision installation. Serving Kelowna and the Okanagan since 2014.",
  keywords: ["tyres", "wheels", "alloy wheels", "performance", "Formula 19", "Kelowna", "BC", "tires"],
  authors: [{ name: "Formula 19" }],
  openGraph: {
    title: "Formula 19 — Tyres & Wheels of Distinction",
    description: "Premium tyres and wheels for the Okanagan.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable} bg-background`}
    >
      <body className="font-sans antialiased bg-background text-foreground overflow-x-hidden">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
