import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ArrowLeft, Clock, Activity, ShieldAlert, Award,
  Flame, Layers, AlertCircle, CheckCircle, XCircle, Flag, Play,
  Volume2, FileText, BrainCircuit, Calendar, TrendingUp, ChevronRight,
  ArrowRight, LayoutDashboard, SlidersHorizontal, List,
  Target as TargetIcon, Sparkles, TrendingDown, BookOpen, Video, FileQuestion, BarChart2, Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  LineChart, Line, Cell, ReferenceLine, ScatterChart, Scatter, ZAxis
} from 'recharts';
import { DustBackground } from './DustBackground';

type SimulatorView = 'dashboard' | 'setup' | 'active-exam' | 'results' | 'review';

export function ExamSimulatorMode({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<SimulatorView>('dashboard');
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [examResult, setExamResult] = useState<any>(null);
  const [examConfig, setExamConfig] = useState<any>(null);

  const handleStartExam = (config: any) => {
    setExamConfig(config);
    setView('active-exam');
  };

  const handleFinishExam = (result: any) => {
    setExamResult(result);
    setView('results');
  };

  return (
    <div className="w-full h-full bg-transparent overflow-y-auto relative">
       <DustBackground />
       <AnimatePresence mode="wait">
        {view === 'dashboard' && (
          <motion.div key="db" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
             <ExamSimulatorDashboard 
               onSetup={(template) => { setSelectedTemplate(template); setView('setup'); }} 
               onBack={onBack} 
             />
          </motion.div>
        )}
        {view === 'setup' && (
          <motion.div key="st" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
             <ExamSetup 
               template={selectedTemplate} 
               onStart={handleStartExam} 
               onCancel={() => setView('dashboard')} 
             />
          </motion.div>
        )}
        {view === 'active-exam' && (
          <motion.div key="ex" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
            <ActiveExam sessionConfig={examConfig} onFinish={handleFinishExam} onAbort={() => setView('dashboard')} />
          </motion.div>
        )}
        {view === 'results' && (
          <motion.div key="rs" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
             <DiagnosticReport result={examResult} onReview={() => setView('review')} onExit={() => setView('dashboard')} />
          </motion.div>
        )}
        {view === 'review' && (
          <motion.div key="rv" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
             <ExamReview result={examResult} onExit={() => setView('results')} />
          </motion.div>
        )}
       </AnimatePresence>
    </div>
  );
}

// ----------------------------------------------------------------------
// DATA
// ----------------------------------------------------------------------

const EXAM_TEMPLATES = [
  {
    id: 't1',
    title: 'Comprehensive Final Exam (Year 2)',
    questions: 100,
    timeMinutes: 120,
    type: 'standard',
    subjects: ['Anatomy', 'Physiology', 'Pathology', 'Pharmacology', 'Microbiology'],
    lastAttemptDate: 'May 10',
    lastAttemptScore: 68
  },
  {
    id: 't2',
    title: 'Pharmacology Intensive',
    questions: 50,
    timeMinutes: 60,
    type: 'booster',
    subjects: ['Pharmacokinetics', 'Autonomic Drugs', 'Cardiovascular Drugs', 'Antibiotics'],
    lastAttemptDate: 'May 20',
    lastAttemptScore: 75,
    recommended: true
  },
  {
    id: 't3',
    title: 'Clinical Case Simulation (OSCE Prep)',
    questions: 30,
    timeMinutes: 90,
    type: 'clinical',
    description: 'Case clusters evaluating diagnosis, investigations, and management logic.',
    subjects: ['Internal Medicine', 'Surgery', 'Emergency'],
    lastAttemptDate: null,
    lastAttemptScore: null
  }
];

const MOCK_HISTORY = [
  { date: '2026-05-10', score: 68, passMark: 70, type: 'standard', name: 'Comprehensive Final Exam (Year 2)', weakest: 'Pathology' },
  { date: '2026-05-15', score: 72, passMark: 70, type: 'standard', name: 'Comprehensive Final Exam (Year 2)', weakest: 'Physiology' },
  { date: '2026-05-20', score: 75, passMark: 70, type: 'standard', name: 'Pharmacology Intensive', weakest: 'Antibiotics' },
];

const MOCK_TRAJECTORY = [
  { date: 'May 1', score: 55, projected: null },
  { date: 'May 8', score: 60, projected: null },
  { date: 'May 15', score: 65, projected: null },
  { date: 'May 22', score: 68, projected: null },
  { date: 'May 29', score: null, projected: 72 },
  { date: 'Jun 5', score: null, projected: 75 },
  { date: 'Jun 12', score: null, projected: 78 }
];

const MOCK_INTELLIGENCE = [
  { name: 'Pharmacology', avg: 76, trend: 'up', topics: ['Renal Drug Dosing', 'Antiarrythmics', 'Macrolides'] },
  { name: 'Pathology', avg: 58, trend: 'down', topics: ['Glomerulonephritis', 'Neoplasia', 'Cell Injury'] },
  { name: 'Microbiology', avg: 65, trend: 'up', topics: ['Viral Replication', 'Gram-Negative Rods', 'Fungal Infections'] },
  { name: 'Anatomy', avg: 82, trend: 'flat', topics: ['Brachial Plexus', 'Inguinal Canal', 'Cranial Nerves'] }
].sort((a,b) => a.avg - b.avg);

// ----------------------------------------------------------------------
// COMPONENTS
// ----------------------------------------------------------------------

function Gauge({ value }: { value: number }) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  const color = value < 50 ? 'text-red-500' : value < 75 ? 'text-amber-500' : 'text-emerald-500';
  
  return (
    <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="transparent" stroke="currentColor" strokeWidth="8" className="text-slate-800" />
        <circle cx="50" cy="50" r={radius} fill="transparent" stroke="currentColor" strokeWidth="8" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} className={`${color} transition-all duration-1000 ease-out`} strokeLinecap="round" />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-black text-primary leading-none">{value}</span>
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-1">/ 100</span>
      </div>
    </div>
  )
}

function ExamSimulatorDashboard({ onSetup, onBack }: { onSetup: (t: any) => void, onBack: () => void }) {
  const readinessScore = 68;

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-8 space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center space-x-2 text-muted hover:text-primary transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold tracking-wide uppercase text-sm">Return to Dashboard</span>
        </button>
      </div>

      {/* Banner */}
      <div className="bg-surface border border-divider rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="relative">
          <Gauge value={readinessScore} />
          <div className="absolute -bottom-2 -right-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md text-xs font-black shadow-sm">
             +3
          </div>
        </div>
        <div className="flex-1 text-center md:text-left z-10 w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-4">
            <h1 className="text-3xl md:text-4xl font-black text-primary tracking-tight uppercase">Exam Readiness Score</h1>
            <div className="bg-base border border-divider px-4 py-2 rounded-xl text-center shadow-inner">
               <span className="block text-[10px] uppercase font-black tracking-widest text-slate-500">Real Exam In</span>
               <span className="text-lg font-black text-indigo-400">23 Days</span>
            </div>
          </div>
          <p className="text-lg text-slate-300 font-medium mb-4">
            <strong className="text-amber-400">Almost there — two subjects are holding you back.</strong> Your Pathology and Pharmacology scores need significant improvement.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
             <div className="bg-base box-border border-divider px-3 py-1.5 rounded-lg text-xs font-bold text-slate-400 flex items-center">
               Extrapolated from:
             </div>
             <div className="bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wider font-bold text-indigo-400">
               Recent Exams (35%)
             </div>
             <div className="bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wider font-bold text-indigo-400">
               Mistake Bank (25%)
             </div>
             <div className="bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wider font-bold text-indigo-400">
               Coverage (20%)
             </div>
             <div className="bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wider font-bold text-indigo-400">
               Consistency (10%)
             </div>
             <div className="bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wider font-bold text-indigo-400">
               Improvement (10%)
             </div>
          </div>
          
          <div className="w-full h-32 mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_TRAJECTORY} margin={{top: 5, right: 30, bottom: 5, left: -20}}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                 <XAxis dataKey="date" stroke="#64748b" tickLine={false} axisLine={false} fontSize={10} />
                 <YAxis stroke="#64748b" tickLine={false} axisLine={false} domain={[0, 100]} fontSize={10} />
                 <RechartsTooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '0.75rem', color: '#f8fafc' }} />
                 <ReferenceLine x="Jun 12" stroke="#f59e0b" strokeDasharray="3 3" label={{ position: 'top', value: 'Exam Date', fill: '#f59e0b', fontSize: 10 }} />
                 <ReferenceLine y={75} stroke="#10b981" strokeDasharray="5 5" />
                 <Line type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, fill: '#6366f1', strokeWidth: 0 }} />
                 <Line type="monotone" dataKey="projected" stroke="#64748b" strokeWidth={3} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-surface border border-divider p-6 rounded-3xl flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center shrink-0">
                 <BarChart2 className="w-6 h-6" />
              </div>
              <div>
                 <span className="block text-[10px] uppercase font-black tracking-widest text-muted">Average Score</span>
                 <span className="text-2xl font-black text-primary leading-tight">71.6%</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-500">class avg:</span>
              <span className="block text-sm font-black text-slate-300">66.2%</span>
            </div>
         </div>
         <div className="bg-surface border border-divider p-6 rounded-3xl flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center shrink-0">
                 <TargetIcon className="w-6 h-6" />
              </div>
              <div>
                 <span className="block text-[10px] uppercase font-black tracking-widest text-muted">Most Recent Score</span>
                 <span className="text-2xl font-black text-primary leading-tight">75.0%</span>
              </div>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
               <span className="text-xs font-black uppercase tracking-widest text-emerald-400">Pass</span>
            </div>
         </div>
         <div className="bg-surface border border-divider p-6 rounded-3xl flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-500/10 text-purple-500 rounded-xl flex items-center justify-center shrink-0">
                 <Calendar className="w-6 h-6" />
              </div>
              <div>
                 <span className="block text-[10px] uppercase font-black tracking-widest text-muted">Exams This Month</span>
                 <span className="text-2xl font-black text-primary leading-tight">4</span>
              </div>
            </div>
            <div className="w-16 h-8 flex items-end justify-between space-x-1">
               {/* Mini Sparkline */}
               <div className="w-full bg-indigo-500 rounded-t-sm" style={{height: '40%'}}></div>
               <div className="w-full bg-indigo-500 rounded-t-sm" style={{height: '60%'}}></div>
               <div className="w-full bg-indigo-500 rounded-t-sm" style={{height: '50%'}}></div>
               <div className="w-full bg-indigo-400 rounded-t-sm" style={{height: '80%'}}></div>
            </div>
         </div>
      </div>

      {/* Action Strip */}
      <div className="bg-gradient-to-r from-indigo-500/10 to-blue-500/5 border border-indigo-500/30 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-lg shadow-indigo-500/5">
        <div className="absolute top-0 right-0 p-6 text-indigo-500/10">
          <BrainCircuit className="w-32 h-32 transform rotate-12" />
        </div>
        <div className="flex items-center space-x-5 relative z-10 w-full">
          <div className="w-12 h-12 bg-indigo-500 text-white rounded-xl flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(99,102,241,0.4)]">
             <Sparkles className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Single Best Action</h3>
            <p className="text-slate-200 font-medium text-sm md:text-base leading-snug">You have 12 overdue Pharmacology mistakes and your last exam showed a 54% in Pathology. <strong className="text-primary font-bold">Start the Pathology Booster exam or review your mistake bank first.</strong></p>
          </div>
        </div>
        <button onClick={() => onSetup(EXAM_TEMPLATES[1])} className="w-full md:w-auto shrink-0 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-lg active:scale-95 text-center relative z-10 whitespace-nowrap">
          Launch Pathology Booster
        </button>
      </div>      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Templates & Study Plan */}
        <div className="col-span-2 space-y-6">
          <div className="bg-surface border border-divider rounded-3xl p-6 md:p-8">
            <h2 className="text-xl font-black text-primary mb-6 flex items-center"><Layers className="w-5 h-5 mr-3 text-indigo-400" /> Exam Templates</h2>
            <div className="space-y-4">
              {EXAM_TEMPLATES.map(template => (
                <div key={template.id} className="group relative border border-divider hover:border-indigo-500/50 bg-base rounded-2xl p-5 flex flex-col md:flex-row justify-between md:items-center gap-4 transition-all">
                  <div className={`absolute top-0 left-0 w-1 h-full rounded-l-2xl transition-opacity ${template.recommended ? 'bg-emerald-500 opacity-100' : 'bg-indigo-500 opacity-0 group-hover:opacity-100'}`}></div>
                  <div className="flex-1">
                    <div className="flex items-center flex-wrap gap-2 mb-2">
                       <h3 className="text-lg font-bold text-primary">{template.title}</h3>
                       {template.recommended && <span className="px-2 py-0.5 rounded flex items-center text-[9px] font-black uppercase tracking-widest bg-emerald-500 text-white shadow-sm shadow-emerald-500/20"><Sparkles className="w-3 h-3 mr-1" /> Recommended for You</span>}
                       {template.type === 'booster' && !template.recommended && <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Weak Area Booster</span>}
                       {template.type === 'clinical' && <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest bg-rose-500/10 text-rose-500 border border-rose-500/20">Clinical Focus</span>}
                    </div>
                    {template.description && <p className="text-sm text-slate-400 mb-3">{template.description}</p>}
                    <div className="flex items-center flex-wrap gap-4 text-xs font-bold text-muted uppercase tracking-wider">
                      <span className="flex items-center"><List className="w-3.5 h-3.5 mr-1.5 text-slate-500" /> {template.questions} Qs</span>
                      <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1.5 text-slate-500" /> {template.timeMinutes} Mins</span>
                      {template.lastAttemptDate ? (
                        <span className="flex items-center pl-4 border-l border-divider"><Activity className="w-3.5 h-3.5 mr-1.5 text-slate-500" /> Last Attempt: {template.lastAttemptScore}% on {template.lastAttemptDate}</span>
                      ) : (
                        <span className="flex items-center pl-4 border-l border-divider"><Activity className="w-3.5 h-3.5 mr-1.5 text-slate-500" /> Unattempted</span>
                      )}
                    </div>
                  </div>
                  <button onClick={() => onSetup(template)} className={`shrink-0 ${template.recommended ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 border-transparent' : 'bg-surface border border-divider hover:bg-indigo-600 hover:text-white text-primary'} px-6 py-3 rounded-xl font-black uppercase tracking-wider text-sm transition-all flex items-center space-x-2 active:scale-95`}>
                    <span>Launch</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
              
              <div className="border border-dashed border-divider hover:border-slate-500 bg-surface/30 rounded-2xl p-5 flex flex-col md:flex-row items-center gap-4 transition-all cursor-pointer group" onClick={() => onSetup(null)}>
                <div className="w-12 h-12 rounded-xl bg-base flex items-center justify-center shrink-0 border border-divider group-hover:border-slate-500 transition-colors">
                  <SlidersHorizontal className="w-6 h-6 text-slate-400 group-hover:text-primary transition-colors" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-sm font-bold text-primary uppercase tracking-widest">Custom Exam Builder</h3>
                  <p className="text-xs text-muted mt-1">Manually configure subjects, questions, and limits for a targeted session.</p>
                </div>
                <button className="bg-base border border-divider text-primary px-6 py-2.5 rounded-xl font-black uppercase tracking-wider text-sm transition-colors group-hover:bg-slate-800">
                  Configure
                </button>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-divider rounded-3xl overflow-hidden shadow-sm flex flex-col">
            <div className="p-6 border-b border-divider bg-base/50 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h3 className="text-lg font-black text-primary uppercase tracking-widest flex items-center">
                  <Calendar className="w-5 h-5 mr-3 text-indigo-400" /> 7-Day Study Plan
                </h3>
                <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">Generated based on recent gaps</p>
              </div>
              <button className="text-xs font-bold bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 px-4 py-2 rounded-lg transition-colors whitespace-nowrap">View Full Plan</button>
            </div>
            <div className="divide-y divide-divider flex-1">
               <div className="p-5 bg-indigo-500/5 hover:bg-indigo-500/10 transition-colors flex items-start space-x-4 cursor-pointer relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500"></div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 font-black shadow-sm border border-indigo-500/30">
                     TDY
                  </div>
                  <div className="flex-1">
                     <h4 className="text-sm font-bold text-primary"><span className="text-indigo-400 mr-2">Step 1:</span> Clear Pathological Mistakes</h4>
                     <p className="text-xs text-slate-400 mt-1">Review 12 active mistakes from Glomerulonephritis before taking any new exams.</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 mt-3" />
               </div>
               <div className="p-5 bg-surface hover:bg-surface-hover transition-colors flex items-start space-x-4 cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-base border border-divider text-slate-400 flex items-center justify-center shrink-0 font-black shadow-inner">
                     TMW
                  </div>
                  <div className="flex-1">
                     <h4 className="text-sm font-bold text-slate-300">Targeted Pathology Flashcards</h4>
                     <p className="text-xs text-slate-500 mt-1">Complete 40 spaced repetition cards.</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600 mt-3" />
               </div>
               <div className="p-5 bg-surface hover:bg-surface-hover transition-colors flex items-start space-x-4 cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-base border border-divider text-slate-400 flex items-center justify-center shrink-0 font-black shadow-inner">
                     THU
                  </div>
                  <div className="flex-1">
                     <h4 className="text-sm font-bold text-slate-300">Take Pathology Booster</h4>
                     <p className="text-xs text-slate-500 mt-1">Re-evaluate readiness after targeted review.</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600 mt-3" />
               </div>
            </div>
          </div>
        </div>

        {/* Right Col */}
        <div className="space-y-6">
          <div className="bg-gradient-to-b from-indigo-900/20 to-surface border border-indigo-500/30 rounded-3xl p-6 shadow-lg relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 blur-[40px] rounded-full"></div>
            <div className="flex items-center justify-between mb-4 relative z-10">
              <h3 className="text-xs font-black text-indigo-400 uppercase tracking-widest flex items-center"><BrainCircuit className="w-4 h-4 mr-2" /> Mistake Bank</h3>
              <span className="bg-red-500 text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shadow-sm shadow-red-500/40">Needs Review</span>
            </div>
            <div className="flex items-end justify-between relative z-10 mb-4">
               <div>
                  <span className="block text-4xl font-black text-primary">34</span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1 block">Active Mistakes</span>
               </div>
               <div className="text-right">
                  <span className="block text-lg font-black text-emerald-400">12</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Cleared this week</span>
               </div>
            </div>
            <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-lg active:scale-95 flex items-center justify-center space-x-2 relative z-10">
               Go to Mistake Bank <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>

          <div className="bg-surface border border-divider rounded-3xl p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
               <div>
                 <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">Recent Exam History</h3>
                 <p className="text-[9px] font-bold text-slate-600 mt-1 uppercase tracking-widest">Pass Mark: 70%</p>
               </div>
               <button className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors">View All</button>
            </div>
            <div className="space-y-4">
              <div className="border-b border-divider pb-2 flex items-center text-[9px] font-black uppercase tracking-widest text-slate-500">
                <span className="flex-1">Exam</span>
                <span className="w-16 text-right">Score</span>
              </div>
              {MOCK_HISTORY.map((h, i) => (
                <div key={i} className="flex items-center justify-between group transition-colors cursor-pointer hover:bg-base -mx-2 px-2 py-1.5 rounded-lg">
                  <div className="flex max-w-[70%] flex-col">
                     <span className="text-sm font-bold text-primary truncate">{h.name}</span>
                     <div className="flex items-center space-x-2 mt-0.5">
                       <span className="text-[9px] font-bold uppercase tracking-widest text-muted">{new Date(h.date).toLocaleDateString()}</span>
                       <span className="w-1 h-1 rounded-full bg-divider"></span>
                       <span className="text-[9px] font-bold uppercase tracking-widest text-rose-400/80 truncate">Weakest: {h.weakest}</span>
                     </div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className={`text-base font-black leading-none mb-1 ${h.score >= h.passMark ? 'text-emerald-400' : 'text-red-400'}`}>{h.score}%</span>
                    <div className="w-12 h-1 bg-base rounded-full overflow-hidden flex relative">
                       <div className="absolute left-[70%] top-0 bottom-0 w-px bg-slate-500 z-10"></div>
                       <div className={`h-full ${h.score >= h.passMark ? 'bg-emerald-500' : 'bg-red-500'}`} style={{width: `${h.score}%`}}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface border border-divider rounded-3xl p-6 flex flex-col">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">Longitudinal Subject Intelligence</h3>
            <div className="space-y-3 flex-1 overflow-y-auto pr-2">
              {MOCK_INTELLIGENCE.map((sub, i) => {
                const colorClass = sub.avg < 65 ? 'text-red-400 border-red-500/20 bg-red-500/5' : sub.avg < 75 ? 'text-amber-400 border-amber-500/20 bg-amber-500/5' : 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5';
                const barColor = sub.avg < 65 ? 'bg-red-500' : sub.avg < 75 ? 'bg-amber-500' : 'bg-emerald-500';
                
                return (
                 <details key={i} className="group bg-base border border-divider rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                   <summary className="p-4 cursor-pointer hover:bg-surface-hover/50 transition-colors flex items-center justify-between list-none">
                      <div className="flex items-center space-x-3 w-[50%]">
                         <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${barColor}`}></div>
                         <h4 className="text-sm font-bold text-primary truncate">{sub.name}</h4>
                      </div>
                      <div className="flex items-center space-x-4 w-[50%] justify-end">
                        <div className="w-full max-w-[80px] h-1.5 bg-surface rounded-full overflow-hidden hidden sm:block">
                          <div className={`h-full ${barColor}`} style={{width: `${sub.avg}%`}}></div>
                        </div>
                        <div className="flex items-center space-x-2 text-xs shrink-0 w-16 justify-end">
                          <span className={`font-black ${sub.avg < 65 ? 'text-red-400' : sub.avg < 75 ? 'text-amber-400' : 'text-emerald-400'}`}>{sub.avg}%</span>
                          {/* Chevron for expanding */}
                          <ChevronRight className="w-3.5 h-3.5 text-slate-500 transition-transform group-open:rotate-90 ml-1" />
                        </div>
                      </div>
                   </summary>
                   <div className="p-4 pt-0 border-t border-divider/50 bg-surface/30">
                      <h5 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 mt-3">Targeted Weaknesses</h5>
                      <ul className="space-y-2">
                        {sub.topics?.map((t, idx) => (
                           <li key={idx} className="flex items-center justify-between text-xs">
                              <span className="text-slate-300 font-medium truncate pr-4 text-rose-200/80">• {t}</span>
                              <button className="text-[9px] font-bold text-indigo-400 hover:text-indigo-300 uppercase shrink-0">Review</button>
                           </li>
                        ))}
                      </ul>
                   </div>
                 </details>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// EXAM SETUP
// ----------------------------------------------------------------------

function ExamSetup({ template, onStart, onCancel }: { template: any, onStart: (c: any) => void, onCancel: () => void }) {
  const isCustom = !template;
  const [config, setConfig] = useState({
    title: template?.title || 'Custom Exam',
    questions: template?.questions || 50,
    timeMinutes: template?.timeMinutes || 60,
    enduranceMode: false,
    pressureSimulation: false,
    ambientSound: false
  });

  return (
    <div className="max-w-[800px] mx-auto p-4 md:p-8 space-y-6">
      <button onClick={onCancel} className="flex items-center space-x-2 text-muted hover:text-primary transition-colors group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="font-bold tracking-wide uppercase text-sm">Cancel Setup</span>
      </button>

      <div>
        <h1 className="text-3xl font-black text-primary tracking-tight uppercase mb-2">Configure Exam</h1>
        <p className="text-muted font-medium">{template ? `Template: ${template.title}` : 'Building a custom exam parameters'}</p>
      </div>

      <div className="bg-surface border border-divider rounded-3xl p-6 md:p-8 space-y-8 shadow-xl">
        {isCustom && (
          <div className="grid grid-cols-2 gap-6 pb-6 border-b border-divider">
            <div>
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-2">Question Count</label>
              <select defaultValue="50" className="w-full bg-base border border-divider p-3 rounded-xl text-primary font-bold focus:outline-none focus:border-indigo-500 shadow-inner">
                <option value="20">20 Questions</option>
                <option value="50">50 Questions</option>
                <option value="100">100 Questions</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-2">Time Limit</label>
              <select defaultValue="60" className="w-full bg-base border border-divider p-3 rounded-xl text-primary font-bold focus:outline-none focus:border-indigo-500 shadow-inner">
                <option value="30">30 Minutes</option>
                <option value="60">60 Minutes</option>
                <option value="120">120 Minutes</option>
              </select>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <h3 className="text-sm font-black text-primary uppercase tracking-widest">Psychological & Stamina Training</h3>
          
          <label className="flex items-start space-x-4 p-5 border border-divider rounded-2xl bg-base cursor-pointer hover:border-slate-600 transition-all shadow-sm">
            <input type="checkbox" className="w-5 h-5 rounded border-slate-600 mt-0.5 text-indigo-500 focus:ring-0" 
              checked={config.enduranceMode} onChange={(e) => setConfig({...config, enduranceMode: e.target.checked})}
            />
            <div>
              <h4 className="text-base font-bold text-primary flex items-center"><Activity className="w-4 h-4 mr-2 text-rose-400" /> Endurance Mode</h4>
              <p className="text-sm text-muted mt-1">Disables all breaks. Tracks accuracy degradation over time to identify mental fatigue points.</p>
            </div>
          </label>

          <label className="flex items-start space-x-4 p-5 border border-divider rounded-2xl bg-base cursor-pointer hover:border-slate-600 transition-all shadow-sm">
            <input type="checkbox" className="w-5 h-5 rounded border-slate-600 mt-0.5 text-indigo-500 focus:ring-0"
              checked={config.pressureSimulation} onChange={(e) => setConfig({...config, pressureSimulation: e.target.checked})}
            />
            <div>
              <h4 className="text-base font-bold text-primary flex items-center"><AlertCircle className="w-4 h-4 mr-2 text-yellow-400" /> Pressure Simulation</h4>
              <p className="text-sm text-muted mt-1">Randomly triggers time deductions or unexpected notifications to train resilience under shifting conditions.</p>
            </div>
          </label>

          <label className="flex items-start space-x-4 p-5 border border-divider rounded-2xl bg-base cursor-pointer hover:border-slate-600 transition-all shadow-sm">
            <input type="checkbox" className="w-5 h-5 rounded border-slate-600 mt-0.5 text-indigo-500 focus:ring-0"
              checked={config.ambientSound} onChange={(e) => setConfig({...config, ambientSound: e.target.checked})}
            />
            <div>
               <h4 className="text-base font-bold text-primary flex items-center"><Volume2 className="w-4 h-4 mr-2 text-emerald-400" /> Exam Hall Ambient Sound</h4>
               <p className="text-sm text-muted mt-1">Plays coughing, paper shuffling, and ticking clocks to build focus in noisy environments.</p>
            </div>
          </label>
        </div>

        <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5 flex items-start space-x-4">
          <ShieldAlert className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-red-400 uppercase tracking-widest">Strict Exam Conditions Active</h4>
            <p className="text-sm text-red-400/80 mt-1 font-medium">Once started, the timer cannot be paused. Screen exits will be logged. Auto-submit occurs immediately at 00:00.</p>
          </div>
        </div>

        <button 
          onClick={() => onStart(config)}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white p-5 rounded-2xl font-black uppercase tracking-widest text-lg transition-transform active:scale-95 flex items-center justify-center space-x-2 shadow-lg shadow-indigo-500/20"
        >
          <span>Launch Simulator</span>
          <Play className="w-5 h-5 fill-current" />
        </button>

      </div>
    </div>
  )
}

// ----------------------------------------------------------------------
// ACTIVE EXAM
// ----------------------------------------------------------------------

function ActiveExam({ sessionConfig, onFinish, onAbort }: { sessionConfig: any, onFinish: (res: any) => void, onAbort: () => void }) {
  const totalQuestions = sessionConfig.questions || 50;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(sessionConfig.timeMinutes * 60);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flags, setFlags] = useState<Record<number, boolean>>({});
  const startTime = useRef(Date.now());
  const [timeSpentPerQ, setTimeSpentPerQ] = useState<Record<number, number>>({});
  
  // Fake question data
  const question = {
    id: currentIdx,
    text: `Question ${currentIdx + 1}: A 45-year-old male presents with severe crushing chest pain radiating to his left arm. He is profusely sweating. His ECG shows ST elevation in leads V2-V4. Which of the following is the most appropriate next step in management?`,
    options: [
      "Administer oral ibuprofen",
      "Immediate percutaneous coronary intervention (PCI)",
      "Discharge with reassurance",
      "Routine echocardiogram tomorrow"
    ]
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timer);
          submitExam();
          return 0;
        }
        return t - 1;
      });
      
      // Track time per question loosely
      setTimeSpentPerQ(prev => ({
         ...prev,
         [currentIdx]: (prev[currentIdx] || 0) + 1
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, [currentIdx]);

  const submitExam = () => {
    // Generate realistic looking post-exam data based on answers + time
    onFinish({
      score: 62, 
      passMark: 70,
      totalQuestions,
      answers,
      flags,
      timeSpent: sessionConfig.timeMinutes * 60 - timeLeft,
      timeSpentPerQ
    });
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isWarning = timeLeft < (sessionConfig.timeMinutes * 60) * 0.2;
  const isCritical = timeLeft < (sessionConfig.timeMinutes * 60) * 0.1;

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="flex flex-col h-full bg-transparent">
      {/* Top Bar */}
      <div className="bg-surface/50 border-b border-divider p-4 flex items-center justify-between shrink-0 shadow-sm z-10">
        <div className="flex items-center space-x-6">
          <button onClick={onAbort} className="text-muted hover:text-red-400 font-bold uppercase tracking-widest text-xs transition-colors px-3 py-1.5 rounded hover:bg-red-500/10">Abort Exam</button>
          <div className="h-6 w-px bg-divider"></div>
          <span className="text-primary font-black uppercase tracking-wider">{sessionConfig.title}</span>
        </div>

        <div className={`flex items-center space-x-3 px-6 py-2 rounded-xl border shadow-inner ${
          isCritical ? 'bg-red-500/20 border-red-500/50 text-red-500 animate-pulse' : 
          isWarning ? 'bg-amber-500/20 border-amber-500/50 text-amber-500' : 
          'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
        }`}>
          <Clock className="w-5 h-5" />
          <span className="text-xl font-black font-mono tracking-widest">{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Navigator Sidebar */}
        <div className="w-72 bg-base border-r border-divider flex flex-col shrink-0 z-10 shadow-xl">
          <div className="p-5 border-b border-divider bg-surface/30">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Question Navigator</h3>
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">{answeredCount} Answered</span>
              <span className="text-slate-400 bg-surface px-2 py-1 rounded border border-divider">{totalQuestions - answeredCount} Unanswered</span>
            </div>
            <div className="w-full bg-surface-hover h-2 rounded-full mt-4 overflow-hidden border border-divider box-border">
              <div className="bg-emerald-500 h-full transition-all" style={{width: `${(answeredCount/totalQuestions)*100}%`}}></div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-5 scrollbar-thin scrollbar-thumb-slate-700 bg-base">
            <div className="grid grid-cols-4 gap-3">
              {Array.from({length: totalQuestions}).map((_, i) => {
                const isAns = !!answers[i];
                const isFlagged = !!flags[i];
                return (
                  <button 
                    key={i}
                    onClick={() => setCurrentIdx(i)}
                    className={`relative w-full aspect-square flex items-center justify-center rounded-xl text-sm font-black transition-all ${
                      currentIdx === i ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-base scale-105' : ''
                    } ${
                      isAns ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'bg-surface border border-divider text-slate-500 hover:text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    {i + 1}
                    {isFlagged && <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-base shadow-sm"></div>}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="p-5 border-t border-divider bg-surface/30">
            <button key="submit-btn" onClick={submitExam} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-transform active:scale-95 shadow-lg">
              Submit Exam
            </button>
          </div>
        </div>

        {/* Main Question Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-16 relative flex flex-col items-center w-full">
           <div className="max-w-4xl w-full flex flex-col h-full">
             <div className="flex items-center justify-between mb-10 w-full">
               <span className="text-sm font-black text-slate-400 uppercase tracking-widest bg-surface px-4 py-2 rounded-xl border border-divider shadow-sm">Question {currentIdx + 1} of {totalQuestions}</span>
               <button 
                  onClick={() => setFlags({...flags, [currentIdx]: !flags[currentIdx]})}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-black text-sm uppercase tracking-wide transition-all border shadow-sm ${flags[currentIdx] ? 'bg-rose-500/20 border-rose-500/40 text-rose-400 ring-1 ring-rose-500' : 'bg-surface border-divider text-slate-400 hover:bg-surface-hover hover:text-slate-200'}`}
               >
                  <Flag className={`w-4 h-4 ${flags[currentIdx] ? 'fill-current' : ''}`} />
                  <span>{flags[currentIdx] ? 'Flagged' : 'Flag for Review'}</span>
               </button>
             </div>

             <div className="prose prose-invert max-w-none mb-12 w-full">
                <h2 className="text-2xl font-semibold leading-relaxed text-slate-50 tracking-wide">{question.text}</h2>
             </div>

             <div className="space-y-4 mb-auto w-full">
               {question.options.map((opt, i) => {
                 const isSelected = answers[currentIdx] === opt;
                 return (
                   <button 
                     key={i}
                     onClick={() => setAnswers({...answers, [currentIdx]: opt})}
                     className={`w-full text-left px-6 py-5 rounded-2xl border-2 transition-all flex items-center space-x-5 ${
                       isSelected 
                         ? 'bg-indigo-500/10 border-indigo-500 text-indigo-100 shadow-[0_0_15px_rgba(99,102,241,0.15)] scale-[1.01]' 
                         : 'bg-surface/50 border-divider text-slate-300 hover:bg-surface hover:border-slate-500'
                     }`}
                   >
                     <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'border-indigo-400 bg-indigo-500/20' : 'border-slate-600'}`}>
                       {isSelected && <div className="w-3.5 h-3.5 rounded-full bg-indigo-400 shadow-sm"></div>}
                     </div>
                     <span className="text-lg font-medium leading-snug">{opt}</span>
                   </button>
                 )
               })}
             </div>

             <div className="flex items-center justify-between w-full mt-16 pt-8 border-t border-divider">
                <button 
                  onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
                  disabled={currentIdx === 0}
                  className="px-8 py-4 bg-surface hover:bg-surface-hover border border-divider rounded-2xl font-black text-sm uppercase tracking-widest disabled:opacity-30 flex items-center space-x-3 transition-colors shadow-sm text-primary"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Previous</span>
                </button>
                <button 
                  onClick={() => setCurrentIdx(Math.min(totalQuestions - 1, currentIdx + 1))}
                  disabled={currentIdx === totalQuestions - 1}
                  className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest disabled:opacity-30 flex items-center space-x-3 transition-colors shadow-lg shadow-indigo-500/20 active:scale-95"
                >
                  <span>Next</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
             </div>
           </div>
        </div>
      </div>
    </div>
  )
}

// ----------------------------------------------------------------------
// POST-EXAM DIAGNOSTIC REPORT
// ----------------------------------------------------------------------

function DiagnosticReport({ result, onReview, onExit }: { result: any, onReview: () => void, onExit: () => void }) {
  const isPass = result.score >= result.passMark;

  // Fake exhaustive data structure to build the 7 sections robustly
  const mockSubjectData = [
    { name: 'Pharmacology', questions: 12, correct: 11, score: 92, prevScore: 80, status: 'strong' },
    { name: 'Anatomy', questions: 10, correct: 8, score: 80, prevScore: 78, status: 'strong' },
    { name: 'Microbiology', questions: 8, correct: 5, score: 62, prevScore: 50, status: 'adequate' },
    { name: 'Pathology', questions: 15, correct: 6, score: 40, prevScore: 45, status: 'weak' },
    { name: 'Physiology', questions: 5, correct: 1, score: 20, prevScore: 35, status: 'weak' }
  ].sort((a,b) => a.score - b.score); // weakest to strongest

  const mockQuestions = [
    { id: 14, subject: 'Pathology', topic: 'Glomerulonephritis', userAns: 'IgA Nephropathy', correctAns: 'Post-strep GN', tag: 'Knowledge Gap' },
    { id: 22, subject: 'Pharmacology', topic: 'Renal Drug Dosing', userAns: '10mg', correctAns: '5mg', tag: 'Careless Error' },
    { id: 41, subject: 'Pathology', topic: 'Granulomas', userAns: 'Non-caseating', correctAns: 'Caseating', tag: 'New Miss' },
    { id: 45, subject: 'Physiology', topic: 'Cardiac Cycle', userAns: 'Isovolumetric Contraction', correctAns: 'Ejection Phase', tag: 'Knowledge Gap' }
  ];

  const mockTimeData = Array.from({length: 50}).map((_, i) => ({
    id: i+1,
    time: Math.floor(Math.random() * 120) + 10,
    rushed: Math.random() > 0.9
  }));

  const mockStudyPlan = [
    { day: 'Day 1 (Mon)', focus: 'Pathology', topics: 'Glomerulonephritis, Granulomas', action: 'Video Review + 20 Qs', icon: Video },
    { day: 'Day 2 (Tue)', focus: 'Physiology', topics: 'Cardiac Cycle mechanics', action: 'Textbook + 15 Qs', icon: BookOpen },
    { day: 'Day 3 (Wed)', focus: 'Mixed Review', topics: 'All Weak Areas', action: '30 Q Custom Quiz', icon: FileQuestion },
  ];

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-8 space-y-12 animate-fade-in pb-32">
      
      {/* 1. Overall Result */}
      <div className={`p-8 md:p-12 rounded-3xl border relative overflow-hidden ${
        isPass ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'
      }`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-current opacity-5 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-muted block mb-2">Overall Result</span>
            <h1 className={`text-4xl md:text-5xl font-black uppercase tracking-tight mb-4 ${isPass ? 'text-emerald-400' : 'text-red-400'}`}>
              {isPass ? 'Exam Passed' : 'Needs Improvement'}
            </h1>
            <p className="text-primary font-medium text-lg max-w-xl">
              You scored <strong className={isPass ? 'text-emerald-400' : 'text-red-400'}>{result.score}%</strong>. The pass mark for this simulated exam was {result.passMark}%. 
              You spent an average of 68 seconds per question (Recommended: 72s).
            </p>
          </div>
          
          <div className="flex items-center space-x-6 md:space-x-12 bg-base p-6 rounded-3xl border border-divider shadow-xl shrink-0">
             <div className="text-center">
               <span className="block text-5xl font-black text-primary mb-2 line-through opacity-70 decoration-rose-500">{result.score}%</span>
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Your Score</span>
             </div>
             <div className="w-px h-20 bg-divider"></div>
             <div className="text-center">
               <span className="block text-3xl font-black text-primary mb-2">65%</span>
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Class Average</span>
             </div>
             <div className="w-px h-20 bg-divider"></div>
             <div className="text-center">
               <span className="block text-3xl font-black text-indigo-400 mb-2">57m</span>
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Time Taken</span>
             </div>
          </div>
        </div>
      </div>

      {/* 2. Subject Breakdown */}
      <div className="bg-surface border border-divider rounded-3xl p-6 md:p-10 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-black text-primary uppercase tracking-widest flex items-center">
              <BarChart2 className="w-6 h-6 mr-3 text-indigo-400" /> Subject Breakdown
            </h2>
            <p className="text-sm text-muted mt-2 font-medium">Ranked from your weakest to strongest areas.</p>
          </div>
        </div>
        
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockSubjectData} layout="vertical" margin={{ top: 0, right: 30, left: 100, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={true} vertical={false} />
              <XAxis type="number" domain={[0, 100]} stroke="#64748b" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis dataKey="name" type="category" stroke="#94a3b8" tickLine={false} axisLine={false} width={120} fontSize={12} fontWeight="bold" />
              <RechartsTooltip cursor={{fill: '#1e293b', opacity: 0.4}} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '0.75rem', color: '#f8fafc' }} />
              <Bar dataKey="score" radius={[0, 6, 6, 0]} barSize={24}>
                {mockSubjectData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.score < 60 ? '#ef4444' : entry.score < 75 ? '#f59e0b' : '#10b981'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 3. Comparative Analysis */}
        <div className="bg-surface border border-divider rounded-3xl p-6 md:p-8 shadow-sm">
          <h2 className="text-lg font-black text-primary uppercase tracking-widest mb-6 flex items-center">
            <Users className="w-5 h-5 mr-3 text-blue-400" /> Comparative Analysis
          </h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                <span className="text-indigo-400">Your Score ({result.score}%)</span>
                <span className="text-slate-500">Top 10% (85%)</span>
              </div>
              <div className="w-full bg-base h-4 rounded-full border border-divider overflow-hidden flex">
                <div className="bg-indigo-500 h-full" style={{width: `${result.score}%`}}></div>
                <div className="bg-rose-500/20 h-full" style={{width: `${85 - result.score}%`}}></div>
              </div>
            </div>

            <div className="pt-4 border-t border-divider">
               <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Subject Deltas vs Previous Exam</h3>
               <div className="space-y-3">
                 {mockSubjectData.slice(0,3).map(sub => {
                   const diff = sub.score - sub.prevScore;
                   return (
                     <div key={sub.name} className="flex items-center justify-between bg-base p-3 rounded-xl border border-divider">
                       <span className="text-sm font-bold text-primary">{sub.name}</span>
                       <div className={`flex items-center space-x-1 text-xs font-black px-2 py-1 rounded ${diff > 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                         {diff > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                         <span>{Math.abs(diff)}%</span>
                       </div>
                     </div>
                   )
                 })}
               </div>
            </div>
          </div>
        </div>

        {/* 5. Time Analysis */}
        <div className="bg-surface border border-divider rounded-3xl p-6 md:p-8 shadow-sm">
           <h2 className="text-lg font-black text-primary uppercase tracking-widest mb-6 flex items-center">
            <Clock className="w-5 h-5 mr-3 text-amber-400" /> Time Management
          </h2>
          <div className="h-48 w-full mb-4">
             <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="id" type="number" name="Question" domain={[1, 50]} stroke="#64748b" tickLine={false} axisLine={false} tick={{fontSize: 10}} />
                  <YAxis dataKey="time" type="number" name="Seconds" stroke="#64748b" tickLine={false} axisLine={false} tick={{fontSize: 10}} />
                  <RechartsTooltip cursor={{strokeDasharray: '3 3'}} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }} />
                  <Scatter name="Time" data={mockTimeData} fill="#8b5cf6">
                    {mockTimeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.time > 90 ? '#ef4444' : entry.time < 20 ? '#f59e0b' : '#6366f1'} />
                    ))}
                  </Scatter>
                </ScatterChart>
             </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-bold text-muted">
            <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-red-500 mr-1.5"></div> Confidence Gap (&gt;90s)</span>
            <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-amber-500 mr-1.5"></div> Rushed (&lt;20s)</span>
            <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-indigo-500 mr-1.5"></div> On Pace</span>
          </div>
        </div>
      </div>

      {/* 4. Question Level Analysis (Wrong Answers) */}
      <div className="bg-surface border border-divider rounded-3xl p-6 md:p-8 shadow-sm overflow-hidden">
        <h2 className="text-xl font-black text-primary uppercase tracking-widest mb-6 flex items-center">
          <FileText className="w-5 h-5 mr-3 text-rose-400" /> Missed Question Triage
        </h2>
        <div className="overflow-x-auto">
           <table className="w-full text-left text-sm border-collapse min-w-[700px]">
             <thead>
               <tr className="border-b border-divider">
                 <th className="pb-3 text-xs font-black uppercase tracking-widest text-slate-500">Q#</th>
                 <th className="pb-3 text-xs font-black uppercase tracking-widest text-slate-500">Subject / Topic</th>
                 <th className="pb-3 text-xs font-black uppercase tracking-widest text-slate-500">Your Answer</th>
                 <th className="pb-3 text-xs font-black uppercase tracking-widest text-slate-500">Correct Answer</th>
                 <th className="pb-3 text-xs font-black uppercase tracking-widest text-slate-500">Error Classification</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-divider/50">
               {mockQuestions.map(q => (
                 <tr key={q.id} className="hover:bg-surface-hover/50 transition-colors group">
                   <td className="py-4 text-slate-400 font-bold">{q.id}</td>
                   <td className="py-4">
                     <span className="block font-bold text-primary">{q.subject}</span>
                     <span className="text-xs text-muted">{q.topic}</span>
                   </td>
                   <td className="py-4 text-rose-400 line-through decoration-rose-500/50">{q.userAns}</td>
                   <td className="py-4 text-emerald-400 font-bold">{q.correctAns}</td>
                   <td className="py-4">
                     <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${
                       q.tag === 'Knowledge Gap' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                       q.tag === 'Careless Error' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' :
                       'bg-blue-500/10 border-blue-500/20 text-blue-400'
                     }`}>
                       {q.tag}
                     </span>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>
      </div>

      {/* 6 & 7: Weak Area & Study Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-gradient-to-br from-indigo-900/20 to-surface border border-indigo-500/30 rounded-3xl p-6 md:p-8 relative">
           <div className="absolute top-0 right-0 p-6 text-indigo-500/10 pointer-events-none">
              <BrainCircuit className="w-32 h-32" />
           </div>
           <h2 className="text-lg font-black text-indigo-400 uppercase tracking-widest mb-6 flex items-center relative z-10">
             <Sparkles className="w-5 h-5 mr-3" /> Pathology Deep Dive
           </h2>
           <div className="space-y-4 relative z-10">
              <p className="text-indigo-100/90 font-medium leading-relaxed">
                Your Pathology score is <strong>40%</strong>. A granular review of this exam shows the weakness is heavily concentrated in <strong>Glomerulonephritis</strong> and <strong>Granulomas</strong>.
              </p>
              <div className="bg-base/50 p-4 rounded-xl border border-indigo-500/20 space-y-3">
                 <div className="flex justify-between items-center text-sm font-bold">
                   <span className="text-slate-300">Glomerulonephritis</span>
                   <span className="text-rose-400">0/4 Correct</span>
                 </div>
                 <div className="flex justify-between items-center text-sm font-bold">
                   <span className="text-slate-300">Granulomas</span>
                   <span className="text-rose-400">1/3 Correct</span>
                 </div>
                 <div className="flex justify-between items-center text-sm font-bold">
                   <span className="text-slate-300">Neoplasia Genetics</span>
                   <span className="text-emerald-400">3/3 Correct</span>
                 </div>
              </div>
              <p className="text-xs text-indigo-300 font-medium">Your platform quiz average for Pathology is 55%, indicating exam conditions (time pressure) are dropping your accuracy further.</p>
           </div>
         </div>

         <div className="bg-surface border border-divider rounded-3xl p-6 md:p-8">
           <h2 className="text-lg font-black text-primary uppercase tracking-widest mb-6 flex items-center">
             <Calendar className="w-5 h-5 mr-3 text-emerald-400" /> 7-Day Action Plan
           </h2>
           <div className="space-y-4">
             {mockStudyPlan.map((d, i) => {
               const Icon = d.icon;
               return (
                 <div key={i} className="flex items-start space-x-4 bg-base p-4 rounded-2xl border border-divider">
                   <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                     <Icon className="w-4 h-4" />
                   </div>
                   <div>
                     <span className="text-[10px] uppercase font-black tracking-widest text-emerald-500">{d.day}</span>
                     <h4 className="text-sm font-bold text-primary">{d.focus}: <span className="font-medium text-slate-300">{d.topics}</span></h4>
                     <p className="text-xs text-muted mt-1">{d.action}</p>
                   </div>
                 </div>
               )
             })}
           </div>
         </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 justify-center pt-8 border-t border-divider">
         <button onClick={onReview} className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-black uppercase tracking-widest transition-transform active:scale-95 flex items-center justify-center space-x-2 shadow-lg shadow-indigo-500/20">
           <Layers className="w-5 h-5" />
           <span>Enter Question Review</span>
         </button>
         <button onClick={onExit} className="w-full sm:w-auto px-8 py-4 bg-surface border border-divider hover:bg-surface-hover text-primary rounded-xl font-black uppercase tracking-widest transition-all flex items-center justify-center space-x-2 shadow-sm">
           <LayoutDashboard className="w-5 h-5 text-slate-400" />
           <span>Back to Dashboard</span>
         </button>
      </div>

    </div>
  )
}

// ----------------------------------------------------------------------
// EXAM REVIEW MODE
// ----------------------------------------------------------------------

function ExamReview({ result, onExit }: { result: any, onExit: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [filterMode, setFilterMode] = useState<'all'|'wrong'|'flagged'>('all');

  const question = {
    text: `Question ${currentIdx + 1}: A 45-year-old male presents with severe crushing chest pain radiating to his left arm. He is profusely sweating. His ECG shows ST elevation in leads V2-V4. Which of the following is the most appropriate next step in management?`,
    options: [
      "Administer oral ibuprofen",
      "Immediate percutaneous coronary intervention (PCI)",
      "Discharge with reassurance",
      "Routine echocardiogram tomorrow"
    ],
    correctAnswer: "Immediate percutaneous coronary intervention (PCI)",
    userAnswer: result?.answers?.[currentIdx] || "Administer oral ibuprofen",
    explanation: "This patient is experiencing a ST-elevation myocardial infarction (STEMI) in the anterior wall (V2-V4). The gold standard and most urgent indicated treatment is reperfusion therapy via Primary PCI. Ibuprofen is contraindicated."
  };

  const isCorrect = question.userAnswer === question.correctAnswer;

  return (
    <div className="flex flex-col h-full bg-transparent">
      <div className="bg-surface/50 border-b border-divider p-4 flex flex-col md:flex-row items-center justify-between shrink-0 gap-4 shadow-sm z-10">
        <button onClick={onExit} className="flex items-center space-x-2 text-muted hover:text-primary transition-colors group px-3 py-1.5 rounded-lg hover:bg-surface border border-transparent hover:border-divider">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold tracking-wide uppercase text-sm">Exit Review</span>
        </button>

        <div className="flex items-center bg-base p-1 rounded-xl border border-divider shadow-inner">
          {['all', 'wrong', 'flagged'].map(f => (
            <button key={f} onClick={() => setFilterMode(f as any)} className={`px-5 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-colors ${filterMode === f ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>
              {f === 'all' ? 'All' : f === 'wrong' ? 'Wrong Only' : 'Flagged Only'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 md:p-16 relative flex flex-col items-center w-full">
           <div className="max-w-4xl w-full flex flex-col min-h-full">
             <div className="flex items-center justify-between mb-10 w-full bg-surface border border-divider p-3 rounded-2xl shadow-sm">
               <span className="text-sm font-black text-slate-400 uppercase tracking-widest px-3 py-1 flex items-center">
                 Question {currentIdx + 1} 
                 {!isCorrect && <span className="ml-3 px-2 py-0.5 bg-rose-500/10 text-rose-400 rounded border border-rose-500/20">Missed</span>}
                 {isCorrect && <span className="ml-3 px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20">Correct</span>}
               </span>
             </div>

             <div className="prose prose-invert max-w-none mb-10 w-full">
                <h2 className="text-2xl font-semibold leading-relaxed text-slate-50 mb-6">{question.text}</h2>
             </div>

             <div className="space-y-4 mb-10 w-full">
               {question.options.map((opt, i) => {
                 const isUserAns = question.userAnswer === opt;
                 const isCorrectAns = question.correctAnswer === opt;
                 
                 let borderClass = 'border-divider bg-surface/30';
                 let textClass = 'text-slate-400';
                 let icon = null;

                 if (isCorrectAns) {
                   borderClass = 'border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.1)] text-emerald-300';
                   textClass = 'text-emerald-300 font-bold';
                   icon = <CheckCircle className="w-6 h-6 text-emerald-400" />;
                 } else if (isUserAns && !isCorrectAns) {
                   borderClass = 'border-rose-500/50 bg-rose-500/10 text-rose-300';
                   textClass = 'text-rose-300 line-through opacity-70';
                   icon = <XCircle className="w-6 h-6 text-rose-400" />;
                 }

                 return (
                   <div key={i} className={`w-full text-left p-5 rounded-2xl border-2 flex items-center justify-between ${borderClass} transition-colors`}>
                     <span className={`text-lg ${textClass}`}>{opt}</span>
                     {icon && <span className="shrink-0 ml-4">{icon}</span>}
                   </div>
                 )
               })}
             </div>

             <div className="bg-indigo-900/10 border border-indigo-500/30 rounded-3xl p-8 mb-8 text-sm relative overflow-hidden shadow-sm">
               <div className="absolute top-0 right-0 p-4 text-indigo-500/10">
                  <BrainCircuit className="w-24 h-24" />
               </div>
               <h3 className="text-sm font-black text-indigo-400 uppercase tracking-widest mb-4 flex items-center relative z-10">
                 <Sparkles className="w-5 h-5 mr-2" /> Detailed Explanation
               </h3>
               <p className="text-indigo-100/90 leading-relaxed font-medium text-base relative z-10">{question.explanation}</p>
             </div>
             
             {!isCorrect && (
                <div className="bg-surface border border-rose-500/20 rounded-2xl p-5 mb-8 text-sm flex items-center justify-center space-x-3 text-rose-400/90 text-center shadow-sm">
                   <FolderDownIcon className="w-5 h-5 shrink-0" />
                   <span className="font-medium text-slate-300">This question has been automatically added to your <strong className="font-black text-rose-400 uppercase tracking-widest text-xs mx-1 border border-rose-500/30 px-2 py-0.5 rounded bg-rose-500/10">Mistakes Review Bank</strong> for spaced repetition.</span>
                </div>
             )}

             <div className="flex items-center justify-between mt-auto pt-8 border-t border-divider w-full">
                <button 
                  onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
                  disabled={currentIdx === 0}
                  className="px-8 py-4 bg-surface hover:bg-surface-hover border border-divider rounded-2xl font-black text-sm uppercase tracking-widest disabled:opacity-30 flex items-center space-x-3 transition-colors shadow-sm text-primary"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Previous</span>
                </button>
                <button 
                  onClick={() => setCurrentIdx(currentIdx + 1)}
                  className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest disabled:opacity-30 flex items-center space-x-3 transition-colors shadow-lg shadow-indigo-500/20"
                >
                  <span>Next</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
             </div>
           </div>
        </div>
      </div>
    </div>
  )
}

function FolderDownIcon(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/><path d="M12 10v6"/><path d="m15 13-3 3-3-3"/></svg>
}
