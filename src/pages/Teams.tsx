import { Container, VStack, Button, useDisclosure, SimpleGrid } from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import { TeamList } from '../components/teams/TeamList';
import { InviteModal } from '../components/teams/InviteModal';
import { UsageStats } from '../components/teams/UsageStats';
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

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
          <UsageStats organization={organization} />
        </SimpleGrid>

        <TeamList members={members} onUpdateRole={updateRole} onRemoveMember={removeMember} />

        <InviteModal isOpen={isOpen} onClose={onClose} onInvite={inviteMember} />
      </VStack>
    </Container>
  );
}
