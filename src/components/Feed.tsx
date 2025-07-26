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
          avatar: '👩‍🎨'
        },
        content: 'Just launched my new seasonal coin! WinterCoin is perfect for the holidays 🎄',
        audioUrl: '/sample-audio.mp3',
        duration: 45,
        likes: 23,
        comments: 8,
        shares: 5,
        isLiked: false,
        timestamp: new Date(Date.now() - 3600000),
        coinReward: 25
      },
      {
        id: '2',
        type: 'voice',
        user: {
          name: 'Mike Johnson',
          username: 'crypto_mike',
          avatar: '👨‍💻'
        },
        content: 'Here\'s my take on the future of voice-based social media...',
        audioUrl: '/sample-audio-2.mp3',
        duration: 78,
        likes: 56,
        comments: 12,
        shares: 18,
        isLiked: true,
        timestamp: new Date(Date.now() - 7200000),
        coinReward: 35
      },
      {
        id: '3',
        type: 'text',
        user: {
          name: 'Alex Rivera',
          username: 'alex_builds',
          avatar: '👩‍🔬'
        },
        content: 'Working on a new presentation about quantum computing in crypto. The possibilities are endless! 🚀',
        likes: 34,
        comments: 15,
        shares: 9,
        isLiked: false,
        timestamp: new Date(Date.now() - 10800000),
        coinReward: 15
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
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xl">
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
                              height: `${Math.random() * 20 + 8}px`,
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
    </div>
  );
};