import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  SimpleGrid,
  Progress,
  Card,
  CardBody,
  Select,
  Button,
  Divider,
  useToast,
} from '@chakra-ui/react';
import { TestRun } from '../../../types/testRun';
import { format } from 'date-fns';
import { ExportService } from '../../../services/export';
import { useState } from 'react';

interface TestRunComparisonProps {
  runs: TestRun[];
}

export function TestRunComparison({ runs }: TestRunComparisonProps) {
  const [selectedRuns, setSelectedRuns] = useState<string[]>([]);

  const toast = useToast();

  const getComparison = () => {
    if (selectedRuns.length !== 2) return null;

    const [run1, run2] = selectedRuns.map((id) => runs.find((r) => r.id === id)!);

    return {
      duration: {
        diff: run2.summary.duration - run1.summary.duration,
        percentage: ((run2.summary.duration - run1.summary.duration) / run1.summary.duration) * 100,
      },
      passRate: {
        diff: run2.summary.passed / run2.summary.total - run1.summary.passed / run1.summary.total,
        percentage:
          (run2.summary.passed / run2.summary.total - run1.summary.passed / run1.summary.total) *
          100,
      },
      coverage: {
        diff: run2.summary.coverage - run1.summary.coverage,
        percentage: ((run2.summary.coverage - run1.summary.coverage) / run1.summary.coverage) * 100,
      },
    };
  };

  const comparison = getComparison();

  // Update the export handler in TestRunComparison.tsx
  const handleExport = async (format: 'pdf' | 'excel' | 'csv') => {
    try {
      const exportData = {
        widgets: [
          {
            name: 'Test Run Comparison',
            type: 'metric',
            data: {
              'Duration Change': `${comparison?.duration.diff.toFixed(
                2
              )}s (${comparison?.duration.percentage.toFixed(1)}%)`,
              'Pass Rate Change': `${comparison?.passRate.diff.toFixed(
                2
              )}% (${comparison?.passRate.percentage.toFixed(1)}%)`,
              'Coverage Change': `${comparison?.coverage.diff.toFixed(
                2
              )}% (${comparison?.coverage.percentage.toFixed(1)}%)`,
            },
          },
          {
            name: 'Run Details',
            type: 'table',
            data: {
              headers: ['Run', 'Pass Rate', 'Total Tests', 'Duration'],
              rows: selectedRuns.map((runId) => {
                const run = runs.find((r) => r.id === runId)!;
                return [
                  run.name,
                  `${((run.summary.passed / run.summary.total) * 100).toFixed(1)}%`,
                  run.summary.total.toString(),
                  `${run.summary.duration}s`,
                ];
              }),
            },
          },
        ],
      };

      await ExportService.exportMetrics(exportData, format);
      toast({
        title: 'Export Successful',
        description: `Comparison exported as ${format.toUpperCase()}`,
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Export Failed',
        description: 'Failed to export comparison data',
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <VStack spacing={6} align='stretch'>
      <Card>
        <CardBody>
          <VStack spacing={6} align='stretch'>
            <Text fontSize='lg' fontWeight='medium'>
              Select Runs to Compare
            </Text>
            <SimpleGrid columns={2} spacing={4}>
              <Select
                placeholder='Select first run'
                value={selectedRuns[0]}
                onChange={(e) => setSelectedRuns([e.target.value, selectedRuns[1] || ''])}>
                {runs.map((run) => (
                  <option key={run.id} value={run.id}>
                    {run.name} ({format(new Date(run.startTime), 'PPpp')})
                  </option>
                ))}
              </Select>

              <Select
                placeholder='Select second run'
                value={selectedRuns[1]}
                onChange={(e) => setSelectedRuns([selectedRuns[0] || '', e.target.value])}>
                {runs.map((run) => (
                  <option key={run.id} value={run.id}>
                    {run.name} ({format(new Date(run.startTime), 'PPpp')})
                  </option>
                ))}
              </Select>
            </SimpleGrid>

            {comparison && (
              <>
                <Divider />

                <SimpleGrid columns={3} spacing={6}>
                  <Box>
                    <Text color='gray.500' mb={2}>
                      Duration Change
                    </Text>
                    <HStack>
                      <Text fontSize='2xl' fontWeight='bold'>
                        {comparison.duration.diff > 0 ? '+' : ''}
                        {comparison.duration.diff.toFixed(2)}s
                      </Text>
                      <Badge colorScheme={comparison.duration.diff < 0 ? 'green' : 'red'} ml={2}>
                        {comparison.duration.percentage > 0 ? '+' : ''}
                        {comparison.duration.percentage.toFixed(1)}%
                      </Badge>
                    </HStack>
                  </Box>

                  <Box>
                    <Text color='gray.500' mb={2}>
                      Pass Rate Change
                    </Text>
                    <HStack>
                      <Text fontSize='2xl' fontWeight='bold'>
                        {comparison.passRate.diff > 0 ? '+' : ''}
                        {comparison.passRate.diff.toFixed(2)}
                      </Text>
                      <Badge colorScheme={comparison.passRate.diff > 0 ? 'green' : 'red'} ml={2}>
                        {comparison.passRate.percentage > 0 ? '+' : ''}
                        {comparison.passRate.percentage.toFixed(1)}%
                      </Badge>
                    </HStack>
                  </Box>

                  <Box>
                    <Text color='gray.500' mb={2}>
                      Coverage Change
                    </Text>
                    <HStack>
                      <Text fontSize='2xl' fontWeight='bold'>
                        {comparison.coverage.diff > 0 ? '+' : ''}
                        {comparison.coverage.diff.toFixed(2)}%
                      </Text>
                      <Badge colorScheme={comparison.coverage.diff > 0 ? 'green' : 'red'} ml={2}>
                        {comparison.coverage.percentage > 0 ? '+' : ''}
                        {comparison.coverage.percentage.toFixed(1)}%
                      </Badge>
                    </HStack>
                  </Box>
                </SimpleGrid>

                <Divider />

                <Box>
                  <Text fontWeight='medium' mb={4}>
                    Test Results Comparison
                  </Text>
                  {selectedRuns.map((runId) => {
                    const run = runs.find((r) => r.id === runId)!;
                    return (
                      <Box key={run.id} mb={4}>
                        <Text mb={2}>{run.name}</Text>
                        <Progress
                          value={(run.summary.passed / run.summary.total) * 100}
                          size='lg'
                          colorScheme='green'
                          borderRadius='full'
                        />
                        <HStack mt={1} justify='space-between'>
                          <Text fontSize='sm' color='gray.500'>
                            {run.summary.passed} / {run.summary.total} tests passed
                          </Text>
                          <Text fontSize='sm' color='gray.500'>
                            {((run.summary.passed / run.summary.total) * 100).toFixed(1)}%
                          </Text>
                        </HStack>
                      </Box>
                    );
                  })}
                </Box>

                <HStack justify='flex-end' spacing={4}>
                  <Button variant='outline' onClick={() => handleExport('pdf')}>
                    Export as PDF
                  </Button>
                  <Button variant='outline' onClick={() => handleExport('excel')}>
                    Export as Excel
                  </Button>
                </HStack>
              </>
            )}
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );
}
