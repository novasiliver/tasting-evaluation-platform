import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata = {
  title: 'Settings | Admin | Tastecert',
  description: 'Configure platform settings',
};

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/auth/signin');
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div>
            <Link href="/admin" className="text-sm text-stone-500 hover:text-orange-600 mb-2 inline-block">
              ← Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-stone-900 font-heading">Platform Settings</h1>
            <p className="text-sm text-stone-500 mt-1">Configure system preferences</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-stone-50 flex items-center justify-center mx-auto mb-4">
            <iconify-icon icon="lucide:settings" width="32" className="text-stone-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
          </div>
          <h2 className="text-xl font-semibold text-stone-900 mb-2 font-heading">Platform Settings</h2>
          <p className="text-stone-500 mb-6">
            Configure categories, evaluation criteria, and system preferences.
          </p>
          <p className="text-sm text-stone-400">
            Coming soon: Category management, scoring criteria, email templates, and more.
          </p>
        </div>
      </div>
    </div>
  );
}

