import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Button,
  Progress,
  Card,
  CardBody,
  Icon,
  Collapse,
  Code,
  useDisclosure,
  SimpleGrid,
} from '@chakra-ui/react';
import {
  Play,
  Pause,
  StopCircle,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  Terminal,
  Camera,
  Bug,
} from 'lucide-react';
import { useState } from 'react';
import { TestResult, TestStatus } from '../../types/test';

interface TestExecutionPanelProps {
  testCase: {
    id: string;
    name: string;
    type: string;
    steps: Array<{ id: string; action: string }>;
  };
  onStart: () => void;
  onStop: () => void;
  onRetry: () => void;
  isRunning: boolean;
  result?: TestResult;
}

const statusColors: Record<TestStatus, string> = {
  pending: 'gray',
  running: 'blue',
  passed: 'green',
  failed: 'red',
};

const statusIcons: Record<TestStatus, any> = {
  pending: Clock,
  running: RefreshCw,
  passed: CheckCircle,
  failed: XCircle,
};

export function TestExecutionPanel({
  testCase,
  onStart,
  onStop,
  onRetry,
  isRunning,
  result,
}: TestExecutionPanelProps) {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);
  const { isOpen: showLogs, onToggle: toggleLogs } = useDisclosure();

  return (
    <Box>
      <VStack spacing={6} align='stretch'>
        <Card>
          <CardBody>
            <VStack spacing={4} align='stretch'>
              <HStack justify='space-between'>
                <HStack>
                  <Icon
                    as={result ? statusIcons[result.status] : Clock}
                    color={`${result ? statusColors[result.status] : 'gray'}.400`}
                  />
                  <Text fontSize='lg' fontWeight='medium'>
                    {testCase.name}
                  </Text>
                </HStack>
                {result && <Badge colorScheme={statusColors[result.status]}>{result.status}</Badge>}
              </HStack>

              {isRunning && (
                <Box>
                  <Text fontSize='sm' color='gray.400' mb={2}>
                    Test Progress
                  </Text>
                  <Progress isIndeterminate colorScheme='blue' size='sm' borderRadius='full' />
                </Box>
              )}

              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                <StatCard
                  icon={Clock}
                  label='Duration'
                  value={result?.duration ? `${result.duration.toFixed(2)}s` : '-'}
                />
                <StatCard
                  icon={Bug}
                  label='Assertions'
                  value={
                    result?.assertions
                      ? `${result.assertions.passed}/${result.assertions.total}`
                      : '-'
                  }
                  status={
                    result?.assertions?.passed === result?.assertions?.total ? 'success' : 'error'
                  }
                />
                <StatCard
                  icon={Camera}
                  label='Screenshots'
                  value={result?.screenshots?.length.toString() || '0'}
                />
              </SimpleGrid>

              <HStack spacing={4}>
                {!isRunning ? (
                  <Button leftIcon={<Play size={16} />} colorScheme='brand' onClick={onStart}>
                    Run Test
                  </Button>
                ) : (
                  <>
                    <Button leftIcon={<Pause size={16} />} variant='outline' onClick={onStop}>
                      Pause
                    </Button>
                    <Button
                      leftIcon={<StopCircle size={16} />}
                      colorScheme='red'
                      variant='ghost'
                      onClick={onStop}>
                      Stop
                    </Button>
                  </>
                )}
                {result && result.status === 'failed' && (
                  <Button leftIcon={<RefreshCw size={16} />} variant='outline' onClick={onRetry}>
                    Retry
                  </Button>
                )}
              </HStack>
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <VStack spacing={4} align='stretch'>
              <Text fontWeight='medium'>Test Steps</Text>
              {testCase.steps.map((step, index) => (
                <Box key={step.id}>
                  <HStack
                    justify='space-between'
                    cursor='pointer'
                    onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}>
                    <HStack>
                      <Icon
                        as={expandedStep === step.id ? ChevronDown : ChevronRight}
                        color='gray.400'
                      />
                      <Badge mr={2}>{index + 1}</Badge>
                      <Text>{step.action}</Text>
                    </HStack>
                    {result?.stepResults?.[step.id] && (
                      <Badge colorScheme={result.stepResults[step.id].passed ? 'green' : 'red'}>
                        {result.stepResults[step.id].passed ? 'Passed' : 'Failed'}
                      </Badge>
                    )}
                  </HStack>

                  <Collapse in={expandedStep === step.id}>
                    <Box pl={10} mt={2}>
                      {result?.stepResults?.[step.id]?.error && (
                        <Box bg='red.900' p={3} borderRadius='md' fontSize='sm' mb={2}>
                          <Text color='red.200'>{result.stepResults[step.id].error}</Text>
                        </Box>
                      )}
                      {result?.stepResults?.[step.id]?.screenshot && (
                        <Box
                          borderWidth={1}
                          borderColor='gray.600'
                          borderRadius='md'
                          overflow='hidden'>
                          <img
                            src={result.stepResults[step.id].screenshot}
                            alt={`Step ${index + 1} screenshot`}
                            style={{ width: '100%' }}
                          />
                        </Box>
                      )}
                    </Box>
                  </Collapse>
                </Box>
              ))}
            </VStack>
          </CardBody>
        </Card>

        {result?.logs && (
          <Card>
            <CardBody>
              <VStack spacing={4} align='stretch'>
                <HStack justify='space-between'>
                  <Text fontWeight='medium'>Execution Logs</Text>
                  <Button
                    leftIcon={<Terminal size={16} />}
                    variant='ghost'
                    size='sm'
                    onClick={toggleLogs}>
                    {showLogs ? 'Hide' : 'Show'} Logs
                  </Button>
                </HStack>

                <Collapse in={showLogs}>
                  <Box bg='gray.700' p={4} borderRadius='md' maxH='400px' overflow='auto'>
                    <Code whiteSpace='pre-wrap' display='block'>
                      {result.logs}
                    </Code>
                  </Box>
                </Collapse>
              </VStack>
            </CardBody>
          </Card>
        )}
      </VStack>
    </Box>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  status,
}: {
  icon: any;
  label: string;
  value: string;
  status?: 'success' | 'error';
}) {
  return (
    <HStack
      spacing={3}
      p={3}
      bg='gray.700'
      borderRadius='md'
      borderWidth={1}
      borderColor={
        status === 'success' ? 'green.500' : status === 'error' ? 'red.500' : 'gray.600'
      }>
      <Icon size={20} />
      <Box>
        <Text fontSize='sm' color='gray.400'>
          {label}
        </Text>
        <Text fontSize='lg' fontWeight='medium'>
          {value}
        </Text>
      </Box>
    </HStack>
  );
}
