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
  Select,
  Text,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';
import { Save } from 'lucide-react';
import { EngineSettings } from '../../../types/engine';

interface AISettingsProps {
  settings: EngineSettings['ai'];
  onUpdate: (values: EngineSettings['ai']) => void;
}

export function AISettings({ settings, onUpdate }: AISettingsProps) {
  return (
    <VStack spacing={6} align='stretch'>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <FormControl display='flex' alignItems='start' justifyContent='space-between'>
          <div>
            <FormLabel mb={0}>Enable AI Features</FormLabel>
            <Text fontSize='sm' color='gray.400'>
              Use AI for test maintenance and optimization
            </Text>
          </div>
          <Switch
            isChecked={settings.enabled}
            onChange={(e) => onUpdate({ ...settings, enabled: e.target.checked })}
          />
        </FormControl>

        <FormControl display='flex' alignItems='start' justifyContent='space-between'>
          <div>
            <FormLabel mb={0}>Auto-repair Tests</FormLabel>
            <Text fontSize='sm' color='gray.400'>
              Automatically fix broken selectors and test flows
            </Text>
          </div>
          <Switch
            isChecked={settings.autoRepair}
            onChange={(e) => onUpdate({ ...settings, autoRepair: e.target.checked })}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Suggestion Confidence</FormLabel>
          <Slider
            value={settings.suggestionConfidence * 100}
            onChange={(value) => onUpdate({ ...settings, suggestionConfidence: value / 100 })}
            min={0}
            max={100}
            step={1}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Text fontSize='sm' color='gray.400' mt={1}>
            Minimum confidence level for AI suggestions (
            {Math.round(settings.suggestionConfidence * 100)}%)
          </Text>
        </FormControl>

        <FormControl>
          <FormLabel>Max Suggestions</FormLabel>
          <NumberInput
            value={settings.maxSuggestionsPerRun}
            onChange={(_, value) => onUpdate({ ...settings, maxSuggestionsPerRun: value })}
            min={1}
            max={20}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Text fontSize='sm' color='gray.400' mt={1}>
            Maximum number of suggestions per test run
          </Text>
        </FormControl>
      </SimpleGrid>

      <Text fontSize='lg' fontWeight='medium' mt={4}>
        AI Features
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <FormControl display='flex' alignItems='start' justifyContent='space-between'>
          <div>
            <FormLabel mb={0}>Selector Maintenance</FormLabel>
            <Text fontSize='sm' color='gray.400'>
              AI-powered selector updates and maintenance
            </Text>
          </div>
          <Switch
            isChecked={settings.features.selectorMaintenance}
            onChange={(e) =>
              onUpdate({
                ...settings,
                features: { ...settings.features, selectorMaintenance: e.target.checked },
              })
            }
          />
        </FormControl>

        <FormControl display='flex' alignItems='start' justifyContent='space-between'>
          <div>
            <FormLabel mb={0}>Test Generation</FormLabel>
            <Text fontSize='sm' color='gray.400'>
              Generate test cases from user flows
            </Text>
          </div>
          <Switch
            isChecked={settings.features.testGeneration}
            onChange={(e) =>
              onUpdate({
                ...settings,
                features: { ...settings.features, testGeneration: e.target.checked },
              })
            }
          />
        </FormControl>

        <FormControl display='flex' alignItems='start' justifyContent='space-between'>
          <div>
            <FormLabel mb={0}>Visual Validation</FormLabel>
            <Text fontSize='sm' color='gray.400'>
              AI-powered visual regression testing
            </Text>
          </div>
          <Switch
            isChecked={settings.features.visualValidation}
            onChange={(e) =>
              onUpdate({
                ...settings,
                features: { ...settings.features, visualValidation: e.target.checked },
              })
            }
          />
        </FormControl>

        <FormControl display='flex' alignItems='start' justifyContent='space-between'>
          <div>
            <FormLabel mb={0}>Performance Analysis</FormLabel>
            <Text fontSize='sm' color='gray.400'>
              AI insights for performance optimization
            </Text>
          </div>
          <Switch
            isChecked={settings.features.performanceAnalysis}
            onChange={(e) =>
              onUpdate({
                ...settings,
                features: { ...settings.features, performanceAnalysis: e.target.checked },
              })
            }
          />
        </FormControl>
      </SimpleGrid>

      <Text fontSize='lg' fontWeight='medium' mt={4}>
        Model Training
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <FormControl display='flex' alignItems='start' justifyContent='space-between'>
          <div>
            <FormLabel mb={0}>Learning Mode</FormLabel>
            <Text fontSize='sm' color='gray.400'>
              Learn from test execution data
            </Text>
          </div>
          <Switch
            isChecked={settings.learningEnabled}
            onChange={(e) => onUpdate({ ...settings, learningEnabled: e.target.checked })}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Model Update Frequency</FormLabel>
          <Select
            value={settings.training.modelUpdateFrequency}
            onChange={(e) =>
              onUpdate({
                ...settings,
                training: { ...settings.training, modelUpdateFrequency: e.target.value as any },
              })
            }>
            <option value='daily'>Daily</option>
            <option value='weekly'>Weekly</option>
            <option value='monthly'>Monthly</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Data Retention (days)</FormLabel>
          <NumberInput
            value={settings.training.dataRetentionPeriod}
            onChange={(_, value) =>
              onUpdate({
                ...settings,
                training: { ...settings.training, dataRetentionPeriod: value },
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

      <Button
        leftIcon={<Save size={16} />}
        colorScheme='brand'
        alignSelf='flex-end'
        onClick={() => onUpdate(settings)}>
        Save AI Settings
      </Button>
    </VStack>
  );
}
