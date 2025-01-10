import { Select } from '@chakra-ui/react';
import { ActivityFilterType } from './types';

interface ActivityFilterProps {
  value: ActivityFilterType;
  onChange: (value: ActivityFilterType) => void;
}

export function ActivityFilter({ value, onChange }: ActivityFilterProps) {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value as ActivityFilterType)}
      size="sm"
      w="150px"
    >
      <option value="all">All Activity</option>
      <option value="tests">Test Runs</option>
      <option value="cases">Test Cases</option>
      <option value="ci">CI/CD</option>
    </Select>
  );
}