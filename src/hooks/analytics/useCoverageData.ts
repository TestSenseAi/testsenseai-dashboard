import { useState, useEffect } from 'react';
import { mockCoverageData } from '../../mocks/analytics';
import { CoverageChartData, CoverageMetricsData, DateRange } from '../../types/analytics';

export function useCoverageData(dateRange: DateRange) {
  const [metrics, setMetrics] = useState<CoverageMetricsData | null>(null);
  const [chartData, setChartData] = useState<CoverageChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        setLoading(true);
        // In a real implementation, this would be an API call
        setChartData(mockCoverageData);
        setMetrics({
          total: 85.5,
          trend: 2.3,
          ui: 82.1,
          api: 89.4,
          e2e: 78.9,
        });
      } catch (error) {
        console.error('Error fetching coverage data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dateRange]);

  return {
    metrics,
    chartData,
    loading,
  };
}
