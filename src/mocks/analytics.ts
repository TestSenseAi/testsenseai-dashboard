import { CoverageChartData, TestResult, TestMetrics } from '../types/analytics';

export const mockCoverageData: CoverageChartData[] = [
  { date: '2024-01-01', percentage: 82.5 },
  { date: '2024-01-08', percentage: 83.2 },
  { date: '2024-01-15', percentage: 85.7 },
  { date: '2024-01-22', percentage: 84.9 },
  { date: '2024-01-29', percentage: 86.3 },
  { date: '2024-02-05', percentage: 87.1 },
  { date: '2024-02-12', percentage: 88.4 },
  { date: '2024-02-19', percentage: 89.2 },
  { date: '2024-02-26', percentage: 90.1 },
  { date: '2024-03-04', percentage: 91.5 },
];

export const mockTestExecutionData = [
  { date: '2024-01-01', duration: 45.2, count: 120 },
  { date: '2024-01-08', duration: 43.8, count: 125 },
  { date: '2024-01-15', duration: 42.5, count: 128 },
  { date: '2024-01-22', duration: 44.1, count: 122 },
  { date: '2024-01-29', duration: 41.7, count: 130 },
  { date: '2024-02-05', duration: 40.9, count: 135 },
  { date: '2024-02-12', duration: 39.8, count: 138 },
  { date: '2024-02-19', duration: 38.5, count: 142 },
  { date: '2024-02-26', duration: 37.9, count: 145 },
  { date: '2024-03-04', duration: 36.8, count: 150 },
];

export const mockPerformanceData = {
  loadTime: [
    { date: '2024-02-26', value: 2.1 },
    { date: '2024-02-27', value: 2.3 },
    { date: '2024-02-28', value: 2.0 },
    { date: '2024-02-29', value: 1.9 },
    { date: '2024-03-01', value: 1.8 },
    { date: '2024-03-02', value: 1.7 },
    { date: '2024-03-03', value: 1.6 },
    { date: '2024-03-04', value: 1.5 },
  ],
  errorRate: [
    { date: '2024-02-26', value: 2.5 },
    { date: '2024-02-27', value: 2.2 },
    { date: '2024-02-28', value: 2.0 },
    { date: '2024-02-29', value: 1.8 },
    { date: '2024-03-01', value: 1.5 },
    { date: '2024-03-02', value: 1.3 },
    { date: '2024-03-03', value: 1.2 },
    { date: '2024-03-04', value: 1.0 },
  ],
  throughput: [
    { date: '2024-02-26', value: 850 },
    { date: '2024-02-27', value: 920 },
    { date: '2024-02-28', value: 880 },
    { date: '2024-02-29', value: 950 },
    { date: '2024-03-01', value: 1020 },
    { date: '2024-03-02', value: 980 },
    { date: '2024-03-03', value: 1050 },
    { date: '2024-03-04', value: 1100 },
  ],
};

export const mockRecentTestResults: TestResult[] = [
  {
    id: 'test-1',
    name: 'User Authentication Flow',
    status: 'passed',
    duration: 3.2,
    timestamp: '2024-03-04T15:30:00Z',
  },
  {
    id: 'test-2',
    name: 'Product Search and Filter',
    status: 'failed',
    duration: 4.5,
    timestamp: '2024-03-04T15:25:00Z',
  },
  {
    id: 'test-3',
    name: 'Shopping Cart Operations',
    status: 'passed',
    duration: 2.8,
    timestamp: '2024-03-04T15:20:00Z',
  },
  {
    id: 'test-4',
    name: 'Checkout Process',
    status: 'passed',
    duration: 5.1,
    timestamp: '2024-03-04T15:15:00Z',
  },
  {
    id: 'test-5',
    name: 'User Profile Update',
    status: 'skipped',
    duration: 0,
    timestamp: '2024-03-04T15:10:00Z',
  },
];

export const mockTestMetrics: TestMetrics = {
  total: 150,
  passed: 135,
  failed: 10,
  skipped: 5,
  avgDuration: 3.8,
};
