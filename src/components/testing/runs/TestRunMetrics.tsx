import {
  Box,
  VStack,
  SimpleGrid,
  Text,
  Progress,
  Card,
  CardBody,
  HStack,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useToast,
} from '@chakra-ui/react';
import { ResponsiveLine } from '@nivo/line';
import { TestRunMetrics as Metrics } from '../../../types/testRun';
import { format } from 'date-fns';
import { ExportService } from '../../../services/export';

interface TestRunMetricsProps {
  metrics: Metrics;
}

export function TestRunMetrics({ metrics }: TestRunMetricsProps) {
  const toast = useToast();
  const handleExport = async (exportFormat: 'pdf' | 'excel' | 'csv') => {
    try {
      const exportData = {
        widgets: [
          {
            name: 'Test Run Metrics',
            type: 'metric',
            data: {
              'Pass Rate': `${metrics.passRate}%`,
              'Failure Rate': `${metrics.failureRate}%`,
              'Blockage Rate': `${metrics.blockageRate}%`,
              'Average Duration': `${metrics.avgDuration}s`,
              Coverage: `${metrics.coverage.total}%`,
            },
          },
          {
            name: 'Top Failures',
            type: 'table',
            data: {
              headers: ['Test Case', 'Failures', 'Last Failure'],
              rows: metrics.topFailures.map((failure) => [
                failure.name,
                failure.failureCount.toString(),
                format(new Date(failure.lastFailure), 'PPpp'),
              ]),
            },
          },
        ],
      };

      await ExportService.exportMetrics(exportData, exportFormat);
      toast({
        title: 'Export Successful',
        description: `Metrics exported as ${exportFormat.toUpperCase()}`,
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Export Failed',
        description: 'Failed to export metrics data',
        status: 'error',
        duration: 3000,
      });
    }
  };
  return (
    <VStack spacing={6} align='stretch'>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
        <Card>
          <CardBody>
            <VStack align='stretch' spacing={2}>
              <Text color='gray.500'>Pass Rate</Text>
              <HStack>
                <Text fontSize='2xl' fontWeight='bold'>
                  {metrics.passRate.toFixed(1)}%
                </Text>
                <Badge colorScheme={metrics.passRate > 90 ? 'green' : 'orange'}>
                  {metrics.passRate > 90 ? 'Good' : 'Needs Attention'}
                </Badge>
              </HStack>
              <Progress
                value={metrics.passRate}
                colorScheme={metrics.passRate > 90 ? 'green' : 'orange'}
                size='sm'
                borderRadius='full'
              />
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <VStack align='stretch' spacing={2}>
              <Text color='gray.500'>Average Duration</Text>
              <Text fontSize='2xl' fontWeight='bold'>
                {metrics.avgDuration.toFixed(2)}s
              </Text>
              <Progress
                value={(metrics.avgDuration / 10) * 100}
                colorScheme='blue'
                size='sm'
                borderRadius='full'
              />
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <VStack align='stretch' spacing={2}>
              <Text color='gray.500'>Coverage</Text>
              <HStack>
                <Text fontSize='2xl' fontWeight='bold'>
                  {metrics.coverage.total.toFixed(1)}%
                </Text>
                <Badge colorScheme={metrics.coverage.total > 80 ? 'green' : 'orange'}>
                  {metrics.coverage.total > 80 ? 'Good' : 'Needs Improvement'}
                </Badge>
              </HStack>
              <Progress
                value={metrics.coverage.total}
                colorScheme={metrics.coverage.total > 80 ? 'green' : 'orange'}
                size='sm'
                borderRadius='full'
              />
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <VStack align='stretch' spacing={2}>
              <Text color='gray.500'>Blockage Rate</Text>
              <Text fontSize='2xl' fontWeight='bold'>
                {metrics.blockageRate.toFixed(1)}%
              </Text>
              <Progress
                value={metrics.blockageRate}
                colorScheme='red'
                size='sm'
                borderRadius='full'
              />
            </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        <Card>
          <CardBody>
            <Text fontWeight='medium' mb={4}>
              Pass Rate Trend
            </Text>
            <Box height='300px'>
              <ResponsiveLine
                data={[
                  {
                    id: 'pass-rate',
                    data: metrics.trends.passRate.map((point) => ({
                      x: format(new Date(point.date), 'MM/dd'),
                      y: point.value,
                    })),
                  },
                ]}
                margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 0, max: 100 }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Pass Rate (%)',
                  legendOffset: -40,
                }}
                pointSize={8}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                enableArea
                areaOpacity={0.15}
                useMesh
                theme={{
                  text: {
                    fill: '#CBD5E0',
                  },
                  grid: { line: { stroke: '#2D3748' } },
                }}
              />
            </Box>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Text fontWeight='medium' mb={4}>
              Duration Trend
            </Text>
            <Box height='300px'>
              <ResponsiveLine
                data={[
                  {
                    id: 'duration',
                    data: metrics.trends.duration.map((point) => ({
                      x: format(new Date(point.date), 'MM/dd'),
                      y: point.value,
                    })),
                  },
                ]}
                margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Duration (s)',
                  legendOffset: -40,
                }}
                pointSize={8}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                enableArea
                areaOpacity={0.15}
                useMesh
                theme={{
                  text: {
                    fill: '#CBD5E0',
                  },
                  grid: { line: { stroke: '#2D3748' } },
                }}
              />
            </Box>
          </CardBody>
        </Card>
      </SimpleGrid>

      <Card>
        <CardBody>
          <HStack justify='space-between' mb={4}>
            <Text fontWeight='medium'>Top Failures</Text>
            <HStack spacing={4}>
              <Button variant='outline' onClick={() => handleExport('pdf')}>
                Export as PDF
              </Button>
              <Button variant='outline' onClick={() => handleExport('excel')}>
                Export as Excel
              </Button>
            </HStack>
          </HStack>

          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>Test Case</Th>
                <Th isNumeric>Failures</Th>
                <Th>Last Failure</Th>
              </Tr>
            </Thead>
            <Tbody>
              {metrics.topFailures.map((failure) => (
                <Tr key={failure.testCaseId}>
                  <Td>{failure.name}</Td>
                  <Td isNumeric>
                    <Badge colorScheme='red'>{failure.failureCount}</Badge>
                  </Td>
                  <Td>{format(new Date(failure.lastFailure), 'PPpp')}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </VStack>
  );
}
