import { Activity } from '../../components/activity/types';

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'security-scan-completed',
    description: 'Security scan completed for main branch',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    environment: 'production',
    metadata: {
      securityFindings: {
        high: 2,
        medium: 5,
        low: 12,
      },
    },
  },
  {
    id: '2',
    type: 'performance-degraded',
    description: 'Performance degradation detected in checkout flow',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    environment: 'staging',
    metadata: {
      performanceMetrics: {
        before: 250,
        after: 450,
        threshold: 300,
      },
    },
  },
  // ... more mock activities
];
