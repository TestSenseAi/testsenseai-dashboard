import { LucideIcon } from 'lucide-react';

export interface DashboardStat {
  icon: LucideIcon;
  label: string;
  value: string;
  change: string;
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
