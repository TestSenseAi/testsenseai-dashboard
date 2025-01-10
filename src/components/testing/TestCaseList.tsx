import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { Search, MoreVertical, Play, Edit, Trash, Filter, Plus } from 'lucide-react';
import { useState } from 'react';
import { TestCase } from '../../types/test';
import { TestCreationForm } from './TestCreationForm';

interface TestCaseListProps {
  testCases: TestCase[];
  onRunTest: (id: string) => void;
  onEditTest: (id: string) => void;
  onDeleteTest: (id: string) => void;
  onCreateTest: (test: Partial<TestCase>) => void;
}

export function TestCaseList({
  testCases,
  onRunTest,
  onEditTest,
  onDeleteTest,
  onCreateTest,
}: TestCaseListProps) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const filteredTests = testCases.filter((test) => {
    const matchesSearch =
      test.name.toLowerCase().includes(search.toLowerCase()) ||
      test.description.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'all' || test.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <Box>
      <VStack spacing={6} align='stretch'>
        <HStack spacing={4}>
          <InputGroup maxW='400px'>
            <InputLeftElement>
              <Search size={18} />
            </InputLeftElement>
            <Input
              placeholder='Search test cases...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
          <InputGroup w='200px'>
            <InputLeftElement>
              <Filter size={18} />
            </InputLeftElement>
            <Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value='all'>All Types</option>
              <option value='ui'>UI Tests</option>
              <option value='api'>API Tests</option>
              <option value='visual'>Visual Tests</option>
              <option value='accessibility'>Accessibility Tests</option>
            </Select>
          </InputGroup>
          <Button leftIcon={<Plus size={16} />} colorScheme='brand' onClick={onOpen}>
            New Test Case
          </Button>
        </HStack>

        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Type</Th>
              <Th>Steps</Th>
              <Th>Last Run</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredTests.map((test) => (
              <Tr key={test.id}>
                <Td>
                  <VStack align='start' spacing={1}>
                    <Text fontWeight='medium'>{test.name}</Text>
                    <Text fontSize='sm' color='gray.400' noOfLines={1}>
                      {test.description}
                    </Text>
                  </VStack>
                </Td>
                <Td>
                  <Badge
                    colorScheme={
                      test.type === 'ui'
                        ? 'blue'
                        : test.type === 'api'
                        ? 'green'
                        : test.type === 'visual'
                        ? 'purple'
                        : 'orange'
                    }>
                    {test.type}
                  </Badge>
                </Td>
                <Td>{test.steps.length} steps</Td>
                <Td>
                  {test.metadata?.lastRun ? (
                    <Text fontSize='sm'>
                      {new Date(test.metadata.lastRun).toLocaleDateString()}
                    </Text>
                  ) : (
                    <Text fontSize='sm' color='gray.400'>
                      Never
                    </Text>
                  )}
                </Td>
                <Td>
                  <Badge
                    colorScheme={
                      test.metadata?.lastStatus === 'passed'
                        ? 'green'
                        : test.metadata?.lastStatus === 'failed'
                        ? 'red'
                        : 'gray'
                    }>
                    {test.metadata?.lastStatus || 'Not Run'}
                  </Badge>
                </Td>
                <Td>
                  <HStack>
                    <IconButton
                      aria-label='Run test'
                      icon={<Play size={16} />}
                      size='sm'
                      variant='ghost'
                      onClick={() => onRunTest(test.id)}
                    />
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        icon={<MoreVertical size={16} />}
                        variant='ghost'
                        size='sm'
                      />
                      <MenuList>
                        <MenuItem icon={<Edit size={16} />} onClick={() => onEditTest(test.id)}>
                          Edit
                        </MenuItem>
                        <MenuItem
                          icon={<Trash size={16} />}
                          color='red.400'
                          onClick={() => onDeleteTest(test.id)}>
                          Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <TestCreationForm isOpen={isOpen} onClose={onClose} onSubmit={onCreateTest} />
      </VStack>
    </Box>
  );
}
