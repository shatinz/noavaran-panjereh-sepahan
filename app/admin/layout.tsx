'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (pathname === '/admin/login') {
      setAuthorized(true);
      return;
    }

    // Check session via cookie or localStorage
    const hasLocalAuth = typeof window !== 'undefined' && localStorage.getItem('noavaran_admin_session') === 'authenticated';
    const hasCookieAuth = typeof document !== 'undefined' && document.cookie.includes('noavaran_admin_session=authenticated');

    if (hasLocalAuth || hasCookieAuth) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
      router.replace('/admin/login');
    }
  }, [pathname, router]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (authorized === null) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-signal-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-steel-400 font-vazir">در حال تایید دسترسی امنیتی...</p>
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return <>{children}</>;
}
