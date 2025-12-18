import React, { useState } from 'react';
import { generateProjectSpec } from '../services/geminiService';
import { GeneratedSpec } from '../types';

const ProjectGenerator: React.FC = () => {
  const [idea, setIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [spec, setSpec] = useState<GeneratedSpec | null>(null);

  const handleGenerate = async () => {
    if (!idea.trim()) return;
    setIsLoading(true);
    setSpec(null);
    try {
      const result = await generateProjectSpec(idea);
      setSpec(result);
    } catch (e) {
      console.error(e);
      alert("Failed to generate spec. Check API Key.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full gap-6 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        {/* Input Section */}
        <div className="p-8 rounded-3xl bg-slate-800/50 border border-glass-border shadow-sm glass-card flex flex-col">
          <div className="mb-6">
            <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-300 w-fit mb-4">
              <span className="material-symbols-outlined">auto_awesome</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">AI Architect</h2>
            <p className="text-slate-400">Describe your idea, and I'll generate the full technical specification and repository structure.</p>
          </div>
          
          <textarea
            className="w-full flex-1 bg-slate-900/50 border border-white/10 rounded-xl p-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none mb-6"
            placeholder="e.g., A real-time chat application using WebSocket, Python FastAPI backend, and React frontend with a dark minimalist theme..."
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
          />

          <button
            onClick={handleGenerate}
            disabled={isLoading || !idea}
            className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
              isLoading || !idea
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                : 'bg-primary hover:bg-blue-600 text-white shadow-lg shadow-blue-500/25'
            }`}
          >
            {isLoading ? (
              <>
                <span className="material-symbols-outlined animate-spin">sync</span>
                Thinking...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined">rocket_launch</span>
                Generate Specification
              </>
            )}
          </button>
        </div>

        {/* Output Section */}
        <div className="p-8 rounded-3xl bg-slate-800/50 border border-glass-border shadow-sm glass-card overflow-y-auto relative">
           {!spec && !isLoading && (
             <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 opacity-50">
                <span className="material-symbols-outlined text-6xl mb-4">code_blocks</span>
                <p>Waiting for input...</p>
             </div>
           )}
           
           {isLoading && (
              <div className="space-y-4 animate-pulse-slow">
                <div className="h-8 bg-white/10 rounded w-1/3 mb-6"></div>
                <div className="h-24 bg-white/10 rounded w-full mb-6"></div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="h-20 bg-white/10 rounded"></div>
                  <div className="h-20 bg-white/10 rounded"></div>
                </div>
                <div className="h-40 bg-white/10 rounded w-full"></div>
              </div>
           )}

           {spec && (
             <div className="space-y-6 animate-fade-in">
               <div className="flex justify-between items-start">
                 <div>
                   <h3 className="text-xl font-bold text-white">{spec.projectName}</h3>
                   <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20 mt-2 inline-block">Generated successfully</span>
                 </div>
                 <button className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-lg transition flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">content_copy</span> Copy
                 </button>
               </div>

               <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-primary pl-4">
                 {spec.description}
               </p>

               <div>
                 <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Tech Stack</h4>
                 <div className="grid grid-cols-2 gap-3">
                    {Object.entries(spec.techStack).map(([key, val]) => (
                      <div key={key} className="bg-slate-900/40 p-3 rounded-lg border border-white/5">
                        <span className="text-xs text-slate-500 block capitalize">{key}</span>
                        <span className="text-sm text-slate-200 font-medium">{val}</span>
                      </div>
                    ))}
                 </div>
               </div>

               <div>
                 <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Key Features</h4>
                 <ul className="space-y-2">
                   {spec.features.map((feature, i) => (
                     <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                       <span className="material-symbols-outlined text-primary text-base pt-0.5">check_circle</span>
                       {feature}
                     </li>
                   ))}
                 </ul>
               </div>

               <div>
                 <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Setup</h4>
                 <div className="bg-black/40 rounded-xl p-4 font-mono text-xs text-slate-300 border border-white/5">
                   {spec.setupCommands.map((cmd, i) => (
                     <div key={i} className="mb-1 flex gap-2">
                       <span className="text-slate-600">$</span>
                       <span>{cmd}</span>
                     </div>
                   ))}
                 </div>
               </div>
               
               <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-semibold shadow-lg shadow-emerald-500/20 transition-all">
                 Initialize Repository
               </button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default ProjectGenerator;