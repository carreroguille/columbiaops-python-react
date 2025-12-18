export interface Project {
  id: string;
  name: string;
  repo: string;
  status: 'Deployed' | 'Building' | 'Finished' | 'Error';
  health: number;
  lastActivity: string;
  type: 'dashboard' | 'api' | 'auth' | 'legacy';
}

export interface MetricCardProps {
  title: string;
  value: string;
  trend?: string;
  trendType?: 'positive' | 'negative' | 'neutral' | 'time';
  icon: string;
  colorClass: string;
}

export interface GeneratedSpec {
  projectName: string;
  description: string;
  techStack: {
    frontend: string;
    backend: string;
    database: string;
    deployment: string;
  };
  features: string[];
  setupCommands: string[];
}