export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
}

export interface TestCase {
  id: string;
  name: string;
  description: string;
  type: 'ui' | 'api' | 'visual' | 'accessibility';
  status: 'passed' | 'failed' | 'pending';
  duration: number;
  createdAt: string;
}

export interface TestReport {
  id: string;
  totalTests: number;
  passed: number;
  failed: number;
  duration: number;
  coverage: number;
  timestamp: string;
}