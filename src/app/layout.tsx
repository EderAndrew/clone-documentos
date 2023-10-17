import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { Suspense } from 'react'
import { SessionProvider } from '@/providers/sessionProvider'
import Loading from './loading'

const roboto = Roboto({ 
  weight:['400','700'],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Documents',
  description: 'A simple poc website documents',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <SessionProvider>
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </SessionProvider>
      </body>
    </html>
  )
}