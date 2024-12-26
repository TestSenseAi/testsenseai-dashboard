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
  { icon: Activity, label: 'Total Tests', value: '2,847', change: '+12%' },
  { icon: CheckCircle, label: 'Pass Rate', value: '94.2%', change: '+2.3%' },
  { icon: Bug, label: 'Failed Tests', value: '165', change: '-8%' },
  { icon: Clock, label: 'Avg Duration', value: '2.3s', change: '-0.5s' },
];

export const Dashboard: FC = () => {
  const { user, isAuthenticated } = useAuthContext();

  if (!user || !isAuthenticated) {
    return <Navigate to='/login' />;
  }

  return (
    <Container size='xl' px='md'>
      <Flex justify='space-between' mb='lg'>
        <Text fontSize='2xl' fontWeight='bold'>
          Dashboard
        </Text>
        <Button variant='filled' color='blue'>
          New Test Run
        </Button>
      </Flex>

      <Grid>
        {stats.map((stat) => (
          <GridItem key={stat.label} colSpan={{ base: 12, md: 6, lg: 3 }}>
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
