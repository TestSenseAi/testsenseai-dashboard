import { Box, Text } from '@chakra-ui/react';
import { CoverageChart } from '../analytics/charts/CoverageChart';
import { CoverageChartData } from '../../types/analytics';

export const TestExecutionTrends: React.FC<{ data: CoverageChartData[] }> = ({ data }) => {
  return (
    <Box bg='gray.800' p={5} borderRadius='lg'>
      <Text fontSize='lg' fontWeight='semibold' color='white' mb={4}>
        Test Execution Trends
      </Text>
      <CoverageChart data={data} />
    </Box>
  );
};
