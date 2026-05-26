import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowLeft, Search, Filter, Play, Star, Clock, Target, 
  CheckCircle, AlertTriangle, BookOpen, BrainCircuit, Lightbulb, 
  MessageSquareText, Users, BarChart3, TrendingUp, Sparkles, X, ChevronRight, Check, Activity, Shield, Flame, RotateCcw,
  Zap, Award, ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DustBackground } from './DustBackground';

interface MistakeItem {
  id: string;
  questionText: string;
  topic: string;
  course: string;
  subject: string;
  lecture: string;
  missCount: number;
  streak: number; 
  lastReviewed: string; 
  lastCorrect: string | null;
  difficultyScore: number; 
  isMastered: boolean;
  isStarred: boolean;
  hintUsed: boolean;
  personalNote: string;
  explanation: string;
  memoryTip: string;
  options: string[];
  correctAnswer: string;
  classMissRate: number; 
  commonWrongAnswer: string;
}

const INITIAL_MISTAKES: MistakeItem[] = [
  {
    id: 'm1',
    questionText: 'What is the most characteristic finding in Minimal Change Disease on electron microscopy?',
    topic: 'Renal Pathology',
    course: 'Renal Medicine',
    subject: 'Glomerular Diseases',
    lecture: 'Nephrotic Syndromes',
    missCount: 4,
    streak: 1,
    lastReviewed: '2026-05-25T10:00:00Z',
    lastCorrect: '2026-05-25T10:00:00Z',
    difficultyScore: 82,
    isMastered: false,
    isStarred: true,
    hintUsed: false,
    personalNote: 'I always mix this up with FSGS.',
    explanation: 'Minimal Change Disease is defined by the effacement (fusion) of podocyte foot processes, visible only on electron microscopy.',
    memoryTip: 'Minimal Change = "Minimal" to see unless you use a MASSIVE microscope (EM) to view the podocytes.',
    options: ['Mesangial cell proliferation', 'Subepithelial distinct humps', 'Podocyte foot process effacement', 'Kimmelstiel-Wilson nodules'],
    correctAnswer: 'Podocyte foot process effacement',
    classMissRate: 45,
    commonWrongAnswer: 'Mesangial cell proliferation'
  },
  {
    id: 'm2',
    questionText: 'Which systemic disease is most strongly associated with Kimmelstiel-Wilson nodules?',
    topic: 'Systemic Disease',
    course: 'Renal Medicine',
    subject: 'Glomerular Diseases',
    lecture: 'Secondary Glomerulopathies',
    missCount: 2,
    streak: 2,
    lastReviewed: '2026-05-24T14:30:00Z',
    lastCorrect: '2026-05-24T15:00:00Z',
    difficultyScore: 65,
    isMastered: false,
    isStarred: false,
    hintUsed: true,
    personalNote: '',
    explanation: 'Kimmelstiel-Wilson nodules are the pathognomonic finding of nodular glomerulosclerosis in diabetic nephropathy.',
    memoryTip: 'KW = "K"iwi "W"eetbix (sweet->Diabetes). Nodules are sweet lumps.',
    options: ['Systemic Lupus Erythematosus', 'Diabetes Mellitus', 'Rheumatoid Arthritis', 'Hypertension'],
    correctAnswer: 'Diabetes Mellitus',
    classMissRate: 25,
    commonWrongAnswer: 'Hypertension'
  },
  {
    id: 'm3',
    questionText: 'In a patient with Acute Post-Infectious Glomerulonephritis, what pattern is seen on immunofluorescence?',
    topic: 'Renal Pathology',
    course: 'Renal Medicine',
    subject: 'Glomerular Diseases',
    lecture: 'Nephritic Syndromes',
    missCount: 5,
    streak: 0,
    lastReviewed: '2026-05-26T08:00:00Z',
    lastCorrect: null,
    difficultyScore: 90,
    isMastered: false,
    isStarred: true,
    hintUsed: false,
    personalNote: 'Granular vs Linear is so confusing.',
    explanation: 'APIGN presents with a "starry sky" or granular pattern of IgG and C3 deposition, reflecting subepithelial immune complex humps.',
    memoryTip: 'Post-Infectious = "Starry sky" (looking at the stars after the storm of infection passes).',
    options: ['Linear IgG deposition', 'Starry sky granular pattern', 'Pauci-immune pattern', 'Mesangial IgA deposition'],
    correctAnswer: 'Starry sky granular pattern',
    classMissRate: 52,
    commonWrongAnswer: 'Linear IgG deposition'
  },
  {
    id: 'm4',
    questionText: 'Which gene mutation is responsible for 85% of Autosomal Dominant Polycystic Kidney Disease cases?',
    topic: 'Genetic Disorders',
    course: 'Renal Medicine',
    subject: 'Cystic Diseases',
    lecture: 'Ciliated Epithelium Disorders',
    missCount: 1,
    streak: 3,
    lastReviewed: '2026-05-20T10:00:00Z',
    lastCorrect: '2026-05-20T10:00:00Z',
    difficultyScore: 40,
    isMastered: true, 
    isStarred: false,
    hintUsed: false,
    personalNote: '',
    explanation: 'Mutations in the PKD1 gene on chromosome 16 account for about 85% of ADPKD cases.',
    memoryTip: 'PKD1 = 1st form is the most common (85%).',
    options: ['PKD2', 'PKHD1', 'PKD1', 'VHL'],
    correctAnswer: 'PKD1',
    classMissRate: 15,
    commonWrongAnswer: 'PKD2'
  },
  {
    id: 'm5',
    questionText: 'Which of the following is associated with "wire loop" lesions in the glomeruli?',
    topic: 'Systemic Disease',
    course: 'Renal Medicine',
    subject: 'Glomerular Diseases',
    lecture: 'Nephritic Syndromes',
    missCount: 3,
    streak: 0,
    lastReviewed: '2026-05-25T11:00:00Z',
    lastCorrect: null,
    difficultyScore: 78,
    isMastered: false,
    isStarred: false,
    hintUsed: false,
    personalNote: '',
    explanation: 'Diffuse Proliferative Glomerulonephritis (Class IV Lupus Nephritis) features distinctive subendothelial deposits known as wire loop lesions.',
    memoryTip: 'Lupus is a loop - "Wire loop" lesions.',
    options: ['Diabetic Nephropathy', 'Lupus Nephritis', 'Membranous Nephropathy', 'Goodpasture Syndrome'],
    correctAnswer: 'Lupus Nephritis',
    classMissRate: 48,
    commonWrongAnswer: 'Membranous Nephropathy'
  },
  {
    id: 'm6',
    questionText: 'A patient presents with expressive aphasia. Which area of the frontal lobe is most likely affected?',
    topic: 'Cerebral Hemispheres',
    course: 'Clinical Neuroanatomy',
    subject: 'Cerebral Hemispheres',
    lecture: 'Frontal Lobe',
    missCount: 3,
    streak: 1,
    lastReviewed: '2026-05-24T09:00:00Z',
    lastCorrect: '2026-05-24T09:00:00Z',
    difficultyScore: 72,
    isMastered: false,
    isStarred: true,
    hintUsed: false,
    personalNote: 'Language production is motorized, broca is motor.',
    explanation: 'Broca\'s area is located in the posterior inferior frontal gyrus of the dominant hemisphere and is responsible for motor speech production.',
    memoryTip: 'Broca = "B"roken "B"ack (can\'t speak smoothly). Wernicke = "W"ord "W"aterfall (fluid soup).',
    options: ["Wernicke's area", "Broca's area", "Primary Motor Cortex", "Prefrontal Cortex"],
    correctAnswer: "Broca's area",
    classMissRate: 41,
    commonWrongAnswer: "Wernicke's area"
  },
  {
    id: 'm7',
    questionText: 'Which intravenous fluid is considered a colloid rather than a crystalloid solution?',
    topic: 'Fluid Management',
    course: 'Surgical Pathophysiology',
    subject: 'Fluid Management',
    lecture: 'Crystalloids vs Colloids',
    missCount: 2,
    streak: 1,
    lastReviewed: '2026-05-23T11:00:00Z',
    lastCorrect: '2026-05-23T11:00:00Z',
    difficultyScore: 55,
    isMastered: false,
    isStarred: false,
    hintUsed: true,
    personalNote: 'Colloids have huge macromolecules.',
    explanation: 'Albumin is a naturally occurring large macromolecular protein that remains in the intravascular space, making it a colloid.',
    memoryTip: 'Colloids keep water inside because of "C"ongress of proteins.',
    options: ["0.9% Normal Saline", "Lactated Ringer's", "5% Albumin", "5% Dextrose in Water"],
    correctAnswer: "5% Albumin",
    classMissRate: 28,
    commonWrongAnswer: "0.9% Normal Saline"
  },
  {
    id: 'm8',
    questionText: 'What is the hallmark ECG finding of a second-degree Mobitz Type I (Wenckebach) AV block?',
    topic: 'ECG Mastery',
    course: 'Advanced Cardiovascular Medicine',
    subject: 'ECG Mastery',
    lecture: 'Bradyarrhythmias',
    missCount: 5,
    streak: 0,
    lastReviewed: '2026-05-26T14:00:00Z',
    lastCorrect: null,
    difficultyScore: 88,
    isMastered: false,
    isStarred: true,
    hintUsed: false,
    personalNote: 'Longer longer longer drop, then you have a Wenckebach.',
    explanation: 'Mobitz Type I is characterized by progressive prolongation of the PR interval until a P wave fails to conduct (a dropped QRS complex).',
    memoryTip: 'Wenckebach: "W"alking "E"longated "N"arrowly. PR prolongs until it drops.',
    options: ["Constant PR intervals with dropped QRS", "Progressive PR prolongation until a QRS is dropped", "Complete dissociation of P waves and QRS complexes", "ST segment elevation in leads II, III, and aVF"],
    correctAnswer: "Progressive PR prolongation until a QRS is dropped",
    classMissRate: 49,
    commonWrongAnswer: "Constant PR intervals with dropped QRS"
  }
];

export function ReviewMistakesDashboard({ onBack }: { onBack: () => void }) {
  const [items, setItems] = useState<MistakeItem[]>(INITIAL_MISTAKES);
  const [activeTab, setActiveTab] = useState<'bank' | 'mastered'>('bank');
  
  // Dashboard state
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'missCount' | 'topic' | 'lastSeen' | 'difficulty' | 'hierarchy'>('hierarchy');
  const [viewMode, setViewMode] = useState<'hierarchy' | 'flat'>('hierarchy');
  
  // Session configuration state
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [sessionMode, setSessionMode] = useState<'mistakes-only' | 'mixed' | 'timed' | 'spaced'>('mistakes-only');
  
  // Active session state
  const [isSessionRunning, setIsSessionRunning] = useState(false);
  const [sessionQuestions, setSessionQuestions] = useState<MistakeItem[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [hintActive, setHintActive] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  
  // AI Explanation state
  const [aiExplainId, setAiExplainId] = useState<string | null>(null);
  
  // Summary state
  const [showSummary, setShowSummary] = useState(false);
  const [sessionStats, setSessionStats] = useState({ correct: 0, wrong: 0, total: 0 });

  // Notifications
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Derived stats
  const activeMistakes = items.filter(i => !i.isMastered);
  const masteredMistakes = items.filter(i => i.isMastered);
  const totalCount = items.length;
  const progressPercent = Math.round((masteredMistakes.length / totalCount) * 100);

  // Filter & Sort
  const filteredBank = useMemo(() => {
    let result = activeTab === 'mastered' ? masteredMistakes : activeMistakes;
    if (searchQuery) {
      result = result.filter(i => 
        i.questionText.toLowerCase().includes(searchQuery.toLowerCase()) || 
        i.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.lecture.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    result.sort((a, b) => {
      if (sortBy === 'hierarchy') {
        const courseComp = a.course.localeCompare(b.course);
        if (courseComp !== 0) return courseComp;
        const subjectComp = a.subject.localeCompare(b.subject);
        if (subjectComp !== 0) return subjectComp;
        const lectureComp = a.lecture.localeCompare(b.lecture);
        if (lectureComp !== 0) return lectureComp;
        return a.questionText.localeCompare(b.questionText);
      }
      if (sortBy === 'missCount') return b.missCount - a.missCount;
      if (sortBy === 'topic') return a.topic.localeCompare(b.topic);
      if (sortBy === 'difficulty') return b.difficultyScore - a.difficultyScore;
      if (sortBy === 'lastSeen') return new Date(b.lastReviewed).getTime() - new Date(a.lastReviewed).getTime();
      return 0;
    });
    return result;
  }, [items, activeTab, searchQuery, sortBy, activeMistakes, masteredMistakes]);

  // Grouped by hierarchy structure: Course -> Subject -> Lecture -> Items
  const groupedBank = useMemo(() => {
    const groups: {
      [course: string]: {
        [subject: string]: {
          [lecture: string]: MistakeItem[];
        };
      };
    } = {};

    filteredBank.forEach((item) => {
      const c = item.course;
      const s = item.subject;
      const l = item.lecture;
      if (!groups[c]) groups[c] = {};
      if (!groups[c][s]) groups[c][s] = {};
      if (!groups[c][s][l]) groups[c][s][l] = [];
      groups[c][s][l].push(item);
    });

    return groups;
  }, [filteredBank]);

  const renderCard = (item: MistakeItem) => {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        key={item.id}
        className="bg-surface border border-divider rounded-3xl p-6 shadow-md hover:shadow-xl hover:border-slate-705 transition-all group flex flex-col justify-between"
      >
        <div>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="bg-surface-hover border border-divider text-muted text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md">
                {item.topic}
              </span>
              {item.difficultyScore >= 80 && (
                <span className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md flex items-center space-x-1">
                  <Activity className="w-3 h-3" />
                  <span>Hard</span>
                </span>
              )}
              {item.hintUsed && (
                <span className="bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md" title="Hint used historically">
                  Hinted
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={(e) => toggleStar(item.id, e)}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${item.isStarred ? 'bg-yellow-500/10 text-yellow-500' : 'bg-surface hover:bg-surface-hover text-slate-600'}`}
              >
                <Star className={`w-4 h-4 ${item.isStarred ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
          
          <h3 className="text-lg font-bold text-primary leading-snug mb-5">
            {item.questionText}
          </h3>

          {item.personalNote && (
            <div className="mb-5 p-3 bg-blue-500/5 border border-blue-500/10 rounded-xl flex items-start space-x-2">
               <BookOpen className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
               <p className="text-xs text-blue-200/70 font-medium italic">"{item.personalNote}"</p>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-divider flex items-center justify-between">
          
          {/* Mastery Stats */}
          {!item.isMastered ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-red-500/5 border border-red-500/10 px-3 py-1.5 rounded-lg">
                <RotateCcw className="w-3.5 h-3.5 text-red-400" />
                <span className="text-xs font-black text-red-400">{item.missCount} Misses</span>
              </div>
              <div className="flex flex-col space-y-1" title="Streak to mastery (Requires 3)">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Mastery Streak</span>
                <div className="flex items-center space-x-1">
                  {[0, 1, 2].map(dot => (
                    <div key={dot} className={`w-2 h-2 rounded-full ${item.streak > dot ? 'bg-emerald-500' : 'bg-surface-hover border border-divider'}`}></div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-black text-emerald-500 uppercase tracking-widest">Mastered</span>
            </div>
          )}

          <div className="flex items-center space-x-3">
            <span className="text-[10px] text-muted font-medium">
              Last seen: {new Date(item.lastReviewed).toLocaleDateString()}
            </span>
            <button 
              onClick={() => {
                setAiExplainId(item.id);
                setTimeout(() => {
                  showToast("AI Generated plain-language breakdown applied.");
                  setAiExplainId(null);
                }, 1500);
              }}
              className="bg-surface hover:bg-surface-hover border border-divider p-2 rounded-xl text-blue-400 transition-colors group relative cursor-pointer"
              title="AI Plain Language Breakdown"
            >
              {aiExplainId === item.id ? (
                 <Sparkles className="w-4 h-4 animate-spin text-blue-400" />
              ) : (
                 <BrainCircuit className="w-4 h-4" />
              )}
            </button>
          </div>

        </div>
      </motion.div>
    );
  };

  // Session Initiation
  const startSession = () => {
    let pool = [...activeMistakes];
    if (sessionMode === 'spaced') {
      pool.sort((a, b) => new Date(a.lastReviewed).getTime() - new Date(b.lastReviewed).getTime());
    } else if (sessionMode === 'mixed') {
      // simulate 70% 30% by shuffling and taking some
      pool = pool.sort(() => Math.random() - 0.5);
    } else {
      pool.sort((a, b) => b.missCount - a.missCount);
    }
    
    // limit to max 10 for review
    pool = pool.slice(0, 10);
    
    if (pool.length === 0) {
      showToast("No active mistakes to review!");
      return;
    }
    
    setSessionQuestions(pool);
    setCurrentIdx(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setHintActive(false);
    setSessionStats({ correct: 0, wrong: 0, total: pool.length });
    
    setShowSessionModal(false);
    setIsSessionRunning(true);
    
    if (sessionMode === 'timed') {
      setTimer(30);
      setIsTimerRunning(true);
    }
  };

  // Timer logic for timed mode
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSessionRunning && sessionMode === 'timed' && isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0 && isTimerRunning) {
      // Time out counts as wrong
      setIsTimerRunning(false);
      handleWrongAnswer();
    }
    return () => clearInterval(interval);
  }, [isSessionRunning, sessionMode, isTimerRunning, timer]);

  const handleWrongAnswer = () => {
    setShowExplanation(true);
    setIsTimerRunning(false);
    setSessionStats(prev => ({ ...prev, wrong: prev.wrong + 1 }));
    setItems(prev => prev.map(item => {
      if (item.id === sessionQuestions[currentIdx].id) {
        return { 
          ...item, 
          missCount: item.missCount + 1, 
          streak: 0, 
          lastReviewed: new Date().toISOString() 
        };
      }
      return item;
    }));
  };

  const answerQuestion = (option: string) => {
    if (showExplanation) return;
    setSelectedOption(option);
    setIsTimerRunning(false);
    
    const currentQ = sessionQuestions[currentIdx];
    const isCorrect = option === currentQ.correctAnswer;
    
    if (isCorrect) {
      setSessionStats(prev => ({ ...prev, correct: prev.correct + 1 }));
      setItems(prev => prev.map(item => {
        if (item.id === currentQ.id) {
          const newStreak = item.streak + 1;
          const mastered = newStreak >= 3;
          if (mastered) {
             setTimeout(() => showToast(`🎓 Mastered Topic: ${item.topic} Question!`), 500);
          }
          return { 
            ...item, 
            streak: newStreak, 
            isMastered: mastered, 
            hintUsed: hintActive ? true : item.hintUsed,
            lastCorrect: new Date().toISOString(),
            lastReviewed: new Date().toISOString()
          };
        }
        return item;
      }));
      // Auto advance on correct
      setTimeout(() => {
        advanceSession();
      }, 1500);
    } else {
      handleWrongAnswer();
    }
  };

  const advanceSession = () => {
    if (currentIdx < sessionQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
      setHintActive(false);
      if (sessionMode === 'timed') {
        setTimer(30);
        setIsTimerRunning(true);
      }
    } else {
      setIsSessionRunning(false);
      setShowSummary(true);
    }
  };

  const toggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setItems(prev => prev.map(i => i.id === id ? { ...i, isStarred: !i.isStarred } : i));
  };

  // Component Check Topic Mastery
  const allMasteredTopics = useMemo(() => {
    const topics = Array.from(new Set(items.map(i => i.topic)));
    return topics.filter(t => {
      const topicItems = items.filter(i => i.topic === t);
      return topicItems.every(i => i.isMastered);
    });
  }, [items]);

  // -- Session Full Screen View --
  if (isSessionRunning) {
    const q = sessionQuestions[currentIdx];
    return (
      <div className="fixed inset-0 z-50 bg-[#0A0E17] flex flex-col font-sans animation-fade-in text-slate-100 overflow-y-auto relative">
        <DustBackground />
        
        {/* Session Header */}
        <div className="bg-surface/50 border-b border-divider p-4 shrink-0 backdrop-blur-md sticky top-0 z-10">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <button 
              onClick={() => setIsSessionRunning(false)}
              className="text-muted hover:text-primary transition-all flex items-center space-x-2 bg-surface hover:bg-surface-hover px-4 py-2 rounded-xl border border-divider"
            >
              <X className="w-5 h-5" />
              <span className="font-bold text-xs uppercase tracking-widest hidden sm:inline">End Session</span>
            </button>
            <div className="flex items-center space-x-6">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest flex items-center space-x-2">
                <Target className="w-4 h-4" />
                <span>{sessionMode.replace('-', ' ')}</span>
              </span>
              <div className="text-sm font-black text-primary bg-surface border border-divider px-4 py-2 rounded-xl">
                Q {currentIdx + 1} / {sessionQuestions.length}
              </div>
              {sessionMode === 'timed' && (
                <div className={`text-xl font-black px-4 py-2 rounded-xl flex items-center space-x-2 ${timer <= 5 ? 'text-red-500 bg-red-500/10 animate-pulse' : 'text-amber-500 bg-amber-500/10'}`}>
                  <Clock className="w-5 h-5" />
                  <span>0:{timer < 10 ? `0${timer}` : timer}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Question Area */}
        <div className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-8 flex flex-col pt-8 relative z-10">
          
          <div className="bg-surface border border-divider rounded-3xl p-8 mb-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
            <div className="flex items-center justify-between mb-6 relative z-10">
              <span className="bg-blue-500/10 text-blue-400 text-xs font-black px-3 py-1.5 rounded-lg uppercase tracking-wider border border-blue-500/20">
                {q.topic}
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-red-400 bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20 flex items-center space-x-1.5">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Missed {q.missCount}x</span>
                </span>
                {!hintActive && !showExplanation && (
                  <button 
                    onClick={() => { setHintActive(true); showToast("Hint applied! Doesn't break streak if correct."); }}
                    className="text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1.5 rounded-lg border border-amber-500/20 flex items-center space-x-1.5 font-bold text-xs uppercase transition-colors"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>Hint</span>
                  </button>
                )}
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-primary leading-tight mb-8 relative z-10">
              {q.questionText}
            </h2>

            {hintActive && !showExplanation && (
              <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-200 text-sm font-medium flex items-start space-x-3 animation-fade-in">
                <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p>Focus on distinguishing visual microscopy markers. Think about sizing metrics for podocytes.</p>
              </div>
            )}
            
            {q.personalNote && (
              <div className="mb-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-200 text-sm font-medium flex items-start space-x-3">
                <BookOpen className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-purple-400 font-bold mb-1">Your Note</span>
                  <p>"{q.personalNote}"</p>
                </div>
              </div>
            )}

            <div className="space-y-3 relative z-10">
              {q.options.map((opt, i) => {
                const isSelected = selectedOption === opt;
                const isCorrectAns = opt === q.correctAnswer;
                
                let btnClass = "w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 font-bold text-lg flex items-center justify-between group cursor-pointer ";
                
                if (showExplanation) {
                  // After answering
                  if (isSelected && isCorrectAns) btnClass += "bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.1)]";
                  else if (isSelected && !isCorrectAns) btnClass += "bg-red-500/10 border-red-500/50 text-red-500";
                  else if (isCorrectAns) btnClass += "bg-emerald-500/5 border-emerald-500/30 text-emerald-300";
                  else btnClass += "bg-surface border-divider text-muted opacity-50";
                } else {
                  // Pre-answer
                  if (isSelected) btnClass += "bg-blue-500/10 border-blue-500/50 text-blue-400";
                  else btnClass += "bg-surface border-divider text-primary hover:border-blue-500/40 hover:bg-surface-hover active:scale-[0.99]";
                }

                return (
                  <button 
                    key={i} 
                    onClick={() => answerQuestion(opt)}
                    disabled={showExplanation || isSelected}
                    className={btnClass}
                  >
                    <span>{opt}</span>
                    {showExplanation && isSelected && isCorrectAns && <CheckCircle className="w-6 h-6 text-emerald-500" />}
                    {showExplanation && isSelected && !isCorrectAns && <X className="w-6 h-6 text-red-500" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation Panel */}
          {showExplanation && (
            <div className="bg-surface border border-divider rounded-3xl p-6 md:p-8 mb-8 shadow-xl animation-slide-up">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${selectedOption === q.correctAnswer ? 'bg-emerald-500 shadow-emerald-500/20' : 'bg-red-500 shadow-red-500/20'}`}>
                  {selectedOption === q.correctAnswer ? <Check className="w-6 h-6 text-white" /> : <X className="w-6 h-6 text-white" />}
                </div>
                <h3 className={`text-xl font-black ${selectedOption === q.correctAnswer ? 'text-emerald-400' : 'text-red-400'}`}>
                  {selectedOption === q.correctAnswer ? 'Correct! Streak Increased.' : 'Incorrect. Miss Count Incremented.'}
                </h3>
              </div>
              
              <div className="space-y-4 text-slate-300 leading-relaxed font-medium">
                <p>{q.explanation}</p>
                <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex items-start space-x-3 mt-4">
                  <Zap className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-black uppercase tracking-widest text-yellow-500 block mb-1">Memory Tip</span>
                    <p className="text-yellow-100">{q.memoryTip}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button 
                  onClick={advanceSession}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest flex items-center space-x-2 transition-all shadow-lg active:scale-95 cursor-pointer"
                >
                  <span>{currentIdx < sessionQuestions.length - 1 ? 'Next Question' : 'Finish Session'}</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // -- Summary Screen --
  if (showSummary) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[600px] animation-fade-in p-6">
        <div className="max-w-xl w-full bg-surface border border-divider p-10 rounded-3xl shadow-2xl relative overflow-hidden text-center">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          
          <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-500/30">
            <CheckCircle className="w-12 h-12 text-blue-400" />
          </div>
          
          <h2 className="text-3xl font-black text-primary mb-2 tracking-tight">Session Complete!</h2>
          <p className="text-muted font-medium mb-10">You've successfully drilled through {sessionStats.total} mistake questions.</p>
          
          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6">
              <div className="text-3xl font-black text-emerald-400 mb-1">{sessionStats.correct}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Correct Answers</div>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
              <div className="text-3xl font-black text-red-500 mb-1">{sessionStats.wrong}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-red-500">Needs Work</div>
            </div>
          </div>
          
          <button 
            onClick={() => setShowSummary(false)}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-xl font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-500/20 active:scale-95 cursor-pointer"
          >
            Return to Bank
          </button>
        </div>
      </div>
    );
  }

  // -- Main Dashboard --
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans animation-fade-in text-slate-100 pb-20">
      
      {toastMsg && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-[100] bg-blue-600 text-white px-6 py-3 rounded-full shadow-2xl font-bold text-sm flex items-center space-x-2 border border-blue-400/30 animation-slide-up">
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header & Progress */}
      <div className="mb-10">
        <button onClick={onBack} className="text-muted hover:text-primary transition-colors flex items-center space-x-2 font-bold uppercase text-xs tracking-widest mb-6 cursor-pointer group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Exit Review Modes</span>
        </button>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-primary tracking-tight mb-3">Mistake Bank</h1>
            <p className="text-slate-400 font-medium">Clear out your failures using spaced repetition and focused drilling.</p>
          </div>
          
          <div className="bg-surface border border-divider p-4 rounded-2xl min-w-[300px]">
             <div className="flex justify-between items-center mb-2">
               <span className="text-[10px] font-black uppercase tracking-widest text-muted">Mastery Progress</span>
               <span className="text-xs font-bold text-emerald-400">{progressPercent}% Cleared</span>
             </div>
             <div className="h-2 bg-surface-hover rounded-full overflow-hidden w-full">
               <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-1000 ease-out" style={{width: `${progressPercent}%`}}></div>
             </div>
             <div className="flex justify-between items-center mt-2 text-[10px] font-bold text-slate-500">
               <span>{masteredMistakes.length} Mastered</span>
               <span>{totalCount} Total Errors</span>
             </div>
          </div>
        </div>
      </div>

      {allMasteredTopics.length > 0 && (
         <div className="mb-8 flex items-center space-x-3 bg-gradient-to-r from-blue-500/10 to-transparent p-4 rounded-2xl border border-blue-500/20">
            <Award className="w-8 h-8 text-yellow-400" />
            <div>
              <h4 className="text-sm font-black text-blue-400 uppercase tracking-widest">Topic Mastery Achieved</h4>
              <p className="text-xs text-muted font-medium mt-0.5">You've cleared all mistakes in: <span className="text-primary font-bold">{allMasteredTopics.join(', ')}</span></p>
            </div>
         </div>
      )}

      {/* Weekly Digest Simulation */}
      <div className="mb-8 bg-surface-hover/50 border border-divider p-4 rounded-2xl flex items-start sm:items-center justify-between flex-col sm:flex-row gap-4">
        <div className="flex items-start space-x-3">
          <div className="bg-indigo-500/10 p-2 rounded-xl">
             <MessageSquareText className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
             <h4 className="text-sm font-bold text-primary">Your Weekly Digest is Ready</h4>
             <p className="text-xs text-muted font-medium mt-0.5">You cleared 12 mistakes last week. {activeMistakes.length} mistakes are currently due for spaced review.</p>
          </div>
        </div>
        <button onClick={() => { setSessionMode('spaced'); setShowSessionModal(true); }} className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 px-4 py-2 rounded-xl transition-colors cursor-pointer shrink-0">
          Review Now
        </button>
      </div>

      {/* Analytics Stat Block */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-surface border border-divider p-6 rounded-3xl flex items-center space-x-5 shadow-lg">
          <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20 text-emerald-400">
            <CheckCircle className="w-7 h-7" />
          </div>
          <div>
            <span className="block text-[10px] font-black uppercase tracking-widest text-muted mb-1">Cleared This Week</span>
            <span className="block text-3xl font-black text-primary">12</span>
          </div>
        </div>
        <div className="bg-surface border border-divider p-6 rounded-3xl flex items-center space-x-5 shadow-lg">
          <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center border border-amber-500/20 text-amber-500">
            <Flame className="w-7 h-7" />
          </div>
          <div>
            <span className="block text-[10px] font-black uppercase tracking-widest text-muted mb-1">Daily Review Streak</span>
            <span className="block text-3xl font-black text-primary">4 <span className="text-base text-muted">Days</span></span>
          </div>
        </div>
        <div className="bg-surface border border-divider p-6 rounded-3xl flex items-center space-x-5 shadow-lg">
          <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center border border-purple-500/20 text-purple-400">
            <BrainCircuit className="w-7 h-7" />
          </div>
          <div>
            <span className="block text-[10px] font-black uppercase tracking-widest text-muted mb-1">Total Mastered</span>
            <span className="block text-3xl font-black text-primary">{masteredMistakes.length}</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-divider pb-px mb-8 overflow-x-auto no-scrollbar">
        {[
          { id: 'bank', label: 'Active Mistakes Bank', icon: AlertTriangle, count: activeMistakes.length, activeColor: 'text-red-400 border-red-500 bg-red-500/5' },
          { id: 'mastered', label: 'Mastered Archive', icon: CheckCircle, count: masteredMistakes.length, activeColor: 'text-emerald-400 border-emerald-500 bg-emerald-500/5' }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-6 py-4 border-b-2 font-bold text-sm whitespace-nowrap transition-all cursor-pointer ${
                isActive 
                  ? tab.activeColor
                  : 'border-transparent text-muted hover:text-primary hover:bg-surface-hover/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="uppercase tracking-widest">{tab.label}</span>
              <span className={`ml-2 px-2 py-0.5 rounded-md text-[10px] ${isActive ? 'bg-current opacity-20 text-white' : 'bg-surface border border-divider'}`}>
                {tab.count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Main Tab Content */}
      {(activeTab === 'bank' || activeTab === 'mastered') && (
        <div className="space-y-6 animation-fade-in">
          
          {/* Controls Bar */}
          <div className="flex flex-col xl:flex-row items-center justify-between gap-4 bg-surface/50 p-4 rounded-2xl border border-divider">
            <div className="flex flex-wrap w-full xl:w-auto items-center gap-4">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" />
                <input 
                  type="text" 
                  placeholder="Search course, subject, lecture..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-base border border-divider rounded-xl pl-10 pr-4 py-3 text-sm text-primary focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600"
                />
              </div>
              <div className="relative shrink-0 w-full sm:w-auto">
                <select 
                  value={sortBy}
                  onChange={(e) => {
                    const val = e.target.value as any;
                    setSortBy(val);
                    if (val === 'hierarchy') {
                      setViewMode('hierarchy');
                    } else {
                      setViewMode('flat');
                    }
                  }}
                  className="w-full bg-base border border-divider rounded-xl pl-10 pr-10 py-3 text-sm font-bold text-primary focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="hierarchy">Sort by Course - Subject - Lecture</option>
                  <option value="missCount">Sort by Miss Count</option>
                  <option value="difficulty">Sort by Difficulty</option>
                  <option value="lastSeen">Sort by Last Reviewed</option>
                  <option value="topic">Sort by Topic</option>
                </select>
                <Filter className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" />
              </div>

              {/* View toggle */}
              <div className="flex bg-base border border-divider rounded-xl p-1 w-full sm:w-auto justify-center shrink-0">
                <button
                  type="button"
                  onClick={() => { setViewMode('hierarchy'); setSortBy('hierarchy'); }}
                  className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${viewMode === 'hierarchy' ? 'bg-blue-600 text-white shadow' : 'text-muted hover:text-primary'}`}
                >
                  Grouped Hierarchy
                </button>
                <button
                  type="button"
                  onClick={() => { setViewMode('flat'); if (sortBy === 'hierarchy') setSortBy('missCount'); }}
                  className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${viewMode === 'flat' ? 'bg-blue-600 text-white shadow' : 'text-muted hover:text-primary'}`}
                >
                  Plain Cards
                </button>
              </div>
            </div>
            
            {activeTab === 'bank' && (
              <button 
                onClick={() => setShowSessionModal(true)}
                className="w-full xl:w-auto bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest flex items-center justify-center space-x-2 transition-all shadow-lg active:scale-95 cursor-pointer"
              >
                <span>Start Review Session</span>
                <Play className="w-4 h-4 fill-current" />
              </button>
            )}
          </div>

          {/* Cards Display */}
          {viewMode === 'hierarchy' ? (
            <div className="space-y-8">
              {Object.entries(groupedBank).map(([courseName, subjectsRaw]) => {
                const subjects = subjectsRaw as {
                  [subject: string]: {
                    [lecture: string]: MistakeItem[];
                  };
                };
                const courseCount = Object.values(subjects).reduce((acc, subj) => 
                  acc + Object.values(subj).reduce((acc2, list) => acc2 + (list as MistakeItem[]).length, 0)
                , 0);

                if (courseCount === 0) return null;

                return (
                  <div key={courseName} className="space-y-6 border border-divider/40 bg-surface/30 rounded-3xl p-6 md:p-8">
                    {/* Course Level Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1e293b]/50 pb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400 shrink-0">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[9px] uppercase font-black tracking-widest text-muted block mb-0.5">Course Group</span>
                          <h3 className="text-xl md:text-2xl font-black text-primary tracking-tight leading-tight">{courseName}</h3>
                        </div>
                      </div>
                      <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-wider text-center shrink-0 self-start sm:self-center">
                        {courseCount} {courseCount === 1 ? 'Error' : 'Errors'} Found
                      </div>
                    </div>

                    <div className="space-y-6 animate-fade-in">
                      {Object.entries(subjects).map(([subjectName, lecturesRaw]) => {
                        const lectures = lecturesRaw as {
                          [lecture: string]: MistakeItem[];
                        };
                        const subjectCount = Object.values(lectures).reduce((acc, list) => acc + (list as MistakeItem[]).length, 0);
                        if (subjectCount === 0) return null;

                        return (
                          <div key={subjectName} className="pl-2 sm:pl-4 border-l-2 border-slate-700/30 space-y-4">
                            {/* Subject Sub-header */}
                            <div className="flex items-center space-x-2 text-slate-400">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                              <div>
                                <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500 block">Subject (Module)</span>
                                <h4 className="text-base font-black text-slate-300">{subjectName}</h4>
                              </div>
                            </div>

                            <div className="space-y-6 pl-2 sm:pl-4">
                              {Object.entries(lectures).map(([lectureName, questionsListRaw]) => {
                                const questionsList = questionsListRaw as MistakeItem[];
                                if (questionsList.length === 0) return null;

                                return (
                                  <div key={lectureName} className="space-y-3">
                                    {/* Lecture Sub-sub-header */}
                                    <div className="flex items-center space-x-2">
                                      <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0" />
                                      <div className="bg-emerald-500/5 border border-emerald-500/10 px-3 py-1 rounded-full flex items-center space-x-1.5">
                                        <span className="text-[9px] uppercase font-black tracking-widest text-emerald-400/80">Lecture:</span>
                                        <span className="text-xs font-extrabold text-emerald-300">{lectureName}</span>
                                      </div>
                                    </div>

                                    {/* Questions inside the lecture */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-1">
                                      <AnimatePresence>
                                        {questionsList.map((item) => renderCard(item))}
                                      </AnimatePresence>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {filteredBank.length === 0 && (
                <div className="py-20 text-center border-2 border-dashed border-divider rounded-3xl bg-surface/30">
                  <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-black text-primary mb-2">No mistakes found here!</h3>
                  <p className="text-muted font-medium">You've cleared everything matching this view.</p>
                </div>
              )}
            </div>
          ) : (
            /* Flat Grid View */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnimatePresence>
                {filteredBank.map((item) => renderCard(item))}
              </AnimatePresence>
              
              {filteredBank.length === 0 && (
                <div className="col-span-full py-20 text-center border-2 border-dashed border-divider rounded-3xl bg-surface/30">
                  <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-black text-primary mb-2">No mistakes found here!</h3>
                  <p className="text-muted font-medium">You've cleared everything matching this view.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}


      {/* Session Config Modal */}
      <AnimatePresence>
        {showSessionModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0E17]/80 backdrop-blur-sm animation-fade-in">
             <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-surface border border-divider max-w-3xl w-full rounded-3xl p-8 shadow-2xl relative"
             >
                <button onClick={() => setShowSessionModal(false)} className="absolute top-6 right-6 text-muted hover:text-primary transition-colors cursor-pointer">
                  <X className="w-6 h-6" />
                </button>
                
                <div className="mb-8">
                  <h2 className="text-2xl font-black text-primary mb-2 flex items-center space-x-3">
                    <Target className="w-6 h-6 text-blue-500" />
                    <span>Configure Review Session</span>
                  </h2>
                  <p className="text-muted font-medium">Select a focused repitition strategy to maximize retention.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                   {[
                     { id: 'mistakes-only', name: 'Mistakes Only', desc: 'Focus strictly on active unmastered items.', icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-400/10' },
                     { id: 'mixed', name: 'Mixed Mode', desc: 'Blends 70% mistakes with 30% new questions to prevent rote memorization.', icon: Sparkles, color: 'text-purple-400', bg: 'bg-purple-400/10' },
                     { id: 'timed', name: 'Timed Mode', desc: 'Adds a strict 30s timer per question. Running out counts as a miss.', icon: Clock, color: 'text-amber-400', bg: 'bg-amber-400/10' },
                     { id: 'spaced', name: 'Spaced Repetition', desc: 'Prioritizes overdue items based on your last review date (Anki-style).', icon: ArrowUpRight, color: 'text-emerald-400', bg: 'bg-emerald-400/10' }
                   ].map(mode => {
                      const Icon = mode.icon;
                      const isActive = sessionMode === mode.id;
                      return (
                        <button
                          key={mode.id}
                          onClick={() => setSessionMode(mode.id as any)}
                          className={`p-5 rounded-2xl border-2 text-left cursor-pointer transition-all ${
                            isActive 
                              ? 'border-blue-500 bg-blue-500/5' 
                              : 'border-divider bg-base hover:border-slate-600'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${isActive ? 'bg-blue-500 text-white' : mode.bg + ' ' + mode.color}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <h4 className="text-base font-bold text-primary mb-1">{mode.name}</h4>
                          <p className="text-xs text-muted leading-relaxed font-medium">{mode.desc}</p>
                        </button>
                      )
                   })}
                </div>

                <div className="flex justify-end pt-4 border-t border-divider">
                   <button 
                     onClick={startSession}
                     className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center space-x-2 transition-all shadow-lg shadow-blue-500/20 active:scale-95 cursor-pointer"
                   >
                     <span>Launch Session</span>
                     <Play className="w-5 h-5 fill-current" />
                   </button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
