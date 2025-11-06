import './globals.css'
import type { Metadata, Viewport } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Qu?n l? t?i ch?nh c? nh?n',
  description: '?ng d?ng qu?n l? v?, danh m?c v? giao d?ch (VN).',
}

export const viewport: Viewport = {
  themeColor: '#16a34a',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body className="min-h-screen">
        <div className="container-mobile min-h-screen bg-white shadow-sm">
          {children}
        </div>
      </body>
    </html>
  )
}
