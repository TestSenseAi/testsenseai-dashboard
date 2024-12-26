import React from 'react';
import { Container, Grid, Flex, Text, Button, GridItem } from '@chakra-ui/react';
import { Activity, Bug, CheckCircle, Clock } from 'lucide-react';
import { StatCard } from './dashboard/StatCard';
import { RecentTestRuns } from './dashboard/RecentTestRuns';
import { AIInsights } from './dashboard/AIInsights';

const stats = [
  { icon: Activity, label: 'Total Tests', value: '2,847', change: '+12%' },
  { icon: CheckCircle, label: 'Pass Rate', value: '94.2%', change: '+2.3%' },
  { icon: Bug, label: 'Failed Tests', value: '165', change: '-8%' },
  { icon: Clock, label: 'Avg Duration', value: '2.3s', change: '-0.5s' },
];

const Dashboard: React.FC = () => {
  return (
    <Container size='xl' px='md'>
      <Flex justify='space-between' mb='lg'>
        <Text fontSize='2xl' fontWeight={600}>
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

export default Dashboard;
