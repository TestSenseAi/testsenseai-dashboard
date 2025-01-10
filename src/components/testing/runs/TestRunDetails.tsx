import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  HStack,
  Text,
  Badge,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Box,
  Icon,
  Image,
  Code,
  Collapse,
  useDisclosure,
  SimpleGrid,
  useToast,
  Divider,
} from '@chakra-ui/react';
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Terminal,
  Download,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import { TestRun, TestCaseResult } from '../../../types/testRun';
import { ExportService } from '../../../services/export';

interface TestRunDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  run: TestRun | null;
}

const statusColors: Record<string, string> = {
  passed: 'green',
  failed: 'red',
  blocked: 'orange',
  skipped: 'gray',
};

const statusIcons: Record<string, any> = {
  passed: CheckCircle,
  failed: XCircle,
  blocked: AlertTriangle,
  skipped: Clock,
};

export function TestRunDetails({ isOpen, onClose, run }: TestRunDetailsProps) {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);
  const { isOpen: showLogs, onToggle: toggleLogs } = useDisclosure();
  const toast = useToast();

  if (!run) return null;

  const handleExport = async (exportFormat: 'pdf' | 'excel' | 'csv') => {
    try {
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

  const renderTestCase = (testCase: TestCaseResult) => (
    <Box key={testCase.id} mb={4}>
      <HStack
        justify='space-between'
        p={4}
        bg='gray.700'
        borderRadius='md'
        cursor='pointer'
        onClick={() => setExpandedStep(expandedStep === testCase.id ? null : testCase.id)}>
        <HStack>
          <Icon as={expandedStep === testCase.id ? ChevronDown : ChevronRight} color='gray.400' />
          <Icon as={statusIcons[testCase.status]} color={`${statusColors[testCase.status]}.400`} />
          <Text fontWeight='medium'>{testCase.name}</Text>
        </HStack>
        <HStack spacing={4}>
          <Badge colorScheme={statusColors[testCase.status]}>{testCase.status}</Badge>
          <Text fontSize='sm' color='gray.400'>
            {testCase.duration.toFixed(2)}s
          </Text>
        </HStack>
      </HStack>

      <Collapse in={expandedStep === testCase.id}>
        <VStack align='stretch' spacing={4} pl={8} pr={4} py={4}>
          <Text color='gray.400'>{testCase.description}</Text>

          {testCase.steps.map((step) => (
            <Box key={step.id}>
              <HStack justify='space-between' p={2} borderRadius='md'>
                <HStack>
                  <Icon as={statusIcons[step.status]} color={`${statusColors[step.status]}.400`} />
                  <Text>{step.description}</Text>
                </HStack>
                <Badge colorScheme={statusColors[step.status]}>{step.duration.toFixed(2)}s</Badge>
              </HStack>

              {step.error && (
                <Box bg='red.900' p={3} borderRadius='md' mt={2}>
                  <Text color='red.200' fontFamily='mono' fontSize='sm'>
                    {step.error.message}
                  </Text>
                  {step.error.stack && (
                    <Code
                      display='block'
                      whiteSpace='pre'
                      p={2}
                      mt={2}
                      bg='red.800'
                      color='red.100'
                      fontSize='xs'>
                      {step.error.stack}
                    </Code>
                  )}
                </Box>
              )}

              {step.screenshot && (
                <Image
                  src={step.screenshot}
                  alt={`Step ${step.id} screenshot`}
                  borderRadius='md'
                  border='1px solid'
                  borderColor='gray.600'
                  mt={2}
                />
              )}
            </Box>
          ))}

          {testCase.defects.length > 0 && (
            <Box>
              <Text fontWeight='medium' mb={2}>
                Related Defects
              </Text>
              <Table size='sm'>
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Title</Th>
                    <Th>Severity</Th>
                    <Th>Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {testCase.defects.map((defect) => (
                    <Tr key={defect.id}>
                      <Td>{defect.externalId || defect.id}</Td>
                      <Td>{defect.title}</Td>
                      <Td>
                        <Badge
                          colorScheme={
                            defect.severity === 'critical'
                              ? 'red'
                              : defect.severity === 'high'
                              ? 'orange'
                              : defect.severity === 'medium'
                              ? 'yellow'
                              : 'green'
                          }>
                          {defect.severity}
                        </Badge>
                      </Td>
                      <Td>{defect.status}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          )}
        </VStack>
      </Collapse>
    </Box>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='6xl'>
      <ModalOverlay />
      <ModalContent bg='gray.800'>
        <ModalHeader>
          <HStack justify='space-between'>
            <Text>{run.name}</Text>
            <Badge colorScheme={statusColors[run.status]}>{run.status}</Badge>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={6} align='stretch'>
            <SimpleGrid columns={4} spacing={4}>
              <Box p={4} bg='gray.700' borderRadius='md'>
                <Text color='gray.400' fontSize='sm'>
                  Total Tests
                </Text>
                <Text fontSize='2xl' fontWeight='bold'>
                  {run.summary.total}
                </Text>
              </Box>
              <Box p={4} bg='gray.700' borderRadius='md'>
                <Text color='gray.400' fontSize='sm'>
                  Pass Rate
                </Text>
                <Text fontSize='2xl' fontWeight='bold'>
                  {((run.summary.passed / run.summary.total) * 100).toFixed(1)}%
                </Text>
              </Box>
              <Box p={4} bg='gray.700' borderRadius='md'>
                <Text color='gray.400' fontSize='sm'>
                  Duration
                </Text>
                <Text fontSize='2xl' fontWeight='bold'>
                  {run.summary.duration.toFixed(2)}s
                </Text>
              </Box>
              <Box p={4} bg='gray.700' borderRadius='md'>
                <Text color='gray.400' fontSize='sm'>
                  Coverage
                </Text>
                <Text fontSize='2xl' fontWeight='bold'>
                  {run.summary.coverage}%
                </Text>
              </Box>
            </SimpleGrid>

            <Tabs colorScheme='brand'>
              <TabList>
                <Tab>Results</Tab>
                <Tab>Artifacts</Tab>
                <Tab>Comments</Tab>
              </TabList>

              <TabPanels>
                <TabPanel px={0}>
                  <VStack align='stretch' spacing={4}>
                    {run.testCases.map(renderTestCase)}
                  </VStack>
                </TabPanel>

                <TabPanel px={0}>
                  <VStack align='stretch' spacing={6}>
                    <Box>
                      <Text fontWeight='medium' mb={3}>
                        Screenshots
                      </Text>
                      <SimpleGrid columns={3} spacing={4}>
                        {run.artifacts.screenshots.map((screenshot, index) => (
                          <Image
                            key={index}
                            src={screenshot}
                            alt={`Screenshot ${index + 1}`}
                            borderRadius='md'
                            border='1px solid'
                            borderColor='gray.600'
                          />
                        ))}
                      </SimpleGrid>
                    </Box>

                    <Box>
                      <Text fontWeight='medium' mb={3}>
                        Videos
                      </Text>
                      <SimpleGrid columns={2} spacing={4}>
                        {run.artifacts.videos.map((video, index) => (
                          <Box
                            key={index}
                            as='video'
                            controls
                            src={video}
                            borderRadius='md'
                            border='1px solid'
                            borderColor='gray.600'
                          />
                        ))}
                      </SimpleGrid>
                    </Box>

                    <Box>
                      <HStack justify='space-between' mb={3}>
                        <Text fontWeight='medium'>Logs</Text>
                        <Button
                          size='sm'
                          leftIcon={<Terminal size={16} />}
                          variant='ghost'
                          onClick={toggleLogs}>
                          {showLogs ? 'Hide' : 'Show'} Logs
                        </Button>
                      </HStack>
                      <Collapse in={showLogs}>
                        <Code
                          display='block'
                          whiteSpace='pre'
                          p={4}
                          bg='gray.900'
                          borderRadius='md'
                          maxH='400px'
                          overflow='auto'>
                          {run.artifacts.logs.join('\n')}
                        </Code>
                      </Collapse>
                    </Box>
                  </VStack>
                </TabPanel>

                <TabPanel px={0}>
                  <VStack align='stretch' spacing={4}>
                    {/* Comments would go here */}
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>

            <Divider />

            <HStack justify='flex-end' spacing={4}>
              <Button
                leftIcon={<Download size={16} />}
                variant='outline'
                onClick={() => handleExport('pdf')}>
                Export as PDF
              </Button>
              <Button
                leftIcon={<Download size={16} />}
                variant='outline'
                onClick={() => handleExport('excel')}>
                Export as Excel
              </Button>
              <Button
                leftIcon={<Download size={16} />}
                variant='outline'
                onClick={() => handleExport('csv')}>
                Export as CSV
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
