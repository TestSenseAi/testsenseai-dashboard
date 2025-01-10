export type TestEnvironment = 'development' | 'staging' | 'production';
export type TestPriority = 'high' | 'medium' | 'low';
export type TestStatus = 'passed' | 'failed' | 'blocked' | 'skipped';
export type TestRunStatus = 'queued' | 'running' | 'completed' | 'aborted';

export interface TestRun {
  id: string;
  name: string;
  suiteId: string;
  suiteName: string;
  suiteVersion: string;
  environment: TestEnvironment;
  priority: TestPriority;
  sprintId?: string;
  releaseId?: string;
  startTime: string;
  endTime?: string;
  status: TestRunStatus;
  executor: {
    id: string;
    name: string;
    email: string;
  };
  summary: {
    total: number;
    passed: number;
    failed: number;
    blocked: number;
    skipped: number;
    duration: number;
    coverage: number;
  };
  testCases: TestCaseResult[];
  metadata: {
    browser?: string;
    platform?: string;
    viewport?: string;
    tags?: string[];
    customFields?: Record<string, any>;
  };
  artifacts: {
    screenshots: string[];
    videos: string[];
    logs: string[];
    reports: string[];
  };
  notifications: {
    email?: string[];
    slack?: string[];
    teams?: string[];
  };
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface TestCaseResult {
  id: string;
  testCaseId: string;
  name: string;
  description: string;
  status: TestStatus;
  duration: number;
  startTime: string;
  endTime: string;
  steps: TestStepResult[];
  defects: TestDefect[];
  comments: TestComment[];
  artifacts: {
    screenshots: string[];
    videos: string[];
    logs: string;
    console: string;
  };
  metadata: {
    retries: number;
    priority: TestPriority;
    tags: string[];
    customFields?: Record<string, any>;
  };
}

export interface TestStepResult {
  id: string;
  description: string;
  status: TestStatus;
  duration: number;
  error?: {
    message: string;
    stack: string;
    type: string;
  };
  screenshot?: string;
  timestamp: string;
}

export interface TestDefect {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  assignee?: {
    id: string;
    name: string;
  };
  externalId?: string;
  externalUrl?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface TestComment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  mentions: string[]; // User IDs
  createdAt: string;
  updatedAt: string;
  parentId?: string; // For threaded comments
}

export interface TestRunFilter {
  suiteId?: string;
  environment?: TestEnvironment;
  status?: TestRunStatus;
  priority?: TestPriority;
  sprintId?: string;
  releaseId?: string;
  executor?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  tags?: string[];
}

export interface TestRunReport {
  id: string;
  runId: string;
  type: 'executive' | 'detailed' | 'coverage' | 'trend';
  format: 'pdf' | 'excel' | 'html';
  filters: TestRunFilter;
  data: any;
  generatedAt: string;
  recipients: string[];
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    time: string;
    timezone: string;
    lastSent?: string;
  };
}

export interface TestRunMetrics {
  passRate: number;
  failureRate: number;
  blockageRate: number;
  avgDuration: number;
  coverage: {
    total: number;
    byComponent: Array<{
      name: string;
      coverage: number;
    }>;
  };
  trends: {
    passRate: Array<{
      date: string;
      value: number;
    }>;
    duration: Array<{
      date: string;
      value: number;
    }>;
  };
  topFailures: Array<{
    testCaseId: string;
    name: string;
    failureCount: number;
    lastFailure: string;
  }>;
}
