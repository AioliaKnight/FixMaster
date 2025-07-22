# FixMaster 組件架構分析報告

## 🏗️ 組件架構總覽

FixMaster 採用 **模組化組件架構**，每個組件負責特定的業務功能，通過清晰的接口和統一的設計模式實現高內聚、低耦合的架構設計。

### 📊 組件層次結構

```
App (src/app/page.tsx)
├── 🧭 Navbar (全域導航)
└── 📄 Main Content
    ├── 🏠 HeroSection (首頁主視覺)
    ├── 🛠️ ServicesSection (服務項目)
    ├── 💬 TestimonialsSection (顧客評價)
    ├── ❓ FAQSection (常見問答)
    ├── 🛡️ TrustSection (安心承諾)
    ├── 🎁 PromotionsSection (優惠活動)
    └── 📞 ContactSection (聯絡我們)
```

## 🔍 組件詳細分析

### 1. 🧭 **Navbar 組件** (`Navbar.tsx`)

**核心職責**: 全域導航、錨點滾動、響應式選單

#### 🎯 狀態管理
```typescript
const [isMenuOpen, setIsMenuOpen] = useState(false)      // 行動版選單狀態
const [isScrolled, setIsScrolled] = useState(false)      // 滾動狀態檢測
const [activeSection, setActiveSection] = useState('home') // 當前活動區塊
```

#### ⚙️ 核心功能
- **智能區塊檢測**: 監聽滾動事件，自動檢測當前可視區塊
- **防抖優化**: 100ms 延遲避免頻繁計算
- **精準滾動**: 計算導航欄高度偏移，確保正確定位
- **響應式選單**: 桌面水平導航 + 行動版漢堡選單
- **滾動鎖定**: 行動版選單展開時防止背景滾動

#### 🎨 設計特色
- **動態高亮**: 使用 `layoutId="activeIndicator"` 實現流暢的指示器動畫
- **毛玻璃效果**: `backdrop-blur-sm` 實現半透明背景
- **漸進式動畫**: Logo、導航項目、CTA 按鈕依序出現

#### 🔗 外部依賴
- **Framer Motion**: 動畫效果
- **Lucide React**: 圖標 (Menu, X, Phone, MessageCircle)

---

### 2. 🏠 **HeroSection 組件** (`HeroSection.tsx`)

**核心職責**: 品牌展示、主要 CTA、首屏印象

#### 🎯 狀態管理
- **無狀態組件**: 純展示型組件，無內部狀態

#### ⚙️ 核心功能
- **品牌展示**: FixMaster 品牌標題 + Apple IRP 認證標章
- **CTA 按鈕**: 智能滾動到對應區塊 (聯絡我們、服務項目)
- **聯絡資訊**: 電話號碼 + 地址展示

#### 🎨 設計特色
- **深色背景**: `bg-neutral-900` 營造專業感
- **漸層動畫**: 標題、副標題、CTA 依序淡入
- **響應式字體**: 從 `text-4xl` 到 `lg:text-7xl` 適配各尺寸

---

### 3. 🛠️ **ServicesSection 組件** (`ServicesSection.tsx`)

**核心職責**: 服務展示、輪播功能、互動體驗

#### 🎯 狀態管理
```typescript
const [currentSlide, setCurrentSlide] = useState(0)       // 當前幻燈片
const [isAutoPlaying, setIsAutoPlaying] = useState(true)  // 自動播放狀態
const [touchStart, setTouchStart] = useState(0)           // 觸控起始位置
const [touchEnd, setTouchEnd] = useState(0)               // 觸控結束位置
```

#### ⚙️ 核心功能
- **輪播系統**: 4個服務項目的循環展示
- **自動播放**: 5秒間隔自動切換 (可控制)
- **觸控手勢**: 左右滑動切換幻燈片
- **響應式控制**: 桌面顯示箭頭 + 指示器

#### 🎨 設計特色
- **服務卡片**: 扁平化設計 + 彩色背景裝飾
- **特色標籤**: "最受歡迎"、"熱門推薦" 等標識
- **步驟指南**: 3步驟維修流程說明

#### 📊 數據結構
```typescript
const services = [
  {
    icon: Monitor,
    title: 'iPhone 原廠螢幕更換',
    description: 'Apple IRP 認證原廠螢幕...',
    features: ['原廠 OLED 螢幕', '觸控完美運作', ...],
    price: '依機型而定',
    highlight: '最受歡迎',
    color: 'from-blue-500 to-blue-600'
  },
  // ... 其他服務
]
```

---

### 4. 💬 **TestimonialsSection 組件** (`TestimonialsSection.tsx`)

**核心職責**: 社會證明、客戶評價、信任建立

#### 🎯 狀態管理
```typescript
const [currentSlide, setCurrentSlide] = useState(0)       // 當前幻燈片
const [isAutoPlaying, setIsAutoPlaying] = useState(true)  // 自動播放狀態
const [touchStart, setTouchStart] = useState(0)           // 觸控起始位置
const [touchEnd, setTouchEnd] = useState(0)               // 觸控結束位置
const [slidesPerView, setSlidesPerView] = useState(1)     // 響應式顯示數量
```

#### ⚙️ 核心功能
- **響應式輪播**: 手機1個、平板2個、桌面3個評價並排
- **智能指示器**: 根據內容數量和顯示數量動態計算頁數
- **自動播放**: 4秒間隔，支援無限循環
- **觸控支援**: 左右滑動導航

#### 🎨 設計特色
- **統計數據**: 1,200+ 客戶、4.9 評分等關鍵指標
- **評價卡片**: 包含頭像、姓名、評分、服務項目、位置
- **星級評分**: 動態星星顯示系統

#### 📊 數據結構
```typescript
const testimonials = [
  {
    name: '陳小姐',
    rating: 5,
    comment: '螢幕摔破了很緊張，但 FixMaster 的師傅很專業...',
    service: 'iPhone 12 螢幕更換',
    location: '士林區',
    date: '2024年3月',
    highlight: '快速專業',
    avatar: '👩‍💼'
  },
  // ... 其他評價
]
```

#### 🧮 複雜邏輯
```typescript
// 智能指示器計算
const indicatorCount = useMemo(() => {
  if (testimonials.length <= slidesPerView) {
    return 1 // 防呆機制
  }
  return Math.max(1, Math.ceil(testimonials.length / slidesPerView))
}, [testimonials.length, slidesPerView])
```

---

### 5. ❓ **FAQSection 組件** (`FAQSection.tsx`)

**核心職責**: 問題解答、手風琴展開、用戶教育

#### 🎯 狀態管理
```typescript
const [openItems, setOpenItems] = useState<number[]>([])  // 展開項目數組
```

#### ⚙️ 核心功能
- **手風琴效果**: 可同時展開多個問題
- **智能切換**: 點擊展開/收合邏輯
- **快速問答**: 4個常見問題的簡化版本
- **CTA 整合**: 直接連結到電話和 LINE 諮詢

#### 🎨 設計特色
- **圖標分類**: 每個問題配有相關圖標 (Clock, Shield, etc.)
- **分類標籤**: 維修時間、零件品質、保固服務等
- **動畫過渡**: ChevronDown/Up 圖標旋轉效果

#### 📊 數據結構
```typescript
const faqs = [
  {
    icon: Clock,
    question: '維修時間需要多長？',
    answer: '大部分維修項目我們都能在 30 分鐘內完成...',
    category: '維修時間'
  },
  // ... 其他問題
]
```

---

### 6. 🛡️ **TrustSection 組件** (`TrustSection.tsx`)

**核心職責**: 信任建立、認證展示、權威證明

#### 🎯 狀態管理
- **無狀態組件**: 純展示型組件

#### ⚙️ 核心功能
- **承諾展示**: 4大核心承諾 (IRP認證、全程錄影、透明價目、檢測報告)
- **認證驗證**: Apple 官方驗證頁面連結
- **統計數據**: 5000+ 案例、99.8% 滿意度等
- **外部連結**: 安全的 `target="_blank" rel="noopener noreferrer"`

#### 🎨 設計特色
- **深色背景**: `bg-neutral-900` 與白色卡片形成對比
- **認證區塊**: 特殊的 Apple 驗證區塊設計
- **統計展示**: 4個關鍵數據的視覺化呈現

#### 📊 數據結構
```typescript
const promises = [
  {
    icon: Award,
    title: '原廠 IRP 認證技師',
    description: '通過 Apple 官方認證的獨立維修商資格',
    details: ['官方認證技師執照', '定期技術培訓更新', ...],
    badge: 'Apple 認證',
    color: 'from-blue-500 to-blue-600'
  },
  // ... 其他承諾
]
```

---

### 7. 🎁 **PromotionsSection 組件** (`PromotionsSection.tsx`)

**核心職責**: 優惠展示、促銷活動、會員制度

#### 🎯 狀態管理
- **無狀態組件**: 純展示型組件

#### ⚙️ 核心功能
- **主要優惠**: 3個核心優惠方案
- **限時優惠**: 9折價格優惠 (相對 Apple 官方價格)
- **會員制度**: 銅牌、銀牌、金牌三級制度

#### 🎨 設計特色
- **彩色標籤**: 不同優惠使用不同色彩主題
- **倒數計時**: 剩餘時間顯示 (視覺效果)
- **價格對比**: 原價 vs 優惠價的清晰對比

#### 📊 數據結構
```typescript
const flashDeals = [
  {
    title: 'iPhone 14 Pro 螢幕更換',
    originalPrice: 'Apple官方 $5,490',
    salePrice: '$4,941',
    discount: '9折優惠',
    timeLeft: '48小時',
    icon: '📱'
  },
  // ... 其他限時優惠
]
```

---

### 8. 📞 **ContactSection 組件** (`ContactSection.tsx`)

**核心職責**: 聯絡資訊、預約表單、地圖整合

#### 🎯 狀態管理
```typescript
const [formData, setFormData] = useState({
  name: '',
  phone: '',
  device: '',
  issue: '',
  preferredTime: '',
  message: ''
})
```

#### ⚙️ 核心功能
- **多重聯絡方式**: 地址、電話、LINE、Email
- **預約表單**: 完整的維修預約資訊收集
- **表單驗證**: 必填欄位驗證
- **營業時間**: 動態營業時間顯示

#### 🎨 設計特色
- **深色背景**: 與 TrustSection 呼應的暗色調
- **表單設計**: 扁平化輸入框 + 下拉選單
- **服務特色**: 4個核心服務特色展示

#### 📊 數據結構
```typescript
const contactInfo = [
  {
    icon: MapPin,
    title: '店面地址',
    content: '台北市士林區文林路60號',
    subContent: '捷運劍潭站1號出口步行3分鐘',
    action: '前往導航',
    actionType: 'navigation'
  },
  // ... 其他聯絡方式
]
```

## 🔄 組件間通信架構

### 📡 通信模式

#### 1. **錨點導航系統**
```typescript
// Navbar → 其他組件
handleNavClick('#services') → document.getElementById('services')
```

#### 2. **滾動事件監聽**
```typescript
// Navbar 監聽全域滾動
window.addEventListener('scroll', handleScroll)
```

#### 3. **表單提交處理**
```typescript
// ContactSection 內部處理
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  console.log('Form submitted:', formData)
}
```

### 🎯 狀態管理模式

#### **本地狀態管理**
- ✅ 每個組件管理自己的內部狀態
- ✅ 使用 `useState` 處理簡單狀態
- ✅ 使用 `useEffect` 處理副作用
- ✅ 使用 `useCallback` 優化回調函數
- ✅ 使用 `useMemo` 優化計算結果

#### **無全域狀態管理**
- 🔄 組件間通過 DOM 操作通信 (錨點滾動)
- 🔄 無需 Redux/Zustand 等狀態管理庫
- 🔄 適合靜態展示型網站的架構

## 🎨 設計系統架構

### 🎭 動畫系統

#### **Framer Motion 模式**
```typescript
// 統一的入場動畫模式
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
  viewport={{ once: true }}
>
```

#### **動畫類型**
- **淡入動畫**: `opacity: 0 → 1`
- **滑入動畫**: `y: 30 → 0`
- **延遲動畫**: `delay: index * 0.1`
- **佈局動畫**: `layoutId` 用於指示器

### 🎯 響應式設計模式

#### **斷點系統**
```typescript
// Tailwind CSS 斷點
sm: 640px   // 手機橫屏
md: 768px   // 平板
lg: 1024px  // 桌面
xl: 1280px  // 大桌面
```

#### **響應式邏輯**
```typescript
// 動態計算顯示數量
useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      setSlidesPerView(3)      // 桌面: 3個
    } else if (window.innerWidth >= 768) {
      setSlidesPerView(2)      // 平板: 2個
    } else {
      setSlidesPerView(1)      // 手機: 1個
    }
  }
}, [])
```

## 🔧 技術架構模式

### 🏗️ 組件設計原則

#### **1. 單一職責原則**
- ✅ 每個組件專注於單一業務功能
- ✅ Navbar 專責導航，ContactSection 專責聯絡

#### **2. 開放封閉原則**
- ✅ 組件對擴展開放，對修改封閉
- ✅ 通過 props 和配置對象實現靈活性

#### **3. 依賴倒置原則**
- ✅ 組件依賴抽象 (React Hooks)，不依賴具體實現
- ✅ 通過 TypeScript 接口定義數據結構

### 🎯 性能優化模式

#### **1. 防抖優化**
```typescript
// Navbar 滾動事件防抖
timeoutId = setTimeout(() => {
  // 滾動處理邏輯
}, 100)
```

#### **2. 記憶化優化**
```typescript
// TestimonialsSection 指示器計算
const indicatorCount = useMemo(() => {
  return Math.ceil(testimonials.length / slidesPerView)
}, [testimonials.length, slidesPerView])
```

#### **3. 回調優化**
```typescript
// ServicesSection 滑動回調
const nextSlide = useCallback(() => {
  setCurrentSlide((prev) => (prev + 1) % services.length)
}, [services.length])
```

## 📊 數據流架構

### 🔄 數據流向

```
用戶操作 → 組件狀態更新 → UI 重新渲染 → 動畫效果
   ↓
DOM 操作 (滾動/導航) → 其他組件響應
```

### 📋 數據類型定義

#### **聯絡表單數據**
```typescript
interface FormData {
  name: string
  phone: string
  device: string
  issue: string
  preferredTime: string
  message: string
}
```

#### **服務項目數據**
```typescript
interface Service {
  icon: React.ComponentType
  title: string
  description: string
  features: string[]
  price: string
  highlight: string
  color: string
}
```

#### **客戶評價數據**
```typescript
interface Testimonial {
  name: string
  rating: number
  comment: string
  service: string
  location: string
  date: string
  highlight: string
  avatar: string
}
```

## 🚀 擴展性架構

### 📈 可擴展性設計

#### **1. 組件可複用性**
- ✅ 輪播邏輯可抽取為自定義 Hook
- ✅ 表單邏輯可抽取為通用組件
- ✅ 動畫模式可標準化為設計系統

#### **2. 數據結構靈活性**
- ✅ 使用配置對象而非硬編碼
- ✅ 支援動態添加服務項目、評價、FAQ
- ✅ 易於國際化 (i18n) 擴展

#### **3. 功能模組化**
- ✅ 每個組件可獨立開發和測試
- ✅ 支援組件懶加載優化
- ✅ 易於添加新的業務區塊

### 🔮 未來擴展方向

#### **1. 狀態管理升級**
- 🔄 引入 Context API 處理全域狀態
- 🔄 使用 React Query 處理服務端狀態
- 🔄 實現購物車、用戶登入等功能

#### **2. 互動功能增強**
- 🔄 實時聊天功能 (WebSocket)
- 🔄 線上支付整合
- 🔄 預約系統後端整合

#### **3. 性能優化進階**
- 🔄 組件懶加載 (React.lazy)
- 🔄 圖片懶加載優化
- 🔄 Service Worker 實現 PWA

## 🎯 架構優勢總結

### ✅ **設計優勢**

1. **清晰的職責分離**: 每個組件專注單一功能
2. **統一的設計模式**: 一致的狀態管理和動畫模式
3. **響應式友好**: 完整的多設備適配
4. **性能優化**: 防抖、記憶化、回調優化
5. **可維護性高**: TypeScript 類型安全 + 清晰的代碼結構

### 🚀 **技術優勢**

1. **現代化技術棧**: React 18 + TypeScript + Next.js 15
2. **優秀的用戶體驗**: 流暢動畫 + 觸控支援
3. **SEO 友好**: SSR + 結構化數據
4. **開發效率**: 模組化組件 + 統一設計系統
5. **擴展性強**: 易於添加新功能和業務邏輯

這個組件架構為 FixMaster 提供了穩定、高效、可維護的前端解決方案，完全滿足當前業務需求並支持未來的功能擴展。 