import { Box, Text, HStack, Select } from '@chakra-ui/react';
import { ResponsiveLine } from '@nivo/line';

interface TrendData {
  id: string;
  data: Array<{ x: string; y: number }>;
}

const mockData: TrendData[] = [
  {
    id: 'Total Tests',
    data: [
      { x: 'Jan 01', y: 100 },
      { x: 'Jan 02', y: 105 },
      { x: 'Jan 03', y: 110 },
      { x: 'Jan 04', y: 108 },
      { x: 'Jan 05', y: 112 },
      { x: 'Jan 06', y: 115 },
      { x: 'Jan 07', y: 113 },
    ],
  },
  {
    id: 'Passed',
    data: [
      { x: 'Jan 01', y: 90 },
      { x: 'Jan 02', y: 95 },
      { x: 'Jan 03', y: 100 },
      { x: 'Jan 04', y: 98 },
      { x: 'Jan 05', y: 102 },
      { x: 'Jan 06', y: 105 },
      { x: 'Jan 07', y: 103 },
    ],
  },
  {
    id: 'Failed',
    data: [
      { x: 'Jan 01', y: 10 },
      { x: 'Jan 02', y: 10 },
      { x: 'Jan 03', y: 10 },
      { x: 'Jan 04', y: 10 },
      { x: 'Jan 05', y: 10 },
      { x: 'Jan 06', y: 10 },
      { x: 'Jan 07', y: 10 },
    ],
  },
];

export function TestTrends() {
  const chartTheme = {
    text: { fill: '#A0AEC0' },
    grid: { line: { stroke: '#2D3748' } },
  };

  return (
    <Box bg='gray.800' borderRadius='lg' p={6}>
      <HStack justify='space-between' mb={6}>
        <Text fontSize='lg' fontWeight='semibold'>
          Test Execution Trends
        </Text>
        <Select maxW='150px' size='sm' defaultValue='7d'>
          <option value='7d'>Last 7 days</option>
          <option value='30d'>Last 30 days</option>
          <option value='90d'>Last 90 days</option>
        </Select>
      </HStack>

      <Box height='300px'>
        <ResponsiveLine
          data={mockData}
          margin={{ top: 20, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 0,
            max: 'auto',
          }}
          curve='monotoneX'
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
          }}
          pointSize={8}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          enableArea={true}
          areaOpacity={0.1}
          legends={[
            {
              anchor: 'right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              symbolSize: 12,
              symbolShape: 'circle',
            },
          ]}
          theme={chartTheme}
          colors={['#63B3ED', '#48BB78', '#F56565']}
        />
      </Box>
    </Box>
  );
}
