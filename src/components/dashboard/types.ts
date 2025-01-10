import { LucideIcon } from 'lucide-react';

export interface DashboardStat {
  icon: LucideIcon;
  label: string;
  value: string;
  subValue: string;
  trend: 'up' | 'down';
  color: string;
}

export interface TestRun {
  id: number;
  status: 'passed' | 'failed';
  time: string;
}

export interface Insight {
  title: string;
  description: string;
}
