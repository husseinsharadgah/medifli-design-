import React, { useState } from 'react';
import { Search, Filter, BookOpen, Clock, User, Star, ChevronRight, PlayCircle, Building2, ChevronDown } from 'lucide-react';
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

const CATEGORIES = ['All', 'Surgery', 'Internal Medicine', 'Neurology', 'Pediatrics', 'Pharmacology'];

const COURSES = [
  {
    id: 1,
    title: "Clinical Neuroanatomy & Case Studies",
    category: "Neurology",
    instructor: "Dr. Elena Rostova",
    university: "Jordan University of Science and Technology",
    uniShort: "JUST",
    lectures: 42,
    duration: "18.5 hrs",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=600&h=400",
    modules: [
      "Cerebral Hemispheres & Cortex",
      "Diencephalon & Basal Ganglia",
      "Brainstem Anatomy",
      "Cranial Nerves Clinical Correlates",
      "Spinal Cord Syndromes"
    ]
  },
  {
    id: 2,
    title: "Surgical Pathophysiology",
    category: "Surgery",
    instructor: "Dr. Marcus Thorne",
    university: "University of Jordan",
    uniShort: "UJ",
    lectures: 35,
    duration: "22 hrs",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600&h=400",
    modules: [
      "Preoperative Assessment",
      "Fluid and Electrolyte Management",
      "Surgical Bleeding & Transfusion",
      "Postoperative Complications",
      "Wound Healing Fundamentals"
    ]
  },
  {
    id: 3,
    title: "Advanced Cardiovascular Medicine",
    category: "Internal Medicine",
    instructor: "Dr. Sarah Jenkins",
    university: "Yarmouk University",
    uniShort: "YU",
    lectures: 50,
    duration: "28 hrs",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600&h=400",
    modules: [
      "ECG Interpretation Mastery",
      "Heart Failure Phenotypes",
      "Valvular Heart Disease",
      "Acute Coronary Syndromes",
      "Arrhythmias & EPS"
    ]
  },
  {
    id: 4,
    title: "Pediatric Immunology",
    category: "Pediatrics",
    instructor: "Prof. Michael Chen",
    university: "Mutah University",
    uniShort: "MU",
    lectures: 24,
    duration: "12 hrs",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600&h=400",
    modules: [
      "Innate vs Adaptive Immunity",
      "Primary Immunodeficiencies",
      "Allergic Disorders in Children",
      "Vaccines and Immunizations",
      "Neonatal Immunology"
    ]
  },
  {
    id: 5,
    title: "Clinical Pharmacokinetics",
    category: "Pharmacology",
    instructor: "Dr. Amanda Webb",
    university: "Hashemite University",
    uniShort: "HU",
    lectures: 30,
    duration: "15 hrs",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1631815587646-b85a1bb027af?auto=format&fit=crop&q=80&w=600&h=400",
    modules: [
      "Absorption and Distribution",
      "Metabolism Pathways (CYP450)",
      "Excretion Mechanisms",
      "Drug-Drug Interactions",
      "Therapeutic Drug Monitoring"
    ]
  },
  {
    id: 6,
    title: "Gastroenterology Core",
    category: "Internal Medicine",
    instructor: "Dr. James Wilson",
    university: "University of Jordan",
    uniShort: "UJ",
    lectures: 45,
    duration: "20 hrs",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=600&h=400",
    modules: [
      "Esophageal Disorders",
      "Peptic Ulcer Disease",
      "Inflammatory Bowel Disease",
      "Hepatitis and Cirrhosis",
      "Pancreaticobiliary Disease"
    ]
  },
  {
    id: 7,
    title: "Trauma and Critical Care Surgery",
    category: "Surgery",
    instructor: "Dr. Marcus Thorne",
    university: "Al-Balqa Applied University",
    uniShort: "BAU",
    lectures: 28,
    duration: "18 hrs",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600&h=400",
    modules: [
      "ATLS Protocol Review",
      "Blunt Abdominal Trauma",
      "Thoracic Trauma Management",
      "Shock & Resuscitation",
      "Burn Management"
    ]
  },
  {
    id: 8,
    title: "Neuromuscular Disorders",
    category: "Neurology",
    instructor: "Dr. Elena Rostova",
    university: "Jordan University of Science and Technology",
    uniShort: "JUST",
    lectures: 20,
    duration: "10 hrs",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=600&h=400",
    modules: [
      "Peripheral Neuropathies",
      "Myasthenia Gravis",
      "Muscular Dystrophies",
      "ALS and Motor Neuron Disease",
      "EMG/NCS Interpretation"
    ]
  }
];

export function ExploreCourses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedUni, setSelectedUni] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const [selectedInstructor, setSelectedInstructor] = useState<string | null>(null);

  // Filter logic
  const filteredCourses = COURSES.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
    const matchesUni = selectedUni === 'All' || course.university === selectedUni;
    return matchesSearch && matchesCategory && matchesUni;
  });

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length > 1) {
      // e.g. "Dr. Sarah Jenkins" -> "SJ"
      return (parts[parts.length - 2][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const currentUniName = universities.find(u => u.id === selectedUni)?.name || 'All Universities';

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-12 font-sans">
      
      {/* Header and Search */}
      <header className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 pb-4 border-b border-divider relative z-50">
        <div>
          <h2 className="text-4xl font-black text-primary tracking-widest uppercase mb-2">
            Explore Courses
          </h2>
          <p className="text-muted text-sm">
            Discover new modules, specialities, and expand your medical knowledge.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row w-full lg:w-auto items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          
          {/* Pop-up Bar (Dropdown) for University Filter */}
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`w-full sm:w-auto h-[46px] flex items-center justify-between space-x-3 px-5 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                selectedUni !== 'All' 
                  ? 'bg-purple-500/20 border-purple-500 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)]' 
                  : 'bg-surface border-divider text-secondary hover:border-slate-500'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Building2 className={`w-4 h-4 ${selectedUni !== 'All' ? 'text-purple-400' : 'text-muted'}`} />
                <span className="whitespace-nowrap">{currentUniName}</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Invisible overlay to catch clicks outside */}
            {isDropdownOpen && (
              <div className="fixed inset-0 z-30" onClick={() => setIsDropdownOpen(false)}></div>
            )}

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full lg:right-0 mt-2 w-full sm:w-[320px] bg-base border border-divider rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-40 overflow-hidden outline outline-1 outline-white/5">
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

          <div className="relative flex-1 lg:w-80 h-[46px]">
            <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search courses, instructors..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-full bg-surface border border-divider text-sm text-slate-200 rounded-xl pl-10 pr-4 focus:outline-none focus:border-[#3B82F6] transition-colors shadow-inner"
            />
          </div>
        </div>
      </header>

      {/* Categories Filter */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold tracking-wide transition-colors cursor-pointer border ${
              activeCategory === category 
                ? 'bg-blue-500 text-primary border-blue-500 shadow-lg shadow-blue-500/20' 
                : 'bg-surface text-muted border-divider hover:border-slate-500 hover:text-slate-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {filteredCourses.map(course => (
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
               
               {/* University Bubble Tag */}
               <div className="absolute top-4 left-4 bg-surface/80 backdrop-blur-md text-secondary text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider z-20 border border-white/10 shadow-lg flex items-center space-x-1">
                 <Building2 className="w-3 h-3 text-purple-400" />
                 <span>{course.uniShort}</span>
               </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col justify-center relative z-10 bg-surface">
              <h3 className="text-xl font-bold text-primary mb-2 leading-tight line-clamp-2">{course.title}</h3>
              <div className="flex items-center text-muted text-sm mt-auto space-x-2">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="font-bold text-secondary">{course.rating}</span>
                <span>•</span>
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

            {/* HOVER OVERLAY (Slides up from the bottom to cover the entire card) */}
            <div className="absolute inset-0 bg-base/95 backdrop-blur-xl p-6 flex flex-col translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-30">
              
              <h4 className="text-lg font-black text-primary mb-4 border-b border-divider/80 pb-2 flex-shrink-0">Course Details</h4>

              {/* Meta / Instructor Info */}
              <div className="flex items-center space-x-3 mb-6 flex-shrink-0">
                 <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-black border border-blue-500/30 overflow-hidden">
                    <img 
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(course.instructor)}&background=3B82F6&color=fff&bold=true`} 
                      alt=""
                      className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedInstructor(course.instructor);
                      }}
                    />
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
                      <BookOpen className="w-3 h-3 text-slate-500" />
                      <span>{course.lectures} Lectures</span>
                      <span className="text-slate-600">•</span>
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>{course.duration}</span>
                    </div>
                 </div>
              </div>

              {/* Modules List */}
              <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#1e293b]">
                <p className="text-[10px] uppercase tracking-widest text-[#3B82F6] font-black mb-3">Curriculum Preview</p>
                <ul className="space-y-3">
                  {course.modules.map((mod, i) => (
                    <li key={i} className="flex items-start space-x-3 text-sm text-secondary group/item">
                       <PlayCircle className="w-4 h-4 text-slate-500 group-hover/item:text-emerald-400 flex-shrink-0 mt-0.5 transition-colors" />
                       <span className="line-clamp-2 leading-snug group-hover/item:text-primary transition-colors">{mod}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button className="w-full mt-4 bg-white hover:bg-slate-200 text-[#020617] font-black uppercase tracking-widest py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2 flex-shrink-0 transform active:scale-95 shadow-xl">
                <span>Enroll Now</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        ))}

        {filteredCourses.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <div className="w-20 h-20 bg-surface-hover rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-slate-500" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-2">No courses found</h3>
            <p className="text-muted">Try adjusting your search or category filters.</p>
          </div>
        )}
      </div>

      <InstructorProfile 
        instructorName={selectedInstructor || ''} 
        isOpen={!!selectedInstructor} 
        onClose={() => setSelectedInstructor(null)} 
      />

    </div>
  );
}
