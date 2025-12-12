'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (session && session.user.role !== 'PRODUCER') {
      router.push('/admin');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (!session || session.user.role !== 'PRODUCER') {
    return null;
  }

  const navItems = [
    { href: '/dashboard', label: 'Overview', icon: 'lucide:layout-dashboard' },
    { href: '/dashboard/products', label: 'My Products', icon: 'lucide:package' },
    { href: '/dashboard/profile', label: 'Profile', icon: 'lucide:user' },
  ];

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-white border-r border-zinc-200/80 z-40 transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-zinc-200/80">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              {isSidebarOpen ? (
                <>
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                    <iconify-icon icon="lucide:award" width="16" className="text-white" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <h1 className="text-lg font-bold text-zinc-900">TasteCert</h1>
                </>
              ) : (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                  <iconify-icon icon="lucide:award" width="16" className="text-white" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                </div>
              )}
            </Link>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 rounded-lg hover:bg-zinc-100 transition-colors"
            >
              <iconify-icon
                icon={isSidebarOpen ? 'lucide:panel-left-close' : 'lucide:panel-left-open'}
                width="20"
                className="text-zinc-500"
                style={{ strokeWidth: 1.5 } as React.CSSProperties}
              ></iconify-icon>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-amber-50 text-amber-700 font-medium'
                      : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                  }`}
                >
                  <iconify-icon
                    icon={item.icon}
                    width="20"
                    className={isActive ? 'text-amber-600' : 'text-zinc-400'}
                    style={{ strokeWidth: 1.5 } as React.CSSProperties}
                  ></iconify-icon>
                  {isSidebarOpen && <span className="text-sm">{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-zinc-200/80">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-zinc-50">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-medium">
                {(session.user.name || session.user.email || 'U')[0].toUpperCase()}
              </div>
              {isSidebarOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-900 truncate">
                    {session.user.name || 'Producer'}
                  </p>
                  <p className="text-xs text-zinc-500 truncate">{session.user.email}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {children}
      </div>
    </div>
  );
}

