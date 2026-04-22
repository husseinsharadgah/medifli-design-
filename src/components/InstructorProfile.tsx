import React from 'react';
import { createPortal } from 'react-dom';
import { X, Award, BookOpen, Clock, Activity, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InstructorProfileProps {
  instructorName: string;
  isOpen: boolean;
  onClose: () => void;
}

// Mock database of instructors to provide rich details when requested.
const doctorDatabase: Record<string, any> = {
  "Dr. Elena Rostova": {
    specialty: "Neurology & Neuroanatomy",
    experience: "15 Years",
    coursesTaught: ["Clinical Neuroanatomy & Case Studies", "Neuromuscular Disorders"],
    bio: "Dr. Elena Rostova is a leading neuroscientist with over 15 years of clinical and academic experience. She specializes in advanced neuromuscular disorders and cortical mapping. Her teaching methodology bridges the gap between intricate neuroanatomy and practical clinical diagnosis.",
    university: "Jordan University of Science and Technology",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300"
  },
  "Dr. Marcus Thorne": {
    specialty: "General & Trauma Surgery",
    experience: "22 Years",
    coursesTaught: ["Surgical Pathophysiology", "Trauma and Critical Care Surgery"],
    bio: "Dr. Marcus Thorne is a veteran trauma surgeon who has directed level-1 trauma centers for over two decades. His passion for teaching emphasizes rapid decision-making in critical care environments, heavily focusing on ATLS protocols and surgical pathophysiology.",
    university: "University of Jordan",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300"
  },
  "Dr. Sarah Jenkins": {
    specialty: "Cardiology & Internal Medicine",
    experience: "12 Years",
    coursesTaught: ["Advanced Cardiovascular Medicine", "Pulmonology Pathophysiology"],
    bio: "Dr. Sarah Jenkins is an interventional cardiologist with a passion for ECG mastery and heart failure management. She is known for her interactive and highly engaging case-study based lectures.",
    university: "Yarmouk University",
    image: "https://images.unsplash.com/photo-1594824436998-dd40e4fbcee0?auto=format&fit=crop&q=80&w=300&h=300"
  },
  "Prof. Michael Chen": {
    specialty: "Pediatric Immunology",
    experience: "30 Years",
    coursesTaught: ["Pediatric Immunology"],
    bio: "Professor Michael Chen is a globally recognized immunologist focusing on primary immunodeficiencies in pediatric patients. He has authored over 80 peer-reviewed articles and has been teaching for three decades.",
    university: "Mutah University",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300&h=300"
  },
  "Dr. Amanda Webb": {
    specialty: "Clinical Pharmacology",
    experience: "9 Years",
    coursesTaught: ["Clinical Pharmacokinetics"],
    bio: "Dr. Amanda Webb brings a modern, dynamic approach to pharmacology, integrating complex metabolic pathways with everyday clinical prescribing. She focuses heavily on drug-drug interactions.",
    university: "Hashemite University",
    image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=300&h=300"
  },
  "Dr. James Wilson": {
    specialty: "Gastroenterology",
    experience: "18 Years",
    coursesTaught: ["Gastroenterology Core"],
    bio: "Dr. James Wilson is a senior gastroenterologist specializing in chronic inflammatory bowel disease. His lectures are revered for their practical approach to endoscopic findings and management protocols.",
    university: "University of Jordan",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300"
  },
  // Generics for "Courses.tsx"
  "Dr. Roberts": {
    specialty: "Cardiovascular Surgery",
    experience: "14 Years",
    coursesTaught: ["Cardiovascular System Focus"],
    bio: "Dr. Roberts is a cardiovascular surgeon renowned for breaking down complex cardiac anatomy into accessible, retention-optimized modules.",
    university: "University of Jordan",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300"
  },
  "Dr. Chen": {
    specialty: "Neurology",
    experience: "11 Years",
    coursesTaught: ["Neurology Clinical Correlates"],
    bio: "Dr. Chen focuses on integrating clinical signs with neuroanatomical lesions to create an intuitive understanding of the nervous system.",
    university: "Jordan University of Science and Technology",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300&h=300"
  },
  "Dr. Ahmed": {
    specialty: "Advanced Pharmacology",
    experience: "16 Years",
    coursesTaught: ["Advanced Pharmacology"],
    bio: "Dr. Ahmed leverages his background in both biochemical engineering and medicine to provide a uniquely comprehensive view of pharmacodynamics.",
    university: "Yarmouk University",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300"
  },
  "Dr. Sarah": {
    specialty: "Pulmonology",
    experience: "10 Years",
    coursesTaught: ["Pulmonology Pathophysiology"],
    bio: "Dr. Sarah specializes in respiratory mechanics and ventilatory management, offering highly practical insights for the ICU environment.",
    university: "Hashemite University",
    image: "https://images.unsplash.com/photo-1594824436998-dd40e4fbcee0?auto=format&fit=crop&q=80&w=300&h=300"
  },
  "Dr. Zaid": {
    specialty: "Gastroenterology",
    experience: "8 Years",
    coursesTaught: ["Gastroenterology Basics"],
    bio: "Dr. Zaid provides high-yield gastroenterology reviews aimed at rapidly building clinical intuition for common GI pathologies.",
    university: "Mutah University",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300"
  },
  "Dr. Farah": {
    specialty: "Endocrinology",
    experience: "13 Years",
    coursesTaught: ["Endocrine System & Hormones"],
    bio: "Dr. Farah is deeply passionate about decoding hormonal feedback loops and mapping out complex endocrine disorders into simple frameworks.",
    university: "Al-Balqa Applied University",
    image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=300&h=300"
  }
};

export function InstructorProfile({ instructorName, isOpen, onClose }: InstructorProfileProps) {
  // Clean up instructor name if it contains " • " (like in Courses.tsx)
  const cleanName = instructorName.split(' • ')[0];
  
  // Try to find the doctor, otherwise provide a sleek fallback
  const doctor = doctorDatabase[cleanName] || {
    specialty: "Medical Educator",
    experience: "10+ Years",
    coursesTaught: ["Various Medical Sciences"],
    bio: `Dr. ${cleanName.replace('Dr. ', '')} is an esteemed medical educator dedicated to breaking down complex physiological concepts. They bring years of clinical and academic rigor to their teaching.`,
    university: "Associated Medical Institute",
    image: null
  };

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length > 1) {
      return (parts[parts.length - 2][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-base/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4 transition-all"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface border border-divider rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden relative"
            >
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-surface-hover text-muted hover:text-primary rounded-full transition-colors z-20 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col md:flex-row">
                {/* Left Side: Avatar & Core Info */}
                <div className="bg-base p-8 md:w-2/5 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-divider">
                  <div className="w-32 h-32 rounded-full border-4 border-[#3B82F6]/30 overflow-hidden mb-6 flex items-center justify-center bg-blue-500/10 text-blue-400">
                    {doctor.image ? (
                      <img src={doctor.image} alt={cleanName} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl font-black">{getInitials(cleanName)}</span>
                    )}
                  </div>
                  
                  <h2 className="text-2xl font-black text-primary leading-tight mb-2">{cleanName}</h2>
                  <p className="text-[#3B82F6] font-bold text-sm tracking-wide uppercase">{doctor.specialty}</p>
                  
                  <div className="mt-8 space-y-4 w-full">
                    <div className="flex items-center space-x-3 text-secondary text-sm bg-surface px-4 py-3 rounded-xl border border-divider">
                      <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="font-medium text-left leading-tight">{doctor.experience} Teaching</span>
                    </div>
                    <div className="flex items-center space-x-3 text-secondary text-sm bg-surface px-4 py-3 rounded-xl border border-divider">
                      <Building2 className="w-4 h-4 text-purple-400 shrink-0" />
                      <span className="font-medium text-left leading-tight">{doctor.university}</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Bio & Details */}
                <div className="p-8 md:w-3/5">
                  <div className="mb-8">
                    <div className="flex items-center space-x-2 mb-4">
                      <Activity className="w-5 h-5 text-rose-400" />
                      <h3 className="text-lg font-black text-primary tracking-widest uppercase">About</h3>
                    </div>
                    <p className="text-muted leading-relaxed text-sm">
                      {doctor.bio}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <BookOpen className="w-5 h-5 text-blue-400" />
                      <h3 className="text-lg font-black text-primary tracking-widest uppercase">Courses Taught</h3>
                    </div>
                    <ul className="space-y-3">
                      {doctor.coursesTaught.map((course: string, idx: number) => (
                        <li key={idx} className="flex items-start space-x-3 text-sm text-secondary">
                          <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span className="font-bold leading-snug">{course}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
