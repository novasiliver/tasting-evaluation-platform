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
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/awards', label: 'Awards' },
    { href: '/winners', label: 'Winners' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="fixed top-4 left-4 right-4 z-50">
      <div className="max-w-6xl mx-auto glass rounded-full px-6 h-16 flex items-center justify-between shadow-sm">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-8 w-8 bg-orange-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
            <iconify-icon icon="lucide:award" width="16" height="16" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
          </div>
          <span className="text-stone-900 font-semibold tracking-tight text-lg font-heading">Tastecert</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors ${
                isActive(link.href) ? 'text-orange-600' : 'hover:text-orange-600'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {session ? (
            // Logged in user menu
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 rounded-full hover:bg-stone-50 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xs font-semibold">
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
              <Link href="/auth/signin" className="hidden md:block text-sm font-medium text-stone-700 hover:text-orange-600 transition-colors">
                Sign In
              </Link>
              <Link href="/submit" className="text-sm font-semibold px-5 py-2 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-all shadow-lg shadow-stone-900/20">
                Submit Product
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
        <div className="md:hidden mt-2">
          <div className="glass rounded-2xl px-4 py-3 space-y-1 shadow-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors ${
                  isActive(link.href) 
                    ? 'text-orange-600 bg-orange-50/50' 
                    : 'text-stone-700 hover:text-orange-600 hover:bg-stone-50/50'
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
                    className="block px-3 py-2 text-base font-medium rounded-lg text-stone-700 hover:text-orange-600 hover:bg-stone-50/50 transition-colors"
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
                <Link
                  href="/auth/signin"
                  className="block px-3 py-2 text-base font-medium rounded-lg text-stone-700 hover:text-orange-600 hover:bg-stone-50/50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

