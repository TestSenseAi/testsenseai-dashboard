import { HStack, Input, Select, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { Search, SortAsc } from 'lucide-react';

interface ProjectListHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  accessFilter: string;
  onAccessFilterChange: (value: string) => void;
}

export function ProjectListHeader({
  search,
  onSearchChange,
  sortBy,
  onSortChange,
  accessFilter,
  onAccessFilterChange,
}: ProjectListHeaderProps) {
  return (
    <HStack spacing={4} mb={6}>
      <InputGroup maxW='320px'>
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
        w='200px'
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        icon={<SortAsc size={18} />}>
        <option value='name'>Name</option>
        <option value='updated'>Last Updated</option>
        <option value='created'>Created Date</option>
      </Select>

      <Select w='150px' value={accessFilter} onChange={(e) => onAccessFilterChange(e.target.value)}>
        <option value='all'>All Access</option>
        <option value='private'>Private</option>
        <option value='public'>Public</option>
        <option value='internal'>Internal</option>
      </Select>
    </HStack>
  );
}
