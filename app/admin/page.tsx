'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Stats {
  totalProducers: number;
  pendingSubmissions: number;
  awardedProducts: number;
  certificateDownloads: number;
}

interface ChartData {
  month: string;
  count: number;
}

interface AwardChartData {
  month: string;
  gold: number;
  silver: number;
  bronze: number;
}

interface Activity {
  type: string;
  id: string;
  title: string;
  producer: string;
  date: string | Date;
  status?: string;
  score?: number;
  awardLevel?: string;
}

export default function AdminDashboard() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [submissionsChartPeriod, setSubmissionsChartPeriod] = useState('6');
  const [awardsChartPeriod, setAwardsChartPeriod] = useState('6');
  const [stats, setStats] = useState<Stats | null>(null);
  const [monthlySubmissions, setMonthlySubmissions] = useState<ChartData[]>([]);
  const [monthlyAwards, setMonthlyAwards] = useState<AwardChartData[]>([]);
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [trends, setTrends] = useState<{ producerTrend: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, [submissionsChartPeriod, awardsChartPeriod]);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
        setTrends(data.trends);
        setMonthlySubmissions(data.charts.monthlySubmissions);
        setMonthlyAwards(data.charts.monthlyAwards);
        setRecentActivity(data.recentActivity);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: string | Date) => {
    const d = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'submission':
        return 'lucide:file-plus';
      case 'evaluation':
        return 'lucide:check-circle';
      case 'certificate':
        return 'lucide:trophy';
      default:
        return 'lucide:circle';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'submission':
        return 'bg-blue-100 text-blue-600';
      case 'evaluation':
        return 'bg-emerald-100 text-emerald-600';
      case 'certificate':
        return 'bg-amber-100 text-amber-600';
      default:
        return 'bg-zinc-100 text-zinc-600';
    }
  };

  const getMaxSubmissionValue = () => {
    return Math.max(...monthlySubmissions.map(s => s.count), 1);
  };

  const getMaxAwardValue = () => {
    return Math.max(...monthlyAwards.map(a => a.gold + a.silver + a.bronze), 1);
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-zinc-200/80 sticky top-0 z-30">
        <div className="flex items-center justify-between px-8 h-14">
          <div>
            <h1 className="text-lg font-semibold text-zinc-900 tracking-tight">Overview</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => {
                  setIsNotificationOpen(!isNotificationOpen);
                  setIsSearchOpen(false);
                }}
                className="w-9 h-9 rounded-lg border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 transition-colors relative"
              >
                <iconify-icon icon="lucide:bell" width="18" className="text-zinc-500" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
              </button>
              {isNotificationOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-zinc-200 rounded-xl shadow-lg overflow-hidden z-50">
                  <div className="p-4 border-b border-zinc-100">
                    <h3 className="text-sm font-semibold text-zinc-900">Notifications</h3>
                    <p className="text-xs text-zinc-500 mt-0.5">You have 3 unread notifications</p>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="p-4 border-b border-zinc-50 hover:bg-zinc-50 cursor-pointer">
                      <p className="text-sm text-zinc-700 mb-1"><strong>New submission</strong> from Mediterranean Farms</p>
                      <p className="text-xs text-zinc-400">5 minutes ago</p>
                    </div>
                    <div className="p-4 border-b border-zinc-50 hover:bg-zinc-50 cursor-pointer">
                      <p className="text-sm text-zinc-700 mb-1"><strong>Certificate downloaded</strong> by Italian Dairy Co.</p>
                      <p className="text-xs text-zinc-400">32 minutes ago</p>
                    </div>
                    <div className="p-4 hover:bg-zinc-50 cursor-pointer">
                      <p className="text-sm text-zinc-700 mb-1"><strong>New producer registered</strong> – Coastal Seafood Co.</p>
                      <p className="text-xs text-zinc-400">1 hour ago</p>
                    </div>
                  </div>
                  <div className="p-3 border-t border-zinc-100 bg-zinc-50">
                    <button className="w-full text-center text-xs font-medium text-amber-600 hover:text-amber-700">View all notifications</button>
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  setIsNotificationOpen(false);
                }}
                className="w-9 h-9 rounded-lg border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 transition-colors"
              >
                <iconify-icon icon="lucide:search" width="18" className="text-zinc-500" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </button>
              {isSearchOpen && (
                <div className="absolute top-full right-0 mt-2 w-96 bg-white border border-zinc-200 rounded-xl shadow-lg overflow-hidden z-50">
                  <div className="p-4">
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                        <iconify-icon icon="lucide:search" width="18" className="text-zinc-400" style={{ strokeWidth: 1.5, display: 'block' } as React.CSSProperties}></iconify-icon>
                      </div>
                      <input
                        type="text"
                        placeholder="Search producers, products, certificates..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                        autoFocus
                      />
                    </div>
                  </div>
                  {searchQuery && (
                    <div className="border-t border-zinc-100 p-3 text-center">
                      <p className="text-xs text-zinc-500">No results found for "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* Total Producers */}
          <div className="bg-white rounded-xl border border-zinc-200/80 p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-zinc-500 mb-1">Total Producers</p>
                {isLoading ? (
                  <div className="h-8 w-20 bg-zinc-100 rounded animate-pulse"></div>
                ) : (
                  <p className="text-2xl font-semibold text-zinc-900 tracking-tight">
                    {stats?.totalProducers.toLocaleString() || 0}
                  </p>
                )}
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <iconify-icon icon="lucide:users" width="20" className="text-blue-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
            </div>
            {trends && (
              <div className="mt-3 flex items-center gap-1.5">
                <span className={`flex items-center text-xs font-medium ${parseFloat(trends.producerTrend) >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  <iconify-icon icon={parseFloat(trends.producerTrend) >= 0 ? 'lucide:trending-up' : 'lucide:trending-down'} width="14" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  {parseFloat(trends.producerTrend) >= 0 ? '+' : ''}{trends.producerTrend}%
                </span>
                <span className="text-xs text-zinc-400">vs last 3 months</span>
              </div>
            )}
          </div>

          {/* Pending Submissions */}
          <div className="bg-white rounded-xl border border-zinc-200/80 p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-zinc-500 mb-1">Pending Submissions</p>
                {isLoading ? (
                  <div className="h-8 w-20 bg-zinc-100 rounded animate-pulse"></div>
                ) : (
                  <p className="text-2xl font-semibold text-zinc-900 tracking-tight">
                    {stats?.pendingSubmissions.toLocaleString() || 0}
                  </p>
                )}
              </div>
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                <iconify-icon icon="lucide:clock" width="20" className="text-amber-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
            </div>
            {stats && stats.pendingSubmissions > 0 && (
              <div className="mt-3 flex items-center gap-1.5">
                <span className="flex items-center text-xs font-medium text-amber-600">
                  <iconify-icon icon="lucide:alert-circle" width="14" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  {stats.pendingSubmissions} need review
                </span>
              </div>
            )}
          </div>

          {/* Awarded Products */}
          <div className="bg-white rounded-xl border border-zinc-200/80 p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-zinc-500 mb-1">Awarded Products</p>
                {isLoading ? (
                  <div className="h-8 w-20 bg-zinc-100 rounded animate-pulse"></div>
                ) : (
                  <p className="text-2xl font-semibold text-zinc-900 tracking-tight">
                    {stats?.awardedProducts.toLocaleString() || 0}
                  </p>
                )}
              </div>
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                <iconify-icon icon="lucide:trophy" width="20" className="text-emerald-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
            </div>
          </div>

          {/* Certificate Downloads */}
          <div className="bg-white rounded-xl border border-zinc-200/80 p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-zinc-500 mb-1">Total Certificates</p>
                {isLoading ? (
                  <div className="h-8 w-20 bg-zinc-100 rounded animate-pulse"></div>
                ) : (
                  <p className="text-2xl font-semibold text-zinc-900 tracking-tight">
                    {stats?.certificateDownloads.toLocaleString() || 0}
                  </p>
                )}
              </div>
              <div className="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center">
                <iconify-icon icon="lucide:download" width="20" className="text-violet-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
          {/* Monthly Submissions Chart */}
          <div className="bg-white rounded-xl border border-zinc-200/80 p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-semibold text-zinc-900">Monthly Submissions</h3>
                <p className="text-xs text-zinc-400 mt-0.5">Product submissions over time</p>
              </div>
              <select className="text-xs border border-zinc-200 rounded-lg px-2.5 py-1.5 text-zinc-600 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20">
                <option>Last 6 months</option>
                <option>Last 12 months</option>
              </select>
            </div>
            <div className="h-56 flex items-end gap-4 px-4">
              {isLoading ? (
                <div className="w-full flex items-end gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="flex-1 bg-zinc-100 rounded-t-md animate-pulse" style={{ height: `${Math.random() * 100 + 50}px` }}></div>
                  ))}
                </div>
              ) : monthlySubmissions.length > 0 ? (
                monthlySubmissions.map((item, index) => {
                  const maxValue = getMaxSubmissionValue();
                  const height = maxValue > 0 ? (item.count / maxValue) * 180 : 0;
                  const monthShort = new Date(item.month + ' 1, 2024').toLocaleDateString('en-US', { month: 'short' });
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div 
                        className="w-full bg-gradient-to-t from-amber-500 to-amber-400 rounded-t-md transition-all hover:from-amber-600 hover:to-amber-500 cursor-pointer"
                        style={{ height: `${height}px` }}
                        title={`${item.count} submissions`}
                      ></div>
                      <span className="text-xs text-zinc-400">{monthShort}</span>
                    </div>
                  );
                })
              ) : (
                <div className="w-full flex items-center justify-center h-full text-sm text-zinc-400">
                  No data available
                </div>
              )}
            </div>
          </div>

          {/* Monthly Awards Chart */}
          <div className="bg-white rounded-xl border border-zinc-200/80 p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-semibold text-zinc-900">Monthly Awards</h3>
                <p className="text-xs text-zinc-400 mt-0.5">Awards granted by category</p>
              </div>
              <select
                value={awardsChartPeriod}
                onChange={(e) => setAwardsChartPeriod(e.target.value)}
                className="text-xs border border-zinc-200 rounded-lg px-2.5 py-1.5 text-zinc-600 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              >
                <option value="6">Last 6 months</option>
                <option value="12">Last 12 months</option>
              </select>
            </div>
            <div className="h-56 flex items-end gap-3 px-2">
              {isLoading ? (
                <div className="w-full flex items-end gap-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="flex-1 flex gap-1">
                      <div className="w-3 bg-zinc-100 rounded-t animate-pulse" style={{ height: `${Math.random() * 80 + 40}px` }}></div>
                      <div className="w-3 bg-zinc-100 rounded-t animate-pulse" style={{ height: `${Math.random() * 80 + 40}px` }}></div>
                      <div className="w-3 bg-zinc-100 rounded-t animate-pulse" style={{ height: `${Math.random() * 80 + 40}px` }}></div>
                    </div>
                  ))}
                </div>
              ) : monthlyAwards.length > 0 ? (
                monthlyAwards.map((item, index) => {
                  const maxValue = getMaxAwardValue();
                  const monthShort = new Date(item.month + ' 1, 2024').toLocaleDateString('en-US', { month: 'short' });
                  const goldHeight = maxValue > 0 ? (item.gold / maxValue) * 120 : 0;
                  const silverHeight = maxValue > 0 ? (item.silver / maxValue) * 120 : 0;
                  const bronzeHeight = maxValue > 0 ? (item.bronze / maxValue) * 120 : 0;
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex gap-1 items-end justify-center">
                        <div className="w-3 bg-amber-400 rounded-t hover:bg-amber-500 transition-colors cursor-pointer" style={{ height: `${goldHeight}px` }} title={`${item.gold} Gold`}></div>
                        <div className="w-3 bg-zinc-400 rounded-t hover:bg-zinc-500 transition-colors cursor-pointer" style={{ height: `${silverHeight}px` }} title={`${item.silver} Silver`}></div>
                        <div className="w-3 bg-orange-600 rounded-t hover:bg-orange-700 transition-colors cursor-pointer" style={{ height: `${bronzeHeight}px` }} title={`${item.bronze} Bronze`}></div>
                      </div>
                      <span className="text-xs text-zinc-400">{monthShort}</span>
                    </div>
                  );
                })
              ) : (
                <div className="w-full flex items-center justify-center h-full text-sm text-zinc-400">
                  No data available
                </div>
              )}
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <span className="text-xs text-zinc-500">Gold</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-zinc-400"></div>
                <span className="text-xs text-zinc-500">Silver</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-600"></div>
                <span className="text-xs text-zinc-500">Bronze</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-zinc-200/80">
          <div className="flex items-center justify-between p-5 border-b border-zinc-100">
            <div>
              <h3 className="text-sm font-semibold text-zinc-900">Recent Activity</h3>
              <p className="text-xs text-zinc-400 mt-0.5">Latest platform activities</p>
            </div>
            <Link href="/admin/submissions" className="text-xs font-medium text-amber-600 hover:text-amber-700 transition-colors">View all</Link>
          </div>
          <div className="divide-y divide-zinc-100">
            {isLoading ? (
              [1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4 p-4">
                  <div className="w-9 h-9 rounded-full bg-zinc-100 animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-zinc-100 rounded w-3/4 mb-2 animate-pulse"></div>
                    <div className="h-3 bg-zinc-100 rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>
              ))
            ) : recentActivity.length > 0 ? (
              recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-4 hover:bg-zinc-50/50 transition-colors">
                  <div className={`w-9 h-9 rounded-full ${getActivityColor(activity.type)} flex items-center justify-center shrink-0`}>
                    <iconify-icon icon={getActivityIcon(activity.type)} width="18" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-zinc-700">
                      {activity.type === 'submission' && (
                        <>
                          <span className="font-medium text-zinc-900">{activity.title}</span> submitted by {activity.producer}
                        </>
                      )}
                      {activity.type === 'evaluation' && (
                        <>
                          <span className="font-medium text-zinc-900">{activity.title}</span> was evaluated (Score: {activity.score?.toFixed(1)})
                        </>
                      )}
                      {activity.type === 'certificate' && (
                        <>
                          <span className="font-medium text-zinc-900">{activity.title}</span> was awarded {activity.awardLevel} certification
                        </>
                      )}
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      By {activity.producer} • {formatDate(activity.date)}
                    </p>
                  </div>
                  {activity.status && (
                    <span className={`px-2 py-1 text-xs font-medium rounded-full shrink-0 ${
                      activity.status === 'PENDING' ? 'text-amber-700 bg-amber-50' :
                      activity.status === 'CERTIFIED' ? 'text-emerald-700 bg-emerald-50' :
                      activity.status === 'REJECTED' ? 'text-red-700 bg-red-50' :
                      'text-zinc-600 bg-zinc-100'
                    }`}>
                      {activity.status}
                    </span>
                  )}
                  {activity.awardLevel && activity.awardLevel !== 'NONE' && (
                    <span className={`px-2 py-1 text-xs font-medium rounded-full shrink-0 ${
                      activity.awardLevel === 'GOLD' ? 'text-amber-700 bg-amber-50' :
                      activity.awardLevel === 'SILVER' ? 'text-zinc-600 bg-zinc-100' :
                      'text-orange-700 bg-orange-50'
                    }`}>
                      {activity.awardLevel}
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-sm text-zinc-400">
                No recent activity
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
