import { Container, VStack, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { ProjectHeader } from '../components/projects/details/ProjectHeader';
import { IntegrationStatus } from '../components/projects/details/IntegrationStatus';
import { ProjectMembers } from '../components/projects/details/ProjectMembers';
import { useProjects } from '../hooks/useProjects';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { LoadingState } from '../components/common/LoadingState';
import { PageTransition } from '../components/common/PageTransition';
import { ProjectSettings } from '../components/projects/settings/ProjectSettings';

export default function ProjectDetails() {
  const { projectId } = useParams<{ projectId: string }>();
  const { projects, loading } = useProjects();

  const project = projects.find((p) => p.id === projectId);

  if (loading) {
    return <LoadingState message='Loading project details...' />;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  const handleSync = (integrationType: 'github' | 'figma') => {
    console.log(`Syncing ${integrationType}...`);
  };

  const handleUpdateRole = (memberId: string, role: string) => {
    console.log(`Updating role for ${memberId} to ${role}`);
  };

  const handleRemoveMember = (memberId: string) => {
    console.log(`Removing member ${memberId}`);
  };

  return (
    <PageTransition>
      <Container maxW='container.xl' py={8}>
        <VStack spacing={8} align='stretch'>
          <Breadcrumb />

          <ProjectHeader project={project} onSettings={() => console.log('Opening settings...')} />

          <Tabs colorScheme='brand'>
            <TabList>
              <Tab>Overview</Tab>
              <Tab>Integrations</Tab>
              <Tab>Members</Tab>
              <Tab>Settings</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>{/* Overview content */}</TabPanel>

              <TabPanel>
                <IntegrationStatus project={project} onSync={handleSync} />
              </TabPanel>

              <TabPanel>
                <ProjectMembers
                  project={project}
                  onUpdateRole={handleUpdateRole}
                  onRemoveMember={handleRemoveMember}
                />
              </TabPanel>

              <TabPanel>
                <ProjectSettings
                  project={project}
                  onUpdate={(settings) => {
                    // Update project settings
                    console.log('Updating settings:', settings);
                  }}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Container>
    </PageTransition>
  );
}
