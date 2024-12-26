import { Box, Heading, Text, VStack, HStack, Tag, Icon, Button } from '@chakra-ui/react';
import { Brain, ArrowRight, AlertTriangle, Lightbulb, TrendingUp } from 'lucide-react';
import { useAIInsights } from '../../hooks/useAIInsights';

export function AIRecommendations() {
  const { insights, loading, refresh } = useAIInsights();

  return (
    <Box p={6} bg="gray.800" borderRadius="lg">
      <HStack justify="space-between" mb={6}>
        <HStack>
          <Icon as={Brain} color="brand.400" boxSize={5} />
          <Heading size="md">AI Insights & Recommendations</Heading>
        </HStack>
        <Button
          size="sm"
          leftIcon={<TrendingUp size={16} />}
          onClick={refresh}
          isLoading={loading}
        >
          Analyze New Data
        </Button>
      </HStack>

      <VStack spacing={4} align="stretch">
        {insights.map((insight, index) => (
          <Box
            key={index}
            p={4}
            borderRadius="md"
            bg="gray.700"
            _hover={{ bg: 'gray.600' }}
            transition="background 0.2s"
          >
            <HStack spacing={3} mb={2}>
              <Icon
                as={insight.type === 'warning' ? AlertTriangle : Lightbulb}
                color={insight.type === 'warning' ? 'orange.400' : 'green.400'}
                boxSize={4}
              />
              <Text fontWeight="semibold">{insight.title}</Text>
              <Tag size="sm" colorScheme={insight.type === 'warning' ? 'orange' : 'green'}>
                {insight.category}
              </Tag>
            </HStack>
            <Text color="gray.300" mb={3}>{insight.description}</Text>
            <Button
              size="sm"
              variant="ghost"
              rightIcon={<ArrowRight size={16} />}
              onClick={() => insight.onAction?.()}
            >
              {insight.actionText}
            </Button>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}