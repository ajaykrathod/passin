import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { TrpcProvider } from '$/lib/trpcProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pass',
  description: 'Check Password Strength',
}

function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TrpcProvider>
          {children}
        </TrpcProvider>
      </body>
    </html>
  )
}

export default RootLayout
