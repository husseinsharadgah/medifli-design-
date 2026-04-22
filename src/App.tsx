import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { PracticeMode } from './components/PracticeMode';
import { Diagnostics } from './components/Diagnostics';
import { History } from './components/History';
import { Settings } from './components/Settings';
import { AdminDashboard } from './components/AdminDashboard';
import { StudentOnboarding } from './components/StudentOnboarding';
import { StudentSignup } from './components/StudentSignup';
import { DustBackground } from './components/DustBackground';
import { Courses } from './components/Courses';
import { Messages } from './components/Messages';
import { ExploreCourses } from './components/ExploreCourses';
import { Quizzes } from './components/Quizzes';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, BrainCircuit, Shield, GraduationCap, FastForward } from 'lucide-react';

export default function App() {
  const [appMode, setAppMode] = useState<'portal' | 'student-signup' | 'student-onboarding' | 'student' | 'admin'>('portal');
  const [studentProfile, setStudentProfile] = useState<any>(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add('theme-light');
    } else {
      document.documentElement.classList.remove('theme-light');
    }
  }, [isLightMode]);

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
  };

  const skipToStudentApp = () => {
    setStudentProfile({ fullName: 'Demo Student', program: 'MD' });
    setAppMode('student');
  };

  if (appMode === 'portal') {
    return (
      <div className="min-h-screen bg-base flex flex-col items-center justify-center p-4 selection:bg-[#3B82F6]/30 font-sans relative overflow-hidden">
        
        {/* Interactive Background */}
        <div className="absolute inset-0 z-0">
          <DustBackground isLightMode={isLightMode} />
        </div>

        <div className="text-center mb-12 relative z-10">
          <div className="bg-[#3B82F6] p-4 rounded-2xl inline-block mb-6 shadow-lg shadow-[#3B82F6]/20">
            <BrainCircuit className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-primary tracking-widest uppercase mb-4">Medifli Platform</h1>
          <p className="text-muted text-lg max-w-md mx-auto">Select your portal to continue to the application.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl relative z-10">
          <button 
            onClick={() => setAppMode('student-signup')}
            className="group bg-surface hover:bg-surface-hover border border-divider hover:border-[#3B82F6] p-8 rounded-3xl transition-all duration-300 text-left flex flex-col items-start cursor-pointer relative overflow-hidden shadow-xl"
          >
            <div className="w-16 h-16 bg-[#3B82F6]/20 text-[#3B82F6] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-primary mb-2">Student Portal</h2>
            <p className="text-muted">Access your dashboard, practice modes, and deep diagnostics.</p>
          </button>

          <button 
            onClick={() => setAppMode('admin')}
            className="group bg-surface hover:bg-surface-hover border border-divider hover:border-emerald-500 p-8 rounded-3xl transition-all duration-300 text-left flex flex-col items-start cursor-pointer shadow-xl"
          >
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Shield className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-primary mb-2">Admin Console</h2>
            <p className="text-muted">Manage curriculum, upload question banks, and monitor platform health.</p>
          </button>
        </div>
        
        {/* Quick Skip Dev Button */}
        <div className="mt-12 flex justify-center relative z-10">
          <button 
            onClick={skipToStudentApp}
            className="flex items-center space-x-2 text-slate-500 hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 px-4 py-2 rounded-full transition-colors cursor-pointer text-sm font-medium border border-transparent hover:border-[#3B82F6]/30"
          >
            <span>Skip Setup (Dev)</span>
            <FastForward className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  if (appMode === 'student-signup') {
    return (
      <StudentSignup 
        onComplete={(profile) => {
          setStudentProfile((prev: any) => ({ ...prev, ...profile }));
          setAppMode('student-onboarding');
        }}
        onBack={() => setAppMode('portal')}
      />
    );
  }

  if (appMode === 'student-onboarding') {
    return (
      <StudentOnboarding 
        onComplete={(academicProfile) => {
          setStudentProfile((prev: any) => ({ ...prev, ...academicProfile }));
          setAppMode('student');
        }}
        onBack={() => setAppMode('student-signup')}
      />
    );
  }

  if (appMode === 'admin') {
    return <AdminDashboard onExit={() => setAppMode('portal')} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard setCurrentView={handleNavigate} toggleLightMode={() => setIsLightMode(!isLightMode)} isLightMode={isLightMode} />;
      case 'courses':
        return <Courses setCurrentView={handleNavigate} />;
      case 'messages':
        return <Messages />;
      case 'explore':
        return <ExploreCourses />;
      case 'quizzes':
        return <Quizzes />;
      case 'practice':
        return <PracticeMode />;
      case 'diagnostics':
        return <Diagnostics />;
      case 'history':
        return <History />;
      case 'profile':
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard setCurrentView={handleNavigate} />;
    }
  };

  return (
    <div className="flex h-screen bg-base text-primary font-sans overflow-hidden selection:bg-blue-500/30 selection:text-blue-100 relative">
      
      {/* Global Background */}
      <div className="absolute inset-0 z-0">
        <DustBackground isLightMode={isLightMode} />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-base/80 backdrop-blur-md border-b border-divider z-50 flex items-center justify-between px-4 shadow-sm">
        <div className="flex items-center space-x-2 text-blue-500">
          <BrainCircuit className="w-6 h-6" />
          <span className="font-bold text-xl tracking-tight text-primary">MEDIFLI</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-muted hover:bg-slate-800 rounded-lg transition-colors cursor-pointer relative z-50"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-base/80 backdrop-blur-sm z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-300 ease-in-out z-50 md:z-20`}>
        <Sidebar 
          currentView={currentView} 
          setCurrentView={handleNavigate} 
          onExit={() => setAppMode('portal')}
          isCollapsed={isSidebarCollapsed}
          toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          isLightMode={isLightMode}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto pt-16 md:pt-0 bg-transparent relative z-10">
        <div className="p-4 md:p-8 lg:p-10 h-full max-w-[1600px] mx-auto relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="h-full"
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
