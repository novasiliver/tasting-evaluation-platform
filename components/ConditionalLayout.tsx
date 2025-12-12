'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const isDashboardRoute = pathname?.startsWith('/dashboard');
  const isCertificateRoute = pathname?.startsWith('/certificates');

  if (isAdminRoute || isDashboardRoute || isCertificateRoute) {
    // Admin, Dashboard, and Certificate pages - no navbar/footer (they have their own layouts)
    return <>{children}</>;
  }

  // Public pages - include navbar/footer
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

