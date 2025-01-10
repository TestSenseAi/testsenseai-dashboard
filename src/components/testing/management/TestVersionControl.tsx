import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Collapse,
  useDisclosure,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Divider,
  Icon,
  useToast,
} from '@chakra-ui/react';
import { History, GitCompare, RotateCcw, Save } from 'lucide-react';
import { useState } from 'react';
import { TestVersion } from '../../../types/testManagement';
import { formatDistanceToNow } from 'date-fns';
import { TestCase } from '../../../types/test';
import { DiffViewer } from '../../common/DiffViewer';

interface TestVersionControlProps {
  testCase: TestCase;
  versions: TestVersion[];
  onRevert: (version: number) => void;
  onSaveChanges: (changes: string) => void;
}

export function TestVersionControl({
  testCase,
  versions,
  onRevert,
  onSaveChanges,
}: TestVersionControlProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedVersion, setSelectedVersion] = useState<TestVersion | null>(null);
  const [changes, setChanges] = useState('');
  const toast = useToast();

  const handleSave = () => {
    if (!changes.trim()) {
      toast({
        title: 'Error',
        description: 'Please describe your changes',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    onSaveChanges(changes);
    setChanges('');
    onClose();
  };

  const handleRevert = (version: TestVersion) => {
    onRevert(version.version);
    toast({
      title: 'Success',
      description: `Reverted to version ${version.version}`,
      status: 'success',
      duration: 3000,
    });
  };

  return (
    <Box>
      <VStack spacing={4} align='stretch'>
        <HStack justify='space-between'>
          <HStack>
            <Icon as={History} color='brand.400' />
            <Text fontSize='lg' fontWeight='medium'>
              Version History
            </Text>
          </HStack>
          <Button leftIcon={<Save size={16} />} colorScheme='brand' size='sm' onClick={onOpen}>
            Save Changes
          </Button>
        </HStack>

        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Version</Th>
              <Th>Changes</Th>
              <Th>Author</Th>
              <Th>Date</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {versions.map((version) => (
              <Tr key={version.id}>
                <Td>
                  <Badge colorScheme='purple'>v{version.version}</Badge>
                </Td>
                <Td maxW='300px' isTruncated>
                  {version.changes}
                </Td>
                <Td>{version.author}</Td>
                <Td>{formatDistanceToNow(new Date(version.timestamp))} ago</Td>
                <Td>
                  <HStack>
                    <Button
                      size='sm'
                      leftIcon={<GitCompare size={14} />}
                      variant='ghost'
                      onClick={() => setSelectedVersion(version)}>
                      Compare
                    </Button>
                    <Button
                      size='sm'
                      leftIcon={<RotateCcw size={14} />}
                      variant='ghost'
                      onClick={() => handleRevert(version)}>
                      Revert
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Collapse in={!!selectedVersion}>
          <Box mt={4} p={4} bg='gray.700' borderRadius='md'>
            <HStack justify='space-between' mb={4}>
              <Text fontWeight='medium'>Comparing with v{selectedVersion?.version}</Text>
              <Button size='sm' variant='ghost' onClick={() => setSelectedVersion(null)}>
                Close
              </Button>
            </HStack>
            <Divider mb={4} />
            <DiffViewer
              oldCode={testCase.steps.join('\n')}
              newCode={selectedVersion?.steps.join('\n') || ''}
            />
          </Box>
        </Collapse>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bg='gray.800'>
            <ModalHeader>Save Changes</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4} align='stretch'>
                <Text>Describe your changes:</Text>
                <Textarea
                  value={changes}
                  onChange={(e) => setChanges(e.target.value)}
                  placeholder='What changes did you make to this test case?'
                  rows={4}
                />
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button variant='ghost' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='brand' onClick={handleSave}>
                Save Changes
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  );
}
