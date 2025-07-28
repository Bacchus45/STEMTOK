import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Mic, 
  Coins, 
  Calendar,
  Target,
  Zap,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  BarChart3,
  PieChart,
  Activity,
  Star,
  Database,
  Server,
  Cpu
} from 'lucide-react';
import { SparkDataProcessor } from './SparkDataProcessor';

interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  totalPosts: number;
  voicePosts: number;
  totalCoins: number;
  coinsEarned: number;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
  growth: {
    users: number;
    posts: number;
    engagement: number;
  };
}

interface DashboardAnalyticsProps {
  userBalance: number;
  totalTransactions: number;
}

export const DashboardAnalytics: React.FC<DashboardAnalyticsProps> = ({
  userBalance,
  totalTransactions
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'engagement' | 'growth' | 'performance'>('overview');
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | '90d'>('7d');
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalUsers: 12847,
    activeUsers: 8932,
    totalPosts: 45632,
    voicePosts: 28945,
    totalCoins: 2847293,
    coinsEarned: userBalance,
    engagement: {
      likes: 156438,
      comments: 43292,
      shares: 28947
    },
    growth: {
      users: 12.5,
      posts: 18.7,
      engagement: 23.4
    }
  });

  const [chartData, setChartData] = useState<number[]>([]);

  useEffect(() => {
    // Generate mock chart data
    const data = Array.from({ length: 30 }, (_, i) => 
      Math.floor(Math.random() * 100) + 50 + Math.sin(i * 0.1) * 20
    );
    setChartData(data);

    // Update analytics data periodically
    const interval = setInterval(() => {
      setAnalytics(prev => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 5,
        totalPosts: prev.totalPosts + Math.floor(Math.random() * 5),
        engagement: {
          likes: prev.engagement.likes + Math.floor(Math.random() * 50),
          comments: prev.engagement.comments + Math.floor(Math.random() * 20),
          shares: prev.engagement.shares + Math.floor(Math.random() * 15)
        }
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, [timeRange]);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    change?: number;
    icon: React.ReactNode;
    color: string;
  }> = ({ title, value, change, icon, color }) => (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-r ${color}`}>
          {icon}
        </div>
        {change && (
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
      </div>
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
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white font-space">Analytics Dashboard</h2>
              <p className="text-white/70">Comprehensive platform insights and metrics</p>
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="flex space-x-2">
            {['24h', '7d', '30d', '90d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range as any)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                  timeRange === range
                    ? 'bg-blue-500 text-white'
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
            { id: 'engagement', name: 'Engagement', icon: <Heart className="w-4 h-4" /> },
            { id: 'growth', name: 'Growth', icon: <TrendingUp className="w-4 h-4" /> },
            { id: 'performance', name: 'Performance', icon: <Target className="w-4 h-4" /> }
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
              value={analytics.totalUsers}
              change={analytics.growth.users}
              icon={<Users className="w-6 h-6 text-white" />}
              color="from-purple-500 to-pink-600"
            />
            <StatCard
              title="Active Users"
              value={analytics.activeUsers}
              change={8.2}
              icon={<Activity className="w-6 h-6 text-white" />}
              color="from-green-500 to-emerald-600"
            />
            <StatCard
              title="Voice Posts"
              value={analytics.voicePosts}
              change={analytics.growth.posts}
              icon={<Mic className="w-6 h-6 text-white" />}
              color="from-blue-500 to-cyan-600"
            />
            <StatCard
              title="Total Coins"
              value={analytics.totalCoins}
              change={15.7}
              icon={<Coins className="w-6 h-6 text-white" />}
              color="from-yellow-500 to-orange-600"
            />
          </div>

          {/* Apache Spark Integration */}
          <SparkDataProcessor
            onJobComplete={(job) => {
              console.log('Spark job completed:', job);
            }}
            onDataStream={(data) => {
              console.log('Stream data received:', data);
            }}
          />

          {/* Chart */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 font-space">Platform Activity</h3>
            <div className="h-64 flex items-end space-x-2">
              {chartData.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ height: 0 }}
                  animate={{ height: `${(value / Math.max(...chartData)) * 100}%` }}
                  transition={{ delay: index * 0.02 }}
                  className="flex-1 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-sm opacity-80 hover:opacity-100 transition-opacity"
                  style={{ minHeight: '8px' }}
                />
              ))}
            </div>
            <div className="flex justify-between text-white/60 text-sm mt-4">
              <span>30 days ago</span>
              <span>Today</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h4 className="font-bold text-white mb-4">Engagement Breakdown</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-red-400" />
                    <span className="text-white/70">Likes</span>
                  </div>
                  <span className="text-white font-bold">{formatNumber(analytics.engagement.likes)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4 text-blue-400" />
                    <span className="text-white/70">Comments</span>
                  </div>
                  <span className="text-white font-bold">{formatNumber(analytics.engagement.comments)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Share2 className="w-4 h-4 text-green-400" />
                    <span className="text-white/70">Shares</span>
                  </div>
                  <span className="text-white font-bold">{formatNumber(analytics.engagement.shares)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h4 className="font-bold text-white mb-4">Your Performance</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Coins Earned</span>
                  <span className="text-green-400 font-bold">{userBalance}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Transactions</span>
                  <span className="text-white font-bold">{totalTransactions}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Rank</span>
                  <span className="text-yellow-400 font-bold">#247</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h4 className="font-bold text-white mb-4">Platform Health</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Uptime</span>
                  <span className="text-green-400 font-bold">99.9%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Response Time</span>
                  <span className="text-white font-bold">45ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Success Rate</span>
                  <span className="text-green-400 font-bold">98.7%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">NELL's Red Lighters</span>
                  <span className="text-red-400 font-bold">47 🔥</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Research Boost</span>
                  <span className="text-yellow-400 font-bold">+25% active</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Engagement Tab */}
      {activeTab === 'engagement' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Engagement Metrics */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 font-space">Engagement Metrics</h3>
              
              <div className="space-y-4">
                {[
                  { name: 'Likes', value: analytics.engagement.likes, color: 'from-red-500 to-rose-600', icon: <Heart className="w-5 h-5" /> },
                  { name: 'Comments', value: analytics.engagement.comments, color: 'from-blue-500 to-cyan-600', icon: <MessageCircle className="w-5 h-5" /> },
                  { name: 'Shares', value: analytics.engagement.shares, color: 'from-green-500 to-emerald-600', icon: <Share2 className="w-5 h-5" /> }
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
                        style={{ width: `${(metric.value / Math.max(analytics.engagement.likes, analytics.engagement.comments, analytics.engagement.shares)) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Performing Content */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 font-space">Top Performing Content</h3>
              
              <div className="space-y-3">
                {[
                  { title: 'Voice Post: Future of Crypto', engagement: 1247, type: 'voice' },
                  { title: 'Building Decentralized Apps', engagement: 892, type: 'text' },
                  { title: 'Voice: Season Coin Launch', engagement: 756, type: 'voice' },
                  { title: 'Community Guidelines Update', engagement: 643, type: 'text' }
                ].map((content, index) => (
                  <div key={index} className="flex items-center justify-between bg-white/5 p-3 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        content.type === 'voice' ? 'bg-purple-500' : 'bg-blue-500'
                      }`}>
                        {content.type === 'voice' ? <Mic className="w-4 h-4 text-white" /> : <MessageCircle className="w-4 h-4 text-white" />}
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{content.title}</p>
                        <p className="text-white/60 text-xs">{content.engagement} engagements</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Award className="w-4 h-4 text-yellow-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Growth Tab */}
      {activeTab === 'growth' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="User Growth"
              value={`+${analytics.growth.users}%`}
              icon={<Users className="w-6 h-6 text-white" />}
              color="from-purple-500 to-pink-600"
            />
            <StatCard
              title="Content Growth"
              value={`+${analytics.growth.posts}%`}
              icon={<Mic className="w-6 h-6 text-white" />}
              color="from-green-500 to-emerald-600"
            />
            <StatCard
              title="Engagement Growth"
              value={`+${analytics.growth.engagement}%`}
              icon={<Heart className="w-6 h-6 text-white" />}
              color="from-red-500 to-rose-600"
            />
          </div>

          {/* Growth Chart */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 font-space">Growth Trends</h3>
            <div className="h-64 relative">
              {/* Simulated growth lines */}
              <svg className="w-full h-full">
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
                <polyline
                  fill="none"
                  stroke="url(#gradient1)"
                  strokeWidth="3"
                  points={chartData.map((value, index) => 
                    `${(index / (chartData.length - 1)) * 100}%,${100 - (value / Math.max(...chartData)) * 80}%`
                  ).join(' ')}
                />
              </svg>
            </div>
          </div>
        </motion.div>
      )}

      {/* Performance Tab */}
      {activeTab === 'performance' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 font-space">Performance Metrics</h3>
              
              <div className="space-y-4">
                {[
                  { name: 'Average Session Time', value: '12m 34s', trend: '+5.2%' },
                  { name: 'Bounce Rate', value: '23.4%', trend: '-2.1%' },
                  { name: 'Page Load Time', value: '1.2s', trend: '-15.3%' },
                  { name: 'API Response Time', value: '45ms', trend: '-8.7%' }
                ].map((metric, index) => (
                  <div key={index} className="flex items-center justify-between bg-white/5 p-3 rounded-lg">
                    <span className="text-white/70">{metric.name}</span>
                    <div className="text-right">
                      <p className="text-white font-bold">{metric.value}</p>
                      <p className={`text-xs ${metric.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                        {metric.trend}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 font-space">System Status</h3>
              
              <div className="space-y-4">
                {[
                  { name: 'API Uptime', status: 'Operational', color: 'text-green-400' },
                  { name: 'Database', status: 'Operational', color: 'text-green-400' },
                  { name: 'Voice Processing', status: 'Operational', color: 'text-green-400' },
                  { name: 'File Storage', status: 'Operational', color: 'text-green-400' }
                ].map((service, index) => (
                  <div key={index} className="flex items-center justify-between bg-white/5 p-3 rounded-lg">
                    <span className="text-white/70">{service.name}</span>
                    <span className={`font-bold ${service.color}`}>{service.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};