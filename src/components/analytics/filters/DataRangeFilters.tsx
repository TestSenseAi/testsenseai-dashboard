import { HStack, Select, Text } from '@chakra-ui/react';
import { DateRange } from '../../../types/analytics';

interface DateRangeFilterProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

export function DateRangeFilter({ value, onChange }: DateRangeFilterProps) {
  return (
    <HStack spacing={2}>
      <Text fontSize='sm'>Time Range:</Text>
      <Select
        size='sm'
        value={value}
        onChange={(e) => onChange(e.target.value as DateRange)}
        width='auto'>
        <option value='7d'>Last 7 days</option>
        <option value='30d'>Last 30 days</option>
        <option value='90d'>Last 90 days</option>
        <option value='1y'>Last year</option>
      </Select>
    </HStack>
  );
}
