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
import { Task, ProjectPriority, ProjectStatus } from '../../types/project';
import { z } from 'zod';

const taskSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().min(1, 'Description is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  priority: z.enum(['low', 'medium', 'high']),
  status: z.enum(['not_started', 'in_progress', 'on_hold', 'completed']),
  estimatedHours: z.number().min(0),
  assignees: z.array(z.string()).min(1, 'At least one assignee is required'),
});

interface TaskFormProps {
  projectId: string;
  parentId?: string;
  initialData?: Partial<Task>;
  onSubmit: (data: Partial<Task>) => Promise<void>;
  onCancel: () => void;
  availableAssignees: Array<{ id: string; name: string }>;
  availableDependencies: Array<{ id: string; name: string }>;
}

export function TaskForm({
  projectId,
  parentId,
  initialData,
  onSubmit,
  onCancel,
  availableAssignees,
  availableDependencies,
}: TaskFormProps) {
  const [formData, setFormData] = useState<Partial<Task>>(initialData || { projectId, parentId });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const validateForm = () => {
    try {
      taskSchema.parse(formData);
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
        description: `Task ${initialData ? 'updated' : 'created'} successfully`,
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to ${initialData ? 'update' : 'create'} task`,
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
          <FormLabel>Task Name</FormLabel>
          <Input
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder='Enter task name'
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

        <FormControl isRequired isInvalid={!!errors.estimatedHours}>
          <FormLabel>Estimated Hours</FormLabel>
          <NumberInput
            value={formData.estimatedHours || 0}
            onChange={(_, value) => setFormData({ ...formData, estimatedHours: value })}
            min={0}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormErrorMessage>{errors.estimatedHours}</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.assignees}>
          <FormLabel>Assignees</FormLabel>
          <Select
            multiple
            value={formData.assignees || []}
            onChange={(e) => {
              const values = Array.from(e.target.selectedOptions, (option) => option.value);
              setFormData({ ...formData, assignees: values });
            }}>
            {availableAssignees.map((assignee) => (
              <option key={assignee.id} value={assignee.id}>
                {assignee.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.assignees}</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel>Dependencies</FormLabel>
          <Select
            multiple
            value={formData.dependencies || []}
            onChange={(e) => {
              const values = Array.from(e.target.selectedOptions, (option) => option.value);
              setFormData({ ...formData, dependencies: values });
            }}>
            {availableDependencies.map((dep) => (
              <option key={dep.id} value={dep.id}>
                {dep.name}
              </option>
            ))}
          </Select>
        </FormControl>
      </SimpleGrid>

      <FormControl isRequired isInvalid={!!errors.description}>
        <FormLabel>Description</FormLabel>
        <Textarea
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder='Enter task description'
          rows={4}
        />
        <FormErrorMessage>{errors.description}</FormErrorMessage>
      </FormControl>

      <HStack justify='flex-end' spacing={4}>
        <Button variant='ghost' onClick={onCancel}>
          Cancel
        </Button>
        <Button colorScheme='brand' onClick={handleSubmit} isLoading={isSubmitting}>
          {initialData ? 'Update' : 'Create'} Task
        </Button>
      </HStack>
    </VStack>
  );
}
