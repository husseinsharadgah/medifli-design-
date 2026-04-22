import { useState } from 'react';
import { 
  Shield, Users, Database, UploadCloud, Plus, Search, Filter, 
  Edit3, Eye, Trash2, ChevronRight, FileText, CheckCircle2, 
  BarChart3, Activity, FolderTree, LogOut, Settings, MoreVertical,
  Lock, AlertTriangle, BookOpen
} from 'lucide-react';

// Mock Hierarchy Data
const years = ['Year 1', 'Year 2', 'Year 3', 'Year 4'];
const semesters = ['Semester 1', 'Semester 2'];
const systems = ['Cardiovascular', 'Respiratory', 'Gastrointestinal', 'Neurology', 'Endocrine', 'Renal'];
const subjects = ['Anatomy', 'Physiology', 'Pathology', 'Pharmacology', 'Microbiology', 'Histology'];

// Mock Questions Data
const initialQuestions = [
  { id: 'Q-1042', type: 'MCQ', text: 'Which of the following valves prevents backflow from the right ventricle to the right atrium?', difficulty: 'Easy', status: 'Active' },
  { id: 'Q-1043', type: 'MCQ', text: 'What is the primary pacemaker of the heart?', difficulty: 'Medium', status: 'Active' },
  { id: 'Q-1044', type: 'Fill-in-Blank', text: 'The ________ artery supplies the anterior wall of the left ventricle.', difficulty: 'Hard', status: 'Needs Review' },
  { id: 'Q-1045', type: 'Flashcard', text: 'Define Cardiac Output (CO).', difficulty: 'Medium', status: 'Active' },
  { id: 'Q-1046', type: 'Past Exam', text: 'A 55-year-old man presents with crushing chest pain...', difficulty: 'Hard', status: 'Active' },
];

// Mock Users Data
const mockUsers = [
  { id: 'U-001', name: 'Alex Johnson', email: 'alex@example.com', role: 'Student', status: 'Active', lastLogin: '2 mins ago' },
  { id: 'U-002', name: 'Sarah Smith', email: 'sarah@example.com', role: 'Student', status: 'Active', lastLogin: '1 hour ago' },
  { id: 'U-003', name: 'Dr. Robert Chen', email: 'rchen@example.com', role: 'Instructor', status: 'Active', lastLogin: '1 day ago' },
  { id: 'U-004', name: 'Emily Davis', email: 'emily@example.com', role: 'Student', status: 'Suspended', lastLogin: '1 week ago' },
];

export function AdminDashboard({ onExit }: { onExit: () => void }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'questions' | 'users' | 'curriculum' | 'settings'>('overview');
  
  // Hierarchy State
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [selectedSemester, setSelectedSemester] = useState(semesters[0]);
  const [selectedSystem, setSelectedSystem] = useState(systems[0]);
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);

  // UI State
  const [showUploadModal, setShowUploadModal] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Platform Overview', icon: BarChart3 },
    { id: 'questions', label: 'Question Bank', icon: Database },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'curriculum', label: 'Curriculum Editor', icon: FolderTree },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ] as const;

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 selection:bg-rose-100 selection:text-rose-900 overflow-hidden">
      
      {/* Admin Sidebar */}
      <aside className="w-72 bg-slate-900 text-primary flex flex-col shadow-xl z-20 flex-shrink-0">
        <div className="p-6 flex items-center space-x-3 border-b border-slate-800">
          <div className="bg-rose-500/20 p-2 rounded-xl">
            <Shield className="w-6 h-6 text-rose-400" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Medifli <span className="text-rose-400">Admin</span></h1>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-2xl transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-rose-500 text-primary font-bold shadow-md'
                  : 'text-muted hover:bg-slate-800 hover:text-primary font-medium'
              }`}
            >
              <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-primary' : 'text-muted'}`} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={onExit} 
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-muted hover:bg-slate-800 hover:text-primary transition-colors font-medium"
          >
            <LogOut className="w-5 h-5" />
            <span>Exit Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-y-auto relative">
        <div className="p-8 md:p-12 max-w-[1600px] mx-auto space-y-8 pb-24">
          
          <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 border-b border-slate-200 pb-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                {tabs.find(t => t.id === activeTab)?.label}
              </h2>
              <p className="text-slate-500 font-medium mt-1">
                {activeTab === 'overview' && 'Monitor platform health and high-level metrics.'}
                {activeTab === 'questions' && 'Manage curriculum, upload question banks, and review content.'}
                {activeTab === 'users' && 'Manage student accounts, roles, and access permissions.'}
                {activeTab === 'curriculum' && 'Edit the structural hierarchy of the learning modules.'}
                {activeTab === 'settings' && 'Configure global platform settings and security.'}
              </p>
            </div>
          </header>

          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: 'Total Active Users', value: '12,450', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
                  { label: 'Questions in Bank', value: '45,281', icon: Database, color: 'text-indigo-600', bg: 'bg-indigo-100' },
                  { label: 'Questions Answered', value: '1.2M', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-100' },
                  { label: 'System Health', value: '99.9%', icon: Activity, color: 'text-rose-600', bg: 'bg-rose-100' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                    <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center mb-4`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                    <p className="text-sm font-medium text-slate-500 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm h-96 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <BarChart3 className="w-16 h-16 text-secondary mx-auto" />
                  <p className="text-slate-500 font-medium">Detailed analytics dashboard goes here.</p>
                </div>
              </div>
            </div>
          )}

          {/* QUESTIONS TAB */}
          {activeTab === 'questions' && (
            <div className="space-y-6">
              {/* Hierarchy Selector */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                    <FolderTree className="w-5 h-5 text-indigo-600" />
                    <span>Curriculum Hierarchy</span>
                  </h3>
                  <button 
                    onClick={() => setShowUploadModal(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-primary px-5 py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center space-x-2 shadow-sm"
                  >
                    <UploadCloud className="w-4 h-4" />
                    <span>Upload / Add Questions</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Year</label>
                    <select 
                      value={selectedYear} 
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm font-bold rounded-xl focus:ring-indigo-500 focus:border-indigo-500 block p-3 outline-none appearance-none cursor-pointer"
                    >
                      {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Semester</label>
                    <select 
                      value={selectedSemester} 
                      onChange={(e) => setSelectedSemester(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm font-bold rounded-xl focus:ring-indigo-500 focus:border-indigo-500 block p-3 outline-none appearance-none cursor-pointer"
                    >
                      {semesters.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">System</label>
                    <select 
                      value={selectedSystem} 
                      onChange={(e) => setSelectedSystem(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm font-bold rounded-xl focus:ring-indigo-500 focus:border-indigo-500 block p-3 outline-none appearance-none cursor-pointer"
                    >
                      {systems.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Subject</label>
                    <select 
                      value={selectedSubject} 
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm font-bold rounded-xl focus:ring-indigo-500 focus:border-indigo-500 block p-3 outline-none appearance-none cursor-pointer"
                    >
                      {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Question Table */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
                  <div className="flex items-center space-x-2">
                    <Database className="w-5 h-5 text-muted" />
                    <h3 className="text-lg font-bold text-slate-900">
                      {selectedSystem} - {selectedSubject} Questions
                    </h3>
                    <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-full ml-2">
                      {initialQuestions.length} Total
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                      <input 
                        type="text" 
                        placeholder="Search questions..." 
                        className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-64 shadow-sm"
                      />
                    </div>
                    <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
                      <Filter className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-white border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                        <th className="p-4 font-bold">ID</th>
                        <th className="p-4 font-bold">Type</th>
                        <th className="p-4 font-bold w-1/2">Question Text</th>
                        <th className="p-4 font-bold">Difficulty</th>
                        <th className="p-4 font-bold">Status</th>
                        <th className="p-4 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {initialQuestions.map((q) => (
                        <tr key={q.id} className="hover:bg-slate-50 transition-colors group">
                          <td className="p-4 text-sm font-mono text-slate-500">{q.id}</td>
                          <td className="p-4">
                            <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-md">
                              {q.type}
                            </span>
                          </td>
                          <td className="p-4 text-sm text-slate-900 font-medium truncate max-w-md">
                            {q.text}
                          </td>
                          <td className="p-4">
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                              q.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700' :
                              q.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700' :
                              'bg-rose-100 text-rose-700'
                            }`}>
                              {q.difficulty}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`flex items-center space-x-1 text-xs font-bold ${
                              q.status === 'Active' ? 'text-emerald-600' : 'text-amber-600'
                            }`}>
                              {q.status === 'Active' ? <CheckCircle2 className="w-3 h-3" /> : <Activity className="w-3 h-3" />}
                              <span>{q.status}</span>
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-1.5 text-muted hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="View">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-1.5 text-muted hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button className="p-1.5 text-muted hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Delete">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-sm text-slate-500">
                  <span>Showing 1 to 5 of 5 entries</span>
                  <div className="flex space-x-1">
                    <button className="px-3 py-1 border border-slate-200 rounded-md bg-white text-muted cursor-not-allowed">Prev</button>
                    <button className="px-3 py-1 border border-indigo-600 rounded-md bg-indigo-600 text-primary font-medium">1</button>
                    <button className="px-3 py-1 border border-slate-200 rounded-md bg-white hover:bg-slate-50 text-slate-700">Next</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* USERS TAB */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-muted" />
                    <h3 className="text-lg font-bold text-slate-900">User Directory</h3>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                      <input 
                        type="text" 
                        placeholder="Search users..." 
                        className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 w-full md:w-64 shadow-sm"
                      />
                    </div>
                    <button className="bg-rose-600 hover:bg-rose-700 text-primary px-4 py-2 rounded-xl font-bold text-sm transition-colors flex items-center space-x-2 shadow-sm">
                      <Plus className="w-4 h-4" />
                      <span>Invite User</span>
                    </button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-white border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                        <th className="p-4 font-bold">User</th>
                        <th className="p-4 font-bold">Role</th>
                        <th className="p-4 font-bold">Status</th>
                        <th className="p-4 font-bold">Last Login</th>
                        <th className="p-4 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {mockUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">
                                {user.name.charAt(0)}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-slate-900">{user.name}</p>
                                <p className="text-xs text-slate-500">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                              user.role === 'Instructor' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-700'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`flex items-center space-x-1 text-xs font-bold ${
                              user.status === 'Active' ? 'text-emerald-600' : 'text-rose-600'
                            }`}>
                              {user.status === 'Active' ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                              <span>{user.status}</span>
                            </span>
                          </td>
                          <td className="p-4 text-sm text-slate-500">{user.lastLogin}</td>
                          <td className="p-4 text-right">
                            <button className="p-1.5 text-muted hover:text-slate-900 rounded-lg transition-colors">
                              <MoreVertical className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* CURRICULUM TAB */}
          {activeTab === 'curriculum' && (
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
                <BookOpen className="w-16 h-16 text-secondary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Curriculum Builder</h3>
                <p className="text-slate-500 max-w-md mx-auto mb-6">
                  Drag and drop to reorder years, semesters, systems, and subjects. Add new modules to expand the platform's coverage.
                </p>
                <button className="bg-slate-900 hover:bg-slate-800 text-primary px-6 py-3 rounded-xl font-bold transition-colors shadow-sm">
                  Launch Visual Editor
                </button>
              </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="text-lg font-bold text-slate-900">Global Platform Settings</h3>
                </div>
                <div className="p-6 space-y-8">
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Security & Access</h4>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div>
                        <p className="font-bold text-slate-900">Maintenance Mode</p>
                        <p className="text-sm text-slate-500">Disable student access while updating the question bank.</p>
                      </div>
                      <button className="w-12 h-6 bg-slate-300 rounded-full relative transition-colors">
                        <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1"></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div>
                        <p className="font-bold text-slate-900">Open Registration</p>
                        <p className="text-sm text-slate-500">Allow new students to sign up without an invite link.</p>
                      </div>
                      <button className="w-12 h-6 bg-emerald-500 rounded-full relative transition-colors">
                        <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">API Configuration</h4>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">OpenAI / Gemini API Key</label>
                      <div className="flex space-x-2">
                        <div className="relative flex-1">
                          <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                          <input 
                            type="password" 
                            value="************************" 
                            readOnly
                            className="pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm w-full text-slate-500"
                          />
                        </div>
                        <button className="px-4 py-2.5 bg-slate-900 text-primary font-bold rounded-xl text-sm hover:bg-slate-800 transition-colors">
                          Update
                        </button>
                      </div>
                      <p className="text-xs text-slate-500">Used for generating predictive analytics and diagnostic insights.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Upload/Add Modal (Only visible when triggered from Questions tab) */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                <UploadCloud className="w-6 h-6 text-indigo-600" />
                <span>Add Questions to {selectedSystem} ({selectedSubject})</span>
              </h3>
              <button onClick={() => setShowUploadModal(false)} className="text-muted hover:text-slate-600">
                <Trash2 className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto flex-1 space-y-8">
              {/* Bulk Upload Zone */}
              <div className="border-2 border-dashed border-indigo-200 bg-indigo-50/50 rounded-3xl p-10 text-center hover:bg-indigo-50 transition-colors cursor-pointer">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 text-indigo-600">
                  <FileText className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Bulk Upload Questions</h4>
                <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
                  Drag and drop your CSV, JSON, or Excel files here. Ensure they follow the standard Medifli format template.
                </p>
                <button className="bg-white border border-slate-200 text-slate-700 px-6 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-50 transition-colors">
                  Browse Files
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex-1 h-px bg-slate-200"></div>
                <span className="text-xs font-bold text-muted uppercase tracking-wider">OR ADD MANUALLY</span>
                <div className="flex-1 h-px bg-slate-200"></div>
              </div>

              {/* Manual Entry Form */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Question Type</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                      <option>Multiple Choice (MCQ)</option>
                      <option>Fill in the Blank</option>
                      <option>Flashcard</option>
                      <option>Past Exam Context</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Difficulty</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                      <option>Easy</option>
                      <option>Medium</option>
                      <option>Hard</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Question Text</label>
                  <textarea 
                    rows={3} 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="Enter the question here..."
                  ></textarea>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700">Options (for MCQ)</label>
                  {['A', 'B', 'C', 'D'].map((opt, i) => (
                    <div key={opt} className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm">{opt}</div>
                      <input type="text" className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder={`Option ${opt}`} />
                      <input type="radio" name="correct_answer" className="w-5 h-5 text-indigo-600 focus:ring-indigo-500" title="Mark as correct answer" />
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Explanation (Shown after answering)</label>
                  <textarea 
                    rows={2} 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="Explain why the answer is correct..."
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end space-x-3">
              <button 
                onClick={() => setShowUploadModal(false)}
                className="px-6 py-2.5 text-slate-600 font-bold hover:bg-slate-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-primary font-bold rounded-xl shadow-sm transition-colors flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Save Question</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
