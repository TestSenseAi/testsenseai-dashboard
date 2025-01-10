import { Box, Button, VStack, Text, HStack, Icon, Badge } from '@chakra-ui/react';
import { AlertTriangle, Lightbulb, Activity, RefreshCw } from 'lucide-react';

interface Insight {
  id: string;
  type: 'performance' | 'coverage' | 'maintenance';
  title: string;
  description: string;
  badge: string;
}

const mockInsights: Insight[] = [
  {
    id: '1',
    type: 'performance',
    title: 'Test Duration Anomaly Detected',
    description:
      'Login flow tests are taking 23% longer than usual. AI analysis suggests potential API latency issues in the authentication service.',
    badge: 'Performance',
  },
  {
    id: '2',
    type: 'coverage',
    title: 'Coverage Gap Identified',
    description:
      'New user registration flow is missing edge case coverage for email validation. Adding 3 suggested test cases would improve coverage by 8%.',
    badge: 'Coverage',
  },
  {
    id: '3',
    type: 'maintenance',
    title: 'Test Maintenance Required',
    description:
      'Recent UI changes affected 12 test selectors. AI can automatically update these selectors to match the new structure.',
    badge: 'Maintenance',
  },
];

export function AIInsights() {
  return (
    <Box bg='gray.800' borderRadius='lg' p={6}>
      <HStack justify='space-between' mb={6}>
        <HStack spacing={2}>
          <Icon as={Lightbulb} />
          <Text fontSize='lg' fontWeight='semibold'>
            AI Insights & Recommendations
          </Text>
        </HStack>
        <Button
          size='sm'
          leftIcon={<RefreshCw size={16} />}
          onClick={() => console.log('Analyzing new data...')}>
          Analyze New Data
        </Button>
      </HStack>

      <VStack spacing={4} align='stretch'>
        {mockInsights.map((insight) => (
          <Box
            key={insight.id}
            p={4}
            bg='gray.700'
            borderRadius='md'
            borderLeft='4px solid'
            borderLeftColor={
              insight.type === 'performance'
                ? 'yellow.400'
                : insight.type === 'coverage'
                ? 'green.400'
                : 'orange.400'
            }>
            <HStack spacing={3} mb={2}>
              <Icon
                as={
                  insight.type === 'performance'
                    ? AlertTriangle
                    : insight.type === 'coverage'
                    ? Activity
                    : Lightbulb
                }
                color={
                  insight.type === 'performance'
                    ? 'yellow.400'
                    : insight.type === 'coverage'
                    ? 'green.400'
                    : 'orange.400'
                }
              />
              <Text fontWeight='medium'>{insight.title}</Text>
              <Badge
                variant='subtle'
                colorScheme={
                  insight.type === 'performance'
                    ? 'yellow'
                    : insight.type === 'coverage'
                    ? 'green'
                    : 'orange'
                }>
                {insight.badge}
              </Badge>
            </HStack>
            <Text color='gray.400' ml={7}>
              {insight.description}
            </Text>
            <HStack mt={3} ml={7}>
              <Button size='sm' variant='link'>
                View Detailed Analysis
              </Button>
              {insight.type === 'coverage' && (
                <Button size='sm' variant='link'>
                  Generate Test Cases
                </Button>
              )}
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
