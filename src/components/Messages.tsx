import React, { useState } from 'react';
import { Search, MoreVertical, Phone, Video, Send, Settings, User, CheckCircle2, Shield, GraduationCap, Mic, Image as ImageIcon } from 'lucide-react';

const contacts = [
  {
    id: '1',
    name: 'Dr. Sarah Jenkins',
    role: 'Instructor',
    roleIcon: GraduationCap,
    avatar: 'SJ',
    status: 'online',
    lastMessage: 'Your recent test results look excellent.',
    time: '10:42 AM',
    unread: 2,
    color: 'bg-emerald-500',
  },
  {
    id: '2',
    name: 'Admin Support Team',
    role: 'Admin',
    roleIcon: Shield,
    avatar: 'AS',
    status: 'offline',
    lastMessage: 'The platform maintenance is scheduled for...',
    time: 'Yesterday',
    unread: 0,
    color: 'bg-rose-500',
  },
  {
    id: '3',
    name: 'Prof. Michael Chen',
    role: 'Instructor',
    roleIcon: GraduationCap,
    avatar: 'MC',
    status: 'online',
    lastMessage: 'Let me clear up that cardiovascular question.',
    time: 'Tuesday',
    unread: 0,
    color: 'bg-indigo-500',
  },
  {
    id: '4',
    name: 'Curriculum Director',
    role: 'Admin',
    roleIcon: Shield,
    avatar: 'CD',
    status: 'away',
    lastMessage: 'New module has been unlocked for you.',
    time: 'Monday',
    unread: 0,
    color: 'bg-amber-500',
  }
];

const initialMessages = [
  { id: 1, sender: 'them', text: 'Hi there! I reviewed your last practice exam. You did very well on the cardiology section.', time: '10:30 AM' },
  { id: 2, sender: 'me', text: 'Thank you Dr. Jenkins! I spent a lot of extra time reviewing arrhythmias.', time: '10:35 AM' },
  { id: 3, sender: 'them', text: 'It shows. Let me know if you need any supplemental reading material for the pulmonary module.', time: '10:41 AM' },
  { id: 4, sender: 'them', text: 'Your recent test results look excellent.', time: '10:42 AM' },
];

export function Messages() {
  const [activeContactId, setActiveContactId] = useState('1');
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState(initialMessages);

  const activeContact = contacts.find(c => c.id === activeContactId) || contacts[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: 'me',
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setMessageText('');
  };

  return (
    <div className="max-w-[1600px] mx-auto h-[calc(100vh-140px)] flex flex-col font-sans mb-8">
      
      {/* Messages Layout Container */}
      <div className="flex-1 rounded-2xl border border-divider bg-surface overflow-hidden flex shadow-lg">
        
        {/* Left Side: Contacts List */}
        <div className="w-full md:w-[320px] lg:w-[380px] border-r border-divider flex flex-col bg-base">
          
          {/* Header */}
          <div className="p-4 border-b border-divider">
            <h2 className="text-xl font-bold tracking-wide text-primary uppercase mb-4 flex items-center justify-between">
              Messages
              <button className="text-muted hover:text-primary transition-colors cursor-pointer p-1">
                <Settings className="w-5 h-5" />
              </button>
            </h2>
            <div className="relative">
              <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search instructors or admins..." 
                className="w-full bg-surface border border-divider text-sm text-slate-200 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-[#3B82F6] transition-colors"
              />
            </div>
          </div>

          {/* Contacts List */}
          <div className="flex-1 overflow-y-auto">
            {contacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => setActiveContactId(contact.id)}
                className={`w-full p-4 flex items-start space-x-4 border-b border-divider transition-colors cursor-pointer text-left ${
                  activeContactId === contact.id ? 'bg-surface-hover/50 border-l-2 border-l-[#3B82F6]' : 'hover:bg-surface-hover/30 border-l-2 border-l-transparent'
                }`}
              >
                <div className="relative flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full ${contact.color} text-primary flex items-center justify-center font-bold text-lg`}>
                    {contact.avatar}
                  </div>
                  {contact.status === 'online' && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-base"></div>
                  )}
                  {contact.status === 'away' && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-amber-500 rounded-full border-2 border-base"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-slate-200 truncate pr-2">{contact.name}</h3>
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider flex-shrink-0">{contact.time}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 mb-1 text-[10px] font-bold uppercase tracking-wider text-[#3B82F6]">
                    <contact.roleIcon className="w-3 h-3" />
                    <span>{contact.role}</span>
                  </div>
                  <p className={`text-sm truncate ${contact.unread > 0 ? 'text-primary font-medium' : 'text-muted'}`}>
                    {contact.lastMessage}
                  </p>
                </div>

                {contact.unread > 0 && (
                  <div className="bg-[#3B82F6] text-primary text-xs font-bold w-5 h-5 rounded-full flex flex-shrink-0 items-center justify-center mt-6">
                    {contact.unread}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Chat Window */}
        <div className="hidden md:flex flex-1 flex-col bg-surface">
          
          {/* Chat Header */}
          <div className="h-20 border-b border-divider flex justify-between items-center px-6 bg-base">
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 rounded-xl ${activeContact.color} text-primary flex items-center justify-center font-bold`}>
                {activeContact.avatar}
              </div>
              <div>
                <h3 className="font-bold text-lg text-primary">{activeContact.name}</h3>
                <div className="flex items-center space-x-2 text-xs text-muted font-medium">
                  <activeContact.roleIcon className="w-3.5 h-3.5" />
                  <span>{activeContact.role}</span>
                  <span>•</span>
                  <span className={activeContact.status === 'online' ? 'text-emerald-500' : 'text-slate-500'}>
                    {activeContact.status === 'online' ? 'Active Now' : capitalize(activeContact.status)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 text-muted">
              <button className="p-2 hover:bg-surface-hover rounded-lg transition-colors cursor-pointer hidden lg:block">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-surface-hover rounded-lg transition-colors cursor-pointer hidden lg:block">
                <Video className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-surface-hover rounded-lg transition-colors cursor-pointer">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="flex justify-center mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-base border border-divider px-3 py-1 rounded-full">
                Today
              </span>
            </div>
            
            {messages.map((message) => {
              const isMe = message.sender === 'me';
              return (
                <div key={message.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  {!isMe && (
                    <div className={`w-8 h-8 rounded-full ${activeContact.color} text-primary flex items-center justify-center font-bold text-xs mr-3 flex-shrink-0 mt-auto`}>
                      {activeContact.avatar}
                    </div>
                  )}
                  
                  <div className={`max-w-[75%] lg:max-w-[60%] flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <div 
                      className={`px-5 py-3 rounded-2xl ${
                        isMe 
                          ? 'bg-[#3B82F6] text-primary rounded-br-sm' 
                          : 'bg-surface-hover text-slate-200 rounded-bl-sm'
                      }`}
                    >
                      <p className="text-sm md:text-base leading-relaxed">{message.text}</p>
                    </div>
                    <div className="flex items-center space-x-1 mt-1.5 text-[10px] text-slate-500 font-bold tracking-wider uppercase">
                      <span>{message.time}</span>
                      {isMe && <CheckCircle2 className="w-3 h-3 text-[#3B82F6]" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chat Input Area */}
          <div className="p-4 bg-base border-t border-divider">
            <form 
              onSubmit={handleSendMessage}
              className="flex items-center space-x-3 bg-surface border border-divider rounded-xl p-2 pr-3"
            >
              <button type="button" className="p-2 text-muted hover:text-primary transition-colors cursor-pointer rounded-lg hover:bg-surface-hover">
                <ImageIcon className="w-5 h-5" />
              </button>
              
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-transparent border-none focus:outline-none text-primary text-sm"
              />
              
              {messageText.trim() ? (
                <button type="submit" className="p-2 bg-[#3B82F6] text-primary rounded-lg hover:bg-blue-600 transition-colors cursor-pointer shadow-lg shadow-blue-500/20">
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              ) : (
                <button type="button" className="p-2 text-muted hover:text-primary transition-colors cursor-pointer rounded-lg hover:bg-surface-hover">
                  <Mic className="w-5 h-5" />
                </button>
              )}
            </form>
            <div className="text-center mt-2">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Messages are secure and encrypted.</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
