import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, ArrowLeft, Stethoscope, Pill, 
  ChevronRight, GraduationCap, BrainCircuit 
} from 'lucide-react';
import { DustBackground } from './DustBackground';

const universities = [
  "University of Jordan",
  "Yarmouk University",
  "Mutah University",
  "Jordan University of Science and Technology",
  "Hashemite University",
  "Al-Balqa Applied University"
];

  const majors = [
    { id: 'Medicine', icon: Stethoscope, color: 'text-[#3B82F6]', bg: 'bg-[#3B82F6]/10', hoverBorder: 'hover:border-[#3B82F6]' },
    { id: 'Pharmacy', icon: Pill, color: 'text-emerald-400', bg: 'bg-emerald-500/10', hoverBorder: 'hover:border-emerald-500' }
  ];

interface OnboardingProps {
  onComplete: (profile: { uni: string; major: string; year: string }) => void;
  onBack: () => void;
}

export function StudentOnboarding({ onComplete, onBack }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  
  const [uni, setUni] = useState('');
  const [major, setMajor] = useState('');
  const [year, setYear] = useState('');

  const nextStep = () => {
    setDirection(1);
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setDirection(-1);
    if (step === 1) {
      onBack();
    } else {
      setStep((prev) => prev - 1);
    }
  };

  const handleComplete = (selectedYear: string) => {
    setYear(selectedYear);
    onComplete({ uni, major, year: selectedYear });
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 w-full max-w-2xl mx-auto">
            <div className="text-center space-y-2 mb-10">
              <h2 className="text-3xl font-bold text-white tracking-tight">Select your University</h2>
              <p className="text-slate-400">Choose your academic institution to customize your experience.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {universities.map((u) => (
                <button
                  key={u}
                  onClick={() => {
                    setUni(u);
                    nextStep();
                  }}
                  className="flex items-center space-x-4 p-5 rounded-2xl border border-[#1e293b] bg-[#131B2F] hover:border-[#3B82F6] hover:bg-[#1e293b] transition-all text-left group cursor-pointer shadow-lg"
                >
                  <div className="w-12 h-12 bg-[#0B0F19] border border-[#1e293b] text-[#3B82F6] group-hover:bg-[#3B82F6] group-hover:text-white rounded-xl flex items-center justify-center transition-colors shrink-0">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-slate-300 group-hover:text-white">{u}</span>
                </button>
              ))}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6 w-full max-w-2xl mx-auto">
            <div className="text-center space-y-2 mb-10">
              <h2 className="text-3xl font-bold text-white tracking-tight">What is your Major?</h2>
              <p className="text-slate-400">Tailoring the question bank for your specific track.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {majors.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setMajor(m.id);
                    nextStep();
                  }}
                  className={`flex flex-col items-center justify-center p-8 rounded-3xl border border-[#1e293b] bg-[#131B2F] ${m.hoverBorder} transition-all group shadow-lg cursor-pointer`}
                >
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 ${m.bg} ${m.color} group-hover:scale-110 transition-transform`}>
                    <m.icon className="w-10 h-10" />
                  </div>
                  <span className="text-xl font-bold text-white">{m.id}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        const yearsCount = major === 'Medicine' ? 6 : 5;
        const yearsArray = Array.from({ length: yearsCount }, (_, i) => (i + 1).toString());

        return (
          <div className="space-y-6 w-full max-w-2xl mx-auto">
            <div className="text-center space-y-2 mb-10">
              <h2 className="text-3xl font-bold text-white tracking-tight">Which Year?</h2>
              <p className="text-slate-400">Select your current academic year in {major}.</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {yearsArray.map((y) => (
                <button
                  key={y}
                  onClick={() => handleComplete(y)}
                  className="flex flex-col items-center justify-center p-6 rounded-2xl border border-[#1e293b] bg-[#131B2F] hover:border-[#3B82F6] hover:bg-[#1e293b] transition-all group cursor-pointer shadow-lg"
                >
                  <div className="w-12 h-12 bg-[#0B0F19] border border-[#1e293b] text-[#3B82F6] group-hover:bg-[#3B82F6] group-hover:text-white rounded-full flex items-center justify-center mb-3 transition-colors">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-slate-300 group-hover:text-white text-lg">Year {y}</span>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] flex flex-col font-sans selection:bg-[#3B82F6]/30 pb-12 relative overflow-hidden">
      
      {/* Interactive Background */}
      <div className="absolute inset-0 z-0">
        <DustBackground />
      </div>

      {/* Top Navigation */}
      <header className="px-6 py-6 flex items-center justify-between pointer-events-none relative z-10">
        <div className="flex items-center space-x-2 text-[#3B82F6] pointer-events-auto">
          <BrainCircuit className="w-8 h-8" />
          <span className="font-extrabold text-2xl tracking-tight text-white">Medifli</span>
        </div>
        
        {/* Progress Dots */}
        <div className="flex space-x-2">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className={`h-2.5 rounded-full transition-all duration-300 ${step === i ? 'w-8 bg-[#3B82F6]' : step > i ? 'w-2.5 bg-[#3B82F6]/50' : 'w-2.5 bg-[#1e293b]'}`}
            />
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 mt-[-4rem] relative z-10">
        
        {/* Back Button */}
        <div className="w-full max-w-2xl mb-6">
          <button 
            onClick={prevStep}
            className="flex items-center space-x-2 text-slate-400 hover:text-[#3B82F6] transition-colors font-medium cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{step === 1 ? 'Back to Portals' : 'Back'}</span>
          </button>
        </div>

        {/* Animated Step Container */}
        <div className="relative w-full overflow-visible">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="w-full w-full max-w-4xl mx-auto"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
        
      </main>
    </div>
  );
}
