import { Box, HStack, Text, Icon, Badge, Button, VStack } from '@chakra-ui/react';
import {
  Play,
  CheckCircle,
  XCircle,
  RefreshCw,
  FileText,
  GitBranch,
  AlertTriangle,
  Rocket,
  Shield,
  TrendingDown,
} from 'lucide-react';
import { useState } from 'react';
import { Activity, ActivityType } from './types';
import { formatDistanceToNow } from 'date-fns';
import { ActivityDetails } from './ActivityDetails';

const activityIcons: Record<ActivityType, any> = {
  'test-started': Play,
  'test-passed': CheckCircle,
  'test-failed': XCircle,
  'test-rerun': RefreshCw,
  'case-created': FileText,
  'case-updated': FileText,
  'case-deleted': FileText,
  'branch-merged': GitBranch,
  'deployment-started': Rocket,
  'deployment-completed': Rocket,
  'alert-triggered': AlertTriangle,
  'coverage-changed': Shield,
  'performance-degraded': TrendingDown,
  'security-scan-completed': Shield,
};

const activityColors: Record<ActivityType, string> = {
  'test-started': 'blue',
  'test-passed': 'green',
  'test-failed': 'red',
  'test-rerun': 'purple',
  'case-created': 'teal',
  'case-updated': 'teal',
  'case-deleted': 'red',
  'branch-merged': 'orange',
  'deployment-started': 'cyan',
  'deployment-completed': 'cyan',
  'alert-triggered': 'red',
  'coverage-changed': 'yellow',
  'performance-degraded': 'orange',
  'security-scan-completed': 'purple',
};

interface ActivityItemProps {
  activity: Activity;
}

export function ActivityItem({ activity }: ActivityItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const IconComponent = activityIcons[activity.type];
  const color = activityColors[activity.type];

  const hasDetails =
    activity.metadata &&
    (activity.metadata.duration ||
      activity.metadata.coverageChange ||
      activity.metadata.securityFindings ||
      activity.metadata.performanceMetrics);

  return (
    <Box
      p={3}
      borderRadius='md'
      bg='gray.700'
      _hover={{ bg: 'gray.600' }}
      transition='background 0.2s'>
      <HStack spacing={3} align='flex-start'>
        <Icon as={IconComponent} color={`${color}.400`} boxSize={5} mt={1} />
        <Box flex={1}>
          <Text>{activity.description}</Text>
          <Text fontSize='sm' color='gray.400'>
            {formatDistanceToNow(new Date(activity.timestamp))} ago
          </Text>
          {isExpanded && <ActivityDetails activity={activity} />}
        </Box>
        <VStack align='flex-end' spacing={2}>
          <Badge colorScheme={color}>{activity.environment}</Badge>
          {hasDetails && (
            <Button size='xs' variant='ghost' onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? 'Less' : 'More'}
            </Button>
          )}
        </VStack>
      </HStack>
    </Box>
  );
}
