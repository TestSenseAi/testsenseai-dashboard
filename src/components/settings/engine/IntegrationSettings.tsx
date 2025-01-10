import {
  VStack,
  FormControl,
  FormLabel,
  Switch,
  Input,
  Select,
  Text,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stack,
  Checkbox,
} from '@chakra-ui/react';
import { Save } from 'lucide-react';
import { EngineSettings } from '../../../types/engine';

interface IntegrationSettingsProps {
  settings: EngineSettings['integrations'];
  onUpdate: (values: EngineSettings['integrations']) => void;
}

export function IntegrationSettings({ settings, onUpdate }: IntegrationSettingsProps) {
  return (
    <VStack spacing={6} align='stretch'>
      <Tabs colorScheme='brand'>
        <TabList>
          <Tab>CI/CD</Tab>
          <Tab>Monitoring</Tab>
          <Tab>Security</Tab>
        </TabList>

        <TabPanels>
          <TabPanel px={0}>
            <VStack spacing={6} align='stretch'>
              <FormControl display='flex' alignItems='start' justifyContent='space-between'>
                <div>
                  <FormLabel mb={0}>Enable CI/CD Integration</FormLabel>
                  <Text fontSize='sm' color='gray.400'>
                    Integrate with CI/CD pipelines
                  </Text>
                </div>
                <Switch
                  isChecked={settings.cicd.enabled}
                  onChange={(e) =>
                    onUpdate({
                      ...settings,
                      cicd: { ...settings.cicd, enabled: e.target.checked },
                    })
                  }
                />
              </FormControl>

              {settings.cicd.enabled && (
                <>
                  <FormControl>
                    <FormLabel>Provider</FormLabel>
                    <Select
                      value={settings.cicd.provider}
                      onChange={(e) =>
                        onUpdate({
                          ...settings,
                          cicd: { ...settings.cicd, provider: e.target.value as any },
                        })
                      }>
                      <option value='github'>GitHub Actions</option>
                      <option value='gitlab'>GitLab CI</option>
                      <option value='jenkins'>Jenkins</option>
                      <option value='azure'>Azure DevOps</option>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Webhook URL</FormLabel>
                    <Input
                      value={settings.cicd.webhookUrl}
                      onChange={(e) =>
                        onUpdate({
                          ...settings,
                          cicd: { ...settings.cicd, webhookUrl: e.target.value },
                        })
                      }
                      placeholder='https://example.com/webhook'
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>API Key</FormLabel>
                    <Input
                      type='password'
                      value={settings.cicd.apiKey}
                      onChange={(e) =>
                        onUpdate({
                          ...settings,
                          cicd: { ...settings.cicd, apiKey: e.target.value },
                        })
                      }
                    />
                  </FormControl>

                  <Text fontWeight='medium'>Triggers</Text>
                  <Stack spacing={2}>
                    <Checkbox
                      isChecked={settings.cicd.triggers.onPush}
                      onChange={(e) =>
                        onUpdate({
                          ...settings,
                          cicd: {
                            ...settings.cicd,
                            triggers: { ...settings.cicd.triggers, onPush: e.target.checked },
                          },
                        })
                      }>
                      Run on Push
                    </Checkbox>
                    <Checkbox
                      isChecked={settings.cicd.triggers.onPullRequest}
                      onChange={(e) =>
                        onUpdate({
                          ...settings,
                          cicd: {
                            ...settings.cicd,
                            triggers: {
                              ...settings.cicd.triggers,
                              onPullRequest: e.target.checked,
                            },
                          },
                        })
                      }>
                      Run on Pull Request
                    </Checkbox>
                    <Checkbox
                      isChecked={settings.cicd.triggers.onRelease}
                      onChange={(e) =>
                        onUpdate({
                          ...settings,
                          cicd: {
                            ...settings.cicd,
                            triggers: { ...settings.cicd.triggers, onRelease: e.target.checked },
                          },
                        })
                      }>
                      Run on Release
                    </Checkbox>
                  </Stack>
                </>
              )}
            </VStack>
          </TabPanel>

          <TabPanel px={0}>
            <VStack spacing={6} align='stretch'>
              <FormControl display='flex' alignItems='start' justifyContent='space-between'>
                <div>
                  <FormLabel mb={0}>Enable Monitoring</FormLabel>
                  <Text fontSize='sm' color='gray.400'>
                    Send metrics to monitoring services
                  </Text>
                </div>
                <Switch
                  isChecked={settings.monitoring.enabled}
                  onChange={(e) =>
                    onUpdate({
                      ...settings,
                      monitoring: { ...settings.monitoring, enabled: e.target.checked },
                    })
                  }
                />
              </FormControl>

              {settings.monitoring.enabled && (
                <>
                  <FormControl>
                    <FormLabel>Provider</FormLabel>
                    <Select
                      value={settings.monitoring.provider}
                      onChange={(e) =>
                        onUpdate({
                          ...settings,
                          monitoring: { ...settings.monitoring, provider: e.target.value as any },
                        })
                      }>
                      <option value='datadog'>Datadog</option>
                      <option value='newrelic'>New Relic</option>
                      <option value='prometheus'>Prometheus</option>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Endpoint</FormLabel>
                    <Input
                      value={settings.monitoring.endpoint}
                      onChange={(e) =>
                        onUpdate({
                          ...settings,
                          monitoring: { ...settings.monitoring, endpoint: e.target.value },
                        })
                      }
                      placeholder='https://api.monitoring.com'
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>API Key</FormLabel>
                    <Input
                      type='password'
                      value={settings.monitoring.apiKey}
                      onChange={(e) =>
                        onUpdate({
                          ...settings,
                          monitoring: { ...settings.monitoring, apiKey: e.target.value },
                        })
                      }
                    />
                  </FormControl>

                  <Text fontWeight='medium'>Metrics</Text>
                  <Stack spacing={2}>
                    <Checkbox
                      isChecked={settings.monitoring.metrics.testDuration}
                      onChange={(e) =>
                        onUpdate({
                          ...settings,
                          monitoring: {
                            ...settings.monitoring,
                            metrics: {
                              ...settings.monitoring.metrics,
                              testDuration: e.target.checked,
                            },
                          },
                        })
                      }>
                      Test Duration
                    </Checkbox>
                    <Checkbox
                      isChecked={settings.monitoring.metrics.errorRates}
                      onChange={(e) =>
                        onUpdate({
                          ...settings,
                          monitoring: {
                            ...settings.monitoring,
                            metrics: {
                              ...settings.monitoring.metrics,
                              errorRates: e.target.checked,
                            },
                          },
                        })
                      }>
                      Error Rates
                    </Checkbox>
                    <Checkbox
                      isChecked={settings.monitoring.metrics.coverage}
                      onChange={(e) =>
                        onUpdate({
                          ...settings,
                          monitoring: {
                            ...settings.monitoring,
                            metrics: { ...settings.monitoring.metrics, coverage: e.target.checked },
                          },
                        })
                      }>
                      Coverage
                    </Checkbox>
                    <Checkbox
                      isChecked={settings.monitoring.metrics.performance}
                      onChange={(e) =>
                        onUpdate({
                          ...settings,
                          monitoring: {
                            ...settings.monitoring,
                            metrics: {
                              ...settings.monitoring.metrics,
                              performance: e.target.checked,
                            },
                          },
                        })
                      }>
                      Performance
                    </Checkbox>
                  </Stack>
                </>
              )}
            </VStack>
          </TabPanel>

          <TabPanel px={0}>
            <VStack spacing={6} align='stretch'>
              <FormControl display='flex' alignItems='start' justifyContent='space-between'>
                <div>
                  <FormLabel mb={0}>Enable Security Scanning</FormLabel>
                  <Text fontSize='sm' color='gray.400'>
                    Scan dependencies and code for vulnerabilities
                  </Text>
                </div>
                <Switch
                  isChecked={settings.security.enabled}
                  onChange={(e) =>
                    onUpdate({
                      ...settings,
                      security: { ...settings.security, enabled: e.target.checked },
                    })
                  }
                />
              </FormControl>

              {settings.security.enabled && (
                <>
                  <FormControl display='flex' alignItems='start' justifyContent='space-between'>
                    <div>
                      <FormLabel mb={0}>Scan Dependencies</FormLabel>
                      <Text fontSize='sm' color='gray.400'>
                        Check dependencies for known vulnerabilities
                      </Text>
                    </div>
                    <Switch
                      isChecked={settings.security.scanDependencies}
                      onChange={(e) =>
                        onUpdate({
                          ...settings,
                          security: { ...settings.security, scanDependencies: e.target.checked },
                        })
                      }
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Vulnerability Threshold</FormLabel>
                    <Select
                      value={settings.security.vulnerabilityThreshold}
                      onChange={(e) =>
                        onUpdate({
                          ...settings,
                          security: {
                            ...settings.security,
                            vulnerabilityThreshold: e.target.value as any,
                          },
                        })
                      }>
                      <option value='low'>Low</option>
                      <option value='medium'>Medium</option>
                      <option value='high'>High</option>
                    </Select>
                  </FormControl>

                  <FormControl display='flex' alignItems='start' justifyContent='space-between'>
                    <div>
                      <FormLabel mb={0}>Auto-fix Vulnerabilities</FormLabel>
                      <Text fontSize='sm' color='gray.400'>
                        Automatically update dependencies with known fixes
                      </Text>
                    </div>
                    <Switch
                      isChecked={settings.security.autoFix}
                      onChange={(e) =>
                        onUpdate({
                          ...settings,
                          security: { ...settings.security, autoFix: e.target.checked },
                        })
                      }
                    />
                  </FormControl>
                </>
              )}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Button
        leftIcon={<Save size={16} />}
        colorScheme='brand'
        alignSelf='flex-end'
        onClick={() => onUpdate(settings)}>
        Save Integration Settings
      </Button>
    </VStack>
  );
}
