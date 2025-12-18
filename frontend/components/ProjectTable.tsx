import React from 'react';
import { Project } from '../types';

interface ProjectTableProps {
  projects: Project[];
}

const ProjectTable: React.FC<ProjectTableProps> = ({ projects }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-xs font-semibold text-slate-400 border-b border-glass-border">
            <th className="pb-3 pl-2">Project Name</th>
            <th className="pb-3">Repository</th>
            <th className="pb-3">Status</th>
            <th className="pb-3">Health</th>
            <th className="pb-3">Last Activity</th>
            <th className="pb-3 text-right pr-2">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {projects.map((project) => (
            <tr key={project.id} className="group hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
              <td className="py-4 pl-2 font-medium text-slate-200">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center 
                    ${project.type === 'dashboard' ? 'bg-orange-500/20 text-orange-500' : 
                      project.type === 'api' ? 'bg-blue-500/20 text-blue-500' :
                      project.type === 'auth' ? 'bg-purple-500/20 text-purple-500' : 
                      'bg-red-500/20 text-red-500'}`}>
                    <span className="material-symbols-outlined text-lg">
                      {project.type === 'dashboard' ? 'rocket_launch' : 
                       project.type === 'api' ? 'shopping_bag' : 
                       project.type === 'auth' ? 'security' : 'bug_report'}
                    </span>
                  </div>
                  {project.name}
                </div>
              </td>
              <td className="py-4 text-slate-400 hover:text-primary cursor-pointer underline-offset-2 hover:underline">
                {project.repo}
              </td>
              <td className="py-4">
                <div className="flex items-center gap-2">
                  {project.status === 'Deployed' ? (
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                  ) : (
                    <span className={`h-2.5 w-2.5 rounded-full ${
                      project.status === 'Building' ? 'bg-yellow-500' :
                      project.status === 'Finished' ? 'bg-blue-500' : 'bg-red-500'
                    }`}></span>
                  )}
                  <span className={`text-xs font-medium ${
                    project.status === 'Deployed' ? 'text-emerald-400' :
                    project.status === 'Building' ? 'text-yellow-400' :
                    project.status === 'Finished' ? 'text-blue-400' : 'text-red-400'
                  }`}>{project.status}</span>
                </div>
              </td>
              <td className="py-4">
                <div className="w-24 bg-slate-700 rounded-full h-1.5 overflow-hidden">
                  <div className={`h-1.5 rounded-full ${
                    project.health > 90 ? 'bg-emerald-500' :
                    project.health > 60 ? 'bg-yellow-500' :
                    project.health === 100 ? 'bg-blue-500' : 'bg-red-500'
                  }`} style={{ width: `${project.health}%` }}></div>
                </div>
                <span className="text-[10px] text-slate-500 mt-1 block">{project.health}/100</span>
              </td>
              <td className="py-4 text-slate-400">{project.lastActivity}</td>
              <td className="py-4 text-right pr-2">
                {project.status === 'Error' ? (
                  <>
                    <button className="text-xs bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/20 px-3 py-1.5 rounded-lg transition mr-2">Debug</button>
                    <button className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-200 px-3 py-1.5 rounded-lg transition">Dismiss</button>
                  </>
                ) : (
                  <>
                    <button className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-200 px-3 py-1.5 rounded-lg transition mr-2">Logs</button>
                    {project.status === 'Building' ? (
                       <button className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-200 px-3 py-1.5 rounded-lg transition">Cancel</button>
                    ) : (
                       <button className={`text-xs px-3 py-1.5 rounded-lg transition shadow-lg ${
                         project.status === 'Finished' ? 'bg-primary hover:bg-blue-600 text-white shadow-blue-500/20' : 
                         'bg-primary hover:bg-blue-600 text-white shadow-blue-500/20'
                       }`}>
                         {project.status === 'Finished' ? 'Deploy' : 'Redeploy'}
                       </button>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;