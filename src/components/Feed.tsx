import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, Mic, Play, Pause, MoreHorizontal, Coins } from 'lucide-react';

interface Post {
  id: string;
  type: 'voice' | 'text';
  user: {
    name: string;
    username: string;
    avatar: string;
    avatarBg: string;
  };
  content: string;
  audioUrl?: string;
  duration?: number;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  timestamp: Date;
  coinReward: number;
  image?: string;
}

interface FeedProps {
  onEarnCoins: (amount: number, description: string) => void;
}

export const Feed: React.FC<FeedProps> = ({ onEarnCoins }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [playingPost, setPlayingPost] = useState<string | null>(null);

  useEffect(() => {
    // Generate sample posts
    const samplePosts: Post[] = [
      {
        id: '1',
        type: 'voice',
        user: {
          name: 'Sarah Chen',
          username: 'sarah_creates',
          avatar: 'SC',
          avatarBg: 'from-pink-500 to-rose-500'
        },
        content: 'Just launched my new seasonal coin! WinterCoin is perfect for the holidays 🎄 The community response has been amazing and we\'re seeing great adoption rates!',
        audioUrl: '/sample-audio.mp3',
        duration: 45,
        likes: 23,
        comments: 8,
        shares: 5,
        isLiked: false,
        timestamp: new Date(Date.now() - 3600000),
        coinReward: 25,
        image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&h=300&fit=crop'
      },
      {
        id: '6',
        type: 'voice',
        user: {
          name: 'J.J. NELL',
          username: 'nell_researcher',
          avatar: 'JN',
          avatarBg: 'from-red-500 to-orange-500'
        },
        content: 'Breakthrough discovery! Found my red lighter again and immediately discovered how to power stem cells with bioelectric energy! 🔥 Sometimes the best science happens when you\'re looking for something else entirely.',
        audioUrl: '/nell-lighter-discovery.mp3',
        duration: 67,
        likes: 156,
        comments: 34,
        shares: 28,
        isLiked: false,
        timestamp: new Date(Date.now() - 1800000),
        coinReward: 75,
        image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500&h=300&fit=crop'
      },
      {
        id: '2',
        type: 'voice',
        user: {
          name: 'Mike Johnson',
          username: 'crypto_mike',
          avatar: 'MJ',
          avatarBg: 'from-blue-500 to-cyan-500'
        },
        content: 'Here\'s my take on the future of voice-based social media and how it\'s revolutionizing authentic communication. The integration with crypto rewards creates incredible incentives!',
        audioUrl: '/sample-audio-2.mp3',
        duration: 78,
        likes: 56,
        comments: 12,
        shares: 18,
        isLiked: true,
        timestamp: new Date(Date.now() - 7200000),
        coinReward: 35,
        image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop'
      },
      {
        id: '3',
        type: 'text',
        user: {
          name: 'Alex Rivera',
          username: 'alex_builds',
          avatar: 'AR',
          avatarBg: 'from-purple-500 to-indigo-500'
        },
        content: 'Working on a new presentation about quantum computing in crypto. The possibilities are endless! 🚀 Quantum-resistant algorithms will be crucial for the future of blockchain security.',
        likes: 34,
        comments: 15,
        shares: 9,
        isLiked: false,
        timestamp: new Date(Date.now() - 10800000),
        coinReward: 15,
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&h=300&fit=crop'
      },
      {
        id: '4',
        type: 'voice',
        user: {
          name: 'Emma Watson',
          username: 'emma_codes',
          avatar: 'EW',
          avatarBg: 'from-green-500 to-emerald-500'
        },
        content: 'Building the future of decentralized social networks! Check out this demo of our new voice authentication system.',
        audioUrl: '/sample-audio-3.mp3',
        duration: 62,
        likes: 89,
        comments: 24,
        shares: 31,
        isLiked: false,
        timestamp: new Date(Date.now() - 14400000),
        coinReward: 45,
        image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=500&h=300&fit=crop'
      },
      {
        id: '5',
        type: 'text',
        user: {
          name: 'David Kim',
          username: 'david_designs',
          avatar: 'DK',
          avatarBg: 'from-orange-500 to-red-500'
        },
        content: 'Just finished designing a new UI component library for Web3 apps. The glassmorphism effects combined with crypto themes create such a beautiful aesthetic! ✨',
        likes: 67,
        comments: 18,
        shares: 12,
        isLiked: true,
        timestamp: new Date(Date.now() - 18000000),
        coinReward: 28,
        image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=500&h=300&fit=crop'
      }
    ];

    setPosts(samplePosts);
  }, []);

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const newLikedState = !post.isLiked;
        if (newLikedState) {
          onEarnCoins(5, `Liked post by ${post.user.name}`);
        }
        return {
          ...post,
          isLiked: newLikedState,
          likes: newLikedState ? post.likes + 1 : post.likes - 1
        };
      }
      return post;
    }));
  };

  const handlePlay = (postId: string) => {
    if (playingPost === postId) {
      setPlayingPost(null);
    } else {
      setPlayingPost(postId);
      // Award coins for listening
      const post = posts.find(p => p.id === postId);
      if (post) {
        onEarnCoins(10, `Listened to ${post.user.name}'s voice post`);
      }
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
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-space">
          Voice Feed
        </h1>
        <p className="text-white/70 text-lg">Discover authentic conversations and earn coins</p>
      </motion.div>

      <AnimatePresence>
        {posts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all"
          >
            {/* Post Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${post.user.avatarBg} flex items-center justify-center text-white font-bold text-sm`}>
                  {post.user.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-white">{post.user.name}</h3>
                  <p className="text-white/60 text-sm">@{post.user.username} • {formatTimeAgo(post.timestamp)}</p>
                </div>
              </div>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <MoreHorizontal className="w-5 h-5 text-white/60" />
              </button>
            </div>

            {/* Post Content */}
            <div className="mb-4">
              <p className="text-white/90 leading-relaxed mb-3">{post.content}</p>
              
              {/* Post Image */}
              {post.image && (
                <div className="mb-4">
                  <img
                    src={post.image}
                    alt="Post content"
                    className="w-full h-64 object-cover rounded-xl border border-white/10"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              )}
              
              {/* Voice Player */}
              {post.type === 'voice' && (
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handlePlay(post.id)}
                      className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-full flex items-center justify-center transition-all"
                    >
                      {playingPost === post.id ? (
                        <Pause className="w-5 h-5 text-white" />
                      ) : (
                        <Play className="w-5 h-5 text-white ml-0.5" />
                      )}
                    </button>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Mic className="w-4 h-4 text-white/60" />
                        <span className="text-white/80 text-sm">Voice Post</span>
                        <span className="text-white/60 text-xs">• {post.duration}s</span>
                      </div>
                      
                      {/* Simple waveform visualization */}
                      <div className="flex items-center space-x-1 h-8">
                        {Array.from({ length: 40 }, (_, i) => (
                          <div
                            key={i}
                            className={`w-1 bg-gradient-to-t from-indigo-400 to-purple-500 rounded-full transition-all ${
                              playingPost === post.id ? 'animate-pulse' : ''
                            }`}
                            style={{ 
                              height: `${Math.sin(i * 0.5) * 15 + 20}px`,
                              opacity: playingPost === post.id && i < 20 ? 1 : 0.4
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Post Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                    post.isLiked 
                      ? 'text-red-400 bg-red-500/10' 
                      : 'text-white/70 hover:text-red-400 hover:bg-red-500/10'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                  <span className="text-sm font-medium">{post.likes}</span>
                </button>

                <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-white/70 hover:text-blue-400 hover:bg-blue-500/10 transition-all">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">{post.comments}</span>
                </button>

                <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-white/70 hover:text-green-400 hover:bg-green-500/10 transition-all">
                  <Share2 className="w-5 h-5" />
                  <span className="text-sm font-medium">{post.shares}</span>
                </button>
              </div>

              <div className="flex items-center space-x-2 text-yellow-400">
                <Coins className="w-4 h-4" />
                <span className="text-sm font-bold">+{post.coinReward}</span>
              </div>
            </div>
          </motion.article>
        ))}
      </AnimatePresence>

      {/* Load More */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center pt-6"
      >
        <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg transition-all font-medium">
          Load More Posts
        </button>
      </motion.div>
      
      {/* Floating Create Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-24 right-6 w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center z-40"
        animate={{
          boxShadow: ['0 0 20px rgba(168, 85, 247, 0.4)', '0 0 40px rgba(168, 85, 247, 0.8)', '0 0 20px rgba(168, 85, 247, 0.4)']
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Mic className="w-7 h-7 text-white" />
      </motion.button>
    </div>
  );
};