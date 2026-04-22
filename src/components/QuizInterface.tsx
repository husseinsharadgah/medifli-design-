import React, { useState, useEffect } from 'react';
import { 
  Clock, Flag, ChevronLeft, ChevronRight, Pause, X, 
  LayoutGrid, Maximize2, Image as ImageIcon, CheckCircle2, AlertCircle
} from 'lucide-react';

type QuestionType = 'mcq' | 'clinical' | 'image' | 'fill-in' | 'flashcard';

interface Question {
  id: string;
  type: QuestionType;
  text: string;
  context?: string;
  labs?: Record<string, string>;
  imageUrl?: string;
  options?: string[];
  correctAnswer?: string;
  flashcardAnswer?: string;
}

const mockQuestions: Question[] = [
  {
    id: 'Q-001',
    type: 'mcq',
    text: 'Which of the following is the most common bacterial cause of community-acquired pneumonia in adults?',
    options: [
      'Staphylococcus aureus',
      'Streptococcus pneumoniae',
      'Haemophilus influenzae',
      'Mycoplasma pneumoniae',
      'Legionella pneumophila'
    ],
    correctAnswer: 'Streptococcus pneumoniae'
  },
  {
    id: 'Q-002',
    type: 'clinical',
    text: 'Based on the patient\'s presentation and laboratory findings, what is the most appropriate next step in management?',
    context: 'A 65-year-old male presents to the emergency department with a 2-hour history of crushing substernal chest pain radiating to his left jaw. He is diaphoretic and short of breath. He has a history of hypertension and type 2 diabetes mellitus. His current medications include lisinopril and metformin.\n\nOn physical examination, his blood pressure is 160/90 mmHg, heart rate is 110 bpm, and respiratory rate is 22/min. Lungs are clear to auscultation bilaterally.',
    labs: {
      'Troponin I': 'Elevated (2.4 ng/mL)',
      'CK-MB': 'Elevated',
      'ECG': 'ST-segment elevation in leads II, III, aVF'
    },
    options: [
      'Administer sublingual nitroglycerin and discharge',
      'Immediate percutaneous coronary intervention (PCI)',
      'Schedule an outpatient exercise stress test',
      'Administer a proton pump inhibitor',
      'Obtain a chest CT angiogram'
    ],
    correctAnswer: 'Immediate percutaneous coronary intervention (PCI)'
  },
  {
    id: 'Q-003',
    type: 'image',
    text: 'Identify the rhythm shown in the electrocardiogram strip above.',
    imageUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    options: [
      'Normal Sinus Rhythm',
      'Atrial Fibrillation',
      'Ventricular Tachycardia',
      'First-Degree AV Block',
      'Sinus Bradycardia'
    ],
    correctAnswer: 'Atrial Fibrillation'
  },
  {
    id: 'Q-004',
    type: 'fill-in',
    text: 'The primary neurotransmitter released by motor neurons at the neuromuscular junction is {blank}.',
    correctAnswer: 'acetylcholine'
  },
  {
    id: 'Q-005',
    type: 'flashcard',
    text: 'Describe the mechanism of action of ACE inhibitors (e.g., Lisinopril) and their primary clinical use.',
    flashcardAnswer: 'ACE inhibitors block the conversion of Angiotensin I to Angiotensin II by inhibiting the angiotensin-converting enzyme. This leads to vasodilation and decreased aldosterone secretion. They are primarily used to treat hypertension, heart failure, and to protect kidney function in diabetic nephropathy.'
  }
];

export function QuizInterface({ onExit }: { onExit: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [showGrid, setShowGrid] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(2700); // 45 minutes
  
  // Flashcard specific state
  const [isFlipped, setIsFlipped] = useState(false);
  const [selfRating, setSelfRating] = useState<string | null>(null);

  const question = mockQuestions[currentIndex];

  useEffect(() => {
    // Reset flashcard state when changing questions
    setIsFlipped(false);
    setSelfRating(null);
  }, [currentIndex]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (option: string) => {
    setAnswers(prev => ({ ...prev, [question.id]: option }));
  };

  const handleFillInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers(prev => ({ ...prev, [question.id]: e.target.value }));
  };

  const toggleFlag = () => {
    setFlagged(prev => {
      const next = new Set(prev);
      if (next.has(question.id)) next.delete(question.id);
      else next.add(question.id);
      return next;
    });
  };

  const goToNext = () => {
    if (currentIndex < mockQuestions.length - 1) setCurrentIndex(prev => prev + 1);
  };

  const goToPrev = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  // --- Layout Renderers ---

  const renderMCQ = () => (
    <div className="max-w-3xl mx-auto space-y-8">
      <h2 className="text-xl md:text-2xl font-medium text-slate-900 leading-relaxed">
        {question.text}
      </h2>
      <div className="space-y-3">
        {question.options?.map((option, idx) => {
          const isSelected = answers[question.id] === option;
          return (
            <button
              key={idx}
              onClick={() => handleOptionSelect(option)}
              className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 flex items-start space-x-4 ${
                isSelected 
                  ? 'border-indigo-600 bg-indigo-50/50 shadow-sm' 
                  : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
              }`}
            >
              <div className={`w-7 h-7 shrink-0 rounded-full border-2 flex items-center justify-center text-sm font-bold mt-0.5 ${
                isSelected ? 'border-indigo-600 bg-indigo-600 text-primary' : 'border-slate-300 text-slate-500'
              }`}>
                {String.fromCharCode(65 + idx)}
              </div>
              <span className={`text-lg ${isSelected ? 'text-indigo-900 font-medium' : 'text-slate-700'}`}>
                {option}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderClinical = () => (
    <div className="flex flex-col lg:flex-row gap-8 h-full">
      {/* Left Pane: Clinical Context */}
      <div className="lg:w-1/2 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 overflow-y-auto shadow-sm">
        <div className="flex items-center space-x-2 mb-6 pb-4 border-b border-slate-100">
          <AlertCircle className="w-5 h-5 text-rose-500" />
          <h3 className="text-lg font-bold text-slate-900">Clinical Vignette</h3>
        </div>
        <div className="prose prose-slate max-w-none">
          <p className="text-slate-700 leading-relaxed whitespace-pre-wrap text-lg">
            {question.context}
          </p>
          
          {question.labs && (
            <div className="mt-8">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Laboratory & Imaging</h4>
              <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full text-sm text-left">
                  <tbody className="divide-y divide-slate-200">
                    {Object.entries(question.labs).map(([key, value]) => (
                      <tr key={key}>
                        <td className="px-4 py-3 font-medium text-slate-900 bg-slate-100/50 w-1/3">{key}</td>
                        <td className="px-4 py-3 text-slate-700">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Pane: Question & Options */}
      <div className="lg:w-1/2 flex flex-col space-y-8">
        <h2 className="text-xl font-medium text-slate-900 leading-relaxed">
          {question.text}
        </h2>
        <div className="space-y-3 flex-1">
          {question.options?.map((option, idx) => {
            const isSelected = answers[question.id] === option;
            return (
              <button
                key={idx}
                onClick={() => handleOptionSelect(option)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-start space-x-4 ${
                  isSelected 
                    ? 'border-indigo-600 bg-indigo-50/50 shadow-sm' 
                    : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                }`}
              >
                <div className={`w-6 h-6 shrink-0 rounded-full border-2 flex items-center justify-center text-xs font-bold mt-0.5 ${
                  isSelected ? 'border-indigo-600 bg-indigo-600 text-primary' : 'border-slate-300 text-slate-500'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </div>
                <span className={`text-base ${isSelected ? 'text-indigo-900 font-medium' : 'text-slate-700'}`}>
                  {option}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderImage = () => (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-slate-900 rounded-2xl overflow-hidden relative group aspect-video md:aspect-[21/9] flex items-center justify-center">
        <img 
          src={question.imageUrl} 
          alt="Reference" 
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          referrerPolicy="no-referrer"
        />
        <button className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-primary p-2 rounded-lg backdrop-blur-sm transition-colors flex items-center space-x-2">
          <Maximize2 className="w-4 h-4" />
          <span className="text-sm font-medium">Expand</span>
        </button>
      </div>
      
      <div className="max-w-3xl mx-auto space-y-8">
        <h2 className="text-xl md:text-2xl font-medium text-slate-900 leading-relaxed">
          {question.text}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {question.options?.map((option, idx) => {
            const isSelected = answers[question.id] === option;
            return (
              <button
                key={idx}
                onClick={() => handleOptionSelect(option)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-start space-x-3 ${
                  isSelected 
                    ? 'border-indigo-600 bg-indigo-50/50 shadow-sm' 
                    : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                }`}
              >
                <div className={`w-6 h-6 shrink-0 rounded-full border-2 flex items-center justify-center text-xs font-bold mt-0.5 ${
                  isSelected ? 'border-indigo-600 bg-indigo-600 text-primary' : 'border-slate-300 text-slate-500'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </div>
                <span className={`text-base ${isSelected ? 'text-indigo-900 font-medium' : 'text-slate-700'}`}>
                  {option}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderFillIn = () => {
    const parts = question.text.split('{blank}');
    return (
      <div className="max-w-3xl mx-auto space-y-12 text-center pt-12">
        <div className="inline-block text-2xl md:text-3xl font-medium text-slate-900 leading-relaxed">
          {parts[0]}
          <input
            type="text"
            value={answers[question.id] || ''}
            onChange={handleFillInChange}
            placeholder="type answer..."
            className="mx-3 border-b-2 border-slate-300 focus:border-indigo-600 outline-none text-center text-indigo-600 bg-transparent w-48 md:w-64 transition-colors placeholder:text-secondary pb-1"
            autoFocus
          />
          {parts[1]}
        </div>
      </div>
    );
  };

  const renderFlashcard = () => (
    <div className="max-w-2xl mx-auto pt-8">
      <div 
        className={`relative w-full aspect-[4/3] md:aspect-[16/9] perspective-1000 cursor-pointer group`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* Front */}
          <div className="absolute inset-0 backface-hidden bg-white border-2 border-slate-200 rounded-3xl p-8 md:p-12 flex flex-col items-center justify-center text-center shadow-sm group-hover:border-indigo-300 transition-colors">
            <span className="absolute top-6 left-6 text-xs font-bold text-muted uppercase tracking-wider">Front</span>
            <h2 className="text-2xl md:text-3xl font-medium text-slate-900 leading-relaxed">
              {question.text}
            </h2>
            <p className="absolute bottom-6 text-sm text-muted font-medium animate-pulse">Click to flip</p>
          </div>

          {/* Back */}
          <div className="absolute inset-0 backface-hidden bg-indigo-600 border-2 border-indigo-600 rounded-3xl p-8 md:p-12 flex flex-col items-center justify-center text-center shadow-lg rotate-y-180 text-primary">
            <span className="absolute top-6 left-6 text-xs font-bold text-indigo-300 uppercase tracking-wider">Back</span>
            <p className="text-xl md:text-2xl font-medium leading-relaxed">
              {question.flashcardAnswer}
            </p>
          </div>

        </div>
      </div>

      {/* Self Assessment (Shows only when flipped) */}
      <div className={`mt-12 transition-all duration-500 ${isFlipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <p className="text-center text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">How well did you know this?</p>
        <div className="flex justify-center space-x-4">
          <button 
            onClick={(e) => { e.stopPropagation(); setSelfRating('again'); goToNext(); }}
            className="px-6 py-3 rounded-xl font-bold text-rose-700 bg-rose-100 hover:bg-rose-200 transition-colors"
          >
            Again (1m)
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); setSelfRating('hard'); goToNext(); }}
            className="px-6 py-3 rounded-xl font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 transition-colors"
          >
            Hard (10m)
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); setSelfRating('good'); goToNext(); }}
            className="px-6 py-3 rounded-xl font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 transition-colors"
          >
            Good (1d)
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); setSelfRating('easy'); goToNext(); }}
            className="px-6 py-3 rounded-xl font-bold text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors"
          >
            Easy (4d)
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-hidden">
      
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-slate-200 px-4 md:px-6 py-3 flex items-center justify-between shrink-0 z-20 shadow-sm">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setShowGrid(!showGrid)}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title="Question Grid"
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <div className="h-6 w-px bg-slate-200 hidden md:block"></div>
          <div className="hidden md:flex flex-col">
            <span className="text-xs font-bold text-muted uppercase tracking-wider">Block 1</span>
            <span className="text-sm font-bold text-slate-900">Cardiovascular System</span>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 bg-slate-100 px-4 py-1.5 rounded-full">
            <Clock className={`w-4 h-4 ${timeLeft < 300 ? 'text-rose-500 animate-pulse' : 'text-slate-500'}`} />
            <span className={`font-mono font-bold text-sm ${timeLeft < 300 ? 'text-rose-600' : 'text-slate-700'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <button 
            onClick={() => setIsPaused(!isPaused)}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title={isPaused ? "Resume" : "Pause"}
          >
            {isPaused ? <ChevronRight className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
          </button>
          <button 
            onClick={onExit}
            className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            End Block
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Question Grid Sidebar (Slide over) */}
        <div className={`absolute inset-y-0 left-0 w-72 bg-white border-r border-slate-200 shadow-2xl z-30 transform transition-transform duration-300 ease-in-out flex flex-col ${showGrid ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Question Navigator</h3>
            <button onClick={() => setShowGrid(false)} className="p-1 text-muted hover:text-slate-900 rounded-md">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4 overflow-y-auto flex-1">
            <div className="grid grid-cols-5 gap-2">
              {mockQuestions.map((q, idx) => {
                const isAnswered = !!answers[q.id];
                const isFlagged = flagged.has(q.id);
                const isCurrent = idx === currentIndex;
                
                return (
                  <button
                    key={q.id}
                    onClick={() => { setCurrentIndex(idx); setShowGrid(false); }}
                    className={`
                      relative aspect-square rounded-lg flex items-center justify-center font-bold text-sm transition-all
                      ${isCurrent ? 'ring-2 ring-indigo-600 ring-offset-2' : ''}
                      ${isAnswered ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}
                    `}
                  >
                    {idx + 1}
                    {isFlagged && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-white"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-2 text-xs font-medium text-slate-500">
            <div className="flex items-center space-x-2"><div className="w-3 h-3 rounded bg-indigo-100"></div><span>Answered</span></div>
            <div className="flex items-center space-x-2"><div className="w-3 h-3 rounded bg-slate-100"></div><span>Unanswered</span></div>
            <div className="flex items-center space-x-2"><div className="w-3 h-3 rounded-full bg-rose-500"></div><span>Flagged</span></div>
          </div>
        </div>

        {/* Question Display */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
          {isPaused ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
                <Pause className="w-10 h-10 text-muted" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Block Paused</h2>
                <p className="text-slate-500 mt-2">Your timer is stopped. Take a breather.</p>
              </div>
              <button 
                onClick={() => setIsPaused(false)}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-primary font-bold rounded-xl shadow-sm transition-colors"
              >
                Resume Block
              </button>
            </div>
          ) : (
            <div className="h-full flex flex-col max-w-7xl mx-auto">
              {/* Question Header */}
              <div className="flex items-center justify-between mb-8 shrink-0">
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-bold text-slate-900">Question {currentIndex + 1}</span>
                  <span className="text-sm font-medium text-muted">of {mockQuestions.length}</span>
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-md uppercase tracking-wider">
                    {question.type}
                  </span>
                </div>
                <button 
                  onClick={toggleFlag}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
                    flagged.has(question.id) 
                      ? 'bg-rose-100 text-rose-700 hover:bg-rose-200' 
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Flag className={`w-4 h-4 ${flagged.has(question.id) ? 'fill-current' : ''}`} />
                  <span className="hidden md:inline">{flagged.has(question.id) ? 'Flagged' : 'Flag for Review'}</span>
                </button>
              </div>

              {/* Dynamic Question Content */}
              <div className="flex-1">
                {question.type === 'mcq' && renderMCQ()}
                {question.type === 'clinical' && renderClinical()}
                {question.type === 'image' && renderImage()}
                {question.type === 'fill-in' && renderFillIn()}
                {question.type === 'flashcard' && renderFlashcard()}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Bottom Navigation Bar */}
      <footer className="bg-white border-t border-slate-200 px-4 md:px-6 py-4 flex items-center justify-between shrink-0 z-20">
        <button 
          onClick={goToPrev}
          disabled={currentIndex === 0 || isPaused}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="hidden md:inline">Previous</span>
        </button>
        
        {/* Progress Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8 items-center space-x-4">
          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / mockQuestions.length) * 100}%` }}
            ></div>
          </div>
          <span className="text-xs font-bold text-muted">{Math.round(((currentIndex + 1) / mockQuestions.length) * 100)}%</span>
        </div>

        <button 
          onClick={goToNext}
          disabled={currentIndex === mockQuestions.length - 1 || isPaused}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-primary bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          <span className="hidden md:inline">Next</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </footer>

      {/* CSS for 3D Flip */}
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
}
