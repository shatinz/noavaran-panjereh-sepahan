import nodemailer from 'nodemailer';
import settingsData from '@/data/settings.json';

export interface EmailPayload {
  name: string;
  phone: string;
  projectType: string;
  message?: string;
  createdAt: string;
}

export async function sendConsultationEmail(data: EmailPayload): Promise<{ success: boolean; message: string }> {
  const companyEmail = process.env.COMPANY_NOTIFICATION_EMAIL || settingsData.email || 'info@noavaranpanjereh.ir';
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);

  const subject = `🔔 درخواست مشاوره و پیش‌فاکتور جدید: ${data.name} (${data.projectType})`;

  const htmlContent = `
    <!DOCTYPE html>
    <html dir="rtl" lang="fa">
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Tahoma, Arial, sans-serif; background-color: #0a0002; color: #fefefe; padding: 20px; direction: rtl; text-align: right; }
        .card { background-color: #140104; border: 1px solid #330009; border-radius: 16px; padding: 24px; max-width: 600px; margin: 0 auto; box-shadow: 0 4px 20px rgba(0,0,0,0.5); }
        .header { border-bottom: 2px solid #ab0017; padding-bottom: 16px; margin-bottom: 20px; text-align: center; }
        .title { color: #ffffff; font-size: 20px; font-weight: bold; margin: 0; }
        .subtitle { color: #ab0017; font-size: 13px; margin-top: 6px; }
        .field { margin-bottom: 14px; padding: 10px; background-color: #1e0004; border-radius: 8px; border-right: 4px solid #ab0017; }
        .label { font-size: 11px; color: #b0b0b0; display: block; margin-bottom: 4px; }
        .value { font-size: 14px; color: #ffffff; font-weight: bold; }
        .phone { direction: ltr; text-align: right; font-family: monospace; font-size: 16px; color: #d1001c; }
        .footer { text-align: center; font-size: 11px; color: #969696; margin-top: 24px; border-top: 1px solid #330009; padding-top: 12px; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1 class="title">درخواست مشاوره مهندسی و استعلام قیمت</h1>
          <div class="subtitle">شرکت نوآوران پنجره سپاهان</div>
        </div>

        <div class="field">
          <span class="label">نام و نام خانوادگی / شرکت:</span>
          <span class="value">${data.name}</span>
        </div>

        <div class="field">
          <span class="label">شماره تماس (کلیک برای تماس):</span>
          <span class="value phone"><a href="tel:${data.phone}" style="color: #ff334b; text-decoration: none;">${data.phone}</a></span>
        </div>

        <div class="field">
          <span class="label">نوع سیستم درخواستی:</span>
          <span class="value">${data.projectType}</span>
        </div>

        ${data.message ? `
        <div class="field">
          <span class="label">توضیحات و مشخصات پروژه:</span>
          <span class="value" style="font-weight: normal; line-height: 1.8;">${data.message}</span>
        </div>
        ` : ''}

        <div class="field">
          <span class="label">زمان ثبت درخواست:</span>
          <span class="value" style="font-size: 12px; font-weight: normal;">${data.createdAt}</span>
        </div>

        <div class="footer">
          این پیام به صورت خودکار از فرم مشاوره وب‌سایت رسمی نوآوران پنجره سپاهان ارسال شده است.
        </div>
      </div>
    </body>
    </html>
  `;

  // If SMTP is configured, send real email
  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        connectionTimeout: 5000,
        greetingTimeout: 5000,
        socketTimeout: 8000,
      });

      await transporter.sendMail({
        from: `"پرتال نوآوران پنجره" <${smtpUser}>`,
        to: companyEmail,
        subject,
        html: htmlContent,
      });

      return { success: true, message: 'Email sent successfully via SMTP' };
    } catch (error) {
      console.error('SMTP send error:', error);
      return { success: false, message: 'SMTP error, logged locally' };
    }
  }

  // Graceful fallback when SMTP credentials are not set on server
  console.log(`[Consultation Notification] Email to ${companyEmail}:`, {
    subject,
    customer: data.name,
    phone: data.phone,
    system: data.projectType,
  });

  return { success: true, message: 'Notification recorded (SMTP not configured)' };
}
