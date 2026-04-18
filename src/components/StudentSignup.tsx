import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Lock, ArrowLeft, BrainCircuit, Camera } from 'lucide-react';
import { DustBackground } from './DustBackground';

interface StudentSignupProps {
  onComplete: (profile: any) => void;
  onBack: () => void;
}

export function StudentSignup({ onComplete, onBack }: StudentSignupProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate and proceed
    if (formData.firstName && formData.email && formData.password) {
      onComplete(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] flex flex-col font-sans selection:bg-[#3B82F6]/30 selection:text-[#3B82F6] relative overflow-hidden">
      
      {/* Interactive Background */}
      <div className="absolute inset-0 z-0">
        <DustBackground />
      </div>

      {/* Top Header */}
      <header className="px-6 py-6 flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-2 text-[#3B82F6]">
          <BrainCircuit className="w-8 h-8" />
          <span className="font-extrabold text-2xl tracking-tight text-white">Medifli</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-xl">
          {/* Back Button */}
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 text-slate-400 hover:text-[#3B82F6] transition-colors font-medium cursor-pointer mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Portals</span>
          </button>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#131B2F]/90 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-[#1e293b] shadow-2xl"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white mb-2">Create your Profile</h2>
              <p className="text-slate-400">Join Medifli to track your progress and access practice materials.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Avatar Placeholder */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="w-24 h-24 bg-[#0B0F19] border border-[#1e293b] rounded-full flex items-center justify-center text-[#3B82F6]">
                    <User className="w-12 h-12" />
                  </div>
                  <button type="button" className="absolute bottom-0 right-0 bg-[#3B82F6] text-white p-2 text-xs rounded-full border-2 border-[#131B2F] hover:bg-blue-600 transition cursor-pointer">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300">First Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                      <User className="w-5 h-5" />
                    </div>
                    <input 
                      required
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Jane"
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0B0F19] border border-[#1e293b] text-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 outline-none transition-all placeholder:text-slate-600"
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300">Last Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                      <User className="w-5 h-5" />
                    </div>
                    <input 
                      required
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0B0F19] border border-[#1e293b] text-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 outline-none transition-all placeholder:text-slate-600"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input 
                    required
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane.doe@university.edu"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0B0F19] border border-[#1e293b] text-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 outline-none transition-all placeholder:text-slate-600"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input 
                    required
                    type="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0B0F19] border border-[#1e293b] text-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 outline-none transition-all placeholder:text-slate-600"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={!formData.firstName || !formData.email || !formData.password}
                className="w-full bg-[#3B82F6] hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border border-blue-400/30"
              >
                Continue to Profile Setup
              </button>

              <div className="text-center mt-6">
                <p className="text-slate-400 text-sm">
                  Already have an account? <a href="#" className="text-[#3B82F6] font-bold hover:underline cursor-pointer">Sign in here</a>
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
