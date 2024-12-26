import { Box, Heading, Select, HStack } from '@chakra-ui/react';
import { ResponsiveLine } from '@nivo/line';
import { useTestTrends } from '../../hooks/useTestTrends';

export function TestTrends() {
  const { data, timeRange, setTimeRange } = useTestTrends();

  return (
    <Box p={6} bg='gray.800' borderRadius='lg'>
      <HStack justify='space-between' mb={6}>
        <Heading size='md'>Test Execution Trends</Heading>
        <Select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          w='150px'
          size='sm'>
          <option value='7d'>Last 7 days</option>
          <option value='30d'>Last 30 days</option>
          <option value='90d'>Last 90 days</option>
        </Select>
      </HStack>

      <Box h='300px'>
        <ResponsiveLine
          data={data}
          margin={{ top: 10, right: 30, bottom: 50, left: 60 }}
          xScale={{ type: 'time', format: '%Y-%m-%d' }}
          yScale={{ type: 'linear', min: 0, max: 'auto' }}
          curve='monotoneX'
          axisBottom={{
            format: '%b %d',
            tickRotation: -45,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
          }}
          enablePoints={false}
          enableGridX={false}
          enableArea={true}
          areaOpacity={0.1}
          theme={{
            text: {
              fill: '#CBD5E0',
            },
            grid: { line: { stroke: '#2D3748' } },
            crosshair: { line: { stroke: '#4A5568' } },
          }}
          colors={['#2186EB', '#38A169', '#E53E3E']}
          pointSize={8}
          useMesh={true}
          legends={[
            {
              anchor: 'bottom',
              direction: 'row',
              translateY: 50,
              itemWidth: 100,
              itemHeight: 20,
              symbolSize: 12,
            },
          ]}
        />
      </Box>
    </Box>
  );
}
