import { useState, useEffect } from 'react';

interface TestMetrics {
  totalTests: number;
  totalTestsChange: number;
  passRate: number;
  passRateChange: number;
  failedTests: number;
  failedTestsChange: number;
  avgDuration: number;
  avgDurationChange: number;
}

const mockMetrics: TestMetrics = {
  totalTests: 2847,
  totalTestsChange: 12.5,
  passRate: 94.2,
  passRateChange: 2.3,
  failedTests: 165,
  failedTestsChange: -8.0,
  avgDuration: 2.3,
  avgDurationChange: -0.5,
};

export function useTestMetrics() {
  const [metrics, setMetrics] = useState<TestMetrics>(mockMetrics);

  // In a real app, fetch metrics from API
  useEffect(() => {
    // Simulated API call
    const fetchMetrics = async () => {
      // const response = await api.getTestMetrics();
      setMetrics(mockMetrics);
    };

    fetchMetrics();
  }, []);

  return metrics;
}
