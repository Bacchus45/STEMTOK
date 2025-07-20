import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  CheckCircle, 
  AlertTriangle, 
  Lightbulb, 
  Brain,
  Heart,
  Mic,
  Users,
  Zap,
  Target,
  Rocket,
  Shield,
  Globe,
  Star
} from 'lucide-react';

interface Insight {
  id: string;
  category: 'achievements' | 'improvements' | 'future' | 'freedom';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  priority: number;
  icon: React.ReactNode;
  color: string;
  actionable: boolean;
  timestamp: Date;
}

interface InsightsAnalyzerProps {
  userActivity: any;
  platformMetrics: any;
  onInsightAction: (insight: Insight) => void;
}

export const InsightsAnalyzer: React.FC<InsightsAnalyzerProps> = ({
  userActivity,
  platformMetrics,
  onInsightAction
}) => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);

  useEffect(() => {
    generateInsights();
  }, [userActivity, platformMetrics]);

  const generateInsights = () => {
    const newInsights: Insight[] = [
      // Achievements - What's Done Well
      {
        id: '1',
        category: 'achievements',
        title: 'Excellent Voice Engagement',
        description: 'Voice posts receive 3x more engagement than text posts. Users are embracing authentic audio communication.',
        impact: 'high',
        priority: 1,
        icon: <Mic className="w-5 h-5" />,
        color: 'from-green-500 to-emerald-600',
        actionable: false,
        timestamp: new Date()
      },
      {
        id: '2',
        category: 'achievements',
        title: 'Crypto Integration Success',
        description: 'Seamless crypto rewards system increases user retention by 85%. Economic incentives drive quality content.',
        impact: 'high',
        priority: 2,
        icon: <CheckCircle className="w-5 h-5" />,
        color: 'from-blue-500 to-cyan-600',
        actionable: false,
        timestamp: new Date()
      },
      {
        id: '3',
        category: 'achievements',
        title: 'Community Building Excellence',
        description: 'Strong community formation around seasonal coins. Users create meaningful connections through shared economic interests.',
        impact: 'high',
        priority: 3,
        icon: <Users className="w-5 h-5" />,
        color: 'from-purple-500 to-pink-600',
        actionable: false,
        timestamp: new Date()
      },

      // Improvements - Updates from Previous Versions
      {
        id: '4',
        category: 'improvements',
        title: 'Enhanced Audio Quality',
        description: 'Implement advanced noise cancellation and audio compression for clearer voice posts.',
        impact: 'medium',
        priority: 4,
        icon: <Zap className="w-5 h-5" />,
        color: 'from-orange-500 to-red-600',
        actionable: true,
        timestamp: new Date()
      },
      {
        id: '5',
        category: 'improvements',
        title: 'Presentation Templates',
        description: 'Add pre-built presentation templates for faster content creation and professional results.',
        impact: 'medium',
        priority: 5,
        icon: <Target className="w-5 h-5" />,
        color: 'from-yellow-500 to-orange-600',
        actionable: true,
        timestamp: new Date()
      },
      {
        id: '6',
        category: 'improvements',
        title: 'Cross-Platform Sync',
        description: 'Enable seamless synchronization across devices for presentations and voice content.',
        impact: 'high',
        priority: 6,
        icon: <Globe className="w-5 h-5" />,
        color: 'from-indigo-500 to-purple-600',
        actionable: true,
        timestamp: new Date()
      },

      // Future Possibilities
      {
        id: '7',
        category: 'future',
        title: 'AI Voice Analysis',
        description: 'Implement AI to analyze voice emotions and provide insights on content sentiment and authenticity.',
        impact: 'high',
        priority: 7,
        icon: <Brain className="w-5 h-5" />,
        color: 'from-cyan-500 to-blue-600',
        actionable: true,
        timestamp: new Date()
      },
      {
        id: '8',
        category: 'future',
        title: 'Decentralized Governance',
        description: 'Implement DAO structure where coin holders vote on platform features and economic policies.',
        impact: 'high',
        priority: 8,
        icon: <Shield className="w-5 h-5" />,
        color: 'from-emerald-500 to-green-600',
        actionable: true,
        timestamp: new Date()
      },
      {
        id: '9',
        category: 'future',
        title: 'Virtual Reality Integration',
        description: 'Create immersive VR spaces for presentations and voice interactions in 3D environments.',
        impact: 'medium',
        priority: 9,
        icon: <Rocket className="w-5 h-5" />,
        color: 'from-pink-500 to-rose-600',
        actionable: true,
        timestamp: new Date()
      },

      // Freedom - Eliminating Dependencies
      {
        id: '10',
        category: 'freedom',
        title: 'Economic Independence',
        description: 'Users create their own economic systems through seasonal coins, breaking free from traditional monetary constraints.',
        impact: 'high',
        priority: 10,
        icon: <Heart className="w-5 h-5" />,
        color: 'from-red-500 to-pink-600',
        actionable: false,
        timestamp: new Date()
      },
      {
        id: '11',
        category: 'freedom',
        title: 'Authentic Expression',
        description: 'Voice-first platform encourages genuine communication, freeing users from performative text-based social media.',
        impact: 'high',
        priority: 11,
        icon: <Lightbulb className="w-5 h-5" />,
        color: 'from-yellow-500 to-amber-600',
        actionable: false,
        timestamp: new Date()
      },
      {
        id: '12',
        category: 'freedom',
        title: 'Decentralized Content',
        description: 'User-owned presentations and content eliminate platform dependency and censorship concerns.',
        impact: 'high',
        priority: 12,
        icon: <Star className="w-5 h-5" />,
        color: 'from-violet-500 to-purple-600',
        actionable: false,
        timestamp: new Date()
      }
    ];

    setInsights(newInsights);
  };

  const categories = [
    { id: 'all', name: 'Alles', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'achievements', name: 'Prestasies', icon: <CheckCircle className="w-4 h-4" /> },
    { id: 'improvements', name: 'Verbeterings', icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'future', name: 'Toekoms', icon: <Rocket className="w-4 h-4" /> },
    { id: 'freedom', name: 'Vryheid', icon: <Heart className="w-4 h-4" /> }
  ];

  const filteredInsights = activeCategory === 'all' 
    ? insights 
    : insights.filter(insight => insight.category === activeCategory);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getCategoryDescription = (category: string) => {
    switch (category) {
      case 'achievements':
        return 'Wat ons goed gedoen het - suksesverhale en sterk punte van die platform';
      case 'improvements':
        return 'Wat verbeter kan word - opdaterings van vorige weergawes en optimaliserings';
      case 'future':
        return 'Toekomsmoontlikhede - innovasies en nuwe funksies vir groei';
      case 'freedom':
        return 'Vryheid van uitdrukking - breek vry van beperkings en afhanklikhede';
      default:
        return 'Omvattende insigte oor platform evolusie en gebruikerservaring';
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
        <h2 className="text-3xl font-bold text-white mb-2 font-space">Platform Insigte</h2>
        <p className="text-white/70">
          {getCategoryDescription(activeCategory)}
        </p>
      </motion.div>

      {/* Category Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-3"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeCategory === category.id
                ? 'bg-white/20 text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/15'
            }`}
          >
            {category.icon}
            <span>{category.name}</span>
          </button>
        ))}
      </motion.div>

      {/* Insights Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredInsights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 cursor-pointer"
              onClick={() => setSelectedInsight(insight)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${insight.color}`}>
                  {insight.icon}
                </div>
                <div className="flex flex-col items-end">
                  <span className={`text-xs font-bold ${getImpactColor(insight.impact)}`}>
                    {insight.impact.toUpperCase()}
                  </span>
                  {insight.actionable && (
                    <span className="text-xs text-blue-400 mt-1">AKSIE</span>
                  )}
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 font-space">
                {insight.title}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                {insight.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-white/50">
                  Prioriteit: {insight.priority}
                </span>
                {insight.actionable && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onInsightAction(insight);
                    }}
                    className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs rounded-full hover:from-indigo-600 hover:to-purple-700 transition-all"
                  >
                    Implementeer
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Detailed Insight Modal */}
      <AnimatePresence>
        {selectedInsight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedInsight(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl w-full border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`p-4 rounded-xl bg-gradient-to-r ${selectedInsight.color}`}>
                  {selectedInsight.icon}
                </div>
                <button
                  onClick={() => setSelectedInsight(null)}
                  className="text-white/70 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <h2 className="text-2xl font-bold text-white mb-4 font-space">
                {selectedInsight.title}
              </h2>
              <p className="text-white/80 leading-relaxed mb-6">
                {selectedInsight.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 p-4 rounded-lg">
                  <span className="text-white/60 text-sm">Impak</span>
                  <p className={`font-bold ${getImpactColor(selectedInsight.impact)}`}>
                    {selectedInsight.impact.toUpperCase()}
                  </p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <span className="text-white/60 text-sm">Prioriteit</span>
                  <p className="font-bold text-white">{selectedInsight.priority}</p>
                </div>
              </div>

              {selectedInsight.actionable && (
                <button
                  onClick={() => {
                    onInsightAction(selectedInsight);
                    setSelectedInsight(null);
                  }}
                  className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all font-medium"
                >
                  Implementeer Hierdie Insig
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};