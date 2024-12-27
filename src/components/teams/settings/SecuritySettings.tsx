import { Box, Heading, FormControl, FormLabel, Switch, VStack, Text } from '@chakra-ui/react';
import { useTeamSettings } from '../../../hooks/useTeamSettings';

export function SecuritySettings() {
  const { settings, updateSetting } = useTeamSettings();

  return (
    <Box>
      <Heading size='sm' mb={4}>
        Security Settings
      </Heading>
      <VStack spacing={4} align='stretch'>
        <FormControl display='flex' alignItems='center' justifyContent='space-between'>
          <Box>
            <FormLabel mb={0}>Two-Factor Authentication</FormLabel>
            <Text fontSize='sm' color='gray.400'>
              Require 2FA for all team members
            </Text>
          </Box>
          <Switch
            isChecked={settings.require2FA}
            onChange={(e) => updateSetting('require2FA', e.target.checked)}
            colorScheme='brand'
          />
        </FormControl>

        <FormControl display='flex' alignItems='center' justifyContent='space-between'>
          <Box>
            <FormLabel mb={0}>Single Sign-On</FormLabel>
            <Text fontSize='sm' color='gray.400'>
              Enable SSO authentication
            </Text>
          </Box>
          <Switch
            isChecked={settings.ssoEnabled}
            onChange={(e) => updateSetting('ssoEnabled', e.target.checked)}
            colorScheme='brand'
          />
        </FormControl>
      </VStack>
    </Box>
  );
}
