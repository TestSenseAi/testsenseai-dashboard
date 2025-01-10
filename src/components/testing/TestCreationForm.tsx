import { useState } from 'react';
import { Button, useToast, HStack } from '@chakra-ui/react';
import { TestCase } from '../../types/test';

export interface TestCreationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (test: Partial<TestCase>) => void;
  initialData?: TestCase;
  mode?: 'create' | 'edit';
}

// Update the component to use initialData when in edit mode
export function TestCreationForm({
  onClose,
  onSubmit,
  initialData,
  mode = 'create',
}: TestCreationFormProps) {
  const [testCase, setTestCase] = useState<Partial<TestCase>>(
    initialData || {
      name: '',
      description: '',
      type: 'ui',
      steps: [],
      assertions: [],
    }
  );

  const toast = useToast();

  const handleSubmit = () => {
    if (!testCase.name || !testCase.description) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    if (!testCase.steps?.length || !testCase.assertions?.length) {
      toast({
        title: 'Error',
        description: 'Please add at least one step and assertion',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    onSubmit(testCase as TestCase);
    if (mode === 'create') {
      setTestCase({
        name: '',
        description: '',
        type: 'ui',
        steps: [],
        assertions: [],
      });
    }
    onClose?.();
  };

  // ... rest of the component implementation

  return (
    <HStack spacing={4} justify='flex-end'>
      <Button variant='ghost' onClick={onClose}>
        Cancel
      </Button>
      <Button colorScheme='brand' onClick={handleSubmit}>
        {mode === 'create' ? 'Create Test Case' : 'Update Test Case'}
      </Button>
    </HStack>
  );
}

export default TestCreationForm;
