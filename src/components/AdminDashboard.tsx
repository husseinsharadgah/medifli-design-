import { useState } from 'react';
import { 
  Users, Database, FileText, CheckCircle2, 
  BarChart3, Activity, FolderTree, LogOut, Settings,
  MessageSquare, UsersRound, DollarSign, List, HeadphonesIcon, Settings2, Moon, Sun, ChevronLeft
} from 'lucide-react';
import { DustBackground } from './DustBackground';

export function AdminDashboard({ onExit, isLightMode, toggleLightMode }: { onExit: () => void, isLightMode: boolean, toggleLightMode: () => void }) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'OVERVIEW', icon: List },
    { id: 'students', label: 'STUDENTS', icon: UsersRound },
    { id: 'instructors', label: 'INSTRUCTORS', icon: Users },
    { id: 'content', label: 'CONTENT EDITOR', icon: FileText },
    { id: 'revenue', label: 'REVENUE', icon: DollarSign },
    { id: 'logs', label: 'LOGS', icon: Database },
    { id: 'messages', label: 'MESSAGES', icon: MessageSquare },
    { id: 'feedback', label: 'FEEDBACK', icon: HeadphonesIcon },
    { id: 'health', label: 'SYSTEM HEALTH', icon: Activity },
    { id: 'users', label: 'USER MANAGEMENT', icon: UsersRound },
    { id: 'backups', label: 'BACKUPS', icon: Settings2 },
    { id: 'settings', label: 'SETTINGS', icon: Settings },
  ] as const;

  return (
    <div className="flex h-screen bg-base text-primary font-sans overflow-hidden hide-scrollbar relative">
      <div className="absolute inset-0 z-0">
        <DustBackground isLightMode={isLightMode} />
      </div>
      
      {/* Admin Sidebar */}
      <aside className="w-72 bg-surface/30 backdrop-blur-md flex flex-col flex-shrink-0 border-r border-divider/50 z-20 relative">
        <div className="p-6 flex items-center space-x-3 mb-4">
          <div className="bg-[#f43f5e] w-10 h-10 rounded flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <h1 className="text-xl font-bold tracking-wider uppercase text-primary flex-1">ADMINOS</h1>
          <button onClick={onExit} className="w-8 h-8 flex items-center justify-center rounded bg-surface hover:bg-surface-hover border border-divider transition">
            <ChevronLeft className="w-5 h-5 text-muted" />
          </button>
        </div>
        
        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-4 px-4 py-3.5 rounded-xl transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#f43f5e] text-white'
                  : 'text-muted hover:bg-surface hover:text-primary'
              }`}
            >
              <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-white' : 'text-muted'}`} />
              <span className="text-xs font-bold tracking-widest">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <button 
            onClick={onExit} 
            className="w-full flex items-center space-x-4 px-4 py-3.5 rounded-xl text-muted hover:bg-surface hover:text-primary transition-colors cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-xs font-bold tracking-widest">LOGOUT</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-y-auto relative p-8 lg:p-12 no-scrollbar z-10 bg-transparent">
        
        <header className="flex justify-between items-start mb-12">
          <div>
            <h2 className="text-6xl font-black text-primary tracking-widest uppercase shadow-sm">
              {tabs.find(t => t.id === activeTab)?.label}
            </h2>
            <p className="text-[#f43f5e] text-[10px] font-bold tracking-[0.4em] uppercase mt-4">
              Superior Command Interface
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <button onClick={toggleLightMode} className="w-10 h-10 rounded-full bg-surface/80 border border-divider flex items-center justify-center hover:bg-surface-hover transition cursor-pointer">
              {isLightMode ? (
                <Moon className="w-5 h-5 text-indigo-500" />
              ) : (
                <Sun className="w-5 h-5 text-[#fbbf24]" />
              )}
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#f43f5e] flex items-center justify-center text-white font-bold shadow-lg shadow-rose-500/20">
                H
              </div>
              <div>
                <p className="text-sm font-bold text-primary leading-none">Hussein Nabil Sharadgah</p>
                <p className="text-xs text-muted mt-1">hnhsh3@gmail.com</p>
              </div>
            </div>
          </div>
        </header>

        {activeTab === 'overview' && (
          <div className="space-y-8 max-w-[1400px]">
            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-surface/50 backdrop-blur-md rounded-[2rem] p-8 border border-divider/50 shadow-lg">
                <p className="text-[10px] font-bold tracking-widest text-muted uppercase mb-4">Total Revenue</p>
                <div className="flex flex-col space-y-4">
                  <h3 className="text-4xl font-bold text-primary">JOD 4,545</h3>
                  <div className="flex justify-end">
                    <span className="text-emerald-500 text-xs font-bold">163 paid</span>
                  </div>
                </div>
              </div>
              <div className="bg-surface/50 backdrop-blur-md rounded-[2rem] p-8 border border-divider/50 shadow-lg">
                <p className="text-[10px] font-bold tracking-widest text-muted uppercase mb-4">Active Students</p>
                <div className="flex flex-col space-y-4">
                  <h3 className="text-4xl font-bold text-primary">115</h3>
                  <div className="flex justify-end">
                    <span className="text-blue-500 text-xs font-bold">128 total users</span>
                  </div>
                </div>
              </div>
              <div className="bg-surface/50 backdrop-blur-md rounded-[2rem] p-8 border border-divider/50 shadow-lg">
                <p className="text-[10px] font-bold tracking-widest text-muted uppercase mb-4">Active Courses</p>
                <div className="flex flex-col space-y-4">
                  <h3 className="text-4xl font-bold text-primary">9</h3>
                  <div className="flex justify-end">
                    <span className="text-indigo-500 text-xs font-bold">9 total</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Recent Enrollments */}
              <div className="xl:col-span-2 bg-surface/50 backdrop-blur-md rounded-[2rem] p-8 border border-divider/50 shadow-lg">
                <h3 className="text-xl font-bold text-primary mb-8 tracking-wide">RECENT ENROLLMENTS</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Mohammad Ali', course: 'INTERNAL MEDICINE', price: '$50', time: '53m ago' },
                    { name: 'Mohammad Abuain', course: 'INTERNAL MEDICINE', price: '$50', time: '2h ago' },
                    { name: 'Kareem abu odeh', course: 'INTERNAL MEDICINE', price: '$50', time: '10h ago' },
                    { name: 'هبه الله شريف احمد العايدي', course: 'INTERNAL MEDICINE', price: '$50', time: '21h ago' },
                    { name: 'mohamadnsearat', course: 'INTERNAL MEDICINE', price: '$50', time: '1d ago' },
                  ].map((enrollment, i) => (
                    <div key={i} className="bg-base/50 rounded-2xl p-6 flex items-center justify-between border border-divider/30">
                      <div className="flex items-center space-x-4">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                        <div>
                          <p className="text-sm font-bold text-primary uppercase tracking-wide">ENROLLMENT ACTIVE</p>
                          <p className="text-xs text-muted mt-1">{enrollment.name} • <span className="uppercase">{enrollment.course}</span></p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-emerald-500 font-bold text-sm tracking-wide">{enrollment.price}</p>
                        <p className="text-xs text-muted mt-1">{enrollment.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Infrastructure */}
              <div className="bg-surface/50 backdrop-blur-md rounded-[2rem] p-8 border border-divider/50 shadow-lg">
                <h3 className="text-xl font-bold text-primary mb-8 tracking-wide">INFRASTRUCTURE</h3>
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between text-[10px] font-bold text-muted tracking-widest mb-3">
                      <span>CPU LOAD</span>
                      <span className="text-primary">0%</span>
                    </div>
                    <div className="h-2 w-full bg-base rounded-full overflow-hidden border border-divider/20">
                      <div className="h-full bg-slate-600 rounded-full w-0"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] font-bold text-muted tracking-widest mb-3">
                      <span>MEMORY USAGE</span>
                      <span className="text-primary">10%</span>
                    </div>
                    <div className="h-2 w-full bg-base rounded-full overflow-hidden border border-divider/20">
                      <div className="h-full bg-blue-500 rounded-full w-[10%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] font-bold text-muted tracking-widest mb-3">
                      <span>UPTIME (11H)</span>
                      <span className="text-primary">46%</span>
                    </div>
                    <div className="h-2 w-full bg-base rounded-full overflow-hidden border border-divider/20">
                      <div className="h-full bg-indigo-500 rounded-full w-[46%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] font-bold text-muted tracking-widest mb-3">
                      <span>ACTIVE SESSIONS (151)</span>
                      <span className="text-primary">100%</span>
                    </div>
                    <div className="h-2 w-full bg-base rounded-full overflow-hidden border border-divider/20">
                      <div className="h-full bg-emerald-500 rounded-full w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
