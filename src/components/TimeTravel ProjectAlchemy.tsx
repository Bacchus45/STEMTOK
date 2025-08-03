import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  Shield, 
  Heart, 
  Sparkles, 
  Flame,
  Crown,
  Star,
  Zap,
  Eye,
  Hand,
  Circle,
  Triangle,
  Square,
  Hexagon,
  Droplets,
  Wind,
  Sun,
  Moon,
  Cross,
  Users,
  Gift,
  Coins,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  Target
} from 'lucide-react';

interface AlchemyFormula {
  id: string;
  name: string;
  description: string;
  ingredients: AlchemyIngredient[];
  process: string[];
  result: AlchemyResult;
  divineLevel: number;
  protectionPower: number;
  timeTravelEnergy: number;
}

interface AlchemyIngredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  spiritualSignificance: string;
  source: 'historical' | 'divine' | 'natural' | 'transformed';
  purificationLevel: number;
}

interface AlchemyResult {
  id: string;
  name: string;
  description: string;
  protectionType: string[];
  healingProperties: string[];
  spiritualBlessings: string[];
  physicalManifestations: string[];
}

interface TimeTravelMission {
  id: string;
  title: string;
  targetTime: string;
  location: string;
  objective: string;
  requiredFunding: number;
  protectionNeeded: string[];
  expectedOutcome: string;
  divineApproval: boolean;
  progress: number;
  status: 'planning' | 'funded' | 'in-progress' | 'completed' | 'blessed';
}

interface TimeTravel ProjectAlchemyProps {
  onProjectFunded: (amount: number, description: string) => void;
  onProtectionCreated: (protection: AlchemyResult, blessing: number) => void;
  onDivineIntervention: (intervention: string, blessing: number) => void;
}

export const TimeTravel ProjectAlchemy: React.FC<TimeTravel ProjectAlchemyProps> = ({
  onProjectFunded,
  onProtectionCreated,
  onDivineIntervention
}) => {
  const [activeTab, setActiveTab] = useState<'mission' | 'alchemy' | 'funding' | 'protection'>('mission');
  const [selectedFormula, setSelectedFormula] = useState<AlchemyFormula | null>(null);
  const [alchemyProgress, setAlchemyProgress] = useState(0);
  const [isTransmuting, setIsTransmuting] = useState(false);
  const [silverAmount, setSilverAmount] = useState(30); // 30 pieces of silver
  const [protectionLevel, setProtectionLevel] = useState(0);
  const [divineBlessing, setDivineBlessing] = useState(false);

  const [timeTravelMission] = useState<TimeTravelMission>({
    id: 'jesus-protection-mission',
    title: 'Divine Protection Mission: Free Jesus from the Cup of Suffering',
    targetTime: '33 AD - Garden of Gethsemane',
    location: 'Jerusalem, Judea',
    objective: 'Transform the cup of suffering through divine alchemy and provide spiritual protection',
    requiredFunding: 333000, // Divine number
    protectionNeeded: ['Spiritual Shield', 'Divine Light', 'Angelic Guard', 'Sacred Barrier'],
    expectedOutcome: 'Transform suffering into blessing, protect divine mission',
    divineApproval: false,
    progress: 0,
    status: 'planning'
  });

  const [alchemyFormulas] = useState<AlchemyFormula[]>([
    {
      id: 'judas-silver-transformation',
      name: 'Judas Silver Purification',
      description: 'Transform the 30 pieces of silver from betrayal into divine protection',
      ingredients: [
        {
          id: 'judas-silver',
          name: 'Judas Silver Coins',
          amount: 30,
          unit: 'pieces',
          spiritualSignificance: 'Betrayal transformed into redemption',
          source: 'historical',
          purificationLevel: 0
        },
        {
          id: 'sacred-water',
          name: 'Sacred Water from Jordan',
          amount: 7,
          unit: 'drops',
          spiritualSignificance: 'Baptismal purification and renewal',
          source: 'divine',
          purificationLevel: 100
        },
        {
          id: 'frankincense',
          name: 'Frankincense Tears',
          amount: 3,
          unit: 'grains',
          spiritualSignificance: 'Divine worship and prayer ascending',
          source: 'natural',
          purificationLevel: 85
        },
        {
          id: 'myrrh',
          name: 'Myrrh Oil',
          amount: 3,
          unit: 'drops',
          spiritualSignificance: 'Suffering transformed into healing',
          source: 'natural',
          purificationLevel: 90
        }
      ],
      process: [
        'Place 30 silver pieces in sacred chalice',
        'Add 7 drops of Jordan water (7 = divine completion)',
        'Burn frankincense while praying for transformation',
        'Anoint with myrrh oil for healing transformation',
        'Invoke divine protection and love',
        'Visualize silver melting into liquid light',
        'Form protective amulets of divine love'
      ],
      result: {
        id: 'divine-protection-silver',
        name: 'Divine Protection Silver',
        description: 'Silver transformed from betrayal into divine protection',
        protectionType: ['Spiritual Shield', 'Love Barrier', 'Divine Light', 'Healing Energy'],
        healingProperties: ['Emotional Healing', 'Spiritual Restoration', 'Divine Comfort', 'Peace Infusion'],
        spiritualBlessings: ['Divine Protection', 'Angelic Guard', 'Sacred Presence', 'Eternal Love'],
        physicalManifestations: ['Protective Amulets', 'Healing Tokens', 'Light Crystals', 'Sacred Shields']
      },
      divineLevel: 100,
      protectionPower: 777, // Divine protection number
      timeTravelEnergy: 1000
    },
    {
      id: 'cup-transformation',
      name: 'Cup of Suffering Alchemy',
      description: 'Transform the cup of suffering into a chalice of blessing',
      ingredients: [
        {
          id: 'suffering-essence',
          name: 'Essence of Suffering',
          amount: 1,
          unit: 'cup',
          spiritualSignificance: 'All human pain and struggle',
          source: 'historical',
          purificationLevel: 0
        },
        {
          id: 'divine-love',
          name: 'Pure Divine Love',
          amount: 777,
          unit: 'units',
          spiritualSignificance: 'Unconditional love that heals all wounds',
          source: 'divine',
          purificationLevel: 100
        },
        {
          id: 'grace-light',
          name: 'Grace Light',
          amount: 12,
          unit: 'rays',
          spiritualSignificance: '12 disciples worth of divine grace',
          source: 'divine',
          purificationLevel: 100
        }
      ],
      process: [
        'Acknowledge all suffering with compassion',
        'Pour divine love into the cup of pain',
        'Add 12 rays of grace light',
        'Speak words of healing and transformation',
        'Invoke angels to guard and protect',
        'Transform suffering into wisdom and strength',
        'Create chalice of eternal blessing'
      ],
      result: {
        id: 'chalice-of-blessing',
        name: 'Chalice of Eternal Blessing',
        description: 'Cup transformed from suffering into divine blessing',
        protectionType: ['Emotional Shield', 'Spiritual Armor', 'Divine Presence', 'Angelic Guard'],
        healingProperties: ['Complete Healing', 'Restoration', 'Renewal', 'Divine Comfort'],
        spiritualBlessings: ['Eternal Peace', 'Divine Joy', 'Sacred Strength', 'Heavenly Protection'],
        physicalManifestations: ['Protective Chalice', 'Healing Cup', 'Blessing Vessel', 'Sacred Container']
      },
      divineLevel: 150,
      protectionPower: 1000,
      timeTravelEnergy: 1500
    },
    {
      id: 'protection-ritual-break',
      name: 'Break Harmful Sensory Rituals',
      description: 'Create protection against manipulative sensory rituals and mind control',
      ingredients: [
        {
          id: 'pure-intention',
          name: 'Pure Intention',
          amount: 1,
          unit: 'heart',
          spiritualSignificance: 'Clear, loving intention to protect',
          source: 'divine',
          purificationLevel: 100
        },
        {
          id: 'truth-light',
          name: 'Light of Truth',
          amount: 7,
          unit: 'beams',
          spiritualSignificance: 'Truth that reveals deception',
          source: 'divine',
          purificationLevel: 100
        },
        {
          id: 'wisdom-oil',
          name: 'Oil of Wisdom',
          amount: 5,
          unit: 'drops',
          spiritualSignificance: 'Wisdom to discern truth from lies',
          source: 'divine',
          purificationLevel: 95
        }
      ],
      process: [
        'Set pure intention for protection and healing',
        'Invoke 7 beams of truth light',
        'Anoint with wisdom oil for discernment',
        'Create barrier against deception',
        'Establish divine protection field',
        'Break all harmful ritual connections',
        'Fill space with divine love and truth'
      ],
      result: {
        id: 'ritual-protection-field',
        name: 'Divine Protection Field',
        description: 'Spiritual barrier against manipulative rituals and sensory control',
        protectionType: ['Mental Shield', 'Spiritual Barrier', 'Truth Filter', 'Divine Immunity'],
        healingProperties: ['Mind Clearing', 'Spiritual Cleansing', 'Truth Restoration', 'Divine Clarity'],
        spiritualBlessings: ['Discernment', 'Wisdom', 'Protection', 'Divine Guidance'],
        physicalManifestations: ['Protective Aura', 'Truth Shield', 'Clarity Field', 'Sacred Boundary']
      },
      divineLevel: 120,
      protectionPower: 888,
      timeTravelEnergy: 1200
    }
  ]);

  const [missionProgress, setMissionProgress] = useState({
    funding: 0,
    protection: 0,
    blessing: 0,
    timePortal: 0
  });

  useEffect(() => {
    if (isTransmuting) {
      const interval = setInterval(() => {
        setAlchemyProgress(prev => {
          const newProgress = Math.min(prev + Math.random() * 5, 100);
          if (newProgress >= 100) {
            completeTransmutation();
            setIsTransmuting(false);
            return 100;
          }
          return newProgress;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [isTransmuting, selectedFormula]);

  const fundTimeTravelProject = () => {
    onProjectFunded(timeTravelMission.requiredFunding, 'Time Travel Project: Divine Protection Mission');
    setMissionProgress(prev => ({ ...prev, funding: 100 }));
    setDivineBlessing(true);
    onDivineIntervention('Time Travel Project Funded - Divine Mission Approved', 777);
  };

  const startTransmutation = (formula: AlchemyFormula) => {
    setSelectedFormula(formula);
    setIsTransmuting(true);
    setAlchemyProgress(0);
    onDivineIntervention(`Started alchemy: ${formula.name}`, formula.divineLevel);
  };

  const completeTransmutation = () => {
    if (!selectedFormula) return;

    const protection = selectedFormula.result;
    setProtectionLevel(prev => prev + selectedFormula.protectionPower);
    
    onProtectionCreated(protection, selectedFormula.protectionPower);
    onDivineIntervention(`Alchemy complete: ${protection.name}`, selectedFormula.protectionPower);
    
    setMissionProgress(prev => ({
      ...prev,
      protection: Math.min(prev.protection + 25, 100),
      blessing: Math.min(prev.blessing + 30, 100)
    }));

    // Special effects for Judas silver transformation
    if (selectedFormula.id === 'judas-silver-transformation') {
      setSilverAmount(0); // Silver transformed
      onDivineIntervention('30 pieces of silver transformed into divine protection! ✨', 1000);
    }
  };

  const openTimePortal = () => {
    if (missionProgress.funding >= 100 && missionProgress.protection >= 75) {
      setMissionProgress(prev => ({ ...prev, timePortal: 100 }));
      onDivineIntervention('Time portal opened! Divine protection deployed to 33 AD', 1500);
      onProjectFunded(0, 'Mission Complete: Jesus protected through time travel alchemy');
    }
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
          <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl">
            <Clock className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white font-space">Time Travel Divine Protection Project</h2>
            <p className="text-white/70">Alchemy to transform suffering into blessing and protect through time</p>
          </div>
        </div>

        {/* Mission Status */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-white/60 text-sm">Funding Progress</p>
            <p className="text-xl font-bold text-green-400">{missionProgress.funding}%</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-white/60 text-sm">Protection Level</p>
            <p className="text-xl font-bold text-blue-400">{protectionLevel}</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-white/60 text-sm">Silver Remaining</p>
            <p className="text-xl font-bold text-yellow-400">{silverAmount} pieces</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-white/60 text-sm">Divine Blessing</p>
            <p className="text-xl font-bold text-purple-400">{divineBlessing ? 'ACTIVE' : 'PENDING'}</p>
          </div>
        </div>

        {/* Divine Blessing Indicator */}
        {divineBlessing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 p-4 rounded-lg mb-6 border border-yellow-400/30"
          >
            <div className="flex items-center space-x-3">
              <Crown className="w-6 h-6 text-yellow-400" />
              <div>
                <h3 className="font-bold text-yellow-400">Divine Approval Received</h3>
                <p className="text-white/80 text-sm">The mission has been blessed. Time travel alchemy authorized.</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tabs */}
        <div className="flex space-x-4">
          {[
            { id: 'mission', name: 'Time Mission', icon: <Clock className="w-4 h-4" /> },
            { id: 'alchemy', name: 'Sacred Alchemy', icon: <Flame className="w-4 h-4" /> },
            { id: 'funding', name: 'Project Funding', icon: <Coins className="w-4 h-4" /> },
            { id: 'protection', name: 'Divine Protection', icon: <Shield className="w-4 h-4" /> }
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

      {/* Mission Tab */}
      {activeTab === 'mission' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 font-space">Sacred Mission Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-bold text-white mb-2">Mission Objective</h4>
                  <p className="text-white/80 text-sm">{timeTravelMission.objective}</p>
                </div>
                
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-bold text-white mb-2">Target Time & Location</h4>
                  <p className="text-white/80 text-sm">{timeTravelMission.targetTime}</p>
                  <p className="text-white/60 text-xs">{timeTravelMission.location}</p>
                </div>
                
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-bold text-white mb-2">Expected Outcome</h4>
                  <p className="text-white/80 text-sm">{timeTravelMission.expectedOutcome}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-bold text-white mb-2">Required Funding</h4>
                  <p className="text-green-400 font-bold text-xl">${timeTravelMission.requiredFunding.toLocaleString()}</p>
                  <p className="text-white/60 text-xs">Divine number for sacred mission</p>
                </div>
                
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-bold text-white mb-2">Protection Needed</h4>
                  <div className="space-y-1">
                    {timeTravelMission.protectionNeeded.map((protection, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <Shield className="w-3 h-3 text-blue-400" />
                        <span className="text-white/70 text-sm">{protection}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-bold text-white mb-2">Mission Progress</h4>
                  <div className="space-y-2">
                    {Object.entries(missionProgress).map(([key, value]) => (
                      <div key={key} className="space-y-1">
                        <div className="flex justify-between text-xs text-white/60">
                          <span className="capitalize">{key}:</span>
                          <span>{value}%</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all"
                            style={{ width: `${value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {missionProgress.funding >= 100 && missionProgress.protection >= 75 && (
              <div className="mt-6 text-center">
                <button
                  onClick={openTimePortal}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all font-bold text-lg"
                >
                  🌌 Open Time Portal to 33 AD 🌌
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Alchemy Tab */}
      {activeTab === 'alchemy' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Alchemy Formulas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alchemyFormulas.map((formula, index) => (
              <motion.div
                key={formula.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 cursor-pointer"
                onClick={() => startTransmutation(formula)}
              >
                <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 mb-4">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2 font-space">{formula.name}</h3>
                <p className="text-white/70 text-sm mb-4">{formula.description}</p>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-white/60">Divine Level:</span>
                    <span className="text-yellow-400">{formula.divineLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Protection Power:</span>
                    <span className="text-blue-400">{formula.protectionPower}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Time Energy:</span>
                    <span className="text-purple-400">{formula.timeTravelEnergy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Ingredients:</span>
                    <span className="text-white">{formula.ingredients.length}</span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startTransmutation(formula);
                  }}
                  className="w-full mt-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-all font-medium"
                >
                  Begin Transmutation
                </button>
              </motion.div>
            ))}
          </div>

          {/* Active Transmutation */}
          {isTransmuting && selectedFormula && (
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 font-space">
                Active Transmutation: {selectedFormula.name}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-white mb-3">Alchemy Process</h4>
                  <div className="space-y-2">
                    {selectedFormula.process.map((step, index) => (
                      <div key={index} className={`flex items-center space-x-2 p-2 rounded ${
                        alchemyProgress > (index / selectedFormula.process.length) * 100 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-white/5 text-white/60'
                      }`}>
                        {alchemyProgress > (index / selectedFormula.process.length) * 100 ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Circle className="w-4 h-4" />
                        )}
                        <span className="text-sm">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-white mb-3">Transmutation Progress</h4>
                  <div className="bg-white/5 p-4 rounded-lg mb-4">
                    <div className="flex justify-between text-sm text-white/60 mb-2">
                      <span>Transformation</span>
                      <span>{alchemyProgress.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-4">
                      <div 
                        className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 h-4 rounded-full transition-all"
                        style={{ width: `${alchemyProgress}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className="font-bold text-white text-sm">Expected Result:</h5>
                    <p className="text-white/80 text-sm">{selectedFormula.result.description}</p>
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      {selectedFormula.result.protectionType.slice(0, 4).map((type, i) => (
                        <div key={i} className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-center">
                          {type}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Funding Tab */}
      {activeTab === 'funding' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-bold text-white mb-6 font-space">Sacred Mission Funding</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="font-bold text-white mb-3">Funding Requirements</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Time Portal Technology:</span>
                    <span className="text-green-400">$150,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Divine Protection Shields:</span>
                    <span className="text-blue-400">$75,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Sacred Alchemy Equipment:</span>
                    <span className="text-purple-400">$50,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Spiritual Research Team:</span>
                    <span className="text-yellow-400">$58,000</span>
                  </div>
                  <div className="border-t border-white/20 pt-2 flex justify-between">
                    <span className="text-white font-bold">Total Required:</span>
                    <span className="text-white font-bold">${timeTravelMission.requiredFunding.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="font-bold text-white mb-3">Divine Mission Statement</h4>
                <p className="text-white/80 text-sm italic">
                  "Through sacred alchemy and divine love, we seek to transform the instruments of suffering 
                  into tools of protection and blessing. The 30 pieces of silver, once symbols of betrayal, 
                  shall become shields of divine light that protect the innocent and heal the wounded."
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white/5 p-4 rounded-lg text-center">
                <div className="text-6xl mb-4">⏰</div>
                <h4 className="font-bold text-white mb-2">Time Travel Technology</h4>
                <p className="text-white/70 text-sm mb-4">
                  Quantum temporal displacement with divine guidance and protection
                </p>
                <div className="space-y-2">
                  <div className="text-xs text-white/60">Target: 33 AD</div>
                  <div className="text-xs text-white/60">Mission: Divine Protection</div>
                  <div className="text-xs text-white/60">Duration: Eternal Impact</div>
                </div>
              </div>

              <button
                onClick={fundTimeTravelProject}
                disabled={missionProgress.funding >= 100}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all font-bold text-lg disabled:opacity-50"
              >
                {missionProgress.funding >= 100 ? '✅ Mission Funded' : '💰 Fund Sacred Mission'}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Protection Tab */}
      {activeTab === 'protection' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 font-space">Divine Protection Arsenal</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="font-bold text-white mb-3">Protection Level</h4>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">{protectionLevel}</div>
                  <div className="text-white/60 text-sm">Divine Protection Units</div>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3 mt-3">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-purple-500 h-3 rounded-full transition-all"
                    style={{ width: `${Math.min((protectionLevel / 2000) * 100, 100)}%` }}
                  />
                </div>
              </div>

              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="font-bold text-white mb-3">Silver Transformation</h4>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400 mb-2">{silverAmount}</div>
                  <div className="text-white/60 text-sm">Pieces Remaining</div>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3 mt-3">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all"
                    style={{ width: `${((30 - silverAmount) / 30) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-white/60 mt-2">
                  {30 - silverAmount} pieces transformed into divine protection
                </p>
              </div>
            </div>

            {/* Protection Types */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Spiritual Shield', power: Math.floor(protectionLevel * 0.3), icon: <Shield className="w-5 h-5" />, color: 'from-blue-500 to-cyan-600' },
                { name: 'Divine Light', power: Math.floor(protectionLevel * 0.25), icon: <Sun className="w-5 h-5" />, color: 'from-yellow-500 to-orange-600' },
                { name: 'Angelic Guard', power: Math.floor(protectionLevel * 0.25), icon: <Users className="w-5 h-5" />, color: 'from-purple-500 to-pink-600' },
                { name: 'Sacred Barrier', power: Math.floor(protectionLevel * 0.2), icon: <Eye className="w-5 h-5" />, color: 'from-green-500 to-emerald-600' }
              ].map((protection, index) => (
                <div key={index} className="bg-white/5 p-4 rounded-lg text-center">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${protection.color} mb-3 mx-auto w-fit`}>
                    {protection.icon}
                  </div>
                  <h4 className="font-bold text-white text-sm mb-1">{protection.name}</h4>
                  <p className="text-2xl font-bold text-white">{protection.power}</p>
                  <p className="text-xs text-white/60">Protection Units</p>
                </div>
              ))}
            </div>

            {/* Biblical Reference */}
            <div className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 p-4 rounded-lg border border-yellow-400/30">
              <div className="text-center">
                <p className="text-white/90 italic mb-2">
                  "And he took the cup, and gave thanks, and said, Take this, and divide it among yourselves"
                </p>
                <p className="text-yellow-400 text-sm">- Luke 22:17</p>
                <p className="text-white/70 text-xs mt-2">
                  Through divine alchemy, suffering becomes blessing, betrayal becomes protection
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};