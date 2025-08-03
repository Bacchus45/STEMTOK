import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  Database, 
  Users, 
  Coins, 
  Package, 
  TrendingUp,
  BarChart3,
  FileText,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  Minus,
  Edit3,
  Share2,
  Download,
  Upload,
  Target,
  Layers,
  Zap,
  Shield,
  Crown,
  Star,
  Settings,
  Activity,
  Globe,
  Building
} from 'lucide-react';

interface BOQItem {
  id: string;
  category: 'infrastructure' | 'development' | 'security' | 'marketing' | 'operations';
  item: string;
  description: string;
  unit: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  supplier: string;
  leadTime: number;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'planned' | 'ordered' | 'delivered' | 'completed';
  assignedTo: string[];
  dependencies: string[];
}

interface CoinProject {
  id: string;
  name: string;
  symbol: string;
  type: 'utility' | 'governance' | 'reward' | 'seasonal' | 'nft';
  totalBudget: number;
  spentBudget: number;
  timeline: {
    start: Date;
    end: Date;
    phases: ProjectPhase[];
  };
  participants: Participant[];
  boqItems: BOQItem[];
  status: 'planning' | 'active' | 'completed' | 'paused';
  multiplayer: {
    maxParticipants: number;
    currentParticipants: number;
    collaborationLevel: 'open' | 'invite-only' | 'private';
    votingPower: Record<string, number>;
  };
}

interface ProjectPhase {
  id: string;
  name: string;
  description: string;
  duration: number;
  cost: number;
  dependencies: string[];
  status: 'pending' | 'active' | 'completed';
  assignedTeam: string[];
}

interface Participant {
  id: string;
  name: string;
  role: 'project-manager' | 'developer' | 'designer' | 'investor' | 'advisor';
  contribution: number;
  votingPower: number;
  specialties: string[];
  status: 'active' | 'inactive';
}

interface ResourceTemplate {
  id: string;
  name: string;
  type: 'basic' | 'premium' | 'enterprise';
  description: string;
  baseItems: BOQItem[];
  estimatedCost: number;
  timeline: number;
  scalability: number;
}

interface BillOfQuantitiesRepositoryProps {
  onProjectCreated: (project: CoinProject) => void;
  onResourceAllocated: (amount: number, description: string) => void;
  onCollaborationUpdate: (participants: number, project: string) => void;
}

export const BillOfQuantitiesRepository: React.FC<BillOfQuantitiesRepositoryProps> = ({
  onProjectCreated,
  onResourceAllocated,
  onCollaborationUpdate
}) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'boq' | 'templates' | 'collaboration'>('projects');
  const [selectedProject, setSelectedProject] = useState<CoinProject | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<ResourceTemplate | null>(null);
  const [newBOQItem, setNewBOQItem] = useState<Partial<BOQItem>>({});
  const [showBOQEditor, setShowBOQEditor] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const [coinProjects, setCoinProjects] = useState<CoinProject[]>([
    {
      id: 'project-1',
      name: 'WinterCoin Infrastructure',
      symbol: 'WINTER',
      type: 'seasonal',
      totalBudget: 500000,
      spentBudget: 125000,
      timeline: {
        start: new Date('2024-12-01'),
        end: new Date('2025-03-01'),
        phases: [
          {
            id: 'phase-1',
            name: 'Smart Contract Development',
            description: 'Core blockchain implementation',
            duration: 30,
            cost: 150000,
            dependencies: [],
            status: 'completed',
            assignedTeam: ['dev-team-1', 'security-team']
          },
          {
            id: 'phase-2',
            name: 'Frontend Integration',
            description: 'User interface and wallet integration',
            duration: 20,
            cost: 100000,
            dependencies: ['phase-1'],
            status: 'active',
            assignedTeam: ['ui-team', 'frontend-devs']
          },
          {
            id: 'phase-3',
            name: 'Marketing Campaign',
            description: 'Community building and promotion',
            duration: 45,
            cost: 75000,
            dependencies: ['phase-2'],
            status: 'pending',
            assignedTeam: ['marketing-team']
          }
        ]
      },
      participants: [
        {
          id: 'user-1',
          name: 'Project Lead',
          role: 'project-manager',
          contribution: 200000,
          votingPower: 40,
          specialties: ['Strategy', 'Management'],
          status: 'active'
        },
        {
          id: 'user-2',
          name: 'Lead Developer',
          role: 'developer',
          contribution: 150000,
          votingPower: 30,
          specialties: ['Blockchain', 'Smart Contracts'],
          status: 'active'
        },
        {
          id: 'user-3',
          name: 'UI Designer',
          role: 'designer',
          contribution: 100000,
          votingPower: 20,
          specialties: ['UI/UX', 'Frontend'],
          status: 'active'
        }
      ],
      boqItems: [],
      status: 'active',
      multiplayer: {
        maxParticipants: 10,
        currentParticipants: 3,
        collaborationLevel: 'invite-only',
        votingPower: {
          'user-1': 40,
          'user-2': 30,
          'user-3': 20,
          'remaining': 10
        }
      }
    }
  ]);

  const [resourceTemplates] = useState<ResourceTemplate[]>([
    {
      id: 'basic-coin',
      name: 'Basic Coin Template',
      type: 'basic',
      description: 'Essential components for a simple cryptocurrency',
      baseItems: [
        {
          id: 'item-1',
          category: 'development',
          item: 'Smart Contract Development',
          description: 'ERC-20 compliant smart contract',
          unit: 'hours',
          quantity: 120,
          unitCost: 150,
          totalCost: 18000,
          supplier: 'Blockchain Developers Inc',
          leadTime: 14,
          priority: 'critical',
          status: 'planned',
          assignedTo: ['dev-team'],
          dependencies: []
        } as BOQItem,
        {
          id: 'item-2',
          category: 'security',
          item: 'Security Audit',
          description: 'Third-party smart contract audit',
          unit: 'audit',
          quantity: 1,
          unitCost: 25000,
          totalCost: 25000,
          supplier: 'CertiK Security',
          leadTime: 7,
          priority: 'critical',
          status: 'planned',
          assignedTo: ['security-team'],
          dependencies: ['item-1']
        } as BOQItem
      ],
      estimatedCost: 75000,
      timeline: 30,
      scalability: 3
    },
    {
      id: 'premium-coin',
      name: 'Premium Coin Template',
      type: 'premium',
      description: 'Advanced features with governance and utility',
      baseItems: [],
      estimatedCost: 250000,
      timeline: 60,
      scalability: 7
    },
    {
      id: 'enterprise-coin',
      name: 'Enterprise Coin Template',
      type: 'enterprise',
      description: 'Full-featured blockchain ecosystem',
      baseItems: [],
      estimatedCost: 1000000,
      timeline: 120,
      scalability: 10
    }
  ]);

  const boqCategories = [
    { id: 'infrastructure', name: 'Infrastructure', icon: <Building className="w-4 h-4" />, color: 'from-blue-500 to-cyan-600' },
    { id: 'development', name: 'Development', icon: <Settings className="w-4 h-4" />, color: 'from-green-500 to-emerald-600' },
    { id: 'security', name: 'Security', icon: <Shield className="w-4 h-4" />, color: 'from-red-500 to-rose-600' },
    { id: 'marketing', name: 'Marketing', icon: <Target className="w-4 h-4" />, color: 'from-purple-500 to-pink-600' },
    { id: 'operations', name: 'Operations', icon: <Activity className="w-4 h-4" />, color: 'from-yellow-500 to-orange-600' }
  ];

  useEffect(() => {
    // Initialize BOQ items for the first project
    const sampleBOQItems: BOQItem[] = [
      {
        id: 'boq-1',
        category: 'infrastructure',
        item: 'Blockchain Network Setup',
        description: 'Deploy nodes and network infrastructure',
        unit: 'nodes',
        quantity: 5,
        unitCost: 5000,
        totalCost: 25000,
        supplier: 'Cloud Infrastructure Co',
        leadTime: 3,
        priority: 'critical',
        status: 'completed',
        assignedTo: ['devops-team'],
        dependencies: []
      },
      {
        id: 'boq-2',
        category: 'development',
        item: 'Smart Contract Development',
        description: 'WinterCoin smart contract with seasonal mechanics',
        unit: 'contracts',
        quantity: 3,
        unitCost: 15000,
        totalCost: 45000,
        supplier: 'Blockchain Developers Inc',
        leadTime: 21,
        priority: 'critical',
        status: 'completed',
        assignedTo: ['dev-team-1', 'security-team'],
        dependencies: ['boq-1']
      },
      {
        id: 'boq-3',
        category: 'security',
        item: 'Penetration Testing',
        description: 'Comprehensive security testing and vulnerability assessment',
        unit: 'tests',
        quantity: 2,
        unitCost: 12000,
        totalCost: 24000,
        supplier: 'CyberSec Solutions',
        leadTime: 14,
        priority: 'high',
        status: 'ordered',
        assignedTo: ['security-team'],
        dependencies: ['boq-2']
      },
      {
        id: 'boq-4',
        category: 'marketing',
        item: 'Community Building Campaign',
        description: 'Social media marketing and influencer partnerships',
        unit: 'campaigns',
        quantity: 1,
        unitCost: 30000,
        totalCost: 30000,
        supplier: 'Digital Marketing Agency',
        leadTime: 30,
        priority: 'medium',
        status: 'planned',
        assignedTo: ['marketing-team'],
        dependencies: ['boq-3']
      },
      {
        id: 'boq-5',
        category: 'operations',
        item: 'Customer Support Setup',
        description: '24/7 customer support infrastructure and training',
        unit: 'agents',
        quantity: 6,
        unitCost: 4000,
        totalCost: 24000,
        supplier: 'Support Services Ltd',
        leadTime: 10,
        priority: 'medium',
        status: 'planned',
        assignedTo: ['operations-team'],
        dependencies: []
      }
    ];

    setCoinProjects(prev => prev.map(project => 
      project.id === 'project-1' ? { ...project, boqItems: sampleBOQItems } : project
    ));
  }, []);

  const addBOQItem = () => {
    if (!selectedProject || !newBOQItem.item) return;

    const boqItem: BOQItem = {
      id: `boq-${Date.now()}`,
      category: newBOQItem.category || 'development',
      item: newBOQItem.item,
      description: newBOQItem.description || '',
      unit: newBOQItem.unit || 'units',
      quantity: newBOQItem.quantity || 1,
      unitCost: newBOQItem.unitCost || 0,
      totalCost: (newBOQItem.quantity || 1) * (newBOQItem.unitCost || 0),
      supplier: newBOQItem.supplier || 'TBD',
      leadTime: newBOQItem.leadTime || 7,
      priority: newBOQItem.priority || 'medium',
      status: 'planned',
      assignedTo: [],
      dependencies: []
    };

    setCoinProjects(prev => prev.map(project =>
      project.id === selectedProject.id
        ? { ...project, boqItems: [...project.boqItems, boqItem] }
        : project
    ));

    onResourceAllocated(boqItem.totalCost, `Added BOQ item: ${boqItem.item}`);
    setNewBOQItem({});
    setShowBOQEditor(false);
  };

  const createProjectFromTemplate = (template: ResourceTemplate) => {
    const newProject: CoinProject = {
      id: `project-${Date.now()}`,
      name: `${template.name} Project`,
      symbol: 'NEW',
      type: 'utility',
      totalBudget: template.estimatedCost,
      spentBudget: 0,
      timeline: {
        start: new Date(),
        end: new Date(Date.now() + template.timeline * 24 * 60 * 60 * 1000),
        phases: []
      },
      participants: [],
      boqItems: template.baseItems,
      status: 'planning',
      multiplayer: {
        maxParticipants: template.scalability,
        currentParticipants: 1,
        collaborationLevel: 'open',
        votingPower: { 'creator': 100 }
      }
    };

    setCoinProjects(prev => [...prev, newProject]);
    onProjectCreated(newProject);
  };

  const getTotalCostByCategory = (project: CoinProject, category: string) => {
    return project.boqItems
      .filter(item => filterCategory === 'all' || item.category === category)
      .reduce((sum, item) => sum + item.totalCost, 0);
  };

  const getProjectProgress = (project: CoinProject) => {
    const completedItems = project.boqItems.filter(item => item.status === 'completed').length;
    return project.boqItems.length > 0 ? (completedItems / project.boqItems.length) * 100 : 0;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'active': case 'ordered': case 'delivered': return 'text-blue-400';
      case 'planned': return 'text-yellow-400';
      case 'paused': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const filteredBOQItems = selectedProject 
    ? selectedProject.boqItems.filter(item => 
        filterCategory === 'all' || item.category === filterCategory
      )
    : [];

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
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white font-space">Bill of Quantities Repository</h2>
            <p className="text-white/70">Comprehensive resource management for multiplayer coin projects</p>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-white/60 text-sm">Active Projects</p>
            <p className="text-xl font-bold text-blue-400">
              {coinProjects.filter(p => p.status === 'active').length}
            </p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-white/60 text-sm">Total Budget</p>
            <p className="text-xl font-bold text-green-400">
              ${coinProjects.reduce((sum, p) => sum + p.totalBudget, 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-white/60 text-sm">BOQ Items</p>
            <p className="text-xl font-bold text-purple-400">
              {coinProjects.reduce((sum, p) => sum + p.boqItems.length, 0)}
            </p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-white/60 text-sm">Participants</p>
            <p className="text-xl font-bold text-yellow-400">
              {coinProjects.reduce((sum, p) => sum + p.participants.length, 0)}
            </p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-white/60 text-sm">Avg Progress</p>
            <p className="text-xl font-bold text-cyan-400">
              {coinProjects.length > 0 
                ? Math.round(coinProjects.reduce((sum, p) => sum + getProjectProgress(p), 0) / coinProjects.length)
                : 0}%
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4">
          {[
            { id: 'projects', name: 'Projects', icon: <FileText className="w-4 h-4" /> },
            { id: 'boq', name: 'Bill of Quantities', icon: <Database className="w-4 h-4" /> },
            { id: 'templates', name: 'Templates', icon: <Layers className="w-4 h-4" /> },
            { id: 'collaboration', name: 'Multiplayer', icon: <Users className="w-4 h-4" /> }
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

      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {coinProjects.map((project, index) => (
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
                <h3 className="text-xl font-bold text-white font-space">{project.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(project.status)}`}>
                  {project.status.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-white/60 text-sm">Budget</p>
                  <p className="text-white font-bold">${project.totalBudget.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Spent</p>
                  <p className="text-green-400 font-bold">${project.spentBudget.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Participants</p>
                  <p className="text-purple-400 font-bold">{project.participants.length}/{project.multiplayer.maxParticipants}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">BOQ Items</p>
                  <p className="text-blue-400 font-bold">{project.boqItems.length}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-white/60 mb-1">
                  <span>Progress</span>
                  <span>{getProjectProgress(project).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${getProjectProgress(project)}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${
                    project.type === 'seasonal' ? 'from-blue-500 to-cyan-600' :
                    project.type === 'utility' ? 'from-green-500 to-emerald-600' :
                    project.type === 'governance' ? 'from-purple-500 to-pink-600' :
                    'from-yellow-500 to-orange-600'
                  } flex items-center justify-center text-white font-bold text-sm`}>
                    {project.symbol.charAt(0)}
                  </div>
                  <span className="text-white/70 text-sm capitalize">{project.type}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-white/60" />
                  <span className="text-white/70 text-sm">{project.multiplayer.collaborationLevel}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* BOQ Tab */}
      {activeTab === 'boq' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Project Selector */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white font-space">Project BOQ Management</h3>
              <div className="flex space-x-2">
                <select
                  value={selectedProject?.id || ''}
                  onChange={(e) => setSelectedProject(coinProjects.find(p => p.id === e.target.value) || null)}
                  className="bg-white/10 border border-white/20 rounded-lg text-white p-2"
                >
                  <option value="">Select Project</option>
                  {coinProjects.map(project => (
                    <option key={project.id} value={project.id}>{project.name}</option>
                  ))}
                </select>
                {selectedProject && (
                  <button
                    onClick={() => setShowBOQEditor(true)}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all"
                  >
                    Add Item
                  </button>
                )}
              </div>
            </div>

            {selectedProject && (
              <>
                {/* Category Filter */}
                <div className="flex space-x-2 mb-4">
                  <button
                    onClick={() => setFilterCategory('all')}
                    className={`px-3 py-1 rounded-lg text-sm transition-all ${
                      filterCategory === 'all' ? 'bg-white/20 text-white' : 'bg-white/10 text-white/70'
                    }`}
                  >
                    All
                  </button>
                  {boqCategories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setFilterCategory(category.id)}
                      className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm transition-all ${
                        filterCategory === category.id ? 'bg-white/20 text-white' : 'bg-white/10 text-white/70'
                      }`}
                    >
                      {category.icon}
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>

                {/* BOQ Items List */}
                <div className="space-y-3">
                  {filteredBOQItems.map((item) => (
                    <div key={item.id} className="bg-white/5 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${
                            boqCategories.find(c => c.id === item.category)?.color || 'from-gray-500 to-gray-600'
                          }`}>
                            {boqCategories.find(c => c.id === item.category)?.icon}
                          </div>
                          <div>
                            <h4 className="font-bold text-white">{item.item}</h4>
                            <p className="text-white/70 text-sm">{item.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-400">${item.totalCost.toLocaleString()}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-sm">
                        <div>
                          <span className="text-white/60">Quantity:</span>
                          <p className="text-white">{item.quantity} {item.unit}</p>
                        </div>
                        <div>
                          <span className="text-white/60">Unit Cost:</span>
                          <p className="text-white">${item.unitCost.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-white/60">Supplier:</span>
                          <p className="text-white">{item.supplier}</p>
                        </div>
                        <div>
                          <span className="text-white/60">Lead Time:</span>
                          <p className="text-white">{item.leadTime} days</p>
                        </div>
                        <div>
                          <span className="text-white/60">Priority:</span>
                          <p className={getPriorityColor(item.priority)}>{item.priority}</p>
                        </div>
                        <div>
                          <span className="text-white/60">Assigned:</span>
                          <p className="text-blue-400">{item.assignedTo.length} teams</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Budget Summary */}
                <div className="mt-6 bg-white/5 p-4 rounded-lg">
                  <h4 className="font-bold text-white mb-3">Budget Breakdown</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {boqCategories.map(category => (
                      <div key={category.id} className="text-center">
                        <p className="text-white/60 text-sm">{category.name}</p>
                        <p className="text-white font-bold">
                          ${getTotalCostByCategory(selectedProject, category.id).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {resourceTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
            >
              <div className={`p-3 rounded-lg mb-4 bg-gradient-to-r ${
                template.type === 'basic' ? 'from-green-500 to-emerald-600' :
                template.type === 'premium' ? 'from-blue-500 to-cyan-600' :
                'from-purple-500 to-pink-600'
              }`}>
                <Crown className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-lg font-bold text-white mb-2 font-space">{template.name}</h3>
              <p className="text-white/70 text-sm mb-4">{template.description}</p>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-white/60">Estimated Cost:</span>
                  <span className="text-green-400 font-bold">${template.estimatedCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Timeline:</span>
                  <span className="text-white">{template.timeline} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Max Participants:</span>
                  <span className="text-purple-400">{template.scalability}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Base Items:</span>
                  <span className="text-blue-400">{template.baseItems.length}</span>
                </div>
              </div>

              <button
                onClick={() => createProjectFromTemplate(template)}
                className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all font-medium"
              >
                Create Project
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Collaboration Tab */}
      {activeTab === 'collaboration' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {coinProjects.map((project) => (
            <div key={project.id} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white font-space">{project.name}</h3>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-purple-400" />
                  <span className="text-white">{project.participants.length}/{project.multiplayer.maxParticipants}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Participants */}
                <div>
                  <h4 className="font-bold text-white mb-3">Team Members</h4>
                  <div className="space-y-2">
                    {project.participants.map((participant) => (
                      <div key={participant.id} className="flex items-center justify-between bg-white/5 p-3 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                            participant.role === 'project-manager' ? 'bg-purple-500' :
                            participant.role === 'developer' ? 'bg-blue-500' :
                            participant.role === 'designer' ? 'bg-green-500' :
                            participant.role === 'investor' ? 'bg-yellow-500' :
                            'bg-gray-500'
                          }`}>
                            {participant.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-white font-medium text-sm">{participant.name}</p>
                            <p className="text-white/60 text-xs capitalize">{participant.role.replace('-', ' ')}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-yellow-400 font-bold text-sm">{participant.votingPower}%</p>
                          <p className="text-white/60 text-xs">${participant.contribution.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project Overview */}
                <div>
                  <h4 className="font-bold text-white mb-3">Collaboration Settings</h4>
                  <div className="space-y-3">
                    <div className="bg-white/5 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Collaboration Level:</span>
                        <span className="text-blue-400 capitalize">{project.multiplayer.collaborationLevel}</span>
                      </div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Total Investment:</span>
                        <span className="text-green-400 font-bold">
                          ${project.participants.reduce((sum, p) => sum + p.contribution, 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Available Slots:</span>
                        <span className="text-purple-400 font-bold">
                          {project.multiplayer.maxParticipants - project.participants.length}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onCollaborationUpdate(project.participants.length + 1, project.name)}
                    className="w-full mt-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all"
                  >
                    Invite Collaborator
                  </button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* BOQ Item Editor Modal */}
      <AnimatePresence>
        {showBOQEditor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowBOQEditor(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl w-full border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-white mb-6 font-space">Add BOQ Item</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-white/70 text-sm mb-2">Item Name</label>
                  <input
                    type="text"
                    value={newBOQItem.item || ''}
                    onChange={(e) => setNewBOQItem(prev => ({ ...prev, item: e.target.value }))}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
                    placeholder="e.g., Smart Contract Development"
                  />
                </div>
                
                <div>
                  <label className="block text-white/70 text-sm mb-2">Category</label>
                  <select
                    value={newBOQItem.category || 'development'}
                    onChange={(e) => setNewBOQItem(prev => ({ ...prev, category: e.target.value as any }))}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                  >
                    {boqCategories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">Quantity</label>
                  <input
                    type="number"
                    value={newBOQItem.quantity || ''}
                    onChange={(e) => setNewBOQItem(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
                    placeholder="1"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">Unit</label>
                  <input
                    type="text"
                    value={newBOQItem.unit || ''}
                    onChange={(e) => setNewBOQItem(prev => ({ ...prev, unit: e.target.value }))}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
                    placeholder="hours, contracts, licenses"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">Unit Cost ($)</label>
                  <input
                    type="number"
                    value={newBOQItem.unitCost || ''}
                    onChange={(e) => setNewBOQItem(prev => ({ ...prev, unitCost: parseFloat(e.target.value) }))}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
                    placeholder="1000"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">Priority</label>
                  <select
                    value={newBOQItem.priority || 'medium'}
                    onChange={(e) => setNewBOQItem(prev => ({ ...prev, priority: e.target.value as any }))}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                  >
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-white/70 text-sm mb-2">Description</label>
                <textarea
                  value={newBOQItem.description || ''}
                  onChange={(e) => setNewBOQItem(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 resize-none h-20"
                  placeholder="Detailed description of the item..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-white/70 text-sm mb-2">Supplier</label>
                  <input
                    type="text"
                    value={newBOQItem.supplier || ''}
                    onChange={(e) => setNewBOQItem(prev => ({ ...prev, supplier: e.target.value }))}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
                    placeholder="Supplier name"
                  />
                </div>
                
                <div>
                  <label className="block text-white/70 text-sm mb-2">Lead Time (days)</label>
                  <input
                    type="number"
                    value={newBOQItem.leadTime || ''}
                    onChange={(e) => setNewBOQItem(prev => ({ ...prev, leadTime: parseInt(e.target.value) }))}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
                    placeholder="7"
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setShowBOQEditor(false)}
                  className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={addBOQItem}
                  disabled={!newBOQItem.item || !newBOQItem.quantity || !newBOQItem.unitCost}
                  className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50"
                >
                  Add Item
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};