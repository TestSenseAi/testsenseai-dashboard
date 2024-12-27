import { Select } from '@chakra-ui/react';
import { TeamActivityFilter } from '../../../types/team';

interface ActivityFilterProps {
  value: TeamActivityFilter;
  onChange: (value: TeamActivityFilter) => void;
}

const filters = [
  { value: 'all', label: 'All Activity' },
  { value: 'members', label: 'Member Changes' },
  { value: 'roles', label: 'Role Updates' },
  { value: 'settings', label: 'Settings Changes' },
];

export function ActivityFilter({ value, onChange }: ActivityFilterProps) {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value as TeamActivityFilter)}
      size='sm'
      width='200px'>
      {filters.map((filter) => (
        <option key={filter.value} value={filter.value}>
          {filter.label}
        </option>
      ))}
    </Select>
  );
}
