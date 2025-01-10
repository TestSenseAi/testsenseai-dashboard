import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Progress,
  Text,
  HStack,
  Icon,
  Button,
  Collapse,
  VStack,
  Code,
  Tooltip,
} from '@chakra-ui/react';
import {
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  ChevronRight,
  Code as CodeIcon,
} from 'lucide-react';
import { useState } from 'react';
import { ExportService } from '../../../services/export';
import { useToast } from '@chakra-ui/react';
import { format } from 'date-fns';

interface FlakynessData {
  testId: string;
  name: string;
  failureRate: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  lastRun: string;
  impact: 'high' | 'medium' | 'low';
  details?: {
    failurePattern: string;
    suggestedFix: string;
    stackTrace: string;
  };
}

const mockData: FlakynessData[] = [
  {
    testId: '1',
    name: 'User Authentication Flow',
    failureRate: 15.5,
    trend: 'increasing',
    lastRun: '2024-03-10T10:00:00Z',
    impact: 'high',
    details: {
      failurePattern: 'Element not found: [data-testid="login-button"]',
      suggestedFix: 'Add wait condition before accessing login button',
      stackTrace: 'Error: Element not found\n  at LoginPage.test.ts:25\n  at runTest()',
    },
  },
  {
    testId: '2',
    name: 'Product Search',
    failureRate: 8.2,
    trend: 'decreasing',
    lastRun: '2024-03-10T09:30:00Z',
    impact: 'medium',
    details: {
      failurePattern: 'Network request timeout',
      suggestedFix: 'Increase request timeout or add retry mechanism',
      stackTrace: 'Error: Request timeout\n  at SearchAPI.test.ts:42\n  at runTest()',
    },
  },
];

export function FlakynessDetection() {
  const [expandedTest, setExpandedTest] = useState<string | null>(null);

  const toast = useToast();

  const handleExport = async (exportFormat: 'pdf' | 'excel' | 'csv') => {
    try {
      const exportData = {
        widgets: [
          {
            name: 'Flaky Tests Summary',
            type: 'table',
            data: {
              headers: ['Test Name', 'Failure Rate', 'Trend', 'Impact', 'Last Run'],
              rows: mockData.map((test) => [
                test.name,
                `${test.failureRate}%`,
                test.trend,
                test.impact,
                format(new Date(test.lastRun), 'PPpp'),
              ]),
            },
          },
          {
            name: 'Failure Patterns',
            type: 'table',
            data: {
              headers: ['Test Name', 'Pattern', 'Suggested Fix'],
              rows: mockData.map((test) => [
                test.name,
                test.details?.failurePattern || '',
                test.details?.suggestedFix || '',
              ]),
            },
          },
        ],
      };

      await ExportService.exportMetrics(exportData, exportFormat);
      toast({
        title: 'Export Successful',
        description: `Flakiness data exported as ${exportFormat.toUpperCase()}`,
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Export Failed',
        description: 'Failed to export flakiness data',
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <Box>
      <HStack mb={4} justify='space-between'>
        <HStack>
          <Icon as={AlertTriangle} color='orange.400' />
          <Text fontSize='lg' fontWeight='medium'>
            Flaky Tests Detection
          </Text>
        </HStack>
        <Tooltip label='AI-powered analysis of test patterns'>
          <Badge colorScheme='purple'>AI Insights</Badge>
        </Tooltip>
      </HStack>

      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Test Name</Th>
            <Th>Failure Rate</Th>
            <Th>Trend</Th>
            <Th>Impact</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {mockData.map((test) => (
            <>
              <Tr key={test.testId}>
                <Td>
                  <Icon
                    as={expandedTest === test.testId ? ChevronDown : ChevronRight}
                    cursor='pointer'
                    onClick={() =>
                      setExpandedTest(expandedTest === test.testId ? null : test.testId)
                    }
                  />
                </Td>
                <Td>{test.name}</Td>
                <Td>
                  <Box w='200px'>
                    <Text mb={1}>{test.failureRate}%</Text>
                    <Progress
                      value={test.failureRate}
                      colorScheme={test.failureRate > 10 ? 'red' : 'orange'}
                      size='sm'
                      borderRadius='full'
                    />
                  </Box>
                </Td>
                <Td>
                  <HStack>
                    <Icon
                      as={test.trend === 'increasing' ? TrendingUp : TrendingDown}
                      color={test.trend === 'increasing' ? 'red.400' : 'green.400'}
                    />
                    <Text>{test.trend}</Text>
                  </HStack>
                </Td>
                <Td>
                  <Badge
                    colorScheme={
                      test.impact === 'high'
                        ? 'red'
                        : test.impact === 'medium'
                        ? 'orange'
                        : 'yellow'
                    }>
                    {test.impact}
                  </Badge>
                </Td>
                <Td>
                  <Button size='sm' leftIcon={<CodeIcon size={16} />}>
                    View Test
                  </Button>
                </Td>
              </Tr>
              {test.details && (
                <Tr>
                  <Td colSpan={6} p={0}>
                    <Collapse in={expandedTest === test.testId}>
                      <Box bg='gray.700' p={4}>
                        <VStack align='stretch' spacing={4}>
                          <Box>
                            <Text fontWeight='medium' mb={2}>
                              Failure Pattern
                            </Text>
                            <Code p={2} borderRadius='md'>
                              {test.details.failurePattern}
                            </Code>
                          </Box>
                          <Box>
                            <Text fontWeight='medium' mb={2}>
                              AI Suggested Fix
                            </Text>
                            <Code p={2} borderRadius='md' colorScheme='green'>
                              {test.details.suggestedFix}
                            </Code>
                          </Box>
                          <Box>
                            <Text fontWeight='medium' mb={2}>
                              Stack Trace
                            </Text>
                            <Code p={2} borderRadius='md' whiteSpace='pre'>
                              {test.details.stackTrace}
                            </Code>
                          </Box>
                        </VStack>
                      </Box>
                    </Collapse>
                  </Td>
                </Tr>
              )}
            </>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
