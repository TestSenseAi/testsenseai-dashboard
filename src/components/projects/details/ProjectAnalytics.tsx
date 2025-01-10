import {
  Box,
  SimpleGrid,
  Text,
  VStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  HStack,
  Select,
} from '@chakra-ui/react';
import { CoverageChart } from '../../analytics/charts/CoverageChart';
import { Project } from '../../../types/project';
import { useCoverageData } from '../../../hooks/analytics/useCoverageData';
import { useTestExecutionData } from '../../../hooks/analytics/useTestExecutionData';
import { usePerformanceData } from '../../../hooks/analytics/usePerformanceData';
import { ResponsiveLine } from '@nivo/line';
import { useState } from 'react';
import { DateRange } from '../../../types/analytics';

interface ProjectAnalyticsProps {
  project: Project;
}

export function ProjectAnalytics({ project }: ProjectAnalyticsProps) {
  const [dateRange, setDateRange] = useState<DateRange>('30d');
  const { metrics, chartData } = useCoverageData(dateRange);
  const { executionData, recentResults, metrics: testMetrics } = useTestExecutionData(dateRange);
  const { performanceData, metrics: perfMetrics } = usePerformanceData(dateRange);

  console.log(project);
  const stats = [
    {
      label: 'Test Coverage',
      value: metrics?.total || 0,
      change: metrics?.trend || 0,
      format: (v: number) => `${v.toFixed(1)}%`,
    },
    {
      label: 'Pass Rate',
      value: testMetrics ? (testMetrics.passed / testMetrics.total) * 100 : 0,
      change: 2.5,
      format: (v: number) => `${v.toFixed(1)}%`,
    },
    {
      label: 'Avg Duration',
      value: testMetrics?.avgDuration || 0,
      change: -0.3,
      format: (v: number) => `${v.toFixed(1)}s`,
    },
    {
      label: 'Total Tests',
      value: testMetrics?.total || 0,
      change: 15,
      format: (v: number) => v.toString(),
    },
  ];

  const chartTheme = {
    text: { fill: '#A0AEC0' },
    grid: { line: { stroke: '#2D3748' } },
  };

  return (
    <Box>
      <HStack justify='flex-end' mb={4}>
        <Select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value as DateRange)}
          width='200px'>
          <option value='7d'>Last 7 days</option>
          <option value='30d'>Last 30 days</option>
          <option value='90d'>Last 90 days</option>
        </Select>
      </HStack>

      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6} mb={8}>
        {stats.map((stat) => (
          <Stat key={stat.label} bg='gray.800' p={4} borderRadius='lg'>
            <StatLabel>{stat.label}</StatLabel>
            <StatNumber>{stat.format(stat.value)}</StatNumber>
            <StatHelpText>
              <StatArrow type={stat.change >= 0 ? 'increase' : 'decrease'} />
              {Math.abs(stat.change)}%
            </StatHelpText>
          </Stat>
        ))}
      </SimpleGrid>

      <Tabs colorScheme='brand' mb={8}>
        <TabList>
          <Tab>Coverage Trends</Tab>
          <Tab>Test Execution</Tab>
          <Tab>Performance</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Box bg='gray.800' p={6} borderRadius='lg'>
              <Text fontSize='lg' fontWeight='semibold' mb={4}>
                Coverage Over Time
              </Text>
              {chartData && <CoverageChart data={chartData} height={300} />}
            </Box>
          </TabPanel>

          <TabPanel>
            <VStack spacing={4} align='stretch'>
              <Box bg='gray.800' p={6} borderRadius='lg'>
                <Text fontSize='lg' fontWeight='semibold' mb={4}>
                  Test Execution Time
                </Text>
                <Box height='300px'>
                  <ResponsiveLine
                    data={[
                      {
                        id: 'duration',
                        data: executionData.map((d) => ({
                          x: d.date,
                          y: d.duration,
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
                      min: 'auto',
                      max: 'auto',
                    }}
                    axisLeft={{
                      legend: 'Duration (s)',
                      legendOffset: -40,
                    }}
                    enablePoints={false}
                    enableArea={true}
                    areaOpacity={0.15}
                    theme={chartTheme}
                  />
                </Box>
              </Box>

              <Box bg='gray.800' p={6} borderRadius='lg'>
                <Text fontSize='lg' fontWeight='semibold' mb={4}>
                  Recent Test Results
                </Text>
                <Table variant='simple'>
                  <Thead>
                    <Tr>
                      <Th>Test Name</Th>
                      <Th>Status</Th>
                      <Th>Duration</Th>
                      <Th>Time</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {recentResults.map((result) => (
                      <Tr key={result.id}>
                        <Td>{result.name}</Td>
                        <Td>
                          <Badge
                            colorScheme={
                              result.status === 'passed'
                                ? 'green'
                                : result.status === 'failed'
                                ? 'red'
                                : 'gray'
                            }>
                            {result.status}
                          </Badge>
                        </Td>
                        <Td>{result.duration.toFixed(1)}s</Td>
                        <Td>{new Date(result.timestamp).toLocaleTimeString()}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </VStack>
          </TabPanel>

          <TabPanel>
            <VStack spacing={4} align='stretch'>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={6}>
                <Stat bg='gray.800' p={4} borderRadius='lg'>
                  <StatLabel>Avg Load Time</StatLabel>
                  <StatNumber>{perfMetrics.avgLoadTime.toFixed(2)}s</StatNumber>
                </Stat>
                <Stat bg='gray.800' p={4} borderRadius='lg'>
                  <StatLabel>Error Rate</StatLabel>
                  <StatNumber>{perfMetrics.avgErrorRate.toFixed(1)}%</StatNumber>
                </Stat>
                <Stat bg='gray.800' p={4} borderRadius='lg'>
                  <StatLabel>Throughput</StatLabel>
                  <StatNumber>{perfMetrics.avgThroughput} req/min</StatNumber>
                </Stat>
              </SimpleGrid>

              <Box bg='gray.800' p={6} borderRadius='lg'>
                <Text fontSize='lg' fontWeight='semibold' mb={4}>
                  Performance Trends
                </Text>
                <Box height='300px'>
                  <ResponsiveLine
                    data={[
                      {
                        id: 'Load Time',
                        data:
                          performanceData?.loadTime.map((d) => ({
                            x: d.date,
                            y: d.value,
                          })) || [],
                      },
                      {
                        id: 'Error Rate',
                        data:
                          performanceData?.errorRate.map((d) => ({
                            x: d.date,
                            y: d.value,
                          })) || [],
                      },
                    ]}
                    margin={{ top: 20, right: 100, bottom: 50, left: 50 }}
                    xScale={{
                      type: 'time',
                      format: '%Y-%m-%d',
                      useUTC: false,
                      precision: 'day',
                    }}
                    yScale={{
                      type: 'linear',
                      min: 'auto',
                      max: 'auto',
                    }}
                    axisLeft={{
                      legend: 'Value',
                      legendOffset: -40,
                    }}
                    pointSize={8}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    enableArea={false}
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
                  />
                </Box>
              </Box>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
