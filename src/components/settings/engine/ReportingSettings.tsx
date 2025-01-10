import {
  VStack,
  SimpleGrid,
  FormControl,
  FormLabel,
  Switch,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  Button,
  Checkbox,
  Stack,
} from '@chakra-ui/react';
import { Save } from 'lucide-react';
import { EngineSettings } from '../../../types/engine';

interface ReportingSettingsProps {
  settings: EngineSettings['reporting'];
  onUpdate: (values: EngineSettings['reporting']) => void;
}

export function ReportingSettings({ settings, onUpdate }: ReportingSettingsProps) {
  return (
    <VStack spacing={6} align='stretch'>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <FormControl display='flex' alignItems='start' justifyContent='space-between'>
          <div>
            <FormLabel mb={0}>Detailed Logs</FormLabel>
            <Text fontSize='sm' color='gray.400'>
              Include detailed execution logs in reports
            </Text>
          </div>
          <Switch
            isChecked={settings.detailedLogs}
            onChange={(e) => onUpdate({ ...settings, detailedLogs: e.target.checked })}
          />
        </FormControl>

        <FormControl display='flex' alignItems='start' justifyContent='space-between'>
          <div>
            <FormLabel mb={0}>Save Artifacts</FormLabel>
            <Text fontSize='sm' color='gray.400'>
              Save test artifacts (screenshots, videos, traces)
            </Text>
          </div>
          <Switch
            isChecked={settings.saveArtifacts}
            onChange={(e) => onUpdate({ ...settings, saveArtifacts: e.target.checked })}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Artifact Retention (days)</FormLabel>
          <NumberInput
            value={settings.artifactRetention}
            onChange={(_, value) => onUpdate({ ...settings, artifactRetention: value })}
            min={1}
            max={90}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl display='flex' alignItems='start' justifyContent='space-between'>
          <div>
            <FormLabel mb={0}>Custom Reports</FormLabel>
            <Text fontSize='sm' color='gray.400'>
              Enable customizable report templates
            </Text>
          </div>
          <Switch
            isChecked={settings.customReports}
            onChange={(e) => onUpdate({ ...settings, customReports: e.target.checked })}
          />
        </FormControl>
      </SimpleGrid>

      <FormControl>
        <FormLabel>Notification Channels</FormLabel>
        <Stack spacing={2}>
          <Checkbox
            isChecked={settings.notificationChannels.includes('email')}
            onChange={(e) => {
              const channels = e.target.checked
                ? ([...settings.notificationChannels, 'email'] as ('email' | 'slack' | 'teams')[])
                : settings.notificationChannels.filter((c) => c !== 'email');
              onUpdate({ ...settings, notificationChannels: channels });
            }}>
            Email
          </Checkbox>
          <Checkbox
            isChecked={settings.notificationChannels.includes('slack')}
            onChange={(e) => {
              const channels = e.target.checked
                ? ([...settings.notificationChannels, 'slack'] as ('email' | 'slack' | 'teams')[])
                : settings.notificationChannels.filter((c) => c !== 'slack');
              onUpdate({ ...settings, notificationChannels: channels });
            }}>
            Slack
          </Checkbox>
          <Checkbox
            isChecked={settings.notificationChannels.includes('teams')}
            onChange={(e) => {
              const channels = e.target.checked
                ? ([...settings.notificationChannels, 'teams'] as ('email' | 'slack' | 'teams')[])
                : settings.notificationChannels.filter((c) => c !== 'teams');
              onUpdate({ ...settings, notificationChannels: channels });
            }}>
            Microsoft Teams
          </Checkbox>
        </Stack>
      </FormControl>

      <Text fontSize='lg' fontWeight='medium' mt={4}>
        Metrics Collection
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <FormControl display='flex' alignItems='start' justifyContent='space-between'>
          <div>
            <FormLabel mb={0}>Performance Metrics</FormLabel>
            <Text fontSize='sm' color='gray.400'>
              Collect test execution performance data
            </Text>
          </div>
          <Switch
            isChecked={settings.metrics.collectPerformanceMetrics}
            onChange={(e) =>
              onUpdate({
                ...settings,
                metrics: { ...settings.metrics, collectPerformanceMetrics: e.target.checked },
              })
            }
          />
        </FormControl>

        <FormControl display='flex' alignItems='start' justifyContent='space-between'>
          <div>
            <FormLabel mb={0}>Coverage Data</FormLabel>
            <Text fontSize='sm' color='gray.400'>
              Track test coverage metrics
            </Text>
          </div>
          <Switch
            isChecked={settings.metrics.collectCoverageData}
            onChange={(e) =>
              onUpdate({
                ...settings,
                metrics: { ...settings.metrics, collectCoverageData: e.target.checked },
              })
            }
          />
        </FormControl>

        <FormControl display='flex' alignItems='start' justifyContent='space-between'>
          <div>
            <FormLabel mb={0}>Flakiness Tracking</FormLabel>
            <Text fontSize='sm' color='gray.400'>
              Monitor and track flaky tests
            </Text>
          </div>
          <Switch
            isChecked={settings.metrics.trackFlakiness}
            onChange={(e) =>
              onUpdate({
                ...settings,
                metrics: { ...settings.metrics, trackFlakiness: e.target.checked },
              })
            }
          />
        </FormControl>

        <FormControl display='flex' alignItems='start' justifyContent='space-between'>
          <div>
            <FormLabel mb={0}>Historical Trends</FormLabel>
            <Text fontSize='sm' color='gray.400'>
              Track historical test performance
            </Text>
          </div>
          <Switch
            isChecked={settings.metrics.historicalTrends}
            onChange={(e) =>
              onUpdate({
                ...settings,
                metrics: { ...settings.metrics, historicalTrends: e.target.checked },
              })
            }
          />
        </FormControl>
      </SimpleGrid>

      <Text fontSize='lg' fontWeight='medium' mt={4}>
        Alert Settings
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <FormControl>
          <FormLabel>Failure Threshold (%)</FormLabel>
          <NumberInput
            value={settings.alerts.failureThreshold}
            onChange={(_, value) =>
              onUpdate({
                ...settings,
                alerts: { ...settings.alerts, failureThreshold: value },
              })
            }
            min={0}
            max={100}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel>Performance Threshold (ms)</FormLabel>
          <NumberInput
            value={settings.alerts.performanceThreshold}
            onChange={(_, value) =>
              onUpdate({
                ...settings,
                alerts: { ...settings.alerts, performanceThreshold: value },
              })
            }
            min={0}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl display='flex' alignItems='start' justifyContent='space-between'>
          <div>
            <FormLabel mb={0}>Threshold Alerts</FormLabel>
            <Text fontSize='sm' color='gray.400'>
              Alert when thresholds are breached
            </Text>
          </div>
          <Switch
            isChecked={settings.alerts.notifyOnThresholdBreached}
            onChange={(e) =>
              onUpdate({
                ...settings,
                alerts: { ...settings.alerts, notifyOnThresholdBreached: e.target.checked },
              })
            }
          />
        </FormControl>

        <FormControl display='flex' alignItems='start' justifyContent='space-between'>
          <div>
            <FormLabel mb={0}>Flaky Test Alerts</FormLabel>
            <Text fontSize='sm' color='gray.400'>
              Alert on flaky test detection
            </Text>
          </div>
          <Switch
            isChecked={settings.alerts.notifyOnFlaky}
            onChange={(e) =>
              onUpdate({
                ...settings,
                alerts: { ...settings.alerts, notifyOnFlaky: e.target.checked },
              })
            }
          />
        </FormControl>
      </SimpleGrid>

      <Button
        leftIcon={<Save size={16} />}
        colorScheme='brand'
        alignSelf='flex-end'
        onClick={() => onUpdate(settings)}>
        Save Reporting Settings
      </Button>
    </VStack>
  );
}
