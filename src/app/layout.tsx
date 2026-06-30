import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Sidebar } from '@/components/sidebar'
import { SmoothScrollProvider } from '@/components/smooth-scroll'
import { GalaxyBackground } from '@/components/galaxy-background'

export const metadata: Metadata = {
  title: 'John Aivanne Molato | Portfolio',
  description: 'Turning imagination into functional - Full-stack Web Developer Portfolio',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <SmoothScrollProvider>
            <GalaxyBackground />
            <div className="relative z-10 flex min-h-screen">
              <Sidebar />
              <main className="relative flex-1 ml-0 md:ml-52 transition-all duration-300">
                {children}
              </main>
            </div>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
