import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coins, TrendingUp, Calendar, Edit3, Trash2, X } from 'lucide-react';
import { UserCoin } from '../types';

interface CoinManagerProps {
  coins: UserCoin[];
  onClose: () => void;
  onCoinUpdated: (coin: UserCoin) => void;
  getUserCoinBalance: (coinId: string) => number;
}

export const CoinManager: React.FC<CoinManagerProps> = ({
  coins,
  onClose,
  onCoinUpdated,
  getUserCoinBalance
}) => {
  const [selectedCoin, setSelectedCoin] = useState<UserCoin | null>(null);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isSeasonalActive = (coin: UserCoin) => {
    if (!coin.seasonal || !coin.startDate || !coin.endDate) return true;
    
    const now = new Date();
    return now >= coin.startDate && now <= coin.endDate;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-4xl w-full h-[80vh] border border-white/20 overflow-hidden"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white font-space">Manage Your Coins</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white/70" />
          </button>
        </div>

        {coins.length === 0 ? (
          <div className="text-center py-16">
            <Coins className="w-16 h-16 text-white/40 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No Coins Created Yet</h3>
            <p className="text-white/70">Create your first coin to get started!</p>
          </div>
        ) : (
          <div className="h-full overflow-y-auto pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coins.map((coin) => (
                <motion.div
                  key={coin.id}
                  whileHover={{ y: -5 }}
                  className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                  onClick={() => setSelectedCoin(coin)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                      style={{ backgroundColor: coin.color }}
                    >
                      {coin.symbol.charAt(0)}
                    </div>
                    <div className="flex items-center space-x-2">
                      {coin.seasonal && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          isSeasonalActive(coin)
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {isSeasonalActive(coin) ? 'Active' : 'Expired'}
                        </span>
                      )}
                      {coin.coinType !== 'standard' && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          coin.coinType === 'small' ? 'bg-yellow-500/20 text-yellow-400' :
                          coin.coinType === 'big' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-pink-500/20 text-pink-400'
                        }`}>
                          {coin.coinType === 'angel' ? '👼 Angel' : coin.coinType.toUpperCase()}
                        </span>
                      )}
                      <button className="p-1 hover:bg-white/10 rounded">
                        <Edit3 className="w-4 h-4 text-white/60" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">{coin.name}</h3>
                  <p className="text-white/60 text-sm mb-3">{coin.symbol}</p>
                  <p className="text-white/80 text-sm mb-3 line-clamp-2">{coin.description}</p>

                  {/* Value Philosophy Display */}
                  <div className="bg-white/5 p-3 rounded-lg mb-4">
                    {coin.coinType === 'small' && (
                      <div className="text-center">
                        <div className="text-yellow-400 text-xs font-bold mb-1">🔸 INTENSE VALUE</div>
                        <div className="text-white/70 text-xs">Concentrated power in small form</div>
                        <div className="text-yellow-300 text-xs">Value Intensity: {coin.valueIntensity}%</div>
                      </div>
                    )}
                    {coin.coinType === 'big' && (
                      <div className="text-center">
                        <div className="text-blue-400 text-xs font-bold mb-1">🔷 GROWTH FOCUSED</div>
                        <div className="text-white/70 text-xs">Impressive details, growth potential</div>
                        <div className="text-blue-300 text-xs">Face Size: {coin.faceSize.toUpperCase()}</div>
                      </div>
                    )}
                    {coin.coinType === 'angel' && (
                      <div className="text-center">
                        <div className="text-pink-400 text-xs font-bold mb-1">👼 TEACH TO FISH</div>
                        <div className="text-white/70 text-xs">Creative learning & value creation</div>
                        <div className="text-pink-300 text-xs">Teaching: {coin.creativeTeaching ? 'ENABLED' : 'DISABLED'}</div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Total Supply:</span>
                      <span className="text-white">{coin.totalSupply.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Your Balance:</span>
                      <span className="text-green-400 font-bold">
                        {getUserCoinBalance(coin.id).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Philosophy:</span>
                      <span className={`${
                        coin.coinType === 'small' ? 'text-yellow-400' :
                        coin.coinType === 'big' ? 'text-blue-400' :
                        coin.coinType === 'angel' ? 'text-pink-400' :
                        'text-white'
                      }`}>
                        {coin.coinType === 'small' ? 'Intense Value' :
                         coin.coinType === 'big' ? 'Growth Focus' :
                         coin.coinType === 'angel' ? 'Teach to Fish' :
                         'Standard'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Created:</span>
                      <span className="text-white">{formatDate(coin.createdAt)}</span>
                    </div>
                  </div>

                  {coin.seasonal && coin.startDate && coin.endDate && (
                    <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/5">
                      <div className="flex items-center space-x-2 mb-2">
                        <Calendar className="w-4 h-4 text-white/60" />
                        <span className="text-xs text-white/60">Seasonal Period</span>
                      </div>
                      <div className="text-xs space-y-1">
                        <div className="flex justify-between">
                          <span className="text-white/60">Start:</span>
                          <span className="text-white">{formatDate(coin.startDate)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">End:</span>
                          <span className="text-white">{formatDate(coin.endDate)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Coin Detail Modal */}
        {selectedCoin && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl w-full border border-white/20"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl"
                    style={{ backgroundColor: selectedCoin.color }}
                  >
                    {selectedCoin.symbol.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedCoin.name}</h2>
                    <p className="text-white/70">{selectedCoin.symbol}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCoin(null)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-white/70" />
                </button>
              </div>

              <p className="text-white/80 mb-6">{selectedCoin.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Coins className="w-5 h-5 text-yellow-400" />
                    <span className="text-white/70">Total Supply</span>
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {selectedCoin.totalSupply.toLocaleString()}
                  </p>
                </div>

                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <span className="text-white/70">Your Balance</span>
                  </div>
                  <p className="text-2xl font-bold text-green-400">
                    {getUserCoinBalance(selectedCoin.id).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Enhanced Value Philosophy */}
              <div className="bg-white/5 p-4 rounded-lg mb-6">
                <h3 className="font-bold text-white mb-3">Value Philosophy</h3>
                {selectedCoin.coinType === 'small' && (
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"></div>
                      <span className="text-yellow-400 font-bold">Small Coin - Intense Value</span>
                    </div>
                    <p className="text-white/80 text-sm mb-2">
                      Concentrated value in compact form. Every unit carries maximum utility and purchasing power.
                    </p>
                    <div className="text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-white/60">Value Intensity:</span>
                        <span className="text-yellow-400">{selectedCoin.valueIntensity}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Face Size:</span>
                        <span className="text-white">{selectedCoin.faceSize}</span>
                      </div>
                    </div>
                  </div>
                )}
                {selectedCoin.coinType === 'big' && (
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
                      <span className="text-blue-400 font-bold">Big Coin - Growth Focused</span>
                    </div>
                    <p className="text-white/80 text-sm mb-2">
                      Impressive visual details designed for growth and expansion. Beauty over immediate value.
                    </p>
                    <div className="text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-white/60">Growth Potential:</span>
                        <span className="text-blue-400">{100 - selectedCoin.valueIntensity}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Visual Impact:</span>
                        <span className="text-white">{selectedCoin.faceSize} face</span>
                      </div>
                    </div>
                  </div>
                )}
                {selectedCoin.coinType === 'angel' && (
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-r from-pink-400 to-rose-500 flex items-center justify-center">
                        👼
                      </div>
                      <span className="text-pink-400 font-bold">Angel Coin - Teach to Fish</span>
                    </div>
                    <p className="text-white/80 text-sm mb-2">
                      Empowers creative learning and value generation. Teaches users to create their own wealth.
                    </p>
                    <div className="text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-white/60">Creative Teaching:</span>
                        <span className="text-pink-400">{selectedCoin.creativeTeaching ? 'ENABLED' : 'DISABLED'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Learning Multiplier:</span>
                        <span className="text-pink-300">{selectedCoin.valueIntensity / 10}x</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {selectedCoin.seasonal && selectedCoin.startDate && selectedCoin.endDate && (
                <div className="bg-white/5 p-4 rounded-lg mb-6">
                  <h3 className="font-bold text-white mb-3">Seasonal Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-white/60">Start Date:</span>
                      <p className="text-white">{formatDate(selectedCoin.startDate)}</p>
                    </div>
                    <div>
                      <span className="text-white/60">End Date:</span>
                      <p className="text-white">{formatDate(selectedCoin.endDate)}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className={`text-sm px-3 py-1 rounded-full ${
                      isSeasonalActive(selectedCoin)
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {isSeasonalActive(selectedCoin) ? 'Currently Active' : 'Season Ended'}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex space-x-3">
                <button className="flex-1 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg transition-all font-medium">
                  Edit Coin
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white rounded-lg transition-all">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
};