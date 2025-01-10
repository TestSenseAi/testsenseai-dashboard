import {
  VStack,
  SimpleGrid,
  FormControl,
  FormLabel,
  Select,
  Input,
  Button,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  IconButton,
  useToast,
  Skeleton,
  Collapse,
  Box,
  Text,
} from '@chakra-ui/react';
import { Filter, Plus, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import {
  TestEnvironment,
  TestPriority,
  TestRunStatus,
  TestRunFilter as FilterType,
} from '../../../types/testRun';

interface TestRunFilterProps {
  initialFilters?: Partial<FilterType>;
  onFilter?: (filters: FilterType) => void;
  onReset?: () => void;
  isLoading?: boolean;
}

export function TestRunFilter({
  initialFilters,
  onFilter,
  onReset,
  isLoading = false,
}: TestRunFilterProps) {
  const [filters, setFilters] = useState<Partial<FilterType>>(initialFilters || {});
  const [newTag, setNewTag] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  const toast = useToast();

  const handleAddTag = () => {
    if (!newTag) return;

    const updatedTags = [...(filters.tags || []), newTag];
    const updatedFilters = { ...filters, tags: updatedTags };
    setFilters(updatedFilters);
    setNewTag('');
  };

  const handleRemoveTag = (tag: string) => {
    const updatedTags = (filters.tags || []).filter((t) => t !== tag);
    const updatedFilters = { ...filters, tags: updatedTags };
    setFilters(updatedFilters);
  };

  const handleReset = () => {
    setFilters({});
    setNewTag('');
    onReset?.();
    toast({
      title: 'Filters Reset',
      status: 'info',
      duration: 2000,
    });
  };

  const handleApplyFilters = async () => {
    setIsApplying(true);
    try {
      await onFilter?.(filters as FilterType);
      toast({
        title: 'Filters Applied',
        status: 'success',
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to apply filters',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <Box bg='gray.800' borderRadius='lg' shadow='md'>
      <HStack
        p={4}
        justify='space-between'
        cursor='pointer'
        onClick={() => setIsExpanded(!isExpanded)}>
        <HStack>
          <Filter size={16} />
          <Text fontWeight='medium'>Filter Test Runs</Text>
          {Object.keys(filters).length > 0 && (
            <Tag size='sm' colorScheme='brand'>
              {Object.keys(filters).length} active
            </Tag>
          )}
        </HStack>
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </HStack>

      <Collapse in={isExpanded}>
        <VStack spacing={4} align='stretch' p={4} pt={0}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
            <Skeleton isLoaded={!isLoading}>
              <FormControl>
                <FormLabel>Environment</FormLabel>
                <Select
                  value={filters.environment || ''}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      environment: e.target.value as TestEnvironment,
                    })
                  }
                  placeholder='All Environments'
                  isDisabled={isLoading || isApplying}>
                  <option value='development'>Development</option>
                  <option value='staging'>Staging</option>
                  <option value='production'>Production</option>
                </Select>
              </FormControl>
            </Skeleton>

            <Skeleton isLoaded={!isLoading}>
              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select
                  value={filters.status || ''}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      status: e.target.value as TestRunStatus,
                    })
                  }
                  placeholder='All Statuses'
                  isDisabled={isLoading || isApplying}>
                  <option value='queued'>Queued</option>
                  <option value='running'>Running</option>
                  <option value='completed'>Completed</option>
                  <option value='aborted'>Aborted</option>
                </Select>
              </FormControl>
            </Skeleton>

            <Skeleton isLoaded={!isLoading}>
              <FormControl>
                <FormLabel>Priority</FormLabel>
                <Select
                  value={filters.priority || ''}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      priority: e.target.value as TestPriority,
                    })
                  }
                  placeholder='All Priorities'
                  isDisabled={isLoading || isApplying}>
                  <option value='high'>High</option>
                  <option value='medium'>Medium</option>
                  <option value='low'>Low</option>
                </Select>
              </FormControl>
            </Skeleton>

            <Skeleton isLoaded={!isLoading}>
              <FormControl>
                <FormLabel>Sprint</FormLabel>
                <Input
                  value={filters.sprintId || ''}
                  onChange={(e) => setFilters({ ...filters, sprintId: e.target.value })}
                  placeholder='Sprint ID'
                  isDisabled={isLoading || isApplying}
                />
              </FormControl>
            </Skeleton>

            <Skeleton isLoaded={!isLoading}>
              <FormControl>
                <FormLabel>Release</FormLabel>
                <Input
                  value={filters.releaseId || ''}
                  onChange={(e) => setFilters({ ...filters, releaseId: e.target.value })}
                  placeholder='Release ID'
                  isDisabled={isLoading || isApplying}
                />
              </FormControl>
            </Skeleton>

            <Skeleton isLoaded={!isLoading}>
              <FormControl>
                <FormLabel>Executor</FormLabel>
                <Input
                  value={filters.executor || ''}
                  onChange={(e) => setFilters({ ...filters, executor: e.target.value })}
                  placeholder='Search by executor'
                  isDisabled={isLoading || isApplying}
                />
              </FormControl>
            </Skeleton>
          </SimpleGrid>

          <Skeleton isLoaded={!isLoading}>
            <FormControl>
              <FormLabel>Date Range</FormLabel>
              <HStack>
                <Input
                  type='date'
                  value={filters.dateRange?.start || ''}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      dateRange: {
                        start: e.target.value,
                        end: filters.dateRange?.end || '',
                      },
                    })
                  }
                  isDisabled={isLoading || isApplying}
                />
                <Input
                  type='date'
                  value={filters.dateRange?.end || ''}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      dateRange: {
                        start: filters.dateRange?.start || '',
                        end: e.target.value,
                      },
                    })
                  }
                  isDisabled={isLoading || isApplying}
                />
              </HStack>
            </FormControl>
          </Skeleton>

          <Skeleton isLoaded={!isLoading}>
            <FormControl>
              <FormLabel>Tags</FormLabel>
              <HStack>
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder='Add tag'
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  isDisabled={isLoading || isApplying}
                />
                <IconButton
                  aria-label='Add tag'
                  icon={<Plus size={16} />}
                  onClick={handleAddTag}
                  isDisabled={isLoading || isApplying || !newTag}
                />
              </HStack>
              <HStack mt={2} wrap='wrap' spacing={2}>
                {filters.tags?.map((tag) => (
                  <Tag key={tag} size='md' borderRadius='full' variant='solid' colorScheme='blue'>
                    <TagLabel>{tag}</TagLabel>
                    <TagCloseButton
                      onClick={() => handleRemoveTag(tag)}
                      isDisabled={isLoading || isApplying}
                    />
                  </Tag>
                ))}
              </HStack>
            </FormControl>
          </Skeleton>

          <HStack justify='flex-end' spacing={4}>
            <Button
              leftIcon={<X size={16} />}
              variant='ghost'
              onClick={handleReset}
              isDisabled={isLoading || isApplying || Object.keys(filters).length === 0}>
              Reset
            </Button>
            <Button
              leftIcon={<Filter size={16} />}
              colorScheme='brand'
              onClick={handleApplyFilters}
              isLoading={isApplying}
              isDisabled={isLoading || Object.keys(filters).length === 0}
              loadingText='Applying...'>
              Apply Filters
            </Button>
          </HStack>
        </VStack>
      </Collapse>
    </Box>
  );
}
