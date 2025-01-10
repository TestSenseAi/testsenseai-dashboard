import {
  VStack,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Switch,
  Select,
  Text,
  Button,
  SimpleGrid,
} from '@chakra-ui/react';
import { Save } from 'lucide-react';
import { EngineSettings, Browser } from '../../../types/engine';

interface ExecutionSettingsProps {
  settings: EngineSettings['execution'];
  onUpdate: (values: EngineSettings['execution']) => void;
}

export function ExecutionSettings({ settings, onUpdate }: ExecutionSettingsProps) {
  const handleBrowserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value as Browser
    );
    onUpdate({ ...settings, browsers: selectedOptions });
  };

  return (
    <VStack spacing={6} align='stretch'>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <FormControl>
          <FormLabel>Max Parallel Tests</FormLabel>
          <NumberInput
            value={settings.maxParallelTests}
            onChange={(_, value) => onUpdate({ ...settings, maxParallelTests: value })}
            min={1}
            max={10}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Text fontSize='sm' color='gray.400' mt={1}>
            Maximum number of tests to run in parallel
          </Text>
        </FormControl>

        <FormControl>
          <FormLabel>Default Timeout (ms)</FormLabel>
          <NumberInput
            value={settings.defaultTimeout}
            onChange={(_, value) => onUpdate({ ...settings, defaultTimeout: value })}
            min={1000}
            step={1000}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel>Retry Count</FormLabel>
          <NumberInput
            value={settings.retryCount}
            onChange={(_, value) => onUpdate({ ...settings, retryCount: value })}
            min={0}
            max={5}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel>Browsers</FormLabel>
          <Select
            multiple
            value={settings.browsers}
            onChange={handleBrowserChange}
            size='md'
            height='auto'>
            <option value='chromium'>Chromium</option>
            <option value='firefox'>Firefox</option>
            <option value='webkit'>WebKit</option>
          </Select>
        </FormControl>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <FormControl display='flex' alignItems='center'>
          <FormLabel mb={0}>Screenshot on Failure</FormLabel>
          <Switch
            isChecked={settings.screenshotOnFailure}
            onChange={(e) => onUpdate({ ...settings, screenshotOnFailure: e.target.checked })}
          />
        </FormControl>

        <FormControl display='flex' alignItems='center'>
          <FormLabel mb={0}>Video Recording</FormLabel>
          <Switch
            isChecked={settings.videoRecording}
            onChange={(e) => onUpdate({ ...settings, videoRecording: e.target.checked })}
          />
        </FormControl>

        <FormControl display='flex' alignItems='center'>
          <FormLabel mb={0}>Trace Enabled</FormLabel>
          <Switch
            isChecked={settings.traceEnabled}
            onChange={(e) => onUpdate({ ...settings, traceEnabled: e.target.checked })}
          />
        </FormControl>
      </SimpleGrid>

      <Button
        leftIcon={<Save size={16} />}
        colorScheme='brand'
        alignSelf='flex-end'
        onClick={() => onUpdate(settings)}>
        Save Execution Settings
      </Button>
    </VStack>
  );
}
