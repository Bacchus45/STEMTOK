import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, User, Home, TrendingUp, Menu, Settings, MessageCircle, BarChart3, TrendingDown } from 'lucide-react';
import { Background3D } from './components/Background3D';
import { Feed } from './components/Feed';
import { CoinCreator } from './components/CoinCreator';
import { CoinManager } from './components/CoinManager';
import { PresentationEditor } from './components/PresentationEditor';
import { UserRegistration } from './components/UserRegistration';
import { VoiceRecorder } from './components/VoiceRecorder';
import { CoinTradingInterface } from './components/CoinTradingInterface';
import { DashboardAnalytics } from './components/DashboardAnalytics';
import { ChatMessagingSystem } from './components/ChatMessagingSystem';
import { UserCoin, Transaction } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [showCoinCreator, setShowCoinCreator] = useState(false);
  const [showCoinManager, setShowCoinManager] = useState(false);
  const [showPresentationEditor, setShowPresentationEditor] = useState(false);
  const [showUserRegistration, setShowUserRegistration] = useState(false);
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userCoins, setUserCoins] = useState<UserCoin[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'earned',
      amount: 50,
      description: 'Welcome bonus for joining SocialCoin!',
      createdAt: new Date(),
      coinType: 'main'
    },
    {
      id: '2',
      type: 'earned',
      amount: 25,
      description: 'Voice post engagement reward',
      createdAt: new Date(Date.now() - 3600000),
      coinType: 'main'
    },
    {
      id: '3',
      type: 'earned',
      amount: 15,
      description: 'Community interaction bonus',
      createdAt: new Date(Date.now() - 7200000),
      coinType: 'main'
    }
  ]);
  
  // Add sample user coins
  useEffect(() => {
    const sampleCoins: UserCoin[] = [
      {
        id: 'winter-coin',
        name: 'WinterCoin',
        symbol: 'WINTER',
        description: 'A seasonal cryptocurrency perfect for the holiday season with special rewards and community features.',
        totalSupply: 1000000,
        currentSupply: 850000,
        color: '#3b82f6',
        seasonal: true,
        startDate: new Date('2024-12-01'),
        endDate: new Date('2025-03-01'),
        createdAt: new Date(Date.now() - 86400000),
        createdBy: 'current-user'
      },
      {
        id: 'creator-coin',
        name: 'CreatorCoin',
        symbol: 'CREATE',
        description: 'Empowering content creators with decentralized rewards and community-driven value.',
        totalSupply: 500000,
        currentSupply: 500000,
        color: '#8b5cf6',
        seasonal: false,
        createdAt: new Date(Date.now() - 172800000),
        createdBy: 'current-user'
      }
    ];
    
    setUserCoins(sampleCoins);
  }, []);

  const handleUserRegistered = (userData: any) => {
    setCurrentUser(userData);
    setShowUserRegistration(false);
    addTransaction('earned', 100, 'Welcome bonus for new user!', 'main');
  };

  const handleVoiceRecording = (audioBlob: Blob, duration: number) => {
    addTransaction('earned', 25, `Voice message recorded (${duration}s)`, 'main');
    setShowVoiceRecorder(false);
  };

  const handleTradeComplete = (order: any) => {
    const amount = order.type === 'buy' ? -order.total : order.total;
    addTransaction(order.type === 'buy' ? 'spent' : 'earned', Math.abs(amount), 
      `${order.type.toUpperCase()} ${order.amount} ${order.coin}`, 'main');
  };

  // Get background variant based on current view
  const getBackgroundVariant = () => {
    if (currentView === 'profile') return 'profile';
    if (currentView === 'studio') return 'studio';
    if (currentView === 'chat') return 'insights';
    if (currentView === 'trading') return 'insights';
    if (currentView === 'analytics') return 'insights';
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

  const handleVoiceRecording = (audioBlob: Blob, duration: number) => {
    // Process the voice recording
    console.log('Voice recording received:', audioBlob, duration);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Background3D variant={getBackgroundVariant()} />
      
      {/* Header */}
      <motion.header 
        className="relative z-10 p-6 flex justify-between items-center bg-white/10 backdrop-blur-md rounded-2xl mb-6 mx-6 border border-white/20"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowSidePanel(!showSidePanel)}
            className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
          >
            <Menu size={20} className="text-white" />
          </button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-space">
            SocialCoin
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-3 rounded-full font-bold shadow-lg">
            <span className="text-blue-900">{getTotalCoins()} Coins</span>
          </div>
          
          <button 
            onClick={() => setShowUserRegistration(true)}
            className="p-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg"
          >
            <Settings size={20} className="text-white" />
          </button>
          
          <button className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg">
            <User size={20} className="text-white" />
          </button>
        </div>
      </motion.header>

      <div className="flex">
        {/* Side Panel */}
        <AnimatePresence>
          {showSidePanel && (
            <motion.aside
              initial={{ x: -280, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -280, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 w-72 h-full bg-white/10 backdrop-blur-md z-20 pt-24 border-r border-white/20"
            >
              <div className="p-6 space-y-6">
                <h2 className="text-2xl font-bold text-white font-space">Insights</h2>
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <p className="text-sm text-white/60">Total Earned</p>
                    <p className="text-2xl font-bold text-green-400">
                      {transactions.filter(t => t.type === 'earned').reduce((sum, t) => sum + t.amount, 0)} Coins
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <p className="text-sm text-white/60">Total Spent</p>
                    <p className="text-2xl font-bold text-red-400">
                      {transactions.filter(t => t.type === 'spent').reduce((sum, t) => sum + t.amount, 0)} Coins
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <p className="text-sm text-white/60">User Coins Created</p>
                    <p className="text-2xl font-bold text-blue-400">{userCoins.length}</p>
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${showSidePanel ? 'ml-72' : 'ml-0'} p-6`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentView === 'home' && (
                <Feed 
                  onEarnCoins={(amount, description) => addTransaction('earned', amount, description)}
                />
              )}
              
              {currentView === 'insights' && (
                <DashboardAnalytics
                  userBalance={getTotalCoins()}
                  totalTransactions={transactions.length}
                />
              )}
              
              {currentView === 'studio' && (
                <div className="space-y-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center mb-8"
                    >
                      <h2 className="text-4xl font-bold mb-4 text-white font-space">Creator Studio</h2>
                      <p className="text-white/70 text-lg">Create content, manage your coins, and build presentations</p>
                    </motion.div>
                  </div>
                  
                  {/* Studio Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { 
                        title: 'Create Coin', 
                        desc: 'Launch your own social currency', 
                        color: 'from-purple-500 to-pink-500',
                        action: () => setShowCoinCreator(true)
                      },
                      { 
                        title: 'Manage Coins', 
                        desc: 'View and manage your created coins', 
                        color: 'from-blue-500 to-cyan-500',
                        action: () => setShowCoinManager(true)
                      },
                      { 
                        title: 'Presentations', 
                        desc: 'Create interactive presentations', 
                        color: 'from-green-500 to-emerald-500',
                        action: () => setShowPresentationEditor(true)
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 cursor-pointer hover:bg-white/15 transition-all"
                        onClick={item.action}
                      >
                        <div className={`p-4 rounded-xl bg-gradient-to-r ${item.color} mb-4`}>
                          <Mic className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white font-space">{item.title}</h3>
                        <p className="text-white/70">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>

                  {userCoins.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-8"
                    >
                      <h3 className="text-2xl font-bold mb-4 text-white">Your Coins</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {userCoins.map((coin) => (
                          <div key={coin.id} className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-xl font-bold text-white">
                                {coin.symbol}
                              </div>
                              <div>
                                <h4 className="font-bold text-white">{coin.name}</h4>
                                <p className="text-sm text-white/70">{coin.symbol}</p>
                              </div>
                            </div>
                            <p className="text-sm text-white/70 mb-2">{coin.description}</p>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-white/60">Supply: {coin.totalSupply}</span>
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
              )}
              
              {currentView === 'trading' && (
                <CoinTradingInterface
                  onTradeComplete={handleTradeComplete}
                  userBalance={getTotalCoins()}
                />
              )}
              
              {currentView === 'chat' && (
                <ChatMessagingSystem
                  currentUserId="current-user"
                  onSendMessage={(message, chatId) => {
                    addTransaction('earned', 5, 'Message sent', 'main');
                  }}
                />
              )}
              
              {currentView === 'analytics' && (
                <DashboardAnalytics
                  userBalance={getTotalCoins()}
                  totalTransactions={transactions.length}
                />
              )}

              {/* Profile view */}
              {currentView === 'profile' && (
                <div className="max-w-2xl mx-auto">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center mb-6"
                    >
                      <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mb-4 flex items-center justify-center">
                        <User size={64} className="text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-white font-space">Your Profile</h2>
                      <p className="text-white/70 text-lg">SocialCoin Creator</p>
                    </motion.div>

                    {currentUser && (
                      <div className="bg-white/5 p-4 rounded-lg mb-6">
                        <h3 className="font-bold mb-2 text-white">Account Information</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-white/60">Registration Date:</span>
                            <p className="text-white">{currentUser.registrationDate.toLocaleDateString()}</p>
                          </div>
                          <div>
                            <span className="text-white/60">Account Type:</span>
                            <p className="text-white">{currentUser.userType === 'individual' ? 'Individual' : 'Company'}</p>
                          </div>
                          {currentUser.userType === 'individual' ? (
                            <>
                              <div>
                                <span className="text-white/60">Birthday:</span>
                                <p className="text-white">{new Date(currentUser.birthday).toLocaleDateString()}</p>
                              </div>
                              <div>
                                <span className="text-white/60">ID Number:</span>
                                <p className="text-white">***{currentUser.idNumber?.slice(-4)}</p>
                              </div>
                            </>
                          ) : (
                            <>
                              <div>
                                <span className="text-white/60">Company Founded:</span>
                                <p className="text-white">{new Date(currentUser.companyBirthday).toLocaleDateString()}</p>
                              </div>
                              <div>
                                <span className="text-white/60">Company ID:</span>
                                <p className="text-white">***{currentUser.companyId?.slice(-4)}</p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                    
                      {currentUser && (
                        <div className="bg-blue/5 p-4 rounded-lg mb-6">
                          <h3 className="font-bold mb-2 text-blue-200">Account Information</h3>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-blue-400">Registration Date:</span>
                              <p className="text-blue-200">{currentUser.registrationDate.toLocaleDateString()}</p>
                            </div>
                            <div>
                              <span className="text-blue-400">Account Type:</span>
                              <p className="text-blue-200">{currentUser.userType === 'individual' ? 'Individual' : 'Company'}</p>
                            </div>
                            {currentUser.userType === 'individual' ? (
                              <>
                                <div>
                                  <span className="text-blue-400">Birthday:</span>
                                  <p className="text-blue-200">{new Date(currentUser.birthday).toLocaleDateString()}</p>
                                </div>
                                <div>
                                  <span className="text-blue-400">ID Number:</span>
                                  <p className="text-blue-200">***{currentUser.idNumber?.slice(-4)}</p>
                                </div>
                              </>
                            ) : (
                              <>
                                <div>
                                  <span className="text-blue-400">Company Founded:</span>
                                  <p className="text-blue-200">{new Date(currentUser.companyBirthday).toLocaleDateString()}</p>
                                </div>
                                <div>
                                  <span className="text-blue-400">Company ID:</span>
                                  <p className="text-blue-200">***{currentUser.companyId?.slice(-4)}</p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                      
                    {/* Transaction history */}
                    <div className="space-y-4">
                      <h3 className="font-bold mb-4 text-white text-xl font-space">Recent Transactions</h3>
                      <div className="space-y-3 max-h-80 overflow-y-auto">
                        {transactions.slice(0, 10).map((transaction) => (
                          <motion.div 
                            key={transaction.id} 
                            className="flex justify-between items-center p-4 bg-white/5 rounded-lg border border-white/10"
                            whileHover={{ scale: 1.02 }}
                          >
                            <div>
                              <p className="font-medium text-white">{transaction.description}</p>
                              <p className="text-sm text-white/60">
                                {transaction.createdAt.toLocaleDateString()}
                              </p>
                            </div>
                            <span className={`font-bold text-lg ${
                              transaction.type === 'earned' ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {transaction.type === 'earned' ? '+' : '-'}{transaction.amount}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
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
              onClick={() => setCurrentView('trading')}
              className={`p-3 rounded-full transition-all ${
                currentView === 'trading' 
                  ? 'bg-purple-500 text-white' 
                  : 'text-blue-400 hover:text-blue-200 hover:bg-blue/10'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <TrendingDown size={24} />
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
            
            <motion.button
              onClick={() => setCurrentView('chat')}
              className={`p-3 rounded-full transition-all ${
                currentView === 'chat' 
                  ? 'bg-purple-500 text-white' 
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <MessageCircle size={24} />
            </motion.button>
            
            <motion.button
              onClick={() => setCurrentView('analytics')}
              className={`p-3 rounded-full transition-all ${
                currentView === 'analytics' 
                  ? 'bg-purple-500 text-white' 
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <BarChart3 size={24} />
            </motion.button>
          </div>
        </motion.nav>

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
                : 'text-white/60 hover:text-white hover:bg-white/10'
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
                : 'text-white/60 hover:text-white hover:bg-white/10'
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
                : 'text-white/60 hover:text-white hover:bg-white/10'
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
      
      {showUserRegistration && (
        <UserRegistration
          onClose={() => setShowUserRegistration(false)}
          onUserRegistered={handleUserRegistered}
        />
      )}
      
      {showVoiceRecorder && (
        <VoiceRecorder
          isOpen={showVoiceRecorder}
          onClose={() => setShowVoiceRecorder(false)}
          onRecordingComplete={handleVoiceRecording}
        />
      )}
      
      {/* Floating Voice Record Button */}
      <motion.button
        onClick={() => setShowVoiceRecorder(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-24 right-6 w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center z-40"
        animate={{
          boxShadow: ['0 0 20px rgba(168, 85, 247, 0.4)', '0 0 40px rgba(168, 85, 247, 0.8)', '0 0 20px rgba(168, 85, 247, 0.4)']
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Mic className="w-7 h-7 text-white" />
      </motion.button>
    </div>
  );
}