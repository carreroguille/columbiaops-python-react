import React from 'react';

interface SidebarProps {
  currentView: 'dashboard' | 'generator';
  setCurrentView: (view: 'dashboard' | 'generator') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  return (
    <aside className="hidden md:flex w-20 flex-col items-center justify-between py-8 rounded-[2rem] glass-panel bg-surface-dark border border-glass-border shadow-2xl h-full">
      <div className="flex flex-col gap-8 w-full items-center">
        <button 
          onClick={() => setCurrentView('dashboard')}
          className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all duration-300 ${currentView === 'dashboard' ? 'bg-primary shadow-blue-500/40' : 'bg-white/10'}`}
        >
          <span className="material-symbols-outlined">dashboard</span>
        </button>
        
        <div className="flex flex-col gap-6 w-full items-center text-slate-400">
          <button 
            onClick={() => setCurrentView('generator')}
            className={`transition-colors duration-300 hover:text-primary ${currentView === 'generator' ? 'text-primary' : ''}`}
            title="AI Project Generator"
          >
            <span className="material-symbols-outlined">smart_toy</span>
          </button>
          
          <button className="hover:text-primary transition-colors">
            <span className="material-symbols-outlined">monitoring</span>
          </button>
          <button className="hover:text-primary transition-colors">
            <span className="material-symbols-outlined">schedule</span>
          </button>
          <button className="hover:text-primary transition-colors">
            <span className="material-symbols-outlined">chat_bubble_outline</span>
          </button>
        </div>
      </div>
      <button className="text-slate-400 hover:text-primary transition-colors hover:rotate-90 duration-300">
        <span className="material-symbols-outlined">settings</span>
      </button>
    </aside>
  );
};

export default Sidebar;