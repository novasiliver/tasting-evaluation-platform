'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface Stats {
  totalProducts: number;
  underEvaluation: number;
  awarded: number;
  pending: number;
}

interface RecentActivity {
  id: string;
  type: 'award' | 'evaluation' | 'submission' | 'action';
  title: string;
  description: string;
  timestamp: string;
  status?: string;
  score?: number;
  awardLevel?: string;
}

interface Product {
  id: string;
  name: string;
  status: string;
  submittedAt: string;
  category: {
    name: string;
  };
  certificate?: {
    awardLevel: string;
  };
  evaluation?: {
    totalScore?: number;
    overallScore?: number;
  };
}

export default function ProducerDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    underEvaluation: 0,
    awarded: 0,
    pending: 0,
  });
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [awardStats, setAwardStats] = useState({ gold: 0, silver: 0, bronze: 0 });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch stats
      let statsData: any = null;
      const statsResponse = await fetch('/api/dashboard/stats');
      if (statsResponse.ok) {
        statsData = await statsResponse.json();
        // Map API response to dashboard state
        setStats({
          totalProducts: statsData.stats.totalProducts || 0,
          underEvaluation: statsData.stats.evaluatedProducts || 0,
          awarded: statsData.stats.certificatesCount || 0,
          pending: statsData.stats.pendingProducts || 0,
        });
        setRecentProducts(statsData.recentProducts || []);
      }

      // Fetch all products to generate activities
      const productsResponse = await fetch('/api/dashboard/products');
      if (productsResponse.ok) {
        const products: Product[] = await productsResponse.json();
        
        // Calculate award stats from API data if available, otherwise from products
        if (statsData?.stats) {
          setAwardStats({
            gold: statsData.stats.goldCount || 0,
            silver: statsData.stats.silverCount || 0,
            bronze: statsData.stats.bronzeCount || 0,
          });
        } else {
          const awards = products.filter(p => p.certificate);
          setAwardStats({
            gold: awards.filter(p => p.certificate?.awardLevel === 'GOLD').length,
            silver: awards.filter(p => p.certificate?.awardLevel === 'SILVER').length,
            bronze: awards.filter(p => p.certificate?.awardLevel === 'BRONZE').length,
          });
        }

        // Generate recent activities
        const activities: RecentActivity[] = products
          .slice(0, 4)
          .map((product) => {
            if (product.status === 'CERTIFIED' && product.certificate) {
              return {
                id: product.id,
                type: 'award' as const,
                title: `${product.certificate.awardLevel.charAt(0) + product.certificate.awardLevel.slice(1).toLowerCase()} Award Received`,
                description: `Your "${product.name}" has been awarded ${product.certificate.awardLevel.charAt(0) + product.certificate.awardLevel.slice(1).toLowerCase()} certification`,
                timestamp: product.submittedAt,
                awardLevel: product.certificate.awardLevel,
                score: product.evaluation?.totalScore || product.evaluation?.overallScore,
              };
            } else if (product.status === 'UNDER_REVIEW' || product.status === 'EVALUATED') {
              return {
                id: product.id,
                type: 'evaluation' as const,
                title: 'Evaluation Started',
                description: `Your "${product.name}" has entered the evaluation process`,
                timestamp: product.submittedAt,
                status: 'Under Review',
              };
            } else {
              return {
                id: product.id,
                type: 'submission' as const,
                title: 'New Submission',
                description: `You submitted "${product.name}" for certification`,
                timestamp: product.submittedAt,
                status: 'Pending Review',
              };
            }
          });

        setRecentActivities(activities);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'award':
        return 'lucide:trophy';
      case 'evaluation':
        return 'lucide:microscope';
      case 'submission':
        return 'lucide:package-plus';
      case 'action':
        return 'lucide:alert-triangle';
      default:
        return 'lucide:circle';
    }
  };

  const getActivityIconColor = (type: string) => {
    switch (type) {
      case 'award':
        return 'bg-emerald-50 text-emerald-600';
      case 'evaluation':
        return 'bg-blue-50 text-blue-600';
      case 'submission':
        return 'bg-stone-100 text-stone-600';
      case 'action':
        return 'bg-olive-50 text-olive-600';
      default:
        return 'bg-stone-100 text-stone-600';
    }
  };

  const successRate = stats.totalProducts > 0 
    ? Math.round((stats.awarded / stats.totalProducts) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-stone-900 tracking-tight mb-1">
            Welcome back, {session?.user?.company || session?.user?.name || 'Producer'}
          </h1>
          <p className="text-sm text-stone-500">
            Here's an overview of your certification activity and product status.
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Products */}
          <div className="bg-white rounded-xl border border-stone-200/80 p-5 hover:shadow-md hover:border-stone-300 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center">
                <iconify-icon icon="lucide:package" width="20" className="text-stone-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              {stats.totalProducts > 0 && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                  <iconify-icon icon="lucide:trending-up" width="14" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  +{stats.totalProducts}
                </span>
              )}
            </div>
            <p className="text-2xl font-semibold text-stone-900 tracking-tight mb-1">
              {isLoading ? '...' : stats.totalProducts}
            </p>
            <p className="text-sm text-stone-500">Total Products Submitted</p>
          </div>

          {/* Under Evaluation */}
          <div className="bg-white rounded-xl border border-stone-200/80 p-5 hover:shadow-md hover:border-stone-300 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <iconify-icon icon="lucide:clock" width="20" className="text-blue-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              {stats.underEvaluation > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
                  In Progress
                </span>
              )}
            </div>
            <p className="text-2xl font-semibold text-stone-900 tracking-tight mb-1">
              {isLoading ? '...' : stats.underEvaluation}
            </p>
            <p className="text-sm text-stone-500">Products Under Evaluation</p>
          </div>

          {/* Awarded Products */}
          <div className="bg-white rounded-xl border border-stone-200/80 p-5 hover:shadow-md hover:border-stone-300 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-gold-50 flex items-center justify-center">
                <iconify-icon icon="lucide:trophy" width="20" className="text-gold-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-gold-400"></span>
                <span className="w-2 h-2 rounded-full bg-stone-400"></span>
                <span className="w-2 h-2 rounded-full bg-gold-600"></span>
              </div>
            </div>
            <p className="text-2xl font-semibold text-stone-900 tracking-tight mb-1">
              {isLoading ? '...' : stats.awarded}
            </p>
            <p className="text-sm text-stone-500">Awarded Products</p>
          </div>

          {/* Pending Actions */}
          <div className="bg-white rounded-xl border border-stone-200/80 p-5 hover:shadow-md hover:border-stone-300 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-olive-50 flex items-center justify-center">
                <iconify-icon icon="lucide:alert-circle" width="20" className="text-olive-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              {stats.pending > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-olive-600 bg-olive-50 rounded-full">
                  Action Required
                </span>
              )}
            </div>
            <p className="text-2xl font-semibold text-stone-900 tracking-tight mb-1">
              {isLoading ? '...' : stats.pending}
            </p>
            <p className="text-sm text-stone-500">Pending Actions</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-stone-200/80 p-6 mb-8">
          <h2 className="text-sm font-semibold text-stone-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            <Link
              href="/submit"
              className="flex items-center gap-3 p-4 bg-gradient-to-br from-gold-500 to-olive-600 rounded-xl text-white hover:from-gold-600 hover:to-olive-700 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <iconify-icon icon="lucide:plus" width="20" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">Submit New Product</p>
                <p className="text-xs text-white/70">Start certification</p>
              </div>
            </Link>

            <Link
              href="/dashboard/products"
              className="flex items-center gap-3 p-4 bg-stone-50 rounded-xl hover:bg-stone-100 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-white border border-stone-200 flex items-center justify-center group-hover:border-stone-300 transition-colors">
                <iconify-icon icon="lucide:package-search" width="20" className="text-stone-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-stone-900">View My Products</p>
                <p className="text-xs text-stone-500">Manage submissions</p>
              </div>
            </Link>

            <Link
              href="/dashboard/profile"
              className="flex items-center gap-3 p-4 bg-stone-50 rounded-xl hover:bg-stone-100 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-white border border-stone-200 flex items-center justify-center group-hover:border-stone-300 transition-colors">
                <iconify-icon icon="lucide:user-cog" width="20" className="text-stone-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-stone-900">Update Profile</p>
                <p className="text-xs text-stone-500">Edit company info</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-stone-200/80">
            <div className="flex items-center justify-between p-5 border-b border-stone-100">
              <h2 className="text-sm font-semibold text-stone-900">Recent Activity</h2>
              <Link href="/dashboard/products" className="text-xs font-medium text-gold-600 hover:text-gold-700 transition-colors">
                View All
              </Link>
            </div>
            <div className="divide-y divide-stone-100">
              {isLoading ? (
                <div className="p-12 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-600 mx-auto"></div>
                </div>
              ) : recentActivities.length === 0 ? (
                <div className="p-12 text-center">
                  <iconify-icon icon="lucide:inbox" width="48" className="text-stone-300 mx-auto mb-4"></iconify-icon>
                  <p className="text-sm text-stone-500">No recent activity</p>
                </div>
              ) : (
                recentActivities.map((activity) => (
                  <div key={activity.id} className="p-5 hover:bg-stone-50/50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-full ${getActivityIconColor(activity.type)} flex items-center justify-center flex-shrink-0`}>
                        <iconify-icon icon={getActivityIcon(activity.type)} width="18" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-sm font-medium text-stone-900">{activity.title}</p>
                            <p className="text-sm text-stone-500 mt-0.5">{activity.description}</p>
                          </div>
                          <span className="text-xs text-stone-400 whitespace-nowrap">
                            {formatTimestamp(activity.timestamp)}
                          </span>
                        </div>
                        {(activity.awardLevel || activity.status) && (
                          <div className="flex items-center gap-2 mt-3">
                            {activity.awardLevel && (
                              <span className={`inline-flex items-center gap-1 px-2 py-1 ${
                                activity.awardLevel === 'GOLD' ? 'bg-gold-50 text-gold-700' :
                                activity.awardLevel === 'SILVER' ? 'bg-stone-100 text-stone-700' :
                                'bg-olive-50 text-olive-700'
                              } text-xs font-medium rounded-full`}>
                                <iconify-icon icon="lucide:trophy" width="12" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                                {activity.awardLevel.charAt(0) + activity.awardLevel.slice(1).toLowerCase()}
                              </span>
                            )}
                            {activity.score && (
                              <span className="text-xs text-stone-400">Score: {activity.score.toFixed(1)}/10</span>
                            )}
                            {activity.status && !activity.awardLevel && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                                <iconify-icon icon="lucide:clock" width="12" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                                {activity.status}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Certification Progress */}
            <div className="bg-white rounded-xl border border-stone-200/80 p-5">
              <h2 className="text-sm font-semibold text-stone-900 mb-4">Certification Progress</h2>
              
              {/* Progress Chart */}
              <div className="relative mb-6">
                <div className="flex items-center justify-center">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#f4f4f5" strokeWidth="10"></circle>
                    <circle 
                      cx="60" 
                      cy="60" 
                      r="50" 
                      fill="none" 
                      stroke="url(#gradient)" 
                      strokeWidth="10" 
                      strokeLinecap="round" 
                      strokeDasharray="314" 
                      strokeDashoffset={314 - (314 * successRate) / 100}
                    ></circle>
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: '#f59e0b' }}></stop>
                        <stop offset="100%" style={{ stopColor: '#ea580c' }}></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-semibold text-stone-900">{successRate}%</span>
                    <span className="text-xs text-stone-500">Success Rate</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gold-400"></span>
                    <span className="text-sm text-stone-600">Gold Awards</span>
                  </div>
                  <span className="text-sm font-medium text-stone-900">{awardStats.gold}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-stone-400"></span>
                    <span className="text-sm text-stone-600">Silver Awards</span>
                  </div>
                  <span className="text-sm font-medium text-stone-900">{awardStats.silver}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gold-700"></span>
                    <span className="text-sm text-stone-600">Bronze Awards</span>
                  </div>
                  <span className="text-sm font-medium text-stone-900">{awardStats.bronze}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
