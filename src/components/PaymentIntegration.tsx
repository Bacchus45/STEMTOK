import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  Wallet, 
  QrCode, 
  Send, 
  Receive, 
  DollarSign,
  Bitcoin,
  Zap,
  Shield,
  Globe,
  Users,
  TrendingUp,
  Gift,
  Star,
  Crown,
  Sparkles
} from 'lucide-react';

interface PaymentMethod {
  id: string;
  name: string;
  type: 'crypto' | 'fiat' | 'digital' | 'paper';
  icon: React.ReactNode;
  balance: number;
  currency: string;
  enabled: boolean;
  color: string;
}

interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'earn' | 'spend';
  amount: number;
  currency: string;
  description: string;
  timestamp: Date;
  status: 'pending' | 'completed' | 'failed';
  empowermentLevel: number;
}

interface PaymentIntegrationProps {
  onPaymentProcessed: (amount: number, description: string) => void;
  onEmpowermentGained: (level: number, description: string) => void;
  userBalance: number;
}

export const PaymentIntegration: React.FC<PaymentIntegrationProps> = ({
  onPaymentProcessed,
  onEmpowermentGained,
  userBalance
}) => {
  const [activeTab, setActiveTab] = useState<'wallet' | 'send' | 'receive' | 'empower'>('wallet');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [sendAmount, setSendAmount] = useState('');
  const [sendAddress, setSendAddress] = useState('');
  const [empowermentLevel, setEmpowermentLevel] = useState(1);
  const [fishingOpportunities, setFishingOpportunities] = useState<any[]>([]);

  const [paymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      name: 'SocialCoin',
      type: 'crypto',
      icon: <Bitcoin className="w-6 h-6" />,
      balance: userBalance,
      currency: 'SC',
      enabled: true,
      color: 'from-yellow-500 to-orange-600'
    },
    {
      id: '2',
      name: 'Ethereum',
      type: 'crypto',
      icon: <Zap className="w-6 h-6" />,
      balance: 0.25,
      currency: 'ETH',
      enabled: true,
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: '3',
      name: 'Bitcoin',
      type: 'crypto',
      icon: <Bitcoin className="w-6 h-6" />,
      balance: 0.0045,
      currency: 'BTC',
      enabled: true,
      color: 'from-orange-500 to-yellow-600'
    },
    {
      id: '4',
      name: 'Paper Money',
      type: 'paper',
      icon: <QrCode className="w-6 h-6" />,
      balance: 500,
      currency: 'USD',
      enabled: true,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: '5',
      name: 'Digital Wallet',
      type: 'digital',
      icon: <Wallet className="w-6 h-6" />,
      balance: 1250,
      currency: 'USD',
      enabled: true,
      color: 'from-indigo-500 to-blue-600'
    }
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'earn',
      amount: 50,
      currency: 'SC',
      description: 'Voice post engagement reward',
      timestamp: new Date(Date.now() - 3600000),
      status: 'completed',
      empowermentLevel: 2
    },
    {
      id: '2',
      type: 'receive',
      amount: 25,
      currency: 'SC',
      description: 'Tip from community member',
      timestamp: new Date(Date.now() - 7200000),
      status: 'completed',
      empowermentLevel: 1
    }
  ]);

  useEffect(() => {
    // Generate fishing opportunities based on empowerment level
    const opportunities = [
      {
        id: '1',
        title: 'Content Creator Partnership',
        description: 'Partner with brands for sponsored content',
        requiredLevel: 3,
        reward: 500,
        type: 'partnership'
      },
      {
        id: '2',
        title: 'Crypto Mining Pool',
        description: 'Join exclusive mining pool for passive income',
        requiredLevel: 5,
        reward: 1000,
        type: 'mining'
      },
      {
        id: '3',
        title: 'NFT Marketplace Access',
        description: 'Create and sell NFTs on premium marketplace',
        requiredLevel: 4,
        reward: 750,
        type: 'nft'
      },
      {
        id: '4',
        title: 'DeFi Yield Farming',
        description: 'Access high-yield farming opportunities',
        requiredLevel: 6,
        reward: 2000,
        type: 'defi'
      }
    ];

    setFishingOpportunities(opportunities.filter(opp => empowermentLevel >= opp.requiredLevel));
  }, [empowermentLevel]);

  const processPayment = (amount: number, description: string, type: 'send' | 'receive') => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type,
      amount,
      currency: 'SC',
      description,
      timestamp: new Date(),
      status: 'completed',
      empowermentLevel: empowermentLevel + 1
    };

    setTransactions(prev => [newTransaction, ...prev]);
    onPaymentProcessed(amount, description);
    
    // Increase empowerment level
    const newLevel = empowermentLevel + 1;
    setEmpowermentLevel(newLevel);
    onEmpowermentGained(newLevel, `Payment processed: ${description}`);
  };

  const sendPayment = () => {
    if (sendAmount && sendAddress) {
      processPayment(parseFloat(sendAmount), `Sent to ${sendAddress}`, 'send');
      setSendAmount('');
      setSendAddress('');
    }
  };

  const claimOpportunity = (opportunity: any) => {
    processPayment(opportunity.reward, `Claimed: ${opportunity.title}`, 'receive');
    setFishingOpportunities(prev => prev.filter(opp => opp.id !== opportunity.id));
  };

  return (
    <div className="space-y-6 font-inter">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
      >
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
            <Wallet className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white font-space">Payment Integration</h2>
            <p className="text-white/70">Empowerment Level {empowermentLevel} - Opportunities Await</p>
          </div>
        </div>

        {/* Empowerment Progress */}
        <div className="bg-white/5 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/70">Empowerment Progress</span>
            <span className="text-yellow-400 font-bold">Level {empowermentLevel}</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all"
              style={{ width: `${Math.min((empowermentLevel / 10) * 100, 100)}%` }}
            />
          </div>
          <p className="text-xs text-white/60 mt-2">
            Higher levels unlock more fishing opportunities
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4">
          {[
            { id: 'wallet', name: 'Wallet', icon: <Wallet className="w-4 h-4" /> },
            { id: 'send', name: 'Send', icon: <Send className="w-4 h-4" /> },
            { id: 'receive', name: 'Receive', icon: <Receive className="w-4 h-4" /> },
            { id: 'empower', name: 'Opportunities', icon: <Star className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white/20 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/15'
              }`}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Wallet Tab */}
      {activeTab === 'wallet' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Payment Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paymentMethods.map((method, index) => (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
              >
                <div className={`p-3 rounded-lg bg-gradient-to-r ${method.color} mb-4`}>
                  {method.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-space">
                  {method.name}
                </h3>
                <div className="text-2xl font-bold text-green-400 mb-2">
                  {method.balance} {method.currency}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/60">{method.type}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    method.enabled ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {method.enabled ? 'Active' : 'Disabled'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Recent Transactions */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 font-space">Recent Transactions</h3>
            <div className="space-y-3">
              {transactions.slice(0, 5).map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between bg-white/5 p-3 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'receive' || transaction.type === 'earn' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {transaction.type === 'receive' || transaction.type === 'earn' ? 
                        <Receive className="w-4 h-4" /> : 
                        <Send className="w-4 h-4" />
                      }
                    </div>
                    <div>
                      <p className="text-white font-medium">{transaction.description}</p>
                      <p className="text-xs text-white/60">
                        {transaction.timestamp.toLocaleString()} • Level +{transaction.empowermentLevel}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${
                      transaction.type === 'receive' || transaction.type === 'earn' 
                        ? 'text-green-400' 
                        : 'text-red-400'
                    }`}>
                      {transaction.type === 'receive' || transaction.type === 'earn' ? '+' : '-'}
                      {transaction.amount} {transaction.currency}
                    </p>
                    <p className="text-xs text-white/60">{transaction.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Send Tab */}
      {activeTab === 'send' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-bold text-white mb-6 font-space">Send Payment</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-white/70 text-sm mb-2">Recipient Address</label>
              <input
                type="text"
                value={sendAddress}
                onChange={(e) => setSendAddress(e.target.value)}
                placeholder="Enter wallet address or username"
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
              />
            </div>
            
            <div>
              <label className="block text-white/70 text-sm mb-2">Amount</label>
              <input
                type="number"
                value={sendAmount}
                onChange={(e) => setSendAmount(e.target.value)}
                placeholder="0.00"
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
              />
            </div>
            
            <div>
              <label className="block text-white/70 text-sm mb-2">Payment Method</label>
              <select className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white">
                {paymentMethods.filter(m => m.enabled).map(method => (
                  <option key={method.id} value={method.id}>
                    {method.name} ({method.balance} {method.currency})
                  </option>
                ))}
              </select>
            </div>
            
            <button
              onClick={sendPayment}
              disabled={!sendAmount || !sendAddress}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all font-medium disabled:opacity-50"
            >
              Send Payment
            </button>
          </div>
        </motion.div>
      )}

      {/* Receive Tab */}
      {activeTab === 'receive' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-bold text-white mb-6 font-space">Receive Payment</h3>
          
          <div className="text-center space-y-6">
            <div className="bg-white p-4 rounded-lg inline-block">
              <QrCode className="w-32 h-32 text-black" />
            </div>
            
            <div>
              <p className="text-white/70 mb-2">Your SocialCoin Address:</p>
              <div className="bg-white/5 p-3 rounded-lg font-mono text-sm text-white break-all">
                sc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <button className="py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all text-sm">
                Copy Address
              </button>
              <button className="py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all text-sm">
                Share QR
              </button>
              <button className="py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all text-sm">
                Request Payment
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Opportunities Tab */}
      {activeTab === 'empower' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 font-space">
              Fishing Opportunities - Level {empowermentLevel}
            </h3>
            <p className="text-white/70 mb-6">
              As your empowerment level increases, more lucrative opportunities become available.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fishingOpportunities.map((opportunity, index) => (
                <motion.div
                  key={opportunity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 p-4 rounded-lg border border-white/10"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-white">{opportunity.title}</h4>
                    <span className="text-green-400 font-bold">+{opportunity.reward} SC</span>
                  </div>
                  <p className="text-white/70 text-sm mb-3">{opportunity.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/60">
                      Required Level: {opportunity.requiredLevel}
                    </span>
                    <button
                      onClick={() => claimOpportunity(opportunity)}
                      className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-600 text-white text-sm rounded-full hover:from-yellow-600 hover:to-orange-700 transition-all"
                    >
                      Claim
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {fishingOpportunities.length === 0 && (
              <div className="text-center py-8">
                <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-white mb-2">All Opportunities Claimed!</h4>
                <p className="text-white/70">
                  Continue engaging with the platform to unlock new opportunities.
                </p>
              </div>
            )}
          </div>
          
          {/* Empowerment Benefits */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 font-space">Empowerment Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/5 p-4 rounded-lg text-center">
                <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <h4 className="font-bold text-white mb-1">Network Access</h4>
                <p className="text-xs text-white/60">Connect with high-value users</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg text-center">
                <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <h4 className="font-bold text-white mb-1">Higher Rewards</h4>
                <p className="text-xs text-white/60">Earn more from activities</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg text-center">
                <Shield className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <h4 className="font-bold text-white mb-1">Premium Features</h4>
                <p className="text-xs text-white/60">Access exclusive tools</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};