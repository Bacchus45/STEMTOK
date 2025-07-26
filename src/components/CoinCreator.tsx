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