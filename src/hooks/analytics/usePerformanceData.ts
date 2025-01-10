import { useState, useEffect } from 'react';
import { mockPerformanceData } from '../../mocks/analytics';
import { DateRange } from '../../types/analytics';

interface PerformanceMetric {
  date: string;
  value: number;
}

interface PerformanceData {
  loadTime: PerformanceMetric[];
  errorRate: PerformanceMetric[];
  throughput: PerformanceMetric[];
}

export function usePerformanceData(dateRange: DateRange) {
  const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        setLoading(true);
        // In a real implementation, this would be an API call
        setPerformanceData(mockPerformanceData);
      } catch (error) {
        console.error('Error fetching performance data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dateRange]);

  return {
    performanceData,
    loading,
    metrics: {
      avgLoadTime: performanceData?.loadTime[performanceData.loadTime.length - 1].value || 0,
      avgErrorRate: performanceData?.errorRate[performanceData.errorRate.length - 1].value || 0,
      avgThroughput: performanceData?.throughput[performanceData.throughput.length - 1].value || 0,
    },
  };
}
