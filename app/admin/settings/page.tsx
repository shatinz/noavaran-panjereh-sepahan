'use client';

import React, { useState, useEffect } from 'react';
import AdminNav from '@/components/AdminNav';
import { CompanySettings } from '@/lib/db';
import { Settings, Save, CheckCircle2, Phone, MapPin, Building2, Globe, Lock, User, KeyRound } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<CompanySettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Admin credentials state
  const [adminUsername, setAdminUsername] = useState('admin');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [credSaving, setCredSaving] = useState(false);
  const [credSaved, setCredSaved] = useState(false);
  const [credError, setCredError] = useState('');

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    setSaved(false);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (e) {
      alert('خطا در ذخیره تنظیمات');
    } finally {
      setSaving(false);
    }
  };

  const handleChangeCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setCredError('');
    setCredSaved(false);

    if (newPassword && newPassword !== confirmPassword) {
      setCredError('رمز عبور جدید و تکرار آن یکسان نیستند.');
      return;
    }

    setCredSaving(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newUsername: adminUsername,
          newPassword,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setCredSaved(true);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setCredSaved(false), 4000);
      } else {
        setCredError(data.error || 'خطا در به‌روزرسانی مشخصات ورود');
      }
    } catch (err) {
      setCredError('خطای برقراری ارتباط با سرور');
    } finally {
      setCredSaving(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="min-h-[85vh] pb-16">
        <AdminNav />
        <div className="text-center py-20 text-titanium-400 text-xs">در حال بارگذاری اطلاعات...</div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] pb-16">
      <AdminNav />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">تنظیمات اطلاعات شرکت و تماس با ما</h1>
            <p className="text-xs text-titanium-400 mt-1">
              ویرایش خطوط تلفن، آدرس‌های دفتر و کارخانه، و لینک‌های شبکه‌های اجتماعی
            </p>
          </div>
          {saved && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>تغییرات با موفقیت ذخیره شد</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSave} className="space-y-8 text-xs">
          {/* Brand Identity */}
          <div className="rounded-3xl bg-charcoal-900 border border-charcoal-800 p-6 sm:p-8 space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2 border-r-2 border-bronze-500 pr-2">
              <Building2 className="w-4 h-4 text-bronze-400" />
              <span>مشخصات نام تجاری و معرفی</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-titanium-300 block mb-1">نام شرکت (فارسی):</label>
                <input
                  type="text"
                  value={settings.companyName}
                  onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white focus:border-bronze-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-titanium-300 block mb-1">نام شرکت (انگلیسی):</label>
                <input
                  type="text"
                  value={settings.companyNameEn}
                  onChange={(e) => setSettings({ ...settings, companyNameEn: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white font-mono focus:border-bronze-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-titanium-300 block mb-1">زیرعنوان و شعار برند:</label>
              <input
                type="text"
                value={settings.brandSubtitle}
                onChange={(e) => setSettings({ ...settings, brandSubtitle: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white focus:border-bronze-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Contact Numbers */}
          <div className="rounded-3xl bg-charcoal-900 border border-charcoal-800 p-6 sm:p-8 space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2 border-r-2 border-bronze-500 pr-2">
              <Phone className="w-4 h-4 text-bronze-400" />
              <span>خطوط تماس، تلفن ۴ رقمی و فاکس</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-titanium-300 block mb-1">تلفن اصلی (جهت تماس کلیکی):</label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white font-mono focus:border-bronze-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-titanium-300 block mb-1">متن نمایشی خط ۴ رقمی:</label>
                <input
                  type="text"
                  value={settings.phoneLabel}
                  onChange={(e) => setSettings({ ...settings, phoneLabel: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white focus:border-bronze-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-titanium-300 block mb-1">خطوط مستقیم دفتر (با کاما):</label>
                <input
                  type="text"
                  value={settings.directPhones?.join(', ')}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      directPhones: e.target.value.split(',').map((s) => s.trim()),
                    })
                  }
                  className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white font-mono focus:border-bronze-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-titanium-300 block mb-1">خطوط مستقیم کارخانه (با کاما):</label>
                <input
                  type="text"
                  value={settings.factoryPhones?.join(', ')}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      factoryPhones: e.target.value.split(',').map((s) => s.trim()),
                    })
                  }
                  className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white font-mono focus:border-bronze-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-titanium-300 block mb-1">شماره واتساپ و موبایل:</label>
                <input
                  type="text"
                  value={settings.mobile}
                  onChange={(e) => setSettings({ ...settings, mobile: e.target.value, whatsapp: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white font-mono focus:border-bronze-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-titanium-300 block mb-1">ساعات کاری مجموعه:</label>
                <input
                  type="text"
                  value={settings.workingHours}
                  onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white focus:border-bronze-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Addresses */}
          <div className="rounded-3xl bg-charcoal-900 border border-charcoal-800 p-6 sm:p-8 space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2 border-r-2 border-bronze-500 pr-2">
              <MapPin className="w-4 h-4 text-bronze-400" />
              <span>نشانی دقیق دفتر مرکزی و کارخانه</span>
            </h2>

            <div>
              <label className="text-titanium-300 block mb-1">آدرس دفتر مرکزی:</label>
              <textarea
                rows={2}
                value={settings.officeAddress}
                onChange={(e) => setSettings({ ...settings, officeAddress: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white focus:border-bronze-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-titanium-300 block mb-1">آدرس کارخانه تولیدی:</label>
              <textarea
                rows={2}
                value={settings.factoryAddress}
                onChange={(e) => setSettings({ ...settings, factoryAddress: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white focus:border-bronze-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="rounded-3xl bg-charcoal-900 border border-charcoal-800 p-6 sm:p-8 space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2 border-r-2 border-bronze-500 pr-2">
              <Globe className="w-4 h-4 text-bronze-400" />
              <span>شبکه‌های اجتماعی و کانال‌های ویدیویی</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-titanium-300 block mb-1">اینستاگرام:</label>
                <input
                  type="text"
                  value={settings.socialLinks?.instagram}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, instagram: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white font-mono focus:border-bronze-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-titanium-300 block mb-1">کانال آپارات:</label>
                <input
                  type="text"
                  value={settings.socialLinks?.aparat}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, aparat: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white font-mono focus:border-bronze-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-titanium-300 block mb-1">کانال تلگرام:</label>
                <input
                  type="text"
                  value={settings.socialLinks?.telegram}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, telegram: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white font-mono focus:border-bronze-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-titanium-300 block mb-1">ایمیل رسمی:</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white font-mono focus:border-bronze-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Submit Button for Company Settings */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3.5 rounded-xl bg-bronze-500 hover:bg-bronze-400 text-charcoal-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-bronze-500/20 transition-all hover:scale-[1.01] disabled:opacity-50"
            >
              <Save className="w-4 h-4 text-charcoal-950" />
              <span>{saving ? 'در حال ذخیره...' : 'ذخیره کلیه تنظیمات شرکت'}</span>
            </button>
          </div>
        </form>

        {/* Admin Credentials & Security Card */}
        <div className="rounded-3xl bg-charcoal-900 border border-charcoal-800 p-6 sm:p-8 space-y-6 text-xs">
          <div className="flex items-center justify-between border-b border-charcoal-800 pb-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2 border-r-2 border-rose-500 pr-2">
              <KeyRound className="w-4 h-4 text-rose-400" />
              <span>امنیت و تغییر نام کاربری و رمز عبور مدیریت</span>
            </h2>
            {credSaved && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>نام کاربری و رمز عبور با موفقیت تغییر یافت</span>
              </div>
            )}
          </div>

          <p className="text-titanium-400 leading-relaxed">
            جهت حفظ امنیت پرتال، می‌توانید نام کاربری و رمز عبور اختصاصی پنل مدیریت را در این بخش ویرایش کنید.
          </p>

          {credError && (
            <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs text-center">
              {credError}
            </div>
          )}

          <form onSubmit={handleChangeCredentials} className="space-y-4 max-w-xl">
            <div>
              <label className="text-titanium-300 block mb-1">نام کاربری جدید یا فعلی:</label>
              <div className="relative">
                <User className="w-4 h-4 text-titanium-500 absolute right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pr-10 pl-3 py-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white font-mono focus:border-rose-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-titanium-300 block mb-1">رمز عبور فعلی مدیریت (جهت تایید هویت):</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-titanium-500 absolute right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pr-10 pl-3 py-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white font-mono focus:border-rose-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-titanium-300 block mb-1">رمز عبور جدید:</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="حداقل ۴ کاراکتر"
                  className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white font-mono focus:border-rose-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-titanium-300 block mb-1">تکرار رمز عبور جدید:</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="تکرار رمز جدید"
                  className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white font-mono focus:border-rose-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={credSaving}
              className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-600/20 transition-all hover:scale-[1.01] disabled:opacity-50"
            >
              <Lock className="w-4 h-4" />
              <span>{credSaving ? 'در حال ذخیره...' : 'به‌روزرسانی رمز عبور مدیریت'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
