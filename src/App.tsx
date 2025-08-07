import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, ArrowUpDown, DollarSign, Zap, Star, ShoppingCart, Target, Activity, BarChart3, Coins } from 'lucide-react';

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  volume: number;
  marketCap: number;
  color: string;
  chart: number[];
}

interface TradeOrder {
  id: string;
  type: 'buy' | 'sell';
  coin: string;
  amount: number;
  price: number;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  timestamp: Date;
}

interface CoinTradingInterfaceProps {
  onTradeComplete: (order: TradeOrder) => void;
  userBalance: number;
}

export const CoinTradingInterface: React.FC<CoinTradingInterfaceProps> = ({
  onTradeComplete,
  userBalance
}) => {
  const [activeTab, setActiveTab] = useState<'market' | 'trade' | 'portfolio' | 'orders'>('market');
  const [selectedCoin, setSelectedCoin] = useState<CoinData | null>(null);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [tradeAmount, setTradeAmount] = useState('');
  const [tradePrice, setTradePrice] = useState('');
  const [orders, setOrders] = useState<TradeOrder[]>([]);
  const [showTokenCreator, setShowTokenCreator] = useState(false);
  const [userTokens, setUserTokens] = useState<any[]>([]);
  const [newToken, setNewToken] = useState({
    name: '',
    symbol: '',
    totalSupply: 1000000,
    initialPrice: 1.0,
    description: ''
  });

  const [coinData, setCoinData] = useState<CoinData[]>([
    {
      id: 'socialcoin',
      name: 'SocialCoin',
      symbol: 'SC',
      price: 1.25,
      change24h: 8.5,
      volume: 2500000,
      marketCap: 125000000,
      color: '#6366f1',
      chart: [1.15, 1.18, 1.22, 1.20, 1.25, 1.28, 1.25]
    },
    {
      id: 'wintercoin',
      name: 'WinterCoin',
      symbol: 'WINTER',
      price: 0.85,
      change24h: -2.3,
      volume: 850000,
      marketCap: 85000000,
      color: '#3b82f6',
      chart: [0.90, 0.88, 0.85, 0.87, 0.85, 0.83, 0.85]
    },
    {
      id: 'creatorcoin',
      name: 'CreatorCoin',
      symbol: 'CREATE',
      price: 2.10,
      change24h: 15.2,
      volume: 1750000,
      marketCap: 210000000,
      color: '#8b5cf6',
      chart: [1.82, 1.88, 1.95, 2.05, 2.10, 2.08, 2.10]
    },
    {
      id: 'voicecoin',
      name: 'VoiceCoin',
      symbol: 'VOICE',
      price: 0.65,
      change24h: 5.8,
      volume: 1200000,
      marketCap: 65000000,
      color: '#10b981',
      chart: [0.61, 0.63, 0.62, 0.64, 0.66, 0.65, 0.65]
    }
  ]);

  useEffect(() => {
    // Simulate real-time price updates
    const interval = setInterval(() => {
      setCoinData(prev => prev.map(coin => ({
        ...coin,
        price: coin.price + (Math.random() - 0.5) * 0.05,
        change24h: coin.change24h + (Math.random() - 0.5) * 2,
        chart: [...coin.chart.slice(1), coin.price + (Math.random() - 0.5) * 0.1]
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleTrade = () => {
    if (!selectedCoin || !tradeAmount || !tradePrice) return;

    const order: TradeOrder = {
      id: Date.now().toString(),
      type: tradeType,
      coin: selectedCoin.symbol,
      amount: parseFloat(tradeAmount),
      price: parseFloat(tradePrice),
      total: parseFloat(tradeAmount) * parseFloat(tradePrice),
      status: 'completed',
      timestamp: new Date()
    };

    setOrders(prev => [order, ...prev]);
    onTradeComplete(order);
    
    // Reset form
    setTradeAmount('');
    setTradePrice('');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 4
    }).format(price);
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `$${(volume / 1000000).toFixed(1)}M`;
    }
    return `$${(volume / 1000).toFixed(0)}K`;
  };

  return (
    <div className="space-y-6 font-inter">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
      >
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white font-space">Coin Trading</h2>
            <p className="text-white/70">Trade social currencies and earn rewards</p>
          </div>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/5 p-4 rounded-lg text-center">
            <p className="text-white/60 text-sm">Portfolio Value</p>
            <p className="text-2xl font-bold text-green-400">{formatPrice(userBalance * 1.25)}</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg text-center">
            <p className="text-white/60 text-sm">Available Balance</p>
            <p className="text-2xl font-bold text-blue-400">{formatPrice(userBalance)}</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg text-center">
            <p className="text-white/60 text-sm">24h Gain/Loss</p>
            <p className="text-2xl font-bold text-green-400">+{formatPrice(125.50)}</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg text-center">
            <p className="text-white/60 text-sm">Total Orders</p>
            <p className="text-2xl font-bold text-purple-400">{orders.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4">
          {[
            { id: 'market', name: 'Market', icon: <BarChart3 className="w-4 h-4" /> },
            { id: 'trade', name: 'Trade', icon: <ArrowUpDown className="w-4 h-4" /> },
            { id: 'portfolio', name: 'Portfolio', icon: <Target className="w-4 h-4" /> },
            { id: 'orders', name: 'Orders', icon: <Activity className="w-4 h-4" /> }
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

      {/* Market Tab */}
      {activeTab === 'market' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-bold text-white mb-4 font-space">Market Overview</h3>
          
          <div className="space-y-4">
            {coinData.map((coin) => (
              <motion.div
                key={coin.id}
                whileHover={{ y: -2 }}
                className="bg-white/5 p-4 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-all"
                onClick={() => {
                  setSelectedCoin(coin);
                  setActiveTab('trade');
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white"
                      style={{ backgroundColor: coin.color }}
                    >
                      {coin.symbol.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{coin.name}</h4>
                      <p className="text-white/60 text-sm">{coin.symbol}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    {/* Mini Chart */}
                    <div className="w-24 h-8 flex items-end space-x-1">
                      {coin.chart.map((value, index) => (
                        <div
                          key={index}
                          className={`w-2 rounded-full ${
                            coin.change24h >= 0 ? 'bg-green-400' : 'bg-red-400'
                          }`}
                          style={{ 
                            height: `${(value / Math.max(...coin.chart)) * 32}px`,
                            opacity: 0.3 + (index / coin.chart.length) * 0.7
                          }}
                        />
                      ))}
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-white">{formatPrice(coin.price)}</p>
                      <div className={`flex items-center space-x-1 text-sm ${
                        coin.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {coin.change24h >= 0 ? 
                          <TrendingUp className="w-3 h-3" /> : 
                          <TrendingDown className="w-3 h-3" />
                        }
                        <span>{Math.abs(coin.change24h).toFixed(1)}%</span>
                      </div>
                    </div>
                    
                    <div className="text-right text-sm text-white/60">
                      <p>Vol: {formatVolume(coin.volume)}</p>
                      <p>MCap: {formatVolume(coin.marketCap)}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Trade Tab */}
      {activeTab === 'trade' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Coin Selection */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 font-space">Select Coin</h3>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              {coinData.map((coin) => (
                <button
                  key={coin.id}
                  onClick={() => setSelectedCoin(coin)}
                  className={`p-3 rounded-lg border transition-all text-left ${
                    selectedCoin?.id === coin.id
                      ? 'border-blue-400 bg-blue-500/20'
                      : 'border-white/20 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: coin.color }}
                    >
                      {coin.symbol.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">{coin.symbol}</p>
                      <p className="text-white/60 text-xs">{formatPrice(coin.price)}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {selectedCoin && (
              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="font-bold text-white mb-2">{selectedCoin.name}</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-white/60">Price:</span>
                    <p className="text-white font-bold">{formatPrice(selectedCoin.price)}</p>
                  </div>
                  <div>
                    <span className="text-white/60">24h Change:</span>
                    <p className={`font-bold ${selectedCoin.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {selectedCoin.change24h >= 0 ? '+' : ''}{selectedCoin.change24h.toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Trading Interface */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 font-space">Place Order</h3>
            
            {/* Buy/Sell Toggle */}
            <div className="flex space-x-2 mb-6">
              <button
                onClick={() => setTradeType('buy')}
                className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                  tradeType === 'buy'
                    ? 'bg-green-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setTradeType('sell')}
                className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                  tradeType === 'sell'
                    ? 'bg-red-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                Sell
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm mb-2">Amount</label>
                <input
                  type="number"
                  value={tradeAmount}
                  onChange={(e) => setTradeAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-blue-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">Price</label>
                <input
                  type="number"
                  value={tradePrice}
                  onChange={(e) => setTradePrice(e.target.value)}
                  placeholder={selectedCoin ? selectedCoin.price.toString() : '0.00'}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-blue-400 focus:outline-none"
                />
              </div>

              {tradeAmount && tradePrice && (
                <div className="bg-white/5 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Total:</span>
                    <span className="text-white font-bold">
                      {formatPrice(parseFloat(tradeAmount) * parseFloat(tradePrice))}
                    </span>
                  </div>
                </div>
              )}

              <button
                onClick={handleTrade}
                disabled={!selectedCoin || !tradeAmount || !tradePrice}
                className={`w-full py-3 rounded-lg font-medium transition-all disabled:opacity-50 ${
                  tradeType === 'buy'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                    : 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700'
                } text-white`}
              >
                {tradeType === 'buy' ? 'Buy' : 'Sell'} {selectedCoin?.symbol || 'Coin'}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Portfolio Tab */}
      {activeTab === 'portfolio' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-bold text-white mb-4 font-space">Your Portfolio</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coinData.slice(0, 3).map((coin, index) => (
              <div key={coin.id} className="bg-white/5 p-4 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                    style={{ backgroundColor: coin.color }}
                  >
                    {coin.symbol.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{coin.symbol}</h4>
                    <p className="text-white/60 text-sm">{coin.name}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Holdings:</span>
                    <span className="text-white">{(Math.random() * 1000).toFixed(2)} {coin.symbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Value:</span>
                    <span className="text-green-400 font-bold">{formatPrice(coin.price * (Math.random() * 1000))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">24h:</span>
                    <span className={coin.change24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                      {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-bold text-white mb-4 font-space">Recent Orders</h3>
          
          {orders.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">No Orders Yet</h4>
              <p className="text-white/70">Start trading to see your order history here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => (
                <div key={order.id} className="bg-white/5 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        order.type === 'buy' ? 'bg-green-400' : 'bg-red-400'
                      }`} />
                      <div>
                        <p className="font-bold text-white">
                          {order.type.toUpperCase()} {order.amount} {order.coin}
                        </p>
                        <p className="text-white/60 text-sm">
                          {formatPrice(order.price)} • {order.timestamp.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-white">{formatPrice(order.total)}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};