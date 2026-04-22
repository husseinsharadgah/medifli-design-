import { useState } from 'react';
import { CheckCircle2, Brain, Target, RotateCcw, Zap, Settings2, Play, BookOpen, Edit3, FileText } from 'lucide-react';
import { QuizInterface } from './QuizInterface';

const practiceModes = [
  { id: 'adaptive', name: 'Smart Adaptive', desc: 'AI-driven mix focusing on your weak areas.', icon: Brain, color: 'text-purple-600', bg: 'bg-purple-100', border: 'border-purple-200', activeBorder: 'border-purple-600', activeBg: 'bg-purple-50' },
  { id: 'topic', name: 'Topic Drill', desc: 'Deep dive into specific subjects or chapters.', icon: Target, color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-200', activeBorder: 'border-blue-600', activeBg: 'bg-blue-50' },
  { id: 'review', name: 'Review Mistakes', desc: 'Re-attempt questions you previously got wrong.', icon: RotateCcw, color: 'text-rose-600', bg: 'bg-rose-100', border: 'border-rose-200', activeBorder: 'border-rose-600', activeBg: 'bg-rose-50' },
  { id: 'speed', name: 'Speed Sprint', desc: 'Answer as many as possible in 5 minutes.', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-100', border: 'border-amber-200', activeBorder: 'border-amber-600', activeBg: 'bg-amber-50' },
];

const drillFormats = [
  { id: 'mixed', name: 'Mixed Format', icon: Zap },
  { id: 'mcq', name: 'Multiple Choice', icon: CheckCircle2 },
  { id: 'fitb', name: 'Fill in the Blank', icon: Edit3 },
  { id: 'flashcard', name: 'Flashcards', icon: BookOpen },
  { id: 'past_exam', name: 'Past Exam Papers', icon: FileText },
];

const subjects = ['All Subjects', 'Algebra', 'Geometry', 'Calculus', 'Physics', 'Chemistry', 'Biology'];
const difficulties = ['Mixed', 'Easy', 'Medium', 'Hard'];
const lengths = [10, 20, 30, 'Endless'];


export function PracticeMode() {
  const [phase, setPhase] = useState<'setup' | 'playing'>('setup');
  
  // Setup State
  const [selectedMode, setSelectedMode] = useState('adaptive');
  const [selectedFormat, setSelectedFormat] = useState('mixed');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Mixed');
  const [selectedLength, setSelectedLength] = useState<number | string>(20);

  const handleStart = () => {
    setPhase('playing');
  };

  if (phase === 'setup') {
    return (
      <div className="max-w-5xl mx-auto space-y-8 pb-12">
        <header>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Practice Setup</h2>
          <p className="text-slate-500 mt-1">Customize your session to focus on exactly what you need.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Modes */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <Settings2 className="w-5 h-5 text-muted" />
              <span>1. Choose Practice Mode</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {practiceModes.map((mode) => {
                const isSelected = selectedMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    onClick={() => setSelectedMode(mode.id)}
                    className={`text-left p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                      isSelected ? `${mode.activeBorder} ${mode.activeBg}` : `border-slate-200 hover:border-slate-300 bg-white`
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${mode.bg}`}>
                      <mode.icon className={`w-6 h-6 ${mode.color}`} />
                    </div>
                    <h4 className={`text-lg font-bold mb-1 ${isSelected ? 'text-slate-900' : 'text-slate-700'}`}>
                      {mode.name}
                    </h4>
                    <p className={`text-sm ${isSelected ? 'text-slate-700' : 'text-slate-500'}`}>
                      {mode.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8 mt-8">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">2. Fine-tune Settings</h3>
              
              {/* Drill Format Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700">Drill Format</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {drillFormats.map(format => (
                    <button
                      key={format.id}
                      onClick={() => setSelectedFormat(format.id)}
                      className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer border ${
                        selectedFormat === format.id 
                          ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm' 
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <format.icon className={`w-4 h-4 ${selectedFormat === format.id ? 'text-indigo-600' : 'text-muted'}`} />
                      <span>{format.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700">Subject Focus</label>
                <div className="flex flex-wrap gap-2">
                  {subjects.map(subject => (
                    <button
                      key={subject}
                      onClick={() => setSelectedSubject(subject)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                        selectedSubject === subject 
                          ? 'bg-slate-900 text-primary' 
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {subject}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Difficulty */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700">Difficulty Level</label>
                  <div className="flex bg-slate-100 p-1 rounded-xl">
                    {difficulties.map(diff => (
                      <button
                        key={diff}
                        onClick={() => setSelectedDifficulty(diff)}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer ${
                          selectedDifficulty === diff 
                            ? 'bg-white text-slate-900 shadow-sm' 
                            : 'text-slate-500 hover:text-slate-700'
                        }`}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Length */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700">Session Length</label>
                  <div className="flex bg-slate-100 p-1 rounded-xl">
                    {lengths.map(len => (
                      <button
                        key={len}
                        onClick={() => setSelectedLength(len)}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer ${
                          selectedLength === len 
                            ? 'bg-white text-slate-900 shadow-sm' 
                            : 'text-slate-500 hover:text-slate-700'
                        }`}
                      >
                        {len}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Summary & Start */}
          <div className="space-y-6">
            <div className="bg-indigo-600 rounded-2xl p-8 text-primary shadow-lg sticky top-8">
              <h3 className="text-xl font-bold mb-6">Session Summary</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center border-b border-indigo-500/50 pb-4">
                  <span className="text-indigo-200">Mode</span>
                  <span className="font-medium">{practiceModes.find(m => m.id === selectedMode)?.name}</span>
                </div>
                <div className="flex justify-between items-center border-b border-indigo-500/50 pb-4">
                  <span className="text-indigo-200">Format</span>
                  <span className="font-medium">{drillFormats.find(f => f.id === selectedFormat)?.name}</span>
                </div>
                <div className="flex justify-between items-center border-b border-indigo-500/50 pb-4">
                  <span className="text-indigo-200">Subject</span>
                  <span className="font-medium">{selectedSubject}</span>
                </div>
                <div className="flex justify-between items-center border-b border-indigo-500/50 pb-4">
                  <span className="text-indigo-200">Difficulty</span>
                  <span className="font-medium">{selectedDifficulty}</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="text-indigo-200">Questions</span>
                  <span className="font-medium">{selectedLength}</span>
                </div>
              </div>

              <button 
                onClick={handleStart}
                className="w-full bg-white text-indigo-600 hover:bg-indigo-50 py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Start Session</span>
              </button>
              
              <p className="text-center text-indigo-200 text-sm mt-4">
                Estimated time: {typeof selectedLength === 'number' ? `${Math.round(selectedLength * 1.5)} mins` : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Playing Phase
  return <QuizInterface onExit={() => setPhase('setup')} />;
}
