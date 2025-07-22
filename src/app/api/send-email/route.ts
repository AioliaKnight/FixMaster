import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// 郵件發送 API
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { to, subject, html, text } = body

    // 驗證必要欄位
    if (!to || !subject || !html) {
      return NextResponse.json(
        { error: '缺少必要欄位' },
        { status: 400 }
      )
    }

    // 記錄郵件資訊到 console
    console.log('=== 📧 FixMaster 郵件發送請求 ===')
    console.log('收件者:', to)
    console.log('主旨:', subject)
    console.log('時間:', new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' }))
    console.log('================================')

    // 檢查是否有郵件配置
    const hasEmailConfig = process.env.EMAIL_USER && process.env.EMAIL_PASSWORD

    if (hasEmailConfig) {
      // 使用 nodemailer 發送郵件
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      })

      const mailOptions = {
        from: `FixMaster 維修大師 <${process.env.EMAIL_USER}>`,
        to: to,
        subject: subject,
        html: html,
        text: text
      }

      const info = await transporter.sendMail(mailOptions)
      console.log('✅ 郵件發送成功，Message ID:', info.messageId)

      return NextResponse.json({
        success: true,
        message: '郵件發送成功',
        messageId: info.messageId || 'success'
      })

    } else {
      // 開發模式：記錄到 console
      console.log('⚠️  未設定郵件配置，使用開發模式')
      console.log('內容預覽:', text.substring(0, 300) + '...')
      
      // 模擬發送延遲
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const messageId = `fixmaster-dev-${Date.now()}`
      console.log('✅ 開發模式處理完成，Message ID:', messageId)

      return NextResponse.json({
        success: true,
        message: '郵件發送成功 (開發模式)',
        messageId: messageId,
        note: '開發階段：請檢查 console 日誌查看郵件內容，或設定 EMAIL_USER 和 EMAIL_PASSWORD 環境變數'
      })
    }

  } catch (error) {
    console.error('❌ 郵件發送錯誤:', error)
    
    return NextResponse.json(
      { 
        error: '郵件發送失敗',
        details: error instanceof Error ? error.message : '未知錯誤'
      },
      { status: 500 }
    )
  }
}

// 處理不支援的 HTTP 方法
export async function GET() {
  return NextResponse.json(
    { 
      message: 'FixMaster 郵件 API',
      status: '運行中',
      methods: ['POST'],
      note: '請使用 POST 方法發送郵件'
    },
    { status: 200 }
  )
} 