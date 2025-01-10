import { Box } from '@chakra-ui/react';
import { ResponsiveLine } from '@nivo/line';

interface TestDurationData {
  date: string;
  duration: number;
}

interface TestDurationChartProps {
  data: TestDurationData[];
  height?: number;
}

export function TestDurationChart({ data, height = 300 }: TestDurationChartProps) {
  return (
    <Box h={`${height}px`}>
      <ResponsiveLine
        data={[
          {
            id: 'duration',
            data: data.map((point) => ({
              x: new Date(point.date),
              y: point.duration,
            })),
          },
        ]}
        margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
        xScale={{
          type: 'time',
          format: 'native',
          precision: 'minute',
        }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Duration (s)',
          legendOffset: -40,
        }}
        axisBottom={{
          format: '%H:%M',
          tickRotation: -45,
          legend: 'Time',
          legendOffset: 36,
        }}
        enablePoints={true}
        pointSize={8}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        enableArea={true}
        areaOpacity={0.15}
        theme={{
          text: {
            fill: '#CBD5E0',
          },
          grid: { line: { stroke: '#2D3748' } },
        }}
      />
    </Box>
  );
}
