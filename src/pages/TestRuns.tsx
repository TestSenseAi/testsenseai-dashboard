import {
  Container,
  VStack,
  Button,
  HStack,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { PageTransition } from '../components/common/PageTransition';
import { TestRunList } from '../components/testing/runs/TestRunList';
import { TestRunMetrics } from '../components/testing/runs/TestRunMetrics';
import { TestRunComparison } from '../components/testing/runs/TestRunComparison';
import { TestRunScheduler } from '../components/testing/runs/TestRunScheduler';
import { useTestRuns } from '../hooks/useTestRuns';
import { LoadingState } from '../components/common/LoadingState';

export default function TestRuns() {
  const { runs, metrics, loading, scheduleRun, stopRun } = useTestRuns();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleRunTest = async (runId: string) => {
    try {
      // Implementation
      toast({
        id: runId,
        title: 'Test Run Started',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        id: runId,
        title: 'Error',
        description: 'Failed to start test run',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleStopRun = async (runId: string) => {
    try {
      await stopRun(runId);
      toast({
        id: runId,
        title: 'Test Run Stopped',
        status: 'info',
        duration: 3000,
      });
    } catch (error) {
      toast({
        id: runId,
        title: 'Error',
        description: 'Failed to stop test run',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleSchedule = async (config: any) => {
    try {
      await scheduleRun(config);
      onClose();
      toast({
        id: 'schedule-success',
        title: 'Success',
        description: 'Test run scheduled successfully',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        id: 'schedule-error',
        title: 'Error',
        description: 'Failed to schedule test run',
        status: 'error',
        duration: 3000,
      });
    }
  };

  if (loading) {
    return <LoadingState message='Loading test runs...' />;
  }

  return (
    <PageTransition>
      <Container maxW='container.xl' py={8}>
        <VStack spacing={8} align='stretch'>
          <PageHeader
            title='Test Runs'
            description='View and manage test executions'
            action={
              <HStack spacing={4}>
                <Button leftIcon={<Plus size={20} />} colorScheme='brand' onClick={onOpen}>
                  Schedule Run
                </Button>
              </HStack>
            }
          />

          <Tabs colorScheme='brand' isLazy>
            <TabList>
              <Tab>Test Runs</Tab>
              <Tab>Metrics</Tab>
              <Tab>Comparison</Tab>
            </TabList>

            <TabPanels>
              <TabPanel px={0}>
                <TestRunList runs={runs} onRunTest={handleRunTest} onStopRun={handleStopRun} />
              </TabPanel>

              <TabPanel px={0}>{metrics && <TestRunMetrics metrics={metrics} />}</TabPanel>

              <TabPanel px={0}>
                <TestRunComparison runs={runs} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>

        <Modal isOpen={isOpen} onClose={onClose} size='xl'>
          <ModalOverlay />
          <ModalContent bg='gray.800'>
            <ModalHeader>Schedule Test Run</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <TestRunScheduler
                availableSuites={[
                  { id: '1', name: 'Regression Suite' },
                  { id: '2', name: 'Smoke Tests' },
                  { id: '3', name: 'API Tests' },
                ]}
                onSchedule={handleSchedule}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Container>
    </PageTransition>
  );
}
