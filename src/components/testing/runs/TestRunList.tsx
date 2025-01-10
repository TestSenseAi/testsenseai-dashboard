import {
  Box,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Progress,
  Tooltip,
  useDisclosure,
  useToast,
  HStack,
  Icon,
} from '@chakra-ui/react';
import {
  MoreVertical,
  Play,
  StopCircle,
  RefreshCw,
  Download,
  ExternalLink,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Clock,
} from 'lucide-react';
import { useState } from 'react';
import { TestRun, TestRunStatus } from '../../../types/testRun';
import { TestRunFilter } from './TestRunFilter';
import { TestRunDetails } from './TestRunDetails';
import { formatDistanceToNow, format } from 'date-fns';
import { ExportService } from '../../../services/export';

const statusColors: Record<TestRunStatus, string> = {
  queued: 'gray',
  running: 'blue',
  completed: 'green',
  aborted: 'red',
};

const statusIcons: Record<TestRunStatus, any> = {
  queued: Clock,
  running: RefreshCw,
  completed: CheckCircle,
  aborted: AlertTriangle,
};

interface TestRunListProps {
  runs: TestRun[];
  onRunTest: (runId: string) => void;
  onStopRun: (runId: string) => void;
  isLoading?: boolean;
}

export function TestRunList({ runs, onRunTest, onStopRun, isLoading = false }: TestRunListProps) {
  const [selectedRun, setSelectedRun] = useState<TestRun | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleExport = async (runId: string, exportFormat: 'pdf' | 'excel' | 'csv') => {
    try {
      const run = runs.find((r) => r.id === runId);
      if (!run) return;

      const exportData = {
        widgets: [
          {
            name: 'Test Run Summary',
            type: 'metric',
            data: {
              'Total Tests': run.summary.total,
              'Pass Rate': `${((run.summary.passed / run.summary.total) * 100).toFixed(1)}%`,
              Duration: `${run.summary.duration.toFixed(2)}s`,
              Coverage: `${run.summary.coverage}%`,
            },
          },
          {
            name: 'Test Cases',
            type: 'table',
            data: {
              headers: ['Test Case', 'Status', 'Duration', 'Steps'],
              rows: run.testCases.map((test) => [
                test.name,
                test.status,
                `${test.duration.toFixed(2)}s`,
                test.steps.length.toString(),
              ]),
            },
          },
        ],
      };

      await ExportService.exportMetrics(exportData, exportFormat);
      toast({
        title: 'Export Successful',
        description: `Test run exported as ${exportFormat.toUpperCase()}`,
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Export Failed',
        description: 'Failed to export test run data',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleViewDetails = (run: TestRun) => {
    setSelectedRun(run);
    onOpen();
  };

  return (
    <Box>
      <VStack spacing={6} align='stretch'>
        <TestRunFilter isLoading={isLoading} />

        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Test Suite</Th>
              <Th>Environment</Th>
              <Th>Status</Th>
              <Th>Results</Th>
              <Th>Duration</Th>
              <Th>Executed By</Th>
              <Th>Last Update</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {runs.map((run) => (
              <Tr key={run.id}>
                <Td>
                  <VStack align='start' spacing={1}>
                    <Text fontWeight='medium'>{run.suiteName}</Text>
                    <Text fontSize='sm' color='gray.400'>
                      Version {run.suiteVersion}
                    </Text>
                  </VStack>
                </Td>
                <Td>
                  <Badge colorScheme={run.environment === 'production' ? 'red' : 'green'}>
                    {run.environment}
                  </Badge>
                </Td>
                <Td>
                  <HStack>
                    <Icon
                      as={statusIcons[run.status]}
                      color={`${statusColors[run.status]}.400`}
                      spin={run.status === 'running'}
                    />
                    <Badge colorScheme={statusColors[run.status]}>{run.status}</Badge>
                  </HStack>
                </Td>
                <Td>
                  <VStack align='start' spacing={1}>
                    <HStack>
                      <Text fontSize='sm'>
                        {run.summary.passed}/{run.summary.total} passed
                      </Text>
                      <Badge colorScheme='green'>
                        {Math.round((run.summary.passed / run.summary.total) * 100)}%
                      </Badge>
                    </HStack>
                    <Progress
                      value={(run.summary.passed / run.summary.total) * 100}
                      size='sm'
                      width='150px'
                      colorScheme='green'
                      borderRadius='full'
                    />
                  </VStack>
                </Td>
                <Td>
                  <Tooltip label={format(new Date(run.startTime), 'PPpp')}>
                    <Text>{formatDistanceToNow(new Date(run.startTime))} ago</Text>
                  </Tooltip>
                </Td>
                <Td>
                  <HStack>
                    <Text>{run.executor.name}</Text>
                  </HStack>
                </Td>
                <Td>
                  <Text fontSize='sm' color='gray.400'>
                    {formatDistanceToNow(new Date(run.updatedAt))} ago
                  </Text>
                </Td>
                <Td>
                  <HStack spacing={2}>
                    {run.status === 'running' ? (
                      <IconButton
                        aria-label='Stop test run'
                        icon={<StopCircle size={16} />}
                        size='sm'
                        colorScheme='red'
                        variant='ghost'
                        onClick={() => onStopRun(run.id)}
                      />
                    ) : (
                      <IconButton
                        aria-label='Run test'
                        icon={<Play size={16} />}
                        size='sm'
                        colorScheme='green'
                        variant='ghost'
                        onClick={() => onRunTest(run.id)}
                      />
                    )}
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        icon={<MoreVertical size={16} />}
                        variant='ghost'
                        size='sm'
                      />
                      <MenuList>
                        <MenuItem
                          icon={<ExternalLink size={16} />}
                          onClick={() => handleViewDetails(run)}>
                          View Details
                        </MenuItem>
                        <MenuItem
                          icon={<MessageSquare size={16} />}
                          onClick={() => handleViewDetails(run)}>
                          View Comments
                        </MenuItem>
                        <MenuItem
                          icon={<Download size={16} />}
                          onClick={() => handleExport(run.id, 'pdf')}>
                          Export as PDF
                        </MenuItem>
                        <MenuItem
                          icon={<Download size={16} />}
                          onClick={() => handleExport(run.id, 'excel')}>
                          Export as Excel
                        </MenuItem>
                        <MenuItem
                          icon={<Download size={16} />}
                          onClick={() => handleExport(run.id, 'csv')}>
                          Export as CSV
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <TestRunDetails isOpen={isOpen} onClose={onClose} run={selectedRun} />
      </VStack>
    </Box>
  );
}
