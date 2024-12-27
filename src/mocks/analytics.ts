import { CoverageData, RiskAssessment } from '../types/analytics';
import { subDays, format } from 'date-fns';

export const mockCoverageData: CoverageData = {
  total: 1250,
  covered: 1075,
  percentage: 86,
  byType: {
    ui: 82,
    api: 90,
    visual: 78,
    accessibility: 85,
  },
  byComponent: [
    { name: 'Authentication', coverage: 95, risk: 'low' },
    { name: 'Dashboard', coverage: 88, risk: 'low' },
    { name: 'Test Runner', coverage: 75, risk: 'medium' },
    { name: 'Reports', coverage: 65, risk: 'high' },
  ],
  trend: Array.from({ length: 30 }).map((_, i) => ({
    date: format(subDays(new Date(), 29 - i), 'yyyy-MM-dd'),
    coverage: 75 + Math.random() * 20,
  })),
};

export const mockRiskData: RiskAssessment = {
  score: 65,
  level: 'medium',
  factors: [
    {
      name: 'Low coverage in Reports module',
      impact: 8,
      description: 'Critical business logic lacks sufficient test coverage',
    },
    {
      name: 'Flaky UI tests in Dashboard',
      impact: 6,
      description: 'Intermittent failures affecting reliability',
    },
    {
      name: 'Missing API integration tests',
      impact: 7,
      description: 'Key API endpoints lack end-to-end coverage',
    },
  ],
  recommendations: [
    'Increase test coverage in Reports module to at least 80%',
    'Implement retry mechanism for flaky UI tests',
    'Add integration tests for critical API endpoints',
    'Set up visual regression testing for key components',
  ],
};
