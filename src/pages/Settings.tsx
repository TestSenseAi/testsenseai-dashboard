import {
  Container,
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
} from '@chakra-ui/react';
import { PageHeader } from '../components/common/PageHeader';
import { PageTransition } from '../components/common/PageTransition';
import { GeneralSettings } from '../components/settings/organization/GeneralSettings';
import { SecuritySettings } from '../components/settings/organization/SecuritySettings';
import { ProjectSettings } from '../components/settings/organization/ProjectSettings';
import { BillingSettings } from '../components/settings/organization/BillingSettings';
import { EngineSettings } from '../components/settings/engine/EngineSettings';
import { useOrganizationSettings } from '../hooks/useOrganizationSettings';

export default function Settings() {
  const { settings: orgSettings, updateSettings: updateOrgSettings } = useOrganizationSettings();
  const toast = useToast();

  const handleUpdateOrgSettings = async (section: string, values: any) => {
    try {
      await updateOrgSettings(section, values);
      toast({
        title: 'Success',
        description: 'Settings updated successfully',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update settings',
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <PageTransition>
      <Container maxW='container.xl' py={8}>
        <VStack spacing={8} align='stretch'>
          <PageHeader
            title='Settings'
            description='Configure your organization and test engine settings'
          />

          <Tabs colorScheme='brand' isLazy>
            <TabList>
              <Tab>General</Tab>
              <Tab>Security</Tab>
              <Tab>Projects</Tab>
              <Tab>Billing</Tab>
              <Tab>Engine</Tab>
            </TabList>

            <TabPanels>
              <TabPanel px={0}>
                <GeneralSettings
                  settings={orgSettings.general}
                  onUpdate={(values) => handleUpdateOrgSettings('general', values)}
                />
              </TabPanel>

              <TabPanel px={0}>
                <SecuritySettings
                  settings={orgSettings.security}
                  onUpdate={(values) => handleUpdateOrgSettings('security', values)}
                />
              </TabPanel>

              <TabPanel px={0}>
                <ProjectSettings
                  settings={orgSettings.projects}
                  onUpdate={(values) => handleUpdateOrgSettings('projects', values)}
                />
              </TabPanel>

              <TabPanel px={0}>
                <BillingSettings
                  billing={orgSettings.billing}
                  onUpdatePlan={(planId) => handleUpdateOrgSettings('billing', { planId })}
                  onUpdatePayment={() =>
                    handleUpdateOrgSettings('billing', { updatePayment: true })
                  }
                />
              </TabPanel>

              <TabPanel px={0}>
                <EngineSettings />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Container>
    </PageTransition>
  );
}
