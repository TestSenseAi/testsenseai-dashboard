export type TestStatus = 'pending' | 'running' | 'passed' | 'failed';
export type TestType = 'ui' | 'visual' | 'accessibility' | 'api';

export interface TestCase {
  id: string;
  name: string;
  description: string;
  type: TestType;
  status: TestStatus;
  component?: string;
  steps: TestStep[];
  assertions: TestAssertion[];
  metadata: {
    author: string;
    created: string;
    modified: string;
    source: 'manual' | 'ai-generated';
    figmaComponentId?: string;
  };
}

export interface TestStep {
  id: string;
  action: string;
  target?: string;
  value?: string;
  screenshot?: boolean;
}

export interface TestAssertion {
  id: string;
  type: 'element' | 'state' | 'visual' | 'accessibility';
  condition: string;
  expected: unknown;
}

export interface TestRun {
  id: string;
  status: TestStatus;
  startTime: string;
  endTime?: string;
  duration?: number;
  tests: TestResult[];
}

export interface TestResult {
  testId: string;
  status: TestStatus;
  duration: number;
  error?: {
    message: string;
    stack?: string;
    screenshot?: string;
  };
}