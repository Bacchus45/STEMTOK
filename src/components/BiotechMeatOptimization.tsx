import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Dna, Target, Zap, Layers, RotateCcw, Activity, Database, Users, Truck, Shield, Brain, Heart, Beef as Meat, FlaskRound as Flask, Microscope, BarChart3, TrendingUp, Clock, MapPin, Package, Gauge, Radio, Atom, Star, Eye, Settings, Play, Pause, Square } from 'lucide-react';

interface CentrifugeZone {
  id: string;
  name: string;
  position: 'outer' | 'mid' | 'inner';
  spinSpeed: number;
  meatProfile: {
    fatContent: number;
    proteinDensity: number;
    mineralContent: number;
    omegaBlend: number;
    myoglobin: number;
  };
  nutritionalUse: string;
  color: string;
  temperature: number;
  pressure: number;
  extractionRate: number;
}

interface ClonedMeatBatch {
  id: string;
  sourceAnimal: string;
  generation: number;
  tissueType: string;
  biomass: number;
  quality: number;
  dnaIntegrity: number;
  processedAt: Date;
  nutritionalProfile: {
    protein: number;
    fat: number;
    minerals: number;
    vitamins: number;
  };
}

interface PopulationTarget {
  id: string;
  group: string;
  size: number;
  requirements: {
    calories: number;
    protein: number;
    fat: number;
    minerals: number;
  };
  priority: 'emergency' | 'high' | 'medium' | 'low';
  distribution: string[];
}

interface BiotechMeatOptimizationProps {
  onMeatProcessed: (amount: number, description: string) => void;
  onPopulationFed: (people: number, nutritionValue: number) => void;
}

export const BiotechMeatOptimization: React.FC<BiotechMeatOptimizationProps> = ({
  onMeatProcessed,
  onPopulationFed
}) => {
  const [activeTab, setActiveTab] = useState<'silo' | 'analysis' | 'population' | 'distribution'>('silo');
  const [siloOperating, setSiloOperating] = useState(false);
  const [centrifugeSpeed, setCentrifugeSpeed] = useState(1500);
  const [selectedZone, setSelectedZone] = useState<CentrifugeZone | null>(null);
  const [meatBatches, setMeatBatches] = useState<ClonedMeatBatch[]>([]);
  const [processingProgress, setProcessingProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [centrifugeZones] = useState<CentrifugeZone[]>([
    {
      id: 'zone-a',
      name: 'Outer Fat Layer',
      position: 'outer',
      spinSpeed: 800,
      meatProfile: {
        fatContent: 85,
        proteinDensity: 15,
        mineralContent: 5,
        omegaBlend: 92,
        myoglobin: 8
      },
      nutritionalUse: 'Energy-dense rations, flavoring compounds',
      color: 'from-yellow-500 to-orange-600',
      temperature: 4.2,
      pressure: 1.2,
      extractionRate: 78
    },
    {
      id: 'zone-b',
      name: 'Mid Protein Layer',
      position: 'mid',
      spinSpeed: 1500,
      meatProfile: {
        fatContent: 25,
        proteinDensity: 88,
        mineralContent: 15,
        omegaBlend: 45,
        myoglobin: 85
      },
      nutritionalUse: 'Standard meat products, muscle-building supplements',
      color: 'from-red-500 to-rose-600',
      temperature: 2.8,
      pressure: 2.1,
      extractionRate: 92
    },
    {
      id: 'zone-c',
      name: 'Inner Dense Core',
      position: 'inner',
      spinSpeed: 2500,
      meatProfile: {
        fatContent: 8,
        proteinDensity: 75,
        mineralContent: 95,
        omegaBlend: 20,
        myoglobin: 65
      },
      nutritionalUse: 'Mineral supplements, nutrient capsules, medical nutrition',
      color: 'from-purple-500 to-indigo-600',
      temperature: 1.5,
      pressure: 3.8,
      extractionRate: 85
    }
  ]);

  const [populationTargets] = useState<PopulationTarget[]>([
    {
      id: 'children',
      group: 'Children (5-12)',
      size: 2500000,
      requirements: { calories: 1800, protein: 45, fat: 60, minerals: 1200 },
      priority: 'high',
      distribution: ['Schools', 'Daycare Centers', 'Youth Programs']
    },
    {
      id: 'elderly',
      group: 'Elderly (65+)',
      size: 1800000,
      requirements: { calories: 1600, protein: 50, fat: 45, minerals: 1500 },
      priority: 'high',
      distribution: ['Nursing Homes', 'Senior Centers', 'Home Delivery']
    },
    {
      id: 'athletes',
      group: 'Athletes & Active',
      size: 850000,
      requirements: { calories: 3200, protein: 120, fat: 80, minerals: 2000 },
      priority: 'medium',
      distribution: ['Sports Centers', 'Gyms', 'Training Facilities']
    },
    {
      id: 'emergency',
      group: 'Emergency Relief',
      size: 500000,
      requirements: { calories: 2000, protein: 60, fat: 55, minerals: 1300 },
      priority: 'emergency',
      distribution: ['Disaster Areas', 'Refugee Camps', 'Emergency Shelters']
    },
    {
      id: 'military',
      group: 'Military Personnel',
      size: 300000,
      requirements: { calories: 3500, protein: 140, fat: 90, minerals: 2200 },
      priority: 'high',
      distribution: ['Military Bases', 'Field Operations', 'Training Camps']
    }
  ]);

  useEffect(() => {
    // Initialize with Dolly-generation cloned meat batches
    const initialBatches: ClonedMeatBatch[] = [
      {
        id: 'dolly-001',
        sourceAnimal: 'Dolly Sheep Clone Gen-1',
        generation: 1,
        tissueType: 'Muscle tissue (prime cut)',
        biomass: 2500,
        quality: 98.5,
        dnaIntegrity: 99.2,
        processedAt: new Date(),
        nutritionalProfile: { protein: 85, fat: 12, minerals: 8, vitamins: 95 }
      },
      {
        id: 'dolly-002',
        sourceAnimal: 'Dolly Sheep Clone Gen-2',
        generation: 2,
        tissueType: 'Enhanced muscle fiber',
        biomass: 3200,
        quality: 97.8,
        dnaIntegrity: 98.7,
        processedAt: new Date(Date.now() - 3600000),
        nutritionalProfile: { protein: 88, fat: 10, minerals: 12, vitamins: 92 }
      },
      {
        id: 'dolly-003',
        sourceAnimal: 'Dolly Sheep Clone Gen-3',
        generation: 3,
        tissueType: 'Optimized lean tissue',
        biomass: 4100,
        quality: 99.1,
        dnaIntegrity: 99.5,
        processedAt: new Date(Date.now() - 7200000),
        nutritionalProfile: { protein: 92, fat: 8, minerals: 15, vitamins: 98 }
      }
    ];

    setMeatBatches(initialBatches);
    drawCentrifuge();
  }, []);

  useEffect(() => {
    if (siloOperating) {
      const interval = setInterval(() => {
        setProcessingProgress(prev => {
          const newProgress = Math.min(prev + Math.random() * 3, 100);
          if (newProgress >= 100) {
            // Processing complete
            const totalBiomass = meatBatches.reduce((sum, batch) => sum + batch.biomass, 0);
            const avgQuality = meatBatches.reduce((sum, batch) => sum + batch.quality, 0) / meatBatches.length;
            
            onMeatProcessed(totalBiomass, `Processed ${totalBiomass}kg of cloned meat at ${avgQuality.toFixed(1)}% quality`);
            
            // Calculate population fed
            const totalPeople = populationTargets.reduce((sum, target) => sum + target.size, 0);
            const nutritionValue = Math.floor(avgQuality * 10);
            onPopulationFed(Math.floor(totalPeople * 0.1), nutritionValue);
            
            setSiloOperating(false);
            return 0;
          }
          return newProgress;
        });
        drawCentrifuge();
      }, 200);

      return () => clearInterval(interval);
    }
  }, [siloOperating, meatBatches, populationTargets, onMeatProcessed, onPopulationFed]);

  const drawCentrifuge = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    ctx.clearRect(0, 0, width, height);

    // Draw silo structure
    ctx.strokeStyle = '#4a5568';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(centerX - 80, 20, 160, height - 40, 10);
    ctx.stroke();

    // Draw centrifuge zones (animated if operating)
    const time = Date.now() / 1000;
    centrifugeZones.forEach((zone, index) => {
      const radius = 70 - index * 20;
      const rotation = siloOperating ? time * (zone.spinSpeed / 100) : 0;
      
      // Zone circle
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);
      
      // Create gradient for zone
      const gradient = ctx.createRadialGradient(0, 0, radius - 10, 0, 0, radius);
      const colors = zone.color.includes('yellow') ? ['#fbbf24', '#f59e0b'] :
                   zone.color.includes('red') ? ['#ef4444', '#dc2626'] :
                   ['#8b5cf6', '#7c3aed'];
      gradient.addColorStop(0, colors[0] + '80');
      gradient.addColorStop(1, colors[1] + '40');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Add meat particles
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + rotation;
        const particleX = Math.cos(angle) * (radius - 15);
        const particleY = Math.sin(angle) * (radius - 15);
        
        ctx.fillStyle = colors[0];
        ctx.beginPath();
        ctx.arc(particleX, particleY, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();
    });

    // Draw extraction tubes
    ctx.strokeStyle = '#718096';
    ctx.lineWidth = 2;
    centrifugeZones.forEach((zone, index) => {
      const y = centerY + (index - 1) * 30;
      ctx.beginPath();
      ctx.moveTo(centerX + 80, y);
      ctx.lineTo(centerX + 120, y);
      ctx.stroke();
      
      // Extraction flow indicator
      if (siloOperating) {
        ctx.fillStyle = zone.color.includes('yellow') ? '#fbbf24' :
                       zone.color.includes('red') ? '#ef4444' : '#8b5cf6';
        ctx.beginPath();
        ctx.arc(centerX + 125, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Control panel
    ctx.fillStyle = '#2d3748';
    ctx.fillRect(10, 10, 100, 80);
    ctx.strokeStyle = '#4a5568';
    ctx.strokeRect(10, 10, 100, 80);
    
    // Speed indicator
    ctx.fillStyle = '#00ff00';
    ctx.font = '12px monospace';
    ctx.fillText(`RPM: ${centrifugeSpeed}`, 15, 30);
    ctx.fillText(`Progress: ${processingProgress.toFixed(0)}%`, 15, 50);
    ctx.fillText(`Status: ${siloOperating ? 'RUN' : 'STOP'}`, 15, 70);
  };

  const startCentrifuge = () => {
    setSiloOperating(true);
    setProcessingProgress(0);
  };

  const stopCentrifuge = () => {
    setSiloOperating(false);
  };

  const addMeatBatch = () => {
    const newBatch: ClonedMeatBatch = {
      id: `dolly-${Date.now()}`,
      sourceAnimal: `Dolly Sheep Clone Gen-${Math.floor(Math.random() * 5) + 1}`,
      generation: Math.floor(Math.random() * 5) + 1,
      tissueType: ['Prime muscle', 'Lean tissue', 'Enhanced fiber', 'Marbled cut'][Math.floor(Math.random() * 4)],
      biomass: Math.floor(Math.random() * 3000) + 1500,
      quality: 95 + Math.random() * 5,
      dnaIntegrity: 97 + Math.random() * 3,
      processedAt: new Date(),
      nutritionalProfile: {
        protein: 80 + Math.random() * 15,
        fat: 5 + Math.random() * 15,
        minerals: 8 + Math.random() * 12,
        vitamins: 90 + Math.random() * 10
      }
    };

    setMeatBatches(prev => [newBatch, ...prev]);
  };

  const getTotalBiomass = () => {
    return meatBatches.reduce((sum, batch) => sum + batch.biomass, 0);
  };

  const getAverageQuality = () => {
    if (meatBatches.length === 0) return 0;
    return meatBatches.reduce((sum, batch) => sum + batch.quality, 0) / meatBatches.length;
  };

  const calculateFeedingCapacity = () => {
    const totalBiomass = getTotalBiomass();
    const avgQuality = getAverageQuality();
    const efficiencyMultiplier = (avgQuality / 100) * (centrifugeSpeed / 2500);
    
    return Math.floor(totalBiomass * efficiencyMultiplier * 2.5); // People fed per day
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
            <Dna className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white font-space">Biotech Meat Optimization Silo</h2>
            <p className="text-white/70">Centrifuge analysis of Dolly-generation cloned meat for population feeding</p>
          </div>
        </div>

        {/* System Status */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-white/60 text-sm">Total Biomass</p>
            <p className="text-xl font-bold text-green-400">{getTotalBiomass().toFixed(0)} kg</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-white/60 text-sm">Avg Quality</p>
            <p className="text-xl font-bold text-blue-400">{getAverageQuality().toFixed(1)}%</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-white/60 text-sm">RPM</p>
            <p className="text-xl font-bold text-purple-400">{centrifugeSpeed}</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-white/60 text-sm">Processing</p>
            <p className="text-xl font-bold text-yellow-400">{processingProgress.toFixed(0)}%</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-white/60 text-sm">Feed Capacity</p>
            <p className="text-xl font-bold text-red-400">{calculateFeedingCapacity().toLocaleString()}/day</p>
          </div>
        </div>

        {/* Processing Progress */}
        {siloOperating && (
          <div className="bg-white/5 p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/70">Centrifuge Processing</span>
              <span className="text-green-400 font-bold">{processingProgress.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all"
                style={{ width: `${processingProgress}%` }}
              />
            </div>
            <p className="text-xs text-white/60 mt-2">
              Separating meat profiles across {centrifugeZones.length} zones at {centrifugeSpeed} RPM
            </p>
          </div>
        )}

        {/* Control Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-bold text-white mb-3">Centrifuge Controls</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-white/70 text-sm mb-1">Speed (RPM)</label>
                <input
                  type="range"
                  min="500"
                  max="3000"
                  value={centrifugeSpeed}
                  onChange={(e) => setCentrifugeSpeed(parseInt(e.target.value))}
                  className="w-full"
                />
                <span className="text-white text-sm">{centrifugeSpeed} RPM</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={startCentrifuge}
                  disabled={siloOperating || meatBatches.length === 0}
                  className="flex-1 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50 flex items-center justify-center space-x-1"
                >
                  <Play className="w-4 h-4" />
                  <span>Start</span>
                </button>
                <button
                  onClick={stopCentrifuge}
                  disabled={!siloOperating}
                  className="flex-1 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-lg hover:from-red-600 hover:to-rose-700 transition-all disabled:opacity-50 flex items-center justify-center space-x-1"
                >
                  <Square className="w-4 h-4" />
                  <span>Stop</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-bold text-white mb-3">Meat Input</h4>
            <button
              onClick={addMeatBatch}
              className="w-full py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all flex items-center justify-center space-x-2"
            >
              <Package className="w-4 h-4" />
              <span>Add Cloned Meat Batch</span>
            </button>
            <p className="text-xs text-white/60 mt-2">
              Current batches: {meatBatches.length}
            </p>
          </div>
          
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-bold text-white mb-3">System Status</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">Silo Status:</span>
                <span className={`font-bold ${siloOperating ? 'text-green-400' : 'text-yellow-400'}`}>
                  {siloOperating ? 'OPERATING' : 'STANDBY'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Temperature:</span>
                <span className="text-blue-400">2.8°C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Pressure:</span>
                <span className="text-purple-400">2.1 bar</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4">
          {[
            { id: 'silo', name: 'Centrifuge Silo', icon: <RotateCcw className="w-4 h-4" /> },
            { id: 'analysis', name: 'Zone Analysis', icon: <Microscope className="w-4 h-4" /> },
            { id: 'population', name: 'Population Targets', icon: <Users className="w-4 h-4" /> },
            { id: 'distribution', name: 'Distribution', icon: <Truck className="w-4 h-4" /> }
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

      {/* Centrifuge Silo Tab */}
      {activeTab === 'silo' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Centrifuge Visualization */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 font-space">Vortex Silo Centrifuge</h3>
            <div className="bg-black/30 rounded-lg p-4 mb-4">
              <canvas 
                ref={canvasRef} 
                width="400" 
                height="300" 
                className="w-full h-64 rounded-lg"
              />
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {centrifugeZones.map((zone, index) => (
                <div key={zone.id} className="text-center">
                  <div className={`w-full h-2 rounded bg-gradient-to-r ${zone.color} mb-1`} />
                  <span className="text-white/70">{zone.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cloned Meat Batches */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 font-space">Cloned Meat Inventory</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {meatBatches.map((batch) => (
                <div key={batch.id} className="bg-white/5 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-white text-sm">{batch.sourceAnimal}</h4>
                    <span className="text-green-400 font-bold text-sm">{batch.biomass} kg</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-white/60">Generation:</span>
                      <span className="text-white ml-1">{batch.generation}</span>
                    </div>
                    <div>
                      <span className="text-white/60">Quality:</span>
                      <span className="text-green-400 ml-1">{batch.quality.toFixed(1)}%</span>
                    </div>
                    <div>
                      <span className="text-white/60">DNA Integrity:</span>
                      <span className="text-blue-400 ml-1">{batch.dnaIntegrity.toFixed(1)}%</span>
                    </div>
                    <div>
                      <span className="text-white/60">Type:</span>
                      <span className="text-purple-400 ml-1">{batch.tissueType}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Zone Analysis Tab */}
      {activeTab === 'analysis' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {centrifugeZones.map((zone, index) => (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 cursor-pointer"
              onClick={() => setSelectedZone(zone)}
            >
              <div className={`p-3 rounded-lg bg-gradient-to-r ${zone.color} mb-4`}>
                <Target className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2 font-space">{zone.name}</h3>
              <p className="text-white/70 text-sm mb-4">{zone.nutritionalUse}</p>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/60">Spin Speed:</span>
                  <span className="text-white">{zone.spinSpeed} RPM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Fat Content:</span>
                  <span className="text-yellow-400">{zone.meatProfile.fatContent}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Protein Density:</span>
                  <span className="text-red-400">{zone.meatProfile.proteinDensity}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Minerals:</span>
                  <span className="text-purple-400">{zone.meatProfile.mineralContent}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Extraction Rate:</span>
                  <span className="text-green-400">{zone.extractionRate}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Population Targets Tab */}
      {activeTab === 'population' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 font-space">Nation-Feeding Strategy</h3>
            <p className="text-white/70 mb-6">
              Optimized nutrition distribution based on demographic requirements and cloned meat profiles.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {populationTargets.map((target, index) => (
                <motion.div
                  key={target.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 p-4 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-white">{target.group}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      target.priority === 'emergency' ? 'bg-red-500/20 text-red-400' :
                      target.priority === 'high' ? 'bg-orange-500/20 text-orange-400' :
                      target.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {target.priority.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                    <div>
                      <span className="text-white/60">Population:</span>
                      <p className="text-white font-bold">{target.size.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-white/60">Daily Calories:</span>
                      <p className="text-yellow-400 font-bold">{target.requirements.calories}</p>
                    </div>
                    <div>
                      <span className="text-white/60">Protein (g):</span>
                      <p className="text-red-400 font-bold">{target.requirements.protein}</p>
                    </div>
                    <div>
                      <span className="text-white/60">Minerals (mg):</span>
                      <p className="text-purple-400 font-bold">{target.requirements.minerals}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-bold text-white text-xs mb-1">Distribution Points:</h5>
                    <div className="space-y-1">
                      {target.distribution.map((point, i) => (
                        <div key={i} className="flex items-center space-x-1">
                          <div className="w-1 h-1 bg-green-400 rounded-full" />
                          <span className="text-white/70 text-xs">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Distribution Tab */}
      {activeTab === 'distribution' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 font-space">Distribution Network</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white/5 p-4 rounded-lg text-center">
                <Truck className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="text-white/60 text-sm">Transport Units</p>
                <p className="text-xl font-bold text-blue-400">247</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg text-center">
                <MapPin className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-white/60 text-sm">Distribution Centers</p>
                <p className="text-xl font-bold text-green-400">89</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg text-center">
                <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <p className="text-white/60 text-sm">People Fed Today</p>
                <p className="text-xl font-bold text-purple-400">{calculateFeedingCapacity().toLocaleString()}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg text-center">
                <Shield className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-white/60 text-sm">Food Security</p>
                <p className="text-xl font-bold text-yellow-400">94.2%</p>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-bold text-white mb-3">Real-time Distribution Flow</h4>
              <div className="space-y-3">
                {[
                  { location: 'Urban Schools Network', amount: '2,847 kg', status: 'Delivered', zone: 'Zone B' },
                  { location: 'Emergency Relief Centers', amount: '1,523 kg', status: 'In Transit', zone: 'Zone C' },
                  { location: 'Military Bases', amount: '3,201 kg', status: 'Processing', zone: 'Zone B' },
                  { location: 'Senior Care Facilities', amount: '1,892 kg', status: 'Delivered', zone: 'Zone A' },
                  { location: 'Athletic Training Centers', amount: '956 kg', status: 'Scheduled', zone: 'Zone B' }
                ].map((shipment, index) => (
                  <div key={index} className="flex items-center justify-between bg-white/5 p-3 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        shipment.status === 'Delivered' ? 'bg-green-400' :
                        shipment.status === 'In Transit' ? 'bg-blue-400' :
                        shipment.status === 'Processing' ? 'bg-yellow-400' :
                        'bg-purple-400'
                      }`} />
                      <div>
                        <p className="text-white font-medium text-sm">{shipment.location}</p>
                        <p className="text-white/60 text-xs">{shipment.zone} • {shipment.amount}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      shipment.status === 'Delivered' ? 'bg-green-500/20 text-green-400' :
                      shipment.status === 'In Transit' ? 'bg-blue-500/20 text-blue-400' :
                      shipment.status === 'Processing' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      {shipment.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Zone Detail Modal */}
      <AnimatePresence>
        {selectedZone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedZone(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl w-full border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`p-4 rounded-xl bg-gradient-to-r ${selectedZone.color}`}>
                  <Target className="w-8 h-8 text-white" />
                </div>
                <button
                  onClick={() => setSelectedZone(null)}
                  className="text-white/70 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <h2 className="text-2xl font-bold text-white mb-4 font-space">
                {selectedZone.name}
              </h2>
              <p className="text-white/80 leading-relaxed mb-6">
                {selectedZone.nutritionalUse}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 p-4 rounded-lg">
                  <h3 className="font-bold text-white mb-3">Meat Profile</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Fat Content:</span>
                      <span className="text-yellow-400">{selectedZone.meatProfile.fatContent}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Protein Density:</span>
                      <span className="text-red-400">{selectedZone.meatProfile.proteinDensity}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Mineral Content:</span>
                      <span className="text-purple-400">{selectedZone.meatProfile.mineralContent}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Omega Blend:</span>
                      <span className="text-green-400">{selectedZone.meatProfile.omegaBlend}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Myoglobin:</span>
                      <span className="text-blue-400">{selectedZone.meatProfile.myoglobin}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 p-4 rounded-lg">
                  <h3 className="font-bold text-white mb-3">Operating Parameters</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Spin Speed:</span>
                      <span className="text-white">{selectedZone.spinSpeed} RPM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Temperature:</span>
                      <span className="text-blue-400">{selectedZone.temperature}°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Pressure:</span>
                      <span className="text-purple-400">{selectedZone.pressure} bar</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Extraction Rate:</span>
                      <span className="text-green-400">{selectedZone.extractionRate}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 p-4 rounded-lg">
                <h3 className="font-bold text-white mb-2">Nutritional Applications</h3>
                <p className="text-white/80 text-sm italic">"{selectedZone.nutritionalUse}"</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};