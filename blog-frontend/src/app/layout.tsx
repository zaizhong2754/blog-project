import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import Tool from '@/components/tool/Tool'
import ThemeProvider from '@/components/theme/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className="h-screen" suppressHydrationWarning>
      <body
        className={cn(
          'relative h-full font-sans text-[#eee] antialiased',
          inter.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Tool />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}