import { LayoutDashboard, BookOpen, MessageSquare, Compass, CheckSquare, User, LogOut, ChevronLeft } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  onExit: () => void;
}

export function Sidebar({ currentView, setCurrentView, onExit }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'DASHBOARD', icon: LayoutDashboard },
    { id: 'courses', label: 'MY COURSES', icon: BookOpen },
    { id: 'messages', label: 'MESSAGES', icon: MessageSquare },
    { id: 'explore', label: 'EXPLORE COURSES', icon: Compass },
    { id: 'quizzes', label: 'QUIZZES', icon: CheckSquare },
    { id: 'profile', label: 'PROFILE', icon: User },
  ];

  return (
    <aside className="w-[280px] h-full bg-[#0B0F19] border-r border-[#1e293b]/50 flex flex-col relative z-20">
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-[#3B82F6] p-2 rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-sm italic">M</span>
          </div>
          <h1 className="text-xl font-black text-white tracking-widest uppercase">MEDIFLI</h1>
        </div>
        <button className="w-6 h-6 rounded bg-[#1e293b] flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer">
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
      
      <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center space-x-4 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#3B82F6] text-white font-bold'
                  : 'text-slate-400 hover:bg-[#1e293b]/50 hover:text-white font-medium'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm tracking-wide">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-6">
        <button
          onClick={onExit}
          className="flex items-center space-x-3 text-slate-500 hover:text-white font-medium transition-colors cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm tracking-wide">LOGOUT</span>
        </button>
      </div>
    </aside>
  );
}
