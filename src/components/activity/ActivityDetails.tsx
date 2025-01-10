import { Box, VStack, Text, Table, Thead, Tbody, Tr, Th, Td, Badge } from '@chakra-ui/react';
import { Activity } from './types';
import { formatDuration } from '../../utils/format';

interface ActivityDetailsProps {
  activity: Activity;
}

export function ActivityDetails({ activity }: ActivityDetailsProps) {
  if (!activity.metadata) return null;

  return (
    <Box mt={3} pt={3} borderTopWidth={1} borderColor="gray.600">
      <VStack align="stretch" spacing={3}>
        {activity.metadata.duration && (
          <Text>Duration: {formatDuration(activity.metadata.duration)}</Text>
        )}

        {activity.metadata.coverageChange && (
          <Text>
            Coverage Change: 
            <Badge ml={2} colorScheme={activity.metadata.coverageChange > 0 ? 'green' : 'red'}>
              {activity.metadata.coverageChange > 0 ? '+' : ''}{activity.metadata.coverageChange}%
            </Badge>
          </Text>
        )}

        {activity.metadata.securityFindings && (
          <Table size="sm" variant="simple">
            <Thead>
              <Tr>
                <Th>Severity</Th>
                <Th isNumeric>Count</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Object.entries(activity.metadata.securityFindings).map(([severity, count]) => (
                <Tr key={severity}>
                  <Td>{severity}</Td>
                  <Td isNumeric>{count}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}

        {activity.metadata.performanceMetrics && (
          <VStack align="stretch" spacing={1}>
            <Text fontWeight="medium">Performance Change</Text>
            <Text>Before: {activity.metadata.performanceMetrics.before}ms</Text>
            <Text>After: {activity.metadata.performanceMetrics.after}ms</Text>
            <Text>Threshold: {activity.metadata.performanceMetrics.threshold}ms</Text>
          </VStack>
        )}
      </VStack>
    </Box>
  );
}