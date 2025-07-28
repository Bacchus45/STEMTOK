import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Settings, 
  Bell, 
  Moon, 
  Sun, 
  Volume2, 
  VolumeX,
  Eye,
  EyeOff,
  Palette,
  Languages,
  Shield,
  Lock,
  Key,
  Smartphone,
  Monitor,
  HelpCircle,
  LogOut,
  ChevronRight,
  Check,
  X,
  Edit3,
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Star,
  Crown,
  Zap
} from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar?: string;
  bio: string;
  location: string;
  joinDate: Date;
  verified: boolean;
  level: string;
  achievements: string[];
  preferences: {
    theme: 'dark' | 'light' | 'auto';
    notifications: boolean;
    soundEnabled: boolean;
    language: string;
    privacy: 'public' | 'friends' | 'private';
  };
  stats: {
    posts: number;
    followers: number;
    following: number;
    coinsEarned: number;
    level: number;
  };
}

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'coin' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

interface UserInterfaceProps {
  userProfile: UserProfile;
  notifications: Notification[];
  onProfileUpdate: (profile: Partial<UserProfile>) => void;
  onNotificationAction: (notificationId: string, action: 'read' | 'delete') => void;
}

export const UserInterface: React.FC<UserInterfaceProps> = ({
  userProfile: initialProfile,
  notifications: initialNotifications,
  onProfileUpdate,
  onNotificationAction
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'settings' | 'notifications' | 'privacy'>('profile');
  const [userProfile, setUserProfile] = useState<UserProfile>(initialProfile);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: userProfile.name,
    bio: userProfile.bio,
    location: userProfile.location
  });

  useEffect(() => {
    setUserProfile(initialProfile);
  }, [initialProfile]);

  useEffect(() => {
    setNotifications(initialNotifications);
  }, [initialNotifications]);

  const handleProfileSave = () => {
    const updatedProfile = {
      ...userProfile,
      ...editForm
    };
    setUserProfile(updatedProfile);
    onProfileUpdate(editForm);
    setIsEditing(false);
  };

  const handlePreferenceChange = (key: string, value: any) => {
    const updatedProfile = {
      ...userProfile,
      preferences: {
        ...userProfile.preferences,
        [key]: value
      }
    };
    setUserProfile(updatedProfile);
    onProfileUpdate({ preferences: updatedProfile.preferences });
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
    onNotificationAction(notificationId, 'read');
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
    onNotificationAction(notificationId, 'delete');
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like': return <Heart className="w-5 h-5 text-red-400" />;
      case 'comment': return <MessageCircle className="w-5 h-5 text-blue-400" />;
      case 'follow': return <User className="w-5 h-5 text-green-400" />;
      case 'coin': return <Coins className="w-5 h-5 text-yellow-400" />;
      case 'system': return <Bell className="w-5 h-5 text-purple-400" />;
      default: return <Bell className="w-5 h-5 text-gray-400" />;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="space-y-6 font-inter">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
      >
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-2xl">
              {userProfile.avatar || userProfile.name.charAt(0)}
            </div>
            {userProfile.verified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white font-space">{userProfile.name}</h1>
            <p className="text-white/70">@{userProfile.username}</p>
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-sm bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full font-bold">
                {userProfile.level}
              </span>
              <span className="text-sm text-white/60">
                Level {userProfile.stats.level}
              </span>
            </div>
          </div>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-xl font-bold text-white">{userProfile.stats.posts}</p>
            <p className="text-white/60 text-sm">Posts</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-xl font-bold text-white">{userProfile.stats.followers}</p>
            <p className="text-white/60 text-sm">Followers</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-xl font-bold text-white">{userProfile.stats.following}</p>
            <p className="text-white/60 text-sm">Following</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-xl font-bold text-yellow-400">{userProfile.stats.coinsEarned}</p>
            <p className="text-white/60 text-sm">Coins</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4">
          {[
            { id: 'profile', name: 'Profile', icon: <User className="w-4 h-4" /> },
            { id: 'settings', name: 'Settings', icon: <Settings className="w-4 h-4" /> },
            { id: 'notifications', name: 'Notifications', icon: <Bell className="w-4 h-4" /> },
            { id: 'privacy', name: 'Privacy', icon: <Shield className="w-4 h-4" /> }
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
              {tab.id === 'notifications' && notifications.filter(n => !n.read).length > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[18px] text-center">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Profile Information */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white font-space">Profile Information</h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all"
              >
                <Edit3 className="w-4 h-4" />
                <span>{isEditing ? 'Cancel' : 'Edit'}</span>
              </button>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-white/70 text-sm mb-2">Full Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-blue-400 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-white/70 text-sm mb-2">Bio</label>
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-blue-400 focus:outline-none h-24 resize-none"
                    placeholder="Tell us about yourself..."
                  />
                </div>
                
                <div>
                  <label className="block text-white/70 text-sm mb-2">Location</label>
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-blue-400 focus:outline-none"
                    placeholder="City, Country"
                  />
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={handleProfileSave}
                    className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all font-medium"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-white/60" />
                      <div>
                        <p className="text-white/60 text-sm">Email</p>
                        <p className="text-white">{userProfile.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-white/60" />
                      <div>
                        <p className="text-white/60 text-sm">Location</p>
                        <p className="text-white">{userProfile.location || 'Not specified'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-white/60" />
                      <div>
                        <p className="text-white/60 text-sm">Joined</p>
                        <p className="text-white">{userProfile.joinDate.toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-white/60 text-sm mb-2">Bio</p>
                    <p className="text-white leading-relaxed">
                      {userProfile.bio || 'No bio available. Click edit to add one!'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Achievements */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 font-space">Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userProfile.achievements.map((achievement, index) => (
                <div key={index} className="bg-white/5 p-4 rounded-lg flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{achievement}</p>
                    <p className="text-white/60 text-xs">Unlocked</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Appearance Settings */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 font-space">Appearance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Palette className="w-5 h-5 text-white/60" />
                  <div>
                    <p className="text-white">Theme</p>
                    <p className="text-white/60 text-sm">Choose your preferred theme</p>
                  </div>
                </div>
                <select
                  value={userProfile.preferences.theme}
                  onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg text-white p-2"
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                  <option value="auto">Auto</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Languages className="w-5 h-5 text-white/60" />
                  <div>
                    <p className="text-white">Language</p>
                    <p className="text-white/60 text-sm">Interface language</p>
                  </div>
                </div>
                <select
                  value={userProfile.preferences.language}
                  onChange={(e) => handlePreferenceChange('language', e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg text-white p-2"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>
            </div>
          </div>

          {/* Audio Settings */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 font-space">Audio Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {userProfile.preferences.soundEnabled ? 
                    <Volume2 className="w-5 h-5 text-white/60" /> : 
                    <VolumeX className="w-5 h-5 text-white/60" />
                  }
                  <div>
                    <p className="text-white">Sound Effects</p>
                    <p className="text-white/60 text-sm">Enable UI sound feedback</p>
                  </div>
                </div>
                <button
                  onClick={() => handlePreferenceChange('soundEnabled', !userProfile.preferences.soundEnabled)}
                  className={`w-12 h-6 rounded-full transition-all ${
                    userProfile.preferences.soundEnabled ? 'bg-green-500' : 'bg-white/20'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-all ${
                    userProfile.preferences.soundEnabled ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="w-5 h-5 text-white/60" />
                  <div>
                    <p className="text-white">Notifications</p>
                    <p className="text-white/60 text-sm">Enable push notifications</p>
                  </div>
                </div>
                <button
                  onClick={() => handlePreferenceChange('notifications', !userProfile.preferences.notifications)}
                  className={`w-12 h-6 rounded-full transition-all ${
                    userProfile.preferences.notifications ? 'bg-green-500' : 'bg-white/20'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-all ${
                    userProfile.preferences.notifications ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white font-space">
                Notifications ({notifications.filter(n => !n.read).length} unread)
              </h3>
              <button
                onClick={() => {
                  notifications.forEach(notif => {
                    if (!notif.read) markNotificationAsRead(notif.id);
                  });
                }}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all text-sm"
              >
                Mark All Read
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="w-16 h-16 text-white/40 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-white mb-2">No Notifications</h4>
                  <p className="text-white/70">You're all caught up!</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex items-start space-x-3 p-4 rounded-lg border transition-all ${
                      notification.read 
                        ? 'bg-white/5 border-white/10' 
                        : 'bg-blue-500/10 border-blue-500/20'
                    }`}
                  >
                    <div className="p-2 bg-white/10 rounded-lg">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white">{notification.title}</h4>
                      <p className="text-white/70 text-sm">{notification.message}</p>
                      <p className="text-white/50 text-xs mt-1">{formatTimeAgo(notification.timestamp)}</p>
                    </div>
                    <div className="flex space-x-2">
                      {!notification.read && (
                        <button
                          onClick={() => markNotificationAsRead(notification.id)}
                          className="p-1 hover:bg-white/10 rounded transition-colors"
                        >
                          <Check className="w-4 h-4 text-green-400" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-1 hover:bg-white/10 rounded transition-colors"
                      >
                        <X className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Privacy Tab */}
      {activeTab === 'privacy' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Privacy Settings */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 font-space">Privacy Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Eye className="w-5 h-5 text-white/60" />
                  <div>
                    <p className="text-white">Profile Visibility</p>
                    <p className="text-white/60 text-sm">Who can see your profile</p>
                  </div>
                </div>
                <select
                  value={userProfile.preferences.privacy}
                  onChange={(e) => handlePreferenceChange('privacy', e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg text-white p-2"
                >
                  <option value="public">Public</option>
                  <option value="friends">Friends Only</option>
                  <option value="private">Private</option>
                </select>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 font-space">Security</h3>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                <div className="flex items-center space-x-3">
                  <Lock className="w-5 h-5 text-white/60" />
                  <div className="text-left">
                    <p className="text-white">Change Password</p>
                    <p className="text-white/60 text-sm">Update your account password</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-white/40" />
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                <div className="flex items-center space-x-3">
                  <Key className="w-5 h-5 text-white/60" />
                  <div className="text-left">
                    <p className="text-white">Two-Factor Authentication</p>
                    <p className="text-white/60 text-sm">Add extra security to your account</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-white/40" />
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-white/60" />
                  <div className="text-left">
                    <p className="text-white">Privacy Settings</p>
                    <p className="text-white/60 text-sm">Manage data sharing preferences</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-white/40" />
              </button>
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 font-space">Account Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                <div className="flex items-center space-x-3">
                  <LogOut className="w-5 h-5 text-white/60" />
                  <span className="text-white">Sign Out</span>
                </div>
                <ChevronRight className="w-5 h-5 text-white/40" />
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-all">
                <div className="flex items-center space-x-3">
                  <X className="w-5 h-5 text-red-400" />
                  <span className="text-red-400">Delete Account</span>
                </div>
                <ChevronRight className="w-5 h-5 text-red-400" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};