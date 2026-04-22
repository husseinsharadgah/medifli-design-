import { Calendar, Clock, Target, ChevronRight, Award, TrendingUp, Search, Filter, Zap, Brain, RotateCcw } from 'lucide-react';

const sessions = [
  { id: 1, date: 'Today, 2:30 PM', topic: 'Calculus: Integration by Parts', mode: 'Topic Drill', score: 85, time: '24m', improvement: '+5%', icon: Target, color: 'text-blue-600', bg: 'bg-blue-100' },
  { id: 2, date: 'Yesterday, 4:15 PM', topic: 'Physics: Kinematics', mode: 'Smart Adaptive', score: 92, time: '18m', improvement: '+2%', icon: Brain, color: 'text-purple-600', bg: 'bg-purple-100' },
  { id: 3, date: 'Mar 3, 10:00 AM', topic: 'Chemistry: Thermodynamics', mode: 'Review Mistakes', score: 100, time: '12m', improvement: '+15%', icon: RotateCcw, color: 'text-rose-600', bg: 'bg-rose-100' },
  { id: 4, date: 'Mar 2, 6:45 PM', topic: 'Biology: Cell Structure', mode: 'Speed Sprint', score: 78, time: '5m', improvement: '-2%', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-100' },
  { id: 5, date: 'Feb 28, 1:15 PM', topic: 'Algebra: Polynomials', mode: 'Topic Drill', score: 88, time: '30m', improvement: '+4%', icon: Target, color: 'text-blue-600', bg: 'bg-blue-100' },
  { id: 6, date: 'Feb 25, 9:00 AM', topic: 'Physics: Dynamics', mode: 'Smart Adaptive', score: 82, time: '45m', improvement: '+8%', icon: Brain, color: 'text-purple-600', bg: 'bg-purple-100' },
];

export function History() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Session History</h2>
          <p className="text-slate-500 mt-1">Review your past performance and track your learning velocity over time.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input 
              type="text" 
              placeholder="Search topics..." 
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-64 shadow-sm"
            />
          </div>
          <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-6 text-primary shadow-lg">
          <div className="flex items-center space-x-3 mb-4 opacity-80">
            <Clock className="w-5 h-5" />
            <span className="font-medium">Total Study Time</span>
          </div>
          <div className="text-4xl font-bold mb-1">42h 15m</div>
          <div className="text-indigo-200 text-sm">Top 15% this month</div>
        </div>
        
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-4 text-slate-500">
            <Award className="w-5 h-5 text-emerald-500" />
            <span className="font-medium">Average Score</span>
          </div>
          <div className="text-4xl font-bold text-slate-900 mb-1">86%</div>
          <div className="text-emerald-600 text-sm font-medium flex items-center space-x-1">
            <TrendingUp className="w-4 h-4" />
            <span>+4.2% vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-4 text-slate-500">
            <Target className="w-5 h-5 text-blue-500" />
            <span className="font-medium">Sessions Completed</span>
          </div>
          <div className="text-4xl font-bold text-slate-900 mb-1">128</div>
          <div className="text-slate-500 text-sm">12 this week</div>
        </div>
      </div>

      {/* History List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-900">Recent Sessions</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {sessions.map((session) => (
            <div key={session.id} className="p-6 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 group cursor-pointer">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-2xl ${session.bg} shrink-0`}>
                  <session.icon className={`w-6 h-6 ${session.color}`} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">{session.topic}</h4>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{session.date}</span>
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="font-medium text-slate-700">{session.mode}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{session.time}</span>
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between md:justify-end space-x-6 md:w-64 shrink-0">
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-900">{session.score}%</div>
                  <div className={`text-xs font-bold ${session.improvement.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {session.improvement}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                  <ChevronRight className="w-5 h-5 text-muted group-hover:text-indigo-600" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-center">
          <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
            Load More Sessions
          </button>
        </div>
      </div>
    </div>
  );
}
