export interface CoverageData {
  total: number;
  covered: number;
  percentage: number;
  byType: {
    ui: number;
    api: number;
    visual: number;
    accessibility: number;
  };
  byComponent: Array<{
    name: string;
    coverage: number;
    risk: 'low' | 'medium' | 'high';
  }>;
  trend: Array<{
    date: string;
    coverage: number;
  }>;
}

export interface TestDuration {
  average: number;
  byType: {
    ui: number;
    api: number;
    visual: number;
    accessibility: number;
  };
  trend: Array<{
    date: string;
    duration: number;
  }>;
}

export interface RiskAssessment {
  score: number;
  level: 'low' | 'medium' | 'high';
  factors: Array<{
    name: string;
    impact: number;
    description: string;
  }>;
  recommendations: string[];
}
