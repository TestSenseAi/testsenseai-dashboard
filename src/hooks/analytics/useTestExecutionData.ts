import { useState, useEffect } from 'react';
import {
  mockTestExecutionData,
  mockRecentTestResults,
  mockTestMetrics,
} from '../../mocks/analytics';
import { TestResult, TestMetrics, DateRange } from '../../types/analytics';

interface TestExecutionData {
  date: string;
  duration: number;
  count: number;
}

export function useTestExecutionData(dateRange: DateRange) {
  const [executionData, setExecutionData] = useState<TestExecutionData[]>([]);
  const [recentResults, setRecentResults] = useState<TestResult[]>([]);
  const [metrics, setMetrics] = useState<TestMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        setLoading(true);
        // In a real implementation, these would be API calls
        setExecutionData(mockTestExecutionData);
        setRecentResults(mockRecentTestResults);
        setMetrics(mockTestMetrics);
      } catch (error) {
        console.error('Error fetching test execution data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dateRange]);

  return {
    executionData,
    recentResults,
    metrics,
    loading,
  };
}
