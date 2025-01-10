import {
  VStack,
  FormControl,
  FormLabel,
  Switch,
  Select,
  Input,
  Button,
  Text,
  SimpleGrid,
  Tag,
  TagLabel,
  TagCloseButton,
  HStack,
} from '@chakra-ui/react';
import { Save, Plus } from 'lucide-react';
import { useState } from 'react';
import { EngineSettings } from '../../../types/engine';

interface SecuritySettingsProps {
  settings: EngineSettings['integrations']['security'];
  onUpdate: (values: EngineSettings['integrations']['security']) => void;
}

export function SecuritySettings({ settings, onUpdate }: SecuritySettingsProps) {
  const [newPattern, setNewPattern] = useState('');

  const handleAddPattern = () => {
    if (newPattern && !settings.excludePatterns.includes(newPattern)) {
      onUpdate({
        ...settings,
        excludePatterns: [...settings.excludePatterns, newPattern],
      });
      setNewPattern('');
    }
  };

  const handleRemovePattern = (pattern: string) => {
    onUpdate({
      ...settings,
      excludePatterns: settings.excludePatterns.filter((p) => p !== pattern),
    });
  };

  return (
    <VStack spacing={6} align='stretch'>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <FormControl display='flex' alignItems='center'>
          <FormLabel mb={0}>Enable Security Scanning</FormLabel>
          <Switch
            isChecked={settings.enabled}
            onChange={(e) => onUpdate({ ...settings, enabled: e.target.checked })}
          />
        </FormControl>

        <FormControl display='flex' alignItems='center'>
          <FormLabel mb={0}>Scan Dependencies</FormLabel>
          <Switch
            isChecked={settings.scanDependencies}
            onChange={(e) => onUpdate({ ...settings, scanDependencies: e.target.checked })}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Vulnerability Threshold</FormLabel>
          <Select
            value={settings.vulnerabilityThreshold}
            onChange={(e) =>
              onUpdate({
                ...settings,
                vulnerabilityThreshold: e.target.value as 'low' | 'medium' | 'high',
              })
            }>
            <option value='low'>Low</option>
            <option value='medium'>Medium</option>
            <option value='high'>High</option>
          </Select>
        </FormControl>

        <FormControl display='flex' alignItems='center'>
          <FormLabel mb={0}>Auto-fix Vulnerabilities</FormLabel>
          <Switch
            isChecked={settings.autoFix}
            onChange={(e) => onUpdate({ ...settings, autoFix: e.target.checked })}
          />
        </FormControl>
      </SimpleGrid>

      <VStack align='stretch' spacing={3}>
        <Text fontWeight='medium'>Exclude Patterns</Text>
        <HStack>
          <Input
            value={newPattern}
            onChange={(e) => setNewPattern(e.target.value)}
            placeholder='Enter pattern to exclude'
          />
          <Button leftIcon={<Plus size={16} />} onClick={handleAddPattern} isDisabled={!newPattern}>
            Add
          </Button>
        </HStack>
        <HStack wrap='wrap' spacing={2}>
          {settings.excludePatterns.map((pattern) => (
            <Tag key={pattern} size='md' borderRadius='full' variant='solid'>
              <TagLabel>{pattern}</TagLabel>
              <TagCloseButton onClick={() => handleRemovePattern(pattern)} />
            </Tag>
          ))}
        </HStack>
      </VStack>

      <Button
        leftIcon={<Save size={16} />}
        colorScheme='brand'
        alignSelf='flex-end'
        onClick={() => onUpdate(settings)}>
        Save Security Settings
      </Button>
    </VStack>
  );
}
