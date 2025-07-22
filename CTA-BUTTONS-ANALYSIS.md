# 🎯 CTA 按鈕功能實作與檢查

## 📊 **CTA 按鈕總覽**

| 組件 | 按鈕 | 當前狀態 | 需要實作 |
|------|------|----------|----------|
| **HeroSection** | 🔧 20分鐘快速維修 | ✅ 滾動到聯絡區 | - |
| **HeroSection** | 📱 精選二手iPhone | ✅ 滾動到服務區 | - |
| **HeroSection** | 📞 02-2816-6666 | ✅ 電話撥打 | - |
| **ServicesSection** | 立即預約 | ❌ 無功能 | ✅ 需實作 |
| **ContactSection** | 前往導航 | ❌ 無功能 | ✅ 需實作 |
| **ContactSection** | 立即撥打 | ❌ 無功能 | ✅ 需實作 |
| **ContactSection** | 加入好友 | ✅ LINE 連結 | - |
| **ContactSection** | 發送郵件 | ❌ 無功能 | ✅ 需實作 |
| **ContactSection** | Google Maps 導航 | ❌ 無功能 | ✅ 需實作 |
| **ContactSection** | 立即撥打預約 | ✅ 電話撥打 | - |
| **ContactSection** | LINE 快速諮詢 | ✅ LINE 連結 | - |
| **FAQSection** | 直接撥打電話 | ✅ 電話撥打 | - |
| **FAQSection** | LINE 線上諮詢 | ✅ LINE 連結 | - |
| **Navbar** | 02-2816-6666 | ✅ 電話撥打 | - |
| **Navbar** | LINE 諮詢 | ✅ LINE 連結 | - |
| **PromotionsSection** | 立即享受優惠 | ❌ 無功能 | ✅ 需實作 |

---

## 🔧 **需要實作的按鈕功能**

### 1. **ServicesSection - 立即預約**
- **位置**: 每個服務卡片底部
- **功能**: 滾動到聯絡表單並預填服務類型
- **優先級**: 🥇 高

### 2. **ContactSection - 聯絡方式按鈕**
- **前往導航**: 開啟 Google Maps 導航
- **立即撥打**: 電話撥打功能
- **發送郵件**: 開啟郵件程式
- **優先級**: 🥇 高

### 3. **ContactSection - Google Maps 導航**
- **位置**: 營業時間區塊底部
- **功能**: 開啟 Google Maps 導航到店面
- **優先級**: 🥇 高

### 4. **PromotionsSection - 立即享受優惠**
- **位置**: 每個優惠卡片底部
- **功能**: 滾動到聯絡區並標注優惠類型
- **優先級**: 🥈 中

---

## 🎯 **實作計劃**

### **階段一：核心功能 (立即實作)**
1. ServicesSection 預約按鈕
2. ContactSection 聯絡按鈕
3. Google Maps 導航功能

### **階段二：增強功能 (後續優化)**
1. PromotionsSection 優惠按鈕
2. 表單預填功能
3. 轉換追蹤

---

## 🛠️ **技術實作方案**

### **Google Maps 導航**
```typescript
const openGoogleMaps = () => {
  const address = '台北市士林區文林路60號'
  const encodedAddress = encodeURIComponent(address)
  
  // 手機優先使用 Google Maps App
  if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    window.open(`https://maps.google.com/maps?q=${encodedAddress}`, '_blank')
  } else {
    // 桌面版使用 Google Maps 網頁版
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank')
  }
}
```

### **電話撥打功能**
```typescript
const makePhoneCall = () => {
  window.location.href = 'tel:+886-2-2816-6666'
}
```

### **郵件發送功能**
```typescript
const sendEmail = () => {
  const subject = encodeURIComponent('FixMaster 維修諮詢')
  const body = encodeURIComponent(`
您好，我想諮詢iPhone維修服務。

請提供以下資訊：
- 維修項目：
- 裝置型號：
- 聯絡電話：

謝謝！
  `)
  
  window.open(`mailto:fixmastertw@gmail.com?subject=${subject}&body=${body}`, '_blank')
}
```

### **表單預填功能**
```typescript
const scrollToFormWithService = (serviceName: string) => {
  // 滾動到表單
  const contactSection = document.getElementById('contact')
  if (contactSection) {
    // 滾動邏輯...
    
    // 預填服務類型 (需要添加到 ContactSection state)
    setTimeout(() => {
      const deviceSelect = document.querySelector('select[name="issue"]') as HTMLSelectElement
      if (deviceSelect && serviceName.includes('螢幕')) {
        deviceSelect.value = '螢幕破裂'
      } else if (serviceName.includes('電池')) {
        deviceSelect.value = '電池老化'
      }
      // 觸發 change 事件
      deviceSelect.dispatchEvent(new Event('change', { bubbles: true }))
    }, 1000)
  }
}
```

---

## 📈 **預期效益**

### **用戶體驗提升**
- **便利性**: 一鍵導航、撥打、郵件
- **轉換率**: 減少操作步驟提升預約率
- **專業度**: 完整的互動功能展現專業

### **商業價值**
- **預約增加**: 簡化預約流程
- **客戶滿意**: 便民功能提升體驗
- **競爭優勢**: 完整功能超越同業

---

## 🔍 **測試清單**

### **功能測試**
- [ ] ServicesSection 預約按鈕滾動
- [ ] Google Maps 導航開啟
- [ ] 電話撥打功能
- [ ] 郵件程式開啟
- [ ] 表單預填功能

### **裝置測試**
- [ ] 桌面版瀏覽器
- [ ] 手機版瀏覽器
- [ ] iOS Safari
- [ ] Android Chrome

### **用戶流程測試**
- [ ] 服務選擇 → 預約流程
- [ ] 導航 → 實際到店
- [ ] 電話 → 通話品質
- [ ] 郵件 → 收發正常

---

*建立時間：2024年3月15日*
*總計按鈕：15個*
*需實作：7個*
*完成度：53%* 