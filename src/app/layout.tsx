import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FixMaster 維修大師 士林店 | Apple 原廠授權維修中心',
  description: 'FixMaster 維修大師 士林店，Apple IRP 認證授權維修中心，提供iPhone原廠螢幕、電池更換，90天保固，現場錄影透明維修，二手iPhone嚴選販售。位於台北市士林區文林路60號',
  keywords: 'iPhone維修, 台北維修, 士林維修, Apple授權維修, 原廠螢幕, 電池更換, 二手iPhone, 文林路, FixMaster',
  authors: [{ name: 'FixMaster 維修大師' }],
  creator: 'FixMaster 維修大師',
  publisher: 'FixMaster 維修大師',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://fixmaster.com.tw'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'FixMaster 維修大師 士林店 | Apple 原廠授權維修中心',
    description: 'FixMaster 維修大師 士林店，Apple IRP 認證授權維修中心，提供iPhone原廠螢幕、電池更換，90天保固',
    url: 'https://fixmaster.com.tw',
    siteName: 'FixMaster 維修大師 士林店',
    locale: 'zh_TW',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FixMaster 維修大師 士林店 | Apple 原廠授權維修中心',
    description: 'FixMaster 維修大師 士林店，Apple IRP 認證授權維修中心，提供iPhone原廠螢幕、電池更換，90天保固',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
} 