import { Card, CardBody, CardHeader, Heading } from '@chakra-ui/react';
import { ResponsiveLine } from '@nivo/line';
import { format } from 'date-fns';
import { ExportService } from '../../services/export';
import { useToast } from '@chakra-ui/react';
import { CoverageData } from '../../types/analytics';
interface CoverageTrendProps {
  data: CoverageData;
}

export function CoverageTrend({ data }: CoverageTrendProps) {
  const toast = useToast();
  const chartData = [
    {
      id: 'coverage',
      data: data.trend.map((point: { date: string; coverage: number }) => ({
        x: point.date,
        y: point.coverage,
      })),
    },
  ];

  const handleExport = async (exportFormat: 'pdf' | 'excel' | 'csv') => {
    try {
      const exportData = {
        widgets: [
          {
            name: 'Coverage Metrics',
            type: 'metric',
            data: {
              'Total Coverage': `${data.percentage.toFixed(1)}%`,
              'UI Tests': `${data.byType.ui}%`,
              'API Tests': `${data.byType.api}%`,
              'Visual Tests': `${data.byType.visual}%`,
            },
          },
          {
            name: 'Coverage Trend',
            type: 'table',
            data: {
              headers: ['Date', 'Coverage (%)'],
              rows: data.trend.map((point: { date: string; coverage: number }) => [
                format(new Date(point.date), 'PPpp'),
                point.coverage.toFixed(1),
              ]),
            },
          },
        ],
      };

      await ExportService.exportMetrics(exportData, exportFormat);
      toast({
        title: 'Export Successful',
        description: `Coverage data exported as ${exportFormat.toUpperCase()}`,
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Export Failed',
        description: 'Failed to export coverage data',
        status: 'error',
        duration: 3000,
      });
    }
  };

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
