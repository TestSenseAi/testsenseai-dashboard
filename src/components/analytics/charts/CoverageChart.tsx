import { Box, useTheme } from '@chakra-ui/react';
import { ResponsiveLine } from '@nivo/line';
import { CoverageChartData } from '../../../types/analytics';

interface CoverageChartProps {
  data: CoverageChartData[];
  height?: number;
}

export function CoverageChart({ data, height = 300 }: CoverageChartProps) {
  const theme = useTheme();
  return (
    <Box h={`${height}px`}>
      <ResponsiveLine
        data={[
          {
            id: 'coverage',
            data: data.map((point: CoverageChartData) => ({
              x: point.date,
              y: point.percentage,
            })),
          },
        ]}
        margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
        xScale={{
          type: 'time',
          format: '%Y-%m-%d',
          useUTC: false,
          precision: 'day',
        }}
        yScale={{
          type: 'linear',
          min: 0,
          max: 100,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Coverage %',
          legendOffset: -40,
        }}
        enablePoints={false}
        enableArea={true}
        areaOpacity={0.15}
        theme={{
          text: {
            color: theme.colors.gray[400],
          },
          grid: {
            line: { stroke: theme.colors.gray[700] },
          },
        }}
      />
    </Box>
  );
}
