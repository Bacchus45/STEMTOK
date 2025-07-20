import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, User, Home, TrendingUp, Menu } from 'lucide-react';
import { Background3D } from './components/Background3D';
import { Feed } from './components/Feed';
import { CoinCreator } from './components/CoinCreator';
import { CoinManager } from './components/CoinManager';
import { PresentationEditor } from './components/PresentationEditor';
import { UserCoin, Transaction } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [showCoinCreator, setShowCoinCreator] = useState(false);
  const [showCoinManager, setShowCoinManager] = useState(false);
  const [showPresentationEditor, setShowPresentationEditor] = useState(false);
  const [userCoins, setUserCoins] = useState<UserCoin[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'earned',
      amount: 50,
      description: 'Welkom bonus',
      createdAt: new Date(),
      coinType: 'main'
    }
  ]);

  // Get background variant based on current view
  const getBackgroundVariant = () => {
    if (currentView === 'profile') return 'profile';
    if (currentView === 'studio') return 'studio';
    if (showSidePanel) return 'insights';
    return 'main';
  };

  const addTransaction = (type: 'earned' | 'spent', amount: number, description: string, coinType: string = 'main') => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type,
      amount,
      description,
      createdAt: new Date(),
      coinType
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const addUserCoin = (coin: UserCoin) => {
    setUserCoins(prev => [...prev, coin]);
  };

  const updateUserCoin = (coinId: string, updates: Partial<UserCoin>) => {
    setUserCoins(prev => prev.map(coin => 
      coin.id === coinId ? { ...coin, ...updates } : coin
    ));
  };

  const deleteUserCoin = (coinId: string) => {
    setUserCoins(prev => prev.filter(coin => coin.id !== coinId));
  };

  const totalBalance = transactions.reduce((sum, transaction) => {
    return transaction.type === 'earned' ? sum + transaction.amount : sum - transaction.amount;
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <Background3D variant={getBackgroundVariant()} />
      
      <div className="relative z-10">
        {/* Header */}
        <motion.header 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between p-4 bg-black/20 backdrop-blur-lg border-b border-white/10"
        >
          <div className="flex items-center space-x-3">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center font-bold text-black"
            >
              C
            </motion.div>
            <h1 className="text-xl font-bold text-white">CoinCast</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-1 rounded-full text-black font-semibold"
            >
              {totalBalance} coins
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowSidePanel(!showSidePanel)}
              className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <Menu size={20} />
            </motion.button>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="flex">
          {/* Main View */}
          <motion.main 
            layout
            className={`flex-1 transition-all duration-300 ${showSidePanel ? 'mr-80' : ''}`}
          >
            {currentView === 'home' && (
              <Feed 
                onEarnCoins={(amount, description) => addTransaction('earned', amount, description)}
              />
            )}
            {currentView === 'studio' && (
              <div className="p-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
                >
                  <h2 className="text-2xl font-bold text-white mb-4">Studio</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowCoinCreator(true)}
                      className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
                    >
                      Maak Nieuwe Coin
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowCoinManager(true)}
                      className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg text-white font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all"
                    >
                      Beheer Coins
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowPresentationEditor(true)}
                      className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-white font-semibold hover:from-green-600 hover:to-emerald-600 transition-all"
                    >
                      Presentatie Editor
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            )}
            {currentView === 'profile' && (
              <div className="p-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
                >
                  <h2 className="text-2xl font-bold text-white mb-4">Profiel</h2>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                        <User size={32} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">Gebruiker</h3>
                        <p className="text-gray-300">{totalBalance} coins verdiend</p>
                      </div>
                    </div>
                    
                    <div className="bg-black/20 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-white mb-2">Recente Transacties</h4>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {transactions.map((transaction) => (
                          <div key={transaction.id} className="flex justify-between items-center p-2 bg-white/5 rounded">
                            <span className="text-gray-300">{transaction.description}</span>
                            <span className={`font-semibold ${
                              transaction.type === 'earned' ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {transaction.type === 'earned' ? '+' : '-'}{transaction.amount}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.main>

          {/* Side Panel */}
          <motion.aside
            initial={{ x: 320 }}
            animate={{ x: showSidePanel ? 0 : 320 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-80 bg-black/30 backdrop-blur-xl border-l border-white/10 z-20"
          >
            <div className="p-6 pt-20">
              <h3 className="text-xl font-bold text-white mb-4">Inzichten</h3>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Totaal Saldo</h4>
                  <p className="text-2xl font-bold text-yellow-400">{totalBalance}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Mijn Coins</h4>
                  <p className="text-lg text-gray-300">{userCoins.length} coins gemaakt</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Activiteit</h4>
                  <p className="text-lg text-gray-300">{transactions.length} transacties</p>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>

        {/* Bottom Navigation */}
        <motion.nav 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-0 left-0 right-0 bg-black/30 backdrop-blur-xl border-t border-white/10 p-4"
        >
          <div className="flex justify-around max-w-md mx-auto">
            {[
              { id: 'home', icon: Home, label: 'Home' },
              { id: 'studio', icon: Mic, label: 'Studio' },
              { id: 'trending', icon: TrendingUp, label: 'Trending' },
              { id: 'profile', icon: User, label: 'Profiel' }
            ].map(({ id, icon: Icon, label }) => (
              <motion.button
                key={id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentView(id)}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                  currentView === id 
                    ? 'text-yellow-400 bg-white/10' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="text-xs">{label}</span>
              </motion.button>
            ))}
          </div>
        </motion.nav>

        {/* Modals */}
        {showCoinCreator && (
          <CoinCreator
            onClose={() => setShowCoinCreator(false)}
            onCoinCreated={addUserCoin}
          />
        )}

        {showCoinManager && (
          <CoinManager
            coins={userCoins}
            onClose={() => setShowCoinManager(false)}
            onUpdateCoin={updateUserCoin}
            onDeleteCoin={deleteUserCoin}
          />
        )}

        {showPresentationEditor && (
          <PresentationEditor
            onClose={() => setShowPresentationEditor(false)}
          />
        )}
      </div>
    </div>
  );
}