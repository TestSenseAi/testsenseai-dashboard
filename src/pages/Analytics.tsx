import { Container, SimpleGrid, VStack } from '@chakra-ui/react';
import { CoverageOverview } from '../components/analytics/CoverageOverview';
import { CoverageTrend } from '../components/analytics/CoverageTrend';
import { RiskAnalysis } from '../components/analytics/RiskAnalysis';
import { useAnalytics } from '../hooks/useAnalytics';
import { PageHeader } from '../components/common/PageHeader';

export default function Analytics() {
  const { coverage, risk } = useAnalytics();

  return (
    <Container maxW='container.xl' py={8}>
      <VStack spacing={8} align='stretch'>
        <PageHeader
          title='Test Analytics'
          description='Analyze test coverage, performance, and risk factors'
        />

        <CoverageOverview data={coverage} />

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
          <CoverageTrend data={coverage} />
          <RiskAnalysis data={risk} />
        </SimpleGrid>
      </VStack>
    </Container>
  );
}
