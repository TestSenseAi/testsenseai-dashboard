import {
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { Search, X } from 'lucide-react';

interface ProjectFiltersProps {
  search: string;
  access: string;
  sortBy: string;
  onSearchChange: (value: string) => void;
  onAccessChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

export function ProjectFilters({
  search,
  access,
  sortBy,
  onSearchChange,
  onAccessChange,
  onSortChange,
}: ProjectFiltersProps) {
  return (
    <HStack spacing={4}>
      <InputGroup maxW='320px'>
        <InputLeftElement>
          <Search size={18} />
        </InputLeftElement>
        <Input
          placeholder='Search projects...'
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {search && (
          <InputRightElement>
            <IconButton
              aria-label='Clear search'
              icon={<X size={18} />}
              size='sm'
              variant='ghost'
              onClick={() => onSearchChange('')}
            />
          </InputRightElement>
        )}
      </InputGroup>

      <Select
        maxW='200px'
        value={access}
        onChange={(e) => onAccessChange(e.target.value)}
        placeholder='All Access Levels'>
        <option value='private'>Private</option>
        <option value='internal'>Internal</option>
        <option value='public'>Public</option>
      </Select>

      <Select
        maxW='200px'
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        placeholder='Sort by'>
        <option value='name'>Name</option>
        <option value='updated'>Last Updated</option>
        <option value='created'>Created Date</option>
      </Select>
    </HStack>
  );
}
