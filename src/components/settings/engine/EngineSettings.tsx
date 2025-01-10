import { VStack, Tabs, TabList, TabPanels, Tab, TabPanel, useToast } from '@chakra-ui/react';
import { ExecutionSettings } from './ExecutionSettings';
import { ReportingSettings } from './ReportingSettings';
import { AISettings } from './AISettings';
import { EnvironmentSettings } from './EnvironmentSettings';
import { IntegrationSettings } from './IntegrationSettings';
import { useEngineSettings } from '../../../hooks/useEngineSettings';
import { LoadingState } from '../../common/LoadingState';

export function EngineSettings() {
  const { settings, updateSettings, loading } = useEngineSettings();
  const toast = useToast();

  const handleUpdate = async (section: keyof typeof settings, values: any) => {
    try {
      await updateSettings({ ...settings, [section]: values });
      toast({
        title: 'Success',
        description: 'Engine settings updated successfully',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update engine settings',
        status: 'error',
        duration: 3000,
      });
    }
  };

  if (loading) return <LoadingState message='Loading engine settings...' />;

  return (
    <VStack spacing={6} align='stretch'>
      <Tabs colorScheme='brand' isLazy>
        <TabList>
          <Tab>Execution</Tab>
          <Tab>Reporting</Tab>
          <Tab>AI & ML</Tab>
          <Tab>Environment</Tab>
          <Tab>Integrations</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <ExecutionSettings
              settings={settings.execution}
              onUpdate={(values) => handleUpdate('execution', values)}
            />
          </TabPanel>
          <TabPanel>
            <ReportingSettings
              settings={settings.reporting}
              onUpdate={(values) => handleUpdate('reporting', values)}
            />
          </TabPanel>
          <TabPanel>
            <AISettings settings={settings.ai} onUpdate={(values) => handleUpdate('ai', values)} />
          </TabPanel>
          <TabPanel>
            <EnvironmentSettings
              settings={settings.environment}
              onUpdate={(values) => handleUpdate('environment', values)}
            />
          </TabPanel>
          <TabPanel>
            <IntegrationSettings
              settings={settings.integrations}
              onUpdate={(values) => handleUpdate('integrations', values)}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
}
