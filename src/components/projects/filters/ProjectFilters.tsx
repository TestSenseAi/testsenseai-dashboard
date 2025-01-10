import {
  VStack,
  HStack,
  Input,
  Select,
  Checkbox,
  Button,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { Search, Filter } from 'lucide-react';
import { ProjectCategory, ProjectTag } from '../../../types/project';

interface ProjectFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedTags: string[];
  onTagChange: (tagId: string) => void;
  selectedCategories: ProjectCategory[];
  onCategoryChange: (category: ProjectCategory) => void;
  showArchived: boolean;
  onArchivedChange: (show: boolean) => void;
  availableTags: ProjectTag[];
  availableCategories: ProjectCategory[];
  onClearFilters: () => void;
}

export function ProjectFilters({
  search,
  onSearchChange,
  selectedTags,
  onTagChange,
  selectedCategories,
  onCategoryChange,
  showArchived,
  onArchivedChange,
  availableTags,
  onClearFilters,
  availableCategories,
}: ProjectFiltersProps) {
  return (
    <VStack spacing={4} align='stretch' bg='gray.800' p={4} borderRadius='lg'>
      <HStack>
        <InputGroup>
          <InputLeftElement>
            <Search size={18} />
          </InputLeftElement>
          <Input
            placeholder='Search projects...'
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </InputGroup>
        <Select
          placeholder='Category'
          multiple
          value={selectedCategories.map((category) => category.id)}
          onChange={(e) => {
            const values = Array.from(e.target.selectedOptions, (option) => option.value as string);
            values.forEach((value) => {
              const category = availableCategories.find((c) => c.id === value);
              if (category) {
                onCategoryChange(category);
              }
            });
          }}>
          <option value='web'>Web</option>
          <option value='mobile'>Mobile</option>
          <option value='api'>API</option>
          <option value='desktop'>Desktop</option>
          <option value='other'>Other</option>
        </Select>
      </HStack>

      <Wrap spacing={2}>
        {availableTags.map((tag) => (
          <WrapItem key={tag.id}>
            <Tag
              size='md'
              variant={selectedTags.includes(tag.id) ? 'solid' : 'subtle'}
              colorScheme={tag.color}
              cursor='pointer'
              onClick={() => onTagChange(tag.id)}>
              <TagLabel>{tag.name}</TagLabel>
              {selectedTags.includes(tag.id) && (
                <TagCloseButton
                  onClick={(e) => {
                    e.stopPropagation();
                    onTagChange(tag.id);
                  }}
                />
              )}
            </Tag>
          </WrapItem>
        ))}
      </Wrap>

      <HStack justify='space-between'>
        <Checkbox isChecked={showArchived} onChange={(e) => onArchivedChange(e.target.checked)}>
          Show archived projects
        </Checkbox>
        <Button size='sm' variant='ghost' leftIcon={<Filter size={16} />} onClick={onClearFilters}>
          Clear Filters
        </Button>
      </HStack>
    </VStack>
  );
}
