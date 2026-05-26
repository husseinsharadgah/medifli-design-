import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX, 
  Settings, Maximize, Minimize2, Eye, Download, CheckCircle, 
  BookOpen, HelpCircle, Bell, Sun, Moon, Sparkles, FileText, Bookmark, 
  CheckSquare, ArrowLeft, ArrowUpRight, ListVideo, ExternalLink
} from 'lucide-react';

interface ResumeCourseProps {
  onBack: () => void;
  isLightMode?: boolean;
  toggleLightMode?: () => void;
}

interface Lecture {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  category: 'pathology-new' | 'biochemistry-old';
  instructor: string;
  pdfUrl?: string;
  slides: {
    title: string;
    points: { text: string; highlight?: 'red' | 'yellow' | 'green' | 'dark-red'; italic?: boolean }[];
    cellImage: string;
    cellDesc: string;
  }[];
  overview: string;
}

const lecturesData: Lecture[] = [
  {
    id: 'l1',
    title: 'Lec 1 Kidney disease',
    subtitle: 'Pathology of Renal Systems',
    duration: '45:00',
    category: 'pathology-new',
    instructor: 'Mustafa Tawaha',
    pdfUrl: 'Lec1_Kidney_Disease.pdf',
    overview: 'This course contain all Pathology Lectures (17 lectures) + Free Old lectures of the other subjects',
    slides: [
      {
        title: 'Cystic diseases of the kidney',
        cellImage: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=600&h=400',
        cellDesc: 'UGS Kidney Glomerulus Cell Microscopy',
        points: [
          { text: '♦ Heterogeneous group of ', italic: false },
          { text: 'hereditary, developmental & acquired', highlight: 'red' },
          { text: ' disorders.', italic: false },
          { text: '♦ Reasonably common, Some forms (as APCD) are ', italic: false },
          { text: 'major cause of chronic renal failure', highlight: 'yellow' },
          { text: ', Present ', italic: false },
          { text: 'diagnostic problems', highlight: 'yellow' },
          { text: ' for clinicians, radiologists, and pathologists, Occasionally can be confused with malignant tumors.', italic: false },
          { text: '♦ that include:', italic: false },
          { text: '1. Cystic Renal Dysplasia: Due to ', italic: false },
          { text: 'abnormal metanephrotic differentiation', highlight: 'yellow' },
          { text: '.', italic: false },
          { text: '  ▫ Gross: Enlarged cystic kidney → Unilateral or bilateral (worse).', italic: true },
          { text: '  ▫ Microscopic: Abnormal lobar organization with the presence of large cysts surrounded by ', italic: true },
          { text: '(cartilage, undifferentiated mesenchyme, and immature collecting ducts).', highlight: 'yellow' },
          { text: '2. Simple renal cyst(s): A common ', italic: false },
          { text: 'post-mortem', highlight: 'yellow' },
          { text: ' finding.', italic: false },
          { text: '  ▫ Gross: ', italic: true },
          { text: 'Single or multiple, Usually small & cortical', highlight: 'yellow' },
          { text: ', Translucent & filled with clear fluid.', italic: true },
          { text: '  ▫ Microscopic: Cysts lined by a single epithelial layer.', italic: true },
          { text: '  ▫ Clinical: ', italic: true },
          { text: 'NO clinical significance', highlight: 'yellow' },
          { text: ', Rarely may bleed into it → distends & cause pain, ', italic: true },
          { text: 'Main importance is to differentiate them from renal tumors.', highlight: 'dark-red' }
        ]
      },
      {
        title: 'Polycystic Kidney Disease (ADPKD)',
        cellImage: 'https://images.unsplash.com/photo-1579154204601-01588f351167?auto=format&fit=crop&q=80&w=600&h=400',
        cellDesc: 'Autosomal Dominant PKD Histology',
        points: [
          { text: '♦ Autosomal Dominant (Adult) Polycystic Kidney Disease:', italic: false },
          { text: 'High penetrance, autosomal dominant systemic disorder.', highlight: 'yellow' },
          { text: ' Characterized by bilateral multiple cysts that expand and eventually destroy renal parenchyma.', italic: false },
          { text: '♦ Genetics: Mutations in genes encoding ', italic: false },
          { text: 'polycystin-1 (PKD1, 85% of cases)', highlight: 'red' },
          { text: ' or ', italic: false },
          { text: 'polycystin-2 (PKD2, 15% of cases)', highlight: 'yellow' },
          { text: '.', italic: false },
          { text: '  ▫ Pathogenesis: Cysts arise from any segment of nephrons, epithelial cells have high proliferation and fluid secretion rates.', italic: true },
          { text: '  ▫ Gross: Bilaterally enlarged kidneys, up to 4kg each, covered packed with clear/brown fluid cysts.', italic: true },
          { text: '  ▫ Clinical: Symptoms emerge in 4th decade with hematuria, flank pain, hypertension, and progressive renal insufficiency.', italic: true }
        ]
      }
    ]
  },
  {
    id: 'l2',
    title: 'Lec 2 Glomerulonephritis',
    subtitle: 'Immune Complex Kidneys',
    duration: '38:15',
    category: 'pathology-new',
    instructor: 'Mustafa Tawaha',
    pdfUrl: 'Lec2_Glomerulonephritis.pdf',
    overview: 'In-depth molecular analysis of immune-mediated kidney inflammation, subendothelial deposits, and Nephritic pathways.',
    slides: [
      {
        title: 'Acute Post-infectious Glomerulonephritis (APIGN)',
        cellImage: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=600&h=400',
        cellDesc: 'Subepithelial Humps Electron Microscopy',
        points: [
          { text: '♦ Classic immune complex disease following ', italic: false },
          { text: 'Group A beta-hemolytic streptococcal infection', highlight: 'red' },
          { text: ' of skin or pharynx.', italic: false },
          { text: '♦ Diagnosis hallmarks: Elevated ASO titers, reduced blood C3 levels.', italic: false },
          { text: '  ▫ Light Microscopy: Diffuse glomerular hypercellularity from endothelial, mesangial, and infiltrating neutrophils.', italic: true },
          { text: '  ▫ Electron Microscopy: Distinctive ', italic: true },
          { text: 'subepithelial electron-dense humps', highlight: 'yellow' },
          { text: ' representing immune deposits.', italic: true },
          { text: '  ▫ Immunofluorescence: Coarse granular "starry-sky" pattern of IgG and C3 deposition.', italic: true }
        ]
      }
    ]
  },
  {
    id: 'l3',
    title: 'Lec 3 Nephrotic Syndrome',
    subtitle: 'Proteinuria and Podocyte Damage',
    duration: '50:40',
    category: 'pathology-new',
    instructor: 'Mustafa Tawaha',
    pdfUrl: 'Lec3_Nephrotic_Syndrome.pdf',
    overview: 'Understanding high-range proteinuria (>3.5g/day), generalized hypoproteinemia, edema, hyperlipidemia, and lipiduria pathogenesis.',
    slides: [
      {
        title: 'Minimal Change Disease (MCD)',
        cellImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600&h=400',
        cellDesc: 'Podocyte Foot Process Effacement EM',
        points: [
          { text: '♦ Most common cause of pediatric nephrotic syndrome.', italic: false },
          { text: '♦ Characterized by normal architecture under light microscopy.', italic: false },
          { text: '  ▫ Light Microscopy: Lipids stored inside proximal tubules ("lipoid nephrosis"), completely clear glomeruli.', italic: true },
          { text: '  ▫ Electron Microscopy: Full ', italic: true },
          { text: 'effacement (fusing) of podocyte foot processes', highlight: 'yellow' },
          { text: '.', italic: true },
          { text: '  ▫ Clinical: Dramatic responsive treatment to ', italic: true },
          { text: 'corticosteroid therapy', highlight: 'green' },
          { text: ' in over 90% of children.', italic: true }
        ]
      }
    ]
  },
  {
    id: 'l4',
    title: 'Lec 4 Nephritic syndrome',
    subtitle: 'Hematuria and Red Cell Casts',
    duration: '42:10',
    category: 'pathology-new',
    instructor: 'Mustafa Tawaha',
    pdfUrl: 'Lec4_Nephritic_Syndrome.pdf',
    overview: 'Analyzing hematuria, oliguria, azotemia, and mild-to-moderate hypertension associated with active glomerular inflammation.',
    slides: [
      {
        title: 'Rapidly Progressive Glomerulonephritis (RPGN)',
        cellImage: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600&h=400',
        cellDesc: 'Glomerular crescent formulation',
        points: [
          { text: '♦ Syndrome clinically characterized by rapid loss of renal function (>50% decrease in GFR) inside weeks.', italic: false },
          { text: '♦ Pathologic hallmark: Formation of prominent ', italic: false },
          { text: 'cellular crescents', highlight: 'red' },
          { text: ' in Bowman space.', italic: false },
          { text: '  ▫ Mechanism: Ruptures in glomerular basement membrane allow fibrin and monocytes to spill into bowman space, driving parietal cell proliferation.', italic: true },
          { text: '  ▫ Classification: Anti-GBM (type I, e.g. Goodpasture), Immune-complex (type II, e.g. lupus), Pauci-immune (type III, ANCA positive).', italic: true }
        ]
      }
    ]
  },
  {
    id: 'l5',
    title: 'Lec 5 Glomerular lesions with systemic disease...',
    subtitle: 'Diabetic and Lupus Nephropathy',
    duration: '55:30',
    category: 'biochemistry-old',
    instructor: 'Mustafa Tawaha',
    pdfUrl: 'Lec5_Systemic.pdf',
    overview: 'Systemic diseases affecting glomeruli, specifically detailed histology of diabetic nodular glomerulosclerosis and class-based lupus nephritis.',
    slides: [
      {
        title: 'Diabetic Nephropathy & Glomerulonephritis',
        cellImage: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600&h=400',
        cellDesc: 'Kimmelstiel-Wilson Nodules Pas stain',
        points: [
          { text: '♦ Major microvascular complication of diabetes mellitus.', italic: false },
          { text: '♦ Key morphological features:', italic: false },
          { text: '  ▫ Diffuse mesangial matrix deposition & thickened basement membrane.', italic: true },
          { text: '  ▫ Pathognomonic lesion: ', italic: true },
          { text: 'Kimmelstiel-Wilson (KW) nodules', highlight: 'red' },
          { text: ' (nodular intercapillary glomerulosclerosis).', italic: true },
          { text: '  ▫ Arterioles: Marked ', italic: true },
          { text: 'hyaline arteriolosclerosis', highlight: 'yellow' },
          { text: ' affecting BOTH afferent and efferent vessels.', italic: true }
        ]
      }
    ]
  }
];

export function ResumeCourse({ onBack, isLightMode = false, toggleLightMode }: ResumeCourseProps) {
  const [selectedLecture, setSelectedLecture] = useState<Lecture>(lecturesData[0]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [filter, setFilter] = useState<'ALL' | 'PATHOLOGY NEW' | 'BIOCHEMISTRY OLD'>('ALL');
  const [currentTime, setCurrentTime] = useState(1640); // 27:20 in seconds
  const [duration, setDuration] = useState(2700); // 45:00 in seconds
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [completedLectures, setCompletedLectures] = useState<string[]>(['l3', 'l4']); // Simulated completed ones
  const [showNotification, setShowNotification] = useState<string | null>(null);
  const [showPdfViewer, setShowPdfViewer] = useState(false);

  // Auto-advance video progress simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            // Auto complete lecture if finish reached
            if (!completedLectures.includes(selectedLecture.id)) {
              handleCompleteToggle(selectedLecture.id);
            }
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, selectedLecture]);

  // Sync state whenever lecture changes
  useEffect(() => {
    setActiveSlideIndex(0);
    const parts = selectedLecture.duration.split(':');
    const totalSecs = parseInt(parts[0]) * 60 + parseInt(parts[1]);
    setDuration(totalSecs);
    // Set simulated custom resume spot (just for high fidelity)
    if (selectedLecture.id === 'l1') {
      setCurrentTime(1640); // 27:20 representation
    } else {
      setCurrentTime(Math.floor(totalSecs * 0.15)); // Start at 15% progress
    }
  }, [selectedLecture]);

  const triggerToast = (msg: string) => {
    setShowNotification(msg);
    setTimeout(() => {
      setShowNotification(null);
    }, 3000);
  };

  const handleCompleteToggle = (lecId: string) => {
    if (completedLectures.includes(lecId)) {
      setCompletedLectures(completedLectures.filter(id => id !== lecId));
      triggerToast("Lecture marked as incomplete");
    } else {
      setCompletedLectures([...completedLectures, lecId]);
      triggerToast("🎓 Lecture marked as COMPLETED!");
    }
  };

  const skipTime = (amount: number) => {
    setCurrentTime((prev) => {
      const next = prev + amount;
      if (next < 0) return 0;
      if (next > duration) return duration;
      return next;
    });
  };

  const formatVideoTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const currentSlide = selectedLecture.slides[activeSlideIndex] || selectedLecture.slides[0];

  const filteredLectures = lecturesData.filter(lec => {
    if (filter === 'ALL') return true;
    if (filter === 'PATHOLOGY NEW') return lec.category === 'pathology-new';
    if (filter === 'BIOCHEMISTRY OLD') return lec.category === 'biochemistry-old';
    return true;
  });

  // Calculate completion percentage based on simulated array
  const courseCompletionPercent = Math.round((completedLectures.length / lecturesData.length) * 100);

  return (
    <div className="min-h-screen bg-transparent text-primary pb-16 relative">
      
      {/* Dynamic Action Toaster toast */}
      {showNotification && (
        <div className="fixed top-6 right-6 z-[100] bg-[#3B82F6] text-white px-6 py-4 rounded-2xl shadow-2xl border border-white/20 animate-bounce flex items-center space-x-3">
          <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" />
          <span className="font-bold text-sm uppercase tracking-wider">{showNotification}</span>
        </div>
      )}

      {/* PDF Mock Interactive Modal */}
      {showPdfViewer && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0F172A] border border-white/10 rounded-3xl max-w-4xl w-full p-6 relative flex flex-col h-[85vh] shadow-[0_0_50px_rgba(59,130,246,0.3)]">
            <button 
              onClick={() => setShowPdfViewer(false)}
              className="absolute top-4 right-4 bg-white/5 hover:bg-white/10 p-2 rounded-xl transition-colors font-bold text-xs"
            >
              Close Previews ✕
            </button>
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="w-6 h-6 text-red-500" />
              <h3 className="text-xl font-bold">{selectedLecture.pdfUrl}</h3>
            </div>
            
            {/* Embedded mockup preview representing pathology syllabus notes */}
            <div className="flex-1 bg-white rounded-2xl p-8 overflow-y-auto text-slate-800 font-sans shadow-inner selection:bg-red-200">
              <div className="border-b-2 border-red-500 pb-4 mb-6">
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#2563EB]">QUICKMED ACADEMY SYSTEM NOTES</span>
                <h1 className="text-3xl font-black mt-1 text-slate-900">{selectedLecture.title} PDF</h1>
                <p className="text-slate-500 text-sm">Instructor: Dr. {selectedLecture.instructor} • System Pathology Department</p>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 mb-2">Primary Diagnosis Overview</h2>
                  <p className="leading-relaxed">This diagnostic lecture and the accompanied material explores the macroscopic features (Gross Pathology) and microscopic analysis (Microscopic Pathology) of basic kidney failure systems in the Middle East clinical regions. Ensure deep knowledge of early metanephric systems, cystic diseases, and clear markers to prevent tumor confusions.</p>
                </div>

                <div className="bg-slate-50 border-l-4 border-slate-400 p-4 rounded-r-xl">
                  <p className="italic text-slate-600 font-medium">"Systemic kidney lesions are heavily connected to blood and cardiorespiratory profiles. Prior knowledge of glomerular capillary flow models and filtration barriers of the glomerulus is recommended."</p>
                </div>

                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 mb-2">Lec 1 Focus Points Checklist</h2>
                  <ul className="list-decimal list-inside space-y-2 font-medium">
                    <li>Hereditary anomalies vs acquired disorders</li>
                    <li>Autosomal Dominant Polycystic Kidney Disease genetics (PKD-1, 16p13; PKD-2, 4q21)</li>
                    <li>Distinction matrices of benign Renal Cysts from Carcinomas on CT angiogram</li>
                    <li>Microscopic pathology of immature ducts configuration in infantile dysplastic kidneys</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
              <span className="text-xs text-slate-400">PDF Document Security Level III. Authorized for Medifli Students.</span>
              <a 
                href={`#download-${selectedLecture.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  triggerToast(`📥 Downloaded ${selectedLecture.pdfUrl}`);
                }}
                className="bg-[#2563EB] hover:bg-blue-600 text-white font-bold text-xs uppercase px-4 py-2.5 rounded-xl transition-all flex items-center space-x-2 shadow-lg hover:shadow-blue-500/20"
              >
                <Download className="w-4 h-4" />
                <span>Save to Device</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Header element to align beautifully */}
      <div className="max-w-[1700px] mx-auto px-4 md:px-8 pt-6">
        
        {/* Navigation and Title Bar */}
        <div className="flex flex-col xl:flex-row justify-between items-start gap-y-6 pb-8 border-b border-divider/50">
          <div className="space-y-4">
            {/* Back Button */}
            <button 
              onClick={onBack}
              className="bg-surface/30 hover:bg-surface-hover/30 border border-divider text-primary px-5 py-2.5 rounded-xl transition-all font-black text-xs uppercase tracking-[0.15em] flex items-center space-x-2 cursor-pointer shadow-lg active:scale-95 group backdrop-blur-md"
            >
              <ArrowLeft className="w-4 h-4 text-muted group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
            </button>

            {/* Title Block with QuickMed Meta Info */}
            <div>
              <div className="flex items-center space-x-3 text-muted text-xs font-bold uppercase tracking-[0.2em]">
                <span className="bg-[#3B82F6]/20 text-[#3B82F6] px-2 py-0.5 rounded-md text-[10px] font-black">QUICKMED</span>
                <span>{completedLectures.length}/{lecturesData.length} completed</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black mt-2 text-primary tracking-tight uppercase">
                Pathology UGS
              </h1>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-2.5 text-xs text-muted font-medium">
                <span className="text-blue-500 font-bold">{selectedLecture.title}</span>
                <span className="opacity-20">•</span>
                <span>By {selectedLecture.instructor}</span>
              </div>
            </div>
          </div>

          {/* Top Right Controls & Meta (Matches layout in the screenshot) */}
          <div className="flex items-center space-x-5 self-start xl:self-center">
            <div className="flex items-center space-x-2 bg-surface/30 border border-divider rounded-2xl p-1.5 backdrop-blur-md">
              <button 
                onClick={toggleLightMode}
                className="w-9 h-9 rounded-xl bg-transparent flex items-center justify-center text-amber-500 hover:bg-surface-hover/30 cursor-pointer transition-colors"
                title="Toggle visual theme"
              >
                {isLightMode ? <Moon className="w-4 h-4 text-blue-400" /> : <Sun className="w-4 h-4 text-yellow-500" />}
              </button>
              <button className="relative w-9 h-9 rounded-xl bg-transparent flex items-center justify-center text-primary/80 hover:bg-surface-hover/30 cursor-pointer transition-colors">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border border-base"></span>
              </button>
            </div>
            
            <div className="w-px h-8 bg-divider hidden sm:block"></div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#3B82F6] flex items-center justify-center font-black text-lg text-white shadow-lg shadow-blue-500/10">
                H
              </div>
              <div className="text-left hidden md:block">
                <p className="text-sm font-black text-primary leading-tight">Hussein Sharadgah</p>
                <p className="text-[10px] text-muted">hnhsh1@yahoo.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mt-8">
          
          {/* LEFT SIDE: Video slide player content (Spans 8 cols) */}
          <div className="xl:col-span-8 flex flex-col space-y-6">
            
            {/* Visual Screen player holding medical presentation slides */}
            <div className="relative aspect-video w-full bg-[#030712] rounded-[1.5rem] overflow-hidden border border-white/[0.07] shadow-2xl flex flex-col">
              
              {/* Dynamic Interactive Slide Deck mockup */}
              <div className="flex-1 w-full bg-white relative p-6 sm:p-10 select-none overflow-y-auto">
                <div className="max-w-4xl mx-auto h-full flex flex-col justify-between text-slate-800">
                  
                  {/* Slide Title */}
                  <div className="border-b border-cyan-500/20 pb-4 mb-4 select-none shrink-0">
                    <h2 className="text-2xl sm:text-3xl font-black text-cyan-500 uppercase tracking-tight">
                      {currentSlide.title}
                    </h2>
                  </div>

                  {/* Slide Main Body Core Grid (Left: points list, Right: micrograph organ visual) */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start flex-1">
                    
                    {/* Bullet elements with precise background highlights matching the UGS syllabus screenshot */}
                    <div className="md:col-span-7 space-y-3.5 text-xs sm:text-sm font-bold text-slate-800 leading-relaxed pr-2 overflow-y-auto max-h-[320px]">
                      {currentSlide.points.map((point, index) => {
                        let styleClass = "";
                        if (point.highlight === 'red') {
                          styleClass = "bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded-md inline-block border border-rose-200";
                        } else if (point.highlight === 'yellow') {
                          styleClass = "bg-yellow-200 text-slate-900 px-1.5 py-0.5 rounded-md inline line-block";
                        } else if (point.highlight === 'green') {
                          styleClass = "bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-md inline line-block border border-emerald-200";
                        } else if (point.highlight === 'dark-red') {
                          styleClass = "bg-red-900/10 text-red-800 px-1.5 py-0.5 rounded-md inline line-block font-extrabold border border-red-900/25";
                        }

                        return (
                          <div 
                            key={index} 
                            className={`${point.italic ? 'pl-4 italic text-slate-600 border-l border-slate-300' : ''}`}
                          >
                            {point.highlight ? (
                              <span className={styleClass}>{point.text}</span>
                            ) : (
                              <span>{point.text}</span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Pathology Microscope Circular Cell micrograph */}
                    <div className="md:col-span-5 flex flex-col items-center justify-center space-y-3 shrink-0">
                      <div className="relative group/cell w-full max-w-[200px] aspect-square rounded-2xl overflow-hidden border-2 border-slate-200 shadow-md">
                        <img 
                          src={currentSlide.cellImage} 
                          alt={currentSlide.cellDesc} 
                          className="w-full h-full object-cover grayscale-[30%] sate-[120%] hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-black/75 backdrop-blur-xs py-1.5 px-2 text-center text-white text-[9px] font-bold">
                          MICROGRAPHY ANALYSIS
                        </div>
                      </div>
                      <span className="text-[10px] uppercase font-extrabold text-slate-500 tracking-wider text-center block">
                        {currentSlide.cellDesc}
                      </span>
                    </div>

                  </div>

                  {/* Slide footer metadata info */}
                  <div className="border-t border-slate-100 pt-3 flex justify-between items-center text-[10px] text-slate-400 shrink-0 select-none">
                    <span>QuickMed Systems • Pathology of kidneys</span>
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-bold uppercase">
                      Slide {activeSlideIndex + 1} of {selectedLecture.slides.length}
                    </span>
                  </div>

                </div>
              </div>

              {/* OVERLAY PLAY STATE IN CONSOLE VIEW */}
              {!isPlaying && (
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] flex items-center justify-center z-20 pointer-events-auto">
                  <button 
                    onClick={() => setIsPlaying(true)}
                    className="w-18 h-18 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-2xl hover:bg-blue-600 transform active:scale-95 transition-all text-xl"
                  >
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </button>
                </div>
              )}

              {/* Bottom Custom Playback Bar Controls */}
              <div className="bg-slate-950/90 backdrop-blur-md px-6 py-4 border-t border-white/5 flex flex-col space-y-3 relative z-30 select-none">
                
                {/* Simulated Seek Track Slider */}
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-mono text-slate-400">{formatVideoTime(currentTime)}</span>
                  <div className="flex-1 relative group/slider py-1 cursor-pointer">
                    <input 
                      type="range"
                      min="0"
                      max={duration}
                      value={currentTime}
                      onChange={(e) => setCurrentTime(parseInt(e.target.value))}
                      className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-[#3B82F6] overflow-hidden focus:outline-none"
                    />
                  </div>
                  <span className="text-xs font-mono text-slate-400">{formatVideoTime(duration)}</span>
                </div>

                <div className="flex justify-between items-center pr-2">
                  <div className="flex items-center space-x-5">
                    {/* Play/Pause Toggle */}
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="text-slate-200 hover:text-white transition-colors cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                    </button>

                    {/* Rotate 10s backward */}
                    <button 
                      onClick={() => skipTime(-10)}
                      className="text-slate-400 hover:text-white transition-colors cursor-pointer relative"
                      title="Rewind 10s"
                    >
                      <RotateCcw className="w-5 h-5" />
                      <span className="absolute inset-0 flex items-center justify-center text-[7px] font-black mt-0.5">10</span>
                    </button>

                    {/* Rotate 10s forward */}
                    <button 
                      onClick={() => skipTime(10)}
                      className="text-slate-400 hover:text-white transition-colors cursor-pointer relative"
                      title="Forward 10s"
                    >
                      <RotateCw className="w-5 h-5" />
                      <span className="absolute inset-0 flex items-center justify-center text-[7px] font-black mt-0.5">10</span>
                    </button>

                    {/* Speaker Volume elements */}
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => setIsMuted(!isMuted)} 
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={isMuted ? 0 : volume}
                        onChange={(e) => {
                          setVolume(parseInt(e.target.value));
                          setIsMuted(false);
                        }}
                        className="w-16 h-1 bg-white/10 accent-[#3B82F6] rounded-full appearance-none cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Fullscreen, Settings & slides index navigation */}
                  <div className="flex items-center space-x-4">
                    
                    {/* Slide Navigation controls shortcut */}
                    <div className="flex items-center bg-white/5 border border-white/5 rounded-lg px-2 py-1 space-x-2">
                      <button 
                        onClick={() => setActiveSlideIndex(p => Math.max(0, p - 1))}
                        disabled={activeSlideIndex === 0}
                        className="text-[9px] uppercase tracking-wide font-black px-1.5 py-0.5 hover:bg-white/5 rounded-md disabled:opacity-30 disabled:pointer-events-none text-slate-300"
                      >
                        prev
                      </button>
                      <span className="text-[10px] font-mono text-blue-400 font-bold">
                        {activeSlideIndex + 1}/{selectedLecture.slides.length}
                      </span>
                      <button 
                        onClick={() => setActiveSlideIndex(p => Math.min(selectedLecture.slides.length - 1, p + 1))}
                        disabled={activeSlideIndex === selectedLecture.slides.length - 1}
                        className="text-[9px] uppercase tracking-wide font-black px-1.5 py-0.5 hover:bg-white/5 rounded-md disabled:opacity-30 disabled:pointer-events-none text-slate-300"
                      >
                        next
                      </button>
                    </div>

                    <button 
                      onClick={() => triggerToast("System settings opened (Adaptive stream active)")}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      <Settings className="w-4.5 h-4.5" />
                    </button>
                    <button 
                      onClick={() => triggerToast("Picture-in-picture activated")}
                      className="text-slate-400 hover:text-white transition-colors"
                      title="Picture in picture"
                    >
                      <ListVideo className="w-4.5 h-4.5" />
                    </button>
                    <button 
                      onClick={() => triggerToast("Expanded full view")}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      <Maximize className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick Actions and Live statistics block */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-surface/30 border border-divider rounded-2xl p-5 backdrop-blur-md">
              
              {/* Completed action check elements */}
              <div className="md:col-span-8 flex flex-wrap items-center gap-3">
                <button 
                  onClick={() => handleCompleteToggle(selectedLecture.id)}
                  className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center space-x-2 transition-all active:scale-95 shadow-md ${
                    completedLectures.includes(selectedLecture.id)
                      ? 'bg-[#10B981] text-white shadow-[#10B981]/15 hover:bg-[#059669] cursor-pointer'
                      : 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/20 hover:bg-[#10B981]/25 cursor-pointer'
                  }`}
                >
                  <CheckCircle className="w-4.5 h-4.5" />
                  <span>{completedLectures.includes(selectedLecture.id) ? 'COMPLETED' : 'MARK COMPLETE'}</span>
                </button>

                <button 
                  onClick={() => setShowPdfViewer(true)}
                  className="bg-surface/50 hover:bg-surface-hover/50 text-primary border border-divider active:scale-95 flex items-center space-x-2 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
                >
                  <Eye className="w-4.5 h-4.5" />
                  <span>VIEW PDF</span>
                </button>

                <button 
                  onClick={() => triggerToast(`📥 Saved ${selectedLecture.pdfUrl} download queue.`)}
                  className="bg-[#3B82F6] hover:bg-blue-600 text-white shadow-md active:scale-95 flex items-center space-x-2 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
                >
                  <Download className="w-4.5 h-4.5" />
                  <span>DOWNLOAD PDF</span>
                </button>
              </div>

              {/* Progress dynamic representation */}
              <div className="md:col-span-4 flex items-center justify-end space-x-4">
                <div className="text-right shrink-0">
                  <span className="text-[10px] uppercase font-black tracking-widest text-muted block">Overall Curriculum</span>
                  <span className="text-sm font-black text-primary block">{courseCompletionPercent}% WATCHED</span>
                </div>
                <div className="w-24 bg-surface-hover border border-divider rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-[#10B981] h-full rounded-full transition-all duration-500"
                    style={{ width: `${courseCompletionPercent}%` }}
                  ></div>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE: Information, syllabus index & list (Spans 4 cols) */}
          <div className="xl:col-span-4 space-y-6">
            
            {/* CARD 1: READ BEFORE WATCHING quick review */}
            <div className="bg-gradient-to-br from-blue-600/90 to-blue-800/95 text-white p-6 rounded-3xl border border-blue-500/30 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
              
              <div className="flex items-start space-x-3.5 relative z-10">
                <div className="bg-white/10 p-2.5 rounded-2xl">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold uppercase tracking-widest text-blue-200">READ BEFORE WATCHING</h4>
                  <p className="text-xs text-white/95 mt-1 leading-relaxed">
                    Quick overview of what you'll learn in this session.
                  </p>
                </div>
              </div>
            </div>

            {/* CARD 2: Current selection details summary */}
            <div className="bg-surface/30 border border-divider rounded-3xl p-6 space-y-5 relative backdrop-blur-md shadow-xl">
              <div className="flex justify-between items-start border-b border-divider pb-4">
                <div>
                  <h3 className="text-primary text-lg font-black tracking-tight">{selectedLecture.title}</h3>
                  <span className="text-[10px] text-[#3B82F6] font-bold uppercase tracking-wider">{selectedLecture.subtitle}</span>
                </div>
                <span className="bg-[#3B82F6]/10 text-[#3B82F6] text-[9px] font-black px-2 py-1 rounded-md uppercase">
                  {selectedLecture.category.replace('-', ' ')}
                </span>
              </div>

              {/* What you'll learn notes section */}
              <div className="space-y-2">
                <h5 className="text-[10px] font-black text-muted uppercase tracking-widest flex items-center space-x-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>WHAT YOU'LL LEARN</span>
                </h5>
                <p className="text-xs text-secondary font-medium leading-relaxed bg-surface/50 p-3.5 rounded-2xl border border-divider">
                  {selectedLecture.overview}
                </p>
              </div>

              {/* Study Material Box */}
              <div className="bg-surface/30 border border-divider/60 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-red-500/10 p-2 rounded-xl border border-red-500/15">
                    <FileText className="w-4 h-4 text-red-500" />
                  </div>
                  <div>
                    <h6 className="text-xs font-bold text-primary">Study Materials Available</h6>
                    <span className="text-[9px] text-muted block">PDF for this active lecture</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button 
                    onClick={() => setShowPdfViewer(true)}
                    className="bg-surface/50 hover:bg-surface-hover/50 border border-divider text-[10px] font-bold uppercase px-3 py-2 rounded-lg transition-colors flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Eye className="w-3 h-3" />
                    <span>VIEW</span>
                  </button>
                  <button 
                    onClick={() => triggerToast(`📥 Downloaded ${selectedLecture.pdfUrl}`)}
                    className="bg-[#3B82F6] hover:bg-blue-600 text-white text-[10px] font-bold uppercase px-3 py-2 rounded-lg transition-all flex items-center space-x-1.5 shadow-md shadow-blue-500/5 cursor-pointer"
                  >
                    <Download className="w-3 h-3" />
                    <span>SAVE</span>
                  </button>
                </div>
              </div>

            </div>

            {/* CARD 3: Lectures List Element (Beautiful checklist matching pathology screenshot) */}
            <div className="bg-surface/30 border border-divider rounded-3xl p-5 shadow-lg space-y-4 backdrop-blur-md">
              
              <div className="flex justify-between items-center border-b border-divider pb-3">
                <h4 className="text-xs uppercase font-extrabold tracking-widest text-[#10B981] flex items-center space-x-1.5 font-sans">
                  <ListVideo className="w-4 h-4" />
                  <span>LECTURES INDEX</span>
                </h4>
                <span className="text-xs font-extrabold text-[#10B981]">
                  {completedLectures.length}/{lecturesData.length} Completed
                </span>
              </div>

              {/* Lecture list sub filter buttons */}
              <div className="flex space-x-1.5 pb-1 overflow-x-auto select-none no-scrollbar">
                {(['ALL', 'PATHOLOGY NEW', 'BIOCHEMISTRY OLD'] as const).map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-colors shrink-0 cursor-pointer ${
                      filter === tab 
                        ? 'bg-[#3B82F6]/20 text-[#3B82F6] border border-[#3B82F6]/30' 
                        : 'bg-surface/40 text-muted hover:text-primary hover:bg-surface-hover/30 border border-divider'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Stack list of pathology items */}
              <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
                {filteredLectures.map((lec) => {
                  const isActive = selectedLecture.id === lec.id;
                  const isDone = completedLectures.includes(lec.id);
                  
                  return (
                    <div 
                      key={lec.id}
                      onClick={() => {
                        setSelectedLecture(lec);
                      }}
                      className={`group-item relative flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                        isActive 
                          ? 'bg-[#3B82F6]/15 border-[#3B82F6]/40 hover:bg-[#3B82F6]/20' 
                          : 'bg-surface/20 border-divider/40 hover:bg-surface/40 hover:border-divider'
                      }`}
                    >
                      {/* Left: icon / checkboxes and title details */}
                      <div className="flex items-center space-x-3.5 pr-3 min-w-0 flex-1">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCompleteToggle(lec.id);
                          }}
                          className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border transition-all cursor-pointer ${
                            isDone 
                              ? 'bg-[#10B981] border-[#10B981] text-white' 
                              : 'bg-surface/80 border-divider text-muted hover:border-primary/50'
                          }`}
                        >
                          <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-3" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                        
                        <div className="min-w-0">
                          <h5 className={`text-xs font-bold leading-snug truncate ${isActive ? 'text-blue-500' : 'text-primary'}`}>
                            {lec.title}
                          </h5>
                          <span className="text-[9px] text-muted uppercase font-black block mt-0.5">
                            {lec.duration} • {lec.subtitle}
                          </span>
                        </div>
                      </div>

                      {/* Right: PDF metadata indicators */}
                      <div className="flex items-center space-x-2 shrink-0">
                        {lec.pdfUrl && (
                          <span className="bg-red-500/10 text-red-500 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">
                            PDF
                          </span>
                        )}
                        <span className={`w-1.5 h-1.5 rounded-full ${isDone ? 'bg-[#10B981]' : 'bg-divider'}`}></span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Combined Progress bar element at base of Sidebar */}
              <div className="pt-3 border-t border-divider flex flex-col space-y-2">
                <div className="flex justify-between text-[10px] uppercase font-bold text-muted">
                  <span>CURRICULUM TRAIN TRACKER</span>
                  <span>{courseCompletionPercent}% COMPLETE</span>
                </div>
                <div className="w-full bg-surface-hover border border-divider rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-[#3B82F6] h-full rounded-full transition-all duration-300"
                    style={{ width: `${courseCompletionPercent}%` }}
                  ></div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
