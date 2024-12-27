import {
  Container,
  VStack,
  Button,
  useDisclosure,
  SimpleGrid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import { TeamList } from '../components/teams/TeamList';
import { InviteModal } from '../components/teams/InviteModal';
import { UsageStats } from '../components/teams/UsageStats';
import { TeamActivity } from '../components/teams/activity/TeamActivity';
import { OrgSettings } from '../components/teams/settings/OrgSettings';
import { useTeam } from '../hooks/useTeam';
import { PageHeader } from '../components/common/PageHeader';

export default function Teams() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { members, organization, updateRole, removeMember, inviteMember } = useTeam();

  if (!organization) return null;

  return (
    <Container maxW='container.xl' py={8}>
      <VStack spacing={8} align='stretch'>
        <PageHeader
          title='Team Management'
          description='Manage your team members and organization settings'
          action={
            <Button leftIcon={<Plus size={20} />} colorScheme='brand' onClick={onOpen}>
              Invite Member
            </Button>
          }
        />

        <Tabs colorScheme='brand'>
          <TabList>
            <Tab>Members</Tab>
            <Tab>Activity</Tab>
            <Tab>Settings</Tab>
          </TabList>

          <TabPanels>
            <TabPanel px={0}>
              <VStack spacing={6} align='stretch'>
                <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
                  <UsageStats organization={organization} />
                </SimpleGrid>
                <TeamList
                  members={members}
                  onUpdateRole={updateRole}
                  onRemoveMember={removeMember}
                />
              </VStack>
            </TabPanel>

            <TabPanel px={0}>
              <TeamActivity />
            </TabPanel>

            <TabPanel px={0}>
              <OrgSettings />
            </TabPanel>
          </TabPanels>
        </Tabs>

        <InviteModal isOpen={isOpen} onClose={onClose} onInvite={inviteMember} />
      </VStack>
    </Container>
  );
}
