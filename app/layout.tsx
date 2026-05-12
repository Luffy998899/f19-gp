import type { Metadata } from 'next'
import { Inter, Bebas_Neue } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
})

const bebasNeue = Bebas_Neue({ 
  weight: '400',
  subsets: ["latin"],
  variable: '--font-bebas',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Formula 19 Tyres | Precision. Performance. Power.',
  description: 'Premium performance tyres and alloy wheels in Kelowna, BC. Experience precision engineering, lightweight performance, and track-tested durability. All about tyres.',
  keywords: ['tyres', 'wheels', 'alloy wheels', 'performance tyres', 'premium wheels', 'Formula 19', 'Kelowna', 'BC', 'tires'],
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
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable} bg-background`}>
      <body className="font-sans antialiased bg-background text-foreground overflow-x-hidden">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
