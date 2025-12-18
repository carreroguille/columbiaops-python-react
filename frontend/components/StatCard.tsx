import React from 'react';
import { MetricCardProps } from '../types';

const StatCard: React.FC<MetricCardProps> = ({ title, value, trend, trendType, icon, colorClass }) => {
  
  // Parse colors dynamically based on prop to match the exact design
  let iconBg = '';
  let iconColor = '';
  let badgeBg = '';
  let badgeColor = '';

  if (colorClass === 'emerald') {
    iconBg = 'bg-emerald-500/20'; iconColor = 'text-emerald-300';
    badgeBg = 'bg-emerald-500/20'; badgeColor = 'text-emerald-300';
  } else if (colorClass === 'blue') {
    iconBg = 'bg-blue-500/20'; iconColor = 'text-blue-300';
    badgeBg = 'bg-slate-600/40'; badgeColor = 'text-slate-300'; // Special case for stable
  } else if (colorClass === 'amber') {
    iconBg = 'bg-amber-500/20'; iconColor = 'text-amber-300';
    badgeBg = 'bg-amber-500/20'; badgeColor = 'text-amber-300';
  } else if (colorClass === 'purple') {
    iconBg = 'bg-purple-500/20'; iconColor = 'text-purple-300';
    badgeBg = 'bg-purple-500/20'; badgeColor = 'text-purple-300';
  }

  return (
    <div className="p-6 rounded-3xl bg-slate-800/50 border border-glass-border shadow-sm hover:bg-slate-800/70 transition duration-300 glass-card">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${iconBg} ${iconColor}`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        {trend && (
          <span className={`text-xs font-medium ${badgeBg} ${badgeColor} px-2 py-1 rounded-lg`}>
            {trend}
          </span>
        )}
      </div>
      <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
      <p className="text-3xl font-bold text-white mt-1">{value}</p>
    </div>
  );
};

export default StatCard;