import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Sparkles, 
  Camera, 
  Baby, 
  Droplets, 
  Wind, 
  Star,
  Gift,
  Crown,
  Zap,
  Sun,
  Moon,
  Rainbow as RainbowIcon,
  Flower,
  Butterfly
} from 'lucide-react';

interface Blessing {
  id: string;
  type: 'sneeze' | 'first_breath' | 'first_bath' | 'simple_gesture';
  title: string;
  description: string;
  blessingAmount: number;
  icon: React.ReactNode;
  color: string;
  timestamp: Date;
  multiplier: number;
}

interface BlessingSystemProps {
  onBlessingReceived: (amount: number, description: string) => void;
}

export const BlessingSystem: React.FC<BlessingSystemProps> = ({
  onBlessingReceived
}) => {
  const [activeTab, setActiveTab] = useState<'simple' | 'first_moments' | 'blessings' | 'pour'>('simple');
  const [recentBlessings, setRecentBlessings] = useState<Blessing[]>([]);
  const [totalBlessings, setTotalBlessings] = useState(0);
  const [pouringBlessings, setPouringBlessings] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);

  const simpleBlessings = [
    {
      id: 'sneeze',
      title: 'A Simple Sneeze',
      description: 'Even the smallest gesture releases divine blessings',
      amount: 25,
      icon: <Wind className="w-6 h-6" />,
      color: 'from-blue-400 to-cyan-500',
      multiplier: 1
    },
    {
      id: 'smile',
      title: 'Gentle Smile',
      description: 'Your smile brightens the world and attracts blessings',
      amount: 30,
      icon: <Sun className="w-6 h-6" />,
      color: 'from-yellow-400 to-orange-500',
      multiplier: 1.2
    },
    {
      id: 'breath',
      title: 'Deep Breath',
      description: 'Each breath is a gift, each exhale a blessing',
      amount: 20,
      icon: <Droplets className="w-6 h-6" />,
      color: 'from-green-400 to-emerald-500',
      multiplier: 1
    },
    {
      id: 'blink',
      title: 'Peaceful Blink',
      description: 'In the quiet moment of a blink, grace flows',
      amount: 15,
      icon: <Moon className="w-6 h-6" />,
      color: 'from-purple-400 to-indigo-500',
      multiplier: 0.8
    }
  ];

  const firstMoments = [
    {
      id: 'first_breath',
      title: 'First Breath Photo',
      description: 'The miracle of first breath - blessings pour like rain',
      amount: 1000,
      icon: <Baby className="w-6 h-6" />,
      color: 'from-pink-400 to-rose-500',
      multiplier: 10,
      special: true
    },
    {
      id: 'first_bath',
      title: 'First Bath Photo',
      description: 'Pure innocence in water - divine blessings overflow',
      amount: 800,
      icon: <Droplets className="w-6 h-6" />,
      color: 'from-blue-400 to-teal-500',
      multiplier: 8,
      special: true
    },
    {
      id: 'first_smile',
      title: 'First Smile Photo',
      description: 'The first smile opens heaven - endless blessings flow',
      amount: 600,
      icon: <Heart className="w-6 h-6" />,
      color: 'from-red-400 to-pink-500',
      multiplier: 6,
      special: true
    },
    {
      id: 'first_step',
      title: 'First Step Photo',
      description: 'Each first step is a miracle - blessings multiply',
      amount: 500,
      icon: <Star className="w-6 h-6" />,
      color: 'from-yellow-400 to-amber-500',
      multiplier: 5,
      special: true
    }
  ];

  const triggerSimpleBlessing = (blessing: any) => {
    const newBlessing: Blessing = {
      id: Date.now().toString(),
      type: 'simple_gesture',
      title: blessing.title,
      description: blessing.description,
      blessingAmount: blessing.amount * blessing.multiplier,
      icon: blessing.icon,
      color: blessing.color,
      timestamp: new Date(),
      multiplier: blessing.multiplier
    };

    setRecentBlessings(prev => [newBlessing, ...prev.slice(0, 9)]);
    setTotalBlessings(prev => prev + newBlessing.blessingAmount);
    onBlessingReceived(newBlessing.blessingAmount, newBlessing.title);
  };

  const triggerFirstMomentBlessing = (moment: any) => {
    setPouringBlessings(true);
    
    const newBlessing: Blessing = {
      id: Date.now().toString(),
      type: moment.id as any,
      title: moment.title,
      description: moment.description,
      blessingAmount: moment.amount * moment.multiplier,
      icon: moment.icon,
      color: moment.color,
      timestamp: new Date(),
      multiplier: moment.multiplier
    };

    // Simulate pouring blessings over time
    let poured = 0;
    const totalAmount = newBlessing.blessingAmount;
    const pourInterval = setInterval(() => {
      const pourAmount = Math.min(50, totalAmount - poured);
      poured += pourAmount;
      onBlessingReceived(pourAmount, `${moment.title} - Pouring Blessings`);
      
      if (poured >= totalAmount) {
        clearInterval(pourInterval);
        setPouringBlessings(false);
        setRecentBlessings(prev => [newBlessing, ...prev.slice(0, 9)]);
        setTotalBlessings(prev => prev + totalAmount);
      }
    }, 200);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedPhoto(file);
      // Automatically trigger first moment blessing when photo is uploaded
      const randomMoment = firstMoments[Math.floor(Math.random() * firstMoments.length)];
      triggerFirstMomentBlessing(randomMoment);
    }
  };

  return (
    <div className="space-y-6 font-inter">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue/10 backdrop-blur-md rounded-2xl p-6 border border-blue/20"
      >
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-3 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-blue-200 font-space">Divine Blessing System</h2>
            <p className="text-blue-300">A sneeze is enough - blessings pour for first moments</p>
          </div>
        </div>

        {/* Blessing Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue/5 p-3 rounded-lg text-center">
            <p className="text-blue-300 text-sm">Total Blessings</p>
            <p className="text-xl font-bold text-yellow-400">{totalBlessings}</p>
          </div>
          <div className="bg-blue/5 p-3 rounded-lg text-center">
            <p className="text-blue-300 text-sm">Recent Blessings</p>
            <p className="text-xl font-bold text-green-400">{recentBlessings.length}</p>
          </div>
          <div className="bg-blue/5 p-3 rounded-lg text-center">
            <p className="text-blue-300 text-sm">Pouring Status</p>
            <p className="text-xl font-bold text-purple-400">
              {pouringBlessings ? 'Active' : 'Ready'}
            </p>
          </div>
          <div className="bg-blue/5 p-3 rounded-lg text-center">
            <p className="text-blue-300 text-sm">Grace Level</p>
            <p className="text-xl font-bold text-pink-400">Abundant</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mt-6">
          {[
            { id: 'simple', name: 'Simple Gestures', icon: <Wind className="w-4 h-4" /> },
            { id: 'first_moments', name: 'First Moments', icon: <Baby className="w-4 h-4" /> },
            { id: 'blessings', name: 'Recent Blessings', icon: <Sparkles className="w-4 h-4" /> },
            { id: 'pour', name: 'Pour More', icon: <Droplets className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-blue/20 text-blue-200'
                  : 'bg-blue/10 text-blue-300 hover:bg-blue/15'
              }`}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Simple Gestures Tab */}
      {activeTab === 'simple' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="bg-blue/10 backdrop-blur-md rounded-xl p-6 border border-blue/20">
            <h3 className="text-xl font-bold text-blue-200 mb-4 font-space">
              Simple Gestures - Enough for Blessings
            </h3>
            <p className="text-blue-300 mb-6">
              Even the smallest gesture is enough to release divine blessings. A sneeze, a smile, a breath - all are sacred.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {simpleBlessings.map((blessing, index) => (
                <motion.div
                  key={blessing.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-blue/5 p-4 rounded-lg border border-blue/10 cursor-pointer"
                  onClick={() => triggerSimpleBlessing(blessing)}
                >
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${blessing.color} mb-3`}>
                    {blessing.icon}
                  </div>
                  <h4 className="font-bold text-blue-200 mb-2">{blessing.title}</h4>
                  <p className="text-blue-300 text-sm mb-3">{blessing.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-green-400 font-bold">
                      +{blessing.amount * blessing.multiplier} Blessings
                    </span>
                    <span className="text-xs text-blue-400">
                      {blessing.multiplier}x multiplier
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* First Moments Tab */}
      {activeTab === 'first_moments' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="bg-blue/10 backdrop-blur-md rounded-xl p-6 border border-blue/20">
            <h3 className="text-xl font-bold text-blue-200 mb-4 font-space">
              First Moments - Blessings Pour Like Rain
            </h3>
            <p className="text-blue-300 mb-6">
              First breath, first bath - these sacred moments open heaven and pour out abundant blessings.
            </p>

            {/* Photo Upload */}
            <div className="bg-blue/5 p-4 rounded-lg mb-6">
              <h4 className="font-bold text-blue-200 mb-3">Upload First Moment Photo</h4>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-lg hover:from-pink-600 hover:to-rose-700 transition-all cursor-pointer flex items-center space-x-2"
                >
                  <Camera className="w-4 h-4" />
                  <span>Choose Photo</span>
                </label>
                {selectedPhoto && (
                  <span className="text-blue-300 text-sm">
                    {selectedPhoto.name} - Blessings will pour!
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {firstMoments.map((moment, index) => (
                <motion.div
                  key={moment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-blue/5 p-4 rounded-lg border border-blue/10 cursor-pointer relative overflow-hidden"
                  onClick={() => triggerFirstMomentBlessing(moment)}
                >
                  {moment.special && (
                    <div className="absolute top-2 right-2">
                      <Crown className="w-5 h-5 text-yellow-400" />
                    </div>
                  )}
                  
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${moment.color} mb-3`}>
                    {moment.icon}
                  </div>
                  <h4 className="font-bold text-blue-200 mb-2">{moment.title}</h4>
                  <p className="text-blue-300 text-sm mb-3">{moment.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-400 font-bold text-lg">
                      +{moment.amount * moment.multiplier} Blessings
                    </span>
                    <span className="text-xs text-blue-400">
                      {moment.multiplier}x pour rate
                    </span>
                  </div>
                  
                  {pouringBlessings && (
                    <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/20 to-transparent animate-pulse" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Recent Blessings Tab */}
      {activeTab === 'blessings' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-blue/10 backdrop-blur-md rounded-xl p-6 border border-blue/20"
        >
          <h3 className="text-xl font-bold text-blue-200 mb-4 font-space">Recent Blessings</h3>
          
          {recentBlessings.length > 0 ? (
            <div className="space-y-3">
              {recentBlessings.map((blessing) => (
                <motion.div
                  key={blessing.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between bg-blue/5 p-4 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full bg-gradient-to-r ${blessing.color}`}>
                      {blessing.icon}
                    </div>
                    <div>
                      <p className="font-bold text-blue-200">{blessing.title}</p>
                      <p className="text-xs text-blue-400">
                        {blessing.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-400">
                      +{blessing.blessingAmount}
                    </p>
                    <p className="text-xs text-blue-400">
                      {blessing.multiplier}x
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Sparkles className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-blue-200 mb-2">No Blessings Yet</h4>
              <p className="text-blue-300">
                Try a simple gesture or upload a first moment photo to receive blessings!
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* Pour More Tab */}
      {activeTab === 'pour' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-blue/10 backdrop-blur-md rounded-xl p-6 border border-blue/20"
        >
          <h3 className="text-xl font-bold text-blue-200 mb-4 font-space">Pour More Blessings</h3>
          <p className="text-blue-300 mb-6">
            When you're ready, I will pour more blessings upon you. The heavens are always ready to overflow.
          </p>

          <div className="text-center space-y-6">
            <div className="relative">
              <motion.div
                animate={pouringBlessings ? { rotate: 360 } : {}}
                transition={{ duration: 2, repeat: pouringBlessings ? Infinity : 0 }}
                className="w-32 h-32 mx-auto bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-full flex items-center justify-center"
              >
                <Droplets className="w-16 h-16 text-white" />
              </motion.div>
              
              {pouringBlessings && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="text-white font-bold text-lg">Pouring...</div>
                </motion.div>
              )}
            </div>

            <div className="space-y-4">
              <button
                onClick={() => {
                  const randomMoment = firstMoments[0]; // First breath
                  triggerFirstMomentBlessing(randomMoment);
                }}
                disabled={pouringBlessings}
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-lg hover:from-pink-600 hover:to-rose-700 transition-all disabled:opacity-50"
              >
                Pour First Breath Blessings
              </button>
              
              <button
                onClick={() => {
                  const randomMoment = firstMoments[1]; // First bath
                  triggerFirstMomentBlessing(randomMoment);
                }}
                disabled={pouringBlessings}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-teal-600 text-white rounded-lg hover:from-blue-600 hover:to-teal-700 transition-all disabled:opacity-50"
              >
                Pour First Bath Blessings
              </button>
              
              <button
                onClick={() => {
                  // Pour multiple blessings at once
                  simpleBlessings.forEach((blessing, index) => {
                    setTimeout(() => triggerSimpleBlessing(blessing), index * 500);
                  });
                }}
                disabled={pouringBlessings}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all disabled:opacity-50"
              >
                Pour All Simple Blessings
              </button>
            </div>

            <div className="bg-blue/5 p-4 rounded-lg">
              <p className="text-blue-300 italic text-center">
                "Every good gift and every perfect gift is from above, coming down from the Father of lights."
              </p>
              <p className="text-blue-400 text-sm text-center mt-2">- James 1:17</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Pouring Animation Overlay */}
      <AnimatePresence>
        {pouringBlessings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50"
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -100, x: Math.random() * window.innerWidth, opacity: 0 }}
                animate={{ 
                  y: window.innerHeight + 100, 
                  opacity: [0, 1, 1, 0],
                  rotate: 360 
                }}
                transition={{ 
                  duration: 3, 
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
                className="absolute"
              >
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};