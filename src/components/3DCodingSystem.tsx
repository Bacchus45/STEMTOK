import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Youtube as Cube, Code, Printer, QrCode } from 'lucide-react';
import QRCode from 'qrcode';
import * as THREE from 'three';

interface Dimension {
  id: number;
  name: string;
  description: string;
  bitDepth: number;
  color: string;
  active: boolean;
}

interface PaperMoney {
  id: string;
  denomination: number;
  currency: string;
  qrCode: string;
  qrDataUrl: string;
  timestamp: Date;
  dimensions: number[];
  bitSignature: string;
}

interface CodingSystemProps {
  onMoneyGenerated: (money: PaperMoney) => void;
  onValueCreated: (amount: number, description: string) => void;
}

export const CodingSystem3D: React.FC<CodingSystemProps> = ({
  onMoneyGenerated,
  onValueCreated
}) => {
  const [activeTab, setActiveTab] = useState<'coding' | 'dimensions' | 'money' | 'print'>('coding');
  const [currentDimension, setCurrentDimension] = useState(3);
  const [bitDepth, setBitDepth] = useState(128);
  const [generatedMoney, setGeneratedMoney] = useState<PaperMoney[]>([]);
  const [selectedMoney, setSelectedMoney] = useState<PaperMoney | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  const [dimensions] = useState<Dimension[]>([
    { id: 1, name: 'Point', description: 'Zero-dimensional existence', bitDepth: 1, color: 'from-red-500 to-red-600', active: false },
    { id: 2, name: 'Line', description: 'One-dimensional flow', bitDepth: 2, color: 'from-orange-500 to-orange-600', active: false },
    { id: 3, name: 'Plane', description: 'Two-dimensional surface', bitDepth: 4, color: 'from-yellow-500 to-yellow-600', active: true },
    { id: 4, name: 'Space', description: 'Three-dimensional reality', bitDepth: 8, color: 'from-green-500 to-green-600', active: false },
    { id: 5, name: 'Time', description: 'Four-dimensional spacetime', bitDepth: 16, color: 'from-blue-500 to-blue-600', active: false },
    { id: 6, name: 'Probability', description: 'Five-dimensional quantum states', bitDepth: 32, color: 'from-indigo-500 to-indigo-600', active: false },
    { id: 7, name: 'Consciousness', description: 'Six-dimensional awareness', bitDepth: 64, color: 'from-purple-500 to-purple-600', active: false },
    { id: 8, name: 'Spirit', description: 'Seven-dimensional divine connection', bitDepth: 128, color: 'from-pink-500 to-pink-600', active: false },
    { id: 9, name: 'Unity', description: 'Eight-dimensional oneness', bitDepth: 256, color: 'from-cyan-500 to-cyan-600', active: false },
    { id: 10, name: 'Infinity', description: 'Nine-dimensional boundlessness', bitDepth: 512, color: 'from-teal-500 to-teal-600', active: false },
    { id: 11, name: 'Source', description: 'Ten-dimensional origin', bitDepth: 1024, color: 'from-violet-500 to-violet-600', active: false },
    { id: 12, name: 'Beyond', description: 'Eleven-dimensional transcendence', bitDepth: 2048, color: 'from-rose-500 to-rose-600', active: false }
  ]);

  useEffect(() => {
    initializeThreeJS();
    return () => {
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (sceneRef.current && rendererRef.current) {
      updateVisualization();
    }
  }, [currentDimension, bitDepth]);

  const initializeThreeJS = () => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 400 / 300, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    
    renderer.setSize(400, 300);
    renderer.setClearColor(0x000000, 0);
    
    sceneRef.current = scene;
    rendererRef.current = renderer;
    
    camera.position.z = 5;
    
    const animate = () => {
      requestAnimationFrame(animate);
      if (scene.children.length > 0) {
        scene.children.forEach(child => {
          if (child instanceof THREE.Mesh) {
            child.rotation.x += 0.01;
            child.rotation.y += 0.01;
          }
        });
      }
      renderer.render(scene, camera);
    };
    animate();
  };

  const updateVisualization = () => {
    if (!sceneRef.current || !rendererRef.current) return;

    // Clear existing objects
    while (sceneRef.current.children.length > 0) {
      sceneRef.current.remove(sceneRef.current.children[0]);
    }

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    sceneRef.current.add(ambientLight);
    sceneRef.current.add(directionalLight);

    // Create geometry based on current dimension
    const geometries = [];
    const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];
    
    for (let i = 0; i < Math.min(currentDimension, 6); i++) {
      let geometry;
      switch (i % 6) {
        case 0: geometry = new THREE.BoxGeometry(1, 1, 1); break;
        case 1: geometry = new THREE.SphereGeometry(0.8, 16, 16); break;
        case 2: geometry = new THREE.ConeGeometry(0.8, 1.5, 8); break;
        case 3: geometry = new THREE.CylinderGeometry(0.5, 0.8, 1.5, 8); break;
        case 4: geometry = new THREE.OctahedronGeometry(1); break;
        case 5: geometry = new THREE.DodecahedronGeometry(0.8); break;
        default: geometry = new THREE.BoxGeometry(1, 1, 1);
      }
      
      const material = new THREE.MeshPhongMaterial({ 
        color: colors[i],
        transparent: true,
        opacity: 0.7
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (i - currentDimension / 2) * 2,
        Math.sin(i) * 1.5,
        Math.cos(i) * 1.5
      );
      
      sceneRef.current.add(mesh);
    }
  };

  const generateQRCode = async (data: string): Promise<string> => {
    try {
      const qrDataUrl = await QRCode.toDataURL(data, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      return qrDataUrl;
    } catch (error) {
      console.error('QR Code generation failed:', error);
      return '';
    }
  };

  const generatePaperMoney = async () => {
    const denomination = Math.floor(Math.random() * 1000) + 100;
    const currency = 'SocialCoin';
    
    // Create unique data for QR code
    const qrData = JSON.stringify({
      denomination,
      currency,
      timestamp: new Date().toISOString(),
      dimensions: Array.from({ length: currentDimension }, (_, i) => i + 1),
      bitSignature: generateBitSignature(),
      validationCode: Math.random().toString(36).substring(2, 15)
    });

    const qrDataUrl = await generateQRCode(qrData);
    
    const newMoney: PaperMoney = {
      id: Date.now().toString(),
      denomination,
      currency,
      qrCode: qrData,
      qrDataUrl,
      timestamp: new Date(),
      dimensions: Array.from({ length: currentDimension }, (_, i) => i + 1),
      bitSignature: generateBitSignature()
    };

    setGeneratedMoney(prev => [newMoney, ...prev]);
    onMoneyGenerated(newMoney);
    onValueCreated(denomination, `Generated ${currency} paper money`);
  };

  const generateBitSignature = (): string => {
    const signature = [];
    for (let i = 0; i < bitDepth / 8; i++) {
      signature.push(Math.floor(Math.random() * 256).toString(16).padStart(2, '0'));
    }
    return signature.join('');
  };

  const printMoney = (money: PaperMoney) => {
    // Create printable HTML
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>SocialCoin Paper Money</title>
            <style>
              body { 
                font-family: 'Courier New', monospace; 
                margin: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
              }
              .money-note {
                width: 300px;
                height: 150px;
                border: 3px solid #gold;
                border-radius: 15px;
                padding: 20px;
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                position: relative;
                margin: 20px auto;
              }
              .denomination {
                font-size: 36px;
                font-weight: bold;
                text-align: center;
                color: #ffd700;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
              }
              .currency {
                text-align: center;
                font-size: 14px;
                color: #ffffff;
                margin-top: 5px;
              }
              .qr-code {
                position: absolute;
                right: 10px;
                top: 10px;
                width: 60px;
                height: 60px;
              }
              .details {
                font-size: 8px;
                color: #cccccc;
                margin-top: 10px;
              }
              .dimensions {
                font-size: 10px;
                color: #00ffff;
                margin-top: 5px;
              }
            </style>
          </head>
          <body>
            <div class="money-note">
              <div class="denomination">${money.denomination}</div>
              <div class="currency">${money.currency}</div>
              <img src="${money.qrDataUrl}" alt="QR Code" class="qr-code" />
              <div class="details">
                ID: ${money.id}<br/>
                Date: ${money.timestamp.toLocaleDateString()}<br/>
                Bit Signature: ${money.bitSignature.substring(0, 16)}...
              </div>
              <div class="dimensions">
                Dimensions: ${money.dimensions.join('→')}D Space
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
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
          <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl">
            <Cube className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white font-space">3D Coding System</h2>
            <p className="text-white/70">128-bit to 11-dimensional space with QR paper money</p>
          </div>
        </div>

        {/* Current Settings */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-white/60 text-sm">Current Dimension</p>
            <p className="text-xl font-bold text-cyan-400">{currentDimension}D</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-white/60 text-sm">Bit Depth</p>
            <p className="text-xl font-bold text-green-400">{bitDepth}-bit</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-white/60 text-sm">Generated Money</p>
            <p className="text-xl font-bold text-yellow-400">{generatedMoney.length}</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <p className="text-white/60 text-sm">Total Value</p>
            <p className="text-xl font-bold text-purple-400">
              {generatedMoney.reduce((sum, money) => sum + money.denomination, 0)}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4">
          {[
            { id: 'coding', name: '3D Coding', icon: <Code className="w-4 h-4" /> },
            { id: 'dimensions', name: 'Dimensions', icon: <Layers className="w-4 h-4" /> },
            { id: 'money', name: 'QR Money', icon: <QrCode className="w-4 h-4" /> },
            { id: 'print', name: 'Print', icon: <Printer className="w-4 h-4" /> }
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

      {/* 3D Coding Tab */}
      {activeTab === 'coding' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* 3D Visualization */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 font-space">3D Visualization</h3>
            <div className="bg-black/30 rounded-lg p-4 mb-4">
              <canvas ref={canvasRef} className="w-full h-64 rounded-lg" />
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm mb-2">Dimension: {currentDimension}D</label>
                <input
                  type="range"
                  min="3"
                  max="11"
                  value={currentDimension}
                  onChange={(e) => setCurrentDimension(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-white/70 text-sm mb-2">Bit Depth: {bitDepth}-bit</label>
                <input
                  type="range"
                  min="128"
                  max="2048"
                  step="128"
                  value={bitDepth}
                  onChange={(e) => setBitDepth(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Coding Interface */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 font-space">Dimensional Code</h3>
            <div className="bg-black/50 p-4 rounded-lg font-mono text-green-400 text-sm mb-4 h-64 overflow-y-auto">
              <div>// {currentDimension}D Space Initialization</div>
              <div>dimension_space = create_space({currentDimension}D);</div>
              <div>bit_depth = {bitDepth};</div>
              <div>quantum_state = initialize_quantum({bitDepth});</div>
              <div></div>
              <div>// Dimensional Flow</div>
              {Array.from({ length: currentDimension }, (_, i) => (
                <div key={i}>axis[{i + 1}] = generate_axis({i + 1}, {bitDepth});</div>
              ))}
              <div></div>
              <div>// Sacred Geometry Integration</div>
              <div>golden_ratio = 1.618033988749;</div>
              <div>fibonacci_sequence = generate_fibonacci({currentDimension});</div>
              <div>divine_proportion = apply_sacred_geometry();</div>
              <div></div>
              <div>// Consciousness Bridge</div>
              <div>consciousness_layer = bridge_to_awareness();</div>
              <div>spiritual_connection = establish_divine_link();</div>
              <div>unity_field = create_oneness_matrix();</div>
            </div>
            
            <button
              onClick={generatePaperMoney}
              className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all font-medium"
            >
              Generate QR Paper Money
            </button>
          </div>
        </motion.div>
      )}

      {/* Dimensions Tab */}
      {activeTab === 'dimensions' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {dimensions.map((dimension, index) => (
            <motion.div
              key={dimension.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 cursor-pointer ${
                currentDimension === dimension.id ? 'ring-2 ring-cyan-400' : ''
              }`}
              onClick={() => setCurrentDimension(dimension.id)}
            >
              <div className={`p-3 rounded-lg bg-gradient-to-r ${dimension.color} mb-4`}>
                <Code className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2 font-space">
                {dimension.name} ({dimension.id}D)
              </h3>
              <p className="text-white/70 text-sm mb-3">{dimension.description}</p>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/60">{dimension.bitDepth}-bit</span>
                {currentDimension === dimension.id && (
                  <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded-full">
                    Active
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* QR Money Tab */}
      {activeTab === 'money' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white font-space">Generated Paper Money</h3>
              <button
                onClick={generatePaperMoney}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all"
              >
                Generate New
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {generatedMoney.map((money) => (
                <div
                  key={money.id}
                  className="bg-white/5 p-4 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-all"
                  onClick={() => setSelectedMoney(money)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-2xl font-bold text-yellow-400">
                      {money.denomination}
                    </div>
                    <img src={money.qrDataUrl} alt="QR Code" className="w-12 h-12" />
                  </div>
                  
                  <div className="text-white/70 text-sm space-y-1">
                    <div>Currency: {money.currency}</div>
                    <div>Dimensions: {money.dimensions.join('→')}D</div>
                    <div>Date: {money.timestamp.toLocaleDateString()}</div>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      printMoney(money);
                    }}
                    className="w-full mt-3 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all text-sm"
                  >
                    Print Money
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Print Tab */}
      {activeTab === 'print' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 font-space">Print Paper Money</h3>
            <p className="text-white/70 mb-6">
              Select money to print or generate new paper currency with QR codes for physical circulation.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-bold text-white">Print Settings</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-white/70 text-sm mb-1">Paper Size</label>
                    <select className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white">
                      <option value="a4">A4 (210 × 297 mm)</option>
                      <option value="letter">Letter (8.5 × 11 in)</option>
                      <option value="custom">Custom Size</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white/70 text-sm mb-1">Quality</label>
                    <select className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white">
                      <option value="high">High Quality (300 DPI)</option>
                      <option value="medium">Medium Quality (150 DPI)</option>
                      <option value="draft">Draft Quality (72 DPI)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white/70 text-sm mb-1">Copies</label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      defaultValue="1"
                      className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-bold text-white">Security Features</h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-white/70 text-sm">QR Code Verification</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-white/70 text-sm">Dimensional Signature</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-white/70 text-sm">Timestamp Validation</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-white/70 text-sm">Holographic Effect</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex space-x-4">
              <button
                onClick={generatePaperMoney}
                className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all font-medium"
              >
                Generate & Print New Money
              </button>
              <button
                onClick={() => {
                  if (generatedMoney.length > 0) {
                    printMoney(generatedMoney[0]);
                  }
                }}
                className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all font-medium"
              >
                Print Latest Money
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Money Detail Modal */}
      <AnimatePresence>
        {selectedMoney && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMoney(null)}
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
                  {selectedMoney.currency} Paper Money
                </h2>
                <button
                  onClick={() => setSelectedMoney(null)}
                  className="text-white/70 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-400 mb-2">
                      {selectedMoney.denomination}
                    </div>
                    <div className="text-white/70">{selectedMoney.currency}</div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">ID:</span>
                      <span className="text-white">{selectedMoney.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Date:</span>
                      <span className="text-white">{selectedMoney.timestamp.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Dimensions:</span>
                      <span className="text-cyan-400">{selectedMoney.dimensions.join('→')}D</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <img 
                    src={selectedMoney.qrDataUrl} 
                    alt="QR Code" 
                    className="w-48 h-48 mx-auto mb-4 rounded-lg bg-white p-2"
                  />
                  <div className="text-xs text-white/60 font-mono break-all">
                    {selectedMoney.bitSignature.substring(0, 32)}...
                  </div>
                </div>
              </div>

              <button
                onClick={() => printMoney(selectedMoney)}
                className="w-full mt-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all font-medium"
              >
                Print This Money
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};