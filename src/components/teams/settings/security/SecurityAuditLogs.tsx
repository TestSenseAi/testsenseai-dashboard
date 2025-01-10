import { Box, VStack, Text, Icon, Badge, HStack } from '@chakra-ui/react';
import { Shield, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useSecurityAudit } from '../../../../hooks/useSecurityAudit';

export function SecurityAuditLog() {
  const { auditLogs } = useSecurityAudit();

  return (
    <VStack spacing={3} align='stretch'>
      {auditLogs.map((log) => (
        <Box key={log.id} p={3} bg='gray.700' borderRadius='md'>
          <HStack spacing={3}>
            <Icon
              as={log.severity === 'high' ? AlertTriangle : Shield}
              color={log.severity === 'high' ? 'red.400' : 'green.400'}
            />
            <Box flex={1}>
              <Text>{log.description}</Text>
              <Text fontSize='sm' color='gray.400'>
                {formatDistanceToNow(new Date(log.timestamp))} ago
              </Text>
            </Box>
            <Badge colorScheme={log.severity === 'high' ? 'red' : 'green'}>{log.severity}</Badge>
          </HStack>
        </Box>
      ))}
    </VStack>
  );
}
