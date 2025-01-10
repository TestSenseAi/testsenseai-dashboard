import {
  Container,
  VStack,
  HStack,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useDisclosure,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Plus, Wand2 } from 'lucide-react';
import { useState } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { PageTransition } from '../components/common/PageTransition';
import { TestCaseList } from '../components/testing/TestCaseList';
import { TestCreationForm } from '../components/testing/TestCreationForm';
import { LocatorDetector } from '../components/testing/LocatorDetector';
import { TestCase } from '../types/test';

// Mock data - replace with actual data fetching
const mockTestCases: TestCase[] = [
  {
    id: '1',
    name: 'Login Flow',
    description: 'Verify user login functionality',
    type: 'ui',
    steps: [
      { id: '1', action: 'Navigate to login page' },
      { id: '2', action: 'Enter credentials' },
      { id: '3', action: 'Click login button' },
    ],
    assertions: [
      { id: '1', type: 'element', condition: 'Dashboard should be visible', expected: true },
    ],
    metadata: {
      author: 'John Doe',
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
      source: 'manual',
      lastRun: new Date().toISOString(),
      lastStatus: 'passed',
    },
  },
];

export default function TestCases() {
  const [testCases, setTestCases] = useState(mockTestCases);
  const [selectedTest, setSelectedTest] = useState<TestCase | null>(null);
  const { isOpen: isLocatorOpen, onOpen: onLocatorOpen, onClose: onLocatorClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const toast = useToast();

  const handleRunTest = (id: string) => {
    toast({
      id,
      title: 'Test Started',
      description: 'Test execution has begun',
      status: 'info',
      duration: 3000,
    });
  };

  const handleEditTest = (id: string) => {
    const testToEdit = testCases.find((test) => test.id === id);
    if (testToEdit) {
      setSelectedTest(testToEdit);
      onEditOpen();
    }
  };

  const handleUpdateTest = (updatedTest: Partial<TestCase>) => {
    if (!selectedTest?.id) return;

    setTestCases((prev) =>
      prev.map((test) =>
        test.id === selectedTest.id
          ? {
              ...test,
              ...updatedTest,
              metadata: {
                ...test.metadata,
                modified: new Date().toISOString(),
              },
            }
          : test
      )
    );
    onEditClose();
    setSelectedTest(null);
    toast({
      title: 'Test Updated',
      description: 'Test case has been updated successfully',
      status: 'success',
      duration: 3000,
    });
  };

  const handleDeleteTest = (id: string) => {
    setTestCases((prev) => prev.filter((test) => test.id !== id));
    toast({
      title: 'Test Deleted',
      status: 'success',
      duration: 3000,
    });
  };

  const handleCreateTest = (test: Partial<TestCase>) => {
    const newTest: TestCase = {
      ...(test as TestCase),
      id: Date.now().toString(),
      metadata: {
        author: 'Current User',
        created: new Date().toISOString(),
        modified: new Date().toISOString(),
        source: 'manual',
      },
    };
    setTestCases((prev) => [...prev, newTest]);
    toast({
      title: 'Test Created',
      status: 'success',
      duration: 3000,
    });
  };

  return (
    <PageTransition>
      <Container maxW='container.xl' py={8}>
        <VStack spacing={8} align='stretch'>
          <PageHeader
            title='Test Cases'
            description='Create, manage and execute test cases'
            action={
              <HStack>
                <Button leftIcon={<Wand2 size={16} />} variant='outline' onClick={onLocatorOpen}>
                  Detect Locators
                </Button>
                <Button leftIcon={<Plus size={16} />} colorScheme='brand'>
                  New Test Case
                </Button>
              </HStack>
            }
          />

          <Tabs colorScheme='brand'>
            <TabList>
              <Tab>All Tests</Tab>
              <Tab>Active</Tab>
              <Tab>Draft</Tab>
              <Tab>Archived</Tab>
            </TabList>

            <TabPanels>
              <TabPanel px={0}>
                <TestCaseList
                  testCases={testCases}
                  onRunTest={handleRunTest}
                  onEditTest={handleEditTest}
                  onDeleteTest={handleDeleteTest}
                  onCreateTest={handleCreateTest}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>

          <LocatorDetector isOpen={isLocatorOpen} onClose={onLocatorClose} />

          <Modal isOpen={isEditOpen} onClose={onEditClose} size='2xl'>
            <ModalOverlay />
            <ModalContent bg='gray.800'>
              <ModalHeader>Edit Test Case</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                {selectedTest && (
                  <TestCreationForm
                    isOpen={isEditOpen}
                    initialData={selectedTest}
                    onSubmit={handleUpdateTest}
                    onClose={onEditClose}
                    mode='edit'
                  />
                )}
              </ModalBody>
            </ModalContent>
          </Modal>
        </VStack>
      </Container>
    </PageTransition>
  );
}
