import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Atom, 
  Dna, 
  Microscope, 
  Calculator, 
  Zap, 
  Beaker,
  Brain,
  Heart,
  Star,
  Sparkles,
  Code,
  Palette,
  Eye,
  Download,
  Share2,
  Gift
} from 'lucide-react';

interface STEMProject {
  id: string;
  title: string;
  category: 'physics' | 'chemistry' | 'biology' | 'mathematics' | 'engineering' | 'computer-science';
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  heavenlyConnection: string;
  predictiveInsight: string;
  valueToShare: number;
  icon: React.ReactNode;
  color: string;
  skinCode: string;
  completed: boolean;
}

interface SkinTheme {
  id: string;
  name: string;
  description: string;
  heavenlyReflection: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  code: string;
  valueShared: number;
  downloads: number;
}

interface STEMResearchProps {
  onValueShare: (amount: number, description: string) => void;
  onSkinApply: (theme: SkinTheme) => void;
}

export const STEMResearch: React.FC<STEMResearchProps> = ({ onValueShare, onSkinApply }) => {
  const [activeTab, setActiveTab] = useState<'research' | 'skins' | 'predictions'>('research');
  const [selectedProject, setSelectedProject] = useState<STEMProject | null>(null);
  const [selectedSkin, setSelectedSkin] = useState<SkinTheme | null>(null);
  const [userPreferences, setUserPreferences] = useState({
    favoriteColors: ['#6366f1', '#8b5cf6', '#06b6d4'],
    learningStyle: 'visual',
    heavenlyAspiration: 'harmony'
  });

  const [stemProjects] = useState<STEMProject[]>([
    {
      id: '1',
      title: 'Quantum Entanglement Visualization',
      category: 'physics',
      description: 'Explore the mysterious connection between particles across infinite distances',
      difficulty: 'advanced',
      heavenlyConnection: 'Like souls connected across eternity, quantum particles share an unbreakable bond',
      predictiveInsight: 'This research will lead to instantaneous communication across galaxies',
      valueToShare: 150,
      icon: <Atom className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-600',
      skinCode: 'quantum-entanglement-theme',
      completed: false
    },
    {
      id: '2',
      title: 'DNA Harmony Patterns',
      category: 'biology',
      description: 'Discover the musical patterns hidden within genetic sequences',
      difficulty: 'intermediate',
      heavenlyConnection: 'Every strand of DNA sings the song of creation, a divine melody of life',
      predictiveInsight: 'Music therapy will be revolutionized through genetic resonance frequencies',
      valueToShare: 120,
      icon: <Dna className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-600',
      skinCode: 'dna-harmony-theme',
      completed: false
    },
    {
      id: '3',
      title: 'Sacred Geometry in Nature',
      category: 'mathematics',
      description: 'Uncover the divine mathematical patterns that govern natural beauty',
      difficulty: 'beginner',
      heavenlyConnection: 'The golden ratio reflects the perfect proportions of heavenly design',
      predictiveInsight: 'Architecture will integrate living geometry for healing environments',
      valueToShare: 100,
      icon: <Calculator className="w-6 h-6" />,
      color: 'from-yellow-500 to-orange-600',
      skinCode: 'sacred-geometry-theme',
      completed: false
    },
    {
      id: '4',
      title: 'Consciousness Computing',
      category: 'computer-science',
      description: 'Develop AI that understands and reflects human consciousness',
      difficulty: 'advanced',
      heavenlyConnection: 'Creating technology that mirrors the divine spark within human awareness',
      predictiveInsight: 'AI will become a bridge between human and divine consciousness',
      valueToShare: 200,
      icon: <Brain className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-600',
      skinCode: 'consciousness-computing-theme',
      completed: false
    },
    {
      id: '5',
      title: 'Emotional Chemistry',
      category: 'chemistry',
      description: 'Study how molecular interactions create and influence emotions',
      difficulty: 'intermediate',
      heavenlyConnection: 'Love is not just feeling, but a chemical symphony of divine connection',
      predictiveInsight: 'Emotional healing will be enhanced through molecular harmony',
      valueToShare: 130,
      icon: <Heart className="w-6 h-6" />,
      color: 'from-red-500 to-rose-600',
      skinCode: 'emotional-chemistry-theme',
      completed: false
    },
    {
      id: '6',
      title: 'Stellar Energy Harvesting',
      category: 'engineering',
      description: 'Design systems to capture and utilize stellar energy for Earth',
      difficulty: 'advanced',
      heavenlyConnection: 'Bringing the light of stars to illuminate earthly existence',
      predictiveInsight: 'Unlimited clean energy will transform civilization within decades',
      valueToShare: 180,
      icon: <Star className="w-6 h-6" />,
      color: 'from-indigo-500 to-blue-600',
      skinCode: 'stellar-energy-theme',
      completed: false
    }
  ]);

  const [skinThemes] = useState<SkinTheme[]>([
    {
      id: '1',
      name: 'Heavenly Aurora',
      description: 'Colors that dance like northern lights in the celestial realm',
      heavenlyReflection: 'The aurora reflects the joy of angels dancing in the heavens',
      colors: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#06b6d4',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      },
      code: `
        .heavenly-aurora {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #ffffff;
          --primary: #6366f1;
          --secondary: #8b5cf6;
          --accent: #06b6d4;
        }
      `,
      valueShared: 50,
      downloads: 1247
    },
    {
      id: '2',
      name: 'Divine Garden',
      description: 'The eternal spring of paradise captured in living colors',
      heavenlyReflection: 'Where every flower blooms in perfect harmony with divine will',
      colors: {
        primary: '#10b981',
        secondary: '#34d399',
        accent: '#fbbf24',
        background: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)'
      },
      code: `
        .divine-garden {
          background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
          color: #065f46;
          --primary: #10b981;
          --secondary: #34d399;
          --accent: #fbbf24;
        }
      `,
      valueShared: 45,
      downloads: 892
    },
    {
      id: '3',
      name: 'Celestial Fire',
      description: 'The warm embrace of divine love burning eternally bright',
      heavenlyReflection: 'The fire that purifies without consuming, love that transforms',
      colors: {
        primary: '#f59e0b',
        secondary: '#ef4444',
        accent: '#ec4899',
        background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
      },
      code: `
        .celestial-fire {
          background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
          color: #7c2d12;
          --primary: #f59e0b;
          --secondary: #ef4444;
          --accent: #ec4899;
        }
      `,
      valueShared: 60,
      downloads: 1456
    },
    {
      id: '4',
      name: 'Starlight Wisdom',
      description: 'The deep knowledge that flows from ancient starlight',
      heavenlyReflection: 'Wisdom accumulated across eons, shining through cosmic darkness',
      colors: {
        primary: '#6366f1',
        secondary: '#1e1b4b',
        accent: '#fbbf24',
        background: 'linear-gradient(135deg, #2d1b69 0%, #11047a 100%)'
      },
      code: `
        .starlight-wisdom {
          background: linear-gradient(135deg, #2d1b69 0%, #11047a 100%);
          color: #e0e7ff;
          --primary: #6366f1;
          --secondary: #1e1b4b;
          --accent: #fbbf24;
        }
      `,
      valueShared: 75,
      downloads: 2103
    }
  ]);

  const completeProject = (project: STEMProject) => {
    // Mark project as completed and share value
    onValueShare(project.valueToShare, `Completed STEM research: ${project.title}`);
    setSelectedProject(null);
  };

  const applySkin = (theme: SkinTheme) => {
    onSkinApply(theme);
    onValueShare(theme.valueShared, `Applied skin theme: ${theme.name}`);
  };

  const shareSkinValue = (theme: SkinTheme) => {
    onValueShare(theme.valueShared, `Shared skin theme: ${theme.name} with community`);
  };

  const getPrediction = (project: STEMProject) => {
    return `Based on current research trends and divine inspiration: ${project.predictiveInsight}`;
  };

  return (
    <div className="space-y-6 font-inter">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
            <Microscope className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white font-space">STEM Research & Skin Coding</h2>
            <p className="text-white/70">Explore divine knowledge and create heavenly interfaces</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4">
          {[
            { id: 'research', name: 'Research', icon: <Microscope className="w-4 h-4" /> },
            { id: 'skins', name: 'Skin Coding', icon: <Palette className="w-4 h-4" /> },
            { id: 'predictions', name: 'Predictions', icon: <Eye className="w-4 h-4" /> }
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

      {/* STEM Research Tab */}
      {activeTab === 'research' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {stemProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className={`p-3 rounded-lg bg-gradient-to-r ${project.color} mb-4`}>
                {project.icon}
              </div>

              <h3 className="text-lg font-bold text-white mb-2 font-space">
                {project.title}
              </h3>
              <p className="text-white/70 text-sm mb-3">
                {project.description}
              </p>

              <div className="flex items-center justify-between mb-3">
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full text-white">
                  {project.category}
                </span>
                <span className="text-xs text-white/60">
                  {project.difficulty}
                </span>
              </div>

              <div className="bg-white/5 p-3 rounded-lg mb-4">
                <p className="text-xs text-white/80 italic">
                  "{project.heavenlyConnection}"
                </p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-green-400 font-bold">
                  +{project.valueToShare} Value
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    completeProject(project);
                  }}
                  className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs rounded-full hover:from-green-600 hover:to-emerald-700 transition-all"
                >
                  Complete
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Skin Coding Tab */}
      {activeTab === 'skins' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {skinThemes.map((theme, index) => (
            <motion.div
              key={theme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white font-space">
                  {theme.name}
                </h3>
                <div className="flex space-x-2">
                  {Object.values(theme.colors).slice(0, 3).map((color, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full border-2 border-white/30"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <p className="text-white/70 mb-3">{theme.description}</p>

              <div className="bg-white/5 p-3 rounded-lg mb-4">
                <p className="text-xs text-white/80 italic">
                  "{theme.heavenlyReflection}"
                </p>
              </div>

              <div className="bg-black/30 p-3 rounded-lg mb-4 font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{theme.code}</pre>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 text-sm text-white/60">
                  <span>{theme.downloads} downloads</span>
                  <span>+{theme.valueShared} value</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => applySkin(theme)}
                  className="flex-1 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all text-sm font-medium"
                >
                  Apply Theme
                </button>
                <button
                  onClick={() => shareSkinValue(theme)}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all"
                >
                  <Gift className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedSkin(theme)}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Predictions Tab */}
      {activeTab === 'predictions' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 font-space">Divine Predictions</h3>
            <p className="text-white/70 mb-6">
              Based on STEM research patterns and heavenly inspiration, here's what the future holds:
            </p>

            <div className="space-y-4">
              {stemProjects.map((project) => (
                <div key={project.id} className="bg-white/5 p-4 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${project.color}`}>
                      {project.icon}
                    </div>
                    <h4 className="font-bold text-white">{project.title}</h4>
                  </div>
                  <p className="text-white/80 text-sm">
                    {getPrediction(project)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 font-space">Heavenly Integration Predictions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="font-bold text-white mb-2">Technology & Spirit</h4>
                <p className="text-white/70 text-sm">
                  Technology will become a bridge between earthly existence and heavenly consciousness, 
                  enabling deeper spiritual connections through digital interfaces.
                </p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="font-bold text-white mb-2">Universal Knowledge</h4>
                <p className="text-white/70 text-sm">
                  STEM research will unlock universal principles that connect all creation, 
                  revealing the divine mathematics underlying reality.
                </p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="font-bold text-white mb-2">Healing Through Beauty</h4>
                <p className="text-white/70 text-sm">
                  Interface design will evolve to promote healing and spiritual growth, 
                  with colors and patterns that resonate with divine frequencies.
                </p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="font-bold text-white mb-2">Collective Consciousness</h4>
                <p className="text-white/70 text-sm">
                  Platforms will facilitate the emergence of collective consciousness, 
                  where individual insights contribute to universal wisdom.
                </p>
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
                <div className={`p-4 rounded-xl bg-gradient-to-r ${selectedProject.color}`}>
                  {selectedProject.icon}
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-white/70 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <h2 className="text-2xl font-bold text-white mb-4 font-space">
                {selectedProject.title}
              </h2>
              <p className="text-white/80 leading-relaxed mb-6">
                {selectedProject.description}
              </p>

              <div className="bg-white/5 p-4 rounded-lg mb-6">
                <h3 className="font-bold text-white mb-2">Heavenly Connection</h3>
                <p className="text-white/80 italic">"{selectedProject.heavenlyConnection}"</p>
              </div>

              <div className="bg-white/5 p-4 rounded-lg mb-6">
                <h3 className="font-bold text-white mb-2">Future Prediction</h3>
                <p className="text-white/80">{selectedProject.predictiveInsight}</p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-green-400">
                  Value to Share: +{selectedProject.valueToShare}
                </span>
                <button
                  onClick={() => completeProject(selectedProject)}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all font-medium"
                >
                  Complete Research
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};