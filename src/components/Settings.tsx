import React, { useState } from 'react';
import { User, Bell, Shield, BookOpen, Monitor, Save, Lock, LayoutGrid, Award } from 'lucide-react';

export function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Edit Profile', icon: User },
    { id: 'preferences', label: 'Study Preferences', icon: BookOpen },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security & Access', icon: Shield },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animation-fade-in font-sans">
      <header>
        <h2 className="text-3xl font-black text-primary tracking-wide uppercase">Account Settings</h2>
        <p className="text-muted mt-2 font-medium">Manage your personal information, security, and learning preferences.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <div className="md:col-span-1 space-y-2">
          {tabs.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-5 py-4 rounded-2xl text-sm font-bold tracking-wide transition-all ${
                activeTab === item.id
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-500/30' 
                  : 'text-muted hover:bg-surface hover:text-slate-200 border border-transparent'
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-blue-400' : 'text-slate-500'}`} />
              <span className="uppercase">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="md:col-span-3 space-y-6">
          
          {activeTab === 'profile' && (
            <div className="bg-surface rounded-3xl border border-divider shadow-xl overflow-hidden animation-fade-in">
              <div className="p-6 md:p-8 border-b border-divider">
                <h3 className="text-xl font-bold text-primary tracking-wide flex items-center space-x-3">
                  <User className="w-6 h-6 text-blue-400" />
                  <span>Public Profile Information</span>
                </h3>
                <p className="text-sm text-muted mt-2">Update your personal details, avatar, and password here.</p>
              </div>
              
              <div className="p-6 md:p-8 space-y-8">
                {/* Avatar */}
                <div className="flex items-center space-x-8">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-primary text-3xl font-black shadow-lg border-2 border-slate-700/50">
                    AJ
                  </div>
                  <div>
                    <button className="px-6 py-3 bg-base border border-divider hover:border-blue-500 hover:text-blue-400 rounded-xl text-sm font-bold text-secondary transition-all uppercase tracking-widest shadow-sm">
                      Upload Avatar
                    </button>
                    <p className="text-xs text-slate-500 mt-3 font-medium">Recommended: 256x256px JPG or PNG.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Info */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">First Name</label>
                    <input type="text" defaultValue="Alex" className="w-full px-5 py-3 bg-base border border-divider text-primary rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Last Name</label>
                    <input type="text" defaultValue="Johnson" className="w-full px-5 py-3 bg-base border border-divider text-primary rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                    <input type="email" defaultValue="alex.johnson@example.com" className="w-full px-5 py-3 bg-base border border-divider text-primary rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                  </div>

                  <div className="space-y-2 md:col-span-2 mt-4 pt-4 border-t border-divider">
                    <div className="flex items-center space-x-2 mb-4 text-emerald-400">
                      <Lock className="w-4 h-4" />
                      <h4 className="text-sm font-bold tracking-wide uppercase">Change Password</h4>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-5 py-3 bg-base border border-divider text-primary rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Confirm Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-5 py-3 bg-base border border-divider text-primary rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" />
                  </div>

                  <div className="space-y-2 md:col-span-2 mt-4 pt-4 border-t border-divider">
                    <h4 className="text-sm font-bold tracking-wide uppercase text-blue-400 mb-4 whitespace-nowrap flex items-center space-x-2">
                      <Award className="w-4 h-4" />
                      <span>Academic Identity</span>
                    </h4>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">University</label>
                    <select className="w-full px-5 py-3 bg-base border border-divider text-primary rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none cursor-pointer">
                      <option>University of Jordan</option>
                      <option>Yarmouk University</option>
                      <option>Mutah University</option>
                      <option>Jordan University of Science and Technology</option>
                      <option>Hashemite University</option>
                      <option>Al-Balqa Applied University</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Major</label>
                    <select className="w-full px-5 py-3 bg-base border border-divider text-primary rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none cursor-pointer">
                      <option>Medicine</option>
                      <option>Pharmacy</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">University Year</label>
                    <select className="w-full px-5 py-3 bg-base border border-divider text-primary rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none cursor-pointer">
                      <option>Year 1</option>
                      <option>Year 2</option>
                      <option>Year 3</option>
                      <option>Year 4</option>
                      <option>Year 5</option>
                      <option>Year 6</option>
                    </select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Short Bio</label>
                    <textarea rows={3} placeholder="Tell us a bit about your career goals..." className="w-full px-5 py-3 bg-base border border-divider text-primary rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"></textarea>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="bg-surface rounded-3xl border border-divider shadow-xl overflow-hidden animation-fade-in">
              <div className="p-6 md:p-8 border-b border-divider">
                <h3 className="text-xl font-bold text-primary tracking-wide flex items-center space-x-3">
                  <BookOpen className="w-6 h-6 text-emerald-400" />
                  <span>Study Goals & Preferences</span>
                </h3>
                <p className="text-sm text-muted mt-2">Customize how the platform adapts to your schedule and intensity.</p>
              </div>
              <div className="p-6 md:p-8 space-y-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Target Exam Date</label>
                  <input type="date" defaultValue="2026-05-15" className="w-full md:w-1/2 px-5 py-3 bg-base border border-divider text-primary rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition-all" />
                </div>
                
                <div className="space-y-3 pt-4">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Daily Target Velocity</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {['Casual (15m)', 'Regular (30m)', 'Intense (60m+)'].map((goal, i) => (
                      <button key={goal} className={`px-4 py-4 rounded-xl text-sm font-bold tracking-wide transition-all border ${i === 1 ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'bg-base border-divider text-muted hover:border-slate-500'}`}>
                        {goal}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between py-5 border-t border-divider">
                  <div>
                    <h4 className="text-sm font-bold text-primary tracking-wide uppercase">Strict Mode Focus</h4>
                    <p className="text-xs text-muted mt-1">Hides dashboard metrics and social features during active study sessions.</p>
                  </div>
                  <button className="w-12 h-6 rounded-full bg-emerald-600 relative transition-colors focus:outline-none">
                    <span className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white shadow-sm"></span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-surface rounded-3xl border border-divider shadow-xl overflow-hidden animation-fade-in p-6 md:p-8 flex flex-col items-center justify-center text-center py-16">
               <Bell className="w-12 h-12 text-slate-600 mb-4" />
               <h3 className="text-xl font-bold text-primary mb-2 tracking-wide uppercase">Notification Settings</h3>
               <p className="text-muted max-w-sm">Manage email digests, push notifications, and study reminders here.</p>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-surface rounded-3xl border border-divider shadow-xl overflow-hidden animation-fade-in p-6 md:p-8 flex flex-col items-center justify-center text-center py-16">
               <Shield className="w-12 h-12 text-slate-600 mb-4" />
               <h3 className="text-xl font-bold text-primary mb-2 tracking-wide uppercase">Security & Privacy</h3>
               <p className="text-muted max-w-sm">Configure Two-Factor Authentication (2FA) and view active device sessions.</p>
            </div>
          )}

          {/* Global Save Button */}
          <div className="flex justify-end pt-4">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-primary rounded-xl font-black uppercase tracking-widest flex items-center space-x-3 transition-all shadow-lg shadow-blue-500/20 transform active:scale-95">
              <span>Save Changes</span>
              <Save className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
