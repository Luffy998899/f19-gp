import type { Metadata } from "next"
import { Inter, Anton, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
})

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
})

export const metadata: Metadata = {
  title: "FORMULA 19 — Performance Tires & Wheels | Kelowna, BC",
  description:
    "Kelowna's premier destination for performance tires, alloy wheels, and certified installation. Built for the road, engineered for the track.",
  keywords: ["tires", "wheels", "alloy wheels", "performance", "racing", "Formula 19", "Kelowna", "BC"],
  authors: [{ name: "Formula 19" }],
  openGraph: {
    title: "FORMULA 19 — Performance Tires & Wheels",
    description: "Built for the road. Engineered for the track.",
    type: "website",
  },
}

export const viewport = {
  themeColor: "#0a0a0a",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${anton.variable} ${jetbrains.variable} bg-background`}
    >
      <body className="font-sans antialiased bg-background text-foreground overflow-x-hidden">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
