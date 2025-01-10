import { Box, VStack, Text, HStack, Badge, Select, Icon } from '@chakra-ui/react';
import { Shield, AlertTriangle, Activity, Clock } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'security' | 'performance' | 'test';
  title: string;
  timestamp: string;
  environment: 'production' | 'staging' | 'development';
}

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'security',
    title: 'Security scan completed for main branch',
    timestamp: '5 minutes ago',
    environment: 'production',
  },
  {
    id: '2',
    type: 'performance',
    title: 'Performance degradation detected in checkout flow',
    timestamp: '15 minutes ago',
    environment: 'staging',
  },
  {
    id: '3',
    type: 'test',
    title: 'All tests passed for release v2.1.0',
    timestamp: '1 hour ago',
    environment: 'staging',
  },
  {
    id: '4',
    type: 'security',
    title: 'Vulnerability scan completed',
    timestamp: '2 hours ago',
    environment: 'development',
  },
  {
    id: '5',
    type: 'test',
    title: 'Integration tests completed',
    timestamp: '3 hours ago',
    environment: 'development',
  },
];

export function RecentActivity() {
  return (
    <Box bg='gray.800' borderRadius='lg' p={6}>
      <HStack justify='space-between' mb={6}>
        <HStack spacing={2}>
          <Icon as={Clock} />
          <Text fontSize='lg' fontWeight='semibold'>
            Recent Activity
          </Text>
        </HStack>
        <Select maxW='150px' size='sm' defaultValue='all'>
          <option value='all'>All Activity</option>
          <option value='security'>Security</option>
          <option value='performance'>Performance</option>
          <option value='test'>Tests</option>
        </Select>
      </HStack>

      <VStack spacing={4} align='stretch'>
        {mockActivities.map((activity) => (
          <HStack
            key={activity.id}
            p={3}
            bg='gray.700'
            borderRadius='md'
            spacing={3}
            _hover={{ bg: 'gray.600' }}
            cursor='pointer'>
            <Icon
              as={
                activity.type === 'security'
                  ? Shield
                  : activity.type === 'performance'
                  ? AlertTriangle
                  : Activity
              }
              color={
                activity.type === 'security'
                  ? 'blue.400'
                  : activity.type === 'performance'
                  ? 'yellow.400'
                  : 'green.400'
              }
            />
            <VStack align='start' spacing={1} flex={1}>
              <Text fontSize='sm'>{activity.title}</Text>
              <Text fontSize='xs' color='gray.400'>
                {activity.timestamp}
              </Text>
            </VStack>
            <Badge
              colorScheme={
                activity.environment === 'production'
                  ? 'purple'
                  : activity.environment === 'staging'
                  ? 'orange'
                  : 'gray'
              }
              textTransform='uppercase'
              fontSize='xs'>
              {activity.environment}
            </Badge>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
}
