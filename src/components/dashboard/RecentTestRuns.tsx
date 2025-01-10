import { Box, Stack, Text, Badge, Flex } from '@chakra-ui/react';
import { TestRun } from './types';

const recentRuns: TestRun[] = Array(5)
  .fill(null)
  .map((_, i) => ({
    id: 2847 - i,
    status: i % 4 ? 'passed' : 'failed',
    time: '2 minutes ago',
  }));

export function RecentTestRuns() {
  return (
    <Box shadow='xs' p='md' borderRadius='md'>
      <Text fontWeight={600} fontSize='lg' mb='md'>
        Recent Test Runs
      </Text>
      <Stack gap='sm'>
        {recentRuns.map((run) => (
          <Flex
            key={run.id}
            justifyContent='space-between'
            pb='xs'
            borderBottom='1px solid var(--chakra-colors-gray-200)'>
            <Stack gap={2}>
              <Text fontWeight={500}>Test Run #{run.id}</Text>
              <Text fontSize='sm' color='gray.500'>
                {run.time}
              </Text>
            </Stack>
            <Badge colorScheme={run.status === 'passed' ? 'green' : 'red'} variant='subtle'>
              {run.status === 'passed' ? 'Passed' : 'Failed'}
            </Badge>
          </Flex>
        ))}
      </Stack>
    </Box>
  );
}
