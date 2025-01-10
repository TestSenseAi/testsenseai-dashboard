import {
  VStack,
  FormControl,
  FormLabel,
  Select,
  Switch,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  SimpleGrid,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Save } from 'lucide-react';
import { OrganizationSettings } from '../../../types/organization';

interface ProjectSettingsProps {
  settings: OrganizationSettings['projects'];
  onUpdate: (settings: OrganizationSettings['projects']) => void;
}

export function ProjectSettings({ settings, onUpdate }: ProjectSettingsProps) {
  const toast = useToast();

  const handleSave = () => {
    onUpdate(settings);
    toast({
      title: 'Success',
      description: 'Project settings updated successfully',
      status: 'success',
      duration: 3000,
    });
  };

  return (
    <VStack spacing={6} align='stretch'>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <FormControl>
          <FormLabel>Default Project Visibility</FormLabel>
          <Select
            value={settings.defaultVisibility}
            onChange={(e) =>
              onUpdate({
                ...settings,
                defaultVisibility: e.target.value as 'private' | 'internal' | 'public',
              })
            }>
            <option value='private'>Private</option>
            <option value='internal'>Internal</option>
            <option value='public'>Public</option>
          </Select>
        </FormControl>

        <FormControl display='flex' alignItems='start' justifyContent='space-between'>
          <div>
            <FormLabel mb={0}>Require Approval</FormLabel>
            <Text fontSize='sm' color='gray.400'>
              Require admin approval for new projects
            </Text>
          </div>
          <Switch
            isChecked={settings.requireApproval}
            onChange={(e) => onUpdate({ ...settings, requireApproval: e.target.checked })}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Maximum Projects</FormLabel>
          <NumberInput
            value={settings.maxProjects}
            onChange={(_, value) => onUpdate({ ...settings, maxProjects: value })}
            min={1}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel>Auto-archive After (days)</FormLabel>
          <NumberInput
            value={settings.archiveAfterDays}
            onChange={(_, value) => onUpdate({ ...settings, archiveAfterDays: value })}
            min={30}>
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
        onClick={handleSave}>
        Save Project Settings
      </Button>
    </VStack>
  );
}
