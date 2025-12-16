'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock, Shield, DollarSign, Smartphone, CheckCircle, AlertCircle, Monitor, Tablet, Wrench, Zap, Settings, HelpCircle, ArrowRight, Navigation, FileText, CreditCard, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { trackClick } from '@/lib/tracking'
import FAQCategoryNav from './FAQCategoryNav'
import Button from './ui/Button'
import SectionHeader from './ui/SectionHeader'
import { motionTimings, motionViewport } from '@/lib/motion'

const focusableSelector = 'button, a[href], textarea, input, select, [tabindex]:not([tabindex="-1"])'

export default function FAQSection() {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0)
  const [selectedFaqIndex, setSelectedFaqIndex] = useState<number | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false)
  const sheetRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const faqCategories = [
    {
      title: 'iPhone 維修專區',
      faqs: [
        {
          icon: Smartphone,
          question: 'iPhone 系列目前支援哪些維修？',
          answer: '我們支援全系列 iPhone 維修服務，項目包含：\n• 原廠螢幕更換：玻璃破裂、觸控失靈、顯示異常\n• 電池更換：健康度下降、膨脹、耗電快\n• 相機模組：鏡頭破裂、無法對焦、抖動\n• 背蓋玻璃：雷射拆屏技術，無需更換整機\n• 其他：充電孔清潔、聽筒小聲、喇叭破音等\n\niPhone 12 至 iPhone 15 系列零件庫存充足，多數項目可於當日 30–60 分鐘完修。',
          category: 'iPhone維修'
        },
        {
          icon: DollarSign,
          question: 'iPhone 換電池/螢幕的價格是多少？',
          answer: '維修價格會依據「機型」與「零件等級」而有所不同。\n\n• 電池更換：約 $990 - $2,800 起。\n• 螢幕更換：依型號與原廠/副廠選擇，價格約 $2,500 - $8,900 起。\n\n建議您透過 LINE 或電話提供機型，我們將提供最即時且精準的報價，所有報價皆含工帶料，絕無隱藏費用。',
          category: '價格查詢'
        },
        {
          icon: Settings,
          question: '維修 Face ID 或 Touch ID 會影響功能嗎？',
          answer: '生物辨識模組與主機板是唯一配對的，維修難度極高。若是周邊排線問題，我們有專業設備可修復；若涉及主機板加密晶片損壞，我們會先進行詳細檢測，並明確告知修復機率與風險，在您同意前絕不貿然施工。',
          category: 'iPhone維修'
        },
        {
          icon: Zap,
          question: '換螢幕後，顯示色彩或觸控會變差嗎？',
          answer: '我們提供「Apple 原廠零件」與「嚴選高品質零件」兩種選擇。\n\n1. Apple 原廠零件：經 Apple 系統校正，色彩、亮度與觸控靈敏度保證與出廠完全一致。\n2. 嚴選零件：經儀器嚴格測試色準與靈敏度，雖然價格較親民，但使用體驗仍有極高水準。\n\n無論哪種選擇，我們都提供 90 天功能保固。',
          category: '品質比較'
        },
        {
          icon: Shield,
          question: '更換螢幕後 True Tone (原彩顯示) 功能還在嗎？',
          answer: '會的。我們擁有專業燒錄設備（讀寫編程器），在更換螢幕時會將您原螢幕的 True Tone 序號移植到新螢幕上，確保「原彩顯示」功能正常運作。（前提是您原螢幕的感光排線功能正常）。',
          category: 'iPhone維修'
        },
        {
          icon: Wrench,
          question: '背蓋玻璃破裂一定要換整支手機嗎？',
          answer: '完全不需要！FixMaster 引進專業雷射拆屏設備，可以精準切割背蓋膠層，單獨更換 iPhone 背蓋玻璃。\n\n優點：\n• 費用僅需原廠換整新機的 1/3\n• 無需更換整個機殼總成\n• 保留原廠無線充電功能\n• 外觀恢復如新',
          category: '背蓋維修'
        },
        {
          icon: Clock,
          question: '現場維修大概需要多久？',
          answer: '我們追求效率與品質兼具：\n\n• 電池更換：約 20–30 分鐘\n• 螢幕更換：約 40–60 分鐘\n• 相機/充電孔：約 40–60 分鐘\n• 主機板維修：需留機檢測 1–3 個工作天\n\n強烈建議事先預約，我們可以先為您備料與保留技師時段，大幅減少現場等待時間。',
          category: '維修時間'
        },
        {
          icon: Shield,
          question: '你們是 Apple 原廠授權維修中心嗎？',
          answer: '是的，FixMaster 是 Apple 獨立維修中心 (IRP)，這代表：\n\n1. 我們擁有 Apple 官方認證技師\n2. 使用 Apple 原廠診斷工具進行檢測\n3. 可合法採購並使用 Apple 原廠零件\n4. 維修紀錄會同步至 Apple 官方系統\n\n您可以獲得與原廠同級的維修品質，但享有更彈性的預約與更親切的服務。',
          category: '認證資格'
        },
        {
          icon: Zap,
          question: '螢幕只是玻璃裂開，顯示跟觸控都正常，可以只換玻璃嗎？',
          answer: '可以！這稱為「螢幕翻新」技術。若您的內層顯示器 (OLED/LCD) 完好無損，我們可以協助單獨更換表層玻璃。\n\n這項技術難度較高，但費用比換整組螢幕更划算，且能保留您原本的原廠顯示面板。',
          category: '螢幕翻新'
        },
        {
          icon: AlertCircle,
          question: '手機耗電很快或突然關機，是電池壞了嗎？',
          answer: '這通常是電池老化的警訊。\n\n當電池健康度低於 80% 或循環次數超過 500 次，電壓會變得不穩定，導致耗電加快、低電量自動關機或卡頓。\n\n我們提供免費電池檢測，只需 3 分鐘即可知道您的電池狀態，若需更換也僅需 30 分鐘。',
          category: '電池問題'
        }
      ]
    },
    {
      title: '手機維修通用',
      faqs: [
        {
          icon: AlertCircle,
          question: '手機進水了，第一時間該怎麼辦？',
          answer: '黃金救援 4 步驟：\n1. 立即關機：切勿嘗試開機測試。\n2. 切勿充電：水氣導電會瞬間燒毀主機板。\n3. 移除配件：拔除保護殼、SIM 卡托，擦乾表面。\n4. 盡快送修：進行專業拆機清潔與除潮。\n\n⚠️ 千萬不要用吹風機熱風吹（會把水吹進深處）或放入米缸（無效且延誤救援），請交給專業設備處理。',
          category: '進水救援'
        },
        {
          icon: Shield,
          question: '維修時會偷看我的照片或資料嗎？',
          answer: '絕無可能。我們將「資料隱私」視為最高原則：\n\n1. 技師均簽署嚴格保密協議。\n2. 維修過程多數不需要解鎖密碼（除非需測試 Face ID 等特定功能並取得您同意）。\n3. 若您仍有疑慮，歡迎在現場全程旁觀維修過程。\n4. 我們提供全程錄影服務，保障雙方權益。',
          category: '資料隱私'
        },
        {
          icon: CheckCircle,
          question: '維修後會做哪些測試？',
          answer: '完修後，我們會依照標準 SOP 進行全功能檢測，確保交機時功能 100% 正常：\n• 顯示與觸控測試\n• 前後相機與閃光燈\n• Face ID / Touch ID\n• 通話聽筒、麥克風、喇叭\n• 充電電流與無線充電\n• Wi-Fi、藍牙、行動數據訊號',
          category: '完修測試'
        },
        {
          icon: Clock,
          question: '維修需要預約嗎？直接過去可以嗎？',
          answer: '您可以直接來店，但若遇現場客滿可能需要等候較久。我們強烈建議透過 LINE 或電話提前預約，這樣我們能：\n1. 預先確認零件庫存\n2. 為您保留專屬技師時段\n3. 讓您到場即修，節省寶貴時間',
          category: '維修流程'
        },
        {
          icon: Shield,
          question: '維修後手機還能防水嗎？',
          answer: '手機的防水功能是依賴邊框的防水膠條。拆機維修後，我們一定會為您重新補上專用的防水膠條，回復基本的防塵防潑水能力。\n\n但請注意，任何拆修過的手機，防水能力都可能不如出廠時完美（IP68 等級）。建議維修後將手機視為「生活防潑水」，避免直接沖洗或浸泡水中。',
          category: '維修風險'
        },
        {
          icon: Settings,
          question: '送修前我需要先備份資料嗎？',
          answer: '雖然更換螢幕、電池等模組化維修通常「不會」動到資料，但電子產品維修仍有極低機率的風險。\n\n為了百分之百保險起見，我們強烈建議您送修前先透過 iCloud 或電腦 iTunes 進行備份。若您無法備份，請在送修時告知，我們會更加謹慎處理。',
          category: '資料安全'
        },
        {
          icon: DollarSign,
          question: '檢測需要費用嗎？如果不修會收錢嗎？',
          answer: 'FixMaster 秉持「不維修、不收費」原則：\n\n1. 一般故障提供「免費檢測」。\n2. 技師檢測後會告知故障原因與準確報價，由您決定是否維修。\n3. 如果您決定不修，我們不會收取任何檢測費或拆機費。\n\n例外：進水清洗與特殊主機板檢測因需耗費大量工時與耗材，若需收費會先行告知。',
          category: '費用說明'
        },
        {
          icon: Zap,
          question: '手機無法充電或接觸不良，是充電孔壞了嗎？',
          answer: '不一定是壞掉喔！很多時候是因為口袋棉絮堆積在充電孔內導致接觸不良。\n\n我們會先幫您進行「免費清潔」服務，如果清潔後能正常充電，那就是賺到了！如果清潔無效，我們才會進一步檢測是否為尾插排線或主機板晶片故障。',
          category: '充電問題'
        },
        {
          icon: Smartphone,
          question: '聽筒或喇叭聲音變得很小聲，該怎麼辦？',
          answer: '這通常是因為防塵網被灰塵、化妝品或油垢堵塞了。\n\n我們提供專業的「聲學網清潔」服務，不需更換零件即可讓聲音恢復響亮。若清潔後依然無聲，則可能是聽筒模組或音頻 IC 故障，我們會再另行報價。',
          category: '聲音問題'
        },
        {
          icon: Monitor,
          question: '手機訊號很差或常常斷訊，是哪裡壞了？',
          answer: '訊號問題可能源自：\n1. SIM 卡老化或接觸不良（建議先換卡測試）\n2. 天線模組鬆脫或故障\n3. 主機板基頻晶片虛焊（常見於摔機後）\n\n我們會透過交叉測試找出問題點。若是主機板問題，我們擁有豐富的板級維修經驗可協助修復。',
          category: '訊號問題'
        }
      ]
    },
    {
      title: 'iPad / Mac 專區',
      faqs: [
        {
          icon: Tablet,
          question: 'iPad 螢幕破裂維修要多久？',
          answer: 'iPad 維修工藝較複雜，螢幕膠合面積大，拆裝需極度謹慎。\n\n一般維修時間約需 2–4 小時。為了確保膠體完全固化、防止日後螢幕翹起或入塵，我們建議您預留半天時間，或早上送件、傍晚取件。',
          category: 'iPad維修'
        },
        {
          icon: Zap,
          question: 'iPad 充電很慢或充不進去，是電池壞了嗎？',
          answer: '不一定。除了電池老化，常見原因還有：\n1. 充電孔積塵或氧化\n2. 尾插排線損壞\n3. 主機板充電 IC 故障\n\n我們會先進行交叉測試，準確找出問題點再報價維修，避免您花錢換了電池卻沒解決問題。',
          category: 'iPad維修'
        },
        {
          icon: Monitor,
          question: 'MacBook 電池顯示「建議維修」該換嗎？',
          answer: '強烈建議更換。當電池循環次數過高或健康度低於 80%，系統會提示維修。\n\n此時電池不僅續航力差，更可能有「膨脹」風險，嚴重時會擠壓觸控板或鍵盤造成永久損壞。更換電池約 1–2 小時可完成，讓您的 Mac 重獲新生。',
          category: 'Mac維修'
        },
        {
          icon: Settings,
          question: 'MacBook 運作很慢、風扇很吵，可以改善嗎？',
          answer: '這通常是內部累積灰塵導致散熱不良，系統為了保護硬體而強制降頻。\n\n我們提供專業「深度清潔保養」服務：\n• 拆機完整除塵\n• 更換高效能散熱膏\n• 風扇軸承潤滑\n\n保養後能顯著降低運作溫度，讓效能與靜音回復水準。',
          category: 'Mac維護'
        },
        {
          icon: FileText,
          question: '我想升級 MacBook 的硬碟 (SSD) 容量可以嗎？',
          answer: '這取決於您的機型年份：\n• 2017 年以前的 MacBook Air/Pro：多數可更換 SSD，升級空間大。\n• 2018 年後的機型：SSD 多焊死在主機板上，無法單獨升級。\n\n請提供您的機型年份或序號，我們會幫您查詢最適合的升級或外接方案。',
          category: 'Mac升級'
        },
        {
          icon: Tablet,
          question: 'iPad 機身彎曲可以修復嗎？',
          answer: '可以。iPad 鋁合金機身若因擠壓變形，我們有專用的「鈑金校正工具」可以協助回復平整。\n\n若彎曲過於嚴重導致中框斷裂，我們也提供更換全新機殼的服務。建議彎曲後盡快處理，以免應力導致螢幕破裂或主機板斷線。',
          category: 'iPad維修'
        },
        {
          icon: Zap,
          question: 'MacBook 進水了，還能救嗎？',
          answer: 'MacBook 進水維修的黃金時間是 24 小時內。\n\n請立即強制關機，並將電腦倒置（鍵盤朝下）防止水流入主機板深處。切勿開機測試。請盡速送修，我們會拆機進行超音波清洗與除蝕處理，成功率通常很高。',
          category: 'Mac救援'
        },
        {
          icon: Monitor,
          question: 'MacBook 螢幕鍍膜剝落（脫膜）怎麼處理？',
          answer: '這是舊款 Retina 螢幕常見問題。我們可以協助將剝落不均的舊鍍膜完全清除，讓螢幕恢復光亮透徹（雖無抗反光層，但視覺清晰度會大幅提升）。\n\n若您希望完美如新，我們也提供原廠等級的螢幕總成更換服務。',
          category: 'Mac外觀'
        },
        {
          icon: Settings,
          question: 'iPad 的 Apple Pencil 突然無法連線？',
          answer: '這可能是筆本身電池老化、藍牙模組故障，或 iPad 端的充電感應線圈問題。\n\n建議您帶著 iPad 與 Apple Pencil 一同來店，我們有交叉測試設備可以快速釐清是筆的問題還是平板的問題。',
          category: '配件維修'
        },
        {
          icon: Settings,
          question: '鍵盤按鍵卡住或沒反應（蝴蝶鍵盤）？',
          answer: 'MacBook 的蝶式鍵盤容易因入塵而卡鍵。我們可以嘗試進行單鍵拆卸清潔與修復。\n\n若清潔無效，我們也提供單獨更換鍵盤（不需換整個 C 件）的服務，費用遠低於原廠報價。',
          category: 'Mac維修'
        }
      ]
    },
    {
      title: '二手買賣與回收',
      faqs: [
        {
          icon: Smartphone,
          question: '我想買二手 iPhone，你們有保固嗎？',
          answer: '有的！FixMaster 嚴選二手 iPhone 皆經過 30 項功能檢測，並提供完整售後保障：\n\n1. 30 天硬體功能保固\n2. 電池健康度透明標示（低於 80% 會更換新品）\n3. 來源合法，杜絕拼裝機與贓機\n\n讓您用更划算的價格，買到如新機般的品質與安心。',
          category: '二手買賣'
        },
        {
          icon: DollarSign,
          question: '舊手機可以回收或折抵維修費嗎？',
          answer: '可以。我們提供高價回收二手機服務，您可以將舊手機（iPhone/iPad）帶來門市估價。\n\n估價金額可選擇：\n• 直接領取現金\n• 折抵新機購買金額\n• 折抵當次維修費用\n\n即便螢幕破裂或無法開機的機器，也可能有回收價值，歡迎詢問。',
          category: '舊機回收'
        },
        {
          icon: CheckCircle,
          question: '買二手手機會附配件嗎？',
          answer: '會的。我們的二手機標準出貨皆附贈：\n• 認證充電線\n• 認證充電頭\n• 螢幕保護貼（已代貼）\n\n部分機型若有完整原盒裝也會一併提供。讓您買回去就能直接使用，無需額外添購配件。',
          category: '二手配件'
        },
        {
          icon: Settings,
          question: '收購的二手機會怎麼處理我的資料？',
          answer: '我們會當著您的面進行「DFU 模式深度清除」，確保所有資料（照片、帳號、App）被徹底抹除且無法復原。\n\n這是比一般重置更徹底的清除方式，保障您的個資安全絕對是我們的首要任務。',
          category: '資料清除'
        },
        {
          icon: Shield,
          question: '可以幫忙資料轉移嗎？',
          answer: '當然可以！若您在我們這邊購買二手機或新機，我們提供免費的資料轉移服務（LINE 對話記錄、照片、聯絡人等）。\n\n若您是自備機器需協助轉移，我們亦有提供收費的資料轉移服務，確保資料完整無痛搬家。',
          category: '資料轉移'
        },
        {
          icon: Monitor,
          question: '有在回收故障或無法開機的手機嗎？',
          answer: '有的。即使是泡水機、摔爛機、無法開機的「屍體機」，其內部零件（如相機、外殼）仍可能有回收價值。\n\n歡迎帶過來免費估價，讓電子垃圾變現金，同時也為環保盡一份心力。',
          category: '故障機回收'
        },
        {
          icon: DollarSign,
          question: '回收價格大概是多少？',
          answer: '回收價會隨市場波動，並依據機況（外觀刮痕、電池健康度、功能正常與否）浮動。\n\n我們建議您直接加入 LINE 官方帳號，傳送手機型號與外觀照片，我們可以先提供一個「粗估價格」，實際金額以現場檢測為準，絕不惡意殺價。',
          category: '估價諮詢'
        },
        {
          icon: Smartphone,
          question: '除了 iPhone，有回收 iPad 或 Apple Watch 嗎？',
          answer: '有的。我們專精於 Apple 全系列產品回收，包含：\n• iPhone 各型號\n• iPad / iPad Pro\n• Apple Watch\n• MacBook\n• AirPods\n\n只要是 Apple 產品，我們都能為您進行專業鑑價與回收。',
          category: '回收項目'
        },
        {
          icon: Clock,
          question: '二手手機的電池健康度通常是多少？',
          answer: '我們販售的二手機，電池健康度標準皆在 85% 以上。\n\n若原機電池低於 80%，我們會先更換全新認證電池才上架販售。每支手機的標示卡上都會清楚註明目前的電池健康度，資訊絕對透明。',
          category: '品質標準'
        },
        {
          icon: Shield,
          question: '如果不滿意可以退貨嗎？',
          answer: '實體店面交易依消保法無七天鑑賞期，但我們提供更優於法規的保障：\n\n若購買後 7 天內出現「非人為硬體故障」（如觸控不良、自動關機），我們保證無條件退款或換貨，絕不讓您自行承擔硬體瑕疵風險。',
          category: '售後保障'
        }
      ]
    },
    {
      title: '服務與保固',
      faqs: [
        {
          icon: CheckCircle,
          question: '維修後的保固期是多久？',
          answer: '我們對維修品質充滿信心，提供領先業界的保固條款：\n\n• 電池/螢幕/一般模組：90 天保固\n• 主機板維修：90 天保固\n\n在保固期間內，若出現非人為因素的相同故障（如觸控不良、電池異常），我們將「免費」為您處理到好，絕不推託。',
          category: '保固服務'
        },
        {
          icon: AlertCircle,
          question: '台北市到府收送服務要運費嗎？',
          answer: '• 滿額免運：只要維修費用滿 $1,500 元，台北市全區（士林、北投、中山、大同、內湖等）皆享「免運費」到府收送。\n• 未滿額：酌收 $150–$300 元運費。\n\n我們有專屬物流人員，確保運送過程安全，完修後會再預約時間送回您手中。',
          category: '服務與物流'
        },
        {
          icon: CreditCard,
          question: '付款方式有哪些？可以刷卡嗎？',
          answer: '為了您的方便，我們支援多元支付方式：\n\n• 門市：現金、信用卡、Apple Pay、LINE Pay、街口支付。\n• 到府收送：可透過線上刷卡連結或銀行轉帳付款。\n\n所有交易皆可開立統一發票，公司行號可打統編報帳。',
          category: '付款方式'
        },
        {
          icon: HelpCircle,
          question: '人為損壞有保固嗎？',
          answer: '保固範圍主要涵蓋「零件本身的瑕疵」或「施工不良」。\n\n若是維修後因再次摔機、進水、壓傷等人為因素導致的故障，則不在免費保固範圍內。但對於老客戶，我們會提供專屬的維修折扣，減輕您的負擔。',
          category: '保固條款'
        },
        {
          icon: Smartphone,
          question: '維修期間有提供備用機嗎？',
          answer: '一般 iPhone 維修多在 30-60 分鐘內完成，現場稍坐片刻即可取件，通常無需備用機。\n\n若遇主機板維修需留機較多天，我們門市備有少量備用機（如 iPhone 8/X 等級）可供免費借用，讓您在等待期間通訊不中斷（依現場庫存為準）。',
          category: '備援裝置'
        },
        {
          icon: FileText,
          question: '我是公司行號，有提供企業維修方案嗎？',
          answer: '有的。我們歡迎企業長期簽約配合，提供專屬優惠與服務：\n• 企業專屬折扣價\n• 優先急件處理\n• 專人到府/到公司收送\n• 月結付款服務\n\n歡迎聯絡我們洽談企業合作細節。',
          category: '企業合作'
        },
        {
          icon: Clock,
          question: '營業時間外若有緊急需求怎麼辦？',
          answer: '我們的標準營業時間為每日 14:00–23:00。\n\n若您在非營業時間有緊急需求（如手機無法開機急需資料），請先在 LINE 留言並標註「急件」，我們會盡可能協調技師提早或加班處理（可能會產生急件費用）。',
          category: '緊急服務'
        },
        {
          icon: Shield,
          question: '保護貼破了，你們有幫忙貼嗎？',
          answer: '有的。凡是在 FixMaster 進行螢幕維修，我們都會「免費贈送」並代貼高品質 9H 鋼化玻璃保護貼。\n\n若無維修需求，我們現場也有販售各式保護貼（亮面、霧面、防窺）與軍規防摔殼，並提供免費代貼服務。',
          category: '周邊服務'
        },
        {
          icon: Zap,
          question: '維修後電池健康度會顯示嗎？',
          answer: '這取決於機型：\n• iPhone X - 12 系列：更換原廠或高品質電池皆可正常顯示健康度。\n• iPhone 13 (含) 以後：由於 Apple 加密限制，若未移植原廠排線，健康度可能無法顯示（但不影響使用）。\n\n我們會提供「移植排線」的選項，若您在意健康度顯示，可選擇此方案（費用稍高）。',
          category: '技術細節'
        },
        {
          icon: CheckCircle,
          question: '有在教人怎麼備份或設定手機嗎？',
          answer: '我們非常樂意協助！許多長輩或不熟悉操作的客戶常有此困擾。\n\n來店維修或購買手機時，我們的店員會手把手教您如何設定 iCloud 備份、轉移資料或調整字體大小，這些諮詢與教學都是完全免費的熱心服務。',
          category: '教學服務'
        }
      ]
    }
  ]

  const currentFaqs = faqCategories[selectedCategoryIndex]?.faqs ?? []
  const currentFaq = selectedFaqIndex !== null ? currentFaqs[selectedFaqIndex] : null

  const openFaqDetail = (target: HTMLElement, index: number) => {
    previousFocusRef.current = target
    setSelectedFaqIndex(index)
    setIsSheetOpen(true)
  }

  const closeFaqDetail = () => {
    setIsSheetOpen(false)
    setSelectedFaqIndex(null)
  }

  const goPrevFaq = () => {
    if (!currentFaqs.length || selectedFaqIndex === null) return
    const next = Math.max(0, selectedFaqIndex - 1)
    setSelectedFaqIndex(next)
  }

  const goNextFaq = () => {
    if (!currentFaqs.length || selectedFaqIndex === null) return
    const next = Math.min(currentFaqs.length - 1, selectedFaqIndex + 1)
    setSelectedFaqIndex(next)
  }

  useEffect(() => {
    if (!isSheetOpen) {
      document.body.classList.remove('no-scroll')
      previousFocusRef.current?.focus()
      return
    }

    document.body.classList.add('no-scroll')
    const getFocusables = () => {
      const node = sheetRef.current
      return node ? (Array.from(node.querySelectorAll(focusableSelector)) as HTMLElement[]) : []
    }

    const focusables = getFocusables()
    const initialFocus = closeButtonRef.current ?? focusables[0]
    initialFocus?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeFaqDetail()
        return
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goPrevFaq()
        return
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        goNextFaq()
        return
      }

      if (event.key !== 'Tab') return
      const items = getFocusables()
      if (items.length === 0) return
      const firstEl = items[0]
      const lastEl = items[items.length - 1]

      if (event.shiftKey && document.activeElement === firstEl) {
        event.preventDefault()
        lastEl.focus()
      } else if (!event.shiftKey && document.activeElement === lastEl) {
        event.preventDefault()
        firstEl.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('no-scroll')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSheetOpen])

  return (
    <section id="faq" className="section-padding relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-[-20%] top-0 h-[360px] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.10),_rgba(255,255,255,0))] blur-[60px] md:blur-[120px]"
        aria-hidden="true"
      />
      <div className="container mx-auto container-padding relative">
        <div className="max-w-6xl mx-auto">
          {/* 區塊標題 */}
          <motion.div
            className="mb-10 md:mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={motionTimings.soft}
            viewport={motionViewport}
          >
            <SectionHeader
              title="常見問答"
              description="針對維修流程、保固與服務收錄最常見的提問，一次解答。"
            />
          </motion.div>

          {/* 新分類導航 */}
          <div className="sticky top-20 z-30 mb-8 md:mb-10 -mx-4 px-4 md:mx-0 md:px-0 transform-gpu">
            <div className="relative z-10 max-w-4xl mx-auto">
              <FAQCategoryNav
                categories={faqCategories.map(c => ({
                  title: c.title,
                  count: c.faqs.length,
                  Icon: c.title.includes('iPhone') ? Smartphone
                    : c.title.includes('iPad') ? Tablet
                    : c.title.includes('Mac') ? Monitor
                    : c.title.includes('服務') ? Shield
                    : HelpCircle
                }))}
                selectedIndex={selectedCategoryIndex}
                onChange={(i) => {
                  setSelectedCategoryIndex(i)
                  setSelectedFaqIndex(null)
                }}
              />
            </div>
          </div>

          {/* 問題卡片網格 */}
          <motion.div
            id="faq-panel"
            role="tabpanel"
            aria-labelledby={`faq-tab-${selectedCategoryIndex}`}
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 min-h-[50vh]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={motionTimings.soft}
            viewport={motionViewport}
          >
            {currentFaqs.map((faq, index) => (
              <motion.button
                key={`${faq.question}-${index}`}
                type="button"
                onClick={(event) => openFaqDetail(event.currentTarget, index)}
                className="text-left glass-surface p-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neutral-900/20 focus:ring-offset-2 hover:-translate-y-1 motion-soft-enter group"
                aria-haspopup="dialog"
                aria-controls="faq-bottom-sheet"
                aria-expanded={isSheetOpen && selectedFaqIndex === index}
                initial={{ opacity: 0, scale: 0.98, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ ...motionTimings.soft, delay: index * 0.03 }}
              >
                <div className="glass-content flex flex-col gap-4 p-6 h-full bg-white/40 group-hover:bg-white/60 transition-colors">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="glass-control flex h-10 w-10 flex-shrink-0 items-center justify-center md:h-12 md:w-12 shadow-[var(--elev-2)] bg-white/80">
                      <faq.icon className="w-5 h-5 md:w-6 md:h-6 text-neutral-900" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="mb-1.5 text-[15px] md:text-base font-bold text-neutral-900 line-clamp-2 leading-tight text-balance">
                        {faq.question}
                      </h3>
                      <div className="mb-2 text-xs font-medium text-neutral-500 md:text-sm">
                        {faq.category}
                      </div>
                      <p className="text-xs text-neutral-600 md:text-sm line-clamp-2 whitespace-pre-line leading-relaxed text-pretty">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs font-medium text-neutral-500 md:text-sm mt-auto pt-2 border-t border-neutral-200/30">
                    <span>查看完整解答</span>
                    <span className="inline-flex p-1 rounded-full glass-control shadow-sm group-hover:bg-white transition-colors">
                      <ArrowRight className="h-3.5 w-3.5 text-neutral-400 group-hover:text-neutral-900 transition-colors" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Bottom Sheet */}
          {mounted && createPortal(
            <AnimatePresence>
              {isSheetOpen && currentFaq && (
                <motion.div
                  className="fixed inset-0 z-[10000] flex flex-col"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="faq-sheet-title"
                  aria-describedby="faq-sheet-description"
                >
                  <div
                    className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"
                    onClick={closeFaqDetail}
                    aria-hidden="true"
                  />

                  <motion.div
                    ref={sheetRef}
                    className="mt-auto glass-panel border border-white/40 motion-soft-enter shadow-[0_-8px_30px_rgba(0,0,0,0.12)]"
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    id="faq-bottom-sheet"
                    style={{ borderRadius: '24px 24px 0 0' }}
                  >
                    <div className="glass-content overflow-hidden pb-safe bg-white/90 backdrop-blur-xl" style={{ maxHeight: '85dvh', borderRadius: '24px 24px 0 0' }}>
                      <div className="flex justify-center pt-3 pb-1" onClick={closeFaqDetail}>
                        <div className="h-1.5 w-12 rounded-full bg-neutral-300/80" aria-hidden="true" />
                      </div>

                      <div className="flex items-start justify-between px-5 py-4 md:px-8 md:py-6 border-b border-neutral-100">
                        <div className="flex items-start gap-4 pr-4">
                          <div className="glass-control flex h-12 w-12 items-center justify-center text-neutral-900 shadow-[var(--elev-2)] bg-white">
                            <currentFaq.icon className="h-6 w-6" aria-hidden="true" />
                          </div>
                          <div>
                            <h3 id="faq-sheet-title" className="text-lg md:text-xl font-bold text-neutral-900 leading-tight text-balance">
                              {currentFaq.question}
                            </h3>
                            <div className="mt-1.5 text-sm font-medium text-neutral-500">
                              {currentFaq.category}
                            </div>
                          </div>
                        </div>
                        <button
                          ref={closeButtonRef}
                          type="button"
                          aria-label="關閉"
                          className="glass-control p-2.5 text-neutral-500 transition-colors duration-200 hover:text-neutral-900 hover:bg-white active:scale-95"
                          onClick={closeFaqDetail}
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="px-5 md:px-8 pt-6 pb-4 overscroll-contain overflow-y-auto text-neutral-800 leading-relaxed text-[15px] md:text-lg whitespace-pre-line font-medium text-pretty" style={{ maxHeight: 'calc(85dvh - 180px)' }} id="faq-sheet-description">
                        {currentFaq.answer}
                      </div>

                      <div className="px-5 md:px-8 py-5 border-t border-neutral-100 bg-white/50">
                        <div className="flex items-center justify-between gap-4 mb-4">
                          <button
                            type="button"
                            className="text-sm font-medium text-neutral-500 hover:text-neutral-900 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-neutral-100 transition-colors disabled:opacity-30"
                            onClick={goPrevFaq}
                            disabled={(selectedFaqIndex ?? 0) <= 0}
                          >
                            <ChevronLeft className="h-4 w-4" /> 上一題
                          </button>
                          <span className="text-xs font-medium text-neutral-400">
                            {selectedFaqIndex !== null ? selectedFaqIndex + 1 : 0} / {currentFaqs.length}
                          </span>
                          <button
                            type="button"
                            className="text-sm font-medium text-neutral-500 hover:text-neutral-900 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-neutral-100 transition-colors disabled:opacity-30"
                            onClick={goNextFaq}
                            disabled={(selectedFaqIndex ?? 0) >= currentFaqs.length - 1}
                          >
                            下一題 <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="glass-control px-4 py-3 text-sm font-medium text-neutral-600 mb-4 shadow-sm bg-white/60 flex items-start gap-2" aria-hidden="true">
                          <div className="mt-0.5 shrink-0 w-1.5 h-1.5 rounded-full bg-green-500" />
                          仍有疑問？歡迎直接聯繫，我們將提供更詳細的說明。
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                          <Button
                            variant="outline"
                            className="sm:w-auto motion-hover-pop font-bold text-[15px]"
                            onClick={() => {
                              trackClick('faq_sheet_contact_line')
                              window.open('https://line.me/R/ti/p/@fixmaster?utm_source=website&utm_medium=faq_sheet&utm_campaign=contact_line', '_blank')
                            }}
                          >
                            透過 LINE 詢問
                          </Button>
                          <Button
                            className="sm:w-auto motion-hover-pop font-bold shadow-lg text-[15px]"
                            onClick={() => {
                              trackClick('faq_sheet_contact_book_line')
                              window.open('https://line.me/R/ti/p/@fixmaster?utm_source=website&utm_medium=faq_sheet&utm_campaign=contact_line', '_blank')
                            }}
                          >
                            預約維修時段
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>,
            document.body
          )}

          {/* 結尾 CTA */}
          <motion.div
            className="mt-12 md:mt-16 glass-panel p-1 text-center motion-soft-enter"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={motionTimings.soft}
            viewport={motionViewport}
          >
            <div className="glass-content px-6 py-8 text-center md:px-10 md:py-12 space-y-6 bg-white/40">
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-neutral-900 md:text-3xl text-balance">
                  還有其他問題嗎？
                </h3>
                <p className="mx-auto max-w-2xl text-neutral-600 text-base font-medium text-pretty">
                  我們的專業客服團隊隨時為您解答，歡迎透過以下方式聯絡我們。
                </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
                <Button
                  className="px-8 py-4 text-[15px] font-bold motion-hover-pop w-full sm:w-auto"
                  onClick={() => trackClick('faq_tel_click', { section: 'faq' })}
                >
                  直接撥打電話
                </Button>
                <Button
                  variant="outline"
                  className="px-8 py-4 text-[15px] font-bold motion-hover-pop w-full sm:w-auto"
                  onClick={() => trackClick('faq_line_click', { section: 'faq' })}
                >
                  LINE 線上諮詢
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
