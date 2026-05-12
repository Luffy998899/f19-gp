import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Formula 19 Tyres | Precision. Performance. Power.',
  description: 'Premium performance tyres and alloy wheels. Experience precision engineering, lightweight performance, and track-tested durability. All about tyres.',
  keywords: ['tyres', 'wheels', 'alloy wheels', 'performance tyres', 'premium wheels', 'Formula 19'],
  authors: [{ name: 'Formula 19 Tyres' }],
  openGraph: {
    title: 'Formula 19 Tyres | Precision. Performance. Power.',
    description: 'Premium performance tyres and alloy wheels for the ultimate driving experience.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} bg-background`}>
      <body className="font-sans antialiased bg-background text-foreground overflow-x-hidden">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
