import {
  VStack,
  FormControl,
  FormLabel,
  Select,
  Input,
  Button,
  HStack,
  Switch,
  SimpleGrid,
  Text,
  useToast,
  Card,
  CardBody,
} from '@chakra-ui/react';
import { Save } from 'lucide-react';
import { useState } from 'react';
import { TestEnvironment, TestPriority } from '../../../types/testRun';

interface ScheduleConfig {
  suiteId: string;
  environment: TestEnvironment;
  priority: TestPriority;
  frequency: 'once' | 'daily' | 'weekly' | 'monthly';
  time: string;
  days?: string[];
  date?: string;
  notifyOnFailure: boolean;
  notifyOnSuccess: boolean;
  recipients: string[];
}

interface TestRunSchedulerProps {
  availableSuites: Array<{ id: string; name: string }>;
  onSchedule: (config: ScheduleConfig) => Promise<void>;
}

export function TestRunScheduler({ availableSuites, onSchedule }: TestRunSchedulerProps) {
  const [config, setConfig] = useState<ScheduleConfig>({
    suiteId: '',
    environment: 'staging',
    priority: 'medium',
    frequency: 'once',
    time: '',
    notifyOnFailure: true,
    notifyOnSuccess: false,
    recipients: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleSubmit = async () => {
    if (!config.suiteId || !config.time) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await onSchedule(config);
      toast({
        title: 'Success',
        description: 'Test run scheduled successfully',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to schedule test run',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardBody>
        <VStack spacing={6} align='stretch'>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <FormControl isRequired>
              <FormLabel>Test Suite</FormLabel>
              <Select
                value={config.suiteId}
                onChange={(e) => setConfig({ ...config, suiteId: e.target.value })}
                placeholder='Select test suite'>
                {availableSuites.map((suite) => (
                  <option key={suite.id} value={suite.id}>
                    {suite.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Environment</FormLabel>
              <Select
                value={config.environment}
                onChange={(e) =>
                  setConfig({ ...config, environment: e.target.value as TestEnvironment })
                }>
                <option value='development'>Development</option>
                <option value='staging'>Staging</option>
                <option value='production'>Production</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Priority</FormLabel>
              <Select
                value={config.priority}
                onChange={(e) =>
                  setConfig({ ...config, priority: e.target.value as TestPriority })
                }>
                <option value='high'>High</option>
                <option value='medium'>Medium</option>
                <option value='low'>Low</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Frequency</FormLabel>
              <Select
                value={config.frequency}
                onChange={(e) =>
                  setConfig({ ...config, frequency: e.target.value as ScheduleConfig['frequency'] })
                }>
                <option value='once'>Once</option>
                <option value='daily'>Daily</option>
                <option value='weekly'>Weekly</option>
                <option value='monthly'>Monthly</option>
              </Select>
            </FormControl>

            {config.frequency === 'once' && (
              <FormControl isRequired>
                <FormLabel>Date</FormLabel>
                <Input
                  type='date'
                  value={config.date || ''}
                  onChange={(e) => setConfig({ ...config, date: e.target.value })}
                />
              </FormControl>
            )}

            {config.frequency === 'weekly' && (
              <FormControl isRequired>
                <FormLabel>Days</FormLabel>
                <Select
                  multiple
                  value={config.days || []}
                  onChange={(e) => {
                    const values = Array.from(e.target.selectedOptions, (option) => option.value);
                    setConfig({ ...config, days: values });
                  }}>
                  <option value='monday'>Monday</option>
                  <option value='tuesday'>Tuesday</option>
                  <option value='wednesday'>Wednesday</option>
                  <option value='thursday'>Thursday</option>
                  <option value='friday'>Friday</option>
                  <option value='saturday'>Saturday</option>
                  <option value='sunday'>Sunday</option>
                </Select>
              </FormControl>
            )}

            <FormControl isRequired>
              <FormLabel>Time</FormLabel>
              <Input
                type='time'
                value={config.time}
                onChange={(e) => setConfig({ ...config, time: e.target.value })}
              />
            </FormControl>
          </SimpleGrid>

          <Text fontWeight='medium' mt={4}>
            Notifications
          </Text>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <FormControl display='flex' alignItems='center' justifyContent='space-between'>
              <FormLabel mb={0}>Notify on Failure</FormLabel>
              <Switch
                isChecked={config.notifyOnFailure}
                onChange={(e) => setConfig({ ...config, notifyOnFailure: e.target.checked })}
              />
            </FormControl>

            <FormControl display='flex' alignItems='center' justifyContent='space-between'>
              <FormLabel mb={0}>Notify on Success</FormLabel>
              <Switch
                isChecked={config.notifyOnSuccess}
                onChange={(e) => setConfig({ ...config, notifyOnSuccess: e.target.checked })}
              />
            </FormControl>

            <FormControl gridColumn='1 / -1'>
              <FormLabel>Recipients</FormLabel>
              <Input
                type='email'
                placeholder='Enter email addresses (comma-separated)'
                value={config.recipients.join(', ')}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    recipients: e.target.value.split(',').map((email) => email.trim()),
                  })
                }
              />
            </FormControl>
          </SimpleGrid>

          <HStack justify='flex-end' spacing={4}>
            <Button
              leftIcon={<Save size={16} />}
              colorScheme='brand'
              onClick={handleSubmit}
              isLoading={isSubmitting}>
              Schedule Test Run
            </Button>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
}
