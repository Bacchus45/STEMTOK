import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Music, 
  Mic,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipForward,
  SkipBack
} from 'lucide-react';
import { Feed } from './components/Feed';
import { Background3D } from './components/Background3D';
import { UserCoin, Transaction } from './types';

const EnhancedUI: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [userBalance, setUserBalance] = useState(150);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentTrack, setCurrentTrack] = useState({
    title: "Celestial Harmony",
    artist: "Divine Frequencies",
    duration: "3:45"
  });

  const handleEarnCoins = (amount: number, description: string) => {
    setUserBalance(prev => prev + amount);
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'earned',
      amount,
      description,
      createdAt: new Date(),
      coinType: 'SocialCoin'
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <Background3D />
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            animate={{
              x: [0, Math.random() * 100, 0],
              y: [0, Math.random() * 100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-space">
            SocialCoin
          </h1>
          <p className="text-xl text-white/80 mb-6">
            Revolutionary voice-based social platform with cryptocurrency rewards
          </p>
          
          {/* User Balance */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-bold">{userBalance} SocialCoins</span>
          </div>
        </motion.div>

        {/* Feed Component */}
        <Feed onEarnCoins={handleEarnCoins} />
      </div>

      {/* Enhanced Audio Player */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-4 left-4 right-4 z-50"
      >
        <div className="glass-strong rounded-2xl p-4 max-w-md mx-auto">
          <div className="flex items-center space-x-4">
            {/* Album Art */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Music className="w-6 h-6 text-white" />
            </div>

            {/* Track Info */}
            <div className="flex-1 min-w-0">
              <div className="text-white font-medium truncate text-sm">
                {currentTrack.title}
              </div>
              <div className="text-white/60 text-xs truncate">
                {currentTrack.artist}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <SkipBack className="w-4 h-4 text-white" />
              </button>
              
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-lg transition-all"
              >
                {isPlaying ? 
                  <Pause className="w-4 h-4 text-white" /> : 
                  <Play className="w-4 h-4 text-white ml-0.5" />
                }
              </button>
              
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <SkipForward className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Volume */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setVolume(volume > 0 ? 0 : 0.7)}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                {volume > 0 ? 
                  <Volume2 className="w-4 h-4 text-white" /> : 
                  <VolumeX className="w-4 h-4 text-white" />
                }
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-3">
            <div className="w-full bg-white/20 rounded-full h-1">
              <motion.div 
                className="bg-gradient-to-r from-indigo-400 to-purple-500 h-1 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: isPlaying ? "100%" : "30%" }}
                transition={{ duration: isPlaying ? 225 : 0 }}
              />
            </div>
            <div className="flex justify-between text-xs text-white/50 mt-1">
              <span>1:23</span>
              <span>{currentTrack.duration}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Voice Recording Indicator */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed top-4 right-4 z-50"
          >
            <div className="glass rounded-full p-3 animate-pulse-glow">
              <div className="voice-wave">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full shadow-2xl flex items-center justify-center z-40"
      >
        <Mic className="w-6 h-6 text-white" />
      </motion.button>

      {/* Success Toast */}
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed bottom-32 right-4 z-50 max-w-sm"
      >
        <div className="glass-strong rounded-xl p-4 border-l-4 border-green-400">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-400/20 rounded-full">
              <Sparkles className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="text-white font-medium text-sm">
                Welcome to SocialCoin!
              </div>
              <div className="text-white/70 text-xs">
                Voice-based crypto social platform
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EnhancedUI;