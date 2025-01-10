import { Box, FormControl, FormLabel, Switch, Text, VStack } from '@chakra-ui/react';
import { useTeamSettings } from '../../../../hooks/useTeamSettings';

export function AccessControl() {
  const { settings, updateSetting } = useTeamSettings();

  return (
    <VStack spacing={4} align='stretch'>
      <FormControl display='flex' alignItems='center' justifyContent='space-between'>
        <Box>
          <FormLabel mb={0}>IP Restrictions</FormLabel>
          <Text fontSize='sm' color='gray.400'>
            Limit access to specific IP ranges
          </Text>
        </Box>
        <Switch
          isChecked={settings.ipRestrictions}
          onChange={(e) => updateSetting('ipRestrictions', e.target.checked)}
          colorScheme='brand'
        />
      </FormControl>

      <FormControl display='flex' alignItems='center' justifyContent='space-between'>
        <Box>
          <FormLabel mb={0}>Device Management</FormLabel>
          <Text fontSize='sm' color='gray.400'>
            Track and manage authorized devices
          </Text>
        </Box>
        <Switch
          isChecked={settings.deviceManagement}
          onChange={(e) => updateSetting('deviceManagement', e.target.checked)}
          colorScheme='brand'
        />
      </FormControl>
    </VStack>
  );
}
