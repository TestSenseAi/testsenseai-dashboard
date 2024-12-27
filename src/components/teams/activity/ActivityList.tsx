import { VStack, HStack, Text, Icon, Box } from '@chakra-ui/react';
import { UserPlus, UserMinus, Settings, Shield } from 'lucide-react';
import { TeamActivity } from '../../../types/team';
import { formatDistanceToNow } from 'date-fns';

const activityIcons = {
  'member-invited': UserPlus,
  'member-removed': UserMinus,
  'role-updated': Shield,
  'settings-updated': Settings,
};

interface ActivityListProps {
  activities: TeamActivity[];
}

export function ActivityList({ activities }: ActivityListProps) {
  return (
    <VStack spacing={3} align='stretch'>
      {activities.map((activity) => (
        <Box key={activity.id} p={3} borderRadius='md' bg='gray.700' _hover={{ bg: 'gray.600' }}>
          <HStack spacing={3}>
            <Icon as={activityIcons[activity.type]} color='brand.400' boxSize={5} />
            <Box flex={1}>
              <Text>{activity.description}</Text>
              <Text fontSize='sm' color='gray.400'>
                {formatDistanceToNow(new Date(activity.timestamp))} ago by {activity.performedBy}
              </Text>
            </Box>
          </HStack>
        </Box>
      ))}
    </VStack>
  );
}
