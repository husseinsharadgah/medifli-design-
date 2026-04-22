import React, { useState } from 'react';
import { 
  BookOpen, Play, CheckCircle, Clock, Award, ChevronRight, 
  Heart, Brain, Pill, Activity, Dna, Shield, Stethoscope, Microscope, Building2, ChevronDown
} from 'lucide-react';
import { InstructorProfile } from './InstructorProfile';

const universities = [
  { id: 'All', name: 'All Universities', short: 'ALL' },
  { id: 'University of Jordan', name: 'University of Jordan', short: 'UJ' },
  { id: 'Jordan University of Science and Technology', name: 'Jordan University of Science and Technology', short: 'JUST' },
  { id: 'Yarmouk University', name: 'Yarmouk University', short: 'YU' },
  { id: 'Mutah University', name: 'Mutah University', short: 'MU' },
  { id: 'Hashemite University', name: 'Hashemite University', short: 'HU' },
  { id: 'Al-Balqa Applied University', name: 'Al-Balqa Applied University', short: 'BAU' }
];

const activeCourses = [
  {
    id: 'c1',
    title: 'Cardiovascular System Focus',
    instructor: 'Dr. Roberts • QuickMed',
    modulesComplete: 12,
    modulesTotal: 24,
    lastAccessed: '2 hours ago',
    icon: Heart,
    color: 'text-rose-400',
    bg: 'bg-rose-400/10',
    university: 'University of Jordan',
    uniShort: 'UJ',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600&h=400',
    category: 'Surgery'
  },
  {
    id: 'c2',
    title: 'Neurology Clinical Correlates',
    instructor: 'Dr. Chen • MedElite',
    modulesComplete: 8,
    modulesTotal: 30,
    lastAccessed: 'Yesterday',
    icon: Brain,
    color: 'text-indigo-400',
    bg: 'bg-indigo-400/10',
    university: 'Jordan University of Science and Technology',
    uniShort: 'JUST',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=600&h=400',
    category: 'Neurology'
  },
  {
    id: 'c3',
    title: 'Advanced Pharmacology',
    instructor: 'Dr. Ahmed • MedElite',
    modulesComplete: 40,
    modulesTotal: 45,
    lastAccessed: '3 days ago',
    icon: Pill,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    university: 'Yarmouk University',
    uniShort: 'YU',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5e4a4bed9?auto=format&fit=crop&q=80&w=600&h=400',
    category: 'Pharmacology'
  },
  {
    id: 'c4',
    title: 'Pulmonology Pathophysiology',
    instructor: 'Dr. Sarah • QuickMed',
    modulesComplete: 2,
    modulesTotal: 15,
    lastAccessed: '1 week ago',
    icon: Activity,
    color: 'text-sky-400',
    bg: 'bg-sky-400/10',
    university: 'Hashemite University',
    uniShort: 'HU',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600&h=400',
    category: 'Internal Medicine'
  },
  {
    id: 'c5',
    title: 'Gastroenterology Basics',
    instructor: 'Dr. Zaid • MedElite',
    modulesComplete: 5,
    modulesTotal: 20,
    lastAccessed: 'Just now',
    icon: Stethoscope,
    color: 'text-orange-400',
    bg: 'bg-orange-400/10',
    university: 'Mutah University',
    uniShort: 'MU',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=600&h=400',
    category: 'Gastroenterology'
  },
  {
    id: 'c6',
    title: 'Endocrine System & Hormones',
    instructor: 'Dr. Farah • QuickMed',
    modulesComplete: 18,
    modulesTotal: 25,
    lastAccessed: '5 days ago',
    icon: Shield,
    color: 'text-pink-400',
    bg: 'bg-pink-400/10',
    university: 'Al-Balqa Applied University',
    uniShort: 'BAU',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600&h=400',
    category: 'Pediatrics'
  }
];

const completedCourses = [
  {
    id: 'cc1',
    title: 'Foundations of Cellular Biology',
    instructor: 'Dr. Smith • University of Jordan',
    completedDate: 'Sep 15, 2025',
    icon: Microscope,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    university: 'University of Jordan',
    uniShort: 'UJ',
    image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=600&h=400',
    category: 'Research'
  },
  {
    id: 'cc2',
    title: 'Basic Immunology & Rheumatology',
    instructor: 'MedElite • JUST',
    completedDate: 'Oct 02, 2025',
    icon: Shield,
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
    university: 'Jordan University of Science and Technology',
    uniShort: 'JUST',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=600&h=400',
    category: 'Internal Medicine'
  },
  {
    id: 'cc3',
    title: 'Genetics & Inherited Diseases',
    instructor: 'QuickMed • Yarmouk',
    completedDate: 'Nov 20, 2025',
    icon: Dna,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    university: 'Yarmouk University',
    uniShort: 'YU',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=600&h=400',
    category: 'Genetics'
  },
  {
    id: 'cc4',
    title: 'Intro to Clinical Skills',
    instructor: 'Dr. Ali • QuickMed',
    completedDate: 'Jan 10, 2026',
    icon: Stethoscope,
    color: 'text-muted',
    bg: 'bg-slate-400/10',
    university: 'Hashemite University',
    uniShort: 'HU',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600&h=400',
    category: 'Skills'
  },
  {
    id: 'cc5',
    title: 'Medical Ethics & Policy',
    instructor: 'Dr. Kareem • Mutah',
    completedDate: 'Feb 12, 2026',
    icon: BookOpen,
    color: 'text-teal-400',
    bg: 'bg-teal-400/10',
    university: 'Mutah University',
    uniShort: 'MU',
    image: 'https://images.unsplash.com/photo-1587559070757-f72a388edbba?auto=format&fit=crop&q=80&w=600&h=400',
    category: 'Ethics'
  },
  {
    id: 'cc6',
    title: 'Surgical Anatomy Basics',
    instructor: 'Dr. Omar • Al-Balqa',
    completedDate: 'Mar 01, 2026',
    icon: Activity,
    color: 'text-rose-400',
    bg: 'bg-rose-400/10',
    university: 'Al-Balqa Applied University',
    uniShort: 'BAU',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600&h=400',
    category: 'Surgery'
  }
];

export function Courses({ setCurrentView }: { setCurrentView: (view: string) => void }) {
  const [selectedUni, setSelectedUni] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const [selectedInstructor, setSelectedInstructor] = useState<string | null>(null);

  const filteredActive = selectedUni === 'All' ? activeCourses : activeCourses.filter(c => c.university === selectedUni);
  const filteredCompleted = selectedUni === 'All' ? completedCourses : completedCourses.filter(c => c.university === selectedUni);

  const currentUniName = universities.find(u => u.id === selectedUni)?.name || 'All Universities';

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-12 text-primary font-sans">
      
      {/* Header Area */}
      <header className="flex flex-col xl:flex-row xl:justify-between xl:items-end pb-4 border-b border-divider relative z-50">
        <div>
          <h2 className="text-4xl font-black text-primary tracking-widest uppercase">
            MY COURSES
          </h2>
          <p className="text-[#3B82F6] text-xs font-bold tracking-[0.2em] uppercase mt-2">
            Curriculum Management & Progress
          </p>
        </div>
        <div className="mt-6 xl:mt-0 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          
          {/* Pop-up Bar (Dropdown) for University Filter */}
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`w-full sm:w-auto flex items-center justify-between space-x-3 px-5 py-2.5 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                selectedUni !== 'All' 
                  ? 'bg-purple-500/20 border-purple-500 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)]' 
                  : 'bg-surface border-divider text-secondary hover:border-slate-500'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Building2 className={`w-4 h-4 ${selectedUni !== 'All' ? 'text-purple-400' : 'text-muted'}`} />
                <span>{currentUniName}</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Invisible overlay to catch clicks outside */}
            {isDropdownOpen && (
              <div className="fixed inset-0 z-30" onClick={() => setIsDropdownOpen(false)}></div>
            )}

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full lg:right-0 left-0 lg:left-auto mt-2 w-[320px] bg-base border border-divider rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-40 overflow-hidden outline outline-1 outline-white/5">
                <div className="py-2">
                  {universities.map(uni => (
                    <button
                      key={uni.id}
                      onClick={() => {
                        setSelectedUni(uni.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left flex items-center space-x-3 px-4 py-3 text-sm font-bold transition-all cursor-pointer hover:bg-surface-hover/50 ${
                        selectedUni === uni.id 
                          ? 'text-purple-400 bg-purple-500/10' 
                          : 'text-muted hover:text-slate-200'
                      }`}
                    >
                      {uni.id !== 'All' ? (
                        <div className={`p-1.5 rounded-lg shrink-0 ${selectedUni === uni.id ? 'bg-purple-500/20' : 'bg-surface'}`}>
                          <Building2 className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div className={`p-1.5 rounded-lg shrink-0 ${selectedUni === uni.id ? 'bg-purple-500/20' : 'bg-surface'}`}>
                          <BookOpen className="w-3.5 h-3.5" />
                        </div>
                      )}
                      <span>{uni.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Stats Box */}
          <div className="flex items-center space-x-3 text-sm text-muted font-medium bg-surface px-4 py-2.5 rounded-xl border border-divider">
            <BookOpen className="w-4 h-4 text-[#3B82F6]" />
            <span>{filteredActive.length + filteredCompleted.length} Courses</span>
            <span className="w-px h-4 bg-surface-hover"></span>
            <Award className="w-4 h-4 text-emerald-500" />
            <span>{filteredCompleted.length} Done</span>
          </div>
        </div>
      </header>

      {/* Active Courses Section */}
      {filteredActive.length > 0 && (
        <section>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-2 h-6 bg-[#3B82F6] rounded-sm"></div>
            <h3 className="text-xl font-bold text-primary tracking-wide uppercase">Active Curriculum</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
            {filteredActive.map((course) => {
              const progress = Math.round((course.modulesComplete / course.modulesTotal) * 100);
              
              return (
                <div key={course.id} className="group relative overflow-hidden rounded-2xl border border-divider bg-surface cursor-pointer h-[400px] shadow-md hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col">
                  
                  {/* BASE CARD VIEW */}
                  <div className="relative h-56 overflow-hidden flex-shrink-0">
                     {/* Ambient overlay to darken the picture slightly for text readability */}
                     <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent z-10"></div>
                     <img 
                       src={course.image} 
                       alt={course.title} 
                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                       referrerPolicy="no-referrer" 
                     />
                     <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-primary text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest z-20 border border-white/10 shadow-lg">
                       {course.category}
                     </div>
                     
                     {/* University Tag */}
                     <div className="absolute top-4 left-4 bg-surface/80 backdrop-blur-md text-secondary text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider z-20 border border-white/10 shadow-lg flex items-center space-x-1">
                       <Building2 className="w-3 h-3 text-purple-400" />
                       <span>{course.uniShort}</span>
                     </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-center relative z-10 bg-surface">
                    <h3 className="text-xl font-bold text-primary mb-2 leading-tight line-clamp-2 pr-8">{course.title}</h3>
                    <div className="flex items-center text-muted text-sm mt-auto space-x-2">
                       <span 
                         className="italic cursor-pointer transition-all hover:bg-[#3B82F6]/20 hover:text-[#3B82F6] px-2.5 py-1 rounded-lg -ml-2.5 hover:shadow-[0_0_10px_rgba(59,130,246,0.2)] hover:-translate-y-0.5 active:scale-95"
                         onClick={(e) => {
                           e.stopPropagation();
                           setSelectedInstructor(course.instructor);
                         }}
                       >
                         {course.instructor}
                       </span>
                    </div>
                  </div>

                  {/* HOVER OVERLAY (Slides up from the bottom) */}
                  <div className="absolute inset-0 bg-base/95 backdrop-blur-xl p-6 flex flex-col translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-30">
                    
                    <h4 className="text-lg font-black text-primary mb-4 border-b border-divider/80 pb-2 flex-shrink-0">Course Progress</h4>

                    {/* Meta / Instructor Info */}
                    <div className="flex items-center space-x-3 mb-6 flex-shrink-0">
                       <div className={`w-10 h-10 rounded-xl ${course.bg} flex items-center justify-center shrink-0`}>
                         <course.icon className={`w-5 h-5 ${course.color}`} />
                       </div>
                       <div>
                          <p 
                            className="text-sm font-bold text-primary leading-tight cursor-pointer transition-all hover:bg-[#3B82F6]/20 hover:text-[#3B82F6] px-3 py-1.5 rounded-lg -ml-3 hover:shadow-[0_0_10px_rgba(59,130,246,0.2)] hover:-translate-y-0.5 active:scale-95 w-fit"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedInstructor(course.instructor);
                            }}
                          >
                            {course.instructor}
                          </p>
                          <div className="flex items-center space-x-2 text-[11px] text-muted mt-1 uppercase tracking-wider font-bold">
                            <Clock className="w-3 h-3 text-slate-500" />
                            <span>Last active: {course.lastAccessed}</span>
                          </div>
                       </div>
                    </div>

                    {/* Progress Bar Area */}
                    <div className="flex-1 mt-4">
                      <div className="bg-surface border border-divider rounded-xl p-4">
                        <div className="flex justify-between items-end mb-2">
                          <span className="text-3xl font-black text-primary">{progress}%</span>
                          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">
                            {course.modulesComplete} / {course.modulesTotal} Modules
                          </span>
                        </div>
                        <div className="w-full bg-base rounded-full h-2.5 border border-divider overflow-hidden">
                          <div 
                            className="bg-[#3B82F6] h-full rounded-full relative" 
                            style={{ width: `${progress}%` }}
                          >
                            <div className="absolute top-0 right-0 bottom-0 w-10 bg-gradient-to-r from-transparent to-white/30"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button className="w-full mt-4 bg-white hover:bg-slate-200 text-[#020617] font-black uppercase tracking-widest py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2 flex-shrink-0 transform active:scale-95 shadow-xl">
                      <span>Resume Course</span>
                      <Play className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Completed Courses Section */}
      {filteredCompleted.length > 0 && (
        <section className="pt-4">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-2 h-6 bg-emerald-500 rounded-sm"></div>
            <h3 className="text-xl font-bold text-primary tracking-wide uppercase">Completed Modules</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
            {filteredCompleted.map((course) => (
              <div key={course.id} className="group relative overflow-hidden rounded-2xl border border-divider bg-surface cursor-pointer h-[400px] shadow-md hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 flex flex-col">
                
                {/* Optional Success watermark */}
                <div className="absolute -right-10 -bottom-10 opacity-10 z-0">
                  <CheckCircle className="w-48 h-48 text-emerald-500" />
                </div>

                {/* BASE CARD VIEW */}
                <div className="relative h-56 overflow-hidden flex-shrink-0 grayscale group-hover:grayscale-0 transition-all duration-500">
                   <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent z-10"></div>
                   <img 
                     src={course.image} 
                     alt={course.title} 
                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                     referrerPolicy="no-referrer" 
                   />
                   <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-primary text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest z-20 border border-white/10 shadow-lg">
                     {course.category}
                   </div>
                   
                   {/* University Tag */}
                   <div className="absolute top-4 left-4 bg-surface/80 backdrop-blur-md text-secondary text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider z-20 border border-white/10 shadow-lg flex items-center space-x-1">
                     <Building2 className="w-3 h-3 text-purple-400" />
                     <span>{course.uniShort}</span>
                   </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-center relative z-10 bg-surface/90 backdrop-blur-sm">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-primary leading-tight line-clamp-2 pr-2">{course.title}</h3>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-auto">
                     <span 
                       className="italic text-muted cursor-pointer transition-all hover:bg-emerald-500/20 hover:text-emerald-400 px-2.5 py-1 rounded-lg -ml-2.5 hover:shadow-[0_0_10px_rgba(16,185,129,0.2)] hover:-translate-y-0.5 active:scale-95"
                       onClick={(e) => {
                         e.stopPropagation();
                         setSelectedInstructor(course.instructor);
                       }}
                     >
                       {course.instructor}
                     </span>
                     <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded items-center space-x-1 hidden sm:flex">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Done</span>
                     </div>
                  </div>
                </div>

                {/* HOVER OVERLAY (Slides up from the bottom) */}
                <div className="absolute inset-0 bg-base/95 backdrop-blur-xl p-6 flex flex-col translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-30">
                  
                  <h4 className="text-lg font-black text-primary mb-4 border-b border-emerald-500/20 pb-2 flex-shrink-0 text-emerald-400 flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Module Completed</span>
                  </h4>

                  {/* Meta / Instructor Info */}
                  <div className="flex items-center space-x-3 mb-6 flex-shrink-0">
                     <div className={`w-10 h-10 rounded-xl ${course.bg} flex items-center justify-center shrink-0`}>
                       <course.icon className={`w-5 h-5 ${course.color}`} />
                     </div>
                     <div>
                        <p 
                          className="text-sm font-bold text-primary leading-tight cursor-pointer transition-all hover:bg-emerald-500/20 hover:text-emerald-400 px-3 py-1.5 rounded-lg -ml-3 hover:shadow-[0_0_10px_rgba(16,185,129,0.2)] hover:-translate-y-0.5 active:scale-95 w-fit"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedInstructor(course.instructor);
                          }}
                        >
                          {course.instructor}
                        </p>
                        <div className="flex items-center space-x-2 text-[11px] text-muted mt-1 uppercase tracking-wider font-bold">
                          <CheckCircle className="w-3 h-3 text-emerald-500" />
                          <span>100% Mastered</span>
                        </div>
                     </div>
                  </div>

                  <div className="flex-1 mt-4">
                     <div className="bg-surface border border-divider rounded-xl p-4 text-center">
                        <Award className="w-12 h-12 text-emerald-500 mx-auto mb-2 opacity-80" />
                        <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">Completed On</p>
                        <p className="text-lg font-bold text-primary tracking-widest">{course.completedDate}</p>
                     </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full mt-4 bg-emerald-500/10 border border-emerald-500/50 hover:bg-emerald-500/20 text-emerald-400 font-black uppercase tracking-widest py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2 flex-shrink-0 transform active:scale-95">
                    <span>Review Material</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {filteredActive.length === 0 && filteredCompleted.length === 0 && (
         <div className="flex flex-col items-center justify-center py-20 px-4 text-center rounded-2xl border border-dashed border-divider bg-surface/30 mt-8">
            <Building2 className="w-16 h-16 text-slate-600 mb-4" />
            <h3 className="text-xl font-bold text-primary mb-2">No courses found</h3>
            <p className="text-muted max-w-sm">
              We couldn't find any courses currently associated with this university in your curriculum.
            </p>
         </div>
      )}

      <InstructorProfile 
        instructorName={selectedInstructor || ''} 
        isOpen={!!selectedInstructor} 
        onClose={() => setSelectedInstructor(null)} 
      />

    </div>
  );
}
