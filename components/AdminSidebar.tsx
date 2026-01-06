'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const [pendingSubmissions, setPendingSubmissions] = useState<number | null>(null);

  useEffect(() => {
    // Fetch pending submissions count
    fetch('/api/admin/stats')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.pendingSubmissions === 'number') {
          setPendingSubmissions(data.pendingSubmissions);
        }
      })
      .catch((error) => {
        console.error('Error fetching pending submissions:', error);
      });
  }, []);

  const navItems = [
    { href: '/admin', icon: 'lucide:layout-grid', label: 'Overview' },
    { href: '/admin/producers', icon: 'lucide:users', label: 'Producers' },
    { 
      href: '/admin/submissions', 
      icon: 'lucide:file-check', 
      label: 'Submissions', 
      count: pendingSubmissions !== null && pendingSubmissions > 0 ? pendingSubmissions : undefined 
    },
    { href: '/admin/categories', icon: 'lucide:folder', label: 'Categories' },
    { href: '/admin/certificates', icon: 'lucide:scroll-text', label: 'Certificates' },
    { href: '/admin/winners', icon: 'lucide:image', label: 'Winners Gallery' },
  ];

  const systemItems = [
    { href: '/admin/settings', icon: 'lucide:settings', label: 'Settings' },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-60 bg-white border-r border-stone-200 flex flex-col fixed h-full z-40">
      {/* Logo */}
      <div className="p-5 border-b border-stone-100">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-olive rounded-lg flex items-center justify-center shadow-sm">
            <iconify-icon icon="lucide:award" width="16" className="text-white" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
          </div>
          <span className="text-stone-900 font-serif font-semibold tracking-tight">Tastecert</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto">
        <div className="space-y-0.5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? 'bg-olive text-white'
                  : 'text-stone-600 hover:bg-stone-50'
              }`}
            >
              <iconify-icon
                icon={item.icon}
                width="18"
                style={{ strokeWidth: 1.5 } as React.CSSProperties}
                className={isActive(item.href) ? '' : 'text-stone-400'}
              ></iconify-icon>
              {item.label}
              {item.count && (
                <span className="ml-auto text-xs font-medium text-gold bg-amber-50 px-1.5 py-0.5 rounded">
                  {item.count}
                </span>
              )}
            </Link>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-stone-100">
          <p className="px-3 mb-2 text-xs font-medium text-stone-400 uppercase tracking-wider">System</p>
          <div className="space-y-0.5">
            {systemItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-olive text-white'
                    : 'text-stone-600 hover:bg-stone-50'
                }`}
              >
                <iconify-icon
                  icon={item.icon}
                  width="18"
                  style={{ strokeWidth: 1.5 } as React.CSSProperties}
                  className={isActive(item.href) ? '' : 'text-stone-400'}
                ></iconify-icon>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* User */}
      <div className="p-3 border-t border-stone-100">
        <button
          onClick={() => signOut({ callbackUrl: '/auth/signin' })}
          className="w-full flex items-center gap-2.5 p-2 rounded-lg hover:bg-stone-50 transition-colors cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-olive flex items-center justify-center text-white text-xs font-medium">
            AD
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-sm font-medium text-stone-900 truncate">Admin</p>
            <p className="text-xs text-stone-400 truncate">admin@tastecert.com</p>
          </div>
          <iconify-icon icon="lucide:log-out" width="16" className="text-stone-400" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
        </button>
      </div>
    </aside>
  );
}
