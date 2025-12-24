'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  const navLinks = [
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About Us' },
    { href: '/winners', label: 'Directory' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="sticky top-0 z-50 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-olive text-white rounded-lg flex items-center justify-center shadow-sm group-hover:bg-[#465a26] transition-colors">
            <iconify-icon icon="lucide:award" width="20" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
          </div>
          <span className="font-serif text-xl tracking-tight font-medium text-stone-900">Tastecert</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors ${
                isActive(link.href) ? 'text-[#1C1917]' : 'hover:text-[#1C1917]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {session ? (
            // Logged in user menu
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-olive flex items-center justify-center text-white text-xs font-semibold">
                  {(session.user.name || session.user.email || 'U')[0].toUpperCase()}
                </div>
                <span className="text-sm font-medium text-stone-700">{session.user.name || 'Account'}</span>
                <iconify-icon icon="lucide:chevron-down" width="16" className="text-stone-400" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-stone-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-stone-100">
                    <p className="text-sm font-semibold text-stone-900">{session.user.name}</p>
                    <p className="text-xs text-stone-500">{session.user.email}</p>
                  </div>
                  <div className="py-2">
                    {session.user.role === 'ADMIN' ? (
                      <Link
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <iconify-icon icon="lucide:shield" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                        Admin Dashboard
                      </Link>
                    ) : (
                      <>
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <iconify-icon icon="lucide:layout-dashboard" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                          My Dashboard
                        </Link>
                        <Link
                          href="/dashboard/products"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <iconify-icon icon="lucide:package" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                          My Products
                        </Link>
                        <Link
                          href="/dashboard/certificates"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <iconify-icon icon="lucide:award" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                          Certificates
                        </Link>
                      </>
                    )}
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <iconify-icon icon="lucide:user" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                      Profile Settings
                    </Link>
                  </div>
                  <div className="border-t border-stone-100 pt-2">
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        signOut({ callbackUrl: '/' });
                      }}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
                    >
                      <iconify-icon icon="lucide:log-out" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Not logged in - show sign in and submit buttons
            <>
              <Link href="/auth/signin" className="hidden sm:block text-sm font-medium text-stone-600 hover:text-[#1C1917] transition-colors">
                Login
              </Link>
              <Link href="/submit" className="bg-[#1C1917] hover:bg-stone-800 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm">
                Get Certified
              </Link>
            </>
          )}
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-stone-700 hover:text-stone-900 focus:outline-none"
          >
            <span className="sr-only">Open main menu</span>
            {!isOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-stone-200 bg-[#FDFBF7]">
          <div className="px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors ${
                  isActive(link.href) 
                    ? 'text-[#1C1917] bg-stone-100' 
                    : 'text-stone-600 hover:text-[#1C1917] hover:bg-stone-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-stone-200 my-2 pt-2">
              {session ? (
                <>
                  <Link
                    href={session.user.role === 'ADMIN' ? '/admin' : '/dashboard'}
                    className="block px-3 py-2 text-base font-medium rounded-lg text-stone-600 hover:text-[#1C1917] hover:bg-stone-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {session.user.role === 'ADMIN' ? 'Admin Dashboard' : 'My Dashboard'}
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      signOut({ callbackUrl: '/' });
                    }}
                    className="block w-full text-left px-3 py-2 text-base font-medium rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/signin"
                    className="block px-3 py-2 text-base font-medium rounded-lg text-stone-600 hover:text-[#1C1917] hover:bg-stone-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/submit"
                    className="block px-3 py-2 text-base font-medium rounded-lg bg-[#1C1917] text-white hover:bg-stone-800 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Certified
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
