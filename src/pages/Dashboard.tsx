import { Grid, GridItem, Container, Button, HStack } from '@chakra-ui/react';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { TestMetrics } from '../components/dashboard/TestMetrics';
import { TestTrends } from '../components/dashboard/TestTrends';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { AIInsights } from '../components/dashboard/AIInsights';
import { Download } from 'lucide-react';

export default function Dashboard() {
  const handleExportReport = () => {
    console.log('Exporting report...');
  };

  return (
    <Container maxW='container.xl' py={8}>
      <HStack justify='space-between' mb={8}>
        <DashboardHeader />
        <Button leftIcon={<Download size={20} />} variant='outline' onClick={handleExportReport}>
          Export Report
        </Button>
      </HStack>

      <TestMetrics />

      <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }} gap={6} mt={8}>
        <GridItem>
          <TestTrends />
        </GridItem>
        <GridItem>
          <RecentActivity />
        </GridItem>
        <GridItem colSpan={{ base: 1, lg: 2 }}>
          <AIInsights />
        </GridItem>
      </Grid>
    </Container>
  );
}
