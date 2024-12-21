import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "VClass - Victoria University",
  description: "Victoria University Student Portal",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
