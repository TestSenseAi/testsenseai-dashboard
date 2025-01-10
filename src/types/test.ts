export type TestStatus = 'pending' | 'running' | 'passed' | 'failed';
export type TestType = 'ui' | 'api' | 'visual' | 'accessibility';

export interface TestResult {
  id: string;
  status: TestStatus;
  duration: number;
  startTime: string;
  endTime?: string;
  assertions: {
    total: number;
    passed: number;
    failed: number;
  };
  screenshots?: string[];
  logs?: string;
  stepResults: Record<
    string,
    {
      passed: boolean;
      duration: number;
      error?: string;
      screenshot?: string;
    }
  >;
}

export interface TestStep {
  id: string;
  action: string;
  target?: string;
  value?: string;
  screenshot?: boolean;
}

export interface TestCase {
  id: string;
  name: string;
  description: string;
  type: TestType;
  steps: TestStep[];
  assertions: Array<{
    id: string;
    type: 'element' | 'state' | 'visual' | 'accessibility';
    condition: string;
    expected: unknown;
  }>;
  metadata: {
    author: string;
    created: string;
    modified: string;
    source: 'manual' | 'ai-generated';
    lastRun?: string;
    lastStatus?: 'passed' | 'failed' | 'pending';
  };
}
