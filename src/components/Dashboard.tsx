import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { 
  Rocket, TrendingUp, BookOpen, CheckSquare, Compass, Play, Sun, Moon, Bell,
  Activity, Zap, Clock
} from 'lucide-react';

const consistencyData = [
  { day: 'Mon', hours: 0 },
  { day: 'Tue', hours: 2 },
  { day: 'Wed', hours: 1.5 },
  { day: 'Thu', hours: 4 },
  { day: 'Fri', hours: 3 },
  { day: 'Sat', hours: 6 },
  { day: 'Sun', hours: 4 },
];

interface DashboardProps {
  setCurrentView: (view: string) => void;
  toggleLightMode?: () => void;
  isLightMode?: boolean;
}

export function Dashboard({ setCurrentView, toggleLightMode, isLightMode }: DashboardProps) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-12 text-primary font-sans">
      
      {/* Top Header Navigation */}
      <header className="flex flex-col md:flex-row justify-between items-start pt-4 pb-10 w-full gap-y-6">
        <div className="flex flex-col">
          <h2 className="text-6xl md:text-7xl font-black text-primary tracking-tighter uppercase leading-none">
            DASHBOARD
          </h2>
          <p className="text-[#3B82F6] text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mt-4 ml-1 mb-8">
            HIGH-FIDELITY LEARNING ENVIRONMENT
          </p>

          {/* Welcome Message Area */}
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 w-full ml-1">
            <h2 className="text-2xl md:text-[32px] font-black text-primary tracking-tight uppercase leading-none">
              WELCOME BACK, <span className="text-[#2563EB]">HUSSEIN.</span>
            </h2>
            <span className="text-slate-500 text-[10px] md:text-xs uppercase font-bold tracking-[0.15em] ml-2 md:ml-3 relative md:top-[-2px]">
              SATURDAY, APRIL 18
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-5 mt-2 shrink-0">
          <div className="flex items-center space-x-3">
            <button 
              onClick={toggleLightMode}
              className="w-10 h-10 rounded-full bg-transparent border border-slate-700/50 flex items-center justify-center text-amber-500 hover:bg-slate-800 cursor-pointer transition-colors"
            >
              {isLightMode ? <Moon className="w-4 h-4 text-[#3B82F6]" /> : <Sun className="w-4 h-4" />}
            </button>
            <button className="relative w-10 h-10 rounded-full bg-transparent border border-slate-700/50 flex items-center justify-center text-secondary hover:bg-slate-800 hover:text-primary cursor-pointer transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-base"></span>
            </button>
          </div>
          
          <div className="w-px h-8 bg-slate-800/80 hidden sm:block"></div>
          
          <div 
            onClick={() => setCurrentView('profile')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-[#5C6BFA] flex items-center justify-center font-bold text-lg text-primary group-hover:ring-2 ring-[#5C6BFA]/50 transition-all">
              H
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-bold text-primary leading-tight group-hover:text-[#5C6BFA] transition-colors lowercase">hussein student</p>
              <p className="text-xs text-slate-500 mt-0.5 lowercase">hussein@student2026</p>
            </div>
          </div>
        </div>
      </header>

      {/* Quick-Launch Session */}
      <div className="bg-surface border border-divider rounded-2xl p-6 shadow-xl">
        <h3 className="text-sm font-bold text-primary flex items-center space-x-2 mb-6">
          <Rocket className="w-4 h-4 text-[#3B82F6]" />
          <span>Quick-Launch Session</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div className="md:col-span-1">
            <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-2">Course</label>
            <select className="w-full bg-base border border-divider text-primary text-sm rounded-lg px-4 py-3 appearance-none focus:outline-none focus:border-[#3B82F6] transition-colors cursor-pointer">
              <option>Internal Medicine</option>
            </select>
          </div>
          <div className="md:col-span-1">
            <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-2">Target Subject</label>
            <select className="w-full bg-base border border-divider text-primary text-sm rounded-lg px-4 py-3 appearance-none focus:outline-none focus:border-[#3B82F6] transition-colors cursor-pointer">
              <option>Cardiology</option>
            </select>
          </div>
          <div className="md:col-span-1">
            <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-2">Study Mode</label>
            <select className="w-full bg-base border border-divider text-primary text-sm rounded-lg px-4 py-3 appearance-none focus:outline-none focus:border-[#3B82F6] transition-colors cursor-pointer">
              <option>Question Bank (MCQ)</option>
            </select>
          </div>
          <div className="md:col-span-1">
            <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-2">Difficulty Filter</label>
            <select className="w-full bg-base border border-divider text-primary text-sm rounded-lg px-4 py-3 appearance-none focus:outline-none focus:border-[#3B82F6] transition-colors cursor-pointer">
              <option>Smart Blend (Recommended)</option>
            </select>
          </div>
          <div className="md:col-span-1">
            <button 
              onClick={() => setCurrentView('practice')}
              className="w-full bg-[#3B82F6] hover:bg-blue-600 text-primary font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors cursor-pointer border border-blue-400/30"
            >
              <span>Launch</span>
              <Play className="w-4 h-4 fill-current" />
            </button>
          </div>
        </div>
      </div>

      {/* Middle 3 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Study Consistency Chart (Col span 6) */}
        <div className="lg:col-span-6 bg-surface border border-divider rounded-2xl p-6 shadow-xl flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-sm font-bold text-primary flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-[#3B82F6]" />
                <span>Study Consistency</span>
              </h3>
              <div className="flex space-x-6 mt-4">
                <div>
                  <p className="text-[10px] text-muted uppercase tracking-wider mb-1">Studied</p>
                  <p className="text-2xl font-bold text-primary">28h</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted uppercase tracking-wider mb-1">Avg Accuracy</p>
                  <p className="text-2xl font-bold text-emerald-400">84%</p>
                </div>
              </div>
            </div>
            <div className="flex bg-base rounded-lg p-1 border border-divider">
              <button className="px-3 py-1 text-xs font-bold bg-[#3B82F6] text-primary rounded-md cursor-pointer">1W</button>
              <button className="px-3 py-1 text-xs font-medium text-muted hover:text-primary cursor-pointer">1M</button>
              <button className="px-3 py-1 text-xs font-medium text-muted hover:text-primary cursor-pointer">ALL</button>
            </div>
          </div>
          <div className="flex-1 min-h-[200px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={consistencyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} domain={[0, 10]} ticks={[0, 5, 10]} tickFormatter={(val) => `${val}h`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#3B82F6', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                  labelStyle={{ color: '#64748b' }}
                />
                <defs>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                <Line 
                  type="monotone" 
                  dataKey="hours" 
                  stroke="#3B82F6" 
                  strokeWidth={4} 
                  dot={{ r: 4, fill: '#0B0F19', stroke: '#3B82F6', strokeWidth: 2 }} 
                  activeDot={{ r: 6, fill: '#3B82F6', stroke: '#fff', strokeWidth: 2 }}
                  filter="url(#glow)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active Modules (Col span 3) */}
        <div className="lg:col-span-3 bg-surface border border-divider rounded-2xl p-6 shadow-xl">
          <h3 className="text-sm font-bold text-primary flex items-center space-x-2 mb-6">
            <BookOpen className="w-4 h-4 text-[#3B82F6]" />
            <span>Active Modules</span>
          </h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="font-bold text-primary">Cardiology</span>
                <span className="text-muted">85%</span>
              </div>
              <div className="w-full bg-base rounded-full h-1.5 border border-divider">
                <div className="bg-[#3B82F6] h-1.5 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="font-bold text-primary">Neurology</span>
                <span className="text-muted">60%</span>
              </div>
              <div className="w-full bg-base rounded-full h-1.5 border border-divider">
                <div className="bg-[#3B82F6] h-1.5 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="font-bold text-primary">Pharmacology</span>
                <span className="text-muted">35%</span>
              </div>
              <div className="w-full bg-base rounded-full h-1.5 border border-divider">
                <div className="bg-[#0ea5e9] h-1.5 rounded-full" style={{ width: '35%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="font-bold text-primary">Pathology</span>
                <span className="text-muted">12%</span>
              </div>
              <div className="w-full bg-base rounded-full h-1.5 border border-divider">
                <div className="bg-slate-600 h-1.5 rounded-full" style={{ width: '12%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Action Items (Col span 3) */}
        <div className="lg:col-span-3 bg-surface border border-divider rounded-2xl p-6 shadow-xl">
          <h3 className="text-sm font-bold text-primary flex items-center space-x-2 mb-6">
            <CheckSquare className="w-4 h-4 text-[#3B82F6]" />
            <span>Daily Action Items</span>
          </h3>
          
          <div className="space-y-3">
            {[
              { title: 'Review Flashcards', desc: '150 cards due today' },
              { title: 'Cardio Mock Exam', desc: '40 Questions, Timed' },
              { title: 'Read Patho Chapter 4', desc: 'Inflammation & Repair' }
            ].map((item, i) => (
              <div key={i} className="flex items-start space-x-3 p-3 rounded-lg bg-base border border-divider hover:border-[#3B82F6]/50 transition-colors cursor-pointer group">
                <div className="mt-0.5 w-4 h-4 rounded border border-slate-500 group-hover:border-[#3B82F6]"></div>
                <div>
                  <p className="text-sm font-bold text-slate-200 group-hover:text-primary transition-colors">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recommended Course Banner */}
      <div className="bg-surface border border-divider rounded-2xl p-6 shadow-xl flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="w-16 h-16 rounded-2xl bg-base border border-divider flex items-center justify-center">
            <Compass className="w-8 h-8 text-[#3B82F6]" />
          </div>
          <div>
            <div className="flex items-center space-x-2 text-[#3B82F6] mb-1">
              <Zap className="w-3 h-3 fill-current" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Recommended Course</span>
            </div>
            <h3 className="text-xl font-bold text-primary">Internal Medicine <span className="text-muted font-normal text-sm">by QuickMed</span></h3>
            <p className="text-sm text-muted mt-1">High-yield clinical integration targeting your weakest modules.</p>
          </div>
        </div>
        <button className="bg-white text-[#0B0F19] font-bold px-6 py-3 rounded-xl flex items-center space-x-2 hover:bg-slate-200 transition-colors cursor-pointer">
          <span>Explore Course</span>
          <span>→</span>
        </button>
      </div>

      {/* More Top Courses */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-primary">More Top Courses</h3>
          <button className="text-[#3B82F6] text-sm font-bold hover:underline cursor-pointer">View Collection →</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {[
            { title: 'Pediatrics Basics', author: 'QuickMed', modules: 40, image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400&h=250', color: 'text-indigo-400' },
            { title: 'Advanced Surgery', author: 'MedElite', modules: 62, image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=400&h=250', color: 'text-blue-400' },
            { title: 'OBGYN Series', author: 'Dr. Rivers', modules: 85, image: 'https://images.unsplash.com/photo-1631815587646-b85a1bb027af?auto=format&fit=crop&q=80&w=400&h=250', color: 'text-emerald-400' },
            { title: 'Emergency Focus', author: 'QuickMed', modules: 120, image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=400&h=250', color: 'text-rose-400' },
          ].map((course, i) => (
            <div key={i} className="bg-surface border border-divider rounded-2xl overflow-hidden hover:border-[#3B82F6]/50 transition-all cursor-pointer group shadow-lg">
              <div className="h-32 bg-base flex items-center justify-center border-b border-divider relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent z-10"></div>
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out opacity-80"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 relative z-20">
                <h4 className="font-bold text-sm text-primary mb-1 group-hover:text-[#3B82F6] transition-colors">{course.title}</h4>
                <p className="text-xs text-slate-500">By {course.author} • {course.modules} Modules</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
