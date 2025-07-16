# FixMaster 維修大師 - 一頁式網站

這是一個使用 Next.js 15 和 React 技術棧建立的現代化一頁式網站，專為台北士林的 iPhone 維修服務「FixMaster 維修大師」設計。

## 🎯 專案特色

- **現代化設計**：使用 Next.js 15 + React 18 + TypeScript
- **響應式佈局**：完全適配行動裝置和桌面端
- **動畫效果**：使用 Framer Motion 製作流暢的進場動畫
- **科技感配色**：科技藍灰配色搭配黃金 CTA 強調色
- **SEO 優化**：完整的 meta 標籤和結構化資料
- **繁體中文內容**：針對台灣消費者設計的在地化內容

## 📋 網站區塊

1. **Hero 區塊**：品牌標題、認證標章、主要 CTA 按鈕
2. **服務介紹**：iPhone 維修服務、二手機販售、到府收送
3. **顧客見證**：真實客戶評價與統計數據
4. **常見問答**：維修相關常見問題解答
5. **安心承諾**：IRP 認證、透明錄影、保固承諾
6. **優惠活動**：限時優惠、會員制度、即將活動
7. **聯絡我們**：預約表單、營業時間、店面資訊

## 🚀 開始使用

### 安裝依賴

```bash
npm install
```

### 開發模式

```bash
npm run dev
```

在瀏覽器中打開 [http://localhost:3000](http://localhost:3000) 查看網站。

### 建置生產版本

```bash
npm run build
npm run start
```

## 🛠️ 技術棧

- **框架**：Next.js 15 (App Router)
- **前端**：React 18 + TypeScript
- **樣式**：Tailwind CSS
- **動畫**：Framer Motion
- **圖標**：Lucide React
- **部署**：Vercel (建議)

## 📁 專案結構

```
src/
├── app/
│   ├── globals.css          # 全域樣式
│   ├── layout.tsx          # 根布局
│   └── page.tsx            # 主頁面
└── components/
    ├── HeroSection.tsx     # 首頁 Hero 區塊
    ├── ServicesSection.tsx # 服務介紹區塊
    ├── TestimonialsSection.tsx # 客戶見證區塊
    ├── FAQSection.tsx      # 常見問答區塊
    ├── TrustSection.tsx    # 安心承諾區塊
    ├── PromotionsSection.tsx # 優惠活動區塊
    └── ContactSection.tsx  # 聯絡我們區塊
```

## 🎨 設計系統

### 色彩配置

- **主色調**：科技藍灰 (techBlue)
- **強調色**：金黃色 (gold)
- **輔助色**：主藍色 (primary)
- **背景色**：漸層白到淺灰

### 字體

- **中文**：Noto Sans TC
- **英文**：Inter
- **後備**：system-ui, sans-serif

## 📱 響應式設計

- **手機**：< 768px
- **平板**：768px - 1024px
- **桌面**：> 1024px

## 🚀 部署

建議部署到 Vercel：

```bash
npm install -g vercel
vercel
```

或者使用 GitHub 連接自動部署。

## 📝 自訂設定

### 更新聯絡資訊

在 `src/components/ContactSection.tsx` 中更新：
- 店面地址
- 電話號碼
- LINE ID
- Email

### 修改優惠活動

在 `src/components/PromotionsSection.tsx` 中更新：
- 優惠內容
- 價格資訊
- 活動期限

### 調整客戶見證

在 `src/components/TestimonialsSection.tsx` 中更新：
- 客戶評價
- 服務項目
- 統計數據

## 🔧 開發註記

- 所有組件都使用 TypeScript 確保型別安全
- 使用 Tailwind CSS 的 JIT 模式提升效能
- Framer Motion 動畫優化了使用者體驗
- 完整的 SEO meta 標籤配置
- 響應式設計確保各裝置良好體驗

## 📄 授權

此專案僅供 FixMaster 維修大師使用。 