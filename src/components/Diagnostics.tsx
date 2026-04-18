import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis 
} from 'recharts';
import { 
  BrainCircuit, Activity, TrendingUp, AlertTriangle, 
  Target, Zap, Network, Clock, ShieldCheck, Sparkles,
  RotateCcw, CalendarClock, ArrowRight
} from 'lucide-react';

const retentionData = [
  { day: 'Day 1', retention: 100, threshold: 70 },
  { day: 'Day 2', retention: 85, threshold: 70 },
  { day: 'Day 3', retention: 75, threshold: 70 },
  { day: 'Day 4', retention: 65, threshold: 70 }, // Drops below, review happens
  { day: 'Day 4 (Review)', retention: 100, threshold: 70 },
  { day: 'Day 7', retention: 90, threshold: 70 },
  { day: 'Day 10', retention: 82, threshold: 70 },
  { day: 'Day 14', retention: 76, threshold: 70 },
  { day: 'Day 18', retention: 71, threshold: 70 },
  { day: 'Day 20', retention: 68, threshold: 70 }, // Drops below, review happens
  { day: 'Day 20 (Review)', retention: 100, threshold: 70 },
  { day: 'Day 30', retention: 92, threshold: 70 },
];

const microSkills = [
  { name: 'Derivatives (Chain Rule)', score: 94, status: 'Optimized', color: 'bg-emerald-500' },
  { name: 'Integration by Parts', score: 42, status: 'Critical', color: 'bg-rose-500' },
  { name: 'Limits & Continuity', score: 78, status: 'Stable', color: 'bg-blue-500' },
  { name: 'Optimization Problems', score: 65, status: 'Learning', color: 'bg-amber-500' },
  { name: 'Related Rates', score: 58, status: 'Learning', color: 'bg-amber-500' },
];

const spacedRepetitionQueue = [
  { topic: 'Integration by Parts', subject: 'Calculus', retention: 68, status: 'Critical Decay', due: 'Due Now', action: 'Flashcards (10m)' },
  { topic: 'Kinematics Equations', subject: 'Physics', retention: 72, status: 'Approaching Threshold', due: 'In 4 hours', action: 'MCQ Drill (15m)' },
  { topic: 'Cellular Respiration', subject: 'Biology', retention: 75, status: 'Stable Decay', due: 'Tomorrow', action: 'Fill-in-Blank (5m)' },
  { topic: 'Vector Addition', subject: 'Physics', retention: 88, status: 'Consolidated', due: 'In 3 days', action: 'Review Quiz (20m)' },
];

const radarData = [
  { subject: 'Conceptual', A: 90, fullMark: 100 },
  { subject: 'Application', A: 65, fullMark: 100 },
  { subject: 'Calculation', A: 95, fullMark: 100 },
  { subject: 'Speed', A: 85, fullMark: 100 },
  { subject: 'Stamina', A: 70, fullMark: 100 },
  { subject: 'Accuracy', A: 88, fullMark: 100 },
];

export function Diagnostics() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <header className="flex justify-between items-end">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Deep Diagnostic Engine</h2>
            <span className="flex items-center space-x-1 bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              <span>Self-Optimizing</span>
            </span>
          </div>
          <p className="text-slate-500">Real-time analysis of your cognitive patterns, retention rates, and micro-skills.</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">Engine Status</p>
          <div className="flex items-center space-x-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
            <Activity className="w-4 h-4 animate-pulse" />
            <span className="text-sm font-bold">Calibrated & Tracking</span>
          </div>
        </div>
      </header>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Overall Mastery', value: '84.2%', sub: '+2.1% this week', icon: Target, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Learning Velocity', value: 'High', sub: 'Top 12% of peers', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Memory Retention', value: '91%', sub: 'Optimal spacing', icon: BrainCircuit, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Exam Readiness', value: '78%', sub: 'Projected Score: A-', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2.5 rounded-xl ${kpi.bg}`}>
                <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{kpi.value}</p>
              <p className="text-sm font-medium text-slate-500 mt-1">{kpi.label}</p>
              <p className="text-xs text-slate-400 mt-2">{kpi.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AI Behavioral Insights */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold flex items-center space-x-2">
                  <Network className="w-6 h-6 text-indigo-400" />
                  <span>Behavioral Insights</span>
                </h3>
                <span className="text-xs font-mono text-indigo-300 bg-indigo-900/50 px-3 py-1 rounded-full border border-indigo-700/50">
                  AUTO-GENERATED
                </span>
              </div>

              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex items-start space-x-4">
                  <div className="bg-amber-500/20 p-2 rounded-lg mt-1">
                    <Clock className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-100 mb-1">Hesitation Pattern Detected</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      You spend 40% more time on <span className="text-white font-medium">Geometry (Spatial Reasoning)</span> questions before selecting the correct answer. The adaptive engine will now inject more low-difficulty spatial questions to build your intuitive speed and confidence.
                    </p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex items-start space-x-4">
                  <div className="bg-rose-500/20 p-2 rounded-lg mt-1">
                    <AlertTriangle className="w-5 h-5 text-rose-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-rose-100 mb-1">Second-Guessing Anomaly</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      In the last 3 sessions, you changed your initial answer from correct to incorrect 6 times in <span className="text-white font-medium">Chemistry</span>. Trust your first instinct. We have flagged these specific question types for review.
                    </p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex items-start space-x-4">
                  <div className="bg-emerald-500/20 p-2 rounded-lg mt-1">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-100 mb-1">Optimal Review Window Approaching</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Your projected retention for <span className="text-white font-medium">Integration by Parts</span> is dropping below the 70% threshold tomorrow. A 10-minute targeted review has been automatically scheduled in your Smart Adaptive queue.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cognitive Profile Radar */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Cognitive Profile</h3>
          <p className="text-sm text-slate-500 mb-6">Your test-taking attributes.</p>
          <div className="flex-1 min-h-[250px] -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Student" dataKey="A" stroke="#8b5cf6" strokeWidth={2} fill="#8b5cf6" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 bg-purple-50 p-4 rounded-xl border border-purple-100">
            <p className="text-sm text-purple-800 font-medium text-center">
              Strong calculation skills, but application of concepts needs work.
            </p>
          </div>
        </div>
      </div>

      {/* Spaced Repetition Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Forgetting Curve */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                <RotateCcw className="w-5 h-5 text-indigo-600" />
                <span>Knowledge Retention Curve</span>
              </h3>
              <p className="text-sm text-slate-500 mt-1">Ebbinghaus model tracking your memory decay and review spikes.</p>
            </div>
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
              <span>Retention %</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={retentionData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRetention" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[40, 100]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="threshold" stroke="#ef4444" strokeDasharray="5 5" fill="none" strokeWidth={2} />
                <Area type="monotone" dataKey="retention" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorRetention)" activeDot={{ r: 6, fill: '#4f46e5', stroke: '#fff', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-400 text-center mt-4">
            <span className="text-rose-500 font-bold">---</span> Red dashed line indicates the 70% forgetting threshold where reviews are triggered.
          </p>
        </div>

        {/* Spaced Repetition Action Queue */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                <CalendarClock className="w-5 h-5 text-rose-500" />
                <span>Review Queue</span>
              </h3>
              <p className="text-sm text-slate-500 mt-1">Topics decaying past the threshold.</p>
            </div>
          </div>

          <div className="space-y-4 flex-1">
            {spacedRepetitionQueue.map((item, i) => (
              <div key={i} className={`p-4 rounded-2xl border ${
                item.retention < 70 ? 'bg-rose-50 border-rose-100' : 
                item.retention < 80 ? 'bg-amber-50 border-amber-100' : 
                'bg-slate-50 border-slate-100'
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{item.topic}</h4>
                    <p className="text-xs text-slate-500">{item.subject}</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                    item.retention < 70 ? 'bg-rose-100 text-rose-700' : 
                    item.retention < 80 ? 'bg-amber-100 text-amber-700' : 
                    'bg-slate-200 text-slate-700'
                  }`}>
                    {item.retention}% Ret.
                  </span>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <span className={`text-xs font-medium flex items-center space-x-1 ${
                    item.due === 'Due Now' ? 'text-rose-600' : 'text-slate-500'
                  }`}>
                    <Clock className="w-3 h-3" />
                    <span>{item.due}</span>
                  </span>
                  
                  <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center space-x-1 transition-colors cursor-pointer">
                    <span>{item.action}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Micro-Skills Deep Dive */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Micro-Skill Health</h3>
            <p className="text-sm text-slate-500 mt-1">Granular breakdown of Calculus concepts.</p>
          </div>
          <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2 outline-none">
            <option>Calculus</option>
            <option>Physics</option>
            <option>Chemistry</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          {microSkills.map((skill, i) => (
            <div key={i}>
              <div className="flex justify-between items-end mb-2">
                <div>
                  <span className="font-bold text-slate-700 block">{skill.name}</span>
                  <span className={`text-xs font-bold uppercase tracking-wider ${
                    skill.status === 'Optimized' ? 'text-emerald-600' :
                    skill.status === 'Critical' ? 'text-rose-600' :
                    skill.status === 'Learning' ? 'text-amber-600' :
                    'text-blue-600'
                  }`}>
                    {skill.status}
                  </span>
                </div>
                <span className="text-slate-900 font-bold">{skill.score}/100</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className={`${skill.color} h-2.5 rounded-full transition-all duration-1000`} style={{ width: `${skill.score}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
