import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  SimpleGrid,
  Card,
  CardBody,
  Badge,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
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
  Input,
  Select,
  Switch,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { Zap, MoreVertical, Plus, Play, Settings } from 'lucide-react';
import { useState } from 'react';
import { TestProfile } from '../../../types/testManagement';

interface TestProfileManagerProps {
  profiles: TestProfile[];
  onCreateProfile: (profile: Partial<TestProfile>) => void;
  onUpdateProfile: (id: string, updates: Partial<TestProfile>) => void;
  onDeleteProfile: (id: string) => void;
  onRunProfile: (id: string) => void;
}

export function TestProfileManager({
  profiles,
  onCreateProfile,
  onUpdateProfile,
  onDeleteProfile,
  onRunProfile,
}: TestProfileManagerProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newProfile, setNewProfile] = useState<Partial<TestProfile>>({
    name: '',
    type: 'regression',
    configuration: {
      parallelization: true,
      retries: 2,
      timeout: 30000,
      environment: 'staging',
    },
    criteria: {
      coverage: 80,
      maxDuration: 3600,
      successRate: 95,
    },
  });

  const handleCreate = () => {
    onCreateProfile(newProfile);
    setNewProfile({
      name: '',
      type: 'regression',
      configuration: {
        parallelization: true,
        retries: 2,
        timeout: 30000,
        environment: 'staging',
      },
      criteria: {
        coverage: 80,
        maxDuration: 3600,
        successRate: 95,
      },
    });
    onClose();
  };

  return (
    <Box>
      <VStack spacing={6} align='stretch'>
        <HStack justify='space-between'>
          <HStack>
            <Icon as={Zap} color='brand.400' />
            <Text fontSize='lg' fontWeight='medium'>
              Test Profiles
            </Text>
          </HStack>
          <Button leftIcon={<Plus size={16} />} colorScheme='brand' onClick={onOpen}>
            New Profile
          </Button>
        </HStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {profiles.map((profile) => (
            <Card key={profile.id}>
              <CardBody>
                <VStack align='stretch' spacing={4}>
                  <HStack justify='space-between'>
                    <Badge
                      colorScheme={
                        profile.type === 'regression'
                          ? 'purple'
                          : profile.type === 'smoke'
                          ? 'green'
                          : profile.type === 'sanity'
                          ? 'blue'
                          : 'orange'
                      }
                      fontSize='sm'
                      px={2}
                      py={1}>
                      {profile.type}
                    </Badge>
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        icon={<MoreVertical size={16} />}
                        variant='ghost'
                        size='sm'
                      />
                      <MenuList>
                        <MenuItem
                          icon={<Settings size={16} />}
                          onClick={() => onUpdateProfile(profile.id, {})}>
                          Configure
                        </MenuItem>
                        <MenuItem color='red.400' onClick={() => onDeleteProfile(profile.id)}>
                          Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </HStack>

                  <Text fontWeight='medium'>{profile.name}</Text>
                  <Text fontSize='sm' color='gray.400' noOfLines={2}>
                    {profile.description}
                  </Text>

                  <SimpleGrid columns={2} spacing={4}>
                    <Stat size='sm'>
                      <StatLabel>Coverage Goal</StatLabel>
                      <StatNumber>{profile.criteria.coverage}%</StatNumber>
                    </Stat>
                    <Stat size='sm'>
                      <StatLabel>Success Rate</StatLabel>
                      <StatNumber>{profile.criteria.successRate}%</StatNumber>
                    </Stat>
                  </SimpleGrid>

                  <Button
                    leftIcon={<Play size={16} />}
                    colorScheme='brand'
                    onClick={() => onRunProfile(profile.id)}>
                    Run Profile
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>

        <Modal isOpen={isOpen} onClose={onClose} size='xl'>
          <ModalOverlay />
          <ModalContent bg='gray.800'>
            <ModalHeader>Create Test Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={6}>
                <FormControl isRequired>
                  <FormLabel>Profile Name</FormLabel>
                  <Input
                    value={newProfile.name}
                    onChange={(e) =>
                      setNewProfile({
                        ...newProfile,
                        name: e.target.value,
                      })
                    }
                    placeholder='Profile name'
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Profile Type</FormLabel>
                  <Select
                    value={newProfile.type}
                    onChange={(e) =>
                      setNewProfile({
                        ...newProfile,
                        type: e.target.value as TestProfile['type'],
                      })
                    }>
                    <option value='regression'>Regression Testing</option>
                    <option value='smoke'>Smoke Testing</option>
                    <option value='sanity'>Sanity Testing</option>
                    <option value='performance'>Performance Testing</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Configuration</FormLabel>
                  <VStack align='stretch' spacing={4}>
                    <HStack justify='space-between'>
                      <Text>Parallel Execution</Text>
                      <Switch
                        isChecked={newProfile.configuration?.parallelization}
                        onChange={(e) =>
                          setNewProfile({
                            ...newProfile,
                            configuration: {
                              ...newProfile.configuration,
                              parallelization: e.target.checked,
                              retries: newProfile.configuration?.retries ?? 2,
                              timeout: newProfile.configuration?.timeout ?? 30000,
                              environment: newProfile.configuration?.environment ?? 'staging',
                            },
                          })
                        }
                      />
                    </HStack>

                    <FormControl>
                      <FormLabel>Retries</FormLabel>
                      <NumberInput
                        value={newProfile.configuration?.retries}
                        onChange={(_, value) =>
                          setNewProfile({
                            ...newProfile,
                            configuration: {
                              parallelization: newProfile.configuration?.parallelization ?? true,
                              retries: value,
                              timeout: newProfile.configuration?.timeout ?? 30000,
                              environment: newProfile.configuration?.environment ?? 'staging',
                            },
                          })
                        }
                        min={0}
                        max={5}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Environment</FormLabel>
                      <Select
                        value={newProfile.configuration?.environment}
                        onChange={(e) =>
                          setNewProfile({
                            ...newProfile,
                            configuration: {
                              ...newProfile.configuration,
                              environment: e.target.value,
                              parallelization: newProfile.configuration?.parallelization ?? true,
                              retries: newProfile.configuration?.retries ?? 2,
                              timeout: newProfile.configuration?.timeout ?? 30000,
                            },
                          })
                        }>
                        <option value='development'>Development</option>
                        <option value='staging'>Staging</option>
                        <option value='production'>Production</option>
                      </Select>
                    </FormControl>
                  </VStack>
                </FormControl>

                <FormControl>
                  <FormLabel>Success Criteria</FormLabel>
                  <VStack align='stretch' spacing={4}>
                    <FormControl>
                      <FormLabel>Coverage Goal (%)</FormLabel>
                      <NumberInput
                        value={newProfile.criteria?.coverage}
                        onChange={(_, value) =>
                          setNewProfile({
                            ...newProfile,
                            criteria: {
                              ...newProfile.criteria,
                              coverage: value,
                              maxDuration: newProfile.criteria?.maxDuration ?? 3600,
                              successRate: newProfile.criteria?.successRate ?? 95,
                            },
                          })
                        }
                        min={0}
                        max={100}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Success Rate (%)</FormLabel>
                      <NumberInput
                        value={newProfile.criteria?.successRate}
                        onChange={(_, value) =>
                          setNewProfile({
                            ...newProfile,
                            criteria: {
                              ...newProfile.criteria,
                              successRate: value,
                              coverage: newProfile.criteria?.coverage ?? 80,
                              maxDuration: newProfile.criteria?.maxDuration ?? 3600,
                            },
                          })
                        }
                        min={0}
                        max={100}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                  </VStack>
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button variant='ghost' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='brand' onClick={handleCreate}>
                Create Profile
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  );
}
