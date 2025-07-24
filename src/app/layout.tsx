import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FixMaster 維修大師 士林店 | Apple 原廠授權維修中心',
  description: 'FixMaster 維修大師 士林店，Apple IRP 認證授權維修中心，提供iPhone原廠螢幕、電池更換，90天保固，現場錄影透明維修，二手iPhone嚴選販售。位於台北市士林區文林路60號',
  keywords: 'iPhone維修台北, 士林iPhone維修, Apple授權維修中心, iPhone螢幕更換, iPhone電池更換, 原廠零件維修, IRP認證維修, 透明錄影維修, 現場維修, iPhone快速維修, 士林手機維修, 文林路手機維修, 台北蘋果維修, iPhone維修推薦, 手機螢幕破裂, iPhone電池老化, 原廠電池更換, 原廠螢幕更換, 90天保固維修, 二手iPhone販售, 中古iPhone, iPhone收購, 到府收送維修, LINE預約維修, 士林夜市附近維修, 劍潭站維修, 芝山站維修, iPhone 14維修, iPhone 13維修, iPhone 12維修, iPhone 11維修, iPhone SE維修, iPhone XR維修, 台北市維修推薦, 士林區維修店, 文林路60號, 聯豐通信, Apple IRP, 獨立維修提供商, 蘋果官方認證, 手機維修店, 3C維修, 數位維修, 科技維修, 專業維修, 品質保證維修, 價格透明維修, 快速維修服務, 當日完修, 30分鐘維修, 免費檢測, 維修報價, 手機健檢, iPhone故障排除, 水機維修, 摔機維修, 不開機維修, 充電異常維修, 相機故障維修, 聽筒故障維修, Home鍵維修, Touch ID維修, Face ID維修, 主機板維修, 台北北區維修, 大同區維修, 中山區維修, 內湖區維修, 北投區維修',
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
      "description": "Apple IRP 認證授權維修中心，提供iPhone原廠螢幕、電池更換，90天保固，現場錄影透明維修，二手iPhone嚴選販售",
      "slogan": "快速專業、價格透明、品質保證",
      "url": "https://fixmastertw.com",
      "telephone": "+886-2-2816-6666",
      "email": "service@fixmastertw.com",
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
      "openingHours": [
        "Mo-Fr 14:00-23:00",
        "Sa-Su 15:00-23:00"
      ],
      "specialOpeningHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "14:00",
          "closes": "23:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Saturday", "Sunday"],
          "opens": "15:00",
          "closes": "23:00"
        }
      ],
      "priceRange": "$$",
      "paymentAccepted": ["Cash", "Credit Card", "LINE Pay", "Apple Pay", "Google Pay"],
      "currenciesAccepted": "TWD",
      "hasMap": "https://maps.google.com/maps?q=台北市士林區文林路60號",
      "image": ["https://fixmastertw.com/logo.png", "https://fixmastertw.com/Hero_1.png"],
      "logo": {
        "@type": "ImageObject",
        "url": "https://fixmastertw.com/logo.png",
        "width": 200,
        "height": 200
      },
      "brand": {
        "@type": "Brand",
        "name": "FixMaster",
        "logo": "https://fixmastertw.com/logo.png"
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
          "author": {
            "@type": "Person",
            "name": "王小明"
          },
          "datePublished": "2024-03-10",
          "reviewBody": "非常專業的維修服務，現場錄影讓人很放心，30分鐘就修好了我的iPhone螢幕，品質很好！",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          }
        },
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "李美麗"
          },
          "datePublished": "2024-03-08",
          "reviewBody": "電池更換很快速，價格透明，師傅很專業，90天保固讓人安心。",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          }
        },
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "陳先生"
          },
          "datePublished": "2024-03-05",
          "reviewBody": "Apple IRP認證的維修中心，用的都是原廠零件，品質有保障，推薦！",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "4",
            "bestRating": "5"
          }
        }
      ],
      "sameAs": [
        "https://line.me/R/ti/p/@fixmaster"
      ],
      "areaServed": [
        {
          "@type": "Place",
          "name": "台北市"
        },
        {
          "@type": "Place",
          "name": "士林區"
        },
        {
          "@type": "Place",
          "name": "大同區"
        },
        {
          "@type": "Place",
          "name": "中山區"
        },
        {
          "@type": "Place",
          "name": "內湖區"
        },
        {
          "@type": "Place",
          "name": "北投區"
        }
      ],
      "knowsAbout": [
        "iPhone維修",
        "Apple產品維修",
        "手機螢幕更換",
        "電池更換",
        "主機板維修",
        "二手iPhone販售",
        "Apple IRP認證",
        "原廠零件",
        "透明維修"
      ],
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "name": "Apple IRP (Independent Repair Provider) 認證",
        "credentialCategory": "Apple授權維修認證"
      }
    },
    {
      "@type": "Service",
      "@id": "https://fixmastertw.com/#screen-repair",
      "name": "iPhone 螢幕更換服務",
      "provider": {
        "@id": "https://fixmastertw.com/#business"
      },
      "serviceType": "手機螢幕維修",
      "description": "Apple IRP 認證原廠螢幕更換服務，30分鐘快速完修，90天保固",
      "category": "Electronics Repair",
      "areaServed": {
        "@type": "Place",
        "name": "台北市"
      },
      "availableChannel": {
        "@type": "ServiceChannel",
        "name": "現場維修",
        "serviceLocation": {
          "@id": "https://fixmastertw.com/#business"
        }
      },
      "hoursAvailable": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "14:00",
          "closes": "23:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Saturday", "Sunday"],
          "opens": "15:00",
          "closes": "23:00"
        }
      ],
      "offers": {
        "@type": "Offer",
        "name": "iPhone螢幕更換優惠",
        "description": "原廠品質螢幕更換，90天保固",
        "priceRange": "$2000-$8000",
        "priceCurrency": "TWD",
        "availability": "https://schema.org/InStock",
        "validFrom": "2024-01-01",
        "validThrough": "2024-12-31",
        "warranty": {
          "@type": "WarrantyPromise",
          "durationOfWarranty": "P90D",
          "warrantyScope": "螢幕功能保固"
        }
      }
    },
    {
      "@type": "Service",
      "@id": "https://fixmastertw.com/#battery-repair",
      "name": "iPhone 電池更換服務",
      "provider": {
        "@id": "https://fixmastertw.com/#business"
      },
      "serviceType": "手機電池維修",
      "description": "原廠電池更換，恢復最佳續航力，快速完修",
      "category": "Electronics Repair",
      "areaServed": {
        "@type": "Place",
        "name": "台北市"
      },
      "offers": {
        "@type": "Offer",
        "name": "iPhone電池更換優惠",
        "description": "原廠電池更換，90天保固",
        "priceRange": "$1500-$3000",
        "priceCurrency": "TWD",
        "availability": "https://schema.org/InStock",
        "validFrom": "2024-01-01",
        "validThrough": "2024-12-31",
        "warranty": {
          "@type": "WarrantyPromise",
          "durationOfWarranty": "P90D",
          "warrantyScope": "電池功能保固"
        }
      }
    },
    {
      "@type": "Product",
      "@id": "https://fixmastertw.com/#used-iphone",
      "name": "二手iPhone販售",
      "description": "精選二手iPhone，完整檢測報告與保固，品質保證",
      "category": "手機",
      "brand": {
        "@type": "Brand",
        "name": "Apple"
      },
      "manufacturer": {
        "@type": "Organization",
        "name": "Apple Inc."
      },
      "seller": {
        "@id": "https://fixmastertw.com/#business"
      },
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
      },
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "檢測報告",
          "value": "完整功能檢測"
        },
        {
          "@type": "PropertyValue",
          "name": "配件",
          "value": "充電器、保護殼"
        }
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://fixmastertw.com/#website",
      "url": "https://fixmastertw.com",
      "name": "FixMaster 維修大師 士林店",
      "alternateName": "FixMaster官網",
      "description": "Apple IRP 認證授權維修中心，專業iPhone維修服務",
      "publisher": {
        "@id": "https://fixmastertw.com/#business"
      },
      "inLanguage": "zh-TW",
      "about": {
        "@type": "Thing",
        "name": "iPhone維修服務"
      },
      "keywords": "iPhone維修, 手機維修, Apple授權維修, 士林維修, 台北維修",
      "potentialAction": [
        {
          "@type": "SearchAction",
          "target": "https://fixmastertw.com/?s={search_term_string}",
          "query-input": "required name=search_term_string"
        },
        {
          "@type": "ReserveAction",
          "target": "https://line.me/R/ti/p/@fixmaster",
          "result": {
            "@type": "Reservation",
            "name": "維修預約"
          }
        }
      ]
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
        "url": "https://fixmastertw.com/logo.png",
        "width": 200,
        "height": 200
      },
      "foundingDate": "2020",
      "foundingLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "台北市",
          "addressCountry": "TW"
        }
      },
      "numberOfEmployees": "5-10",
      "industry": "電子產品維修",
      "knowsAbout": [
        "iPhone維修",
        "Apple產品維修",
        "手機維修",
        "3C維修",
        "電子產品維修"
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+886-2-2816-6666",
          "contactType": "customer service",
          "areaServed": "TW",
          "availableLanguage": ["Chinese", "Mandarin"],
          "hoursAvailable": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "14:00",
              "closes": "23:00"
            },
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Saturday", "Sunday"],
              "opens": "15:00",
              "closes": "23:00"
            }
          ]
        },
        {
          "@type": "ContactPoint",
          "contactType": "customer support",
          "url": "https://line.me/R/ti/p/@fixmaster",
          "availableLanguage": "Chinese"
        }
      ],
      "sameAs": [
        "https://line.me/R/ti/p/@fixmaster"
      ],
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "name": "Apple IRP (Independent Repair Provider) 認證",
        "credentialCategory": "Apple授權維修認證",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Apple Inc."
        }
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
            "text": "一般螢幕更換約30分鐘，電池更換約20分鐘，複雜維修可能需要1-2小時。我們提供現場等候服務。"
          }
        },
        {
          "@type": "Question",
          "name": "如何確認使用原廠零件？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "我們是Apple IRP認證維修中心，使用原廠或Apple認證零件，每個零件都有序號可供驗證，並提供90天保固。"
          }
        },
        {
          "@type": "Question",
          "name": "維修後有什麼保固？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "我們提供90天維修保固，保固期內如有相同問題可免費重修。保固不包含人為損壞或其他新故障。"
          }
        },
        {
          "@type": "Question",
          "name": "二手iPhone有保固嗎？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "是的，我們的二手iPhone提供30天硬體功能保固，並附完整檢測報告。每支手機都經過專業檢測。"
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://fixmastertw.com/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "首頁",
          "item": "https://fixmastertw.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "iPhone維修服務",
          "item": "https://fixmastertw.com#services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "聯絡我們",
          "item": "https://fixmastertw.com#contact"
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