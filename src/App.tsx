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

  const getTotalCoins = () => {
    return transactions
      .filter(t => t.coinType === 'main')
      .reduce((total, transaction) => {
        return transaction.type === 'earned' 
          ? total + transaction.amount 
          : total - transaction.amount;
      }, 0);
  };

  const getUserCoinBalance = (coinId: string) => {
    return transactions
      .filter(t => t.coinType === coinId)
      .reduce((total, transaction) => {
        return transaction.type === 'earned' 
          ? total + transaction.amount 
          : total - transaction.amount;
      }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      <Background3D variant={getBackgroundVariant()} />
      
      {/* Header */}
      <motion.header 
        className="relative z-10 p-4 flex justify-between items-center backdrop-blur-sm bg-white/5 border-b border-white/10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={() => setShowSidePanel(!showSidePanel)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Menu size={24} />
          </motion.button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            SocialCoin
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <motion.div 
            className="bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 rounded-full font-bold shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            {getTotalCoins()} Coins
          </motion.div>
          <motion.button
            onClick={() => setCurrentView('profile')}
            className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <User size={24} />
          </motion.button>
        </div>
      </motion.header>

      <div className="flex">
        {/* Side Panel */}
        <motion.aside
          className={`fixed left-0 top-16 h-full bg-black/20 backdrop-blur-md border-r border-white/10 z-20 transition-all duration-300 ${
            showSidePanel ? 'w-64 translate-x-0' : 'w-0 -translate-x-full'
          }`}
          initial={false}
        >
          <div className="p-4 space-y-4">
            <h2 className="text-xl font-bold mb-4">Insights</h2>
            <div className="space-y-2">
              <div className="bg-white/10 p-3 rounded-lg">
                <p className="text-sm text-gray-300">Total Earned</p>
                <p className="text-xl font-bold text-green-400">
                  {transactions.filter(t => t.type === 'earned').reduce((sum, t) => sum + t.amount, 0)} Coins
                </p>
              </div>
              <div className="bg-white/10 p-3 rounded-lg">
                <p className="text-sm text-gray-300">Total Spent</p>
                <p className="text-xl font-bold text-red-400">
                  {transactions.filter(t => t.type === 'spent').reduce((sum, t) => sum + t.amount, 0)} Coins
                </p>
              </div>
              <div className="bg-white/10 p-3 rounded-lg">
                <p className="text-sm text-gray-300">User Coins Created</p>
                <p className="text-xl font-bold text-blue-400">{userCoins.length}</p>
              </div>
            </div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${showSidePanel ? 'ml-64' : 'ml-0'}`}>
          {currentView === 'home' && (
            <Feed 
              onEarnCoins={(amount, description) => addTransaction('earned', amount, description)}
            />
          )}
          
          {currentView === 'studio' && (
            <div className="p-6">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-8"
                >
                  <h2 className="text-3xl font-bold mb-4">Creator Studio</h2>
                  <p className="text-gray-300">Create content, manage your coins, and build presentations</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.button
                    onClick={() => setShowCoinCreator(true)}
                    className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <h3 className="text-xl font-bold mb-2">Create Coin</h3>
                    <p className="text-purple-100">Launch your own social currency</p>
                  </motion.button>

                  <motion.button
                    onClick={() => setShowCoinManager(true)}
                    className="bg-gradient-to-br from-blue-500 to-cyan-500 p-6 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <h3 className="text-xl font-bold mb-2">Manage Coins</h3>
                    <p className="text-blue-100">View and manage your created coins</p>
                  </motion.button>

                  <motion.button
                    onClick={() => setShowPresentationEditor(true)}
                    className="bg-gradient-to-br from-green-500 to-emerald-500 p-6 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <h3 className="text-xl font-bold mb-2">Presentations</h3>
                    <p className="text-green-100">Create interactive presentations</p>
                  </motion.button>
                </div>

                {userCoins.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8"
                  >
                    <h3 className="text-2xl font-bold mb-4">Your Coins</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {userCoins.map((coin) => (
                        <div key={coin.id} className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-xl font-bold">
                              {coin.symbol}
                            </div>
                            <div>
                              <h4 className="font-bold">{coin.name}</h4>
                              <p className="text-sm text-gray-300">{coin.symbol}</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-300 mb-2">{coin.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">Supply: {coin.totalSupply}</span>
                            <span className="text-sm font-bold text-green-400">
                              Balance: {getUserCoinBalance(coin.id)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {currentView === 'profile' && (
            <div className="p-6">
              <div className="max-w-2xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                >
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mb-4 flex items-center justify-center">
                      <User size={48} />
                    </div>
                    <h2 className="text-2xl font-bold">Your Profile</h2>
                    <p className="text-gray-300">SocialCoin Creator</p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white/5 p-4 rounded-lg">
                      <h3 className="font-bold mb-2">Recent Transactions</h3>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {transactions.slice(0, 10).map((transaction) => (
                          <div key={transaction.id} className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
                            <div>
                              <p className="font-medium">{transaction.description}</p>
                              <p className="text-sm text-gray-400">
                                {transaction.createdAt.toLocaleDateString()}
                              </p>
                            </div>
                            <span className={`font-bold ${
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
            </div>
          )}
        </main>
      </div>

      {/* Bottom Navigation */}
      <motion.nav 
        className="fixed bottom-0 left-0 right-0 bg-black/20 backdrop-blur-md border-t border-white/10 p-4 z-10"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex justify-around max-w-md mx-auto">
          <motion.button
            onClick={() => setCurrentView('home')}
            className={`p-3 rounded-full transition-all ${
              currentView === 'home' 
                ? 'bg-purple-500 text-white' 
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Home size={24} />
          </motion.button>
          
          <motion.button
            onClick={() => setCurrentView('studio')}
            className={`p-3 rounded-full transition-all ${
              currentView === 'studio' 
                ? 'bg-purple-500 text-white' 
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Mic size={24} />
          </motion.button>
          
          <motion.button
            onClick={() => setShowSidePanel(!showSidePanel)}
            className={`p-3 rounded-full transition-all ${
              showSidePanel 
                ? 'bg-purple-500 text-white' 
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <TrendingUp size={24} />
          </motion.button>
        </div>
      </motion.nav>

      {/* Modals */}
      {showCoinCreator && (
        <CoinCreator
          onClose={() => setShowCoinCreator(false)}
          onCoinCreated={(coin) => {
            setUserCoins(prev => [...prev, coin]);
            addTransaction('spent', 100, `Created ${coin.name} coin`, 'main');
            setShowCoinCreator(false);
          }}
        />
      )}

      {showCoinManager && (
        <CoinManager
          coins={userCoins}
          onClose={() => setShowCoinManager(false)}
          onCoinUpdated={(updatedCoin) => {
            setUserCoins(prev => prev.map(coin => 
              coin.id === updatedCoin.id ? updatedCoin : coin
            ));
          }}
          getUserCoinBalance={getUserCoinBalance}
        />
      )}

      {showPresentationEditor && (
        <PresentationEditor
          onClose={() => setShowPresentationEditor(false)}
          onPresentationSaved={() => {
            addTransaction('earned', 25, 'Presentation created', 'main');
            setShowPresentationEditor(false);
          }}
        />
      )}
    </div>
  );
}