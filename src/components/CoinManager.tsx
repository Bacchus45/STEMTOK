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
                      <button className="p-1 hover:bg-white/10 rounded">
                        <Edit3 className="w-4 h-4 text-white/60" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">{coin.name}</h3>
                  <p className="text-white/60 text-sm mb-3">{coin.symbol}</p>
                  <p className="text-white/80 text-sm mb-4 line-clamp-2">{coin.description}</p>

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