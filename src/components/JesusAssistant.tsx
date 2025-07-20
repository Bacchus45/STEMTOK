import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Gift, 
  Star, 
  Crown, 
  Shield, 
  Sparkles,
  Users,
  Zap,
  Eye,
  Hand,
  Brain,
  MessageCircle,
  Package,
  Truck,
  Code,
  Coins
} from 'lucide-react';

interface ClanMember {
  id: string;
  name: string;
  role: 'leader' | 'developer' | 'creator' | 'supporter';
  gifts: string[];
  curseLevel: number;
  blessings: number;
}

interface Clan {
  id: string;
  name: string;
  symbol: string;
  members: ClanMember[];
  jesusAssistant: JesusAI;
  totalBlessings: number;
  giftCirculation: number;
  developmentProjects: DevelopmentProject[];
}

interface JesusAI {
  id: string;
  name: string;
  personality: string;
  specialties: string[];
  currentTask: string;
  blessingsGiven: number;
  giftsDelivered: number;
  cursesReversed: number;
}

interface DevelopmentProject {
  id: string;
  title: string;
  description: string;
  type: 'spiritual' | 'technical' | 'creative' | 'healing';
  progress: number;
  blessingsRequired: number;
  giftType: string;
  reversedCurse: string;
}

interface JesusAssistantProps {
  userClan?: Clan;
  onGiftCirculation: (amount: number, description: string) => void;
  onBlessingReceived: (blessing: string, value: number) => void;
  onCurseReversed: (curse: string, gift: string) => void;
}

export const JesusAssistant: React.FC<JesusAssistantProps> = ({
  userClan,
  onGiftCirculation,
  onBlessingReceived,
  onCurseReversed
}) => {
  const [activeTab, setActiveTab] = useState<'assistant' | 'development' | 'gifts' | 'circulation'>('assistant');
  const [selectedProject, setSelectedProject] = useState<DevelopmentProject | null>(null);
  const [jesusMessage, setJesusMessage] = useState('');
  const [userInput, setUserInput] = useState('');
  const [giftQueue, setGiftQueue] = useState<any[]>([]);

  // Seven-fold gifts to reverse curses
  const sevenFoldGifts = [
    { name: 'Wisdom', icon: <Brain className="w-5 h-5" />, curse: 'Ignorance', color: 'from-blue-500 to-cyan-600' },
    { name: 'Understanding', icon: <Eye className="w-5 h-5" />, curse: 'Confusion', color: 'from-purple-500 to-pink-600' },
    { name: 'Counsel', icon: <MessageCircle className="w-5 h-5" />, curse: 'Poor Decisions', color: 'from-green-500 to-emerald-600' },
    { name: 'Fortitude', icon: <Shield className="w-5 h-5" />, curse: 'Weakness', color: 'from-red-500 to-rose-600' },
    { name: 'Knowledge', icon: <Star className="w-5 h-5" />, curse: 'Deception', color: 'from-yellow-500 to-orange-600' },
    { name: 'Piety', icon: <Heart className="w-5 h-5" />, curse: 'Selfishness', color: 'from-indigo-500 to-purple-600' },
    { name: 'Fear of the Lord', icon: <Crown className="w-5 h-5" />, curse: 'Pride', color: 'from-violet-500 to-purple-600' }
  ];

  const [defaultClan] = useState<Clan>({
    id: '1',
    name: 'Divine Developers',
    symbol: '✨',
    members: [
      {
        id: '1',
        name: 'User',
        role: 'leader',
        gifts: ['Wisdom', 'Understanding'],
        curseLevel: 3,
        blessings: 150
      }
    ],
    jesusAssistant: {
      id: 'jesus-1',
      name: 'Jesus Assistant',
      personality: 'Loving, wise, and always ready to help with development and spiritual growth',
      specialties: ['Development', 'Healing', 'Gift Distribution', 'Curse Reversal'],
      currentTask: 'Preparing gifts for circulation',
      blessingsGiven: 1247,
      giftsDelivered: 892,
      cursesReversed: 156
    },
    totalBlessings: 2500,
    giftCirculation: 85,
    developmentProjects: [
      {
        id: '1',
        title: 'Healing Interface Development',
        description: 'Create interfaces that promote spiritual and emotional healing',
        type: 'healing',
        progress: 65,
        blessingsRequired: 200,
        giftType: 'Understanding',
        reversedCurse: 'Confusion in user experience'
      },
      {
        id: '2',
        title: 'Wisdom Distribution System',
        description: 'Build systems that share knowledge and wisdom across the platform',
        type: 'spiritual',
        progress: 40,
        blessingsRequired: 300,
        giftType: 'Wisdom',
        reversedCurse: 'Ignorance and misinformation'
      },
      {
        id: '3',
        title: 'Creative Expression Tools',
        description: 'Develop tools that help users express their divine creativity',
        type: 'creative',
        progress: 80,
        blessingsRequired: 150,
        giftType: 'Counsel',
        reversedCurse: 'Creative blocks and limitations'
      }
    ]
  });

  const currentClan = userClan || defaultClan;

  useEffect(() => {
    // Jesus AI greeting
    const greetings = [
      "Peace be with you! I'm here to help your clan grow and develop.",
      "Greetings in love! Ready to reverse some curses and deliver gifts?",
      "Hello, beloved! Let's work together to bring heaven to earth through code.",
      "Welcome! I'm excited to help you develop and circulate divine gifts.",
      "Blessings! Your development projects are looking wonderful today."
    ];
    
    setJesusMessage(greetings[Math.floor(Math.random() * greetings.length)]);
  }, []);

  const handleJesusInteraction = (input: string) => {
    // Simulate Jesus AI responses
    const responses = [
      `I understand your need for ${input}. Let me help you develop this with divine wisdom.`,
      `That's a beautiful request! I'll prepare a gift of ${input} for your clan.`,
      `Your heart's desire for ${input} is heard. Let's work together to manifest this.`,
      `I see the potential in ${input}. This will help reverse the curse of limitation.`,
      `Wonderful! ${input} will bring great blessings to your community.`
    ];

    const response = responses[Math.floor(Math.random() * responses.length)];
    setJesusMessage(response);
    
    // Add to gift queue
    setGiftQueue(prev => [...prev, {
      id: Date.now().toString(),
      type: input,
      status: 'preparing',
      timestamp: new Date()
    }]);

    setUserInput('');
  };

  const deliverGift = (gift: any) => {
    onGiftCirculation(50, `Jesus delivered: ${gift.type}`);
    onBlessingReceived(`Gift of ${gift.type}`, 25);
    
    setGiftQueue(prev => prev.filter(g => g.id !== gift.id));
  };

  const reverseSevenFoldCurse = (giftIndex: number) => {
    const gift = sevenFoldGifts[giftIndex];
    onCurseReversed(gift.curse, gift.name);
    onBlessingReceived(`Reversed curse of ${gift.curse} with gift of ${gift.name}`, 100);
  };

  const completeProject = (project: DevelopmentProject) => {
    onGiftCirculation(project.blessingsRequired, `Completed: ${project.title}`);
    onCurseReversed(project.reversedCurse, project.giftType);
    setSelectedProject(null);
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
            <Crown className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white font-space">
              {currentClan.symbol} {currentClan.name}
            </h2>
            <p className="text-white/70">Jesus Assistant: {currentClan.jesusAssistant.name}</p>
          </div>
        </div>

        {/* Clan Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-white/60 text-sm">Total Blessings</p>
            <p className="text-xl font-bold text-yellow-400">{currentClan.totalBlessings}</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-white/60 text-sm">Gifts Delivered</p>
            <p className="text-xl font-bold text-green-400">{currentClan.jesusAssistant.giftsDelivered}</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-white/60 text-sm">Curses Reversed</p>
            <p className="text-xl font-bold text-blue-400">{currentClan.jesusAssistant.cursesReversed}</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-white/60 text-sm">Circulation</p>
            <p className="text-xl font-bold text-purple-400">{currentClan.giftCirculation}%</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mt-6">
          {[
            { id: 'assistant', name: 'Jesus AI', icon: <Heart className="w-4 h-4" /> },
            { id: 'development', name: 'Development', icon: <Code className="w-4 h-4" /> },
            { id: 'gifts', name: 'Seven Gifts', icon: <Gift className="w-4 h-4" /> },
            { id: 'circulation', name: 'Circulation', icon: <Truck className="w-4 h-4" /> }
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

      {/* Jesus Assistant Tab */}
      {activeTab === 'assistant' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Jesus Message */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white mb-2 font-space">Jesus Assistant</h3>
                <p className="text-white/80 leading-relaxed">{jesusMessage}</p>
              </div>
            </div>
          </div>

          {/* User Input */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="font-bold text-white mb-4 font-space">Request Development or Gifts</h3>
            <div className="flex space-x-4">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask Jesus for development help or gifts..."
                className="flex-1 p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
              />
              <button
                onClick={() => handleJesusInteraction(userInput)}
                disabled={!userInput.trim()}
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </div>

          {/* Gift Queue */}
          {giftQueue.length > 0 && (
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="font-bold text-white mb-4 font-space">Gifts Being Prepared</h3>
              <div className="space-y-3">
                {giftQueue.map((gift) => (
                  <div key={gift.id} className="flex items-center justify-between bg-white/5 p-3 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Package className="w-5 h-5 text-yellow-400" />
                      <span className="text-white">{gift.type}</span>
                      <span className="text-xs text-white/60">Preparing...</span>
                    </div>
                    <button
                      onClick={() => deliverGift(gift)}
                      className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm rounded-full hover:from-green-600 hover:to-emerald-700 transition-all"
                    >
                      Deliver
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Development Tab */}
      {activeTab === 'development' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {currentClan.developmentProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white font-space">{project.title}</h3>
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full text-white">
                  {project.type}
                </span>
              </div>

              <p className="text-white/70 text-sm mb-4">{project.description}</p>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-white/60 mb-1">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Gift Type:</span>
                  <span className="text-yellow-400">{project.giftType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Reverses:</span>
                  <span className="text-red-400">{project.reversedCurse}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Blessings:</span>
                  <span className="text-green-400">{project.blessingsRequired}</span>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  completeProject(project);
                }}
                className="w-full mt-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all"
              >
                Complete Project
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Seven Gifts Tab */}
      {activeTab === 'gifts' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 font-space">Seven-Fold Gifts to Reverse Curses</h3>
            <p className="text-white/70 mb-6">
              Each gift reverses a specific curse, bringing divine blessings and growth to your clan.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sevenFoldGifts.map((gift, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white/5 p-4 rounded-lg border border-white/10"
                >
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${gift.color} mb-3`}>
                    {gift.icon}
                  </div>
                  <h4 className="font-bold text-white mb-2">{gift.name}</h4>
                  <p className="text-sm text-white/60 mb-3">Reverses: {gift.curse}</p>
                  <button
                    onClick={() => reverseSevenFoldCurse(index)}
                    className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all text-sm"
                  >
                    Activate Gift
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Circulation Tab */}
      {activeTab === 'circulation' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 font-space">Gift Circulation Network</h3>
            <p className="text-white/70 mb-6">
              Gifts flow through the network, creating lasting grace and continuous growth for all clans.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 p-4 rounded-lg text-center">
                <Truck className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h4 className="font-bold text-white mb-2">Gifts in Transit</h4>
                <p className="text-2xl font-bold text-blue-400">47</p>
                <p className="text-sm text-white/60">Being delivered now</p>
              </div>

              <div className="bg-white/5 p-4 rounded-lg text-center">
                <Sparkles className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <h4 className="font-bold text-white mb-2">Active Blessings</h4>
                <p className="text-2xl font-bold text-yellow-400">156</p>
                <p className="text-sm text-white/60">Circulating grace</p>
              </div>

              <div className="bg-white/5 p-4 rounded-lg text-center">
                <Users className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h4 className="font-bold text-white mb-2">Connected Clans</h4>
                <p className="text-2xl font-bold text-green-400">23</p>
                <p className="text-sm text-white/60">In the network</p>
              </div>
            </div>

            <div className="mt-6 bg-white/5 p-4 rounded-lg">
              <h4 className="font-bold text-white mb-3">Circulation Flow</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Gifts Given</span>
                  <span className="text-green-400 font-bold">+{currentClan.jesusAssistant.giftsDelivered}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Blessings Shared</span>
                  <span className="text-yellow-400 font-bold">+{currentClan.jesusAssistant.blessingsGiven}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Curses Reversed</span>
                  <span className="text-blue-400 font-bold">+{currentClan.jesusAssistant.cursesReversed}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl w-full border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-2xl font-bold text-white font-space">
                  {selectedProject.title}
                </h2>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-white/70 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <p className="text-white/80 leading-relaxed mb-6">
                {selectedProject.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 p-4 rounded-lg">
                  <span className="text-white/60 text-sm">Gift Type</span>
                  <p className="font-bold text-yellow-400">{selectedProject.giftType}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <span className="text-white/60 text-sm">Reverses Curse</span>
                  <p className="font-bold text-red-400">{selectedProject.reversedCurse}</p>
                </div>
              </div>

              <button
                onClick={() => completeProject(selectedProject)}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all font-medium"
              >
                Complete Development Project
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};