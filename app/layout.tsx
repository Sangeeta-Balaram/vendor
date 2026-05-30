import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Revieree Studios — Partner Portal',
  description: 'Build solutions, get instant quotes, and close deals faster.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className="min-h-screen overflow-x-hidden bg-bg font-sans antialiased text-gray-900"
        suppressHydrationWarning
      >
        <div className="flex min-h-screen flex-col pt-[70px] lg:pt-[100px]">
          <Navbar />

          <main className="flex-1 w-full">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  )
}
