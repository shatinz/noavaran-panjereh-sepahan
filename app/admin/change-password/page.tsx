'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock, User, KeyRound, ShieldAlert, CheckCircle2, LogOut } from 'lucide-react';

export default function ChangePasswordPage() {
  const [newUsername, setNewUsername] = useState('admin');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!currentPassword) {
      setError('رمز عبور فعلی الزامی است.');
      return;
    }

    if (!newPassword || newPassword.trim().length < 8) {
      setError('رمز عبور جدید باید حداقل ۸ کاراکتر باشد.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('رمز عبور جدید و تکرار آن یکسان نیستند.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newUsername: newUsername.trim() || 'admin',
          newPassword: newPassword.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setSuccess(true);
        if (typeof window !== 'undefined') {
          localStorage.setItem('noavaran_admin_session', 'authenticated');
        }
        setTimeout(() => {
          router.push('/admin');
          router.refresh();
        }, 1200);
        return;
      }

      setError(data.error || 'خطا در تغییر رمز عبور.');
    } catch (err) {
      setError('خطا در برقراری ارتباط با سرور.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
    } catch {
      // ignore
    }
    if (typeof window !== 'undefined') {
      localStorage.removeItem('noavaran_admin_session');
    }
    router.push('/admin/login');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full rounded-3xl bg-charcoal-900 border border-charcoal-800 p-8 sm:p-10 space-y-6 shadow-2xl text-xs">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto mb-3 relative flex items-center justify-center">
            <Image
              src="/images/logo-dark.svg"
              alt="لوگوی شرکت نوآوران پنجره سپاهان"
              width={64}
              height={64}
              className="w-16 h-16 object-contain drop-shadow-md"
              priority
            />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-semibold">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>اقدام امنیتی الزامی</span>
          </div>

          <h1 className="text-xl font-bold text-white mt-2">تغییر اطلاعات ورود اولیه</h1>
          <p className="text-titanium-400 leading-relaxed text-[11px]">
            برای ورود به داشبورد و فعال‌سازی امکانات مدیریت، لطفاً نام کاربری و رمز عبور جدید و اختصاصی خود را تعیین کنید.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs text-center flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>اطلاعات با موفقیت ذخیره شد. در حال انتقال به داشبورد...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-titanium-300 block mb-1 font-medium">
              نام کاربری جدید:
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-titanium-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="admin"
                className="w-full pr-10 pl-3 py-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white font-mono focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-titanium-300 block mb-1 font-medium">
              رمز عبور فعلی:
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-titanium-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pr-10 pl-3 py-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white font-mono focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-titanium-300 block mb-1 font-medium">
              رمز عبور جدید (حداقل ۸ کاراکتر):
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-titanium-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="حداقل ۸ کاراکتر"
                className="w-full pr-10 pl-3 py-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white font-mono focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-titanium-300 block mb-1 font-medium">
              تکرار رمز عبور جدید:
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-titanium-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="تکرار رمز عبور جدید"
                className="w-full pr-10 pl-3 py-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white font-mono focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-charcoal-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.01] disabled:opacity-50 mt-2"
          >
            {loading ? 'در حال ثبت و ارتقای امنیت...' : 'ثبت و ورود به داشبورد'}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-charcoal-800">
          <button
            type="button"
            onClick={handleLogout}
            className="text-xs text-titanium-400 hover:text-rose-400 inline-flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>خروج و بازگشت به صفحه ورود</span>
          </button>
        </div>
      </div>
    </div>
  );
}
