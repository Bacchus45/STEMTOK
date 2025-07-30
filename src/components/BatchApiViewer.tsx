import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Server, 
  Play, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle, 
  Code, 
  Database,
  Zap,
  Globe,
  Monitor,
  Activity,
  Upload
} from 'lucide-react';
import { BatchRequest, BatchResponse } from '../api/batchApi';

interface BatchApiViewerProps {
  onApiResponse: (response: any) => void;
}

export const BatchApiViewer: React.FC<BatchApiViewerProps> = ({ onApiResponse }) => {
  const [activeTab, setActiveTab] = useState<'console' | 'batch' | 'health' | 'mock'>('console');
  const [apiRequests, setApiRequests] = useState<BatchRequest[]>([]);
  const [apiResponses, setApiResponses] = useState<BatchResponse[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [healthStatus, setHealthStatus] = useState<any>(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState('users');
  const [requestData, setRequestData] = useState('{}');
  const [consoleLog, setConsoleLog] = useState<string[]>([]);

  const endpoints = [
    { id: 'users', name: 'User Management', icon: <Database className="w-4 h-4" />, color: 'from-blue-500 to-cyan-600' },
    { id: 'coins', name: 'Coin System', icon: <Zap className="w-4 h-4" />, color: 'from-yellow-500 to-orange-600' },
    { id: 'stem', name: 'STEM Research', icon: <Code className="w-4 h-4" />, color: 'from-purple-500 to-pink-600' },
    { id: 'jesus', name: 'Jesus Assistant', icon: <Activity className="w-4 h-4" />, color: 'from-green-500 to-emerald-600' },
    { id: 'coding3d', name: '3D Coding', icon: <Monitor className="w-4 h-4" />, color: 'from-cyan-500 to-blue-600' },
    { id: 'payments', name: 'Payments', icon: <Globe className="w-4 h-4" />, color: 'from-indigo-500 to-purple-600' }
  ];

  const mockOperations = [
    { name: 'Create User', endpoint: '/users', method: 'POST', data: { name: 'John Doe', email: 'john@example.com' } },
    { name: 'Create Coin', endpoint: '/coins', method: 'POST', data: { name: 'TestCoin', symbol: 'TC', supply: 1000 } },
    { name: 'Get STEM Projects', endpoint: '/stem/projects', method: 'GET', data: {} },
    { name: 'Send Jesus Message', endpoint: '/jesus/message', method: 'POST', data: { message: 'Help with development' } },
    { name: 'Generate 3D Money', endpoint: '/coding3d/generate-money', method: 'POST', data: { dimensions: 5, bitDepth: 256 } },
    { name: 'Process Payment', endpoint: '/payments/send', method: 'POST', data: { to: 'user123', amount: 50, currency: 'SC' } }
  ];

  useEffect(() => {
    // Initialize console log
    addToConsole('Batch API Viewer initialized');
    addToConsole('Ready to process API requests');
  }, []);

  const addToConsole = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setConsoleLog(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  const addRequest = () => {
    const newRequest: BatchRequest = {
      id: Date.now().toString(),
      method: 'GET',
      endpoint: `/${selectedEndpoint}`,
      data: requestData ? JSON.parse(requestData) : undefined
    };

    setApiRequests(prev => [...prev, newRequest]);
    addToConsole(`Added request: ${newRequest.method} ${newRequest.endpoint}`);
  };

  const processBatchRequests = async () => {
    if (apiRequests.length === 0) {
      addToConsole('No requests to process');
      return;
    }

    setIsProcessing(true);
    addToConsole(`Processing ${apiRequests.length} batch requests...`);

    try {
      // Mock processing for demo purposes
      const mockResponses: BatchResponse[] = apiRequests.map(request => ({
        id: request.id,
        status: 200,
        data: getMockResponse(request.endpoint)
      }));

      setApiResponses(mockResponses);
      onApiResponse(mockResponses);
      addToConsole(`Successfully processed ${mockResponses.length} requests`);
      
      // Clear requests after processing
      setApiRequests([]);
    } catch (error: any) {
      addToConsole(`Error processing batch: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const getMockResponse = (endpoint: string) => {
    if (endpoint.includes('users')) {
      return { id: '1', name: 'John Doe', email: 'john@example.com', coins: 100 };
    } else if (endpoint.includes('coins')) {
      return { id: '1', name: 'SocialCoin', symbol: 'SC', balance: 150 };
    } else if (endpoint.includes('stem')) {
      return { projects: [{ id: '1', title: 'Quantum Research', progress: 65 }] };
    } else if (endpoint.includes('jesus')) {
      return { response: 'Peace be with you! I am here to help.' };
    } else if (endpoint.includes('coding3d')) {
      return { money: { id: '1', denomination: 100, qrCode: 'mock-qr-data' } };
    } else if (endpoint.includes('payments')) {
      return { wallet: { balance: 250, currency: 'SC' } };
    }
    return { success: true };
  };

  const runHealthCheck = async () => {
    addToConsole('Running health check...');
    setIsProcessing(true);

    try {
      // Mock health check
      const mockHealth = {
        status: 'healthy',
        endpoints: {
          '/users/health': true,
          '/coins/health': true,
          '/stem/health': true,
          '/jesus/health': true,
          '/coding3d/health': true,
          '/payments/health': true
        }
      };

      setHealthStatus(mockHealth);
      addToConsole('Health check completed - All systems operational');
    } catch (error: any) {
      addToConsole(`Health check failed: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const runMockOperation = async (operation: any) => {
    addToConsole(`Running mock operation: ${operation.name}`);
    
    const request: BatchRequest = {
      id: Date.now().toString(),
      method: operation.method as any,
      endpoint: operation.endpoint,
      data: operation.data
    };

    const response: BatchResponse = {
      id: request.id,
      status: 200,
      data: getMockResponse(operation.endpoint)
    };

    setApiResponses(prev => [...prev, response]);
    onApiResponse([response]);
    addToConsole(`Mock operation completed: ${operation.name}`);
  };

  const clearConsole = () => {
    setConsoleLog([]);
    addToConsole('Console cleared');
  };

  const clearResponses = () => {
    setApiResponses([]);
    addToConsole('Responses cleared');
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
            <Server className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-blue-200 font-space">Batch API Viewer</h2>
            <p className="text-blue-300">Web-based API testing and monitoring interface</p>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-blue-300 text-sm">Active Requests</p>
            <p className="text-xl font-bold text-yellow-400">{apiRequests.length}</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-blue-300 text-sm">Responses</p>
            <p className="text-xl font-bold text-green-400">{apiResponses.length}</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-blue-300 text-sm">Status</p>
            <p className="text-xl font-bold text-blue-400">
              {isProcessing ? 'Processing' : 'Ready'}
            </p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-blue-300 text-sm">Health</p>
            <p className="text-xl font-bold text-green-400">
              {healthStatus?.status || 'Unknown'}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mt-6">
          {[
            { id: 'console', name: 'Console', icon: <Monitor className="w-4 h-4" /> },
            { id: 'batch', name: 'Batch Requests', icon: <Upload className="w-4 h-4" /> },
            { id: 'health', name: 'Health Check', icon: <Activity className="w-4 h-4" /> },
            { id: 'mock', name: 'Mock Operations', icon: <Play className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white/20 text-blue-200'
                  : 'bg-white/10 text-blue-300 hover:bg-white/15'
              }`}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Console Tab */}
      {activeTab === 'console' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-blue-200 font-space">API Console</h3>
            <div className="flex space-x-2">
              <button
                onClick={clearConsole}
                className="px-3 py-1 bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm rounded-lg hover:from-red-600 hover:to-rose-700 transition-all"
              >
                Clear
              </button>
              <button
                onClick={processBatchRequests}
                disabled={isProcessing || apiRequests.length === 0}
                className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50"
              >
                {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="bg-black/50 p-4 rounded-lg font-mono text-sm h-64 overflow-y-auto">
            {consoleLog.map((log, index) => (
              <div key={index} className="text-green-400 mb-1">
                {log}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Batch Requests Tab */}
      {activeTab === 'batch' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Request Builder */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-blue-200 mb-4 font-space">Build Request</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-blue-300 text-sm mb-2">Endpoint</label>
                <select
                  value={selectedEndpoint}
                  onChange={(e) => setSelectedEndpoint(e.target.value)}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-blue-200"
                >
                  {endpoints.map(endpoint => (
                    <option key={endpoint.id} value={endpoint.id}>
                      {endpoint.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-blue-300 text-sm mb-2">Request Data (JSON)</label>
                <textarea
                  value={requestData}
                  onChange={(e) => setRequestData(e.target.value)}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-blue-200 font-mono text-sm"
                  rows={3}
                  placeholder='{"key": "value"}'
                />
              </div>
            </div>
            
            <button
              onClick={addRequest}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all font-medium"
            >
              Add to Batch
            </button>
          </div>

          {/* Current Requests */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-blue-200 font-space">Batch Queue ({apiRequests.length})</h3>
              <button
                onClick={processBatchRequests}
                disabled={isProcessing || apiRequests.length === 0}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50"
              >
                Process Batch
              </button>
            </div>
            
            <div className="space-y-2">
              {apiRequests.map((request) => (
                <div key={request.id} className="bg-white/5 p-3 rounded-lg flex justify-between items-center">
                  <div>
                    <span className="font-bold text-blue-200">{request.method}</span>
                    <span className="text-blue-300 ml-2">{request.endpoint}</span>
                  </div>
                  <button
                    onClick={() => setApiRequests(prev => prev.filter(r => r.id !== request.id))}
                    className="text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              ))}
              
              {apiRequests.length === 0 && (
                <div className="text-center py-8 text-blue-300">
                  No requests in queue. Add some requests to get started.
                </div>
              )}
            </div>
          </div>

          {/* Responses */}
          {apiResponses.length > 0 && (
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-blue-200 font-space">Responses</h3>
                <button
                  onClick={clearResponses}
                  className="px-3 py-1 bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm rounded-lg hover:from-red-600 hover:to-rose-700 transition-all"
                >
                  Clear
                </button>
              </div>
              
              <div className="space-y-3">
                {apiResponses.map((response) => (
                  <div key={response.id} className="bg-white/5 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-blue-200">Request ID: {response.id}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        response.status === 200 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {response.status}
                      </span>
                    </div>
                    <pre className="bg-black/30 p-3 rounded text-xs text-green-400 overflow-x-auto">
                      {JSON.stringify(response.data || response.error, null, 2)}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Health Check Tab */}
      {activeTab === 'health' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-blue-200 font-space">System Health</h3>
            <button
              onClick={runHealthCheck}
              disabled={isProcessing}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all disabled:opacity-50"
            >
              {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Run Check'}
            </button>
          </div>

          {healthStatus && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-2 rounded-full ${
                  healthStatus.status === 'healthy' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {healthStatus.status === 'healthy' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                </div>
                <span className="text-xl font-bold text-blue-200">
                  System Status: {healthStatus.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(healthStatus.endpoints).map(([endpoint, status]) => (
                  <div key={endpoint} className="bg-white/5 p-3 rounded-lg flex justify-between items-center">
                    <span className="text-blue-300">{endpoint}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      status ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {status ? 'Healthy' : 'Down'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!healthStatus && (
            <div className="text-center py-8 text-blue-300">
              Click "Run Check" to test system health
            </div>
          )}
        </motion.div>
      )}

      {/* Mock Operations Tab */}
      {activeTab === 'mock' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-bold text-blue-200 mb-6 font-space">Mock Operations</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockOperations.map((operation, index) => (
              <div key={index} className="bg-white/5 p-4 rounded-lg">
                <h4 className="font-bold text-blue-200 mb-2">{operation.name}</h4>
                <p className="text-blue-300 text-sm mb-3">
                  {operation.method} {operation.endpoint}
                </p>
                <button
                  onClick={() => runMockOperation(operation)}
                  className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all text-sm"
                >
                  Run Mock
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};