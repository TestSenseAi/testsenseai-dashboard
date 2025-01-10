import {
  VStack,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Switch,
  HStack,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { Save, Plus, Trash } from 'lucide-react';
import { useState } from 'react';
import { EngineSettings } from '../../../types/engine';

interface EnvironmentSettingsProps {
  settings: EngineSettings['environment'];
  onUpdate: (values: EngineSettings['environment']) => void;
}

interface EnvironmentVariableEditorProps {
  variables: Record<string, string>;
  onChange: (variables: Record<string, string>) => void;
  isSecret?: boolean;
}

function EnvironmentVariableEditor({
  variables,
  onChange,
  isSecret,
}: EnvironmentVariableEditorProps) {
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  const handleAdd = () => {
    if (newKey && newValue) {
      onChange({ ...variables, [newKey]: newValue });
      setNewKey('');
      setNewValue('');
    }
  };

  const handleRemove = (key: string) => {
    const { [key]: _, ...rest } = variables;
    onChange(rest);
  };

  return (
    <VStack spacing={4} align='stretch'>
      <SimpleGrid columns={3} spacing={4}>
        <Input
          placeholder='Variable name'
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
        />
        <Input
          placeholder='Value'
          type={isSecret ? 'password' : 'text'}
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <IconButton
          icon={<Plus size={16} />}
          aria-label='Add variable'
          onClick={handleAdd}
          isDisabled={!newKey || !newValue}
        />
      </SimpleGrid>

      {Object.entries(variables).map(([key, value]) => (
        <HStack key={key} spacing={4}>
          <Text flex={1}>{key}</Text>
          <Input
            flex={1}
            type={isSecret ? 'password' : 'text'}
            value={value}
            onChange={(e) => onChange({ ...variables, [key]: e.target.value })}
          />
          <IconButton
            icon={<Trash size={16} />}
            aria-label='Remove variable'
            onClick={() => handleRemove(key)}
            variant='ghost'
            colorScheme='red'
          />
        </HStack>
      ))}
    </VStack>
  );
}

export function EnvironmentSettings({ settings, onUpdate }: EnvironmentSettingsProps) {
  const toast = useToast();

  const handleSave = () => {
    onUpdate(settings);
    toast({
      title: 'Success',
      description: 'Environment settings updated successfully',
      status: 'success',
      duration: 3000,
    });
  };

  return (
    <VStack spacing={6} align='stretch'>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <FormControl>
          <FormLabel>Base URL</FormLabel>
          <Input
            value={settings.baseUrl}
            onChange={(e) => onUpdate({ ...settings, baseUrl: e.target.value })}
            placeholder='https://example.com'
          />
        </FormControl>

        <FormControl>
          <FormLabel>API Endpoint</FormLabel>
          <Input
            value={settings.apiEndpoint}
            onChange={(e) => onUpdate({ ...settings, apiEndpoint: e.target.value })}
            placeholder='https://api.example.com'
          />
        </FormControl>
      </SimpleGrid>

      <Text fontSize='lg' fontWeight='medium' mt={4}>
        Environment Variables
      </Text>
      <EnvironmentVariableEditor
        variables={settings.variables}
        onChange={(variables) => onUpdate({ ...settings, variables })}
      />

      <Text fontSize='lg' fontWeight='medium' mt={4}>
        Secrets
      </Text>
      <EnvironmentVariableEditor
        variables={settings.secrets}
        onChange={(secrets) => onUpdate({ ...settings, secrets })}
        isSecret
      />

      <Text fontSize='lg' fontWeight='medium' mt={4}>
        Stage Configuration
      </Text>
      <Tabs colorScheme='brand'>
        <TabList>
          <Tab>Development</Tab>
          <Tab>Staging</Tab>
          <Tab>Production</Tab>
        </TabList>

        <TabPanels>
          {['dev', 'staging', 'prod'].map((stage) => (
            <TabPanel key={stage} px={0}>
              <VStack spacing={4} align='stretch'>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <FormControl>
                    <FormLabel>URL</FormLabel>
                    <Input
                      value={settings.stages[stage as keyof typeof settings.stages].url}
                      onChange={(e) =>
                        onUpdate({
                          ...settings,
                          stages: {
                            ...settings.stages,
                            [stage]: {
                              ...settings.stages[stage as keyof typeof settings.stages],
                              url: e.target.value,
                            },
                          },
                        })
                      }
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>API URL</FormLabel>
                    <Input
                      value={settings.stages[stage as keyof typeof settings.stages].apiUrl}
                      onChange={(e) =>
                        onUpdate({
                          ...settings,
                          stages: {
                            ...settings.stages,
                            [stage]: {
                              ...settings.stages[stage as keyof typeof settings.stages],
                              apiUrl: e.target.value,
                            },
                          },
                        })
                      }
                    />
                  </FormControl>
                </SimpleGrid>

                <Text fontWeight='medium'>Stage Variables</Text>
                <EnvironmentVariableEditor
                  variables={settings.stages[stage as keyof typeof settings.stages].variables}
                  onChange={(variables) =>
                    onUpdate({
                      ...settings,
                      stages: {
                        ...settings.stages,
                        [stage]: {
                          ...settings.stages[stage as keyof typeof settings.stages],
                          variables,
                        },
                      },
                    })
                  }
                />
              </VStack>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>

      <Text fontSize='lg' fontWeight='medium' mt={4}>
        Proxy Settings
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <FormControl display='flex' alignItems='start' justifyContent='space-between'>
          <div>
            <FormLabel mb={0}>Enable Proxy</FormLabel>
            <Text fontSize='sm' color='gray.400'>
              Use proxy for test execution
            </Text>
          </div>
          <Switch
            isChecked={settings.proxy.enabled}
            onChange={(e) =>
              onUpdate({
                ...settings,
                proxy: { ...settings.proxy, enabled: e.target.checked },
              })
            }
          />
        </FormControl>

        {settings.proxy.enabled && (
          <>
            <FormControl>
              <FormLabel>Proxy URL</FormLabel>
              <Input
                value={settings.proxy.url}
                onChange={(e) =>
                  onUpdate({
                    ...settings,
                    proxy: { ...settings.proxy, url: e.target.value },
                  })
                }
                placeholder='http://proxy.example.com:8080'
              />
            </FormControl>

            <FormControl>
              <FormLabel>Proxy Username</FormLabel>
              <Input
                value={settings.proxy.auth?.username}
                onChange={(e) =>
                  onUpdate({
                    ...settings,
                    proxy: {
                      ...settings.proxy,
                      auth: {
                        username: e.target.value,
                        password: settings.proxy.auth?.password || '',
                      },
                    },
                  })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel>Proxy Password</FormLabel>
              <Input
                type='password'
                value={settings.proxy.auth?.password}
                onChange={(e) =>
                  onUpdate({
                    ...settings,
                    proxy: {
                      ...settings.proxy,
                      auth: {
                        username: settings.proxy.auth?.username || '',
                        password: e.target.value,
                      },
                    },
                  })
                }
              />
            </FormControl>
          </>
        )}
      </SimpleGrid>

      <Button
        leftIcon={<Save size={16} />}
        colorScheme='brand'
        alignSelf='flex-end'
        onClick={handleSave}>
        Save Environment Settings
      </Button>
    </VStack>
  );
}
