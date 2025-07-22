import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, User, Home, TrendingUp, Menu, Crown } from 'lucide-react';
import { Background3D } from './components/Background3D';
import { Feed } from './components/Feed';
import { CoinCreator } from './components/CoinCreator';
import { CoinManager } from './components/CoinManager';
import { PresentationEditor } from './components/PresentationEditor';
import { PaymentIntegration } from './components/PaymentIntegration';
import { InsightsAnalyzer } from './components/InsightsAnalyzer';
import { STEMResearch } from './components/STEMResearch';
import { JesusAssistant } from './components/JesusAssistant';
import { CodingSystem3D } from './components/3DCodingSystem';
import { UserCoin, Transaction } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [showCoinCreator, setShowCoinCreator] = useState(false);
  const [showCoinManager, setShowCoinManager] = useState(false);
  const [showPresentationEditor, setShowPresentationEditor] = useState(false);
  const [showInsightsAnalyzer, setShowInsightsAnalyzer] = useState(false);
  const [showSTEMResearch, setShowSTEMResearch] = useState(false);
  const [showJesusAssistant, setShowJesusAssistant] = useState(false);
  const [show3DCoding, setShow3DCoding] = useState(false);
  const [showPaymentIntegration, setShowPaymentIntegration] = useState(false);
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
        className="relative z-10 p-4 flex justify-between items-center backdrop-blur-sm bg-blue/5 border-b border-blue/10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={() => setShowSidePanel(!showSidePanel)}
            className="p-2 rounded-lg bg-blue/10 hover:bg-blue/20 transition-colors"
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
            <span className="text-blue-900">{getTotalCoins()} Coins</span>
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
            <h2 className="text-xl font-bold mb-4 text-blue-300">Insights</h2>
            <div className="space-y-2">
              <div className="bg-blue/10 p-3 rounded-lg">
                <p className="text-sm text-blue-300">Total Earned</p>
                <p className="text-xl font-bold text-green-400">
                  {transactions.filter(t => t.type === 'earned').reduce((sum, t) => sum + t.amount, 0)} Coins
                </p>
              </div>
              <div className="bg-blue/10 p-3 rounded-lg">
                <p className="text-sm text-blue-300">Total Spent</p>
                <p className="text-xl font-bold text-red-400">
                  {transactions.filter(t => t.type === 'spent').reduce((sum, t) => sum + t.amount, 0)} Coins
                </p>
              </div>
              <div className="bg-blue/10 p-3 rounded-lg">
                <p className="text-sm text-blue-300">User Coins Created</p>
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
          
          {currentView === 'insights' && (
            <div className="p-6">
              <InsightsAnalyzer
                userActivity={{
                  totalPosts: 15,
                  totalLikes: 234,
                  totalFollowers: 89,
                  engagementRate: 0.85
                }}
                platformMetrics={{
                  totalUsers: 1250,
                  totalCoins: userCoins.length,
                  totalTransactions: transactions.length
                }}
                onInsightAction={(insight) => {
                  console.log('Implementing insight:', insight.title);
                  addTransaction('earned', 25, `Implemented: ${insight.title}`, 'main');
                }}
              />
            </div>
          )}
          
          {currentView === 'studio' && (
            <div className="p-6">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-8"
                >
                  <h2 className="text-3xl font-bold mb-4 text-blue-200">Creator Studio</h2>
                  <p className="text-blue-300">Create content, manage your coins, and build presentations</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <motion.button
                    onClick={() => setShowCoinCreator(true)}
                    className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <h3 className="text-xl font-bold mb-2 text-blue-100">Create Coin</h3>
                    <p className="text-purple-100">Launch your own social currency</p>
                  </motion.button>

                  <motion.button
                    onClick={() => setShowCoinManager(true)}
                    className="bg-gradient-to-br from-blue-500 to-cyan-500 p-6 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <h3 className="text-xl font-bold mb-2 text-blue-100">Manage Coins</h3>
                    <p className="text-blue-100">View and manage your created coins</p>
                  </motion.button>

                  <motion.button
                    onClick={() => setShowPresentationEditor(true)}
                    className="bg-gradient-to-br from-green-500 to-emerald-500 p-6 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <h3 className="text-xl font-bold mb-2 text-blue-100">Presentations</h3>
                    <p className="text-green-100">Create interactive presentations</p>
                  </motion.button>

                  <motion.button
                    onClick={() => setShowInsightsAnalyzer(true)}
                    className="bg-gradient-to-br from-cyan-500 to-teal-500 p-6 rounded-xl hover:from-cyan-600 hover:to-teal-600 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <h3 className="text-xl font-bold mb-2 text-blue-100">Platform Insigte</h3>
                    <p className="text-cyan-100">Analyze platform evolution and insights</p>
                  </motion.button>

                  <motion.button
                    onClick={() => setShowSTEMResearch(true)}
                    className="bg-gradient-to-br from-violet-500 to-purple-500 p-6 rounded-xl hover:from-violet-600 hover:to-purple-600 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <h3 className="text-xl font-bold mb-2 text-blue-100">STEM Research</h3>
                    <p className="text-violet-100">Explore divine knowledge and skin coding</p>
                  </motion.button>

                  <motion.button
                    onClick={() => setCurrentView('stem')}
                    className="bg-gradient-to-br from-rose-500 to-pink-500 p-6 rounded-xl hover:from-rose-600 hover:to-pink-600 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <h3 className="text-xl font-bold mb-2 text-blue-100">Heavenly Lab</h3>
                    <p className="text-rose-100">Access full STEM research environment</p>
                  </motion.button>

                  <motion.button
                    onClick={() => setShowJesusAssistant(true)}
                    className="bg-gradient-to-br from-yellow-500 to-orange-500 p-6 rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <h3 className="text-xl font-bold mb-2 text-blue-100">Jesus Assistant</h3>
                    <p className="text-yellow-100">AI assistant for clan development and gift circulation</p>
                  </motion.button>

                  <motion.button
                    onClick={() => setShowPaymentIntegration(true)}
                    className="bg-gradient-to-br from-emerald-500 to-teal-500 p-6 rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <h3 className="text-xl font-bold mb-2 text-blue-100">Payment Integration</h3>
                    <p className="text-emerald-100">Empowerment through integrated payments</p>
                  </motion.button>

                  <motion.button
                    onClick={() => setShow3DCoding(true)}
                    className="bg-gradient-to-br from-cyan-500 to-blue-500 p-6 rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <h3 className="text-xl font-bold mb-2 text-blue-100">3D Coding System</h3>
                    <p className="text-cyan-100">128-bit to 11D space with QR money</p>
                  </motion.button>
                </div>

                {userCoins.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8"
                  >
                    <h3 className="text-2xl font-bold mb-4 text-blue-200">Your Coins</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {userCoins.map((coin) => (
                        <div key={coin.id} className="bg-blue/10 backdrop-blur-sm p-4 rounded-lg border border-blue/20">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-xl font-bold">
                              {coin.symbol}
                            </div>
                            <div>
                              <h4 className="font-bold text-blue-200">{coin.name}</h4>
                              <p className="text-sm text-blue-300">{coin.symbol}</p>
                            </div>
                          </div>
                          <p className="text-sm text-blue-300 mb-2">{coin.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-blue-400">Supply: {coin.totalSupply}</span>
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
                  className="bg-blue/10 backdrop-blur-sm rounded-xl p-6 border border-blue/20"
                >
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mb-4 flex items-center justify-center">
                      <User size={48} />
                    </div>
                    <h2 className="text-2xl font-bold text-blue-200">Your Profile</h2>
                    <p className="text-blue-300">SocialCoin Creator</p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-blue/5 p-4 rounded-lg">
                      <h3 className="font-bold mb-2 text-blue-200">Recent Transactions</h3>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {transactions.slice(0, 10).map((transaction) => (
                          <div key={transaction.id} className="flex justify-between items-center py-2 border-b border-blue/10 last:border-b-0">
                            <div>
                              <p className="font-medium text-blue-200">{transaction.description}</p>
                              <p className="text-sm text-blue-400">
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
          
          {currentView === 'stem' && (
            <div className="p-6">
              <STEMResearch
                onValueShare={(amount, description) => addTransaction('earned', amount, description)}
                onSkinApply={(theme) => {
                  console.log('Applied skin theme:', theme.name);
                  // Here you could apply the theme to the entire app
                }}
              />
            </div>
          )}
          
          {currentView === 'jesus' && (
            <div className="p-6">
              <JesusAssistant
                onGiftCirculation={(amount, description) => addTransaction('earned', amount, description)}
                onBlessingReceived={(blessing, value) => addTransaction('earned', value, `Blessing: ${blessing}`)}
                onCurseReversed={(curse, gift) => addTransaction('earned', 100, `Reversed ${curse} with ${gift}`)}
              />
            </div>
          )}
        </main>
      </div>

      {/* Bottom Navigation */}
      <motion.nav 
        className="fixed bottom-0 left-0 right-0 bg-black/20 backdrop-blur-md border-t border-blue/10 p-4 z-10"
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
                : 'text-blue-400 hover:text-blue-200 hover:bg-blue/10'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Home size={24} />
          </motion.button>
          
          <motion.button
            onClick={() => setCurrentView('insights')}
            className={`p-3 rounded-full transition-all ${
              currentView === 'insights' 
                ? 'bg-purple-500 text-white' 
                : 'text-blue-400 hover:text-blue-200 hover:bg-blue/10'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <TrendingUp size={24} />
          </motion.button>
          
          <motion.button
            onClick={() => setCurrentView('studio')}
            className={`p-3 rounded-full transition-all ${
              currentView === 'studio' 
                ? 'bg-purple-500 text-white' 
                : 'text-blue-400 hover:text-blue-200 hover:bg-blue/10'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Mic size={24} />
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

      {showInsightsAnalyzer && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-indigo-900/90 backdrop-blur-md rounded-2xl w-full max-w-7xl h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-blue-200 font-space">Platform Evolution Insights</h2>
                <button
                  onClick={() => setShowInsightsAnalyzer(false)}
                  className="p-2 hover:bg-blue/20 rounded-lg transition-colors text-blue-200"
                >
                  ✕
                </button>
              </div>
              <InsightsAnalyzer
                userActivity={{
                  totalPosts: 15,
                  totalLikes: 234,
                  totalFollowers: 89,
                  engagementRate: 0.85
                }}
                platformMetrics={{
                  totalUsers: 1250,
                  totalCoins: userCoins.length,
                  totalTransactions: transactions.length
                }}
                onInsightAction={(insight) => {
                  console.log('Implementing insight:', insight.title);
                  addTransaction('earned', 25, `Implemented: ${insight.title}`, 'main');
                  setShowInsightsAnalyzer(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
      
      {showSTEMResearch && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-indigo-900/90 backdrop-blur-md rounded-2xl w-full max-w-7xl h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-blue-200 font-space">STEM Research & Skin Coding</h2>
                <button
                  onClick={() => setShowSTEMResearch(false)}
                  className="p-2 hover:bg-blue/20 rounded-lg transition-colors text-blue-200"
                >
                  ✕
                </button>
              </div>
              <STEMResearch
                onValueShare={(amount, description) => addTransaction('earned', amount, description)}
                onSkinApply={(theme) => {
                  console.log('Applied skin theme:', theme.name);
                  setShowSTEMResearch(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
      
      {showJesusAssistant && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-yellow-900/90 via-orange-900/90 to-red-900/90 backdrop-blur-md rounded-2xl w-full max-w-7xl h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-blue-200 font-space">Jesus Assistant - Clan Development</h2>
                <button
                  onClick={() => setShowJesusAssistant(false)}
                  className="p-2 hover:bg-blue/20 rounded-lg transition-colors text-blue-200"
                >
                  ✕
                </button>
              </div>
              <JesusAssistant
                onGiftCirculation={(amount, description) => addTransaction('earned', amount, description)}
                onBlessingReceived={(blessing, value) => addTransaction('earned', value, `Blessing: ${blessing}`)}
                onCurseReversed={(curse, gift) => addTransaction('earned', 100, `Reversed ${curse} with ${gift}`)}
              />
            </div>
          </div>
        </div>
      )}
      
      {showPaymentIntegration && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-emerald-900/90 via-teal-900/90 to-cyan-900/90 backdrop-blur-md rounded-2xl w-full max-w-7xl h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-blue-200 font-space">Payment Integration & Empowerment</h2>
                <button
                  onClick={() => setShowPaymentIntegration(false)}
                  className="p-2 hover:bg-blue/20 rounded-lg transition-colors text-blue-200"
                >
                  ✕
                </button>
              </div>
              <PaymentIntegration
                onPaymentProcessed={(amount, description) => addTransaction('earned', amount, description)}
                onEmpowermentGained={(level, description) => addTransaction('earned', level * 10, description)}
                userBalance={getTotalCoins()}
              />
            </div>
          </div>
        </div>
      )}
      
      {show3DCoding && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-cyan-900/90 via-blue-900/90 to-indigo-900/90 backdrop-blur-md rounded-2xl w-full max-w-7xl h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-blue-200 font-space">3D Coding System - Dimensional Money</h2>
                <button
                  onClick={() => setShow3DCoding(false)}
                  className="p-2 hover:bg-blue/20 rounded-lg transition-colors text-blue-200"
                >
                  ✕
                </button>
              </div>
              <CodingSystem3D
                onMoneyGenerated={(money) => {
                  console.log('Generated paper money:', money);
                  addTransaction('earned', money.denomination, `Generated ${money.currency} paper money`);
                }}
                onValueCreated={(amount, description) => addTransaction('earned', amount, description)}
              />
            </div>
          </div>
        </div>
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