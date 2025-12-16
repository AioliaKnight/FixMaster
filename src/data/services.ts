import { Smartphone, Monitor, CheckCircle, Wrench, Shield, Truck, Video, Clock, Award, Battery } from 'lucide-react'

export const services = [
  {
    icon: Monitor,
    title: 'iPhone 原廠螢幕更換',
    tagline: '觸控靈敏、色準穩定，體驗如新。',
    features: ['原廠 OLED 顯示', '觸控零延遲', '色彩準確穩定', '90 天功能保固'],
    price: '$8,900 起',
    duration: '約 30–60 分鐘',
    models: ['iPhone 12–17 系列'],
    warranty: '90 天螢幕功能保固',
  },
  {
    icon: Battery,
    title: '原廠電池更換',
    tagline: '健康度回復穩定，續航重現。',
    features: ['原廠電池芯片', '健康度回復穩定', '支援快充', '90 天電池保固'],
    price: '$2,990 起',
    duration: '約 30–45 分鐘',
    models: ['iPhone 11–17 系列'],
    warranty: '90 天電池效能保固',
  },
  {
    icon: Smartphone,
    title: '二手 iPhone 嚴選',
    tagline: '附完整檢測與保固，嚴選可信賴。',
    features: ['30 項功能檢測', '外觀等級清楚標示', '配件齊全', '30 天硬體保固'],
    price: '$8,000 起',
    duration: '現場挑選',
    models: ['iPhone 11-14 系列'],
    warranty: '30 天硬體功能保固',
  },
  {
    icon: Truck,
    title: '到府收送服務',
    tagline: '台北市區到府收送，方便省時。',
    features: ['台北市區專送', '當日收件處理', '完修後送回', '全程保險保障'],
    price: '滿 $1,500 免費',
    duration: '1-2 個工作天',
    models: ['所有 iPhone 機型'],
    warranty: '與維修項目相同',
  },
  {
    icon: Wrench,
    title: '資料救援 / 主機板級維修',
    tagline: '專案級處理，透明評估風險與成功率。',
    features: ['免費初檢與評估', '進水/摔落/短路故障處理', '資料救援評估', '施工流程與風險說明'],
    price: '檢測後報價',
    duration: '約 2–4 小時起（視狀況）',
    models: ['iPhone 11–17 系列'],
    warranty: '依項目提供保固',
  }
]

export const additionalServices = [
  {
    icon: Video,
    title: '全程錄影服務',
    description: '維修過程完整記錄，透明安心'
  },
  {
    icon: Shield,
    title: '90天安心保固',
    description: '維修品質保證，問題免費處理'
  },
  {
    icon: Clock,
    title: '1 小時內完修',
    description: '現場等候，快速完成維修'
  },
  {
    icon: Award,
    title: 'Apple IRP 認證',
    description: '官方認證技師，品質有保障'
  }
]

export const serviceSteps = [
  { title: '客戶報修', desc: '線上預約或現場接待，初步確認裝置外觀與故障狀況。', icon: Smartphone },
  { title: '專業檢測', desc: '使用 Apple 原廠診斷工具 (AST 2) 進行全機檢測，精準定位故障點。', icon: Monitor },
  { title: '報價與確認', desc: '區分保內/保外，詳細解說費用與風險。經您同意後才開始施工。', icon: CheckCircle },
  { title: '維修處理', desc: '由 IRP 認證技師在防靜電環境下施工，重要環節全程錄影存證。', icon: Wrench },
  { title: '完修複測', desc: '維修後執行全功能壓力測試與防水氣密測試，確保功能 100% 正常。', icon: Shield },
  { title: '通知取件', desc: '清潔外觀，交付更換下來的舊零件（除電池外），並提供數位保固卡。', icon: Truck },
]

