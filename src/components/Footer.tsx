'use client'

import { Phone, MapPin, MessageCircle, Mail, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-300 pt-12 pb-8">
      <div className="container mx-auto container-padding">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10">
          <div>
            <img src="/logo.svg" alt="FixMaster 維修大師" className="h-8 mb-4" />
            <p className="text-sm leading-6">
              我們相信，專業與誠實能讓每一次維修都更安心。<br />
              FixMaster 維修大師，陪你把日常恢復到最好。
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">聯絡資訊</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> 02-2816-6666</li>
              <li className="flex items-center gap-2"><MessageCircle className="w-4 h-4" /> @fixmaster</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> service@fixmastertw.com</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> 台北市士林區文林路60號</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">營業時間</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Clock className="w-4 h-4" /> 週一至週五 14:00 - 23:00</li>
              <li className="flex items-center gap-2"><Clock className="w-4 h-4" /> 週六與週日 15:00 - 23:00</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">快速導覽</h4>
            <ul className="space-y-2 text-sm">
              <li><a className="hover:text-white" href="#services">服務</a></li>
              <li><a className="hover:text-white" href="#testimonials">評價</a></li>
              <li><a className="hover:text-white" href="#faq">問答</a></li>
              <li><a className="hover:text-white" href="#promotions">優惠</a></li>
              <li><a className="hover:text-white" href="#contact">聯絡</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-800 mt-10 pt-6 text-xs text-neutral-500 flex flex-col md:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} FixMaster 維修大師｜聯豐通信有限公司</div>
          <div>本網站內容僅供服務說明使用</div>
        </div>
      </div>
    </footer>
  )
}


