import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Zap, 
  Target, 
  Shield, 
  Sword,
  Brain,
  Activity,
  Settings,
  Play,
  Pause,
  Square,
  RotateCcw,
  TrendingUp,
  Users,
  Crown,
  Star,
  Coins
} from 'lucide-react';

interface AIBot {
  id: string;
  name: string;
  role: 'carry' | 'support' | 'tank' | 'jungle';
  level: number;
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  experience: number;
  gold: number;
  status: 'active' | 'idle' | 'executing' | 'dead';
  currentAction: string;
  abilities: string[];
  items: string[];
  kills: number;
  deaths: number;
  assists: number;
  lastAction: Date;
  executionSpeed: number;
  color: string;
  icon: React.ReactNode;
}

interface ExecutionCommand {
  id: string;
  botId: string;
  command: string;
  target?: string;
  priority: number;
  duration: number;
  status: 'queued' | 'executing' | 'completed' | 'failed';
  result?: string;
}

interface DOTAAIBotsProps {
  onBotAction: (action: string, result: any) => void;
  onCoinsEarned: (amount: number, description: string) => void;
}

export const DOTAAIBots: React.FC<DOTAAIBotsProps> = ({
  onBotAction,
  onCoinsEarned
}) => {
  const [activeTab, setActiveTab] = useState<'bots' | 'commands' | 'strategy' | 'stats'>('bots');
  const [bots, setBots] = useState<AIBot[]>([]);
  const [commands, setCommands] = useState<ExecutionCommand[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedBot, setSelectedBot] = useState<AIBot | null>(null);
  const [battleStats, setBattleStats] = useState({
    totalKills: 0,
    totalGold: 0,
    totalExperience: 0,
    matchTime: 0,
    winRate: 87.5
  });

  useEffect(() => {
    // Initialize 4 DOTA-style AI bots
    const initialBots: AIBot[] = [
      {
        id: 'bot-1',
        name: 'Shadow Executor',
        role: 'carry',
        level: 15,
        health: 850,
        maxHealth: 1200,
        mana: 400,
        maxMana: 600,
        experience: 8500,
        gold: 2850,
        status: 'active',
        currentAction: 'Farming creeps in jungle',
        abilities: ['Shadow Strike', 'Blink', 'Critical Strike', 'Avatar'],
        items: ['Battle Fury', 'Power Treads', 'Black King Bar'],
        kills: 8,
        deaths: 2,
        assists: 12,
        lastAction: new Date(),
        executionSpeed: 0.8,
        color: 'from-purple-500 to-indigo-600',
        icon: <Sword className="w-6 h-6" />
      },
      {
        id: 'bot-2',
        name: 'Divine Support',
        role: 'support',
        level: 12,
        health: 650,
        maxHealth: 800,
        mana: 550,
        maxMana: 750,
        experience: 5200,
        gold: 1650,
        status: 'active',
        currentAction: 'Warding river areas',
        abilities: ['Heal', 'Holy Light', 'Teleport', 'Guardian Angel'],
        items: ['Arcane Boots', 'Force Staff', 'Glimmer Cape'],
        kills: 2,
        deaths: 4,
        assists: 18,
        lastAction: new Date(),
        executionSpeed: 1.2,
        color: 'from-yellow-400 to-orange-500',
        icon: <Shield className="w-6 h-6" />
      },
      {
        id: 'bot-3',
        name: 'Tank Commander',
        role: 'tank',
        level: 14,
        health: 1400,
        maxHealth: 1800,
        mana: 300,
        maxMana: 450,
        experience: 7800,
        gold: 2200,
        status: 'active',
        currentAction: 'Initiating team fight',
        abilities: ['Slam', 'Taunt', 'Armor Up', 'Berserker Call'],
        items: ['Vanguard', 'Blink Dagger', 'Heart of Tarrasque'],
        kills: 4,
        deaths: 6,
        assists: 22,
        lastAction: new Date(),
        executionSpeed: 0.6,
        color: 'from-red-500 to-rose-600',
        icon: <Shield className="w-6 h-6" />
      },
      {
        id: 'bot-4',
        name: 'Jungle Predator',
        role: 'jungle',
        level: 13,
        health: 750,
        maxHealth: 950,
        mana: 480,
        maxMana: 600,
        experience: 6800,
        gold: 2400,
        status: 'active',
        currentAction: 'Ganking mid lane',
        abilities: ['Smoke', 'Backstab', 'Invisibility', 'Poison'],
        items: ['Shadow Blade', 'Desolator', 'Power Treads'],
        kills: 12,
        deaths: 3,
        assists: 8,
        lastAction: new Date(),
        executionSpeed: 1.5,
        color: 'from-green-500 to-emerald-600',
        icon: <Target className="w-6 h-6" />
      }
    ];

    setBots(initialBots);
  }, []);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        executeAICommands();
        updateBotStates();
        generateRandomActions();
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isRunning, bots]);

  const executeAICommands = () => {
    setBots(prev => prev.map(bot => {
      if (bot.status === 'active') {
        // DOTA-style AI execution patterns
        const actions = [
          'Last hitting creeps',
          'Denying enemy farm',
          'Pushing tower',
          'Ganking enemy hero',
          'Farming jungle',
          'Placing ward',
          'Buying items',
          'Team fighting',
          'Roshan attempt',
          'Base defense'
        ];

        const newAction = actions[Math.floor(Math.random() * actions.length)];
        const goldGain = Math.floor(Math.random() * 200) + 50;
        const expGain = Math.floor(Math.random() * 150) + 25;

        return {
          ...bot,
          currentAction: newAction,
          gold: bot.gold + goldGain,
          experience: bot.experience + expGain,
          level: Math.min(25, Math.floor(bot.experience / 1000) + 1),
          lastAction: new Date()
        };
      }
      return bot;
    }));

    // Award coins for bot performance
    const totalGold = bots.reduce((sum, bot) => sum + bot.gold, 0);
    if (totalGold > battleStats.totalGold) {
      const newGold = totalGold - battleStats.totalGold;
      onCoinsEarned(Math.floor(newGold / 100), 'AI Bot gold farming bonus');
    }

    setBattleStats(prev => ({
      ...prev,
      totalGold: totalGold,
      totalKills: bots.reduce((sum, bot) => sum + bot.kills, 0),
      totalExperience: bots.reduce((sum, bot) => sum + bot.experience, 0),
      matchTime: prev.matchTime + 2
    }));
  };

  const updateBotStates = () => {
    setBots(prev => prev.map(bot => {
      // Simulate health/mana regeneration
      const healthRegen = Math.min(bot.maxHealth, bot.health + 10);
      const manaRegen = Math.min(bot.maxMana, bot.mana + 15);

      // Random events
      if (Math.random() < 0.1) {
        // Combat event
        const damage = Math.floor(Math.random() * 200) + 50;
        return {
          ...bot,
          health: Math.max(0, bot.health - damage),
          status: bot.health - damage <= 0 ? 'dead' : bot.status
        };
      }

      return {
        ...bot,
        health: healthRegen,
        mana: manaRegen
      };
    }));
  };

  const generateRandomActions = () => {
    if (commands.length < 10) {
      const randomBot = bots[Math.floor(Math.random() * bots.length)];
      const actionCommands = [
        'Execute gank sequence',
        'Farm efficiency mode',
        'Team fight positioning',
        'Ward placement strategy',
        'Item purchase optimization',
        'Skill build adaptation',
        'Roshan timing calculation',
        'Push strategy execution'
      ];

      const newCommand: ExecutionCommand = {
        id: Date.now().toString(),
        botId: randomBot.id,
        command: actionCommands[Math.floor(Math.random() * actionCommands.length)],
        priority: Math.floor(Math.random() * 5) + 1,
        duration: Math.floor(Math.random() * 10) + 5,
        status: 'queued'
      };

      setCommands(prev => [newCommand, ...prev.slice(0, 9)]);
    }
  };

  const startAIExecution = () => {
    setIsRunning(true);
    onBotAction('AI_BOTS_STARTED', { botCount: bots.length });
  };

  const stopAIExecution = () => {
    setIsRunning(false);
    onBotAction('AI_BOTS_STOPPED', { totalGold: battleStats.totalGold });
  };

  const respawnBot = (botId: string) => {
    setBots(prev => prev.map(bot => 
      bot.id === botId 
        ? { ...bot, health: bot.maxHealth, mana: bot.maxMana, status: 'active' }
        : bot
    ));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getHealthPercentage = (bot: AIBot) => {
    return (bot.health / bot.maxHealth) * 100;
  };

  const getManaPercentage = (bot: AIBot) => {
    return (bot.mana / bot.maxMana) * 100;
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
            <Bot className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white font-space">DOTA AI Execution Bots</h2>
            <p className="text-white/70">4 Strategic AI Bots with DOTA-style execution patterns</p>
          </div>
        </div>

        {/* Battle Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-white/60 text-sm">Match Time</p>
            <p className="text-xl font-bold text-blue-400">{formatTime(battleStats.matchTime)}</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-white/60 text-sm">Total Kills</p>
            <p className="text-xl font-bold text-red-400">{battleStats.totalKills}</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-white/60 text-sm">Total Gold</p>
            <p className="text-xl font-bold text-yellow-400">{battleStats.totalGold}</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-white/60 text-sm">Win Rate</p>
            <p className="text-xl font-bold text-green-400">{battleStats.winRate}%</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-white/60 text-sm">Status</p>
            <p className={`text-xl font-bold ${isRunning ? 'text-green-400' : 'text-red-400'}`}>
              {isRunning ? 'ACTIVE' : 'PAUSED'}
            </p>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={startAIExecution}
            disabled={isRunning}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50 flex items-center space-x-2"
          >
            <Play className="w-4 h-4" />
            <span>Start Execution</span>
          </button>
          
          <button
            onClick={stopAIExecution}
            disabled={!isRunning}
            className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-lg hover:from-red-600 hover:to-rose-700 transition-all disabled:opacity-50 flex items-center space-x-2"
          >
            <Pause className="w-4 h-4" />
            <span>Stop Execution</span>
          </button>
          
          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all flex items-center space-x-2">
            <RotateCcw className="w-4 h-4" />
            <span>Reset Match</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4">
          {[
            { id: 'bots', name: 'AI Bots', icon: <Bot className="w-4 h-4" /> },
            { id: 'commands', name: 'Commands', icon: <Activity className="w-4 h-4" /> },
            { id: 'strategy', name: 'Strategy', icon: <Brain className="w-4 h-4" /> },
            { id: 'stats', name: 'Statistics', icon: <TrendingUp className="w-4 h-4" /> }
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

      {/* Bots Tab */}
      {activeTab === 'bots' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {bots.map((bot, index) => (
            <motion.div
              key={bot.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 cursor-pointer"
              onClick={() => setSelectedBot(bot)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${bot.color}`}>
                    {bot.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-space">{bot.name}</h3>
                    <p className="text-white/60 text-sm capitalize">{bot.role} • Level {bot.level}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  bot.status === 'active' ? 'bg-green-500/20 text-green-400' :
                  bot.status === 'executing' ? 'bg-blue-500/20 text-blue-400' :
                  bot.status === 'dead' ? 'bg-red-500/20 text-red-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {bot.status.toUpperCase()}
                </span>
              </div>

              {/* Health and Mana Bars */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs text-white/60">
                  <span>Health</span>
                  <span>{bot.health}/{bot.maxHealth}</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-red-400 to-red-600 h-2 rounded-full transition-all"
                    style={{ width: `${getHealthPercentage(bot)}%` }}
                  />
                </div>
                
                <div className="flex justify-between text-xs text-white/60">
                  <span>Mana</span>
                  <span>{bot.mana}/{bot.maxMana}</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${getManaPercentage(bot)}%` }}
                  />
                </div>
              </div>

              {/* Current Action */}
              <div className="bg-white/5 p-3 rounded-lg mb-4">
                <p className="text-white/80 text-sm italic">"{bot.currentAction}"</p>
              </div>

              {/* KDA */}
              <div className="grid grid-cols-4 gap-2 text-center text-sm">
                <div>
                  <p className="text-white/60">K</p>
                  <p className="text-green-400 font-bold">{bot.kills}</p>
                </div>
                <div>
                  <p className="text-white/60">D</p>
                  <p className="text-red-400 font-bold">{bot.deaths}</p>
                </div>
                <div>
                  <p className="text-white/60">A</p>
                  <p className="text-blue-400 font-bold">{bot.assists}</p>
                </div>
                <div>
                  <p className="text-white/60">Gold</p>
                  <p className="text-yellow-400 font-bold">{bot.gold}</p>
                </div>
              </div>

              {bot.status === 'dead' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    respawnBot(bot.id);
                  }}
                  className="w-full mt-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all text-sm"
                >
                  Respawn Bot
                </button>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Commands Tab */}
      {activeTab === 'commands' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-bold text-white mb-4 font-space">Execution Commands Queue</h3>
          
          <div className="space-y-3">
            {commands.length === 0 ? (
              <div className="text-center py-8 text-white/60">
                <Activity className="w-16 h-16 mx-auto mb-4 opacity-40" />
                <p>No commands in queue. Start AI execution to see commands.</p>
              </div>
            ) : (
              commands.map((command) => (
                <div key={command.id} className="bg-white/5 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        command.status === 'executing' ? 'bg-blue-400 animate-pulse' :
                        command.status === 'completed' ? 'bg-green-400' :
                        command.status === 'failed' ? 'bg-red-400' :
                        'bg-yellow-400'
                      }`} />
                      <div>
                        <p className="font-bold text-white">{command.command}</p>
                        <p className="text-white/60 text-sm">
                          Bot: {bots.find(b => b.id === command.botId)?.name} • Priority: {command.priority}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white/60 text-sm">{command.duration}s</p>
                      <p className={`text-xs px-2 py-1 rounded-full ${
                        command.status === 'executing' ? 'bg-blue-500/20 text-blue-400' :
                        command.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        command.status === 'failed' ? 'bg-red-500/20 text-red-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {command.status}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      )}

      {/* Strategy Tab */}
      {activeTab === 'strategy' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 font-space">AI Strategy Patterns</h3>
            
            <div className="space-y-4">
              {[
                { name: 'Early Game Focus', description: 'Prioritize farming and leveling', active: true },
                { name: 'Gank Coordination', description: 'Execute coordinated ganks', active: true },
                { name: 'Objective Control', description: 'Secure Roshan and towers', active: false },
                { name: 'Late Game Scaling', description: 'Focus on carry protection', active: true }
              ].map((strategy, index) => (
                <div key={index} className="flex items-center justify-between bg-white/5 p-3 rounded-lg">
                  <div>
                    <p className="font-bold text-white">{strategy.name}</p>
                    <p className="text-white/60 text-sm">{strategy.description}</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    strategy.active ? 'bg-green-400' : 'bg-gray-400'
                  }`} />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 font-space">Execution Priorities</h3>
            
            <div className="space-y-4">
              {[
                { task: 'Farm Efficiency', priority: 95, color: 'from-green-400 to-emerald-500' },
                { task: 'Map Control', priority: 80, color: 'from-blue-400 to-cyan-500' },
                { task: 'Team Fighting', priority: 75, color: 'from-purple-400 to-pink-500' },
                { task: 'Item Builds', priority: 90, color: 'from-yellow-400 to-orange-500' }
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/70">{item.task}</span>
                    <span className="text-white font-bold">{item.priority}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${item.color} h-2 rounded-full transition-all`}
                      style={{ width: `${item.priority}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Statistics Tab */}
      {activeTab === 'stats' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {bots.map((bot) => (
              <div key={bot.id} className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="flex items-center space-x-2 mb-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${bot.color}`}>
                    {bot.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{bot.name}</h4>
                    <p className="text-white/60 text-xs">{bot.role}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-white/60">KDA:</span>
                    <span className="text-white">{bot.kills}/{bot.deaths}/{bot.assists}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Level:</span>
                    <span className="text-white">{bot.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Gold:</span>
                    <span className="text-yellow-400">{bot.gold}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Speed:</span>
                    <span className="text-blue-400">{bot.executionSpeed}x</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 font-space">Performance Metrics</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/5 p-4 rounded-lg text-center">
                <Crown className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-white font-bold text-xl">{battleStats.winRate}%</p>
                <p className="text-white/60 text-sm">Win Rate</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg text-center">
                <Coins className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-white font-bold text-xl">{Math.floor(battleStats.totalGold / 100)}</p>
                <p className="text-white/60 text-sm">Coins Earned</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg text-center">
                <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="text-white font-bold text-xl">{Math.floor(battleStats.totalExperience / 1000)}K</p>
                <p className="text-white/60 text-sm">Total XP</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg text-center">
                <Star className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <p className="text-white font-bold text-xl">{battleStats.totalKills}</p>
                <p className="text-white/60 text-sm">Total Kills</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Bot Detail Modal */}
      <AnimatePresence>
        {selectedBot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedBot(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl w-full border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-4 rounded-xl bg-gradient-to-r ${selectedBot.color}`}>
                    {selectedBot.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white font-space">{selectedBot.name}</h2>
                    <p className="text-white/70 capitalize">{selectedBot.role} • Level {selectedBot.level}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedBot(null)}
                  className="text-white/70 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-bold text-white mb-3">Abilities</h3>
                  <div className="space-y-2">
                    {selectedBot.abilities.map((ability, index) => (
                      <div key={index} className="bg-white/5 p-2 rounded text-white/80 text-sm">
                        {ability}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold text-white mb-3">Items</h3>
                  <div className="space-y-2">
                    {selectedBot.items.map((item, index) => (
                      <div key={index} className="bg-white/5 p-2 rounded text-white/80 text-sm">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white/5 p-4 rounded-lg">
                <h3 className="font-bold text-white mb-2">Current Status</h3>
                <p className="text-white/80 italic">"{selectedBot.currentAction}"</p>
                <p className="text-white/60 text-sm mt-2">
                  Execution Speed: {selectedBot.executionSpeed}x • Last Action: {selectedBot.lastAction.toLocaleTimeString()}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};