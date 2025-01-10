export interface TestVersion {
  id: string;
  version: number;
  changes: string;
  author: string;
  timestamp: string;
  steps: string[];
}

export interface TestSuite {
  id: string;
  name: string;
  description: string;
  parentId?: string;
  testCases: string[];
  dependencies?: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  metadata: {
    owner: string;
    priority: 'high' | 'medium' | 'low';
    estimatedDuration: number;
  };
}

export interface TestProfile {
  id: string;
  name: string;
  type: 'regression' | 'smoke' | 'sanity' | 'performance';
  description: string;
  configuration: {
    parallelization: boolean;
    retries: number;
    timeout: number;
    environment: string;
    browsers?: string[];
  };
  testSuites: string[];
  criteria: {
    coverage: number;
    maxDuration: number;
    successRate: number;
  };
}

export interface AIRecommendation {
  type: 'organization' | 'dependency' | 'redundancy' | 'priority';
  description: string;
  impact: 'high' | 'medium' | 'low';
  suggestions: Array<{
    action: string;
    reason: string;
    affectedTests: string[];
  }>;
}

export interface TestHistory {
  testId: string;
  versions: TestVersion[];
  executionHistory: Array<{
    timestamp: string;
    duration: number;
    status: 'passed' | 'failed';
    environment: string;
    profile: string;
  }>;
  metrics: {
    reliability: number;
    avgDuration: number;
    failureRate: number;
    lastPassed: string;
  };
}
