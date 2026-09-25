'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ShieldCheck, Lock, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.error || 'نام کاربری یا رمز عبور اشتباه است.');
      }
    } catch (err) {
      setError('خطا در برقراری ارتباط با سرور.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full rounded-3xl bg-charcoal-900 border border-charcoal-800 p-8 sm:p-10 space-y-8 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto mb-4 relative flex items-center justify-center">
            <Image
              src="/images/logo-dark.svg"
              alt="لوگوی شرکت نوآوران پنجره سپاهان"
              width={64}
              height={64}
              className="w-16 h-16 object-contain drop-shadow-md"
              priority
            />
          </div>
          <h1 className="text-2xl font-bold text-white">ورود به پنل مدیریت</h1>
          <p className="text-xs text-titanium-400">
            شرکت نوآوران پنجره سپاهان
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-titanium-300 block mb-1">
              نام کاربری:
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-titanium-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full pl-3 pr-10 py-3 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white text-xs font-mono focus:border-bronze-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-titanium-300 block mb-1">
              رمز عبور:
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-titanium-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-3 pr-10 py-3 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white text-xs font-mono focus:border-bronze-500 focus:outline-none"
              />
            </div>
            <span className="text-[10px] text-titanium-500 block mt-1">
              پیش‌فرض: admin / noavaran2026
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-bronze-500 hover:bg-bronze-400 text-charcoal-950 font-bold text-xs shadow-lg shadow-bronze-500/20 transition-all hover:scale-[1.01] disabled:opacity-50 mt-2"
          >
            {loading ? 'در حال بررسی...' : 'ورود به داشبورد'}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-charcoal-800">
          <Link href="/" className="text-xs text-titanium-400 hover:text-bronze-400 flex items-center justify-center gap-1">
            <span>بازگشت به صفحه اصلی سایت</span>
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
