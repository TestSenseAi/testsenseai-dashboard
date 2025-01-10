import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Input,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Select,
  Textarea,
  Badge,
  Icon,
  Tooltip,
} from '@chakra-ui/react';
import { FolderPlus, MoreVertical, Plus, FolderTree, Clock, Tag, Link } from 'lucide-react';
import { useState } from 'react';
import { TestSuite } from '../../../types/testManagement';

interface TestSuiteManagerProps {
  suites: TestSuite[];
  onCreateSuite: (suite: Partial<TestSuite>) => void;
  onUpdateSuite: (id: string, updates: Partial<TestSuite>) => void;
  onDeleteSuite: (id: string) => void;
}

export function TestSuiteManager({ suites, onCreateSuite, onDeleteSuite }: TestSuiteManagerProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newSuite, setNewSuite] = useState<Partial<TestSuite>>({
    name: '',
    description: '',
    metadata: {
      priority: 'medium',
      estimatedDuration: 0,
      owner: '',
    },
    tags: [],
  });

  const handleCreate = () => {
    onCreateSuite(newSuite);
    setNewSuite({
      name: '',
      description: '',
      metadata: {
        priority: 'medium',
        estimatedDuration: 0,
        owner: '',
      },
      tags: [],
    });
    onClose();
  };

  const renderSuiteTree = (parentId?: string, level = 0) => {
    const childSuites = suites.filter((suite) => suite.parentId === parentId);

    return childSuites.map((suite) => (
      <Box key={suite.id} ml={level * 6}>
        <HStack
          p={2}
          bg='gray.700'
          borderRadius='md'
          borderWidth={1}
          borderColor='gray.600'
          _hover={{ borderColor: 'gray.500' }}
          mb={2}>
          <Icon as={FolderTree} color='brand.400' />
          <Box flex={1}>
            <Text fontWeight='medium'>{suite.name}</Text>
            <Text fontSize='sm' color='gray.400' noOfLines={1}>
              {suite.description}
            </Text>
          </Box>
          <HStack>
            <Badge
              colorScheme={
                suite.metadata.priority === 'high'
                  ? 'red'
                  : suite.metadata.priority === 'medium'
                  ? 'yellow'
                  : 'green'
              }>
              {suite.metadata.priority}
            </Badge>
            <Tooltip label='Estimated Duration'>
              <HStack>
                <Icon as={Clock} size={14} />
                <Text fontSize='sm'>{suite.metadata.estimatedDuration}m</Text>
              </HStack>
            </Tooltip>
            {suite.dependencies?.length && suite.dependencies?.length > 0 && (
              <Tooltip label='Has Dependencies'>
                <Icon as={Link} color='blue.400' />
              </Tooltip>
            )}
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<MoreVertical size={16} />}
                variant='ghost'
                size='sm'
              />
              <MenuList>
                <MenuItem icon={<Plus size={16} />}>Add Test Case</MenuItem>
                <MenuItem icon={<FolderPlus size={16} />}>Add Sub-Suite</MenuItem>
                <MenuItem icon={<Tag size={16} />}>Manage Tags</MenuItem>
                <MenuItem color='red.400' onClick={() => onDeleteSuite(suite.id)}>
                  Delete Suite
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </HStack>
        {renderSuiteTree(suite.id, level + 1)}
      </Box>
    ));
  };

  return (
    <Box>
      <VStack spacing={4} align='stretch'>
        <HStack justify='space-between'>
          <Text fontSize='lg' fontWeight='medium'>
            Test Suites
          </Text>
          <Button leftIcon={<FolderPlus size={16} />} colorScheme='brand' onClick={onOpen}>
            New Suite
          </Button>
        </HStack>

        {renderSuiteTree()}

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bg='gray.800'>
            <ModalHeader>Create Test Suite</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    value={newSuite.name}
                    onChange={(e) =>
                      setNewSuite({
                        ...newSuite,
                        name: e.target.value,
                      })
                    }
                    placeholder='Suite name'
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    value={newSuite.description}
                    onChange={(e) =>
                      setNewSuite({
                        ...newSuite,
                        description: e.target.value,
                      })
                    }
                    placeholder='Suite description'
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    value={newSuite.metadata?.priority}
                    onChange={(e) =>
                      setNewSuite({
                        ...newSuite,
                        metadata: {
                          ...newSuite.metadata,
                          owner: newSuite.metadata?.owner ?? '',
                          estimatedDuration: newSuite.metadata?.estimatedDuration ?? 0,
                          priority: e.target.value as 'high' | 'medium' | 'low',
                        },
                      })
                    }>
                    <option value='high'>High</option>
                    <option value='medium'>Medium</option>
                    <option value='low'>Low</option>
                  </Select>
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button variant='ghost' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='brand' onClick={handleCreate}>
                Create Suite
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  );
}
