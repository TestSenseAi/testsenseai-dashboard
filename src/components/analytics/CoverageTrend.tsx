import { Card, CardBody, CardHeader, Heading } from '@chakra-ui/react';
import { ResponsiveLine } from '@nivo/line';
import { CoverageData } from '../../types/analytics';

interface CoverageTrendProps {
  data: CoverageData;
}

export function CoverageTrend({ data }: CoverageTrendProps) {
  const chartData = [
    {
      id: 'coverage',
      data: data.trend.map((point) => ({
        x: point.date,
        y: point.coverage,
      })),
    },
  ];

  return (
    <Card bg='gray.800' h='400px'>
      <CardHeader>
        <Heading size='md'>Coverage Trend</Heading>
      </CardHeader>
      <CardBody>
        <ResponsiveLine
          data={chartData}
          margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
          xScale={{
            type: 'time',
            format: '%Y-%m-%d',
            useUTC: false,
            precision: 'day',
          }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 100,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Coverage %',
            legendOffset: -40,
          }}
          pointSize={8}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          enableArea={true}
          areaOpacity={0.15}
          useMesh={true}
          theme={{
            text: {
              fill: '#CBD5E0',
            },
            grid: { line: { stroke: '#2D3748' } },
            crosshair: { line: { stroke: '#4A5568' } },
          }}
        />
      </CardBody>
    </Card>
  );
}
