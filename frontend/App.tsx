import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import ProjectTable from './components/ProjectTable';
import ProjectGenerator from './components/ProjectGenerator';
import { Project } from './types';

// Mock Data
const projectsData: Project[] = [
  { id: '1', name: 'Lifestats Dashboard', repo: 'github.com/ui/lifestats', status: 'Deployed', health: 95, lastActivity: '2 mins ago', type: 'dashboard' },
  { id: '2', name: 'E-Commerce API', repo: 'github.com/api/shop', status: 'Building', health: 70, lastActivity: '1 hour ago', type: 'api' },
  { id: '3', name: 'Auth Service', repo: 'github.com/core/auth', status: 'Finished', health: 100, lastActivity: 'Yesterday', type: 'auth' },
  { id: '4', name: 'Legacy Payment', repo: 'github.com/leg/pay', status: 'Error', health: 45, lastActivity: '3 days ago', type: 'legacy' },
];

function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'generator'>('dashboard');

  return (
    <main className="relative z-10 w-full max-w-[1400px] h-[90vh] flex gap-6">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />

      <section className="flex-1 flex flex-col rounded-[2.5rem] glass-panel bg-surface-dark border border-glass-border shadow-2xl overflow-hidden p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-md">
              {currentView === 'dashboard' ? 'Project Dashboard' : 'AI Studio'}
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              {currentView === 'dashboard' ? 'Overview of system status and active builds' : 'Transform ideas into technical specifications'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-white/10 transition">
              <span className="material-symbols-outlined text-slate-300">notifications</span>
            </button>
            <div className="w-10 h-10 rounded-full border-2 border-white/20 overflow-hidden shadow-md">
              <img 
                alt="User Profile" 
                className="w-full h-full object-cover" 
                src="https://picsum.photos/100/100" 
              />
            </div>
          </div>
        </header>

        {currentView === 'dashboard' ? (
          <div className="flex flex-col h-full gap-6 overflow-y-auto pr-2 pb-2">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Stats Grid */}
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatCard title="System Health" value="98.5%" trend="+2.4%" colorClass="emerald" icon="ecg_heart" />
                <StatCard title="Dependencies" value="1,240" trend="Stable" colorClass="blue" icon="hub" />
                <StatCard title="Technical Debt" value="12%" trend="-5 hrs" colorClass="amber" icon="warning" />
                <StatCard title="Running Costs" value="$4,250" trend="Monthly" colorClass="purple" icon="attach_money" />
              </div>

              {/* Donut Chart Card */}
              <div className="lg:col-span-1 p-6 rounded-3xl bg-slate-800/50 border border-glass-border shadow-sm flex flex-col items-center justify-between relative overflow-hidden glass-card">
                <div className="w-full flex justify-between items-center mb-4 z-10">
                  <h3 className="text-lg font-semibold text-white">Project Status</h3>
                  <button className="text-xs text-slate-400 flex items-center hover:text-white transition">
                    Monthly <span className="material-symbols-outlined text-sm ml-1">expand_more</span>
                  </button>
                </div>
                
                {/* CSS Conic Gradient Donut to match visual exactly */}
                <div className="relative w-48 h-48 flex items-center justify-center mb-4 z-10">
                  <div 
                    className="w-full h-full rounded-full shadow-lg"
                    style={{
                      background: 'conic-gradient(#10b981 0% 35%, #3b82f6 35% 60%, #eab308 60% 85%, #ef4444 85% 100%)'
                    }}
                  ></div>
                  <div className="absolute w-36 h-36 bg-[#1a2336] rounded-full flex flex-col items-center justify-center shadow-inner">
                    <span className="text-3xl font-bold text-white">85%</span>
                    <span className="text-xs text-slate-400">Efficiency</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 w-full text-xs z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-slate-300">Deployed</span>
                    <span className="ml-auto font-semibold text-white">35%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span className="text-slate-300">Finished</span>
                    <span className="ml-auto font-semibold text-white">25%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                    <span className="text-slate-300">In Prog</span>
                    <span className="ml-auto font-semibold text-white">25%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span className="text-slate-300">Errors</span>
                    <span className="ml-auto font-semibold text-white">15%</span>
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-500/20 blur-[60px] rounded-full z-0"></div>
              </div>
            </div>

            {/* Active Projects Table */}
            <div className="flex-1 min-h-[300px] p-6 rounded-3xl bg-slate-800/50 border border-glass-border shadow-sm flex flex-col glass-card">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">Active Projects</h3>
                <div className="flex gap-2">
                  <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition">
                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition">
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </button>
                </div>
              </div>
              <ProjectTable projects={projectsData} />
            </div>
          </div>
        ) : (
          <ProjectGenerator />
        )}
      </section>
    </main>
  );
}

export default App;