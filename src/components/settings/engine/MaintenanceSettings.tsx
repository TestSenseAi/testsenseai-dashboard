import {
  VStack,
  SimpleGrid,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Switch,
  Select,
  Input,
  Text,
  Button,
  Divider,
} from '@chakra-ui/react';
import { Save } from 'lucide-react';
import { EngineSettings } from '../../../types/engine';

interface MaintenanceSettingsProps {
  settings: EngineSettings['maintenance'];
  onUpdate: (values: EngineSettings['maintenance']) => void;
}

export function MaintenanceSettings({ settings, onUpdate }: MaintenanceSettingsProps) {
  return (
    <VStack spacing={6} align='stretch'>
      <Text fontSize='lg' fontWeight='medium'>
        Cleanup Settings
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <FormControl>
          <FormLabel>Artifact Retention (days)</FormLabel>
          <NumberInput
            value={settings.cleanup.artifactRetention}
            onChange={(_, value) =>
              onUpdate({
                ...settings,
                cleanup: { ...settings.cleanup, artifactRetention: value },
              })
            }
            min={1}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel>Log Retention (days)</FormLabel>
          <NumberInput
            value={settings.cleanup.logRetention}
            onChange={(_, value) =>
              onUpdate({
                ...settings,
                cleanup: { ...settings.cleanup, logRetention: value },
              })
            }
            min={1}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </SimpleGrid>

      <Divider />

      <Text fontSize='lg' fontWeight='medium'>
        Backup Settings
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <FormControl display='flex' alignItems='center'>
          <FormLabel mb={0}>Enable Backups</FormLabel>
          <Switch
            isChecked={settings.backup.enabled}
            onChange={(e) =>
              onUpdate({
                ...settings,
                backup: { ...settings.backup, enabled: e.target.checked },
              })
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel>Backup Frequency</FormLabel>
          <Select
            value={settings.backup.frequency}
            onChange={(e) =>
              onUpdate({
                ...settings,
                backup: { ...settings.backup, frequency: e.target.value as any },
              })
            }>
            <option value='daily'>Daily</option>
            <option value='weekly'>Weekly</option>
            <option value='monthly'>Monthly</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Backup Location</FormLabel>
          <Input
            value={settings.backup.location}
            onChange={(e) =>
              onUpdate({
                ...settings,
                backup: { ...settings.backup, location: e.target.value },
              })
            }
            placeholder='s3://bucket/backups'
          />
        </FormControl>
      </SimpleGrid>

      <Divider />

      <Text fontSize='lg' fontWeight='medium'>
        Health Monitoring
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <FormControl>
          <FormLabel>Health Check Frequency (minutes)</FormLabel>
          <NumberInput
            value={settings.health.checkFrequency}
            onChange={(_, value) =>
              onUpdate({
                ...settings,
                health: { ...settings.health, checkFrequency: value },
              })
            }
            min={1}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel>Max Memory Usage (MB)</FormLabel>
          <NumberInput
            value={settings.health.maxMemoryUsage}
            onChange={(_, value) =>
              onUpdate({
                ...settings,
                health: { ...settings.health, maxMemoryUsage: value },
              })
            }
            min={512}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl display='flex' alignItems='center'>
          <FormLabel mb={0}>Auto Restart on Issues</FormLabel>
          <Switch
            isChecked={settings.health.autoRestart}
            onChange={(e) =>
              onUpdate({
                ...settings,
                health: { ...settings.health, autoRestart: e.target.checked },
              })
            }
          />
        </FormControl>

        <FormControl display='flex' alignItems='center'>
          <FormLabel mb={0}>Alert on Health Issues</FormLabel>
          <Switch
            isChecked={settings.health.alertOnIssues}
            onChange={(e) =>
              onUpdate({
                ...settings,
                health: { ...settings.health, alertOnIssues: e.target.checked },
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
        Save Maintenance Settings
      </Button>
    </VStack>
  );
}
