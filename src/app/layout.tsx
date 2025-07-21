import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FixMaster 維修大師 士林店 | Apple 原廠授權維修中心',
  description: 'FixMaster 維修大師 士林店，Apple IRP 認證授權維修中心，提供iPhone原廠螢幕、電池更換，90天保固，現場錄影透明維修，二手iPhone嚴選販售。位於台北市士林區文林路60號',
  keywords: 'iPhone維修, 台北維修, 士林維修, Apple授權維修, 原廠螢幕, 電池更換, 二手iPhone, 文林路, FixMaster, 手機維修, 蘋果維修, IRP認證, 透明維修, 現場錄影, 到府收送',
  authors: [{ name: 'FixMaster 維修大師' }],
  creator: 'FixMaster 維修大師',
  publisher: 'FixMaster 維修大師',
  category: 'business',
  classification: 'iPhone維修, 手機維修, 3C維修',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://fixmastertw.com'),
  alternates: {
    canonical: '/',
    languages: {
      'zh-TW': '/',
    },
  },
  openGraph: {
    title: 'FixMaster 維修大師 士林店 | Apple 原廠授權維修中心',
    description: 'FixMaster 維修大師 士林店，Apple IRP 認證授權維修中心，提供iPhone原廠螢幕、電池更換，90天保固，現場錄影透明維修',
    url: 'https://fixmastertw.com',
    siteName: 'FixMaster 維修大師 士林店',
    locale: 'zh_TW',
    type: 'website',
    countryName: 'Taiwan',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FixMaster 維修大師 士林店',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FixMaster 維修大師 士林店 | Apple 原廠授權維修中心',
    description: 'FixMaster 維修大師 士林店，Apple IRP 認證授權維修中心，提供iPhone原廠螢幕、電池更換，90天保固',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
    other: {
      'baidu-site-verification': 'your-baidu-verification-code',
    },
  },
  other: {
    'geo.region': 'TW-TPE',
    'geo.placename': '台北市士林區',
    'geo.position': '25.0955;121.5252',
    'ICBM': '25.0955, 121.5252',
    'DC.title': 'FixMaster 維修大師 士林店',
    'DC.creator': 'FixMaster 維修大師',
    'DC.subject': 'iPhone維修, 手機維修, Apple授權維修',
    'DC.description': 'Apple IRP 認證授權維修中心，提供iPhone原廠螢幕、電池更換，90天保固',
    'DC.publisher': 'FixMaster 維修大師',
    'DC.contributor': 'FixMaster 維修大師',
    'DC.date': '2024-03-15',
    'DC.type': 'Text',
    'DC.format': 'text/html',
    'DC.identifier': 'https://fixmastertw.com',
    'DC.language': 'zh-TW',
    'DC.coverage': '台北市士林區',
    'DC.rights': '© 2024 FixMaster 維修大師',
  },
}

// 結構化數據 (JSON-LD)
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://fixmastertw.com/#business",
      "name": "FixMaster 維修大師 士林店",
      "alternateName": "FixMaster",
      "description": "Apple IRP 認證授權維修中心，提供iPhone原廠螢幕、電池更換，90天保固，現場錄影透明維修",
      "url": "https://fixmastertw.com",
      "telephone": "+886-2-2816-6666",
      "email": "service@fixmastertw.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "文林路60號",
        "addressLocality": "士林區",
        "addressRegion": "台北市",
        "postalCode": "111",
        "addressCountry": "TW"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 25.0955,
        "longitude": 121.5252
      },
      "openingHours": [
        "Mo-Fr 10:00-21:00",
        "Sa 10:00-18:00",
        "Su 12:00-18:00"
      ],
      "priceRange": "$$",
      "paymentAccepted": "Cash, Credit Card, LINE Pay",
      "currenciesAccepted": "TWD",
      "hasMap": "https://maps.google.com/maps?q=台北市士林區文林路60號",
      "image": "https://fixmastertw.com/logo.png",
      "logo": "https://fixmastertw.com/logo.png",
      "sameAs": [
        "https://line.me/R/ti/p/@fixmaster"
      ]
    },
    {
      "@type": "Service",
      "@id": "https://fixmastertw.com/#services",
      "name": "iPhone 維修服務",
      "provider": {
        "@id": "https://fixmastertw.com/#business"
      },
      "serviceType": "手機維修",
      "description": "提供iPhone原廠螢幕更換、電池更換、主機板維修等專業服務",
      "areaServed": {
        "@type": "Place",
        "name": "台北市"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "iPhone 維修服務項目",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "iPhone 螢幕更換",
              "description": "Apple IRP 認證原廠螢幕更換服務"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "iPhone 電池更換",
              "description": "原廠電池更換，恢復最佳續航力"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "二手iPhone販售",
              "description": "精選二手iPhone，完整檢測報告與保固"
            }
          }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://fixmastertw.com/#website",
      "url": "https://fixmastertw.com",
      "name": "FixMaster 維修大師 士林店",
      "description": "Apple IRP 認證授權維修中心",
      "publisher": {
        "@id": "https://fixmastertw.com/#business"
      },
      "inLanguage": "zh-TW",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://fixmastertw.com/?s={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://fixmastertw.com/#organization",
      "name": "FixMaster 維修大師",
      "alternateName": "FixMaster",
      "url": "https://fixmastertw.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://fixmastertw.com/logo.png",
        "width": 200,
        "height": 200
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+886-2-2816-6666",
        "contactType": "customer service",
        "areaServed": "TW",
        "availableLanguage": "Chinese"
      },
      "sameAs": [
        "https://line.me/R/ti/p/@fixmaster"
      ]
    }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW" className="scroll-smooth">
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID', {
                page_title: document.title,
                page_location: window.location.href,
                send_page_view: true
              });
            `,
          }}
        />
        
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-XXXXXXX');
            `,
          }}
        />
        
        {/* Facebook Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', 'YOUR_PIXEL_ID');
              fbq('track', 'PageView');
            `,
          }}
        />
        
        {/* LINE Tag */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              _ltag = window._ltag || {};
              _ltag.id = 'YOUR_LINE_TAG_ID';
              _ltag.send = function(){
                _ltag.q = _ltag.q || [];
                _ltag.q.push(arguments);
              };
              (function(){
                var s = document.createElement('script');
                s.type = 'text/javascript';
                s.async = true;
                s.src = 'https://d.line-scdn.net/r/web/social-plugin/js/thirdparty/loader.min.js';
                document.getElementsByTagName('head')[0].appendChild(s);
              })();
            `,
          }}
        />
        
        {/* Web App Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* PWA Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="FixMaster" />
        <meta name="application-name" content="FixMaster" />
        <meta name="msapplication-TileColor" content="#ef4444" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#ef4444" />
        
        {/* Favicon and Touch Icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ef4444" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        
        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//connect.facebook.net" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        
        {/* Facebook Pixel (noscript) */}
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
          />
        </noscript>
        
        {children}
      </body>
    </html>
  )
} 