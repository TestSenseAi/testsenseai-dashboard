import { VStack, Heading, HStack } from '@chakra-ui/react';
import { useActivityFeed } from '../../hooks/useActivityFeed';
import { ActivityItem } from './ActivityItem';
import { ActivityFilter } from './ActivityFilter';

export function ActivityFeed() {
  const { activities, filter, setFilter } = useActivityFeed();

  return (
    <VStack align='stretch' spacing={4}>
      <HStack justify='space-between'>
        <Heading size='md'>Recent Activity</Heading>
        <ActivityFilter value={filter} onChange={setFilter} />
      </HStack>

      <VStack align='stretch' spacing={2}>
        {activities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </VStack>
    </VStack>
  );
}
