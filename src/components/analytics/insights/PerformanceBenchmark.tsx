import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Text,
  HStack,
  Icon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Progress,
  Badge,
  useToast,
} from '@chakra-ui/react';
import { Zap, Download, MoreVertical, AlertTriangle, TrendingUp } from 'lucide-react';
import { ResponsiveLine } from '@nivo/line';
import { useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';

interface BenchmarkData {
  metric: string;
  current: number;
  previous: number;
  unit: string;
  threshold: number;
  history: Array<{
    timestamp: string;
    value: number;
  }>;
  insights?: {
    trend: 'improving' | 'degrading' | 'stable';
    suggestion?: string;
    impact: 'high' | 'medium' | 'low';
  };
}

const mockData: BenchmarkData[] = [
  {
    metric: 'Average Duration',
    current: 1.2,
    previous: 1.5,
    unit: 's',
    threshold: 2.0,
    history: Array.from({ length: 30 }, (_, i) => ({
      timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
      value: 1.2 + Math.random() * 0.5,
    })),
    insights: {
      trend: 'improving',
      suggestion: 'Consider implementing caching to further reduce response times',
      impact: 'medium',
    },
  },
  {
    metric: 'P95 Duration',
    current: 2.8,
    previous: 2.5,
    unit: 's',
    threshold: 3.0,
    history: Array.from({ length: 30 }, (_, i) => ({
      timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
      value: 2.5 + Math.random() * 0.8,
    })),
    insights: {
      trend: 'degrading',
      suggestion: 'Investigate potential memory leaks in the test suite',
      impact: 'high',
    },
  },
  {
    metric: 'Memory Usage',
    current: 450,
    previous: 420,
    unit: 'MB',
    threshold: 512,
    history: Array.from({ length: 30 }, (_, i) => ({
      timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
      value: 420 + Math.random() * 50,
    })),
    insights: {
      trend: 'stable',
      impact: 'low',
    },
  },
  {
    metric: 'CPU Usage',
    current: 65,
    previous: 70,
    unit: '%',
    threshold: 80,
    history: Array.from({ length: 30 }, (_, i) => ({
      timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
      value: 65 + Math.random() * 20,
    })),
    insights: {
      trend: 'improving',
      suggestion: 'Consider parallel test execution to optimize CPU utilization',
      impact: 'medium',
    },
  },
];

const timeRanges = [
  { label: '24h', days: 1 },
  { label: '7d', days: 7 },
  { label: '30d', days: 30 },
  { label: '90d', days: 90 },
];

export function PerformanceBenchmark() {
  const [isExporting, setIsExporting] = useState(false);
  const [timeRange, setTimeRange] = useState('24h');
  const [selectedTab, setSelectedTab] = useState(0);
  const toast = useToast();

  const handleExport = async (exportFormat: 'pdf' | 'csv' | 'excel') => {
    try {
      setIsExporting(true);

      const data = {
        metrics: {
          avgDuration: mockData[0].current,
          p95Duration: mockData[1].current,
          memoryUsage: mockData[2].current,
          cpuUsage: mockData[3].current,
        },
        trends: mockData.map((metric) => ({
          timestamp: format(new Date(metric.history[0].timestamp), 'yyyy-MM-dd HH:mm:ss'),
          value: metric.current,
        })),
        recommendations: mockData
          .filter((m) => m.insights?.suggestion)
          .map((m) => m.insights?.suggestion || ''),
      };

      const fileName = `performance-benchmark-${format(new Date(), 'yyyy-MM-dd-HH-mm-ss')}`;

      switch (exportFormat) {
        case 'pdf':
          const pdf = new jsPDF();

          // Add title
          pdf.setFontSize(16);
          pdf.text('Performance Benchmark Report', 14, 15);
          pdf.setFontSize(10);
          pdf.text(`Generated on ${format(new Date(), 'PPpp')}`, 14, 25);

          // Add metrics table
          autoTable(pdf, {
            head: [['Metric', 'Value', 'Unit']],
            body: [
              ['Average Duration', data.metrics.avgDuration.toString(), 'ms'],
              ['P95 Duration', data.metrics.p95Duration.toString(), 'ms'],
              ['Memory Usage', data.metrics.memoryUsage.toString(), 'MB'],
              ['CPU Usage', data.metrics.cpuUsage.toString(), '%'],
            ],
            startY: 35,
            theme: 'grid',
            headStyles: { fillColor: [41, 128, 185] },
          });

          // Add trends table
          pdf.addPage();
          pdf.text('Performance Trends', 14, 15);
          autoTable(pdf, {
            head: [['Timestamp', 'Value']],
            body: data.trends.map((point) => [point.timestamp, point.value.toString()]),
            startY: 25,
            theme: 'grid',
            headStyles: { fillColor: [41, 128, 185] },
          });

          // Add recommendations
          pdf.addPage();
          pdf.text('Recommendations', 14, 15);
          autoTable(pdf, {
            head: [['Recommendation']],
            body: data.recommendations.map((rec) => [rec]),
            startY: 25,
            theme: 'grid',
            headStyles: { fillColor: [41, 128, 185] },
          });

          pdf.save(`${fileName}.pdf`);
          break;

        case 'csv':
          const csvContent = [
            ['Performance Benchmark Report'],
            [`Generated on ${format(new Date(), 'PPpp')}`],
            [],
            ['Metrics'],
            ['Metric', 'Value', 'Unit'],
            ['Average Duration', data.metrics.avgDuration, 'ms'],
            ['P95 Duration', data.metrics.p95Duration, 'ms'],
            ['Memory Usage', data.metrics.memoryUsage, 'MB'],
            ['CPU Usage', data.metrics.cpuUsage, '%'],
            [],
            ['Performance Trends'],
            ['Timestamp', 'Value'],
            ...data.trends.map((point) => [point.timestamp, point.value]),
            [],
            ['Recommendations'],
            ...data.recommendations.map((rec) => [rec]),
          ]
            .map((row) => row.join(','))
            .join('\n');

          const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${fileName}.csv`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          break;

        case 'excel':
          const wb = XLSX.utils.book_new();

          // Add metrics sheet
          const metricsWS = XLSX.utils.aoa_to_sheet([
            ['Performance Benchmark Report'],
            [`Generated on ${format(new Date(), 'PPpp')}`],
            [],
            ['Metrics'],
            ['Metric', 'Value', 'Unit'],
            ['Average Duration', data.metrics.avgDuration, 'ms'],
            ['P95 Duration', data.metrics.p95Duration, 'ms'],
            ['Memory Usage', data.metrics.memoryUsage, 'MB'],
            ['CPU Usage', data.metrics.cpuUsage, '%'],
          ]);
          XLSX.utils.book_append_sheet(wb, metricsWS, 'Metrics');

          // Add trends sheet
          const trendsWS = XLSX.utils.aoa_to_sheet([
            ['Timestamp', 'Value'],
            ...data.trends.map((point) => [point.timestamp, point.value]),
          ]);
          XLSX.utils.book_append_sheet(wb, trendsWS, 'Trends');

          // Add recommendations sheet
          const recsWS = XLSX.utils.aoa_to_sheet([
            ['Recommendations'],
            ...data.recommendations.map((rec) => [rec]),
          ]);
          XLSX.utils.book_append_sheet(wb, recsWS, 'Recommendations');

          // Save the workbook
          XLSX.writeFile(wb, `${fileName}.xlsx`);
          break;
      }

      toast({
        title: 'Export Successful',
        description: `Report has been downloaded as ${exportFormat.toUpperCase()}`,
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: 'Export Failed',
        description: 'An error occurred while exporting the report',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Box>
      <HStack justify='space-between' mb={4}>
        <HStack>
          <Icon as={Zap} color='blue.400' />
          <Text fontSize='lg' fontWeight='medium'>
            Performance Benchmarks
          </Text>
        </HStack>
        <HStack>
          <HStack spacing={1}>
            {timeRanges.map(({ label }) => (
              <Button
                key={label}
                size='sm'
                variant={timeRange === label ? 'solid' : 'ghost'}
                onClick={() => setTimeRange(label)}>
                {label}
              </Button>
            ))}
          </HStack>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<MoreVertical size={16} />}
              size='sm'
              variant='ghost'>
              Actions
            </MenuButton>
            <MenuList>
              <MenuItem
                icon={<Download size={16} />}
                onClick={() => handleExport('pdf')}
                isDisabled={isExporting}>
                Export as PDF
              </MenuItem>
              <MenuItem
                icon={<Download size={16} />}
                onClick={() => handleExport('csv')}
                isDisabled={isExporting}>
                Export as CSV
              </MenuItem>
              <MenuItem
                icon={<Download size={16} />}
                onClick={() => handleExport('excel')}
                isDisabled={isExporting}>
                Export as Excel
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </HStack>

      <Tabs colorScheme='brand' index={selectedTab} onChange={setSelectedTab}>
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Trends</Tab>
          <Tab>Insights</Tab>
        </TabList>

        <TabPanels>
          <TabPanel px={0}>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
              {mockData.map((metric) => {
                const change = ((metric.current - metric.previous) / metric.previous) * 100;
                const isImprovement = metric.metric.includes('Duration') ? change < 0 : change > 0;
                const thresholdPercentage = (metric.current / metric.threshold) * 100;

                return (
                  <Box
                    key={metric.metric}
                    p={4}
                    bg='gray.800'
                    borderRadius='lg'
                    borderWidth={1}
                    borderColor={
                      metric.current > metric.threshold
                        ? 'red.500'
                        : metric.current > metric.threshold * 0.9
                        ? 'orange.500'
                        : 'gray.700'
                    }>
                    <Stat>
                      <StatLabel color='gray.400'>{metric.metric}</StatLabel>
                      <StatNumber>
                        {metric.current}
                        {metric.unit}
                      </StatNumber>
                      <StatHelpText>
                        <StatArrow type={isImprovement ? 'increase' : 'decrease'} />
                        {Math.abs(change).toFixed(1)}%
                      </StatHelpText>
                      <Box mt={2}>
                        <Text fontSize='sm' color='gray.400' mb={1}>
                          Threshold Usage: {thresholdPercentage.toFixed(1)}%
                        </Text>
                        <Progress
                          value={thresholdPercentage}
                          colorScheme={
                            thresholdPercentage > 90
                              ? 'red'
                              : thresholdPercentage > 75
                              ? 'orange'
                              : 'green'
                          }
                          size='sm'
                          borderRadius='full'
                        />
                      </Box>
                    </Stat>
                  </Box>
                );
              })}
            </SimpleGrid>
          </TabPanel>

          <TabPanel px={0}>
            {mockData.map((metric) => (
              <Box key={metric.metric} mb={6} p={4} bg='gray.800' borderRadius='lg'>
                <HStack justify='space-between' mb={4}>
                  <Text fontWeight='medium'>{metric.metric}</Text>
                  <Badge
                    colorScheme={
                      metric.insights?.trend === 'improving'
                        ? 'green'
                        : metric.insights?.trend === 'degrading'
                        ? 'red'
                        : 'gray'
                    }>
                    {metric.insights?.trend}
                  </Badge>
                </HStack>
                <Box h='200px'>
                  <ResponsiveLine
                    data={[
                      {
                        id: metric.metric,
                        data: metric.history.map((point) => ({
                          x: new Date(point.timestamp),
                          y: point.value,
                        })),
                      },
                    ]}
                    margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
                    xScale={{
                      type: 'time',
                      format: 'native',
                    }}
                    yScale={{
                      type: 'linear',
                      min: 'auto',
                      max: 'auto',
                    }}
                    axisBottom={{
                      format: '%b %d',
                      tickRotation: -45,
                    }}
                    enablePoints={false}
                    enableArea={true}
                    areaOpacity={0.15}
                    curve='monotoneX'
                    theme={{
                      text: {
                        fill: '#CBD5E0',
                      },
                      grid: { line: { stroke: '#2D3748' } },
                    }}
                  />
                </Box>
              </Box>
            ))}
          </TabPanel>

          <TabPanel px={0}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              {mockData
                .filter((m) => m.insights?.suggestion)
                .map((metric) => (
                  <Box
                    key={metric.metric}
                    p={4}
                    bg='gray.800'
                    borderRadius='lg'
                    borderWidth={1}
                    borderColor='gray.700'>
                    <HStack mb={3}>
                      <Icon
                        as={metric.insights?.impact === 'high' ? AlertTriangle : TrendingUp}
                        color={
                          metric.insights?.impact === 'high'
                            ? 'red.400'
                            : metric.insights?.impact === 'medium'
                            ? 'orange.400'
                            : 'green.400'
                        }
                      />
                      <Text fontWeight='medium'>{metric.metric}</Text>
                      <Badge
                        colorScheme={
                          metric.insights?.impact === 'high'
                            ? 'red'
                            : metric.insights?.impact === 'medium'
                            ? 'orange'
                            : 'green'
                        }>
                        {metric.insights?.impact} impact
                      </Badge>
                    </HStack>
                    <Text color='gray.300'>{metric.insights?.suggestion}</Text>
                  </Box>
                ))}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
