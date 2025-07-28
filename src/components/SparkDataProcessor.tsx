import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, 
  Zap, 
  Activity, 
  Server, 
  Cpu, 
  HardDrive,
  Network,
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Play,
  Pause,
  Square,
  RefreshCw,
  Layers,
  GitBranch,
  Monitor
} from 'lucide-react';

interface SparkJob {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'failed' | 'pending';
  progress: number;
  executors: number;
  tasks: {
    total: number;
    completed: number;
    failed: number;
  };
  duration: number;
  inputData: string;
  outputData: string;
  startTime: Date;
}

interface SparkCluster {
  id: string;
  name: string;
  master: string;
  workers: number;
  cores: number;
  memory: string;
  status: 'active' | 'inactive' | 'error';
  uptime: string;
  applications: number;
}

interface StreamingJob {
  id: string;
  name: string;
  batchInterval: number;
  processedRecords: number;
  avgProcessingTime: number;
  status: 'streaming' | 'stopped' | 'error';
  throughput: number[];
}

interface SparkDataProcessorProps {
  onJobComplete: (job: SparkJob) => void;
  onDataStream: (data: any) => void;
}

export const SparkDataProcessor: React.FC<SparkDataProcessorProps> = ({
  onJobComplete,
  onDataStream
}) => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'cluster' | 'streaming' | 'sql'>('jobs');
  const [sparkJobs, setSparkJobs] = useState<SparkJob[]>([]);
  const [clusters, setClusters] = useState<SparkCluster[]>([]);
  const [streamingJobs, setStreamingJobs] = useState<StreamingJob[]>([]);
  const [selectedJob, setSelectedJob] = useState<SparkJob | null>(null);

  useEffect(() => {
    // Initialize mock Spark data
    const mockJobs: SparkJob[] = [
      {
        id: 'job-001',
        name: 'User Engagement Analysis',
        status: 'running',
        progress: 65,
        executors: 8,
        tasks: { total: 200, completed: 130, failed: 0 },
        duration: 245000,
        inputData: '2.5 GB',
        outputData: '450 MB',
        startTime: new Date(Date.now() - 245000)
      },
      {
        id: 'job-002',
        name: 'Cryptocurrency Price Prediction',
        status: 'completed',
        progress: 100,
        executors: 12,
        tasks: { total: 500, completed: 500, failed: 0 },
        duration: 180000,
        inputData: '5.2 GB',
        outputData: '1.1 GB',
        startTime: new Date(Date.now() - 300000)
      },
      {
        id: 'job-003',
        name: 'Voice Pattern Recognition',
        status: 'running',
        progress: 25,
        executors: 6,
        tasks: { total: 150, completed: 38, failed: 2 },
        duration: 120000,
        inputData: '3.8 GB',
        outputData: '200 MB',
        startTime: new Date(Date.now() - 120000)
      }
    ];

    const mockClusters: SparkCluster[] = [
      {
        id: 'cluster-001',
        name: 'Production Cluster',
        master: 'spark://master-1:7077',
        workers: 8,
        cores: 64,
        memory: '512 GB',
        status: 'active',
        uptime: '15d 4h 23m',
        applications: 12
      },
      {
        id: 'cluster-002',
        name: 'Analytics Cluster',
        master: 'spark://master-2:7077',
        workers: 4,
        cores: 32,
        memory: '256 GB',
        status: 'active',
        uptime: '8d 12h 15m',
        applications: 6
      }
    ];

    const mockStreaming: StreamingJob[] = [
      {
        id: 'stream-001',
        name: 'Real-time Voice Analytics',
        batchInterval: 5000,
        processedRecords: 125000,
        avgProcessingTime: 2300,
        status: 'streaming',
        throughput: [450, 520, 380, 610, 480, 590, 520]
      },
      {
        id: 'stream-002',
        name: 'Crypto Price Stream',
        batchInterval: 1000,
        processedRecords: 89000,
        avgProcessingTime: 800,
        status: 'streaming',
        throughput: [1200, 1180, 1250, 1100, 1300, 1150, 1220]
      }
    ];

    setSparkJobs(mockJobs);
    setClusters(mockClusters);
    setStreamingJobs(mockStreaming);

    // Simulate job progress updates
    const interval = setInterval(() => {
      setSparkJobs(prev => prev.map(job => {
        if (job.status === 'running' && job.progress < 100) {
          const newProgress = Math.min(job.progress + Math.random() * 5, 100);
          const updatedJob = {
            ...job,
            progress: newProgress,
            tasks: {
              ...job.tasks,
              completed: Math.floor((newProgress / 100) * job.tasks.total)
            }
          };
          
          if (newProgress >= 100) {
            updatedJob.status = 'completed';
            onJobComplete(updatedJob);
          }
          
          return updatedJob;
        }
        return job;
      }));

      // Update streaming throughput
      setStreamingJobs(prev => prev.map(stream => ({
        ...stream,
        throughput: [...stream.throughput.slice(1), Math.floor(Math.random() * 500) + 800],
        processedRecords: stream.processedRecords + Math.floor(Math.random() * 100) + 50
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, [onJobComplete]);

  const startNewJob = () => {
    const newJob: SparkJob = {
      id: `job-${Date.now()}`,
      name: 'Social Network Analysis',
      status: 'running',
      progress: 0,
      executors: 10,
      tasks: { total: 300, completed: 0, failed: 0 },
      duration: 0,
      inputData: '4.2 GB',
      outputData: '0 MB',
      startTime: new Date()
    };
    
    setSparkJobs(prev => [newJob, ...prev]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': case 'streaming': return 'text-blue-400';
      case 'completed': return 'text-green-400';
      case 'failed': case 'error': return 'text-red-400';
      case 'pending': case 'stopped': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': case 'streaming': return <Activity className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'failed': case 'error': return <AlertTriangle className="w-4 h-4" />;
      case 'pending': case 'stopped': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
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
          <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white font-space">Apache Spark Analytics</h2>
            <p className="text-white/70">Distributed computing for big data processing</p>
          </div>
        </div>

        {/* Cluster Status */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-white/60 text-sm">Active Jobs</p>
            <p className="text-xl font-bold text-blue-400">
              {sparkJobs.filter(j => j.status === 'running').length}
            </p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-white/60 text-sm">Total Executors</p>
            <p className="text-xl font-bold text-green-400">
              {clusters.reduce((sum, c) => sum + c.cores, 0)}
            </p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-white/60 text-sm">Memory Usage</p>
            <p className="text-xl font-bold text-purple-400">768 GB</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-white/60 text-sm">Throughput</p>
            <p className="text-xl font-bold text-yellow-400">2.3k/sec</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4">
          {[
            { id: 'jobs', name: 'Spark Jobs', icon: <Activity className="w-4 h-4" /> },
            { id: 'cluster', name: 'Clusters', icon: <Server className="w-4 h-4" /> },
            { id: 'streaming', name: 'Streaming', icon: <GitBranch className="w-4 h-4" /> },
            { id: 'sql', name: 'Spark SQL', icon: <Database className="w-4 h-4" /> }
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

      {/* Jobs Tab */}
      {activeTab === 'jobs' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white font-space">Spark Jobs</h3>
              <button
                onClick={startNewJob}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all"
              >
                Start New Job
              </button>
            </div>

            <div className="space-y-4">
              {sparkJobs.map((job) => (
                <motion.div
                  key={job.id}
                  whileHover={{ y: -2 }}
                  className="bg-white/5 p-4 rounded-lg border border-white/10 cursor-pointer"
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${getStatusColor(job.status)}`}>
                        {getStatusIcon(job.status)}
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{job.name}</h4>
                        <p className="text-white/60 text-sm">{job.id}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">{job.progress}%</p>
                      <p className="text-white/60 text-sm">{job.executors} executors</p>
                    </div>
                  </div>

                  <div className="w-full bg-white/20 rounded-full h-2 mb-3">
                    <div 
                      className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all"
                      style={{ width: `${job.progress}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-white/60">Tasks:</span>
                      <p className="text-white">{job.tasks.completed}/{job.tasks.total}</p>
                    </div>
                    <div>
                      <span className="text-white/60">Input:</span>
                      <p className="text-white">{job.inputData}</p>
                    </div>
                    <div>
                      <span className="text-white/60">Output:</span>
                      <p className="text-white">{job.outputData}</p>
                    </div>
                    <div>
                      <span className="text-white/60">Duration:</span>
                      <p className="text-white">{Math.floor(job.duration / 1000)}s</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Cluster Tab */}
      {activeTab === 'cluster' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {clusters.map((cluster) => (
            <div key={cluster.id} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white font-space">{cluster.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  cluster.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {cluster.status}
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Master:</span>
                  <span className="text-white font-mono text-xs">{cluster.master}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Workers:</span>
                  <span className="text-white">{cluster.workers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Cores:</span>
                  <span className="text-white">{cluster.cores}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Memory:</span>
                  <span className="text-white">{cluster.memory}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Uptime:</span>
                  <span className="text-white">{cluster.uptime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Applications:</span>
                  <span className="text-white">{cluster.applications}</span>
                </div>
              </div>

              <div className="mt-4 flex space-x-2">
                <button className="flex-1 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all text-sm">
                  Monitor
                </button>
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all">
                  <Monitor className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Streaming Tab */}
      {activeTab === 'streaming' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {streamingJobs.map((stream) => (
            <div key={stream.id} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full">
                    <GitBranch className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white font-space">{stream.name}</h3>
                    <p className="text-white/60 text-sm">Batch interval: {stream.batchInterval}ms</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(stream.status)}`}>
                  {stream.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                <div className="bg-white/5 p-3 rounded-lg text-center">
                  <p className="text-white/60">Records Processed</p>
                  <p className="text-xl font-bold text-blue-400">{stream.processedRecords.toLocaleString()}</p>
                </div>
                <div className="bg-white/5 p-3 rounded-lg text-center">
                  <p className="text-white/60">Avg Processing Time</p>
                  <p className="text-xl font-bold text-green-400">{stream.avgProcessingTime}ms</p>
                </div>
                <div className="bg-white/5 p-3 rounded-lg text-center">
                  <p className="text-white/60">Current Throughput</p>
                  <p className="text-xl font-bold text-purple-400">{stream.throughput[stream.throughput.length - 1]}/sec</p>
                </div>
              </div>

              {/* Throughput Chart */}
              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="text-white font-bold mb-3">Throughput Over Time</h4>
                <div className="h-24 flex items-end space-x-2">
                  {stream.throughput.map((value, index) => (
                    <div
                      key={index}
                      className="flex-1 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-sm opacity-80 hover:opacity-100 transition-opacity"
                      style={{ height: `${(value / Math.max(...stream.throughput)) * 100}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Spark SQL Tab */}
      {activeTab === 'sql' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-bold text-white mb-4 font-space">Spark SQL Console</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-white/70 text-sm mb-2">SQL Query</label>
              <textarea
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-blue-400 focus:outline-none font-mono text-sm"
                rows={6}
                placeholder="SELECT user_id, COUNT(*) as post_count 
FROM voice_posts 
WHERE created_at >= current_date() - interval 7 days 
GROUP BY user_id 
ORDER BY post_count DESC 
LIMIT 10"
              />
            </div>
            
            <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all font-medium">
              Execute Query
            </button>

            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-white font-bold mb-3">Recent Queries</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">SELECT * FROM users WHERE...</span>
                  <span className="text-green-400">245ms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">CREATE TABLE voice_analytics...</span>
                  <span className="text-blue-400">1.2s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">INSERT INTO coin_transactions...</span>
                  <span className="text-yellow-400">890ms</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Job Detail Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedJob(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl w-full border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white font-space">{selectedJob.name}</h2>
                  <p className="text-white/70">{selectedJob.id}</p>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="text-white/70 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 p-4 rounded-lg">
                  <span className="text-white/60 text-sm">Status</span>
                  <p className={`font-bold ${getStatusColor(selectedJob.status)}`}>
                    {selectedJob.status.toUpperCase()}
                  </p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <span className="text-white/60 text-sm">Progress</span>
                  <p className="font-bold text-white">{selectedJob.progress}%</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <span className="text-white/60 text-sm">Executors</span>
                  <p className="font-bold text-white">{selectedJob.executors}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <span className="text-white/60 text-sm">Duration</span>
                  <p className="font-bold text-white">{Math.floor(selectedJob.duration / 1000)}s</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-white font-bold mb-3">Task Progress</h3>
                <div className="w-full bg-white/20 rounded-full h-3 mb-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all"
                    style={{ width: `${(selectedJob.tasks.completed / selectedJob.tasks.total) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-white/70">
                  <span>Completed: {selectedJob.tasks.completed}</span>
                  <span>Failed: {selectedJob.tasks.failed}</span>
                  <span>Total: {selectedJob.tasks.total}</span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all font-medium">
                  View Logs
                </button>
                <button className="flex-1 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-lg hover:from-red-600 hover:to-rose-700 transition-all font-medium">
                  Kill Job
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};