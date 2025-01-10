import { useState, useEffect } from 'react';
import { TestRun, TestRunFilter, TestRunMetrics } from '../types/testRun';

export function useTestRuns() {
  const [runs, setRuns] = useState<TestRun[]>([]);
  const [metrics, setMetrics] = useState<TestRunMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchRuns = async (filters?: TestRunFilter) => {
    setLoading(true);
    try {
      // In a real app, fetch from API with filters
      // const response = await api.getTestRuns(filters);
      // setRuns(response.data);

      // Mock data for now
      setRuns([
        // ... mock test runs
        {
          id: '1',
          name: 'Test Run 1',
          status: 'completed',
          summary: {
            total: 10,
            passed: 9,
            failed: 1,
            blocked: 0,
            skipped: 0,
            duration: 100,
            coverage: 90,
          },
          suiteId: '1',
          suiteName: 'Test Suite 1',
          suiteVersion: '1.0.0',
          environment: 'staging',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          priority: 'medium',
          startTime: new Date().toISOString(),
          executor: {
            id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
          },
          testCases: [],
          metadata: {},
          artifacts: {
            screenshots: [],
            videos: [],
            logs: [],
            reports: [],
          },
          notifications: {},
          version: 1,
        },
      ]);
    } catch (error) {
      setError(error instanceof Error ? error : new Error('Failed to fetch test runs'));
    } finally {
      setLoading(false);
    }
  };

  const fetchMetrics = async () => {
    try {
      // In a real app, fetch from API
      // const response = await api.getTestRunMetrics();
      // setMetrics(response.data);

      // Mock metrics for now
      setMetrics({
        passRate: 92.5,
        failureRate: 5.5,
        blockageRate: 2.0,
        avgDuration: 45.2,
        coverage: {
          total: 85.5,
          byComponent: [
            { name: 'Frontend', coverage: 88.2 },
            { name: 'Backend', coverage: 82.8 },
          ],
        },
        trends: {
          passRate: Array.from({ length: 30 }, (_, i) => ({
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
            value: 85 + Math.random() * 10,
          })),
          duration: Array.from({ length: 30 }, (_, i) => ({
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
            value: 40 + Math.random() * 10,
          })),
        },
        topFailures: [
          {
            testCaseId: '1',
            name: 'User Authentication',
            failureCount: 5,
            lastFailure: new Date().toISOString(),
          },
          // ... more failures
        ],
      });
    } catch (error) {
      console.error('Failed to fetch metrics:', error);
    }
  };

  const scheduleRun = async (config: any) => {
    try {
      // In a real app, call API to schedule run
      // await api.scheduleTestRun(config);
      return true;
    } catch (error) {
      throw error;
    }
  };

  const stopRun = async (runId: string) => {
    try {
      // In a real app, call API to stop run
      // await api.stopTestRun(runId);
      setRuns((prev) =>
        prev.map((run) => (run.id === runId ? { ...run, status: 'aborted' as const } : run))
      );
      return true;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchRuns();
    fetchMetrics();
  }, []);

  return {
    runs,
    metrics,
    loading,
    error,
    fetchRuns,
    fetchMetrics,
    scheduleRun,
    stopRun,
  };
}
