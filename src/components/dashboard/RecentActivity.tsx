import { Box, Heading } from '@chakra-ui/react';
import { ActivityFeed } from '../activity/ActivityFeed';

export function RecentActivity() {
  return (
    <Box p={6} bg='gray.800' borderRadius='lg'>
      <Heading size='md' mb={4}>
        Recent Activity
      </Heading>
      <ActivityFeed />
    </Box>
  );
}
