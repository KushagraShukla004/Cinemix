import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { TRPCReactProvider } from '@/trpc/clients/client'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cinemix',
  description:
    'A modern movie ticket booking app. Developed by Kushagra Shukla',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <TRPCReactProvider>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </TRPCReactProvider>
    </ClerkProvider>
  )
}
