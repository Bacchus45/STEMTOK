import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Share2, 
  Smartphone, 
  Globe, 
  Link, 
  CheckCircle, 
  AlertCircle,
  Download,
  Upload,
  Settings,
  Users,
  Video,
  Camera,
  Music,
  Zap,
  Star,
  Crown,
  Shield
} from 'lucide-react';

interface SocialPlugin {
  id: string;
  name: string;
  platform: 'tiktok' | 'meta' | 'instagram' | 'facebook';
  description: string;
  features: string[];
  status: 'available' | 'connected' | 'pending';
  icon: React.ReactNode;
  color: string;
  downloadUrl: string;
  compatibility: string[];
}

interface SocialPluginsProps {
  onPluginInstall: (plugin: SocialPlugin) => void;
  onPluginConnect: (plugin: SocialPlugin) => void;
}

export const SocialPlugins: React.FC<SocialPluginsProps> = ({
  onPluginInstall,
  onPluginConnect
}) => {
  const [activeTab, setActiveTab] = useState<'available' | 'connected' | 'settings'>('available');
  const [selectedPlugin, setSelectedPlugin] = useState<SocialPlugin | null>(null);

  const [plugins] = useState<SocialPlugin[]>([
    {
      id: 'tiktok-plugin',
      name: 'TikTok Voice Bridge',
      platform: 'tiktok',
      description: 'Share your SocialCoin voice posts directly to TikTok with automatic video generation and crypto rewards tracking.',
      features: [
        'Auto-convert voice posts to TikTok videos',
        'Sync SocialCoin rewards with TikTok engagement',
        'Cross-platform voice analytics',
        'Automatic hashtag optimization',
        'Crypto tip integration on TikTok',
        'Voice-to-video AI conversion'
      ],
      status: 'available',
      icon: <Video className="w-6 h-6" />,
      color: 'from-pink-500 to-red-600',
      downloadUrl: 'https://plugins.socialcoin.com/tiktok-bridge.zip',
      compatibility: ['iOS', 'Android', 'Web']
    },
    {
      id: 'meta-facebook-plugin',
      name: 'Meta Facebook Connector',
      platform: 'facebook',
      description: 'Seamlessly share voice content to Facebook with integrated cryptocurrency features and community building tools.',
      features: [
        'Share voice posts to Facebook Stories & Feed',
        'Facebook Groups integration for coin communities',
        'Cross-platform user verification',
        'Meta Pay integration for crypto transactions',
        'Facebook Live streaming with voice features',
        'Automated community management'
      ],
      status: 'available',
      icon: <Globe className="w-6 h-6" />,
      color: 'from-blue-500 to-indigo-600',
      downloadUrl: 'https://plugins.socialcoin.com/meta-facebook.zip',
      compatibility: ['Web', 'Mobile Web', 'Facebook App']
    },
    {
      id: 'meta-instagram-plugin',
      name: 'Meta Instagram Hub',
      platform: 'instagram',
      description: 'Transform voice posts into Instagram Stories and Reels with automatic visual generation and crypto integration.',
      features: [
        'Voice-to-Instagram Stories conversion',
        'Auto-generate Reels from voice content',
        'Instagram Shopping for coin purchases',
        'Story highlights for seasonal coins',
        'Instagram Live with voice features',
        'Influencer collaboration tools'
      ],
      status: 'connected',
      icon: <Camera className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-600',
      downloadUrl: 'https://plugins.socialcoin.com/meta-instagram.zip',
      compatibility: ['iOS', 'Android', 'Web']
    },
    {
      id: 'universal-meta-plugin',
      name: 'Universal Meta Suite',
      platform: 'meta',
      description: 'Complete Meta ecosystem integration including Facebook, Instagram, WhatsApp, and Threads with unified crypto features.',
      features: [
        'Multi-platform content distribution',
        'Unified Meta identity verification',
        'Cross-platform crypto wallet integration',
        'Meta AI integration for content optimization',
        'WhatsApp Business crypto payments',
        'Threads community management'
      ],
      status: 'pending',
      icon: <Crown className="w-6 h-6" />,
      color: 'from-gradient-to-r from-blue-600 via-purple-600 to-pink-600',
      downloadUrl: 'https://plugins.socialcoin.com/universal-meta.zip',
      compatibility: ['All Platforms', 'Meta Ecosystem']
    }
  ]);

  const handleInstallPlugin = (plugin: SocialPlugin) => {
    onPluginInstall(plugin);
    // Simulate installation process
    setTimeout(() => {
      setSelectedPlugin(null);
    }, 2000);
  };

  const handleConnectPlugin = (plugin: SocialPlugin) => {
    onPluginConnect(plugin);
    // Simulate connection process
    setTimeout(() => {
      setSelectedPlugin(null);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-400';
      case 'pending': return 'text-yellow-400';
      case 'available': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'available': return <Download className="w-4 h-4" />;
      default: return <Download className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6 font-inter">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
      >
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl">
            <Share2 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white font-space">Social Media Plugins</h2>
            <p className="text-white/70">Connect TikTok & Meta for cross-platform compatibility</p>
          </div>
        </div>

        {/* Cross-Platform Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-white/60 text-sm">Available Plugins</p>
            <p className="text-xl font-bold text-blue-400">{plugins.filter(p => p.status === 'available').length}</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-white/60 text-sm">Connected</p>
            <p className="text-xl font-bold text-green-400">{plugins.filter(p => p.status === 'connected').length}</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-white/60 text-sm">Pending</p>
            <p className="text-xl font-bold text-yellow-400">{plugins.filter(p => p.status === 'pending').length}</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-white/60 text-sm">Platforms</p>
            <p className="text-xl font-bold text-purple-400">4</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4">
          {[
            { id: 'available', name: 'Available Plugins', icon: <Download className="w-4 h-4" /> },
            { id: 'connected', name: 'Connected', icon: <CheckCircle className="w-4 h-4" /> },
            { id: 'settings', name: 'Settings', icon: <Settings className="w-4 h-4" /> }
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

      {/* Available Plugins Tab */}
      {activeTab === 'available' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {plugins.map((plugin, index) => (
            <motion.div
              key={plugin.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${plugin.color}`}>
                  {plugin.icon}
                </div>
                <div className="flex items-center space-x-1">
                  <span className={`text-sm font-bold ${getStatusColor(plugin.status)}`}>
                    {plugin.status.toUpperCase()}
                  </span>
                  {getStatusIcon(plugin.status)}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 font-space">
                {plugin.name}
              </h3>
              <p className="text-white/70 text-sm mb-4 leading-relaxed">
                {plugin.description}
              </p>

              {/* Features */}
              <div className="mb-4">
                <h4 className="font-bold text-white mb-2 text-sm">Features:</h4>
                <div className="space-y-1">
                  {plugin.features.slice(0, 3).map((feature, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                      <span className="text-white/70 text-xs">{feature}</span>
                    </div>
                  ))}
                  {plugin.features.length > 3 && (
                    <div className="text-white/50 text-xs">
                      +{plugin.features.length - 3} more features
                    </div>
                  )}
                </div>
              </div>

              {/* Compatibility */}
              <div className="mb-4">
                <h4 className="font-bold text-white mb-2 text-sm">Compatibility:</h4>
                <div className="flex flex-wrap gap-1">
                  {plugin.compatibility.map((platform, i) => (
                    <span key={i} className="text-xs bg-white/10 px-2 py-1 rounded-full text-white/70">
                      {platform}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                {plugin.status === 'available' && (
                  <>
                    <button
                      onClick={() => handleInstallPlugin(plugin)}
                      className="flex-1 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all text-sm font-medium"
                    >
                      Install Plugin
                    </button>
                    <button
                      onClick={() => setSelectedPlugin(plugin)}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                  </>
                )}
                
                {plugin.status === 'connected' && (
                  <button className="w-full py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg text-sm font-medium">
                    Manage Connection
                  </button>
                )}
                
                {plugin.status === 'pending' && (
                  <button
                    onClick={() => handleConnectPlugin(plugin)}
                    className="w-full py-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-lg hover:from-yellow-600 hover:to-orange-700 transition-all text-sm font-medium"
                  >
                    Complete Setup
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Connected Plugins Tab */}
      {activeTab === 'connected' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {plugins.filter(p => p.status === 'connected').map((plugin) => (
            <div key={plugin.id} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${plugin.color}`}>
                    {plugin.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{plugin.name}</h3>
                    <p className="text-white/60 text-sm">Connected & Active</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all text-sm">
                    Configure
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-lg hover:from-red-600 hover:to-rose-700 transition-all text-sm">
                    Disconnect
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {plugins.filter(p => p.status === 'connected').length === 0 && (
            <div className="text-center py-8">
              <Link className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No Connected Plugins</h3>
              <p className="text-white/70">Install and connect plugins to see them here</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-bold text-white mb-4 font-space">Plugin Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-white">Auto-sync Content</h4>
                <p className="text-white/60 text-sm">Automatically share voice posts across connected platforms</p>
              </div>
              <button className="w-12 h-6 bg-green-500 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5" />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-white">Cross-platform Analytics</h4>
                <p className="text-white/60 text-sm">Track engagement across all connected platforms</p>
              </div>
              <button className="w-12 h-6 bg-green-500 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5" />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-white">Unified Notifications</h4>
                <p className="text-white/60 text-sm">Receive notifications from all platforms in one place</p>
              </div>
              <button className="w-12 h-6 bg-white/20 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Plugin Detail Modal */}
      <AnimatePresence>
        {selectedPlugin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPlugin(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl w-full border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-4 rounded-xl bg-gradient-to-r ${selectedPlugin.color}`}>
                    {selectedPlugin.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white font-space">{selectedPlugin.name}</h2>
                    <p className="text-white/70">{selectedPlugin.platform.toUpperCase()} Integration</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPlugin(null)}
                  className="text-white/70 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <p className="text-white/80 leading-relaxed mb-6">
                {selectedPlugin.description}
              </p>

              <div className="mb-6">
                <h3 className="font-bold text-white mb-3">Complete Feature List:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedPlugin.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-white/80 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleInstallPlugin(selectedPlugin)}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all font-medium"
              >
                Install {selectedPlugin.name}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};