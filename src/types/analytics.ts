export type DateRange = '7d' | '30d' | '90d' | '1y';

export interface CoverageChartData {
  date: string;
  percentage: number;
}

export interface CoverageMetricsData {
  total: number;
  trend: number;
  ui: number;
  api: number;
  e2e: number;
}

export interface CoverageData {
  percentage: number;
  byType: {
    ui: number;
    api: number;
    visual: number;
  };
  trend: { date: string; coverage: number }[];
}

export interface TestResult {
  id: string;
  name: string;
  status: 'passed' | 'failed' | 'skipped';
  duration: number;
  timestamp: string;
}

export interface TestMetrics {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  avgDuration: number;
}
