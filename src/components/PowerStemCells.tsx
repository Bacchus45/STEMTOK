import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Heart, 
  Brain, 
  Dna, 
  Battery, 
  Activity, 
  RefreshCw,
  Star,
  Sparkles,
  Eye,
  Lightbulb,
  Shield,
  Target,
  Atom,
  Waves
} from 'lucide-react';

interface PowerCell {
  id: string;
  type: 'neural' | 'cardiac' | 'muscular' | 'immune' | 'regenerative';
  name: string;
  description: string;
  powerLevel: number;
  healingCapacity: number;
  regenerationRate: number;
  connectivity: number;
  research: {
    author: string;
    findings: string;
    applications: string[];
    breakthrough: boolean;
  };
  visualData: number[];
  color: string;
  icon: React.ReactNode;
}

interface ResearchFindings {
  id: string;
  title: string;
  researcher: string;
  category: 'power-generation' | 'cellular-healing' | 'neural-enhancement' | 'regenerative-medicine';
  description: string;
  impact: 'breakthrough' | 'significant' | 'moderate';
  applications: string[];
  futureProspects: string;
  dataVisualization: number[];
}

interface PowerStemCellsProps {
  onResearchComplete: (findings: ResearchFindings) => void;
  onPowerGenerated: (amount: number, type: string) => void;
}

export const PowerStemCells: React.FC<PowerStemCellsProps> = ({
  onResearchComplete,
  onPowerGenerated
}) => {
  const [activeTab, setActiveTab] = useState<'cells' | 'research' | 'power' | 'applications'>('cells');
  const [selectedCell, setSelectedCell] = useState<PowerCell | null>(null);
  const [powerGeneration, setPowerGeneration] = useState(0);
  const [researchProgress, setResearchProgress] = useState(0);

  const [powerCells, setPowerCells] = useState<PowerCell[]>([
    {
      id: '1',
      type: 'neural',
      name: 'Neural Power Cells',
      description: 'Stem cells specialized for neural regeneration and cognitive enhancement',
      powerLevel: 85,
      healingCapacity: 92,
      regenerationRate: 78,
      connectivity: 96,
      research: {
        author: 'J.J. NELL Research Team',
        findings: 'Neural stem cells can generate bioelectric power while promoting cognitive repair',
        applications: ['Memory Enhancement', 'Neural Disorders', 'Brain-Computer Interfaces'],
        breakthrough: true
      },
      visualData: [65, 72, 78, 85, 89, 92, 88, 90],
      color: 'from-blue-500 to-cyan-600',
      icon: <Brain className="w-6 h-6" />
    },
    {
      id: '2',
      type: 'cardiac',
      name: 'Cardiac Power Cells',
      description: 'Heart-derived stem cells for cardiovascular power generation',
      powerLevel: 78,
      healingCapacity: 88,
      regenerationRate: 85,
      connectivity: 82,
      research: {
        author: 'J.J. NELL Research Team',
        findings: 'Cardiac stem cells can power medical devices while repairing heart tissue',
        applications: ['Pacemaker Power', 'Heart Repair', 'Circulatory Enhancement'],
        breakthrough: true
      },
      visualData: [70, 75, 78, 82, 85, 88, 85, 83],
      color: 'from-red-500 to-rose-600',
      icon: <Heart className="w-6 h-6" />
    },
    {
      id: '3',
      type: 'muscular',
      name: 'Muscular Power Cells',
      description: 'Muscle-derived stem cells for kinetic energy conversion',
      powerLevel: 90,
      healingCapacity: 75,
      regenerationRate: 88,
      connectivity: 79,
      research: {
        author: 'J.J. NELL Research Team',
        findings: 'Muscular stem cells convert mechanical motion into bioelectric energy',
        applications: ['Movement Harvesting', 'Muscle Repair', 'Prosthetic Power'],
        breakthrough: false
      },
      visualData: [80, 85, 88, 90, 87, 89, 91, 90],
      color: 'from-green-500 to-emerald-600',
      icon: <Zap className="w-6 h-6" />
    },
    {
      id: '4',
      type: 'immune',
      name: 'Immune Power Cells',
      description: 'Immune system stem cells for defense and energy production',
      powerLevel: 72,
      healingCapacity: 95,
      regenerationRate: 82,
      connectivity: 88,
      research: {
        author: 'J.J. NELL Research Team',
        findings: 'Immune stem cells generate power through metabolic processes while enhancing immunity',
        applications: ['Immune Boosting', 'Pathogen Defense', 'Metabolic Power'],
        breakthrough: false
      },
      visualData: [68, 70, 72, 75, 78, 80, 77, 75],
      color: 'from-purple-500 to-pink-600',
      icon: <Shield className="w-6 h-6" />
    },
    {
      id: '5',
      type: 'regenerative',
      name: 'Regenerative Power Cells',
      description: 'Multi-potent stem cells for universal healing and power generation',
      powerLevel: 88,
      healingCapacity: 98,
      regenerationRate: 95,
      connectivity: 92,
      research: {
        author: 'J.J. NELL Research Team',
        findings: 'Regenerative stem cells can adapt to any tissue while generating sustainable power',
        applications: ['Universal Healing', 'Organ Regeneration', 'Adaptive Power'],
        breakthrough: true
      },
      visualData: [82, 85, 88, 92, 95, 98, 96, 94],
      color: 'from-yellow-500 to-orange-600',
      icon: <RefreshCw className="w-6 h-6" />
    }
  ]);

  const [researchFindings] = useState<ResearchFindings[]>([
    {
      id: '1',
      title: 'Bioelectric Power Generation in Stem Cells',
      researcher: 'J.J. NELL',
      category: 'power-generation',
      description: 'Revolutionary discovery of stem cells\' ability to generate sustainable bioelectric power',
      impact: 'breakthrough',
      applications: ['Medical Device Power', 'Neural Implants', 'Cardiac Pacemakers'],
      futureProspects: 'Self-powered medical devices will eliminate battery replacement surgeries',
      dataVisualization: [45, 62, 78, 85, 92, 95, 98, 97]
    },
    {
      id: '2',
      title: 'Neural Stem Cell Enhancement Protocols',
      researcher: 'J.J. NELL',
      category: 'neural-enhancement',
      description: 'Advanced protocols for enhancing cognitive function through neural stem cell therapy',
      impact: 'significant',
      applications: ['Memory Enhancement', 'Learning Acceleration', 'Neural Repair'],
      futureProspects: 'Cognitive enhancement will become accessible and safe for all ages',
      dataVisualization: [35, 48, 65, 72, 85, 89, 92, 94]
    },
    {
      id: '3',
      title: 'Regenerative Medicine Breakthroughs',
      researcher: 'J.J. NELL',
      category: 'regenerative-medicine',
      description: 'Groundbreaking advances in organ regeneration using stem cell technology',
      impact: 'breakthrough',
      applications: ['Organ Replacement', 'Tissue Regeneration', 'Age Reversal'],
      futureProspects: 'Complete organ regeneration will be routine medical practice',
      dataVisualization: [28, 42, 58, 71, 84, 91, 96, 98]
    }
  ]);

  useEffect(() => {
    // Simulate power generation and research progress
    const interval = setInterval(() => {
      setPowerGeneration(prev => prev + Math.random() * 10);
      setResearchProgress(prev => Math.min(prev + Math.random() * 2, 100));
      
      // Update cell power levels
      setPowerCells(prev => prev.map(cell => ({
        ...cell,
        powerLevel: Math.min(cell.powerLevel + Math.random() * 2, 100),
        visualData: [...cell.visualData.slice(1), cell.powerLevel + Math.random() * 10 - 5]
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const generatePower = (cell: PowerCell) => {
    const powerAmount = Math.floor(cell.powerLevel * Math.random() * 0.5 + 10);
    onPowerGenerated(powerAmount, cell.type);
    setPowerGeneration(prev => prev + powerAmount);
  };

  const completeResearch = (finding: ResearchFindings) => {
    onResearchComplete(finding);
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
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
            <Dna className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white font-space">Power & Stem Cell Research</h2>
            <p className="text-white/70">J.J. NELL Advanced Bioelectric Research Laboratory</p>
          </div>
        </div>

        {/* Research Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-white/60 text-sm">Power Generated</p>
            <p className="text-xl font-bold text-yellow-400">{Math.floor(powerGeneration)} μW</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-white/60 text-sm">Research Progress</p>
            <p className="text-xl font-bold text-green-400">{Math.floor(researchProgress)}%</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-white/60 text-sm">Active Cells</p>
            <p className="text-xl font-bold text-blue-400">{powerCells.length}</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-white/60 text-sm">Breakthroughs</p>
            <p className="text-xl font-bold text-purple-400">
              {researchFindings.filter(r => r.impact === 'breakthrough').length}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4">
          {[
            { id: 'cells', name: 'Power Cells', icon: <Battery className="w-4 h-4" /> },
            { id: 'research', name: 'Research', icon: <Eye className="w-4 h-4" /> },
            { id: 'power', name: 'Power Gen', icon: <Zap className="w-4 h-4" /> },
            { id: 'applications', name: 'Applications', icon: <Target className="w-4 h-4" /> }
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

      {/* Power Cells Tab */}
      {activeTab === 'cells' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {powerCells.map((cell, index) => (
            <motion.div
              key={cell.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
            >
              <div className={`p-3 rounded-lg bg-gradient-to-r ${cell.color} mb-4`}>
                {cell.icon}
              </div>

              <h3 className="text-lg font-bold text-white mb-2 font-space">
                {cell.name}
              </h3>
              <p className="text-white/70 text-sm mb-4">{cell.description}</p>

              {/* Power Metrics */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-xs">Power Level</span>
                  <span className="text-white text-sm font-bold">{cell.powerLevel}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r ${cell.color} h-2 rounded-full transition-all`}
                    style={{ width: `${cell.powerLevel}%` }}
                  />
                </div>
              </div>

              {/* Mini Chart */}
              <div className="bg-white/5 p-3 rounded-lg mb-4">
                <div className="h-16 flex items-end space-x-1">
                  {cell.visualData.map((value, i) => (
                    <div
                      key={i}
                      className={`flex-1 bg-gradient-to-t ${cell.color} rounded-t-sm opacity-80`}
                      style={{ height: `${(value / 100) * 100}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* Research Info */}
              <div className="bg-white/5 p-3 rounded-lg mb-4">
                <p className="text-white/80 text-xs italic">
                  "{cell.research.findings}"
                </p>
                <p className="text-white/60 text-xs mt-1">
                  - {cell.research.author}
                </p>
              </div>

              <button
                onClick={() => generatePower(cell)}
                className="w-full py-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-lg hover:from-yellow-600 hover:to-orange-700 transition-all font-medium"
              >
                Generate Power
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Research Tab */}
      {activeTab === 'research' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {researchFindings.map((finding, index) => (
            <motion.div
              key={finding.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white font-space">{finding.title}</h3>
                  <p className="text-white/70">Lead Researcher: {finding.researcher}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs ${
                  finding.impact === 'breakthrough' ? 'bg-green-500/20 text-green-400' :
                  finding.impact === 'significant' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {finding.impact}
                </span>
              </div>

              <p className="text-white/80 mb-4">{finding.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-bold text-white mb-2">Applications</h4>
                  <ul className="space-y-1">
                    {finding.applications.map((app, i) => (
                      <li key={i} className="text-white/70 text-sm">• {app}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-bold text-white mb-2">Data Visualization</h4>
                  <div className="h-16 flex items-end space-x-1">
                    {finding.dataVisualization.map((value, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-sm"
                        style={{ height: `${value}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white/5 p-4 rounded-lg mb-4">
                <h4 className="font-bold text-white mb-2">Future Prospects</h4>
                <p className="text-white/80 text-sm italic">"{finding.futureProspects}"</p>
              </div>

              <button
                onClick={() => completeResearch(finding)}
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all font-medium"
              >
                Complete Research
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Power Generation Tab */}
      {activeTab === 'power' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 font-space">Real-time Power Generation</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/5 p-4 rounded-lg text-center">
                <Battery className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-white/60 text-sm">Total Output</p>
                <p className="text-2xl font-bold text-yellow-400">{Math.floor(powerGeneration)} μW</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg text-center">
                <Waves className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="text-white/60 text-sm">Efficiency</p>
                <p className="text-2xl font-bold text-blue-400">94.7%</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg text-center">
                <Activity className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-white/60 text-sm">Active Cells</p>
                <p className="text-2xl font-bold text-green-400">{powerCells.length}</p>
              </div>
            </div>

            {/* Power Generation Chart */}
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-bold text-white mb-3">Power Output Over Time</h4>
              <div className="h-32 flex items-end space-x-2">
                {Array.from({ length: 20 }, (_, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-yellow-400 to-orange-500 rounded-t-sm"
                    style={{ 
                      height: `${Math.sin(i * 0.5) * 30 + 50}%`,
                      opacity: 0.6 + (i / 20) * 0.4
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Applications Tab */}
      {activeTab === 'applications' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {[
            {
              title: 'Medical Device Power',
              description: 'Self-powered pacemakers and neural implants using stem cell energy',
              icon: <Heart className="w-6 h-6" />,
              color: 'from-red-500 to-rose-600',
              progress: 85,
              applications: ['Pacemakers', 'Neural Implants', 'Glucose Monitors']
            },
            {
              title: 'Cognitive Enhancement',
              description: 'Neural stem cells improving memory, learning, and brain function',
              icon: <Brain className="w-6 h-6" />,
              color: 'from-blue-500 to-cyan-600',
              progress: 78,
              applications: ['Memory Enhancement', 'Learning Acceleration', 'Neural Repair']
            },
            {
              title: 'Regenerative Medicine',
              description: 'Complete organ and tissue regeneration using stem cell power',
              icon: <RefreshCw className="w-6 h-6" />,
              color: 'from-green-500 to-emerald-600',
              progress: 92,
              applications: ['Organ Regeneration', 'Tissue Repair', 'Age Reversal']
            },
            {
              title: 'Bioelectric Interfaces',
              description: 'Direct brain-computer interfaces powered by neural stem cells',
              icon: <Lightbulb className="w-6 h-6" />,
              color: 'from-purple-500 to-pink-600',
              progress: 65,
              applications: ['Brain-Computer Interface', 'Thought Control', 'Neural Networks']
            }
          ].map((app, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
            >
              <div className={`p-3 rounded-lg bg-gradient-to-r ${app.color} mb-4`}>
                {app.icon}
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2 font-space">{app.title}</h3>
              <p className="text-white/70 text-sm mb-4">{app.description}</p>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-white/60 mb-1">
                  <span>Development Progress</span>
                  <span>{app.progress}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r ${app.color} h-2 rounded-full transition-all`}
                    style={{ width: `${app.progress}%` }}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm">Current Applications:</h4>
                {app.applications.map((application, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="text-white/70 text-xs">{application}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};