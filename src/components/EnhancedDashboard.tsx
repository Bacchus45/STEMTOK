import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  Coins, 
  TrendingUp, 
  Activity, 
  Eye, 
  Heart, 
  MessageCircle,
  Share2,
  Mic,
  Calendar,
  Target,
  Zap,
  Star,
  Gift,
  Crown,
  Shield,
  Globe,
  Smartphone,
  Monitor,
  Headphones,
  Camera,
  Settings
} from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  monthlyGrowth: number;
  voicePosts: number;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    averageTime: string;
  };
  userStats: {
    newUsers: number;
    returningUsers: number;
    churnRate: number;
  };
  contentStats: {
    totalPosts: number;
    voiceToTextRatio: number;
    averagePostLength: number;
  };
}

interface EnhancedDashboardProps {
  userBalance: number;
  totalTransactions: number;
  userCoins: any[];
  onNavigate: (view: string) => void;
}

export const EnhancedDashboard: React.FC<EnhancedDashboardProps> = ({
  userBalance,
  totalTransactions,
  userCoins,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'users' | 'content'>('overview');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalUsers: 15847,
    activeUsers: 12453,
    totalRevenue: 248750,
    monthlyGrowth: 23.5,
    voicePosts: 34892,
    engagement: {
      likes: 189432,
      comments: 56784,
      shares: 34291,
      averageTime: '4m 32s'
    },
    userStats: {
      newUsers: 2847,
      returningUsers: 9606,
      churnRate: 8.3
    },
    contentStats: {
      totalPosts: 52847,
      voiceToTextRatio: 66.2,
      averagePostLength: 147
    }
  });

  const [realtimeData, setRealtimeData] = useState({
    currentActiveUsers: 1247,
    liveStreams: 34,
    messagesPerMinute: 156,
    coinsTransferred: 4832
  });

  const [chartData, setChartData] = useState<number[]>([]);

  useEffect(() => {
    // Generate mock chart data
    const data = Array.from({ length: 30 }, (_, i) => 
      Math.floor(Math.random() * 100) + 50 + Math.sin(i * 0.1) * 20
    );
    setChartData(data);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setRealtimeData(prev => ({
        currentActiveUsers: prev.currentActiveUsers + Math.floor(Math.random() * 20) - 10,
        liveStreams: Math.max(0, prev.liveStreams + Math.floor(Math.random() * 6) - 3),
        messagesPerMinute: prev.messagesPerMinute + Math.floor(Math.random() * 30) - 15,
        coinsTransferred: prev.coinsTransferred + Math.floor(Math.random() * 100)
      }));

      setDashboardStats(prev => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 5,
        totalRevenue: prev.totalRevenue + Math.floor(Math.random() * 500),
        engagement: {
          ...prev.engagement,
          likes: prev.engagement.likes + Math.floor(Math.random() * 50),
          comments: prev.engagement.comments + Math.floor(Math.random() * 20),
          shares: prev.engagement.shares + Math.floor(Math.random() * 15)
        }
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    change?: number;
    icon: React.ReactNode;
    color: string;
    subtitle?: string;
    realtime?: boolean;
  }> = ({ title, value, change, icon, color, subtitle, realtime = false }) => (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 relative overflow-hidden"
    >
      {realtime && (
        <div className="absolute top-2 right-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        </div>
      )}
      
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-r ${color}`}>
          {icon}
        </div>
        {change !== undefined && (
          <div className={`flex items-center space-x-1 text-sm ${
            change >= 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            <TrendingUp className={`w-3 h-3 ${change < 0 ? 'rotate-180' : ''}`} />
            <span>{Math.abs(change).toFixed(1)}%</span>
          </div>
        )}
      </div>
      
      <div>
        <p className="text-2xl font-bold text-white mb-1">
          {typeof value === 'number' ? formatNumber(value) : value}
        </p>
        <p className="text-white/60 text-sm">{title}</p>
        {subtitle && (
          <p className="text-white/40 text-xs mt-1">{subtitle}</p>
        )}
      </div>
    </motion.div>
  );

  const QuickActionCard: React.FC<{
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    action: () => void;
  }> = ({ title, description, icon, color, action }) => (
    <motion.div
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      onClick={action}
      className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 cursor-pointer hover:bg-white/15 transition-all"
    >
      <div className={`p-3 rounded-lg bg-gradient-to-r ${color} mb-3`}>
        {icon}
      </div>
      <h3 className="font-bold text-white mb-1">{title}</h3>
      <p className="text-white/70 text-sm">{description}</p>
    </motion.div>
  );

  return (
    <div className="space-y-6 font-inter">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white font-space">Enhanced Dashboard</h1>
              <p className="text-white/70">Complete platform overview and user management</p>
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="flex space-x-2">
            {['7d', '30d', '90d', '1y'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  timeRange === range
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4">
          {[
            { id: 'overview', name: 'Overview', icon: <Eye className="w-4 h-4" /> },
            { id: 'analytics', name: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
            { id: 'users', name: 'Users', icon: <Users className="w-4 h-4" /> },
            { id: 'content', name: 'Content', icon: <Mic className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white/20 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/15'
              }`}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Users"
              value={dashboardStats.totalUsers}
              change={dashboardStats.monthlyGrowth}
              icon={<Users className="w-6 h-6 text-white" />}
              color="from-blue-500 to-cyan-600"
            />
            <StatCard
              title="Active Users"
              value={dashboardStats.activeUsers}
              change={12.8}
              icon={<Activity className="w-6 h-6 text-white" />}
              color="from-green-500 to-emerald-600"
              realtime={true}
            />
            <StatCard
              title="Revenue"
              value={formatCurrency(dashboardStats.totalRevenue)}
              change={18.4}
              icon={<Coins className="w-6 h-6 text-white" />}
              color="from-yellow-500 to-orange-600"
            />
            <StatCard
              title="Voice Posts"
              value={dashboardStats.voicePosts}
              change={25.7}
              icon={<Mic className="w-6 h-6 text-white" />}
              color="from-purple-500 to-pink-600"
            />
          </div>

          {/* Real-time Activity */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-6 font-space flex items-center">
              <Activity className="w-5 h-5 mr-2 text-green-400" />
              Real-time Activity
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white/5 p-4 rounded-lg text-center">
                <p className="text-white/60 text-sm">Active Now</p>
                <p className="text-2xl font-bold text-green-400">{formatNumber(realtimeData.currentActiveUsers)}</p>
                <div className="w-2 h-2 bg-green-400 rounded-full mx-auto mt-2 animate-pulse" />
              </div>
              <div className="bg-white/5 p-4 rounded-lg text-center">
                <p className="text-white/60 text-sm">Live Streams</p>
                <p className="text-2xl font-bold text-red-400">{realtimeData.liveStreams}</p>
                <p className="text-xs text-white/50 mt-1">Voice sessions</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg text-center">
                <p className="text-white/60 text-sm">Messages/Min</p>
                <p className="text-2xl font-bold text-blue-400">{realtimeData.messagesPerMinute}</p>
                <p className="text-xs text-white/50 mt-1">Platform-wide</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg text-center">
                <p className="text-white/60 text-sm">Coins Transferred</p>
                <p className="text-2xl font-bold text-yellow-400">{formatNumber(realtimeData.coinsTransferred)}</p>
                <p className="text-xs text-white/50 mt-1">Last hour</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <QuickActionCard
              title="Voice Studio"
              description="Record and manage voice content"
              icon={<Mic className="w-5 h-5 text-white" />}
              color="from-purple-500 to-pink-600"
              action={() => onNavigate('studio')}
            />
            <QuickActionCard
              title="User Analytics"
              description="Detailed user behavior insights"
              icon={<Users className="w-5 h-5 text-white" />}
              color="from-blue-500 to-cyan-600"
              action={() => setActiveTab('users')}
            />
            <QuickActionCard
              title="Content Management"
              description="Manage posts and moderation"
              icon={<MessageCircle className="w-5 h-5 text-white" />}
              color="from-green-500 to-emerald-600"
              action={() => setActiveTab('content')}
            />
            <QuickActionCard
              title="Trading Interface"
              description="Access coin trading features"
              icon={<TrendingUp className="w-5 h-5 text-white" />}
              color="from-yellow-500 to-orange-600"
              action={() => onNavigate('trading')}
            />
          </div>

          {/* Your Performance */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-6 font-space">Your Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 p-4 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <Coins className="w-8 h-8 text-yellow-400" />
                  <div>
                    <p className="text-white font-bold text-xl">{userBalance}</p>
                    <p className="text-white/60 text-sm">Total Coins</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Earned:</span>
                    <span className="text-green-400">+{userBalance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Transactions:</span>
                    <span className="text-white">{totalTransactions}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 p-4 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <Star className="w-8 h-8 text-purple-400" />
                  <div>
                    <p className="text-white font-bold text-xl">{userCoins.length}</p>
                    <p className="text-white/60 text-sm">Created Coins</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Active:</span>
                    <span className="text-green-400">{userCoins.filter(c => !c.seasonal || (c.seasonal && new Date() >= new Date(c.startDate!) && new Date() <= new Date(c.endDate!))).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Seasonal:</span>
                    <span className="text-blue-400">{userCoins.filter(c => c.seasonal).length}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 p-4 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <Crown className="w-8 h-8 text-yellow-400" />
                  <div>
                    <p className="text-white font-bold text-xl">#247</p>
                    <p className="text-white/60 text-sm">Global Rank</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Level:</span>
                    <span className="text-yellow-400">Creator Pro</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Next:</span>
                    <span className="text-purple-400">Elite</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Engagement Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 font-space">Engagement Breakdown</h3>
              <div className="space-y-4">
                {[
                  { name: 'Likes', value: dashboardStats.engagement.likes, color: 'from-red-500 to-rose-600', icon: <Heart className="w-5 h-5" /> },
                  { name: 'Comments', value: dashboardStats.engagement.comments, color: 'from-blue-500 to-cyan-600', icon: <MessageCircle className="w-5 h-5" /> },
                  { name: 'Shares', value: dashboardStats.engagement.shares, color: 'from-green-500 to-emerald-600', icon: <Share2 className="w-5 h-5" /> }
                ].map((metric) => (
                  <div key={metric.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${metric.color}`}>
                          {metric.icon}
                        </div>
                        <span className="text-white font-medium">{metric.name}</span>
                      </div>
                      <span className="text-white font-bold">{formatNumber(metric.value)}</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div 
                        className={`bg-gradient-to-r ${metric.color} h-2 rounded-full transition-all`}
                        style={{ width: `${(metric.value / Math.max(dashboardStats.engagement.likes, dashboardStats.engagement.comments, dashboardStats.engagement.shares)) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Analytics */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 font-space">Content Analytics</h3>
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/70">Voice vs Text Posts</span>
                    <span className="text-purple-400 font-bold">{dashboardStats.contentStats.voiceToTextRatio}% Voice</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full"
                      style={{ width: `${dashboardStats.contentStats.voiceToTextRatio}%` }}
                    />
                  </div>
                </div>
                
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Total Posts</span>
                    <span className="text-white font-bold">{formatNumber(dashboardStats.contentStats.totalPosts)}</span>
                  </div>
                </div>
                
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Avg Post Length</span>
                    <span className="text-white font-bold">{dashboardStats.contentStats.averagePostLength} chars</span>
                  </div>
                </div>
                
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Avg Session Time</span>
                    <span className="text-white font-bold">{dashboardStats.engagement.averageTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Chart */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 font-space">Platform Activity ({timeRange})</h3>
            <div className="h-64 flex items-end space-x-2">
              {chartData.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ height: 0 }}
                  animate={{ height: `${(value / Math.max(...chartData)) * 100}%` }}
                  transition={{ delay: index * 0.02 }}
                  className="flex-1 bg-gradient-to-t from-purple-500 to-pink-400 rounded-t-sm opacity-80 hover:opacity-100 transition-opacity"
                  style={{ minHeight: '8px' }}
                />
              ))}
            </div>
            <div className="flex justify-between text-white/60 text-sm mt-4">
              <span>{timeRange === '7d' ? '7 days ago' : timeRange === '30d' ? '30 days ago' : timeRange === '90d' ? '90 days ago' : '1 year ago'}</span>
              <span>Today</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* User Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="New Users"
              value={dashboardStats.userStats.newUsers}
              change={15.2}
              icon={<Users className="w-6 h-6 text-white" />}
              color="from-green-500 to-emerald-600"
              subtitle="This month"
            />
            <StatCard
              title="Returning Users"
              value={dashboardStats.userStats.returningUsers}
              change={8.7}
              icon={<Activity className="w-6 h-6 text-white" />}
              color="from-blue-500 to-cyan-600"
              subtitle="This month"
            />
            <StatCard
              title="Churn Rate"
              value={`${dashboardStats.userStats.churnRate}%`}
              change={-2.3}
              icon={<TrendingUp className="w-6 h-6 text-white" />}
              color="from-red-500 to-rose-600"
              subtitle="Monthly average"
            />
          </div>

          {/* User Demographics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 font-space">User Demographics</h3>
              <div className="space-y-4">
                {[
                  { label: 'Age 18-24', percentage: 28, color: 'from-purple-500 to-pink-600' },
                  { label: 'Age 25-34', percentage: 35, color: 'from-blue-500 to-cyan-600' },
                  { label: 'Age 35-44', percentage: 22, color: 'from-green-500 to-emerald-600' },
                  { label: 'Age 45+', percentage: 15, color: 'from-yellow-500 to-orange-600' }
                ].map((demo) => (
                  <div key={demo.label} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white/70">{demo.label}</span>
                      <span className="text-white font-bold">{demo.percentage}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div 
                        className={`bg-gradient-to-r ${demo.color} h-2 rounded-full`}
                        style={{ width: `${demo.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 font-space">Device Usage</h3>
              <div className="space-y-4">
                {[
                  { device: 'Mobile', percentage: 68, icon: <Smartphone className="w-4 h-4" />, color: 'from-green-500 to-emerald-600' },
                  { device: 'Desktop', percentage: 25, icon: <Monitor className="w-4 h-4" />, color: 'from-blue-500 to-cyan-600' },
                  { device: 'Tablet', percentage: 7, icon: <Settings className="w-4 h-4" />, color: 'from-purple-500 to-pink-600' }
                ].map((device) => (
                  <div key={device.device} className="flex items-center justify-between bg-white/5 p-3 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${device.color}`}>
                        {device.icon}
                      </div>
                      <span className="text-white">{device.device}</span>
                    </div>
                    <span className="text-white font-bold">{device.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Content Tab */}
      {activeTab === 'content' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Content Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard
              title="Total Posts"
              value={dashboardStats.contentStats.totalPosts}
              change={12.4}
              icon={<MessageCircle className="w-6 h-6 text-white" />}
              color="from-blue-500 to-cyan-600"
            />
            <StatCard
              title="Voice Posts"
              value={dashboardStats.voicePosts}
              change={25.7}
              icon={<Mic className="w-6 h-6 text-white" />}
              color="from-purple-500 to-pink-600"
            />
            <StatCard
              title="Avg Engagement"
              value="8.5%"
              change={5.2}
              icon={<Heart className="w-6 h-6 text-white" />}
              color="from-red-500 to-rose-600"
            />
            <StatCard
              title="Content Quality"
              value="94.2%"
              change={2.1}
              icon={<Star className="w-6 h-6 text-white" />}
              color="from-yellow-500 to-orange-600"
            />
          </div>

          {/* Top Content */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 font-space">Top Performing Content</h3>
            <div className="space-y-3">
              {[
                { title: 'Voice: Future of Crypto Payments', author: 'Sarah Chen', engagement: 2847, type: 'voice' },
                { title: 'Building Decentralized Social Networks', author: 'Mike Johnson', engagement: 1956, type: 'voice' },
                { title: 'STEM Research: Quantum Computing', author: 'Alex Rivera', engagement: 1743, type: 'text' },
                { title: 'Voice: J.J. NELL Red Lighter Discovery', author: 'J.J. NELL', engagement: 3291, type: 'voice' },
                { title: 'Creating Seasonal Cryptocurrency', author: 'Emma Watson', engagement: 1432, type: 'text' }
              ].map((content, index) => (
                <div key={index} className="flex items-center justify-between bg-white/5 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      content.type === 'voice' ? 'bg-purple-500' : 'bg-blue-500'
                    }`}>
                      {content.type === 'voice' ? <Mic className="w-5 h-5 text-white" /> : <MessageCircle className="w-5 h-5 text-white" />}
                    </div>
                    <div>
                      <p className="text-white font-medium">{content.title}</p>
                      <p className="text-white/60 text-sm">by {content.author}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">{formatNumber(content.engagement)}</p>
                    <p className="text-white/60 text-xs">engagements</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 font-space">Content Categories</h3>
              <div className="space-y-3">
                {[
                  { category: 'Crypto Discussion', posts: 12847, color: 'from-yellow-500 to-orange-600' },
                  { category: 'Voice Stories', posts: 8934, color: 'from-purple-500 to-pink-600' },
                  { category: 'STEM Research', posts: 5672, color: 'from-blue-500 to-cyan-600' },
                  { category: 'Community Updates', posts: 3421, color: 'from-green-500 to-emerald-600' }
                ].map((cat) => (
                  <div key={cat.category} className="flex items-center justify-between">
                    <span className="text-white/70">{cat.category}</span>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${cat.color}`} />
                      <span className="text-white font-bold">{formatNumber(cat.posts)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 font-space">Moderation Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Posts Reviewed</span>
                  <span className="text-white font-bold">2,847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Auto-Approved</span>
                  <span className="text-green-400 font-bold">94.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Flagged Content</span>
                  <span className="text-yellow-400 font-bold">3.1%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Removed</span>
                  <span className="text-red-400 font-bold">2.7%</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};