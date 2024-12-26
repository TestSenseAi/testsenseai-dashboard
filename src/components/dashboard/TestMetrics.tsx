import { SimpleGrid } from '@chakra-ui/react';
import { Activity, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { useTestMetrics } from '../../hooks/useTestMetrics';

export function TestMetrics() {
  const metrics = useTestMetrics();

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
      <MetricCard
        icon={Activity}
        label="Total Tests"
        value={metrics.totalTests}
        change={metrics.totalTestsChange}
      />
      <MetricCard
        icon={CheckCircle2}
        label="Pass Rate"
        value={metrics.passRate}
        change={metrics.passRateChange}
        format="percentage"
      />
      <MetricCard
        icon={AlertCircle}
        label="Failed Tests"
        value={metrics.failedTests}
        change={metrics.failedTestsChange}
        changeDirection="inverse"
      />
      <MetricCard
        icon={Clock}
        label="Avg Duration"
        value={metrics.avgDuration}
        change={metrics.avgDurationChange}
        format="duration"
      />
    </SimpleGrid>
  );
}