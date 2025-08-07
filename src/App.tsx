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
  SkipBack,
  Repeat
} from 'lucide-react';

interface EnhancedUIProps {
  children: React.ReactNode;
  theme?: 'aurora' | 'garden' | 'fire' | 'starlight';
}

export const EnhancedUI: React.FC<EnhancedUIProps> = ({ 
  children, 
  theme = 'aurora' 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerMinimized, setIsPlayerMinimized] = useState(false);
  const [showVoiceToast, setShowVoiceToast] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentTrack, setCurrentTrack] = useState({
    title: "Celestial Harmony",
    artist: "Divine Frequencies",
    duration: "3:45"
  });
  const [showTokenCreator, setShowTokenCreator] = useState(false);
  const [userTokens, setUserTokens] = useState<any[]>([]);
  const [newToken, setNewToken] = useState({
    name: '',
    symbol: '',
    totalSupply: 1000000,
    initialPrice: 1.0,
    description: ''
  });

  const themeStyles = {
    aurora: 'from-purple-900 via-blue-900 to-indigo-900',
    garden: 'from-emerald-900 via-green-900 to-teal-900',
    fire: 'from-orange-900 via-red-900 to-pink-900',
    starlight: 'from-indigo-900 via-purple-900 to-violet-900'
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${themeStyles[theme]} relative overflow-hidden`}>
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

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full opacity-10"
            style={{
              background: `radial-gradient(circle, ${
                theme === 'aurora' ? '#6366f1' :
                theme === 'garden' ? '#10b981' :
                theme === 'fire' ? '#f59e0b' :
                '#8b5cf6'
              } 0%, transparent 70%)`,
              left: `${20 + i * 30}%`,
              top: `${20 + i * 20}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {children}
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

      {/* Success Toast Example */}
      <AnimatePresence>
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          className="fixed bottom-32 right-4 z-50 max-w-sm"
        >
          <div className="glass-strong rounded-xl p-4 border-l-4 border-green-400">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-400/20 rounded-full">
                <Sparkles className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <div className="text-white font-medium text-sm">
                  Voice post created!
                </div>
                <div className="text-white/70 text-xs">
                  Your audio content is now live
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Enhanced Button Component
interface EnhancedButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
}

export const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  onClick,
  className = ''
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30',
    accent: 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl',
    ghost: 'hover:bg-white/10 text-white'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={loading}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        ${className}
        font-medium rounded-lg transition-all duration-200 
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center space-x-2 justify-center
      `}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : icon ? (
        <>
          {icon}
          <span>{children}</span>
        </>
      ) : (
        children
      )}
    </motion.button>
  );
};

// Enhanced Card Component
interface EnhancedCardProps {
  children: React.ReactNode;
  hover?: boolean;
  glow?: boolean;
  className?: string;
}

export const EnhancedCard: React.FC<EnhancedCardProps> = ({
  children,
  hover = true,
  glow = false,
  className = ''
}) => {
  return (
    <motion.div
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      className={`
        glass rounded-xl p-6 
        ${hover ? 'card-hover' : ''}
        ${glow ? 'animate-pulse-glow' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};