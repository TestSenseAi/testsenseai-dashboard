import React from 'react';
import {
  Container,
  Grid,
  Flex,
  Text,
  Button,
  GridItem,
  Box,
  HStack,
  SimpleGrid,
} from '@chakra-ui/react';
import { Activity, Bug, CheckCircle, Clock, Download, Plus } from 'lucide-react';
import { StatCard, StatCardProps } from './dashboard/StatCard';
import { RecentTestRuns } from './dashboard/RecentTestRuns';
import { AIInsights } from './dashboard/AIInsights';
import { TestExecutionTrends } from './dashboard/TestExecutionTrends';
import { CoverageChartData } from '../types/analytics';

// Mock data for the test execution trends
const trendData: CoverageChartData[] = [
  { date: '2024-01-01', percentage: 85 },
  { date: '2024-01-02', percentage: 87 },
  { date: '2024-01-03', percentage: 90 },
  { date: '2024-01-04', percentage: 88 },
  { date: '2024-01-05', percentage: 92 },
  { date: '2024-01-06', percentage: 94 },
  { date: '2024-01-07', percentage: 95 },
];

const stats: StatCardProps[] = [
  {
    icon: Activity,
    label: 'Total Tests',
    value: '2,847',
    subValue: '+12%',
    trend: 'up',
    color: 'blue.400',
  },
  {
    icon: CheckCircle,
    label: 'Pass Rate',
    value: '94.2%',
    subValue: '+2.3%',
    trend: 'up',
    color: 'green.400',
  },
  {
    icon: Bug,
    label: 'Failed Tests',
    value: '165',
    subValue: '-8%',
    trend: 'down',
    color: 'red.400',
  },
  {
    icon: Clock,
    label: 'Avg Duration',
    value: '2.3s',
    subValue: '-0.5s',
    trend: 'down',
    color: 'purple.400',
  },
];

const Dashboard: React.FC = () => {
  return (
    <Box bg='gray.900' minH='100vh' data-testid='dashboard-container'>
      <Container maxW='container.xl' py={6} px={8}>
        <Flex justify='space-between' align='center' mb={8} data-testid='dashboard-header'>
          <Text fontSize='2xl' fontWeight='bold' color='white'>
            Dashboard
          </Text>
          <HStack spacing={4}>
            <Button
              data-testid='export-report-button'
              variant='outline'
              leftIcon={<Download size={18} />}
              color='gray.300'
              borderColor='gray.600'
              _hover={{ bg: 'gray.700' }}>
              Export Report
            </Button>
            <Button
              data-testid='new-test-run-button'
              colorScheme='blue'
              leftIcon={<Plus size={18} />}>
              New Test Run
            </Button>
          </HStack>
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4} mb={8} data-testid='stats-grid'>
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </SimpleGrid>

        <Grid
          templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
          gap={6}
          data-testid='dashboard-content-grid'>
          <GridItem data-testid='test-execution-trends-container'>
            <TestExecutionTrends data={trendData} />
          </GridItem>
          <GridItem data-testid='recent-test-runs-container'>
            <RecentTestRuns />
          </GridItem>
          <GridItem colSpan={{ base: 1, lg: 2 }} data-testid='ai-insights-container'>
            <AIInsights />
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
