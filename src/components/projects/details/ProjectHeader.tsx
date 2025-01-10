import { Box, Heading, Text, HStack, Badge, Button } from '@chakra-ui/react';
import { Settings, Share2 } from 'lucide-react';
import { Project } from '../../../types/project';

interface ProjectHeaderProps {
  project: Project;
  onSettings: () => void;
}

export function ProjectHeader({ project, onSettings }: ProjectHeaderProps) {
  const accessColors = {
    private: 'red',
    public: 'green',
    internal: 'orange',
  };

  return (
    <Box mb={6}>
      <HStack justify='space-between' mb={2}>
        <Heading size='lg'>{project.name}</Heading>
        <HStack>
          <Button leftIcon={<Share2 size={18} />} variant='ghost' size='sm'>
            Share
          </Button>
          <Button leftIcon={<Settings size={18} />} variant='ghost' size='sm' onClick={onSettings}>
            Settings
          </Button>
        </HStack>
      </HStack>
      <Text color='gray.400' mb={3}>
        {project.description}
      </Text>
      <HStack>
        <Badge colorScheme={accessColors[project.access]}>{project.access}</Badge>
        <Text fontSize='sm' color='gray.500'>
          Created {new Date(project.createdAt).toLocaleDateString()}
        </Text>
      </HStack>
    </Box>
  );
}
