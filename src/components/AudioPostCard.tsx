import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, MessageCircle, DollarSign, UserPlus, Play, Pause } from 'lucide-react';

export interface AudioPost {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  duration: number;
  user: {
    id: string;
    name: string;
    username: string;
    isFollowing: boolean;
  };
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  createdAt: Date;
}

interface AudioPostCardProps {
  post: AudioPost;
  onLike: (postId: string) => void;
  onShare: (postId: string) => void;
  onComment: (postId: string, comment: string) => void;
  onTip: (postId: string, amount: number) => void;
  onFollow: (userId: string) => void;
}

export const AudioPostCard: React.FC<AudioPostCardProps> = ({ post, onLike, onShare, onTip, onFollow }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showTipModal, setShowTipModal] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [tipAmount, setTipAmount] = useState('');

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleLike = (postId: string) => {
    onLike(postId);
  };

  const handleShare = (postId: string) => {
    setShowShareModal(true);
    onShare(postId);
  };

  const handleComment = (postId: string) => {
    setShowCommentModal(true);
  };

  const handleTip = (postId: string) => {
    setShowTipModal(true);
  };

  const handleFollow = (userId: string) => {
    onFollow(userId);
  };

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20"
    >
      {/* User Info */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold text-sm font-space">{post.user.name.charAt(0)}</span>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-white font-space">{post.user.name}</h3>
          <p className="text-sm text-white/70">@{post.user.username}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-white/60">{post.createdAt.toLocaleDateString()}</span>
          {!post.user.isFollowing && (
            <button
              onClick={() => handleFollow(post.user.id)}
              className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs rounded-full hover:from-indigo-600 hover:to-purple-700 transition-all"
            >
              <UserPlus className="w-3 h-3" />
              <span>Volg</span>
            </button>
          )}
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-white mb-2 font-space">{post.title}</h4>
        <p className="text-white/80 mb-3">{post.description}</p>
        
        {/* Audio Player */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center space-x-4">
            <button
              onClick={togglePlay}
              className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-full flex items-center justify-center transition-all shadow-lg"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
            </button>
            <div className="flex-1">
              <div className="text-sm font-medium text-white mb-1">
                {post.title}
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-gradient-to-r from-indigo-400 to-purple-500 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
              <div className="flex justify-between text-xs text-white/60 mt-1">
                <span>0:45</span>
                <span>2:30</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Engagement Stats */}
      <div className="flex items-center space-x-6 text-sm text-white/70 mb-4">
        <span>{post.likes} likes</span>
        <span>{post.comments} kommentare</span>
        <span>{post.shares} delings</span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-white/20">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleLike(post.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              post.isLiked ? 'text-red-400 bg-red-500/20' : 'text-white/70 hover:text-red-400 hover:bg-red-500/10'
            }`}
          >
            <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
            <span>Like</span>
          </button>
          
          <button
            onClick={() => handleShare(post.id)}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>Deel</span>
          </button>
          
          <button
            onClick={() => handleComment(post.id)}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-green-400 hover:bg-green-500/10 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Kommentaar</span>
          </button>
        </div>
        
        <button
          onClick={() => handleTip(post.id)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-lg text-sm font-medium transition-all shadow-lg"
        >
          <DollarSign className="w-4 h-4" />
          <span>Tip</span>
        </button>
      </div>
      
      {/* Modals */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4 font-space">Deel Post</h3>
            <p className="text-gray-600 mb-4">Post link gekopieer na klipbord!</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Sluit
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700">
                Deel op Sosiale Media
              </button>
            </div>
          </div>
        </div>
      )}

      {showCommentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4 font-space">Skryf Kommentaar</h3>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
              rows={4}
              placeholder="Skryf jou kommentaar hier..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowCommentModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Kanselleer
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700">
                Plaas Kommentaar
              </button>
            </div>
          </div>
        </div>
      )}

      {showTipModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4 font-space">Stuur Tip</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tip Bedrag (Crypto)
              </label>
              <input
                type="number"
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="0.001"
                value={tipAmount}
                onChange={(e) => setTipAmount(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowTipModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Kanselleer
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600">
                Stuur Tip
              </button>
            </div>
          </div>
        </div>
      )}
      
    </motion.div>
  );
};