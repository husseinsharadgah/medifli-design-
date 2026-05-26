import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { 
  TrendingUp, BookOpen, CheckSquare, Compass, Play, Sun, Moon, Bell,
  Activity, Zap, Clock, Rocket, Book, MapPin, ArrowRight
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

      {/* Current Course Interactive Banner - Alternative Design */}
      <div className="relative w-full rounded-[2rem] overflow-hidden bg-[#0A0E17] p-8 md:p-12 shadow-2xl mb-8 border border-white/[0.05] group">
        {/* Course Background Pathology UGS Picture */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden rounded-[2rem]">
          <img 
            src="https://images.unsplash.com/photo-1579154204601-01588f351167?auto=format&fit=crop&q=80&w=1600&h=800" 
            alt="Urogenital Pathology Medical System" 
            className="w-full h-full object-cover opacity-[0.22] mix-blend-luminosity brightness-[50%] saturate-[110%] group-hover:scale-[1.04] transition-transform duration-[1200ms] ease-out"
            referrerPolicy="no-referrer"
          />
          {/* Medical cellular micro overlay representing kidney system nephrons */}
          <img 
            src="https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=1200&h=600" 
            alt="UGS Kidney Glomerulus Cell Microscopy" 
            className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-[0.12] mix-blend-screen"
            style={{ 
              maskImage: 'linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))',
              WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))'
            }}
            referrerPolicy="no-referrer"
          />
          {/* Subtle vignette gradient and darkness safety overlay for stellar text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/85 to-[#0A0E17]/40"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E17] via-[#0A0E17]/95 to-[#0A0E17]/30"></div>
        </div>

        {/* Abstract Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/15 rounded-full blur-[100px] pointer-events-none transition-transform duration-[1500ms] group-hover:scale-[1.2]"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none transition-transform duration-[1500ms] group-hover:scale-[1.2]"></div>
        
        {/* Delicate Dot Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-40 z-0 pointer-events-none"
          style={{ 
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            maskImage: 'linear-gradient(to bottom right, rgba(0,0,0,1), rgba(0,0,0,0))',
            WebkitMaskImage: 'linear-gradient(to bottom right, rgba(0,0,0,1), rgba(0,0,0,0))'
          }}
        ></div>

        <div className="relative z-10 flex flex-col xl:flex-row items-center justify-between gap-12">
          {/* Left Side: Course Info */}
          <div className="flex-1 space-y-8 w-full xl:w-auto">
            <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] leading-none">QuickMed Academy</span>
            </div>
            
            <div className="space-y-3">
              <h2 className="text-4xl sm:text-[64px] font-black text-white leading-[1.05] tracking-tighter">
                Pathology<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">UGS Learning.</span>
              </h2>
              <p className="text-slate-400 font-medium text-base sm:text-lg tracking-wide max-w-xl">
                Master systemic pathology with comprehensive visual modules and integrated clinical scenarios.
              </p>
            </div>
            
            {/* Quick Stat Badges */}
            <div className="flex flex-wrap items-center gap-3">
              {[
                { icon: Play, text: '26 Videos' },
                { icon: Book, text: '6 Modules' },
                { icon: Activity, text: '15% Completed' }
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-center space-x-2 bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-2.5 hover:bg-white/[0.06] transition-colors">
                  <stat.icon className="w-4 h-4 text-slate-400" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-300">{stat.text}</span>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => setCurrentView('course-resume')}
              className="bg-white text-[#0A0E17] hover:bg-slate-200 font-black py-4 px-10 rounded-xl flex items-center space-x-3 transition-all transform active:scale-95 uppercase text-xs tracking-[0.15em] mt-4 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              <span>Resume Session</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Side: Glass Stats Modules */}
          <div className="w-full xl:w-[460px] shrink-0 space-y-5 relative z-10">
             
            {/* Main Progress Glass Card */}
            <div className="bg-white/[0.02] backdrop-blur-3xl rounded-3xl border border-white/[0.08] p-7 shadow-2xl space-y-7 relative overflow-hidden group/card hover:bg-white/[0.04] transition-colors">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
              
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-blue-400 font-bold uppercase tracking-[0.2em] mb-1.5 flex items-center space-x-2">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Active Course</span>
                  </p>
                  <h3 className="text-white text-xl sm:text-2xl font-bold tracking-tight shrink-0">Pathology UGS</h3>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-1.5 flex items-center justify-end space-x-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>Progress</span>
                  </p>
                  <span className="text-3xl font-black text-emerald-400 leading-none tracking-tight">15%</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/[0.05]">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full w-[15%] relative shadow-[0_0_10px_rgba(52,211,153,0.5)]">
                    <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/30 blur-[2px]"></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Total', value: '26' },
                  { label: 'Watched', value: '4' },
                  { label: 'Left', value: '22', highlight: true }
                ].map((item, i) => (
                  <div key={i} className="bg-black/20 rounded-2xl p-4 flex flex-col items-center justify-center border border-white/[0.03] backdrop-blur-sm transition-colors hover:bg-black/30 cursor-default">
                    <span className={`text-2xl font-black leading-none mb-1.5 ${item.highlight ? 'text-white' : 'text-slate-300'}`}>{item.value}</span>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em]">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ranking Details Glass Card */}
            <div className="bg-white/[0.02] backdrop-blur-3xl rounded-3xl border border-white/[0.08] p-6 shadow-2xl relative overflow-hidden group/card hover:bg-white/[0.04] transition-colors flex items-center justify-between">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity pb-[1px]"></div>
              
              <div className="space-y-1.5">
                <h4 className="text-slate-300 text-xs font-bold uppercase tracking-[0.15em] flex items-center space-x-2">
                  <Rocket className="w-4 h-4 text-emerald-400" />
                  <span>Leaderboard Rank</span>
                </h4>
                <p className="text-[10px] text-slate-500 tracking-wide font-medium">You are in the top 5%</p>
              </div>
              
              <div className="flex items-baseline space-x-1.5">
                <span className="text-slate-500 text-lg font-black uppercase tracking-wider">#</span>
                <span className="text-4xl font-black text-white leading-none tracking-tighter">1</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] ml-1">/ 52</span>
              </div>
            </div>

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
