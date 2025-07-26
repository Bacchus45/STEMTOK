import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Presentation, Plus, Type, Image, Mic, Save, X } from 'lucide-react';

interface Slide {
  id: string;
  type: 'title' | 'content' | 'image' | 'voice';
  title: string;
  content: string;
  imageUrl?: string;
  voiceNote?: string;
}

interface PresentationEditorProps {
  onClose: () => void;
  onPresentationSaved: (presentation: any) => void;
}

export const PresentationEditor: React.FC<PresentationEditorProps> = ({
  onClose,
  onPresentationSaved
}) => {
  const [presentation, setPresentation] = useState({
    title: '',
    description: '',
    slides: [] as Slide[]
  });

  const [activeSlide, setActiveSlide] = useState<number>(0);

  const addSlide = (type: Slide['type']) => {
    const newSlide: Slide = {
      id: Date.now().toString(),
      type,
      title: '',
      content: ''
    };

    setPresentation(prev => ({
      ...prev,
      slides: [...prev.slides, newSlide]
    }));

    setActiveSlide(presentation.slides.length);
  };

  const updateSlide = (index: number, updates: Partial<Slide>) => {
    setPresentation(prev => ({
      ...prev,
      slides: prev.slides.map((slide, i) => 
        i === index ? { ...slide, ...updates } : slide
      )
    }));
  };

  const removeSlide = (index: number) => {
    setPresentation(prev => ({
      ...prev,
      slides: prev.slides.filter((_, i) => i !== index)
    }));

    if (activeSlide >= presentation.slides.length - 1) {
      setActiveSlide(Math.max(0, presentation.slides.length - 2));
    }
  };

  const savePresentation = () => {
    if (!presentation.title.trim()) {
      alert('Please enter a presentation title');
      return;
    }

    onPresentationSaved({
      ...presentation,
      id: Date.now().toString(),
      createdAt: new Date()
    });
  };

  const currentSlide = presentation.slides[activeSlide];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl w-full max-w-6xl h-[90vh] border border-white/20 flex overflow-hidden"
      >
        {/* Sidebar */}
        <div className="w-80 bg-white/5 border-r border-white/10 flex flex-col">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white font-space">Presentation</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white/70" />
              </button>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                value={presentation.title}
                onChange={(e) => setPresentation(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-indigo-400 focus:outline-none"
                placeholder="Presentation Title"
              />
              
              <textarea
                value={presentation.description}
                onChange={(e) => setPresentation(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-indigo-400 focus:outline-none resize-none h-20"
                placeholder="Description..."
              />
            </div>
          </div>

          {/* Slide List */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {presentation.slides.map((slide, index) => (
                <div
                  key={slide.id}
                  onClick={() => setActiveSlide(index)}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    activeSlide === index
                      ? 'bg-indigo-500/20 border border-indigo-400/50'
                      : 'bg-white/5 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {slide.type === 'title' && <Type className="w-4 h-4 text-white/60" />}
                      {slide.type === 'content' && <Type className="w-4 h-4 text-white/60" />}
                      {slide.type === 'image' && <Image className="w-4 h-4 text-white/60" />}
                      {slide.type === 'voice' && <Mic className="w-4 h-4 text-white/60" />}
                      <span className="text-white text-sm">
                        {slide.title || `Slide ${index + 1}`}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSlide(index);
                      }}
                      className="p-1 hover:bg-red-500/20 rounded text-red-400"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Slide Buttons */}
            <div className="mt-4 space-y-2">
              <h3 className="text-white/70 text-sm font-medium">Add Slide:</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => addSlide('title')}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-xs transition-all flex items-center space-x-1"
                >
                  <Type className="w-3 h-3" />
                  <span>Title</span>
                </button>
                <button
                  onClick={() => addSlide('content')}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-xs transition-all flex items-center space-x-1"
                >
                  <Type className="w-3 h-3" />
                  <span>Content</span>
                </button>
                <button
                  onClick={() => addSlide('image')}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-xs transition-all flex items-center space-x-1"
                >
                  <Image className="w-3 h-3" />
                  <span>Image</span>
                </button>
                <button
                  onClick={() => addSlide('voice')}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-xs transition-all flex items-center space-x-1"
                >
                  <Mic className="w-3 h-3" />
                  <span>Voice</span>
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="p-4 border-t border-white/10">
            <button
              onClick={savePresentation}
              className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg transition-all font-medium flex items-center justify-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Presentation</span>
            </button>
          </div>
        </div>

        {/* Main Editor */}
        <div className="flex-1 flex flex-col">
          {presentation.slides.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Presentation className="w-16 h-16 text-white/40 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No Slides Yet</h3>
                <p className="text-white/70">Add your first slide to get started</p>
              </div>
            </div>
          ) : (
            <>
              {/* Slide Preview */}
              <div className="flex-1 p-8 flex items-center justify-center">
                <div className="w-full max-w-4xl aspect-video bg-white rounded-lg shadow-2xl p-8">
                  {currentSlide && (
                    <div className="h-full flex flex-col">
                      {currentSlide.type === 'title' && (
                        <div className="text-center flex-1 flex flex-col justify-center">
                          <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            {currentSlide.title || 'Slide Title'}
                          </h1>
                          <p className="text-xl text-gray-600">
                            {currentSlide.content || 'Slide content goes here...'}
                          </p>
                        </div>
                      )}

                      {(currentSlide.type === 'content' || currentSlide.type === 'voice') && (
                        <div className="h-full">
                          <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            {currentSlide.title || 'Slide Title'}
                          </h2>
                          <div className="text-lg text-gray-700 leading-relaxed">
                            {currentSlide.content || 'Add your content here...'}
                          </div>
                        </div>
                      )}

                      {currentSlide.type === 'image' && (
                        <div className="h-full">
                          <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            {currentSlide.title || 'Slide Title'}
                          </h2>
                          <div className="flex-1 bg-gray-100 rounded-lg flex items-center justify-center">
                            {currentSlide.imageUrl ? (
                              <img 
                                src={currentSlide.imageUrl} 
                                alt="Slide content"
                                className="max-w-full max-h-full object-contain"
                              />
                            ) : (
                              <div className="text-center text-gray-400">
                                <Image className="w-16 h-16 mx-auto mb-2" />
                                <p>Image placeholder</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Slide Editor */}
              <div className="p-6 border-t border-white/10 bg-white/5">
                {currentSlide && (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={currentSlide.title}
                      onChange={(e) => updateSlide(activeSlide, { title: e.target.value })}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-indigo-400 focus:outline-none"
                      placeholder="Slide title..."
                    />

                    <textarea
                      value={currentSlide.content}
                      onChange={(e) => updateSlide(activeSlide, { content: e.target.value })}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-indigo-400 focus:outline-none resize-none h-24"
                      placeholder="Slide content..."
                    />

                    {currentSlide.type === 'image' && (
                      <input
                        type="url"
                        value={currentSlide.imageUrl || ''}
                        onChange={(e) => updateSlide(activeSlide, { imageUrl: e.target.value })}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-indigo-400 focus:outline-none"
                        placeholder="Image URL..."
                      />
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};