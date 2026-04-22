import React, { useState } from 'react';
import { 
  Brain, Target, RotateCcw, FileText, ChevronRight, Sparkles, 
  ArrowLeft, BookOpen, Layers, Activity, Hash, Clock, Settings2, Play, PlayCircle
} from 'lucide-react';
import { MockExam, ExamState } from './MockExam';

const QUIZ_MODES = [
  {
    id: 'smart-adapt',
    title: 'Smart Adapt',
    description: 'AI-generated mixed questions dynamically adapted to your knowledge gaps. Purely for studying and mastery, not for grading.',
    icon: Brain,
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/30',
    hoverBorder: 'hover:border-indigo-500',
    badge: 'AI Powered'
  },
  {
    id: 'topic-drill',
    title: 'Topic Drill Dive',
    description: 'High-yield focused sessions targeting exact topics heavily emphasized by professors and board examiners.',
    icon: Target,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    hoverBorder: 'hover:border-emerald-500',
  },
  {
    id: 'review-mistakes',
    title: 'Review Mistakes',
    description: 'A deep dive into your previously missed questions. Focus on breaking bad habits and solidifying clinical concepts.',
    icon: RotateCcw,
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/10',
    borderColor: 'border-rose-500/30',
    hoverBorder: 'hover:border-rose-500',
  },
  {
    id: 'past-papers',
    title: 'Past Paper Exams',
    description: 'All-out comprehensive past exams meant to simulate real testing conditions. Take these only after finishing the material.',
    icon: FileText,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    hoverBorder: 'hover:border-amber-500',
    badge: 'Simulation'
  }
];

const ENROLLED_COURSES = {
  "neuro": {
    name: "Clinical Neuroanatomy",
    modules: ["All Modules", "Cerebral Hemispheres", "Basal Ganglia", "Brainstem", "Spinal Cord"]
  },
  "surgery": {
    name: "Surgical Pathophysiology",
    modules: ["All Modules", "Fluid Management", "Bleeding & Transfusion", "Wound Healing"]
  },
  "cardio": {
    name: "Advanced Cardiovascular Medicine",
    modules: ["All Modules", "ECG Mastery", "Heart Failure", "Valvular Disease", "Arrhythmias"]
  }
};

type ModeId = 'smart-adapt' | 'topic-drill' | 'review-mistakes' | 'past-papers' | null;

export function Quizzes() {
  const [activeMode, setActiveMode] = useState<ModeId>(null);
  const [isExamRunning, setIsExamRunning] = useState(false);
  const [frozenState, setFrozenState] = useState<ExamState | null>(null);

  // Tuning State
  const [selectedCourse, setSelectedCourse] = useState<string>("neuro");
  const [selectedModule, setSelectedModule] = useState<string>("All Modules");
  const [difficulty, setDifficulty] = useState<string>("Mixed");
  const [questionCount, setQuestionCount] = useState<string>("20");
  const [timerMode, setTimerMode] = useState<string>("Untimed");
  const [tutorMode, setTutorMode] = useState<boolean>(true);

  if (isExamRunning) {
    return (
      <div className="h-full overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-[#1e293b]">
        <MockExam 
          onExit={() => {
            setIsExamRunning(false);
            setFrozenState(null); // Clear state if exited normally
            setActiveMode(null); // Return to Choose Mode page
          }} 
          onPause={(state) => {
            setFrozenState(state);
            setIsExamRunning(false);
            setActiveMode(null); // Return to Choose Mode page
          }}
          initialState={frozenState}
          tutorMode={frozenState ? frozenState.tutorMode : tutorMode} 
        />
      </div>
    );
  }

  const selectedModeData = QUIZ_MODES.find(m => m.id === activeMode);

  if (activeMode && selectedModeData) {
    const Icon = selectedModeData.icon;
    const currentCourse = ENROLLED_COURSES[selectedCourse as keyof typeof ENROLLED_COURSES];

    return (
      <div className="max-w-[1000px] mx-auto pt-4 pb-12 font-sans h-full flex flex-col animation-fade-in">
        <button 
          onClick={() => setActiveMode(null)}
          className="flex items-center space-x-2 text-muted hover:text-primary transition-colors mb-8 self-start group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold tracking-wide uppercase text-sm">Back to Modes</span>
        </button>

        {/* Header */}
        <div className="flex items-center space-x-4 mb-10 pb-6 border-b border-divider">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border ${selectedModeData.bgColor} ${selectedModeData.color} ${selectedModeData.borderColor}`}>
            <Icon className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <h2 className="text-3xl font-black text-primary tracking-widest uppercase">Drill Tuning</h2>
              {selectedModeData.badge && (
                <div className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${selectedModeData.borderColor} ${selectedModeData.color} ${selectedModeData.bgColor}`}>
                  {selectedModeData.badge}
                </div>
              )}
            </div>
            <p className="text-muted font-medium">Configuring session for <span className={`${selectedModeData.color}`}>{selectedModeData.title}</span></p>
          </div>
        </div>

        {/* Tuning Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Target Selection */}
          <div className="space-y-6 bg-surface border border-divider p-6 rounded-3xl">
            <h3 className="text-primary font-bold tracking-wide uppercase flex items-center space-x-2 mb-6">
              <Target className="w-5 h-5 text-blue-400" />
              <span>Target Selection</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center space-x-2">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Enrolled Course</span>
                </label>
                <select 
                  value={selectedCourse}
                  onChange={(e) => {
                    setSelectedCourse(e.target.value);
                    setSelectedModule(ENROLLED_COURSES[e.target.value as keyof typeof ENROLLED_COURSES].modules[0]);
                  }}
                  className="w-full bg-base border border-divider text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
                >
                  {Object.entries(ENROLLED_COURSES).map(([key, course]) => (
                    <option key={key} value={key}>{course.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center space-x-2 mt-4">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Specific Module</span>
                </label>
                <select 
                  value={selectedModule}
                  onChange={(e) => setSelectedModule(e.target.value)}
                  className="w-full bg-base border border-divider text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
                >
                  {currentCourse.modules.map((mod) => (
                    <option key={mod} value={mod}>{mod}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Parameters */}
          <div className="space-y-6 bg-surface border border-divider p-6 rounded-3xl">
            <h3 className="text-primary font-bold tracking-wide uppercase flex items-center space-x-2 mb-6">
              <Settings2 className="w-5 h-5 text-emerald-400" />
              <span>Session Parameters</span>
            </h3>

            {/* Difficulty */}
            <div className="mb-6">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center space-x-2">
                <Activity className="w-3.5 h-3.5" />
                <span>Difficulty Level</span>
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['Easy', 'Medium', 'Hard', 'Mixed'].map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => setDifficulty(lvl)}
                    className={`py-2 px-1 rounded-lg text-xs font-bold tracking-wide transition-all border ${
                      difficulty === lvl 
                        ? 'bg-blue-500/20 text-blue-400 border-blue-500/50' 
                        : 'bg-base text-muted border-divider hover:border-slate-600'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Questions amount */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center space-x-2">
                <Hash className="w-3.5 h-3.5" />
                <span>Number of Questions</span>
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['10', '20', '40', 'Endless'].map(count => (
                  <button
                    key={count}
                    onClick={() => setQuestionCount(count)}
                    className={`py-2 px-1 rounded-lg text-xs font-bold tracking-wide transition-all border ${
                      questionCount === count 
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' 
                        : 'bg-base text-muted border-divider hover:border-slate-600'
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Advanced / Environmental */}
          <div className="space-y-6 bg-surface border border-divider p-6 rounded-3xl md:col-span-2">
            <h3 className="text-primary font-bold tracking-wide uppercase flex items-center space-x-2 mb-6">
              <Clock className="w-5 h-5 text-purple-400" />
              <span>Environment & Flow</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Timer options */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block">
                  Time Constraints
                </label>
                <div className="flex space-x-2">
                  {['Untimed', 'Standard (1m/q)', 'Blitz (30s/q)'].map(t => (
                    <button
                      key={t}
                      onClick={() => setTimerMode(t)}
                      className={`flex-1 py-2 px-2 rounded-lg text-xs font-bold tracking-wide transition-all border ${
                        timerMode === t 
                          ? 'bg-purple-500/20 text-purple-400 border-purple-500/50' 
                          : 'bg-base text-muted border-divider hover:border-slate-600'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tutor Mode Toggle */}
              <div className="flex items-center justify-between bg-base p-4 rounded-xl border border-divider">
                <div>
                  <h4 className="text-sm font-bold text-primary tracking-wide">Tutor Mode</h4>
                  <p className="text-xs text-muted mt-1">Show correct answers & explanations immediately after each question</p>
                </div>
                <button 
                  onClick={() => setTutorMode(!tutorMode)}
                  className={`w-12 h-6 rounded-full relative transition-colors duration-300 focus:outline-none ${tutorMode ? 'bg-blue-500' : 'bg-slate-700'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform duration-300 ${tutorMode ? 'translate-x-7' : 'translate-x-1'}`}></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex justify-end">
          <button 
            onClick={() => setIsExamRunning(true)}
            className="bg-white text-[#020617] hover:bg-slate-200 px-8 py-4 rounded-xl font-black uppercase tracking-widest transition-all flex items-center space-x-3 transform active:scale-95 shadow-xl hover:shadow-white/20"
          >
            <span>Initialize Session</span>
            <Play className="w-5 h-5 fill-current" />
          </button>
        </div>

      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto pt-8 pb-12 font-sans h-full flex flex-col animation-fade-in">
      <div className="mb-8 text-center md:text-left">
        <h2 className="text-4xl font-black text-primary tracking-widest uppercase mb-4">
          Choose Study Mode
        </h2>
        <p className="text-muted text-lg max-w-2xl">
          Select the type of practice session that fits your current goals. From AI-assisted mastery to full exam simulation.
        </p>
      </div>

      {frozenState && (
        <div className="mb-10 bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between shadow-[0_0_30px_rgba(245,158,11,0.05)]">
           <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center border border-amber-500/30">
                 <PlayCircle className="w-6 h-6 text-amber-400 fill-amber-400" />
              </div>
              <div>
                 <h4 className="text-amber-400 font-bold uppercase tracking-widest text-sm mb-1">Paused Session Found</h4>
                 <p className="text-primary text-lg">You have a drill in progress. (Question {frozenState.currentIndex + 1} / 10)</p>
                 <div className="flex items-center space-x-3 mt-1 text-muted text-sm font-medium">
                   <span>{Object.keys(frozenState.answers).length} Answered</span>
                   <span>•</span>
                   <span>{Object.keys(frozenState.flags).filter(k => frozenState.flags[Number(k)]).length} Flagged</span>
                 </div>
              </div>
           </div>
           <div className="flex space-x-3 w-full md:w-auto">
             <button 
               onClick={() => setFrozenState(null)}
               className="flex-1 md:flex-none px-6 py-3 rounded-xl border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 font-bold uppercase tracking-widest text-sm transition-all"
             >
               Discard
             </button>
             <button 
               onClick={() => setIsExamRunning(true)}
               className="flex-1 md:flex-none bg-amber-500 hover:bg-amber-400 text-black px-6 py-3 rounded-xl font-black uppercase tracking-widest text-sm transition-all shadow-lg shadow-amber-500/20 transform active:scale-95 flex items-center justify-center space-x-2"
             >
               <span>Resume Drill</span>
               <ChevronRight className="w-4 h-4 text-black" />
             </button>
           </div>
        </div>
      )}

      {/* Modes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 flex-1">
        {QUIZ_MODES.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setActiveMode(mode.id as ModeId)}
            className={`group flex flex-col items-start p-8 rounded-3xl border border-divider bg-surface cursor-pointer transition-all duration-300 ${mode.hoverBorder} hover:shadow-xl hover:-translate-y-1 relative overflow-hidden text-left`}
          >
            {/* Background Accent Glow */}
            <div className={`absolute top-0 right-0 w-64 h-64 ${mode.bgColor} rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity pointer-events-none transform translate-x-1/2 -translate-y-1/2`}></div>
            
            <div className="flex justify-between items-start w-full mb-6 relative z-10">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border ${mode.bgColor} ${mode.color} ${mode.borderColor} shadow-inner`}>
                <mode.icon className="w-8 h-8" />
              </div>
              
              {mode.badge && (
                <div className={`px-3 py-1 flex items-center space-x-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${mode.borderColor} ${mode.color} ${mode.bgColor}`}>
                  {mode.badge === 'AI Powered' && <Sparkles className="w-3 h-3" />}
                  <span>{mode.badge}</span>
                </div>
              )}
            </div>

            <div className="relative z-10 flex-1">
              <h3 className="text-2xl font-bold text-primary mb-3 tracking-wide">{mode.title}</h3>
              <p className="text-muted leading-relaxed">
                {mode.description}
              </p>
            </div>

            <div className="mt-8 flex items-center space-x-2 text-slate-500 group-hover:text-primary transition-colors relative z-10 font-bold uppercase tracking-widest text-sm">
              <span>Enter Mode</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
