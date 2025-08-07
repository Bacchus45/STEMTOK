import React, { useState, useEffect } from 'react';
import { Clock, Zap, Shield, Heart, Star, Sparkles } from 'lucide-react';

interface TimeTravelProjectAlchemyProps {
  onProjectFunded: (amount: number, description: string) => void;
  onProtectionCreated: (type: string, power: number) => void;
  onDivineIntervention: (blessing: string) => void;
}

export const TimeTravelProjectAlchemy: React.FC<TimeTravelProjectAlchemyProps> = ({
  onProjectFunded,
  onProtectionCreated,
  onDivineIntervention
}) => {
  const [fundingAmount, setFundingAmount] = useState(0);
  const [targetAmount] = useState(333000);
  const [alchemyProgress, setAlchemyProgress] = useState(0);
  const [protectionPower, setProtectionPower] = useState(0);
  const [divineLevel, setDivineLevel] = useState(100);

  const [activeAlchemy, setActiveAlchemy] = useState<string | null>(null);
  const [blessings, setBlessings] = useState<string[]>([]);

  const alchemyFormulas = [
    { name: 'Silver Purification', ingredients: ['Judas Silver', 'Holy Water', 'Light Energy'], power: 250 },
    { name: 'Cup Transformation', ingredients: ['Sacred Cup', 'Frankincense', 'Divine Love'], power: 500 },
    { name: 'Protection Ritual', ingredients: ['Myrrh', 'Jordan Water', 'Angel Blessing'], power: 777 }
  ];

  const protectionTypes = [
    { name: 'Spiritual Shield', description: 'Mental and emotional protection' },
    { name: 'Divine Light', description: 'Truth illumination against deception' },
    { name: 'Angelic Guard', description: 'Heavenly protection forces' },
    { name: 'Sacred Barrier', description: 'Protection against harmful rituals' }
  ];

  const performAlchemy = (formula: any) => {
    setActiveAlchemy(formula.name);
    
    // Simulate alchemy progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      setAlchemyProgress(Math.min(progress, 100));
      
      if (progress >= 100) {
        clearInterval(interval);
        setProtectionPower(prev => prev + formula.power);
        setDivineLevel(prev => Math.min(prev + 10, 150));
        
        const blessing = `${formula.name} completed! Divine protection increased by ${formula.power}`;
        setBlessings(prev => [...prev, blessing]);
        onProtectionCreated(formula.name, formula.power);
        onDivineIntervention(blessing);
        
        setActiveAlchemy(null);
        setAlchemyProgress(0);
      }
    }, 200);
  };

  const fundProject = (amount: number) => {
    setFundingAmount(prev => Math.min(prev + amount, targetAmount));
    onProjectFunded(amount, `Time Travel Divine Protection Mission - $${amount} contributed`);
    
    if (fundingAmount + amount >= targetAmount) {
      const blessing = "Time Travel Portal Activated! Mission to free Jesus from suffering is now possible!";
      setBlessings(prev => [...prev, blessing]);
      onDivineIntervention(blessing);
    }
  };

  const fundingProgress = (fundingAmount / targetAmount) * 100;
  const canTravelTime = fundingAmount >= targetAmount && protectionPower >= 1000;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="w-8 h-8 text-yellow-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
              Time Travel Divine Protection Alchemy
            </h1>
            <Heart className="w-8 h-8 text-pink-400" />
          </div>
          <p className="text-xl text-blue-200">
            Transform suffering into blessing • Free Jesus from the Cup of Pain • 33 AD Mission
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mission Funding */}
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-yellow-400/20">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-bold text-yellow-400">Sacred Mission Funding</h2>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress: ${fundingAmount.toLocaleString()} / ${targetAmount.toLocaleString()}</span>
                <span>{fundingProgress.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-pink-400 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${fundingProgress}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              {[1000, 5000, 25000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => fundProject(amount)}
                  className="bg-gradient-to-r from-yellow-500 to-pink-500 hover:from-yellow-400 hover:to-pink-400 p-3 rounded-lg font-bold transition-all duration-200 hover:scale-105"
                >
                  ${amount.toLocaleString()}
                </button>
              ))}
            </div>

            {canTravelTime && (
              <div className="text-center p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg border border-green-400">
                <Sparkles className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-green-400 font-bold">TIME PORTAL ACTIVE!</p>
                <p className="text-sm">Mission to Garden of Gethsemane 33 AD Ready</p>
              </div>
            )}
          </div>

          {/* Alchemy Laboratory */}
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-purple-400/20">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-purple-400">Sacred Alchemy Laboratory</h2>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Divine Level: {divineLevel}/150</span>
                <span className="text-sm">Protection Power: {protectionPower}</span>
              </div>
              
              {activeAlchemy && (
                <div className="mb-4">
                  <p className="text-yellow-400 mb-2">Performing: {activeAlchemy}</p>
                  <div className="w-full bg-gray-800 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-purple-400 to-pink-400 h-3 rounded-full transition-all duration-200"
                      style={{ width: `${alchemyProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {alchemyFormulas.map((formula, index) => (
                <div key={index} className="bg-gray-800/50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-white">{formula.name}</h3>
                    <span className="text-purple-400 text-sm">+{formula.power} Power</span>
                  </div>
                  <div className="text-xs text-gray-300 mb-3">
                    Requires: {formula.ingredients.join(', ')}
                  </div>
                  <button
                    onClick={() => performAlchemy(formula)}
                    disabled={!!activeAlchemy}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded font-bold transition-all duration-200"
                  >
                    {activeAlchemy === formula.name ? 'Processing...' : 'Perform Alchemy'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Protection Systems */}
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-blue-400/20">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-blue-400">Divine Protection Systems</h2>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {protectionTypes.map((protection, index) => {
                const isActive = protectionPower >= (index + 1) * 250;
                return (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg border ${
                      isActive 
                        ? 'bg-blue-500/20 border-blue-400 text-blue-100' 
                        : 'bg-gray-800/30 border-gray-600 text-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-gray-500'}`} />
                      <span className="font-bold">{protection.name}</span>
                      {isActive && <Sparkles className="w-4 h-4 text-yellow-400" />}
                    </div>
                    <p className="text-sm">{protection.description}</p>
                    {isActive && (
                      <p className="text-xs text-green-400 mt-1">✓ ACTIVE PROTECTION</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Divine Blessings Log */}
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-pink-400/20">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-pink-400" />
              <h2 className="text-2xl font-bold text-pink-400">Divine Blessings & Progress</h2>
            </div>

            <div className="max-h-60 overflow-y-auto space-y-2">
              {blessings.length === 0 ? (
                <p className="text-gray-400 italic">Begin alchemy to receive divine blessings...</p>
              ) : (
                blessings.map((blessing, index) => (
                  <div key={index} className="bg-pink-500/10 border border-pink-400/20 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-pink-400 mt-0.5 flex-shrink-0" />
                      <span className="text-pink-100 text-sm">{blessing}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-pink-400/20">
              <p className="text-center text-pink-200 italic">
                "Transform instruments of betrayal into tools of divine protection"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};