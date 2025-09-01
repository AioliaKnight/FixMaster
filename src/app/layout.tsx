import type { Metadata } from 'next'
import { Inter, Noto_Sans_TC } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const noto = Noto_Sans_TC({ subsets: ['latin'], weight: ['300','400','500','700','900'] })

export const metadata: Metadata = {
  title: 'FixMaster 維修大師｜士林 iPhone 維修・IRP 認證｜30 分鐘完修',
  description: '士林 iPhone 維修，Apple IRP 認證，透明錄影、Apple 認證零件、90 天保固。螢幕/電池/相機快速完修，提供到府收送與二手 iPhone 嚴選。',
  keywords: 'iPhone維修台北, 士林iPhone維修, Apple IRP, iPhone螢幕更換, iPhone電池更換, 透明維修, 快速維修, 二手 iPhone',
  authors: [{ name: 'FixMaster 維修大師' }],
  creator: 'FixMaster 維修大師',
  publisher: 'FixMaster 維修大師',
  category: 'business',
  classification: 'iPhone維修, 手機維修, 3C維修, 數位設備維修, Apple產品維修',
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
    title: 'FixMaster 維修大師｜士林 iPhone 維修・IRP 認證｜30 分鐘完修',
    description: '士林 iPhone 維修，Apple IRP 認證，透明錄影、Apple 認證零件、90 天保固。螢幕/電池/相機快速完修，提供到府收送與二手 iPhone 嚴選。',
    url: 'https://fixmastertw.com',
    siteName: 'FixMaster 維修大師 士林店',
    locale: 'zh_TW',
    type: 'website',
    countryName: 'Taiwan',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'FixMaster 維修大師 士林店',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FixMaster 維修大師｜士林 iPhone 維修・IRP 認證｜30 分鐘完修',
    description: '士林 iPhone 維修，Apple IRP 認證，透明錄影、Apple 認證零件、90 天保固。螢幕/電池/相機快速完修，提供到府收送與二手 iPhone 嚴選。',
    images: ['/og-image.svg'],
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
    'DC.subject': 'iPhone維修, 手機維修, Apple授權維修, 3C維修, 數位設備維修',
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

// 結構化數據 (JSON-LD) - 大幅優化版本
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "ElectronicsStore", "ComputerRepair"],
      "@id": "https://fixmastertw.com/#business",
      "name": "FixMaster 維修大師 士林店",
      "alternateName": ["FixMaster", "維修大師", "聯豐通信有限公司"],
      "legalName": "聯豐通信有限公司",
      "description": "士林 iPhone 維修，Apple IRP 認證，透明錄影、Apple 認證零件、90 天保固。螢幕/電池/相機快速完修，提供到府收送與二手 iPhone 嚴選。",
      "slogan": "透明・安心・效率",
      "url": "https://fixmastertw.com",
      "telephone": "+886-2-2816-6666",
      "email": "fixmastertw@gmail.com",
      "foundingDate": "2020",
      "numberOfEmployees": "5-10",
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
      "hasMap": "https://maps.google.com/maps?q=台北市士林區文林路60號",
      "image": ["https://fixmastertw.com/apple_logo.webp", "https://fixmastertw.com/Hero_1.png"],
      "logo": {
        "@type": "ImageObject",
        "url": "https://fixmastertw.com/apple_logo.webp",
        "width": 200,
        "height": 200
      },
      "brand": {
        "@type": "Brand",
        "name": "FixMaster",
        "logo": "https://fixmastertw.com/apple_logo.webp"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "150",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "張小姐" },
          "datePublished": "2025-03-12",
          "reviewBody": "現場透明維修很安心，40 分鐘完成，色彩與手感都很好。",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "陳先生" },
          "datePublished": "2025-02-20",
          "reviewBody": "電池更換後續航明顯回來，過程有檢測與說明，價格透明。",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "李小姐" },
          "datePublished": "2025-02-05",
          "reviewBody": "購買二手 iPhone 14 Pro，附檢測報告與保固，用起來很穩。",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "王先生" },
          "datePublished": "2025-01-18",
          "reviewBody": "到府收送很省時，進度都有通知，隔天就完修送回。",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "吳先生" },
          "datePublished": "2024-12-10",
          "reviewBody": "進水後立刻送修，專業清洗與檢測，最後資料也救回來。",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        }
      ],
      "areaServed": [
        { "@type": "Place", "name": "台北市" },
        { "@type": "Place", "name": "士林區" },
        { "@type": "Place", "name": "大同區" },
        { "@type": "Place", "name": "中山區" },
        { "@type": "Place", "name": "內湖區" },
        { "@type": "Place", "name": "北投區" }
      ],
      "knowsAbout": ["iPhone維修", "Apple產品維修", "手機螢幕更換", "電池更換", "主機板維修", "二手iPhone販售", "Apple IRP認證", "透明維修"]
    },
    {
      "@type": "Service",
      "@id": "https://fixmastertw.com/#screen-repair",
      "name": "iPhone 螢幕更換服務",
      "provider": { "@id": "https://fixmastertw.com/#business" },
      "serviceType": "手機螢幕維修",
      "description": "觸控靈敏、色準穩定，體驗如新。",
      "category": "Electronics Repair",
      "areaServed": { "@type": "Place", "name": "台北市" },
      "offers": {
        "@type": "Offer",
        "name": "iPhone螢幕更換",
        "description": "Apple 認證零件，90 天保固",
        "priceRange": "$2000-$8000",
        "priceCurrency": "TWD",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@type": "Service",
      "@id": "https://fixmastertw.com/#battery-repair",
      "name": "iPhone 電池更換服務",
      "provider": { "@id": "https://fixmastertw.com/#business" },
      "serviceType": "手機電池維修",
      "description": "健康度回復穩定，續航重現。",
      "category": "Electronics Repair",
      "areaServed": { "@type": "Place", "name": "台北市" },
      "offers": {
        "@type": "Offer",
        "name": "iPhone電池更換",
        "description": "Apple 認證零件，90 天保固",
        "priceRange": "$1500-$3000",
        "priceCurrency": "TWD",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@type": "Service",
      "@id": "https://fixmastertw.com/#pickup-delivery",
      "name": "到府收送服務",
      "provider": { "@id": "https://fixmastertw.com/#business" },
      "serviceType": "Pickup and Delivery",
      "description": "台北市區到府收送，方便省時。",
      "category": "Delivery Service",
      "areaServed": { "@type": "Place", "name": "台北市" }
    },
    {
      "@type": "Product",
      "@id": "https://fixmastertw.com/#used-iphone",
      "name": "二手iPhone販售",
      "description": "附完整檢測與保固，嚴選可信賴。",
      "category": "手機",
      "model": ["iPhone 11", "iPhone 12", "iPhone 13", "iPhone 14"],
      "operatingSystem": "iOS",
      "offers": {
        "@type": "AggregateOffer",
        "lowPrice": "8000",
        "highPrice": "35000",
        "priceCurrency": "TWD",
        "availability": "https://schema.org/InStock",
        "offerCount": "20",
        "warranty": {
          "@type": "WarrantyPromise",
          "durationOfWarranty": "P30D",
          "warrantyScope": "硬體功能保固"
        }
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://fixmastertw.com/#website",
      "url": "https://fixmastertw.com",
      "name": "FixMaster 維修大師 士林店",
      "alternateName": "FixMaster官網",
      "description": "士林 iPhone 維修，Apple IRP 認證，透明錄影、Apple 認證零件、90 天保固。",
      "publisher": { "@id": "https://fixmastertw.com/#business" },
      "inLanguage": "zh-TW",
      "keywords": "iPhone維修, 手機維修, Apple IRP, 士林維修, 台北維修"
    },
    {
      "@type": "Organization",
      "@id": "https://fixmastertw.com/#organization",
      "name": "FixMaster 維修大師",
      "alternateName": ["FixMaster", "維修大師"],
      "legalName": "聯豐通信有限公司",
      "url": "https://fixmastertw.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://fixmastertw.com/apple_logo.webp",
        "width": 200,
        "height": 200
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://fixmastertw.com/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "維修需要多長時間？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "一般螢幕更換約 30–60 分鐘，電池更換約 30–45 分鐘，複雜維修可能 1–2 小時。可現場等候或預約時間。"
          }
        },
        {
          "@type": "Question",
          "name": "是否使用 Apple 認證零件？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "我們為 Apple IRP 認證維修商，使用 Apple 認證零件，並提供 90 天保固。"
          }
        },
        {
          "@type": "Question",
          "name": "二手 iPhone 有保固嗎？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "二手 iPhone 提供 30 天硬體功能保固，附完整檢測報告，可現場試用確認功能。"
          }
        }
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
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);} 
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_title: document.title,
                    page_location: window.location.href,
                    send_page_view: true
                  });
                `,
              }}
            />
          </>
        )}
        
        {/* Google Tag Manager */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
              `,
            }}
          />
        )}
        
        {/* Facebook Pixel */}
        {process.env.NEXT_PUBLIC_FB_PIXEL_ID && (
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
                fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}
        
        {/* LINE Tag */}
        {process.env.NEXT_PUBLIC_LINE_TAG_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                _ltag = window._ltag || {};
                _ltag.id = '${process.env.NEXT_PUBLIC_LINE_TAG_ID}';
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
        )}
        
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
      <body className={`${inter.className} ${noto.className} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe 
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0" 
              width="0" 
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        
        {/* Facebook Pixel (noscript) */}
        {process.env.NEXT_PUBLIC_FB_PIXEL_ID && (
          <noscript>
            <img 
              height="1" 
              width="1" 
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FB_PIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript>
        )}
        
        {children}
      </body>
    </html>
  )
} 