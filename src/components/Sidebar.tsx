import { LayoutDashboard, BookOpen, MessageSquare, Compass, CheckSquare, User, LogOut, ChevronLeft } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  onExit: () => void;
  isCollapsed: boolean;
  toggleSidebar: () => void;
  isLightMode?: boolean;
}

export function Sidebar({ currentView, setCurrentView, onExit, isCollapsed, toggleSidebar }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'DASHBOARD', icon: LayoutDashboard },
    { id: 'courses', label: 'MY COURSES', icon: BookOpen },
    { id: 'messages', label: 'MESSAGES', icon: MessageSquare },
    { id: 'explore', label: 'EXPLORE COURSES', icon: Compass },
    { id: 'quizzes', label: 'QUIZZES', icon: CheckSquare },
  ];

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-[280px]'} transition-all duration-300 ease-in-out h-full bg-base/30 backdrop-blur-md border-r border-divider/50 flex flex-col relative z-20 overflow-hidden`}>
      <div className={`p-6 flex items-center ${isCollapsed ? 'justify-center flex-col space-y-4' : 'justify-between'}`}>
        <div className="flex items-center space-x-3">
          <div className="bg-[#3B82F6] p-2 rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white font-black text-sm italic">M</span>
          </div>
          {!isCollapsed && <h1 className="text-xl font-black text-primary tracking-widest uppercase truncate">MEDIFLI</h1>}
        </div>
        <button 
          onClick={toggleSidebar}
          className="w-6 h-6 shrink-0 rounded bg-surface-hover flex items-center justify-center text-muted hover:text-primary transition-colors cursor-pointer"
        >
          <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto no-scrollbar">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              title={isCollapsed ? item.label : undefined}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'space-x-4 px-4'} py-3 rounded-lg transition-colors duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#3B82F6] text-white font-bold'
                  : 'text-muted hover:text-primary hover:bg-surface-hover/50 font-medium'
              }`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!isCollapsed && <span className="text-sm tracking-wide truncate">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="p-4 md:p-6 flex flex-col space-y-2 border-t border-divider/50">
        <button
          onClick={() => setCurrentView('profile')}
          title={isCollapsed ? "Profile" : undefined}
          className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'space-x-4 px-4'} py-3 rounded-lg transition-colors duration-200 cursor-pointer ${
            currentView === 'profile'
              ? 'bg-[#3B82F6] text-white font-bold'
              : 'text-muted hover:text-primary hover:bg-surface-hover/50 font-medium'
          }`}
        >
          <User className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span className="text-sm tracking-wide truncate">PROFILE</span>}
        </button>

        <button
          onClick={onExit}
          title={isCollapsed ? "Logout" : undefined}
          className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'space-x-4 px-4'} py-3 rounded-lg transition-colors duration-200 cursor-pointer text-muted hover:text-red-400 hover:bg-red-500/10 font-medium`}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span className="text-sm tracking-wide truncate">LOGOUT</span>}
        </button>
      </div>
    </aside>
  );
}
