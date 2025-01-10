import { Container, Grid, Button, GridItem, Text, Flex } from '@chakra-ui/react';
import { Activity, Bug, CheckCircle, Clock } from 'lucide-react';
import { StatCard } from './StatCard';
import { RecentTestRuns } from './RecentTestRuns';
import { AIInsights } from './AIInsights';
import { DashboardStat } from './types';
import { FC } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const stats: DashboardStat[] = [
  {
    icon: Activity,
    label: 'Total Tests',
    value: '2,847',
    subValue: '+12%',
    trend: 'up',
    color: 'blue',
  },
  {
    icon: CheckCircle,
    label: 'Pass Rate',
    value: '94.2%',
    subValue: '+2.3%',
    trend: 'up',
    color: 'green',
  },
  { icon: Bug, label: 'Failed Tests', value: '165', subValue: '-8%', trend: 'down', color: 'red' },
  {
    icon: Clock,
    label: 'Avg Duration',
    value: '2.3s',
    subValue: '-0.5s',
    trend: 'down',
    color: 'red',
  },
];

export const Dashboard: FC = () => {
  const { user, isAuthenticated } = useAuthContext();

  if (!user || !isAuthenticated) {
    return <Navigate to='/login' />;
  }

  return (
    <Container maxW='100%' data-testid='dashboard-container'>
      <Flex justify='space-between' mb='lg'>
        <Text fontSize='2xl' fontWeight='bold'>
          Dashboard
        </Text>
        <Button variant='filled' color='blue'>
          New Test Run
        </Button>
      </Flex>

      <Grid templateColumns='repeat(4, 1fr)' gap={6} mb={8} data-testid='stats-grid'>
        {stats.map((stat) => (
          <GridItem key={stat.label} w='100%'>
            <StatCard {...stat} />
          </GridItem>
        ))}
      </Grid>

      <Grid mt='lg'>
        <GridItem colSpan={{ base: 12, lg: 6 }}>
          <RecentTestRuns />
        </GridItem>
        <GridItem colSpan={{ base: 12, lg: 6 }}>
          <AIInsights />
        </GridItem>
      </Grid>
    </Container>
  );
};
