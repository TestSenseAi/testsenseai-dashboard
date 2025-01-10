import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import { Save } from 'lucide-react';
import { OrganizationSettings } from '../../../types/organization';

interface GeneralSettingsProps {
  settings: OrganizationSettings['general'];
  onUpdate: (settings: OrganizationSettings['general']) => void;
}

export function GeneralSettings({ settings, onUpdate }: GeneralSettingsProps) {
  const toast = useToast();

  const handleSave = () => {
    onUpdate(settings);
    toast({
      title: 'Success',
      description: 'Organization settings updated successfully',
      status: 'success',
      duration: 3000,
    });
  };

  return (
    <VStack spacing={6} align='stretch'>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <FormControl>
          <FormLabel>Default Timezone</FormLabel>
          <Select
            value={settings.defaultTimezone}
            onChange={(e) => onUpdate({ ...settings, defaultTimezone: e.target.value })}>
            <option value='UTC'>UTC</option>
            <option value='America/New_York'>Eastern Time</option>
            <option value='America/Los_Angeles'>Pacific Time</option>
            <option value='Europe/London'>London</option>
            <option value='Asia/Tokyo'>Tokyo</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Date Format</FormLabel>
          <Select
            value={settings.dateFormat}
            onChange={(e) => onUpdate({ ...settings, dateFormat: e.target.value })}>
            <option value='MM/DD/YYYY'>MM/DD/YYYY</option>
            <option value='DD/MM/YYYY'>DD/MM/YYYY</option>
            <option value='YYYY-MM-DD'>YYYY-MM-DD</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Language</FormLabel>
          <Select
            value={settings.language}
            onChange={(e) => onUpdate({ ...settings, language: e.target.value })}>
            <option value='en'>English</option>
            <option value='es'>Spanish</option>
            <option value='fr'>French</option>
            <option value='de'>German</option>
            <option value='ja'>Japanese</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Notification Email</FormLabel>
          <Input
            type='email'
            value={settings.notificationEmail}
            onChange={(e) => onUpdate({ ...settings, notificationEmail: e.target.value })}
            placeholder='notifications@company.com'
          />
        </FormControl>
      </SimpleGrid>

      <Button
        leftIcon={<Save size={16} />}
        colorScheme='brand'
        alignSelf='flex-end'
        onClick={handleSave}>
        Save General Settings
      </Button>
    </VStack>
  );
}
