import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Car, 
  MapPin, 
  Target, 
  DollarSign, 
  Star, 
  Shield, 
  Zap,
  Users,
  Crosshair,
  Fuel,
  Heart,
  Activity,
  Map,
  Phone,
  ShoppingCart,
  Briefcase,
  Truck,
  Plane,
  Bike,
  Clock,
  AlertTriangle,
  Crown,
  Gamepad2
} from 'lucide-react';

interface Player {
  id: string;
  name: string;
  level: number;
  health: number;
  maxHealth: number;
  armor: number;
  money: number;
  respect: number;
  wantedLevel: number;
  position: { x: number; y: number };
  vehicle: Vehicle | null;
  weapons: string[];
  stats: {
    strength: number;
    stamina: number;
    shooting: number;
    driving: number;
    flying: number;
  };
}

interface Vehicle {
  id: string;
  name: string;
  type: 'car' | 'motorcycle' | 'truck' | 'plane' | 'boat';
  speed: number;
  maxSpeed: number;
  health: number;
  maxHealth: number;
  fuel: number;
  maxFuel: number;
  price: number;
  color: string;
  icon: React.ReactNode;
}

interface Mission {
  id: string;
  title: string;
  description: string;
  type: 'heist' | 'delivery' | 'elimination' | 'race' | 'territory';
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  reward: number;
  respectGain: number;
  timeLimit?: number;
  requirements: string[];
  status: 'available' | 'active' | 'completed' | 'failed';
  progress: number;
}

interface Crime {
  id: string;
  type: 'robbery' | 'carjacking' | 'drug_deal' | 'gang_war' | 'heist';
  name: string;
  reward: number;
  riskLevel: number;
  wantedIncrease: number;
  duration: number;
  requirements: string[];
}

interface GTASimulationProps {
  onMoneyEarned: (amount: number, description: string) => void;
  onLevelUp: (newLevel: number) => void;
}

export const GTASimulation: React.FC<GTASimulationProps> = ({
  onMoneyEarned,
  onLevelUp
}) => {
  const [activeTab, setActiveTab] = useState<'world' | 'missions' | 'vehicles' | 'crime' | 'stats'>('world');
  const [player, setPlayer] = useState<Player>({
    id: 'player-1',
    name: 'Street King',
    level: 5,
    health: 100,
    maxHealth: 100,
    armor: 50,
    money: 25000,
    respect: 1250,
    wantedLevel: 0,
    position: { x: 50, y: 50 },
    vehicle: null,
    weapons: ['Pistol', 'Uzi', 'Shotgun'],
    stats: {
      strength: 65,
      stamina: 70,
      shooting: 80,
      driving: 85,
      flying: 45
    }
  });

  const [vehicles] = useState<Vehicle[]>([
    {
      id: 'supercar-1',
      name: 'Velocity GT',
      type: 'car',
      speed: 0,
      maxSpeed: 220,
      health: 100,
      maxHealth: 100,
      fuel: 80,
      maxFuel: 100,
      price: 500000,
      color: 'from-red-500 to-orange-600',
      icon: <Car className="w-6 h-6" />
    },
    {
      id: 'motorcycle-1',
      name: 'Street Demon',
      type: 'motorcycle',
      speed: 0,
      maxSpeed: 180,
      health: 60,
      maxHealth: 60,
      fuel: 90,
      maxFuel: 100,
      price: 85000,
      color: 'from-purple-500 to-pink-600',
      icon: <Bike className="w-6 h-6" />
    },
    {
      id: 'truck-1',
      name: 'Titan Hauler',
      type: 'truck',
      speed: 0,
      maxSpeed: 120,
      health: 200,
      maxHealth: 200,
      fuel: 60,
      maxFuel: 150,
      price: 250000,
      color: 'from-yellow-500 to-orange-600',
      icon: <Truck className="w-6 h-6" />
    },
    {
      id: 'plane-1',
      name: 'Sky Reaper',
      type: 'plane',
      speed: 0,
      maxSpeed: 350,
      health: 150,
      maxHealth: 150,
      fuel: 70,
      maxFuel: 200,
      price: 2000000,
      color: 'from-blue-500 to-cyan-600',
      icon: <Plane className="w-6 h-6" />
    }
  ]);

  const [missions, setMissions] = useState<Mission[]>([
    {
      id: 'heist-1',
      title: 'Casino Royale Heist',
      description: 'Rob the Diamond Casino with your crew. High risk, massive reward.',
      type: 'heist',
      difficulty: 'extreme',
      reward: 2500000,
      respectGain: 500,
      timeLimit: 1800,
      requirements: ['Level 10+', 'Crew of 4', 'Heavy Weapons'],
      status: 'available',
      progress: 0
    },
    {
      id: 'delivery-1',
      title: 'Midnight Cargo Run',
      description: 'Transport illegal cargo across the city without getting caught.',
      type: 'delivery',
      difficulty: 'medium',
      reward: 150000,
      respectGain: 75,
      timeLimit: 600,
      requirements: ['Fast Vehicle', 'Low Wanted Level'],
      status: 'available',
      progress: 0
    },
    {
      id: 'race-1',
      title: 'Street Racing Championship',
      description: 'Dominate the underground racing scene and claim the title.',
      type: 'race',
      difficulty: 'hard',
      reward: 750000,
      respectGain: 200,
      requirements: ['Supercar', 'Driving Skill 80+'],
      status: 'available',
      progress: 0
    },
    {
      id: 'elimination-1',
      title: 'Gang Warfare',
      description: 'Eliminate rival gang members and secure territory.',
      type: 'elimination',
      difficulty: 'hard',
      reward: 500000,
      respectGain: 300,
      requirements: ['Heavy Weapons', 'Backup Crew'],
      status: 'available',
      progress: 0
    }
  ]);

  const [crimes] = useState<Crime[]>([
    {
      id: 'robbery-1',
      type: 'robbery',
      name: 'Bank Robbery',
      reward: 500000,
      riskLevel: 90,
      wantedIncrease: 4,
      duration: 300,
      requirements: ['Weapons', 'Getaway Vehicle']
    },
    {
      id: 'carjack-1',
      type: 'carjacking',
      name: 'Luxury Car Theft',
      reward: 75000,
      riskLevel: 40,
      wantedIncrease: 1,
      duration: 60,
      requirements: ['Lockpicking Skills']
    },
    {
      id: 'drugs-1',
      type: 'drug_deal',
      name: 'Street Drug Deal',
      reward: 25000,
      riskLevel: 60,
      wantedIncrease: 2,
      duration: 120,
      requirements: ['Territory Control']
    },
    {
      id: 'gang-1',
      type: 'gang_war',
      name: 'Territory War',
      reward: 200000,
      riskLevel: 85,
      wantedIncrease: 3,
      duration: 480,
      requirements: ['Gang Members', 'Heavy Weapons']
    }
  ]);

  const [gameState, setGameState] = useState({
    isPlaying: false,
    currentActivity: 'Exploring the city',
    timeOfDay: 'day',
    weather: 'clear',
    policeChase: false,
    activeMission: null as Mission | null
  });

  const [cityMap, setCityMap] = useState({
    districts: [
      { name: 'Downtown', danger: 30, activities: ['Shopping', 'Business'] },
      { name: 'Gang Territory', danger: 85, activities: ['Drug Deals', 'Gang Wars'] },
      { name: 'Rich Hills', danger: 10, activities: ['Luxury Cars', 'Mansions'] },
      { name: 'Industrial', danger: 50, activities: ['Warehouses', 'Truck Jobs'] },
      { name: 'Airport', danger: 60, activities: ['Plane Theft', 'Smuggling'] },
      { name: 'Docks', danger: 70, activities: ['Boat Jobs', 'Cargo Heists'] }
    ]
  });

  useEffect(() => {
    if (gameState.isPlaying) {
      const interval = setInterval(() => {
        // Simulate game progression
        updatePlayerStats();
        simulatePolice();
        updateMissions();
        generateRandomEvents();
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [gameState.isPlaying]);

  const updatePlayerStats = () => {
    setPlayer(prev => {
      // Health regeneration
      const healthRegen = Math.min(prev.maxHealth, prev.health + 2);
      
      // Money from passive income
      const passiveIncome = Math.floor(Math.random() * 1000) + 500;
      
      // Respect growth
      const respectGain = Math.floor(Math.random() * 10) + 5;

      return {
        ...prev,
        health: healthRegen,
        money: prev.money + passiveIncome,
        respect: prev.respect + respectGain
      };
    });
  };

  const simulatePolice = () => {
    if (player.wantedLevel > 0) {
      setGameState(prev => ({
        ...prev,
        policeChase: Math.random() < (player.wantedLevel * 0.15),
        currentActivity: prev.policeChase ? 'Evading police!' : 'Laying low'
      }));

      // Reduce wanted level over time
      if (Math.random() < 0.3) {
        setPlayer(prev => ({
          ...prev,
          wantedLevel: Math.max(0, prev.wantedLevel - 1)
        }));
      }
    }
  };

  const updateMissions = () => {
    setMissions(prev => prev.map(mission => {
      if (mission.status === 'active') {
        const progressIncrease = Math.random() * 20 + 10;
        const newProgress = Math.min(100, mission.progress + progressIncrease);
        
        if (newProgress >= 100) {
          // Mission completed
          onMoneyEarned(mission.reward, `Completed mission: ${mission.title}`);
          setPlayer(prevPlayer => ({
            ...prevPlayer,
            money: prevPlayer.money + mission.reward,
            respect: prevPlayer.respect + mission.respectGain,
            level: Math.floor((prevPlayer.respect + mission.respectGain) / 1000) + 1
          }));
          
          return { ...mission, status: 'completed' as const, progress: 100 };
        }
        
        return { ...mission, progress: newProgress };
      }
      return mission;
    }));
  };

  const generateRandomEvents = () => {
    const events = [
      'Found a briefcase with $10,000!',
      'Police checkpoint ahead!',
      'Gang members spotted in the area',
      'Luxury car spotted - perfect for theft',
      'Drug deal going down at the docks',
      'Racing event starting downtown'
    ];

    if (Math.random() < 0.2) {
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      setGameState(prev => ({
        ...prev,
        currentActivity: randomEvent
      }));

      // Random money rewards
      if (randomEvent.includes('briefcase')) {
        const bonus = 10000;
        onMoneyEarned(bonus, 'Random street find');
        setPlayer(prev => ({ ...prev, money: prev.money + bonus }));
      }
    }
  };

  const startMission = (mission: Mission) => {
    setMissions(prev => prev.map(m => 
      m.id === mission.id ? { ...m, status: 'active' as const, progress: 0 } : m
    ));
    setGameState(prev => ({
      ...prev,
      activeMission: mission,
      currentActivity: `Mission: ${mission.title}`
    }));
  };

  const commitCrime = (crime: Crime) => {
    const success = Math.random() > (crime.riskLevel / 100);
    
    if (success) {
      onMoneyEarned(crime.reward, `Crime: ${crime.name}`);
      setPlayer(prev => ({
        ...prev,
        money: prev.money + crime.reward,
        wantedLevel: Math.min(5, prev.wantedLevel + crime.wantedIncrease),
        respect: prev.respect + Math.floor(crime.reward / 1000)
      }));
      setGameState(prev => ({
        ...prev,
        currentActivity: `Successfully completed ${crime.name}!`
      }));
    } else {
      setPlayer(prev => ({
        ...prev,
        health: Math.max(0, prev.health - 20),
        wantedLevel: Math.min(5, prev.wantedLevel + crime.wantedIncrease + 1)
      }));
      setGameState(prev => ({
        ...prev,
        currentActivity: `${crime.name} failed! Police alerted!`,
        policeChase: true
      }));
    }
  };

  const enterVehicle = (vehicle: Vehicle) => {
    if (player.money >= vehicle.price) {
      setPlayer(prev => ({
        ...prev,
        vehicle: vehicle,
        money: prev.money - vehicle.price
      }));
      onMoneyEarned(-vehicle.price, `Purchased ${vehicle.name}`);
    }
  };

  const startGame = () => {
    setGameState(prev => ({ ...prev, isPlaying: true }));
  };

  const stopGame = () => {
    setGameState(prev => ({ ...prev, isPlaying: false, policeChase: false }));
  };

  const getWantedStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < player.wantedLevel ? 'text-red-500 fill-current' : 'text-gray-400'
        }`}
      />
    ));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-orange-400';
      case 'extreme': return 'text-red-400';
      default: return 'text-gray-400';
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
          <div className="p-3 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl">
            <Gamepad2 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white font-space">GTA 8: City of Sin</h2>
            <p className="text-white/70">Open-world crime simulation with endless possibilities</p>
          </div>
        </div>

        {/* Player HUD */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Heart className="w-4 h-4 text-red-400" />
              <span className="text-white/60 text-sm">Health</span>
            </div>
            <p className="text-xl font-bold text-red-400">{player.health}%</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <DollarSign className="w-4 h-4 text-green-400" />
              <span className="text-white/60 text-sm">Money</span>
            </div>
            <p className="text-xl font-bold text-green-400">${player.money.toLocaleString()}</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Crown className="w-4 h-4 text-purple-400" />
              <span className="text-white/60 text-sm">Respect</span>
            </div>
            <p className="text-xl font-bold text-purple-400">{player.respect}</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-white/60 text-sm">Level</span>
            </div>
            <p className="text-xl font-bold text-blue-400">{player.level}</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <span className="text-white/60 text-sm block mb-1">Wanted</span>
            <div className="flex justify-center space-x-1">
              {getWantedStars()}
            </div>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Activity className="w-4 h-4 text-yellow-400" />
              <span className="text-white/60 text-sm">Status</span>
            </div>
            <p className={`text-sm font-bold ${gameState.isPlaying ? 'text-green-400' : 'text-red-400'}`}>
              {gameState.isPlaying ? 'ACTIVE' : 'PAUSED'}
            </p>
          </div>
        </div>

        {/* Current Activity */}
        <div className="bg-white/5 p-4 rounded-lg mb-6">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${gameState.policeChase ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
            <p className="text-white font-medium">{gameState.currentActivity}</p>
            {gameState.policeChase && (
              <div className="flex items-center space-x-1 text-red-400">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-bold">POLICE CHASE!</span>
              </div>
            )}
          </div>
        </div>

        {/* Game Controls */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={startGame}
            disabled={gameState.isPlaying}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50 flex items-center space-x-2"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Start Game</span>
          </button>
          
          <button
            onClick={stopGame}
            disabled={!gameState.isPlaying}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-lg hover:from-red-600 hover:to-rose-700 transition-all disabled:opacity-50"
          >
            Stop Game
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4">
          {[
            { id: 'world', name: 'Open World', icon: <Map className="w-4 h-4" /> },
            { id: 'missions', name: 'Missions', icon: <Target className="w-4 h-4" /> },
            { id: 'vehicles', name: 'Vehicles', icon: <Car className="w-4 h-4" /> },
            { id: 'crime', name: 'Crime', icon: <Crosshair className="w-4 h-4" /> },
            { id: 'stats', name: 'Stats', icon: <Activity className="w-4 h-4" /> }
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

      {/* Open World Tab */}
      {activeTab === 'world' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {cityMap.districts.map((district, index) => (
            <motion.div
              key={district.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white font-space">{district.name}</h3>
                <div className={`px-2 py-1 rounded-full text-xs ${
                  district.danger < 30 ? 'bg-green-500/20 text-green-400' :
                  district.danger < 60 ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {district.danger < 30 ? 'Safe' : district.danger < 60 ? 'Moderate' : 'Dangerous'}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-white/60">Danger Level:</span>
                  <span className="text-white">{district.danger}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      district.danger < 30 ? 'bg-green-400' :
                      district.danger < 60 ? 'bg-yellow-400' : 'bg-red-400'
                    }`}
                    style={{ width: `${district.danger}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-white text-sm">Activities:</h4>
                {district.activities.map((activity, i) => (
                  <div key={i} className="text-white/70 text-xs">• {activity}</div>
                ))}
              </div>

              <button
                onClick={() => {
                  setPlayer(prev => ({ ...prev, position: { x: Math.random() * 100, y: Math.random() * 100 } }));
                  setGameState(prev => ({ ...prev, currentActivity: `Exploring ${district.name}` }));
                }}
                className="w-full mt-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all text-sm"
              >
                Travel Here
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Missions Tab */}
      {activeTab === 'missions' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {missions.map((mission, index) => (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white font-space">{mission.title}</h3>
                  <p className="text-white/70">{mission.description}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    mission.status === 'available' ? 'bg-green-500/20 text-green-400' :
                    mission.status === 'active' ? 'bg-blue-500/20 text-blue-400' :
                    mission.status === 'completed' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {mission.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-white/5 p-3 rounded-lg text-center">
                  <span className="text-white/60 text-sm">Reward</span>
                  <p className="text-green-400 font-bold">${mission.reward.toLocaleString()}</p>
                </div>
                <div className="bg-white/5 p-3 rounded-lg text-center">
                  <span className="text-white/60 text-sm">Respect</span>
                  <p className="text-purple-400 font-bold">+{mission.respectGain}</p>
                </div>
                <div className="bg-white/5 p-3 rounded-lg text-center">
                  <span className="text-white/60 text-sm">Difficulty</span>
                  <p className={`font-bold ${getDifficultyColor(mission.difficulty)}`}>
                    {mission.difficulty.toUpperCase()}
                  </p>
                </div>
                <div className="bg-white/5 p-3 rounded-lg text-center">
                  <span className="text-white/60 text-sm">Time Limit</span>
                  <p className="text-white font-bold">
                    {mission.timeLimit ? `${mission.timeLimit / 60}min` : 'None'}
                  </p>
                </div>
              </div>

              {mission.status === 'active' && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-white/60 mb-2">
                    <span>Progress</span>
                    <span>{Math.round(mission.progress)}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-400 to-purple-500 h-3 rounded-full transition-all"
                      style={{ width: `${mission.progress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="mb-4">
                <h4 className="font-bold text-white text-sm mb-2">Requirements:</h4>
                <div className="flex flex-wrap gap-2">
                  {mission.requirements.map((req, i) => (
                    <span key={i} className="text-xs bg-white/10 px-2 py-1 rounded-full text-white/70">
                      {req}
                    </span>
                  ))}
                </div>
              </div>

              {mission.status === 'available' && (
                <button
                  onClick={() => startMission(mission)}
                  className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-lg hover:from-yellow-600 hover:to-orange-700 transition-all font-medium"
                >
                  Start Mission
                </button>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Vehicles Tab */}
      {activeTab === 'vehicles' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {vehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${vehicle.color}`}>
                  {vehicle.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-space">{vehicle.name}</h3>
                  <p className="text-white/60 capitalize">{vehicle.type}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white/5 p-3 rounded-lg">
                  <span className="text-white/60 text-sm">Max Speed</span>
                  <p className="text-white font-bold">{vehicle.maxSpeed} mph</p>
                </div>
                <div className="bg-white/5 p-3 rounded-lg">
                  <span className="text-white/60 text-sm">Health</span>
                  <p className="text-white font-bold">{vehicle.health}%</p>
                </div>
                <div className="bg-white/5 p-3 rounded-lg">
                  <span className="text-white/60 text-sm">Fuel</span>
                  <p className="text-white font-bold">{vehicle.fuel}%</p>
                </div>
                <div className="bg-white/5 p-3 rounded-lg">
                  <span className="text-white/60 text-sm">Price</span>
                  <p className="text-green-400 font-bold">${vehicle.price.toLocaleString()}</p>
                </div>
              </div>

              <button
                onClick={() => enterVehicle(vehicle)}
                disabled={player.money < vehicle.price}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all font-medium disabled:opacity-50"
              >
                {player.money >= vehicle.price ? 'Buy Vehicle' : 'Insufficient Funds'}
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Crime Tab */}
      {activeTab === 'crime' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {crimes.map((crime, index) => (
            <motion.div
              key={crime.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white font-space">{crime.name}</h3>
                <div className={`px-2 py-1 rounded-full text-xs ${
                  crime.riskLevel < 30 ? 'bg-green-500/20 text-green-400' :
                  crime.riskLevel < 60 ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {crime.riskLevel}% Risk
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white/5 p-3 rounded-lg text-center">
                  <span className="text-white/60 text-sm">Reward</span>
                  <p className="text-green-400 font-bold">${crime.reward.toLocaleString()}</p>
                </div>
                <div className="bg-white/5 p-3 rounded-lg text-center">
                  <span className="text-white/60 text-sm">Wanted ⭐</span>
                  <p className="text-red-400 font-bold">+{crime.wantedIncrease}</p>
                </div>
                <div className="bg-white/5 p-3 rounded-lg text-center">
                  <span className="text-white/60 text-sm">Duration</span>
                  <p className="text-white font-bold">{crime.duration}s</p>
                </div>
                <div className="bg-white/5 p-3 rounded-lg text-center">
                  <span className="text-white/60 text-sm">Type</span>
                  <p className="text-purple-400 font-bold capitalize">{crime.type.replace('_', ' ')}</p>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-bold text-white text-sm mb-2">Requirements:</h4>
                <div className="space-y-1">
                  {crime.requirements.map((req, i) => (
                    <div key={i} className="text-white/70 text-xs">• {req}</div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => commitCrime(crime)}
                className="w-full py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-lg hover:from-red-600 hover:to-rose-700 transition-all font-medium"
              >
                Commit Crime
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Stats Tab */}
      {activeTab === 'stats' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 font-space">Player Statistics</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {Object.entries(player.stats).map(([stat, value]) => (
                  <div key={stat} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white/70 capitalize">{stat}:</span>
                      <span className="text-white font-bold">{value}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-bold text-white mb-2">Current Weapons</h4>
                  <div className="space-y-1">
                    {player.weapons.map((weapon, i) => (
                      <div key={i} className="text-white/70 text-sm">• {weapon}</div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-bold text-white mb-2">Current Vehicle</h4>
                  <p className="text-white/70">
                    {player.vehicle ? player.vehicle.name : 'On foot'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center">
              <Crown className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-white font-bold text-xl">{player.level}</p>
              <p className="text-white/60 text-sm">Level</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center">
              <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-white font-bold text-xl">${player.money.toLocaleString()}</p>
              <p className="text-white/60 text-sm">Total Wealth</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center">
              <Target className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-white font-bold text-xl">{player.respect}</p>
              <p className="text-white/60 text-sm">Street Respect</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};