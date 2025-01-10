import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
  useToast,
  VStack,
  FormErrorMessage,
  Textarea,
  Divider,
  HStack,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { Github, Search } from 'lucide-react';
import { useState } from 'react';
import { Project, ProjectAccess } from '../../types/project';

interface CreateProjectWizardProps {
  onClose: () => void;
  onCreate: (project: Partial<Project>) => Promise<void>;
}

export function CreateProjectWizard({ onClose, onCreate }: CreateProjectWizardProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    access: 'private' as ProjectAccess,
    repositoryUrl: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [githubRepos, setGithubRepos] = useState<Array<{ name: string; full_name: string }>>([]);
  const [searchRepo, setSearchRepo] = useState('');
  const toast = useToast();

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Project name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const searchGithubRepos = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual GitHub API call
      const mockRepos = [
        { name: 'project-1', full_name: 'org/project-1' },
        { name: 'project-2', full_name: 'org/project-2' },
      ];
      setGithubRepos(mockRepos);
    } catch (error) {
      toast({
        title: 'Error searching repositories',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await onCreate(formData);
      toast({
        title: 'Project created successfully',
        status: 'success',
        duration: 3000,
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Error creating project',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={6}>
      {step === 1 ? (
        <VStack spacing={6} align='stretch'>
          <Text fontSize='xl' fontWeight='bold'>
            Project Details
          </Text>
          <FormControl isInvalid={!!errors.name}>
            <FormLabel>Project Name</FormLabel>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder='Enter project name'
            />
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.description}>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder='Enter project description'
            />
            <FormErrorMessage>{errors.description}</FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel>Access Level</FormLabel>
            <Select
              value={formData.access}
              onChange={(e) =>
                setFormData({ ...formData, access: e.target.value as ProjectAccess })
              }>
              <option value='private'>Private</option>
              <option value='internal'>Internal</option>
              <option value='public'>Public</option>
            </Select>
          </FormControl>

          <HStack justify='flex-end' pt={4}>
            <Button onClick={onClose} variant='ghost'>
              Cancel
            </Button>
            <Button onClick={handleNext} colorScheme='brand'>
              Next
            </Button>
          </HStack>
        </VStack>
      ) : (
        <VStack spacing={6} align='stretch'>
          <Text fontSize='xl' fontWeight='bold'>
            GitHub Integration
          </Text>

          <FormControl>
            <FormLabel>Search GitHub Repository</FormLabel>
            <InputGroup>
              <Input
                value={searchRepo}
                onChange={(e) => setSearchRepo(e.target.value)}
                placeholder='Search repositories...'
              />
              <InputRightElement>
                <IconButton
                  aria-label='Search repositories'
                  icon={<Search size={18} />}
                  size='sm'
                  onClick={searchGithubRepos}
                  isLoading={loading}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>

          {githubRepos.length > 0 && (
            <Stack spacing={2}>
              {githubRepos.map((repo) => (
                <Button
                  key={repo.full_name}
                  variant='outline'
                  justifyContent='flex-start'
                  leftIcon={<Github size={18} />}
                  onClick={() => setFormData({ ...formData, repositoryUrl: repo.full_name })}
                  colorScheme={formData.repositoryUrl === repo.full_name ? 'brand' : 'gray'}>
                  {repo.full_name}
                </Button>
              ))}
            </Stack>
          )}

          <Divider />

          <HStack justify='flex-end' pt={4}>
            <Button onClick={handleBack} variant='ghost'>
              Back
            </Button>
            <Button onClick={handleSubmit} colorScheme='brand' isLoading={loading}>
              Create Project
            </Button>
          </HStack>
        </VStack>
      )}
    </Box>
  );
}
