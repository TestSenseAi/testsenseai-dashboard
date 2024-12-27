import { VStack, Card, CardHeader, CardBody, Heading } from '@chakra-ui/react';
import { ActivityList } from './ActivityList';
import { ActivityFilter } from './ActivityFilter';
import { useTeamActivity } from '../../../hooks/useTeamActivity';

export function TeamActivity() {
  const { activities, filter, setFilter } = useTeamActivity();

  return (
    <Card bg='gray.800'>
      <CardHeader>
        <Heading size='md'>Team Activity</Heading>
      </CardHeader>
      <CardBody>
        <VStack spacing={4} align='stretch'>
          <ActivityFilter value={filter} onChange={setFilter} />
          <ActivityList activities={activities} />
        </VStack>
      </CardBody>
    </Card>
  );
}
