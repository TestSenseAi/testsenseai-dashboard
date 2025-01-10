import { Box, VStack, HStack, Text, Icon, Button, Badge } from '@chakra-ui/react';
import { Github, Figma, RefreshCw } from 'lucide-react';
import { Project } from '../../../types/project';

interface IntegrationStatusProps {
  project: Project;
  onSync: (integrationType: 'github' | 'figma') => void;
}

export function IntegrationStatus({ project, onSync }: IntegrationStatusProps) {
  return (
    <VStack align='stretch' spacing={4}>
      {project.integrations.github && (
        <Box p={4} bg='gray.700' borderRadius='md'>
          <HStack justify='space-between'>
            <HStack>
              <Icon as={Github} boxSize={5} />
              <VStack align='start' spacing={1}>
                <Text fontWeight='medium'>GitHub</Text>
                <Text fontSize='sm' color='gray.400'>
                  {project.integrations.github.repositoryOwner}/
                  {project.integrations.github.repositoryName}
                </Text>
              </VStack>
            </HStack>
            <HStack>
              <Badge
                colorScheme={project.integrations.github.status === 'connected' ? 'green' : 'red'}>
                {project.integrations.github.status}
              </Badge>
              <Button size='sm' leftIcon={<RefreshCw size={16} />} onClick={() => onSync('github')}>
                Sync
              </Button>
            </HStack>
          </HStack>
        </Box>
      )}

      {project.integrations.figma && (
        <Box p={4} bg='gray.700' borderRadius='md'>
          <HStack justify='space-between'>
            <HStack>
              <Icon as={Figma} boxSize={5} />
              <VStack align='start' spacing={1}>
                <Text fontWeight='medium'>Figma</Text>
                <Text fontSize='sm' color='gray.400'>
                  Last synced: {new Date(project.integrations.figma.lastSync).toLocaleString()}
                </Text>
              </VStack>
            </HStack>
            <HStack>
              <Badge
                colorScheme={project.integrations.figma.status === 'connected' ? 'green' : 'red'}>
                {project.integrations.figma.status}
              </Badge>
              <Button size='sm' leftIcon={<RefreshCw size={16} />} onClick={() => onSync('figma')}>
                Sync
              </Button>
            </HStack>
          </HStack>
        </Box>
      )}
    </VStack>
  );
}
