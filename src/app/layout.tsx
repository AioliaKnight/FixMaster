import type { Metadata, Viewport } from 'next'
import { Inter, Noto_Sans_TC } from 'next/font/google'
import './globals.css'
import { reviewsMeta } from '@/lib/reviews'
import FloatingCTA from '@/components/FloatingCTA'
import Script from 'next/script'
import MotionProvider from '@/components/Providers'

const inter = Inter({ subsets: ['latin'], display: 'swap' })
const noto = Noto_Sans_TC({ subsets: ['latin'], weight: ['300','400','500','700','900'], display: 'swap' })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#ef4444',
}

export const metadata: Metadata = {
  title: 'FixMaster 維修大師｜士林 iPhone 維修・二手 iPhone・電池更換｜IRP 認證',
  description: '士林 iPhone 維修、二手 iPhone 嚴選、電池更換服務。不維修不收費、IRP 認證、全程錄影存證、原廠零件與 90 天保固。30 分鐘完修，亦提供到府收送，北投/中山/大同皆可預約。',
  keywords: '士林iPhone維修, 士林二手iPhone, 士林電池更換, iPhone維修士林, 二手iPhone士林, iPhone電池更換士林, Apple IRP認證, iPhone維修台北, 二手機販售, 電池健康度, iPad維修, MacBook維修, 資料救援, 螢幕破裂, 泡水救援, 主機板維修, 台北iPhone維修推薦, 士林手機維修',
  authors: [{ name: 'FixMaster 維修大師' }],
  creator: 'FixMaster 維修大師',
  publisher: 'FixMaster 維修大師',
  applicationName: 'FixMaster',
  appleWebApp: {
    capable: true,
    title: 'FixMaster',
    statusBarStyle: 'default',
  },
  category: 'business',
    classification: 'iPhone維修, 二手iPhone, iPhone電池更換, Apple IRP認證維修, 士林iPhone維修',
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
    title: 'FixMaster 維修大師｜士林 iPhone 維修・二手 iPhone・電池更換｜IRP 認證',
    description: '士林 iPhone 維修、二手 iPhone 嚴選、電池更換服務。不維修不收費、IRP 認證、全程錄影存證、原廠零件與 90 天保固。30 分鐘完修，亦提供到府收送，北投/中山/大同皆可預約。',
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
    title: 'FixMaster 維修大師｜士林 iPhone 維修・二手 iPhone・電池更換｜IRP 認證',
    description: '士林 iPhone 維修、二手 iPhone 嚴選、電池更換服務。不維修不收費、IRP 認證、全程錄影存證、原廠零件與 90 天保固。30 分鐘完修，亦提供到府收送，北投/中山/大同皆可預約。',
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
    'DC.subject': 'iPhone維修, 二手iPhone, iPhone電池更換, Apple IRP認證維修, 士林iPhone維修',
    'DC.description': '士林 iPhone 維修、二手 iPhone 嚴選、電池更換服務。Apple IRP 認證，30 分鐘完修，90 天保固',
    'DC.publisher': 'FixMaster 維修大師',
    'DC.contributor': 'FixMaster 維修大師',
    'DC.date': new Date().toISOString().split('T')[0],
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
      "description": "士林 iPhone 維修、二手 iPhone 嚴選、電池更換服務。Apple IRP 認證，透明錄影、Apple 認證零件、90 天保固。30 分鐘內完修，台北市士林區專業 iPhone 維修、二手機販售、電池健康度回復。",
      "slogan": "透明・安心・效率",
      "url": "https://fixmastertw.com",
      "telephone": "+886-2-2816-6666",
      "email": "fixmastertw@gmail.com",
      "priceRange": "$$",
      "availableLanguage": ["zh-TW"],
      "sameAs": [
        reviewsMeta.googleUrl,
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
      "image": ["https://fixmastertw.com/logo.svg", "https://fixmastertw.com/Hero_1.png"],
      "logo": {
        "@type": "ImageObject",
        "url": "https://fixmastertw.com/logo.svg",
        "width": 200,
        "height": 200
      },
      "brand": {
        "@type": "Brand",
        "name": "FixMaster",
        "logo": "https://fixmastertw.com/logo.svg"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "FixMaster 維修方案",
        "itemListElement": [
          {
            "@type": "Offer",
            "name": "iPhone 螢幕更換",
            "priceRange": "$2000-$8000",
            "priceCurrency": "TWD",
            "availability": "https://schema.org/InStock",
            "areaServed": { "@type": "Place", "name": "台北市士林區" }
          },
          {
            "@type": "Offer",
            "name": "iPhone 電池更換",
            "priceRange": "$1500-$3000",
            "priceCurrency": "TWD",
            "availability": "https://schema.org/InStock",
            "areaServed": { "@type": "Place", "name": "台北市" }
          },
          {
            "@type": "Offer",
            "name": "iPad 維修服務",
            "priceRange": "$2000-$10000",
            "priceCurrency": "TWD",
            "availability": "https://schema.org/InStock",
            "areaServed": { "@type": "Place", "name": "台北市" }
          },
          {
            "@type": "Offer",
            "name": "MacBook 維修服務",
            "priceRange": "$3000-$15000",
            "priceCurrency": "TWD",
            "availability": "https://schema.org/InStock",
            "areaServed": { "@type": "Place", "name": "台北市" }
          },
          {
            "@type": "Offer",
            "name": "到府收送服務",
            "priceRange": "滿 $1500 免運",
            "priceCurrency": "TWD",
            "availability": "https://schema.org/InStock",
            "areaServed": { "@type": "Place", "name": "台北市" }
          }
        ]
      },
      "openingHoursSpecification": [
        {"@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "14:00", "closes": "23:00"},
        {"@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday","Sunday"], "opens": "15:00", "closes": "23:00"}
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": reviewsMeta.ratingValue,
        "reviewCount": reviewsMeta.reviewCount,
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "inLanguage": "zh-TW",
          "author": { "@type": "Person", "name": "張小姐" },
          "datePublished": "2025-03-12",
          "reviewBody": "現場透明維修很安心，40 分鐘完成，色彩與手感都很好。",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        },
        {
          "@type": "Review",
          "inLanguage": "zh-TW",
          "author": { "@type": "Person", "name": "陳先生" },
          "datePublished": "2025-02-20",
          "reviewBody": "電池更換後續航明顯回來，過程有檢測與說明，價格透明。",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        },
        {
          "@type": "Review",
          "inLanguage": "zh-TW",
          "author": { "@type": "Person", "name": "李小姐" },
          "datePublished": "2025-02-05",
          "reviewBody": "購買二手 iPhone 14 Pro，附檢測報告與保固，用起來很穩。",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        },
        {
          "@type": "Review",
          "inLanguage": "zh-TW",
          "author": { "@type": "Person", "name": "王先生" },
          "datePublished": "2025-01-18",
          "reviewBody": "到府收送很省時，進度都有通知，隔天就完修送回。",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        },
        {
          "@type": "Review",
          "inLanguage": "zh-TW",
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
      "knowsAbout": ["iPhone維修", "二手iPhone販售", "iPhone電池更換", "Apple IRP認證", "電池健康度回復", "二手機嚴選", "透明維修", "30分鐘完修"],
      "paymentAccepted": ["Cash", "CreditCard", "行動支付"],
      "currenciesAccepted": "TWD",
      "priceCurrency": "TWD"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://fixmastertw.com/#breadcrumbs",
      "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "首頁", "item": "https://fixmastertw.com/"}
      ]
    },
    {
      "@type": "Service",
      "@id": "https://fixmastertw.com/#iphone-repair",
      "name": "iPhone 維修服務",
      "provider": { "@id": "https://fixmastertw.com/#business" },
      "serviceType": "iPhone維修",
      "description": "士林 iPhone 專業維修，支援 iPhone 12-17 系列。Apple IRP 認證，透明錄影、原廠零件、30 分鐘完修。",
      "category": "Electronics Repair",
      "areaServed": { "@type": "Place", "name": "台北市士林區" },
      "offers": {
        "@type": "Offer",
        "name": "iPhone維修",
        "description": "Apple IRP 認證維修，90 天保固",
        "priceRange": "$1500-$8000",
        "priceCurrency": "TWD",
        "availability": "https://schema.org/InStock",
        "validFrom": "2020-01-01",
        "seller": { "@id": "https://fixmastertw.com/#business" }
      }
    },
    {
      "@type": "Service",
      "@id": "https://fixmastertw.com/#battery-repair",
      "name": "iPhone 電池更換服務",
      "provider": { "@id": "https://fixmastertw.com/#business" },
      "serviceType": "iPhone電池更換",
      "description": "士林 iPhone 電池更換，健康度回復穩定，續航重現。Apple 認證電池，90 天保固，30 分鐘內完修。",
      "category": "Electronics Repair",
      "areaServed": { "@type": "Place", "name": "台北市士林區" },
      "offers": {
        "@type": "Offer",
        "name": "iPhone電池更換",
        "description": "Apple 認證電池，健康度回復，90 天保固",
        "priceRange": "$1500-$3000",
        "priceCurrency": "TWD",
        "availability": "https://schema.org/InStock",
        "validFrom": "2020-01-01",
        "seller": { "@id": "https://fixmastertw.com/#business" }
      }
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
        "availability": "https://schema.org/InStock",
        "validFrom": "2020-01-01",
        "seller": { "@id": "https://fixmastertw.com/#business" }
      }
    },
    {
      "@type": "Service",
      "@id": "https://fixmastertw.com/#ipad-repair",
      "name": "iPad 維修服務",
      "provider": { "@id": "https://fixmastertw.com/#business" },
      "serviceType": "iPad維修",
      "description": "iPad 螢幕破裂、電池老化、充電異常專業維修。鈑金校正機身彎曲，30 天保固。",
      "category": "Electronics Repair",
      "areaServed": { "@type": "Place", "name": "台北市" }
    },
    {
      "@type": "Service",
      "@id": "https://fixmastertw.com/#macbook-repair",
      "name": "MacBook 維修服務",
      "provider": { "@id": "https://fixmastertw.com/#business" },
      "serviceType": "MacBook維修",
      "description": "MacBook 電池更換、螢幕維修、鍵盤清潔、進水救援。專業拆機清潔保養，回復效能。",
      "category": "Computer Repair",
      "areaServed": { "@type": "Place", "name": "台北市" }
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
      "@type": "Service",
      "@id": "https://fixmastertw.com/#board-repair",
      "name": "資料救援／主機板級維修",
      "provider": { "@id": "https://fixmastertw.com/#business" },
      "serviceType": "Mainboard-level Repair / Data Recovery",
      "description": "免費初檢與風險評估，進水/摔落/短路故障處理，資料救援評估與專案處理。",
      "category": "Electronics Repair",
      "areaServed": { "@type": "Place", "name": "台北市士林區" }
    },
    {
      "@type": "Product",
      "@id": "https://fixmastertw.com/#used-iphone",
      "name": "士林二手iPhone販售",
      "description": "士林二手 iPhone 嚴選，附完整 30 項功能檢測與 30 天保固，嚴選可信賴。",
      "category": "二手手機",
      "model": ["iPhone 11", "iPhone 12", "iPhone 13", "iPhone 14", "iPhone 15"],
      "operatingSystem": "iOS",
      "areaServed": { "@type": "Place", "name": "台北市士林區" },
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
      "description": "士林 iPhone 維修、二手 iPhone 嚴選、電池更換服務。Apple IRP 認證，透明錄影、Apple 認證零件、90 天保固。",
      "publisher": { "@id": "https://fixmastertw.com/#business" },
      "inLanguage": "zh-TW",
      "keywords": "士林iPhone維修, 士林二手iPhone, 士林電池更換, iPhone維修士林, 二手iPhone士林, iPhone電池更換, Apple IRP認證",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://fixmastertw.com/?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
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
        "url": "https://fixmastertw.com/logo.svg",
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
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);} 
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_title: document.title,
                  page_location: window.location.href,
                  send_page_view: false
                });
              `}
            </Script>
          </>
        )}

        {/* Google Tag Manager */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <Script id="gtm-init" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
            `}
          </Script>
        )}

        {/* Facebook Pixel */}
        {process.env.NEXT_PUBLIC_FB_PIXEL_ID && (
          <Script id="fb-pixel" strategy="lazyOnload">
            {`
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
            `}
          </Script>
        )}

        {/* LINE Tag */}
        {process.env.NEXT_PUBLIC_LINE_TAG_ID && (
          <Script id="line-tag" strategy="lazyOnload">
            {`
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
            `}
          </Script>
        )}
        
        {/* Web App Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* PWA Meta Tags - Configured in metadata export */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#ef4444" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Favicon and Touch Icons */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        {/* 若未提供其他格式，僅保留 svg 可避免 404 */}
        
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
        <link rel="preconnect" href="https://d.line-scdn.net" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//connect.facebook.net" />
        <link rel="dns-prefetch" href="//d.line-scdn.net" />
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              height="1" 
              width="1" 
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FB_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        )}
        <MotionProvider>
          {children}
        </MotionProvider>
        <FloatingCTA />
      </body>
    </html>
  )
} 
