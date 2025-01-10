import { Container, VStack, Button } from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import { ProjectList } from '../components/projects/ProjectList';
import { PageHeader } from '../components/common/PageHeader';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { PageTransition } from '../components/common/PageTransition';
import { LoadingState } from '../components/common/LoadingState';
import { useProjects } from '../hooks/useProjects';

export default function Projects() {
  const { loading } = useProjects();

  if (loading) {
    return <LoadingState message='Loading projects...' />;
  }

  return (
    <PageTransition>
      <Container maxW='container.xl' py={8}>
        <VStack spacing={8} align='stretch'>
          <Breadcrumb />
          <PageHeader
            title='Projects'
            description="Manage your team's projects and their integrations"
            action={
              <Button leftIcon={<Plus size={20} />} colorScheme='brand'>
                New Project
              </Button>
            }
          />
          <ProjectList />
        </VStack>
      </Container>
    </PageTransition>
  );
}
