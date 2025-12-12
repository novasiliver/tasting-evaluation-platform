'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface ProfileData {
  name: string;
  email: string;
  company: string;
  phone: string;
  website: string;
  country: string;
  address: string;
}

export default function ProducerProfilePage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    website: '',
    country: '',
    address: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (session?.user) {
      fetchProfile();
    }
  }, [session]);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/dashboard/profile');
      if (response.ok) {
        const data = await response.json();
        setProfileData({
          name: data.name || '',
          email: data.email || '',
          company: data.company || '',
          phone: data.phone || '',
          website: data.website || '',
          country: data.country || '',
          address: data.address || '',
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileSave = async () => {
    try {
      setIsSaving(true);
      setMessage(null);

      const response = await fetch('/api/dashboard/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        const updated = await response.json();
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        
        // Update session
        await update({
          ...session,
          user: {
            ...session?.user,
            name: updated.name,
            company: updated.company,
          },
        });
        
        setTimeout(() => setMessage(null), 3000);
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update profile');
      }
    } catch (error: any) {
      console.error('Error saving profile:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to update profile' });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    try {
      setIsSaving(true);
      setMessage(null);

      if (passwordData.newPassword !== passwordData.confirmPassword) {
        setMessage({ type: 'error', text: 'New passwords do not match' });
        setIsSaving(false);
        return;
      }

      if (passwordData.newPassword.length < 8) {
        setMessage({ type: 'error', text: 'Password must be at least 8 characters' });
        setIsSaving(false);
        return;
      }

      const response = await fetch('/api/dashboard/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Password changed successfully!' });
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setTimeout(() => setMessage(null), 3000);
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to change password');
      }
    } catch (error: any) {
      console.error('Error changing password:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to change password' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="antialiased min-h-screen flex flex-col text-zinc-600 bg-zinc-50">
      {/* Main Layout */}
      <main className="flex-grow sm:px-6 w-full max-w-5xl mx-auto px-4 py-10">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">Settings</h1>
          <p className="text-sm text-zinc-500 mt-1">Manage your producer profile and account preferences.</p>
        </header>

        {/* Message Alert */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg border ${
            message.type === 'success' 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
              : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            <div className="flex items-center gap-2">
              <iconify-icon 
                icon={message.type === 'success' ? 'lucide:check-circle' : 'lucide:alert-circle'} 
                width="18" 
                style={{ strokeWidth: 1.5 } as React.CSSProperties}
              ></iconify-icon>
              <span className="text-sm font-medium">{message.text}</span>
            </div>
          </div>
        )}

        <div className="flex flex-col space-y-8">
          {/* Personal Information Section */}
          <section className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-base font-semibold text-zinc-900">Personal Information</h2>
              <p className="text-xs text-zinc-500 mt-0.5">Contact details and public profile info.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-md text-sm text-zinc-900 placeholder-zinc-400 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  disabled
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-md text-sm text-zinc-500 cursor-not-allowed"
                  title="Email cannot be changed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-700">Company Name</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                    <iconify-icon icon="lucide:building-2" width="14"></iconify-icon>
                  </span>
                  <input
                    type="text"
                    value={profileData.company}
                    onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-zinc-200 rounded-md text-sm text-zinc-900 placeholder-zinc-400 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-700">Phone Number</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                    <iconify-icon icon="lucide:phone" width="14"></iconify-icon>
                  </span>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    placeholder="+1 234 567 8900"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-zinc-200 rounded-md text-sm text-zinc-900 placeholder-zinc-400 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-700">Website</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                    <iconify-icon icon="lucide:globe" width="14"></iconify-icon>
                  </span>
                  <input
                    type="url"
                    value={profileData.website}
                    onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-zinc-200 rounded-md text-sm text-zinc-900 placeholder-zinc-400 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-700">Country</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                    <iconify-icon icon="lucide:map-pin" width="14"></iconify-icon>
                  </span>
                  <input
                    type="text"
                    value={profileData.country}
                    onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
                    placeholder="Country"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-zinc-200 rounded-md text-sm text-zinc-900 placeholder-zinc-400 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-medium text-zinc-700">Address</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-zinc-400">
                    <iconify-icon icon="lucide:map" width="14"></iconify-icon>
                  </span>
                  <input
                    type="text"
                    value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                    placeholder="Full address"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-zinc-200 rounded-md text-sm text-zinc-900 placeholder-zinc-400 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-6 mt-6 border-t border-zinc-200">
              <button
                onClick={() => router.push('/dashboard')}
                className="px-4 py-2 text-xs font-medium text-zinc-600 hover:text-zinc-900 bg-transparent rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleProfileSave}
                disabled={isSaving}
                className="px-4 py-2 text-xs font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-md shadow-sm transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <iconify-icon icon="lucide:save" width="14"></iconify-icon>
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </section>

          {/* Change Password Section */}
          <section className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-base font-semibold text-zinc-900">Change Password</h2>
              <p className="text-xs text-zinc-500 mt-0.5">Ensure your account is secure with a strong password.</p>
            </div>

            <div className="space-y-4 max-w-lg">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-700">Current Password</label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-md text-sm text-zinc-900 placeholder-zinc-400 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-700">New Password</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-md text-sm text-zinc-900 placeholder-zinc-400 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-700">Confirm Password</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-md text-sm text-zinc-900 placeholder-zinc-400 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                onClick={handlePasswordChange}
                disabled={isSaving || !passwordData.currentPassword || !passwordData.newPassword}
                className="px-4 py-2 text-xs font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded-md shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
