import type { Metadata } from 'next'
import { Inter, Noto_Sans_TC } from 'next/font/google'
import './globals.css'
import FloatingCTA from '@/components/FloatingCTA'

const inter = Inter({ subsets: ['latin'] })
const noto = Noto_Sans_TC({ subsets: ['latin'], weight: ['300','400','500','700','900'] })

export const metadata: Metadata = {
  title: 'FixMaster 維修大師｜支援 iPhone 12–17 系列・IRP 認證｜30 分鐘完修',
  description: '士林 iPhone 維修（支援 iPhone 12–17 系列），Apple IRP 認證，透明錄影、Apple 認證零件、90 天保固。螢幕/電池/相機快速完修，提供到府收送與二手 iPhone 嚴選。',
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
    title: 'FixMaster 維修大師｜支援 iPhone 12–17 系列・IRP 認證｜30 分鐘完修',
    description: '士林 iPhone 維修（支援 iPhone 12–17 系列），Apple IRP 認證，透明錄影、Apple 認證零件、90 天保固。螢幕/電池/相機快速完修，提供到府收送與二手 iPhone 嚴選。',
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
    title: 'FixMaster 維修大師｜支援 iPhone 12–17 系列・IRP 認證｜30 分鐘完修',
    description: '士林 iPhone 維修（支援 iPhone 12–17 系列），Apple IRP 認證，透明錄影、Apple 認證零件、90 天保固。螢幕/電池/相機快速完修，提供到府收送與二手 iPhone 嚴選。',
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
    google: undefined,
    yandex: undefined,
    yahoo: undefined,
    other: {},
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
      "sameAs": [
        "https://g.page/r/CbYgK2L0-店家示意",
        "https://www.facebook.com/fixmaster.tw",
        "https://www.instagram.com/fixmaster.tw/"
      ],
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
      "openingHoursSpecification": [
        {"@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "14:00", "closes": "23:00"},
        {"@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday","Sunday"], "opens": "15:00", "closes": "23:00"}
      ],
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
        { "@type": "Place", "name": "士林" },
        { "@type": "Place", "name": "Shilin District" },
        { "@type": "Place", "name": "大同區" },
        { "@type": "Place", "name": "中山區" },
        { "@type": "Place", "name": "內湖區" },
        { "@type": "Place", "name": "北投區" }
      ],
      "serviceArea": [
        { "@type": "Place", "name": "台北市士林區" },
        { "@type": "Place", "name": "士林" },
        { "@type": "Place", "name": "Shilin District" }
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
      },
      "contactPoint": [{
        "@type": "ContactPoint",
        "telephone": "+886-2-2816-6666",
        "contactType": "customer service",
        "areaServed": "TW",
        "availableLanguage": ["zh-TW"]
      }],
      "sameAs": [
        "https://www.facebook.com/fixmaster.tw",
        "https://www.instagram.com/fixmaster.tw/"
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://fixmastertw.com/#faq",
      "mainEntity": [
        {"@type":"Question","name":"維修需要多長時間？","acceptedAnswer":{"@type":"Answer","text":"一般螢幕更換約 30–60 分鐘，電池更換約 30–45 分鐘，相機/喇叭/充電模組約 60–90 分鐘，主機板級 2–4 小時（視狀況）。可現場等候或預約。"}},
        {"@type":"Question","name":"是否使用 Apple 認證零件？","acceptedAnswer":{"@type":"Answer","text":"我們為 Apple IRP 認證維修商，使用 Apple 認證零件，並提供 90 天保固；維修完成會依流程逐項檢測功能與相容性。"}},
        {"@type":"Question","name":"更換螢幕會影響 Face ID／Touch ID 嗎？","acceptedAnswer":{"@type":"Answer","text":"不會。Face ID／Touch ID 模組獨立於螢幕，維修時會完整轉移並檢測；若原件損壞，將於檢測報告說明處理方案與風險。"}},
        {"@type":"Question","name":"手機進水怎麼辦？","acceptedAnswer":{"@type":"Answer","text":"立刻關機、勿充電與加熱，保持裝置原狀儘速送修。24 小時內處理成功率最高。我們提供主機板清洗與資料救援評估，並完整告知風險。"}},
        {"@type":"Question","name":"維修價格如何計算？是否有隱藏費用？","acceptedAnswer":{"@type":"Answer","text":"先免費檢測再報價；價格依機型與維修類型（螢幕/電池/相機/主機板）而定，現場與 LINE 皆提供明細，不維修不收費。台北市區到府收送滿 $1,500 免收送。"}},
        {"@type":"Question","name":"怎麼到 FixMaster 士林店？附近停車與交通？","acceptedAnswer":{"@type":"Answer","text":"地址：台北市士林區文林路 60 號；捷運劍潭站 1 號出口步行 3 分鐘。附近有停車場與路邊停車格；也可使用到府收送服務。"}},
        {"@type":"Question","name":"什麼是 Apple IRP 認證？對維修有什麼幫助？","acceptedAnswer":{"@type":"Answer","text":"IRP（Independent Repair Provider）為 Apple 官方授權計畫，提供認證零件、流程與檢測規範；可完成色準/True Tone/相容性檢測，品質一致。"}},
        {"@type":"Question","name":"支援哪些付款方式？是否可刷卡與行動支付？","acceptedAnswer":{"@type":"Answer","text":"支援現金、信用卡，亦可使用行動支付（以門市公告為準）。到府收送維修完成後可線上支付。"}},
        {"@type":"Question","name":"保固與人為損壞的界線如何判定？","acceptedAnswer":{"@type":"Answer","text":"保固涵蓋更換零件與施工品質造成的相同故障；摔落、進水、擠壓等人為因素或與原故障無關的新問題不在保固範圍。"}},
        {"@type":"Question","name":"維修期間是否提供備援機？","acceptedAnswer":{"@type":"Answer","text":"常規維修多於 1 小時內完修；若需留機檢測，會視庫存提供臨時備援方案（以門市公告為準）。"}},
        {"@type":"Question","name":"資料救援與主機板級維修如何評估？","acceptedAnswer":{"@type":"Answer","text":"先免費檢測評估可修復性與風險，提供報價與時程。主機板級專案需另行同意；資料救援會說明成功率與注意事項。"}},
        {"@type":"Question","name":"預約改期或取消要怎麼辦？","acceptedAnswer":{"@type":"Answer","text":"可於 LINE 或電話通知改期/取消；若有到府收送安排，請至少提前 2 小時告知以利調度。"}},
        {"@type":"Question","name":"iPad 螢幕維修需要多久時間？","acceptedAnswer":{"@type":"Answer","text":"一般 2–4 小時，依機型與損傷程度調整；因膠體面積較大與排線較多，需以專業設備流程處理避免二次損傷。"}},
        {"@type":"Question","name":"MacBook 無法開機怎麼辦？","acceptedAnswer":{"@type":"Answer","text":"可先檢查電源與充電器、嘗試 SMC/PRAM 重置與安全模式；若仍無法開機，可能為電池、SSD 或主機板異常，需專業檢測。"}}
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
                    send_page_view: false
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
        <FloatingCTA />
      </body>
    </html>
  )
} 