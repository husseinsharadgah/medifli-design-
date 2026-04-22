import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, ChevronLeft, CheckCircle2, XCircle, AlertCircle, BarChart3, RotateCcw, Flag, Pause, LayoutGrid, X, Lightbulb } from 'lucide-react';

export interface ExamState {
  answers: Record<number, number>;
  flags: Record<number, boolean>;
  usedHints?: Record<number, boolean>;
  currentIndex: number;
  tutorMode: boolean;
}

const MOCK_QUESTIONS = [
  {
    id: 1,
    question: "A 45-year-old male presents with sudden onset, severe tearing chest pain radiating to his back. His blood pressure is 180/110 mmHg. What is the most likely diagnosis?",
    options: ["Myocardial Infarction", "Aortic Dissection", "Pulmonary Embolism", "Pericarditis"],
    correctAnswer: 1,
    explanation: "Classic presentation of aortic dissection includes tearing chest pain radiating to the back, typically associated with severe hypertension.",
    hint: "Think of a vascular emergency strongly associated with acute, severe hypertension and a distinctly 'tearing' pain."
  },
  {
    id: 2,
    question: "Which of the following is the most common cause of community-acquired pneumonia in adults?",
    options: ["Mycoplasma pneumoniae", "Staphylococcus aureus", "Streptococcus pneumoniae", "Haemophilus influenzae"],
    correctAnswer: 2,
    explanation: "Streptococcus pneumoniae is the most frequent cause of typical community-acquired pneumonia.",
    hint: "This gram-positive, alpha-hemolytic diplococcus is also known commonly as pneumococcus."
  },
  {
    id: 3,
    question: "In a standard ECG, what electrochemical event does the QRS complex represent?",
    options: ["Atrial depolarization", "Ventricular repolarization", "Ventricular depolarization", "Atrial repolarization"],
    correctAnswer: 2,
    explanation: "The QRS complex represents the rapid ventricular depolarization preceding ventricular contraction.",
    hint: "The largest spike on the ECG tracing corresponds to the largest muscle mass of the heart being activated."
  },
  {
    id: 4,
    question: "Which cranial nerve is primarily responsible for motor innervation of the muscles of facial expression?",
    options: ["Trigeminal (CN V)", "Facial (CN VII)", "Glossopharyngeal (CN IX)", "Vagus (CN X)"],
    correctAnswer: 1,
    explanation: "The Facial nerve (CN VII) uniquely controls the muscles of facial expression.",
    hint: "This nerve passes directly through the parotid gland before branching out across the face."
  },
  {
    id: 5,
    question: "What is the first-line pharmacological treatment for an acute anaphylactic reaction?",
    options: ["Intravenous Diphenhydramine", "Oral Prednisone", "Intramuscular Epinephrine", "Inhaled Albuterol"],
    correctAnswer: 2,
    explanation: "IM Epinephrine is the only safe and effective first-line treatment for anaphylaxis to combat severe vasodilation and bronchoconstriction.",
    hint: "You need a potent, rapidly acting alpha- and beta-adrenergic agonist to simultaneously reverse airway swelling and cardiovascular collapse."
  },
  {
    id: 6,
    question: "Which class of medications is generally considered the first-line treatment for essential hypertension in non-black patients?",
    options: ["Beta-blockers or ACE inhibitors", "ACE inhibitors, ARBs, Thiazides, or CCBs", "Alpha-blockers", "Loop Diuretics"],
    correctAnswer: 1,
    explanation: "Current guidelines recommend ACEIs, ARBs, Thiazide-type diuretics, or Calcium Channel Blockers (CCBs) as initial therapy.",
    hint: "JNC-8 guidelines group four specific classes as acceptable robust first-line therapies."
  },
  {
    id: 7,
    question: "A patient presents with a 'pill-rolling' tremor, bradykinesia, and rigidity. Which neurotransmitter is primarily depleted in this condition?",
    options: ["Serotonin", "Acetylcholine", "Dopamine", "GABA"],
    correctAnswer: 2,
    explanation: "These are classic signs of Parkinson's disease, caused by the depletion of dopamine in the substantia nigra.",
    hint: "This condition results from the degeneration of neurons in the pars compacta of the substantia nigra."
  },
  {
    id: 8,
    question: "Which of the following laboratory findings is most specific for diagnosing Rheumatoid Arthritis?",
    options: ["Elevated ESR", "Positive ANA", "Positive Anti-CCP antibodies", "Elevated CRP"],
    correctAnswer: 2,
    explanation: "Anti-cyclic citrullinated peptide (Anti-CCP) antibodies are highly specific (often >90%) for rheumatoid arthritis.",
    hint: "While Rheumatoid Factor (RF) is a common marker, antibodies against citrullinated proteins offer far higher specificity."
  },
  {
    id: 9,
    question: "In the context of fluid compartments, where is the majority of total body water located?",
    options: ["Intracellular fluid", "Interstitial fluid", "Intravascular fluid", "Transcellular fluid"],
    correctAnswer: 0,
    explanation: "Approximately two-thirds of total body water is contained within the intracellular fluid (ICF) compartment.",
    hint: "Think about where the actual 'mass' of human tissue bulk and cellular volume resides."
  },
  {
    id: 10,
    question: "A deficiency in Vitamin B12 is most likely to cause which of the following hematological abnormalities?",
    options: ["Microcytic anemia", "Normocytic anemia", "Macrocytic (megaloblastic) anemia", "Hemolytic anemia"],
    correctAnswer: 2,
    explanation: "Vitamin B12 deficiency impairs DNA synthesis, leading to the delayed maturation of red blood cells and macrocytic (megaloblastic) anemia.",
    hint: "An uncorrected deficiency impairs nuclear division, resulting in unusually large, immature red blood cells."
  }
];

interface MockExamProps {
  onExit: () => void;
  onPause: (state: ExamState) => void;
  initialState?: ExamState | null;
  tutorMode?: boolean;
}

export function MockExam({ onExit, onPause, initialState, tutorMode = false }: MockExamProps) {
  const [currentIndex, setCurrentIndex] = useState(initialState?.currentIndex || 0);
  const [answers, setAnswers] = useState<Record<number, number>>(initialState?.answers || {});
  const [flags, setFlags] = useState<Record<number, boolean>>(initialState?.flags || {});
  const [usedHints, setUsedHints] = useState<Record<number, boolean>>(initialState?.usedHints || {});
  const [isFinished, setIsFinished] = useState(false);
  const [showNavigator, setShowNavigator] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showPauseConfirm, setShowPauseConfirm] = useState(false);

  const currentQuestion = MOCK_QUESTIONS[currentIndex];
  const totalQuestions = MOCK_QUESTIONS.length;
  // Make progress calculation visually pleasing
  const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100;

  const handleSelectOption = (optionIndex: number) => {
    if (isFinished) return;
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionIndex }));
  };

  const handleNext = () => {
    if (currentIndex < MOCK_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const toggleFlag = () => {
    setFlags(prev => ({ ...prev, [currentQuestion.id]: !prev[currentQuestion.id] }));
  };

  const toggleHint = () => {
    setUsedHints(prev => ({ ...prev, [currentQuestion.id]: !prev[currentQuestion.id] }));
  };

  const handlePause = () => {
    onPause({ answers, flags, usedHints, currentIndex, tutorMode });
  };

  const handleSubmit = () => {
    setIsFinished(true);
  };

  let score = 0;
  if (isFinished) {
    MOCK_QUESTIONS.forEach(q => {
      if (answers[q.id] === q.correctAnswer) score++;
    });
  }

  if (isFinished) {
    return (
      <div className="max-w-[800px] mx-auto pt-8 pb-12 font-sans animation-fade-in flex flex-col items-center">
        <div className="w-full bg-surface border border-divider p-10 rounded-3xl text-center shadow-xl mb-8 relative overflow-hidden">
          <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-b ${score >= 7 ? 'from-emerald-500/10' : score >= 4 ? 'from-amber-500/10' : 'from-rose-500/10'} to-transparent pointer-events-none opacity-50`}></div>
          
          <div className="relative z-10">
            <BarChart3 className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-4xl font-black text-primary tracking-widest uppercase mb-2">Session Complete</h2>
            <p className="text-muted mb-8">You have successfully completed the drill session.</p>

            <div className="flex justify-center mb-10">
              <div className="relative">
                <svg className="w-48 h-48 transform -rotate-90">
                  <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-[#1e293b]" />
                  <circle 
                    cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" 
                    strokeDasharray={2 * Math.PI * 88} 
                    strokeDashoffset={(2 * Math.PI * 88) * (1 - score / totalQuestions)}
                    className={score >= 7 ? 'text-emerald-500' : score >= 4 ? 'text-amber-500' : 'text-rose-500'} 
                    strokeLinecap="round" 
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <span className="text-5xl font-black text-primary">{Math.round((score / totalQuestions) * 100)}%</span>
                  <span className="block text-sm text-muted font-bold uppercase tracking-widest mt-1">{score} / {totalQuestions}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <button 
                onClick={() => {
                  setAnswers({});
                  setFlags({});
                  setCurrentIndex(0);
                  setIsFinished(false);
                }}
                className="bg-base text-primary border border-divider hover:border-slate-500 px-6 py-3 rounded-xl font-bold transition-all flex items-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry Exam</span>
              </button>
              <button 
                onClick={onExit}
                className="bg-blue-600 hover:bg-blue-500 text-primary px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* Review Results */}
        <div className="w-full space-y-6">
          <h3 className="text-xl font-black text-primary tracking-widest uppercase mb-6 px-2">Detailed Review</h3>
          {MOCK_QUESTIONS.map((q, idx) => {
            const userAnswer = answers[q.id];
            const isCorrect = userAnswer === q.correctAnswer;
            const isFlagged = flags[q.id];
            
            return (
              <div key={q.id} className={`bg-surface border ${isCorrect ? 'border-emerald-500/30' : 'border-rose-500/30'} p-6 rounded-2xl relative`}>
                {isFlagged && (
                  <div className="absolute top-0 right-8 -translate-y-1/2 bg-base border border-divider px-3 py-1 rounded-full flex items-center space-x-1">
                     <Flag className="w-3 h-3 text-rose-500 fill-rose-500" />
                     <span className="text-[10px] text-muted font-bold uppercase tracking-widest">Flagged</span>
                  </div>
                )}
                <div className="flex items-start justify-between mb-4 mt-2">
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Question {idx + 1}</span>
                  {isCorrect ? (
                    <div className="flex items-center space-x-1 text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full text-xs font-bold uppercase">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Correct</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1 text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full text-xs font-bold uppercase">
                      <XCircle className="w-4 h-4" />
                      <span>Incorrect</span>
                    </div>
                  )}
                </div>
                <p className="text-lg text-primary font-medium mb-6 leading-relaxed">{q.question}</p>
                
                <div className="space-y-3 mb-6">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = userAnswer === oIdx;
                    const isActualCorrect = q.correctAnswer === oIdx;
                    
                    let bgClass = "bg-base border-divider";
                    let textClass = "text-muted";
                    
                    if (isActualCorrect) {
                      bgClass = "bg-emerald-500/10 border-emerald-500/50";
                      textClass = "text-emerald-600 font-bold";
                    } else if (isSelected && !isActualCorrect) {
                      bgClass = "bg-rose-500/10 border-rose-500/50";
                      textClass = "text-rose-600 font-bold";
                    }

                    return (
                      <div key={oIdx} className={`p-4 rounded-xl border ${bgClass} ${textClass} flex items-center justify-between`}>
                        <span>{opt}</span>
                        {isActualCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                        {isSelected && !isActualCorrect && <XCircle className="w-5 h-5 text-rose-600" />}
                      </div>
                    );
                  })}
                </div>

                <div className="bg-base border border-divider p-4 rounded-xl flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-secondary leading-relaxed"><strong className="text-primary">Explanation:</strong> {q.explanation}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const hasAnsweredCurrent = answers[currentQuestion.id] !== undefined;

  return (
    <div className="w-full min-h-full flex flex-col mx-auto px-4 sm:px-8 lg:px-16 pt-6 pb-8 font-sans animation-fade-in relative">
      
      {/* Sleek Top Header */}
      <div className="flex items-center justify-between mb-8 bg-surface/60 backdrop-blur-md border border-divider p-4 rounded-2xl shadow-sm">
        <div className="flex items-center space-x-6">
          <button onClick={() => setShowExitConfirm(true)} className="text-muted hover:text-primary transition-colors flex items-center space-x-2 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold text-sm hidden sm:inline">Exit</span>
          </button>
          <div className="w-px h-6 bg-surface-hover"></div>
          <button onClick={() => setShowPauseConfirm(true)} className="text-amber-500/80 hover:text-amber-400 transition-colors flex items-center space-x-2 group">
            <Pause className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-sm hidden sm:inline">Pause</span>
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-secondary font-medium text-sm">Question {currentIndex + 1} of {totalQuestions}</span>
          <div className="w-px h-6 bg-surface-hover"></div>
          <button 
            onClick={() => setShowNavigator(true)} 
            className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 px-4 py-2 rounded-xl transition-all font-semibold text-sm border border-blue-500/20"
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden sm:inline">Navigator</span>
          </button>
        </div>
      </div>

      {/* Navigator Modal Overlay */}
      {showNavigator && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-[#020617]/80 backdrop-blur-sm animation-fade-in">
          <div className="bg-surface border border-divider rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative">
            <button 
              onClick={() => setShowNavigator(false)}
              className="absolute top-6 right-6 text-muted hover:text-primary transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-semibold text-primary mb-8 flex items-center space-x-3">
              <LayoutGrid className="w-6 h-6 text-blue-400" />
              <span>Exam Navigator</span>
            </h3>
            
            {/* Grid of questions */}
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
              {MOCK_QUESTIONS.map((q, idx) => {
                const isAnswered = answers[q.id] !== undefined;
                const isFlagged = flags[q.id];
                const isCurrent = currentIndex === idx;

                let baseStyle = "bg-base border-divider text-muted hover:border-slate-500";
                if (isCurrent) baseStyle = "bg-blue-500 border-blue-400 text-primary shadow-lg shadow-blue-500/20";
                else if (isAnswered) baseStyle = "bg-emerald-500/10 border-emerald-500/40 text-emerald-400";
                
                return (
                  <button 
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setShowNavigator(false);
                    }}
                    className={`relative w-full aspect-square rounded-xl border-2 flex items-center justify-center font-bold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-slate-500 ${baseStyle}`}
                  >
                    {idx + 1}
                    {isFlagged && (
                      <div className="absolute -top-1.5 -right-1.5">
                        <Flag className="w-4 h-4 text-rose-500 fill-rose-500 drop-shadow-md" />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-divider flex items-center justify-between text-sm text-muted">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2"><div className="w-3 h-3 rounded-sm bg-emerald-500/20 border border-emerald-500/40"></div><span>Answered</span></div>
                <div className="flex items-center space-x-2"><div className="w-3 h-3 rounded-sm bg-base border border-divider"></div><span>Unanswered</span></div>
                <div className="flex items-center space-x-2"><Flag className="w-3 h-3 text-rose-500 fill-rose-500" /><span>Flagged</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Exit Confirmation Modal Overlay */}
      {showExitConfirm && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-[#020617]/80 backdrop-blur-sm animation-fade-in">
          <div className="bg-surface border border-divider rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-rose-500" />
            </div>
            <h3 className="text-2xl font-semibold text-primary mb-4 text-center">
              Exit Session?
            </h3>
            <p className="text-muted text-center mb-8">
              Are you sure you want to leave? Your progress will be lost unless you pause the session instead.
            </p>
            
            <div className="flex space-x-4">
              <button 
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 px-4 py-3 rounded-xl border border-divider text-secondary hover:bg-surface-hover/50 hover:text-primary font-semibold transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={onExit}
                className="flex-1 bg-rose-600 hover:bg-rose-500 text-primary px-4 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-rose-500/20"
              >
                Yes, Leave
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pause Confirmation Modal Overlay */}
      {showPauseConfirm && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-[#020617]/80 backdrop-blur-sm animation-fade-in">
          <div className="bg-surface border border-divider rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Pause className="w-8 h-8 text-amber-500 fill-amber-500" />
            </div>
            <h3 className="text-2xl font-semibold text-primary mb-4 text-center">
              Pause Session?
            </h3>
            <p className="text-muted text-center mb-8">
              Are you sure you want to pause? You can resume exactly where you left off later from the Quizzes menu.
            </p>
            
            <div className="flex space-x-4">
              <button 
                onClick={() => setShowPauseConfirm(false)}
                className="flex-1 px-4 py-3 rounded-xl border border-divider text-secondary hover:bg-surface-hover/50 hover:text-primary font-semibold transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handlePause}
                className="flex-1 bg-amber-600 hover:bg-amber-500 text-primary px-4 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-amber-500/20"
              >
                Yes, Pause
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clean Question Card */}
      <div className="flex-1 max-w-[800px] w-full mx-auto mt-4 mb-8">
        <div className="bg-base md:bg-transparent rounded-none md:rounded-3xl p-2 md:p-4 mb-4">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Question {currentIndex + 1}</span>
            {tutorMode && (
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
                Tutor Mode
              </span>
            )}
          </div>
          <h3 className="text-xl md:text-2xl text-primary font-normal leading-relaxed mb-10 tracking-wide">
            {currentQuestion.question}
          </h3>

          {usedHints[currentQuestion.id] && currentQuestion.hint && (
            <div className="mb-8 p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-start space-x-4 animation-fade-in shadow-[0_0_15px_rgba(245,158,11,0.05)]">
              <Lightbulb className="w-6 h-6 text-amber-500 flex-shrink-0" />
              <div>
                <h4 className="text-amber-500 font-semibold tracking-wide uppercase mb-1 text-sm">Hint</h4>
                <p className="text-primary leading-relaxed text-base">{currentQuestion.hint}</p>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = answers[currentQuestion.id] === idx;

              let tutorStyles = "";
              let isCorrectAnswer = false;
              if (tutorMode && hasAnsweredCurrent) {
                isCorrectAnswer = currentQuestion.correctAnswer === idx;
                if (isCorrectAnswer) {
                  tutorStyles = "bg-emerald-500/10 border-emerald-500/50 text-emerald-600 ring-1 ring-emerald-500/50";
                } else if (isSelected && !isCorrectAnswer) {
                  tutorStyles = "bg-rose-500/10 border-rose-500/30 text-rose-600 opacity-80";
                } else {
                  tutorStyles = "opacity-40 border-transparent bg-surface text-primary";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={tutorMode && hasAnsweredCurrent}
                  className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 flex items-center justify-between group
                    ${!tutorMode && isSelected 
                      ? 'border-blue-500 bg-blue-500/10 text-primary' 
                      : !tutorMode && !isSelected 
                        ? 'border-divider bg-surface hover:border-blue-500/50'
                        : ''}
                    ${tutorMode && !hasAnsweredCurrent 
                      ? 'border-divider bg-surface hover:border-blue-500/50 hover:bg-blue-500/5' 
                      : ''}
                    ${tutorMode ? tutorStyles : ''}
                  `}
                >
                  <div className="flex items-center space-x-4 w-full">
                    <div className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs transition-colors shadow-sm
                      ${!tutorMode && isSelected ? 'bg-blue-500 text-white' : 'bg-surface-hover text-primary group-hover:bg-blue-500/20 group-hover:text-blue-600'}
                      ${tutorMode && hasAnsweredCurrent && isCorrectAnswer ? 'bg-emerald-500 text-white' : ''}
                      ${tutorMode && hasAnsweredCurrent && isSelected && !isCorrectAnswer ? 'bg-rose-500 text-white' : ''}
                    `}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className={`text-base md:text-lg leading-snug font-medium text-left flex-1 ${tutorMode && hasAnsweredCurrent ? '' : 'text-primary'}`}>
                      {option}
                    </span>
                  </div>
                  
                  {/* Clean Indicators */}
                  {!tutorMode && isSelected && <CheckCircle2 className="w-5 h-5 text-blue-500" />}
                  {tutorMode && hasAnsweredCurrent && isCorrectAnswer && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                  {tutorMode && hasAnsweredCurrent && isSelected && !isCorrectAnswer && <XCircle className="w-5 h-5 text-rose-400" />}
                </button>
              );
            })}
          </div>

          {/* Tutor Mode Explanation Reveal */}
          {tutorMode && hasAnsweredCurrent && (
             <div className="mt-8 p-6 bg-surface border border-divider rounded-2xl animation-fade-in flex space-x-4 shadow-[0_0_15px_rgba(0,0,0,0.2)]">
               <AlertCircle className="w-6 h-6 text-blue-400 flex-shrink-0" />
               <div>
                 <h4 className="text-primary font-semibold tracking-wide uppercase mb-2 text-sm">Explanation</h4>
                 <p className="text-secondary leading-relaxed text-base">{currentQuestion.explanation}</p>
               </div>
             </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="w-full mt-auto flex items-center justify-between pt-6 border-t border-divider">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-semibold transition-all ${
              currentIndex === 0 
                ? 'opacity-30 cursor-not-allowed text-slate-500' 
                : 'text-muted hover:text-primary hover:bg-surface'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>
          
          <button 
             onClick={toggleFlag}
             className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-semibold transition-all ${
               flags[currentQuestion.id] 
                 ? 'bg-rose-500/10 text-rose-400'
                 : 'text-muted hover:text-rose-400 hover:bg-surface'
             }`}
           >
             <Flag className={`w-4 h-4 ${flags[currentQuestion.id] ? 'fill-current' : ''}`} />
             <span className="hidden sm:inline">{flags[currentQuestion.id] ? 'Flagged' : 'Flag'}</span>
           </button>

          <button 
            onClick={toggleHint}
            className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-semibold transition-all ${
              usedHints[currentQuestion.id] 
                ? 'bg-amber-500/10 text-amber-400'
                : 'text-muted hover:text-amber-400 hover:bg-surface'
            }`}
          >
            <Lightbulb className={`w-4 h-4 ${usedHints[currentQuestion.id] ? 'fill-current' : ''}`} />
            <span className="hidden sm:inline">Hint</span>
          </button>
        </div>

        {currentIndex === MOCK_QUESTIONS.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={!hasAnsweredCurrent}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold tracking-wide transition-all ${
              hasAnsweredCurrent 
                ? 'bg-blue-600 text-primary hover:bg-blue-500 shadow-lg shadow-blue-500/20 transform active:scale-95' 
                : 'bg-surface text-slate-600 cursor-not-allowed border border-divider'
            }`}
          >
            <span className="hidden sm:inline">Finish Exam</span>
            <span className="sm:hidden">Finish</span>
            <CheckCircle2 className="w-4 h-4 hidden sm:inline" />
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center space-x-2 bg-slate-100 text-slate-900 hover:bg-white px-6 py-3 rounded-xl font-semibold tracking-wide transition-all transform active:scale-95 shadow-md"
          >
            <span className="hidden sm:inline">Next Question</span>
            <span className="sm:hidden">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

    </div>
  );
}
