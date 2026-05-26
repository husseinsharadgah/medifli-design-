import React, { useState } from 'react';
import { 
  Brain, Target, RotateCcw, FileText, ChevronRight, Sparkles, 
  ArrowLeft, BookOpen, Layers, Activity, Hash, Clock, Settings2, Play, PlayCircle
} from 'lucide-react';
import { MockExam, ExamState } from './MockExam';
import { ReviewMistakesDashboard } from './ReviewMistakesDashboard';
import { ExamSimulatorMode } from './ExamSimulatorMode';

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
    id: 'exam-simulator',
    title: 'Exam Simulator Mode',
    description: 'A full mock exam experience mirroring real university formatting. Timed, weighted, and realistic.',
    icon: Target,
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/30',
    hoverBorder: 'hover:border-indigo-500',
    badge: 'Simulation'
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
    modules: {
      "Cerebral Hemispheres": ["Frontal Lobe", "Parietal Lobe", "Temporal Lobe", "Occipital Lobe"],
      "Basal Ganglia": ["Striatum", "Globus Pallidus", "Subthalamic Nucleus", "Substantia Nigra"],
      "Brainstem": ["Midbrain", "Pons", "Medulla"],
      "Spinal Cord": ["Ascending Tracts", "Descending Tracts", "Spinal Nerves"]
    }
  },
  "surgery": {
    name: "Surgical Pathophysiology",
    modules: {
      "Fluid Management": ["Crystalloids vs Colloids", "Maintenance Fluids", "Fluid Resuscitation"],
      "Bleeding & Transfusion": ["Blood Products", "Massive Transfusion Protocol", "Coagulopathy"],
      "Wound Healing": ["Phases of Healing", "Types of Closure", "Complications"]
    }
  },
  "cardio": {
    name: "Advanced Cardiovascular Medicine",
    modules: {
      "ECG Mastery": ["Normal Sinus Rhythm", "Bradyarrhythmias", "Tachyarrhythmias", "Ischemia and Infarction"],
      "Heart Failure": ["HFrEF", "HFpEF", "Acute Decompensated Heart Failure"],
      "Valvular Disease": ["Aortic Stenosis", "Mitral Regurgitation", "Aortic Regurgitation", "Mitral Stenosis"],
      "Arrhythmias": ["Atrial Fibrillation", "Ventricular Tachycardia", "SVT"]
    }
  }
};

type ModeId = 'smart-adapt' | 'exam-simulator' | 'review-mistakes' | 'past-papers' | null;

export function Quizzes() {
  const [activeMode, setActiveMode] = useState<ModeId>(null);
  const [isExamRunning, setIsExamRunning] = useState(false);
  const [frozenState, setFrozenState] = useState<ExamState | null>(null);

  // Tuning State
  const [setupStep, setSetupStep] = useState<number>(1);
  const [quizScope, setQuizScope] = useState<'course' | 'module' | 'lecture'>('course');
  const [selectedCourse, setSelectedCourse] = useState<string>("neuro");
  const [selectedModule, setSelectedModule] = useState<string>("Cerebral Hemispheres");
  const [selectedLecture, setSelectedLecture] = useState<string>("Frontal Lobe");
  const [difficulty, setDifficulty] = useState<string>("Mixed");
  const [questionCount, setQuestionCount] = useState<string>("20");
  const [timerMode, setTimerMode] = useState<string>("Untimed");
  const [tutorMode, setTutorMode] = useState<boolean>(true);
  const [examNavigation, setExamNavigation] = useState<string>("One Way");

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
    if (activeMode === 'exam-simulator') {
      return (
        <ExamSimulatorMode onBack={() => {
          setActiveMode(null);
          setSetupStep(1);
        }} />
      );
    }

    if (activeMode === 'review-mistakes') {
      return (
        <ReviewMistakesDashboard onBack={() => {
          setActiveMode(null);
          setSetupStep(1);
        }} />
      );
    }

    const currentCourse = ENROLLED_COURSES[selectedCourse as keyof typeof ENROLLED_COURSES] as any;

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
            {selectedModeData.icon && React.createElement(selectedModeData.icon, { className: "w-8 h-8" })}
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

        {/* Tuning Area */}
        <div className="space-y-6">
          {/* Wizard Progress */}
          <div className="flex items-center space-x-4 mb-8">
            {[1, 2, 3].map(step => (
              <React.Fragment key={step}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  setupStep === step ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' : 
                  setupStep > step ? 'bg-emerald-500 text-white' : 'bg-surface border border-divider text-muted'
                }`}>
                  {setupStep > step ? <Target className="w-4 h-4" /> : step}
                </div>
                {step < 3 && (
                  <div className={`flex-1 h-1 rounded-full ${setupStep > step ? 'bg-emerald-500' : 'bg-surface border border-divider'}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step 1: Target Selection */}
          {setupStep === 1 && (
            <div className="space-y-6 max-w-xl mx-auto animation-fade-in">
              <div className="space-y-6 bg-surface border border-divider p-8 rounded-3xl shadow-lg">
                <h3 className="text-primary font-bold tracking-wide uppercase flex items-center space-x-2 mb-8">
                  <Target className="w-5 h-5 text-blue-400" />
                  <span>Target Selection</span>
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center space-x-2">
                      <Target className="w-3.5 h-3.5" />
                      <span>Quiz Scope</span>
                    </label>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {[
                        { id: 'course', label: 'Full Course' },
                        { id: 'module', label: 'Specific Module' },
                        { id: 'lecture', label: 'Specific Lecture' }
                      ].map(scope => (
                        <button
                          key={scope.id}
                          onClick={() => {
                            setQuizScope(scope.id as 'course' | 'module' | 'lecture');
                          }}
                          className={`py-3 px-2 rounded-xl text-[10px] sm:text-xs font-bold tracking-wide transition-all border cursor-pointer ${
                            quizScope === scope.id 
                              ? 'bg-blue-500/20 text-blue-400 border-blue-500/50 shadow-md shadow-blue-500/10' 
                              : 'bg-base text-muted border-divider hover:border-slate-600'
                          }`}
                        >
                          {scope.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center space-x-2">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Enrolled Course</span>
                    </label>
                    <select 
                      value={selectedCourse}
                      onChange={(e) => {
                        const courseKey = e.target.value as keyof typeof ENROLLED_COURSES;
                        setSelectedCourse(courseKey);
                        const firstModule = Object.keys(ENROLLED_COURSES[courseKey].modules)[0];
                        setSelectedModule(firstModule);
                        setSelectedLecture(ENROLLED_COURSES[courseKey].modules[firstModule as keyof typeof ENROLLED_COURSES[typeof courseKey]["modules"]][0]);
                      }}
                      className="w-full bg-base border border-divider text-primary rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
                    >
                      {Object.entries(ENROLLED_COURSES).map(([key, course]) => (
                        <option key={key} value={key}>{course.name}</option>
                      ))}
                    </select>
                  </div>

                  {(quizScope === 'module' || quizScope === 'lecture') && (
                    <div className="animation-fade-in">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center space-x-2 mt-4">
                        <Layers className="w-3.5 h-3.5" />
                        <span>Specific Module</span>
                      </label>
                      <select 
                        value={selectedModule}
                        onChange={(e) => {
                           setSelectedModule(e.target.value);
                           const courseObj = ENROLLED_COURSES[selectedCourse as keyof typeof ENROLLED_COURSES] as any;
                           const modLectures = courseObj.modules[e.target.value as keyof typeof courseObj.modules] || [];
                           if (modLectures.length > 0) setSelectedLecture(modLectures[0]);
                        }}
                        className="w-full bg-base border border-divider text-primary rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
                      >
                        {Object.keys(currentCourse.modules).map((mod: string) => (
                          <option key={mod} value={mod}>{mod}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {quizScope === 'lecture' && (
                    <div className="animation-fade-in">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center space-x-2 mt-4">
                        <FileText className="w-3.5 h-3.5" />
                        <span>Specific Lecture</span>
                      </label>
                      <select 
                        value={selectedLecture}
                        onChange={(e) => setSelectedLecture(e.target.value)}
                        className="w-full bg-base border border-divider text-primary rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
                      >
                        {(currentCourse.modules[selectedModule as keyof typeof currentCourse.modules] || []).map((lec: string) => (
                          <option key={lec} value={lec}>{lec}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <button onClick={() => setSetupStep(2)} className="bg-blue-500 text-white hover:bg-blue-600 px-8 py-3 rounded-xl font-bold uppercase tracking-widest transition-all flex items-center space-x-2 active:scale-95 shadow-lg shadow-blue-500/20 cursor-pointer">
                  <span>Next Step</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Parameters & Environment */}
          {setupStep === 2 && (
            <div className="space-y-6 max-w-2xl mx-auto animation-fade-in">
              <div className="space-y-8 bg-surface border border-divider p-8 rounded-3xl shadow-lg">
                <div>
                  <h3 className="text-primary font-bold tracking-wide uppercase flex items-center space-x-2 mb-6">
                    <Settings2 className="w-5 h-5 text-emerald-400" />
                    <span>Session Parameters</span>
                  </h3>
                  <div className="space-y-6">
                    {/* Difficulty Level */}
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center space-x-2">
                        <Activity className="w-3.5 h-3.5" />
                        <span>Difficulty Level</span>
                      </label>
                      <div className="grid grid-cols-4 gap-3">
                        {['Easy', 'Medium', 'Hard', 'Mixed'].map(lvl => (
                          <button
                            key={lvl}
                            onClick={() => setDifficulty(lvl)}
                            className={`py-3 px-2 rounded-xl text-xs font-bold tracking-wide transition-all border cursor-pointer ${
                              difficulty === lvl 
                                ? 'bg-blue-500/20 text-blue-400 border-blue-500/50 shadow-md shadow-blue-500/10' 
                                : 'bg-base text-muted border-divider hover:border-slate-600'
                            }`}
                          >
                            {lvl}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Number of Questions */}
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center space-x-2">
                        <Hash className="w-3.5 h-3.5" />
                        <span>Number of Questions</span>
                      </label>
                      <div className="grid grid-cols-4 gap-3">
                        {['10', '20', '40', 'Endless'].map(count => (
                          <button
                            key={count}
                            onClick={() => setQuestionCount(count)}
                            className={`py-3 px-2 rounded-xl text-xs font-bold tracking-wide transition-all border cursor-pointer ${
                              questionCount === count 
                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-md shadow-emerald-500/10' 
                                : 'bg-base text-muted border-divider hover:border-slate-600'
                            }`}
                          >
                            {count}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Exam Navigation */}
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center space-x-2">
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span>Exam Navigation</span>
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {['One Way', 'Two Way'].map(nav => (
                          <button
                            key={nav}
                            onClick={() => setExamNavigation(nav)}
                            className={`py-3 px-2 rounded-xl text-xs font-bold tracking-wide transition-all border cursor-pointer ${
                              examNavigation === nav 
                                ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/50 shadow-md shadow-indigo-500/10' 
                                : 'bg-base text-muted border-divider hover:border-slate-600'
                            }`}
                          >
                            {nav}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="border-divider" />

                <div>
                  <h3 className="text-primary font-bold tracking-wide uppercase flex items-center space-x-2 mb-6">
                    <Clock className="w-5 h-5 text-purple-400" />
                    <span>Environment & Flow</span>
                  </h3>
                  <div className="space-y-6">
                    {/* Time Constraints */}
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block">
                        Time Constraints
                      </label>
                      <div className="flex space-x-3">
                        {['Untimed', 'Standard (1m/q)', 'Blitz (30s/q)'].map(t => (
                          <button
                            key={t}
                            onClick={() => setTimerMode(t)}
                            className={`flex-1 py-3 px-2 rounded-xl text-xs font-bold tracking-wide transition-all border cursor-pointer ${
                              timerMode === t 
                                ? 'bg-purple-500/20 text-purple-400 border-purple-500/50 shadow-md shadow-purple-500/10' 
                                : 'bg-base text-muted border-divider hover:border-slate-600'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Tutor Mode Toggle */}
                    <div className="flex items-center justify-between bg-base p-5 rounded-xl border border-divider">
                      <div>
                        <h4 className="text-sm font-bold text-primary tracking-wide">Tutor Mode</h4>
                        <p className="text-xs text-muted mt-1">Show correct answers & explanations immediately after each question</p>
                      </div>
                      <button 
                        onClick={() => setTutorMode(!tutorMode)}
                        className={`w-14 h-7 rounded-full relative transition-colors duration-300 focus:outline-none cursor-pointer ${tutorMode ? 'bg-blue-500' : 'bg-slate-700'}`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white absolute top-1 transition-transform duration-300 ${tutorMode ? 'translate-x-8' : 'translate-x-1'}`}></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between pt-4">
                <button onClick={() => setSetupStep(1)} className="text-muted hover:text-primary transition-colors font-bold uppercase tracking-widest flex items-center space-x-2 cursor-pointer">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button onClick={() => setSetupStep(3)} className="bg-blue-500 text-white hover:bg-blue-600 px-8 py-3 rounded-xl font-bold uppercase tracking-widest transition-all flex items-center space-x-2 active:scale-95 shadow-lg shadow-blue-500/20 cursor-pointer">
                  <span>Next Step</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Summary */}
          {setupStep === 3 && (
            <div className="space-y-6 max-w-xl mx-auto animation-fade-in">
              <div className="bg-surface border border-divider p-8 rounded-3xl shadow-lg relative overflow-hidden">
                <div className={`absolute -top-10 -right-10 w-32 h-32 ${selectedModeData.bgColor} rounded-full blur-2xl opacity-40`}></div>
                <h3 className="text-primary font-bold tracking-wide uppercase flex items-center space-x-2 mb-8">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>Session Summary</span>
                </h3>
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-divider pb-4">
                    <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Study Mode</span>
                    <span className={`font-extrabold text-sm uppercase ${selectedModeData.color}`}>{selectedModeData.title}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-divider pb-4">
                    <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Course</span>
                    <span className="text-primary font-bold text-right ml-4">{ENROLLED_COURSES[selectedCourse as keyof typeof ENROLLED_COURSES].name}</span>
                  </div>
                  {(quizScope === 'module' || quizScope === 'lecture') && (
                    <div className="flex justify-between items-center border-b border-divider pb-4 animation-fade-in">
                      <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Module</span>
                      <span className="text-primary font-bold text-right ml-4">{selectedModule}</span>
                    </div>
                  )}
                  {quizScope === 'lecture' && (
                    <div className="flex justify-between items-center border-b border-divider pb-4 animation-fade-in">
                      <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Lecture</span>
                      <span className="text-primary font-bold text-right ml-4">{selectedLecture}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center border-b border-divider pb-4">
                    <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Difficulty</span>
                    <span className="text-primary font-bold">{difficulty}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-divider pb-4">
                    <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Questions</span>
                    <span className="text-primary font-bold">{questionCount} questions</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-divider pb-4">
                    <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Navigation</span>
                    <span className="text-primary font-bold">{examNavigation}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-divider pb-4">
                    <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Timer</span>
                    <span className="text-primary font-bold">{timerMode}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Tutor Mode</span>
                    <span className={`font-bold ${tutorMode ? 'text-blue-400' : 'text-slate-400'}`}>{tutorMode ? 'Enabled' : 'Disabled'}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4">
                <button onClick={() => setSetupStep(2)} className="text-muted hover:text-primary transition-colors font-bold uppercase tracking-widest flex items-center space-x-2 cursor-pointer">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button 
                  onClick={() => setIsExamRunning(true)}
                  className="bg-white text-[#020617] hover:bg-slate-200 px-8 py-3 rounded-xl font-black uppercase tracking-widest transition-all flex items-center space-x-3 transform active:scale-95 shadow-xl hover:shadow-white/20 cursor-pointer"
                >
                  <span>Initialize Session</span>
                  <Play className="w-5 h-5 fill-current" />
                </button>
              </div>
            </div>
          )}
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
            onClick={() => {
              setActiveMode(mode.id as ModeId);
              setSetupStep(1);
            }}
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
