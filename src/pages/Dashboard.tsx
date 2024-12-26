import { Grid, GridItem } from '@chakra-ui/react';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { TestMetrics } from '../components/dashboard/TestMetrics';
import { TestTrends } from '../components/dashboard/TestTrends';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { AIRecommendations } from '../components/dashboard/AIRecommendations';

export default function Dashboard() {
  return (
    <>
      <DashboardHeader />
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
        gap={6}
        mb={8}
      >
        <TestMetrics />
      </Grid>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }}
        gap={6}
      >
        <GridItem>
          <TestTrends />
        </GridItem>
        <GridItem>
          <RecentActivity />
        </GridItem>
        <GridItem colSpan={{ base: 1, lg: 2 }}>
          <AIRecommendations />
        </GridItem>
      </Grid>
    </>
  );
}