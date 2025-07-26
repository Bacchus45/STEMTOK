import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Smile, Paperclip, Search, Phone, Video, MoreVertical, Users, Plus, Hash, Volume2, VolumeX } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  type: 'text' | 'voice' | 'image';
  timestamp: Date;
  audioUrl?: string;
  duration?: number;
  isPlaying?: boolean;
}

interface Chat {
  id: string;
  name: string;
  type: 'direct' | 'group' | 'channel';
  avatar: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  isOnline?: boolean;
  members?: number;
}

interface ChatMessagingSystemProps {
  currentUserId: string;
  onSendMessage: (message: string, chatId: string) => void;
}

export const ChatMessagingSystem: React.FC<ChatMessagingSystemProps> = ({
  currentUserId,
  onSendMessage
}) => {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [chats] = useState<Chat[]>([
    {
      id: '1',
      name: 'Sarah Chen',
      type: 'direct',
      avatar: 'SC',
      lastMessage: 'Thanks for the WinterCoin! 🎄',
      timestamp: new Date(Date.now() - 300000),
      unreadCount: 2,
      isOnline: true
    },
    {
      id: '2',
      name: 'Crypto Creators',
      type: 'group',
      avatar: '🚀',
      lastMessage: 'Mike: New voice feature is amazing!',
      timestamp: new Date(Date.now() - 600000),
      unreadCount: 5,
      members: 24
    },
    {
      id: '3',
      name: 'General Discussion',
      type: 'channel',
      avatar: '#',
      lastMessage: 'Welcome new members to SocialCoin!',
      timestamp: new Date(Date.now() - 1800000),
      unreadCount: 0,
      members: 1247
    },
    {
      id: '4',
      name: 'Alex Rivera',
      type: 'direct',
      avatar: 'AR',
      lastMessage: 'Voice message',
      timestamp: new Date(Date.now() - 3600000),
      unreadCount: 1,
      isOnline: false
    },
    {
      id: '5',
      name: 'Winter Season',
      type: 'group',
      avatar: '❄️',
      lastMessage: 'Emma: Season ending soon!',
      timestamp: new Date(Date.now() - 7200000),
      unreadCount: 0,
      members: 156
    }
  ]);

  useEffect(() => {
    // Initialize messages
    const initialMessages: Record<string, Message[]> = {
      '1': [
        {
          id: '1',
          senderId: '2',
          senderName: 'Sarah Chen',
          senderAvatar: 'SC',
          content: 'Hey! Love your latest voice post about crypto trends!',
          type: 'text',
          timestamp: new Date(Date.now() - 3600000)
        },
        {
          id: '2',
          senderId: currentUserId,
          senderName: 'You',
          senderAvatar: 'ME',
          content: 'Thanks! I\'m working on more content about seasonal coins.',
          type: 'text',
          timestamp: new Date(Date.now() - 3000000)
        },
        {
          id: '3',
          senderId: '2',
          senderName: 'Sarah Chen',
          senderAvatar: 'SC',
          content: 'Thanks for the WinterCoin! 🎄',
          type: 'text',
          timestamp: new Date(Date.now() - 300000)
        }
      ],
      '2': [
        {
          id: '4',
          senderId: '3',
          senderName: 'Mike Johnson',
          senderAvatar: 'MJ',
          content: 'Welcome everyone to the Crypto Creators group!',
          type: 'text',
          timestamp: new Date(Date.now() - 7200000)
        },
        {
          id: '5',
          senderId: '4',
          senderName: 'Emma Watson',
          senderAvatar: 'EW',
          content: 'Excited to be here! The voice features are incredible.',
          type: 'text',
          timestamp: new Date(Date.now() - 3600000)
        },
        {
          id: '6',
          senderId: '3',
          senderName: 'Mike Johnson',
          senderAvatar: 'MJ',
          content: 'New voice feature is amazing!',
          type: 'text',
          timestamp: new Date(Date.now() - 600000)
        }
      ]
    };
    setMessages(initialMessages);
  }, [currentUserId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeChat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!message.trim() || !activeChat) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      senderName: 'You',
      senderAvatar: 'ME',
      content: message,
      type: 'text',
      timestamp: new Date()
    };

    setMessages(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMessage]
    }));

    onSendMessage(message, activeChat);
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatLastMessageTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activechatData = chats.find(chat => chat.id === activeChat);
  const chatMessages = activeChat ? messages[activeChat] || [] : [];

  return (
    <div className="h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex">
      {/* Sidebar - Chat List */}
      <div className="w-80 bg-white/10 backdrop-blur-md border-r border-white/20 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-white/20">
          <h2 className="text-xl font-bold text-white mb-4 font-space">Messages</h2>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-blue-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.map((chat) => (
            <motion.div
              key={chat.id}
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              onClick={() => setActiveChat(chat.id)}
              className={`p-4 cursor-pointer transition-all border-b border-white/10 ${
                activeChat === chat.id ? 'bg-white/20' : 'bg-transparent'
              }`}
            >
              <div className="flex items-center space-x-3">
                {/* Avatar */}
                <div className="relative">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                    chat.type === 'direct' ? 'bg-gradient-to-r from-purple-500 to-pink-600' : 
                    chat.type === 'group' ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                    'bg-gradient-to-r from-blue-500 to-cyan-600'
                  }`}>
                    {chat.avatar}
                  </div>
                  {chat.type === 'direct' && chat.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full" />
                  )}
                </div>

                {/* Chat Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white truncate">{chat.name}</h3>
                    <span className="text-white/60 text-xs">{formatLastMessageTime(chat.timestamp)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-white/70 text-sm truncate">{chat.lastMessage}</p>
                    {chat.unreadCount > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                  {chat.type !== 'direct' && (
                    <p className="text-white/50 text-xs">{chat.members} members</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* New Chat Button */}
        <div className="p-4 border-t border-white/20">
          <button className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg transition-all flex items-center justify-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>New Chat</span>
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="bg-white/10 backdrop-blur-md border-b border-white/20 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                    activeChat === '1' ? 'bg-gradient-to-r from-purple-500 to-pink-600' : 
                    activeChat === '2' ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                    'bg-gradient-to-r from-blue-500 to-cyan-600'
                  }`}>
                    {activeChat && chats.find(c => c.id === activeChat)?.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{activeChat && chats.find(c => c.id === activeChat)?.name}</h3>
                    {activeChat && chats.find(c => c.id === activeChat)?.type === 'direct' ? (
                      <p className="text-white/60 text-sm">
                        {chats.find(c => c.id === activeChat)?.isOnline ? 'Online' : 'Last seen 2h ago'}
                      </p>
                    ) : (
                      <p className="text-white/60 text-sm">
                        {chats.find(c => c.id === activeChat)?.members} members
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <Phone className="w-5 h-5 text-white/70" />
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <Video className="w-5 h-5 text-white/70" />
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5 text-white/70" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {chatMessages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex space-x-2 max-w-xs lg:max-w-md ${
                      msg.senderId === currentUserId ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      {msg.senderId !== currentUserId && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                          {msg.senderAvatar}
                        </div>
                      )}
                      
                      <div className={`px-4 py-2 rounded-2xl ${
                        msg.senderId === currentUserId
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                          : 'bg-white/10 text-white'
                      }`}>
                        {msg.type === 'voice' ? (
                          <div className="flex items-center space-x-2">
                            <button className="p-1 bg-white/20 rounded-full">
                              <Volume2 className="w-3 h-3" />
                            </button>
                            <div className="flex-1 h-2 bg-white/30 rounded-full">
                              <div className="h-2 bg-white rounded-full w-1/3" />
                            </div>
                            <span className="text-xs">{msg.duration}s</span>
                          </div>
                        ) : (
                          <p className="text-sm">{msg.content}</p>
                        )}
                        <p className="text-xs opacity-70 mt-1">{formatTime(msg.timestamp)}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white/10 backdrop-blur-md border-t border-white/20 p-4">
              <div className="flex items-center space-x-3">
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Paperclip className="w-5 h-5 text-white/70" />
                </button>
                
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white placeholder-white/40 focus:border-blue-400 focus:outline-none pr-10"
                  />
                  <button 
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="absolute right-3 top-2 hover:bg-white/10 rounded-full p-1 transition-colors"
                  >
                    <Smile className="w-4 h-4 text-white/70" />
                  </button>
                </div>

                <button 
                  onClick={() => setIsRecording(!isRecording)}
                  className={`p-2 rounded-lg transition-colors ${
                    isRecording ? 'bg-red-500 text-white' : 'hover:bg-white/10 text-white/70'
                  }`}
                >
                  <Mic className="w-5 h-5" />
                </button>

                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 rounded-lg transition-all"
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Emoji Picker */}
              <AnimatePresence>
                {showEmojiPicker && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-16 right-4 bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20"
                  >
                    <div className="grid grid-cols-8 gap-2">
                      {['😀', '😂', '😍', '🥰', '😊', '😎', '🤔', '😴', '🎉', '👍', '❤️', '🔥', '💯', '✨', '🎵', '🚀'].map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => {
                            setMessage(prev => prev + emoji);
                            setShowEmojiPicker(false);
                          }}
                          className="text-xl hover:bg-white/10 rounded p-1 transition-colors"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        ) : (
          /* No Chat Selected */
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-12 h-12 text-white/40" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 font-space">Select a conversation</h3>
              <p className="text-white/70">Choose from your existing conversations or start a new one</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};