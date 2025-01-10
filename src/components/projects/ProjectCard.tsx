import {
  Box,
  Heading,
  Text,
  HStack,
  Badge,
  Icon,
  Button,
  VStack,
  Wrap,
  WrapItem,
  Tag,
  TagLabel,
  Tooltip,
} from '@chakra-ui/react';
import {
  Github,
  ExternalLink,
  Archive,
  Globe,
  Lock,
  Users,
  Calendar,
  Server,
  Smartphone,
  Monitor,
} from 'lucide-react';
import { Project } from '../../types/project';
import { formatDistanceToNow } from 'date-fns';

interface ProjectCardProps {
  project: Project;
  onSelect: (projectId: string) => void;
}

const categoryIcons = {
  web: Globe,
  mobile: Smartphone,
  api: Server,
  desktop: Monitor,
  other: Box,
};

const accessColors = {
  private: 'red',
  public: 'green',
  internal: 'orange',
};

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const CategoryIcon = categoryIcons[project.category as keyof typeof categoryIcons];

  return (
    <Box
      p={6}
      bg='gray.800'
      borderRadius='lg'
      borderWidth={1}
      borderColor='gray.700'
      _hover={{ borderColor: 'gray.600' }}
      transition='all 0.2s'
      opacity={project.settings.archived ? 0.7 : 1}
      position='relative'
      width='100%'>
      {project.settings.archived && (
        <Badge
          position='absolute'
          top={4}
          right={4}
          colorScheme='gray'
          display='flex'
          alignItems='center'
          gap={1}>
          <Archive size={14} />
          Archived
        </Badge>
      )}

      <VStack align='stretch' spacing={4}>
        <HStack justify='space-between'>
          <HStack>
            <Icon as={CategoryIcon} color='brand.400' boxSize={5} />
            <Heading size='md' noOfLines={1}>
              {project.name}
            </Heading>
          </HStack>
          <Badge colorScheme={accessColors[project.access]}>
            <HStack spacing={1}>
              <Icon as={project.access === 'private' ? Lock : Globe} size={12} />
              <Text>{project.access}</Text>
            </HStack>
          </Badge>
        </HStack>

        <Text color='gray.400' noOfLines={2}>
          {project.description}
        </Text>

        <Wrap spacing={2}>
          {project.tags.map((tag) => (
            <WrapItem key={tag.id}>
              <Tag size='sm' colorScheme={tag.color}>
                <TagLabel>{tag.name}</TagLabel>
              </Tag>
            </WrapItem>
          ))}
        </Wrap>

        <HStack spacing={4}>
          {project.integrations.github && (
            <Tooltip
              label={`${project.integrations.github.repositoryOwner}/${project.integrations.github.repositoryName}`}>
              <HStack
                color={project.integrations.github.status === 'connected' ? 'green.400' : 'red.400'}
                spacing={1}>
                <Icon as={Github} />
                <Text fontSize='sm'>GitHub</Text>
              </HStack>
            </Tooltip>
          )}
        </HStack>

        <HStack justify='space-between' mt={2}>
          <HStack spacing={4} color='gray.400' fontSize='sm'>
            <HStack spacing={1}>
              <Icon as={Calendar} size={14} />
              <Text>Updated {formatDistanceToNow(new Date(project.updatedAt))} ago</Text>
            </HStack>
            <HStack spacing={1}>
              <Icon as={Users} size={14} />
              <Text>{project.members.length} members</Text>
            </HStack>
          </HStack>
          <Button
            size='sm'
            rightIcon={<ExternalLink size={16} />}
            onClick={() => onSelect(project.id)}
            variant='ghost'
            _hover={{ bg: 'gray.700' }}>
            View
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
