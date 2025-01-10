import { SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, StatArrow } from '@chakra-ui/react';
import { CoverageMetricsData } from '../../../types/analytics';

interface CoverageMetricsProps {
  data: CoverageMetricsData;
}

export function CoverageMetrics({ data }: CoverageMetricsProps) {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
      <Stat>
        <StatLabel>Total Coverage</StatLabel>
        <StatNumber>{data.total.toFixed(1)}%</StatNumber>
        <StatHelpText>
          <StatArrow type={data.trend >= 0 ? 'increase' : 'decrease'} />
          {Math.abs(data.trend).toFixed(1)}%
        </StatHelpText>
      </Stat>
      <Stat>
        <StatLabel>UI Tests</StatLabel>
        <StatNumber>{data.ui.toFixed(1)}%</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>API Tests</StatLabel>
        <StatNumber>{data.api.toFixed(1)}%</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>E2E Tests</StatLabel>
        <StatNumber>{data.e2e.toFixed(1)}%</StatNumber>
      </Stat>
    </SimpleGrid>
  );
}
