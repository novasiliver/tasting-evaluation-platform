import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';

export const metadata = {
  title: 'Admin Dashboard | Tastecert',
  description: 'Manage submissions, users, and certificates',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/auth/signin?callbackUrl=/admin');
  }

  return (
    <div className="flex min-h-screen bg-[#FDFBF7] text-stone-600 antialiased">
      <AdminSidebar />
      <main className="flex-1 ml-60">
        {children}
      </main>
    </div>
  );
}
