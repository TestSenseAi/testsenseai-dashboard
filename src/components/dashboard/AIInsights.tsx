import { Box, Stack, Text, Alert, AlertIcon } from '@chakra-ui/react';
import { AlertCircle } from 'lucide-react';
import { Insight } from './types';

const insights: Insight[] = [
  {
    title: 'Pattern Detected',
    description:
      'Test failures increase by 23% during deployment windows. Consider adjusting test timing or infrastructure scaling.',
  },
  {
    title: 'Coverage Gap',
    description:
      'Coverage gap identified in error handling scenarios. Recommended: Add 12 new edge cases to improve robustness.',
  },
];

export function AIInsights() {
  return (
    <Box shadow='xs' p='md' borderRadius='md'>
      <Text fontWeight={600} fontSize='lg' mb='md'>
        AI Insights
      </Text>
      <Stack spacing='md'>
        {insights.map((insight, index) => (
          <Alert key={index} variant='left-accent' colorScheme='blue'>
            <AlertIcon as={AlertCircle} boxSize={4} />
            <Box flex='1'>
              <Text fontWeight='bold'>{insight.title}</Text>
              <Text>{insight.description}</Text>
            </Box>
          </Alert>
        ))}
      </Stack>
    </Box>
  );
}
