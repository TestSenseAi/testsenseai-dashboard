export type ActivityType = 
  | 'test-started'
  | 'test-passed'
  | 'test-failed'
  | 'test-rerun'
  | 'case-created'
  | 'case-updated'
  | 'case-deleted'
  | 'branch-merged'
  | 'deployment-started'
  | 'deployment-completed'
  | 'alert-triggered'
  | 'coverage-changed'
  | 'performance-degraded'
  | 'security-scan-completed';

export type ActivityFilterType = 'all' | 'tests' | 'cases' | 'ci' | 'alerts' | 'security';

export interface Activity {
  id: string;
  type: ActivityType;
  description: string;
  timestamp: Date;
  environment: string;
  metadata?: {
    testId?: string;
    caseId?: string;
    branch?: string;
    duration?: number;
    coverageChange?: number;
    deploymentId?: string;
    alertSeverity?: 'low' | 'medium' | 'high';
    performanceMetrics?: {
      before: number;
      after: number;
      threshold: number;
    };
    securityFindings?: {
      high: number;
      medium: number;
      low: number;
    };
  };
}