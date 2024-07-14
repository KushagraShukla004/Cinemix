import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

//Auth provider
import { ClerkProvider } from '@clerk/nextjs'
import { TRPCReactProvider } from '@/trpc/clients/client'

//Components
import { Toaster } from '@/components/molecules/Toaster/toaster'
import { Container } from '@/components/atoms/container'
import { Navbar } from '@/components/organisms/Navbar'
import { ThemeProvider } from '@/util/styles/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cinemix',
  description: 'A modern movie ticket booking app | Kushagra Shukla',
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
          <body className={inter.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              <Container>{children}</Container>
              <Toaster />
            </ThemeProvider>
          </body>
        </html>
      </TRPCReactProvider>
    </ClerkProvider>
  )
}
