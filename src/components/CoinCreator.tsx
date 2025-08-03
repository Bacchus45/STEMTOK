import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coins, Palette, Calendar, TrendingUp, X } from 'lucide-react';
import { UserCoin } from '../types';

interface CoinCreatorProps {
  onClose: () => void;
  onCoinCreated: (coin: UserCoin) => void;
}

export const CoinCreator: React.FC<CoinCreatorProps> = ({ onClose, onCoinCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    description: '',
    totalSupply: 1000000,
    coinType: 'standard',
    faceSize: 'medium',
    valueIntensity: 50,
    creativeTeaching: false,
    color: '#6366f1',
    seasonal: false,
    startDate: '',
    endDate: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Coin name is required';
    }

    if (!formData.symbol.trim()) {
      newErrors.symbol = 'Symbol is required';
    } else if (formData.symbol.length > 5) {
      newErrors.symbol = 'Symbol must be 5 characters or less';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (formData.totalSupply < 1000) {
      newErrors.totalSupply = 'Total supply must be at least 1,000';
    }

    if (formData.coinType === 'angel' && !formData.creativeTeaching) {
      newErrors.creativeTeaching = 'Angel coins must enable creative teaching';
    }

    if (formData.seasonal) {
      if (!formData.startDate) {
        newErrors.startDate = 'Start date is required for seasonal coins';
      }
      if (!formData.endDate) {
        newErrors.endDate = 'End date is required for seasonal coins';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const newCoin: UserCoin = {
      id: Date.now().toString(),
      name: formData.name,
      symbol: formData.symbol.toUpperCase(),
      description: formData.description,
      totalSupply: formData.totalSupply,
      currentSupply: formData.totalSupply,
      color: formData.color,
      coinType: formData.coinType,
      faceSize: formData.faceSize,
      valueIntensity: formData.valueIntensity,
      creativeTeaching: formData.creativeTeaching,
      seasonal: formData.seasonal,
      startDate: formData.seasonal ? new Date(formData.startDate) : undefined,
      endDate: formData.seasonal ? new Date(formData.endDate) : undefined,
      createdAt: new Date(),
      createdBy: 'current-user'
    };

    onCoinCreated(newCoin);
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl w-full border border-white/20"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white font-space">Create Your Coin</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white/70" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/70 text-sm mb-2">Coin Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-indigo-400 focus:outline-none"
                placeholder="e.g., WinterCoin"
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-white/70 text-sm mb-2">Symbol *</label>
              <input
                type="text"
                value={formData.symbol}
                onChange={(e) => updateFormData('symbol', e.target.value.toUpperCase())}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-indigo-400 focus:outline-none"
                placeholder="e.g., WINTER"
                maxLength={5}
              />
              {errors.symbol && <p className="text-red-400 text-sm mt-1">{errors.symbol}</p>}
            </div>
          </div>

          {/* Coin Type Selection */}
          <div>
            <label className="block text-white/70 text-sm mb-2">Coin Type</label>
            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => updateFormData('coinType', 'small')}
                className={`p-4 rounded-lg border transition-all text-center ${
                  formData.coinType === 'small'
                    ? 'border-yellow-400 bg-yellow-500/20 text-white'
                    : 'border-white/20 bg-white/10 text-white/70 hover:bg-white/15'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mb-2"></div>
                <div className="text-sm font-medium">Small Coin</div>
                <div className="text-xs text-white/60">Intense Value</div>
              </button>
              <button
                type="button"
                onClick={() => updateFormData('coinType', 'big')}
                className={`p-4 rounded-lg border transition-all text-center ${
                  formData.coinType === 'big'
                    ? 'border-blue-400 bg-blue-500/20 text-white'
                    : 'border-white/20 bg-white/10 text-white/70 hover:bg-white/15'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-2"></div>
                <div className="text-sm font-medium">Big Coin</div>
                <div className="text-xs text-white/60">Growth Focus</div>
              </button>
              <button
                type="button"
                onClick={() => updateFormData('coinType', 'angel')}
                className={`p-4 rounded-lg border transition-all text-center ${
                  formData.coinType === 'angel'
                    ? 'border-pink-400 bg-pink-500/20 text-white'
                    : 'border-white/20 bg-white/10 text-white/70 hover:bg-white/15'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-400 to-rose-500 mx-auto mb-2 flex items-center justify-center text-white">
                  👼
                </div>
                <div className="text-sm font-medium">Angel Coin</div>
                <div className="text-xs text-white/60">Teach to Fish</div>
              </button>
            </div>
          </div>

          {/* Face Size and Value Intensity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/70 text-sm mb-2">Face Size</label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={formData.faceSize === 'small' ? 25 : formData.faceSize === 'medium' ? 50 : 75}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    updateFormData('faceSize', val <= 33 ? 'small' : val <= 66 ? 'medium' : 'large');
                  }}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-white/60">
                  <span>Small (Intense)</span>
                  <span>Medium</span>
                  <span>Large (Impressive)</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-white/70 text-sm mb-2">Value Intensity: {formData.valueIntensity}%</label>
              <input
                type="range"
                min="1"
                max="100"
                value={formData.valueIntensity}
                onChange={(e) => updateFormData('valueIntensity', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-white/60 mt-1">
                <span>Growth Only</span>
                <span>Balanced</span>
                <span>Maximum Value</span>
              </div>
            </div>
          </div>

          {formData.coinType === 'angel' && (
            <div className="p-4 bg-pink-500/10 rounded-lg border border-pink-500/20">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.creativeTeaching}
                  onChange={(e) => updateFormData('creativeTeaching', e.target.checked)}
                  className="w-5 h-5 rounded border border-white/20 bg-white/10 text-pink-500 focus:ring-pink-500"
                />
                <span className="text-white/90">Enable Creative Teaching ("Teach to Fish")</span>
              </label>
              <p className="text-pink-300 text-sm mt-2">
                👼 Angel coins empower users to create their own value through learning and creativity, 
                rather than just receiving rewards. They focus on sustainable value creation skills.
              </p>
              {errors.creativeTeaching && <p className="text-red-400 text-sm mt-1">{errors.creativeTeaching}</p>}
            </div>
          )}

          {/* Value Philosophy Explanation */}
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-bold text-white mb-3">Coin Value Philosophy</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mb-2"></div>
                <h5 className="font-bold text-yellow-400">Small Coins</h5>
                <p className="text-white/70">Concentrated intense value in compact form. High utility per unit.</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-2"></div>
                <h5 className="font-bold text-blue-400">Big Coins</h5>
                <p className="text-white/70">Impressive visual details focused on growth and expansion potential.</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-rose-500 mx-auto mb-2 flex items-center justify-center">
                  👼
                </div>
                <h5 className="font-bold text-pink-400">Angel Coins</h5>
                <p className="text-white/70">Creative teaching tools that empower users to generate their own value.</p>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-2">Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => updateFormData('description', e.target.value)}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-indigo-400 focus:outline-none h-24 resize-none"
              placeholder="Describe your coin's purpose and unique features..."
            />
            {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/70 text-sm mb-2">Total Supply *</label>
              <input
                type="number"
                value={formData.totalSupply}
                onChange={(e) => updateFormData('totalSupply', parseInt(e.target.value))}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-indigo-400 focus:outline-none"
                min="1000"
              />
              {errors.totalSupply && <p className="text-red-400 text-sm mt-1">{errors.totalSupply}</p>}
            </div>

            <div>
              <label className="block text-white/70 text-sm mb-2">Coin Color</label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={formData.color}
                  onChange={(e) => updateFormData('color', e.target.value)}
                  className="w-12 h-12 rounded-lg border border-white/20 bg-transparent cursor-pointer"
                />
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold border border-white/20"
                  style={{ backgroundColor: formData.color }}
                >
                  {formData.symbol.charAt(0) || '?'}
                </div>
                <div className="flex-1 p-3 bg-white/10 border border-white/20 rounded-lg text-white">
                  {formData.color}
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.seasonal}
                onChange={(e) => updateFormData('seasonal', e.target.checked)}
                className="w-5 h-5 rounded border border-white/20 bg-white/10 text-indigo-500 focus:ring-indigo-500"
              />
              <span className="text-white/90">Make this a seasonal coin</span>
            </label>
            <p className="text-white/60 text-sm mt-1">
              Seasonal coins have a limited time period when they're active
            </p>
          </div>

          {formData.seasonal && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <div>
                <label className="block text-white/70 text-sm mb-2">Start Date *</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => updateFormData('startDate', e.target.value)}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-indigo-400 focus:outline-none"
                />
                {errors.startDate && <p className="text-red-400 text-sm mt-1">{errors.startDate}</p>}
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">End Date *</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => updateFormData('endDate', e.target.value)}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-indigo-400 focus:outline-none"
                />
                {errors.endDate && <p className="text-red-400 text-sm mt-1">{errors.endDate}</p>}
              </div>
            </div>
          )}

          <div className="flex space-x-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg transition-all font-medium"
            >
              Create Coin
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};