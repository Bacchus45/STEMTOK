import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, TrendingUp, Mic, User, Bell, Search } from 'lucide-react';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  currentView: string;
  onViewChange: (view: string) => void;
  notifications?: number;
}

export const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
  children,
  currentView,
  onViewChange,
  notifications = 0
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navigationItems = [
    { id: 'home', name: 'Home', icon: Home },
    { id: 'insights', name: 'Insights', icon: TrendingUp },
    { id: 'studio', name: 'Studio', icon: Mic },
    { id: 'profile', name: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Mobile Header */}
      {isMobile && (
        <motion.header
          initial={{ y: -60 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 z-40 bg-black/20 backdrop-blur-md border-b border-white/10"
        >
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>

            <h1 className="text-xl font-bold text-gradient font-space">
              SocialCoin
            </h1>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Search className="w-5 h-5 text-white" />
              </button>

              <button className="relative p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                <Bell className="w-5 h-5 text-white" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {notifications > 9 ? '9+' : notifications}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-white/10"
              >
                <div className="p-4">
                  <input
                    type="text"
                    placeholder="Search posts, users, coins..."
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-indigo-400 focus:outline-none"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}

      {/* Mobile Slide-out Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && isMobile && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-30"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.nav
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="fixed top-0 left-0 w-72 h-full bg-black/40 backdrop-blur-xl border-r border-white/20 z-40 pt-20"
            >
              <div className="p-6">
                <div className="space-y-2">
                  {navigationItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onViewChange(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                        currentView === item.id
                          ? 'bg-white/20 text-white'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </button>
                  ))}
                </div>

                {/* User Profile in Menu */}
                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="flex items-center space-x-3 p-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm">John Doe</div>
                      <div className="text-white/60 text-xs">@johndoe</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      {!isMobile && (
        <motion.nav
          initial={{ x: -60 }}
          animate={{ x: 0 }}
          className="fixed left-0 top-0 w-64 h-full bg-black/20 backdrop-blur-md border-r border-white/10 z-30"
        >
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gradient mb-8 font-space">
              SocialCoin
            </h1>

            <div className="space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                    currentView === item.id
                      ? 'bg-white/20 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.nav>
      )}

      {/* Main Content */}
      <main className={`${
        isMobile 
          ? 'pt-16 pb-20' 
          : 'ml-64'
      } min-h-screen`}>
        <div className="p-4 md:p-6">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <motion.nav
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-xl border-t border-white/20 z-30"
        >
          <div className="flex justify-around py-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`flex flex-col items-center p-3 rounded-lg transition-all ${
                  currentView === item.id
                    ? 'text-indigo-400'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <item.icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">{item.name}</span>
              </button>
            ))}
          </div>
        </motion.nav>
      )}
    </div>
  );
};