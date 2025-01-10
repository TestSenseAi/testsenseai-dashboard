import { useState, useEffect } from 'react';
import { subDays, format } from 'date-fns';

interface TrendData {
  id: string;
  data: Array<{
    x: string;
    y: number;
  }>;
}

export function useTestTrends() {
  const [timeRange, setTimeRange] = useState('7d');
  const [data, setData] = useState<TrendData[]>([]);

  useEffect(() => {
    // Generate mock data based on time range
    const days = parseInt(timeRange);
    const generateData = () => {
      const series = [
        { id: 'Total Tests', baseValue: 100, variance: 20 },
        { id: 'Passed', baseValue: 90, variance: 15 },
        { id: 'Failed', baseValue: 10, variance: 5 },
      ];

      return series.map(({ id, baseValue, variance }) => ({
        id,
        data: Array.from({ length: days }).map((_, i) => ({
          x: format(subDays(new Date(), days - i - 1), 'yyyy-MM-dd'),
          y: Math.max(0, baseValue + Math.random() * variance * 2 - variance),
        })),
      }));
    };

    setData(generateData());
  }, [timeRange]);

  return { data, timeRange, setTimeRange };
}