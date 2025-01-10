import {
  VStack,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  FormErrorMessage,
  useToast,
  HStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Project, ProjectPriority, ProjectStatus } from '../../types/project';
import { z } from 'zod';

const projectSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().min(1, 'Description is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  priority: z.enum(['low', 'medium', 'high']),
  status: z.enum(['not_started', 'in_progress', 'on_hold', 'completed']),
  budget: z.number().min(0),
  owner: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
  }),
});

interface ProjectFormProps {
  initialData?: Partial<Project>;
  onSubmit: (data: Partial<Project>) => Promise<void>;
  onCancel: () => void;
}

export function ProjectForm({ initialData, onSubmit, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState<Partial<Project>>(initialData || {});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const validateForm = () => {
    try {
      projectSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      toast({
        title: 'Success',
        description: `Project ${initialData ? 'updated' : 'created'} successfully`,
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to ${initialData ? 'update' : 'create'} project`,
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <VStack spacing={6} align='stretch'>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <FormControl isRequired isInvalid={!!errors.name}>
          <FormLabel>Project Name</FormLabel>
          <Input
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder='Enter project name'
          />
          <FormErrorMessage>{errors.name}</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.priority}>
          <FormLabel>Priority</FormLabel>
          <Select
            value={formData.priority || ''}
            onChange={(e) =>
              setFormData({ ...formData, priority: e.target.value as ProjectPriority })
            }>
            <option value=''>Select priority</option>
            <option value='low'>Low</option>
            <option value='medium'>Medium</option>
            <option value='high'>High</option>
          </Select>
          <FormErrorMessage>{errors.priority}</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.startDate}>
          <FormLabel>Start Date</FormLabel>
          <Input
            type='date'
            value={formData.startDate || ''}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          />
          <FormErrorMessage>{errors.startDate}</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.endDate}>
          <FormLabel>End Date</FormLabel>
          <Input
            type='date'
            value={formData.endDate || ''}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
          />
          <FormErrorMessage>{errors.endDate}</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.status}>
          <FormLabel>Status</FormLabel>
          <Select
            value={formData.status || ''}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as ProjectStatus })}>
            <option value=''>Select status</option>
            <option value='not_started'>Not Started</option>
            <option value='in_progress'>In Progress</option>
            <option value='on_hold'>On Hold</option>
            <option value='completed'>Completed</option>
          </Select>
          <FormErrorMessage>{errors.status}</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.budget}>
          <FormLabel>Budget</FormLabel>
          <NumberInput
            value={formData.budget || 0}
            onChange={(_, value) => setFormData({ ...formData, budget: value })}
            min={0}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormErrorMessage>{errors.budget}</FormErrorMessage>
        </FormControl>
      </SimpleGrid>

      <FormControl isRequired isInvalid={!!errors.description}>
        <FormLabel>Description</FormLabel>
        <Textarea
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder='Enter project description'
          rows={4}
        />
        <FormErrorMessage>{errors.description}</FormErrorMessage>
      </FormControl>

      <HStack justify='flex-end' spacing={4}>
        <Button variant='ghost' onClick={onCancel}>
          Cancel
        </Button>
        <Button colorScheme='brand' onClick={handleSubmit} isLoading={isSubmitting}>
          {initialData ? 'Update' : 'Create'} Project
        </Button>
      </HStack>
    </VStack>
  );
}
