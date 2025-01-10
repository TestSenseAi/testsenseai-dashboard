import { SimpleGrid } from '@chakra-ui/react';
import { Activity, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { useTestMetrics } from '../../hooks/useTestMetrics';

export function TestMetrics() {
  const metrics = useTestMetrics();

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} data-testid='test-metrics-grid'>
      <MetricCard
        icon={Activity}
        label='Total Tests'
        value={metrics.totalTests}
        change={metrics.totalTestsChange}
        dataTestId='total-tests-metric'
      />
      <MetricCard
        icon={CheckCircle2}
        label='Pass Rate'
        value={metrics.passRate}
        change={metrics.passRateChange}
        format='percentage'
        dataTestId='pass-rate-metric'
      />
      <MetricCard
        icon={AlertCircle}
        label='Failed Tests'
        value={metrics.failedTests}
        change={metrics.failedTestsChange}
        changeDirection='inverse'
        dataTestId='failed-tests-metric'
      />
      <MetricCard
        icon={Clock}
        label='Avg Duration'
        value={metrics.avgDuration}
        change={metrics.avgDurationChange}
        format='duration'
        dataTestId='avg-duration-metric'
      />
    </SimpleGrid>
  );
}
