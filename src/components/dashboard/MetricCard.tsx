import { Box, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Icon } from '@chakra-ui/react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  change: number;
  format?: 'number' | 'percentage' | 'duration';
  changeDirection?: 'normal' | 'inverse';
  dataTestId: string;
}

export function MetricCard({
  icon,
  label,
  value,
  change,
  format = 'number',
  changeDirection = 'normal',
  dataTestId,
}: MetricCardProps) {
  const formatValue = (val: number) => {
    switch (format) {
      case 'percentage':
        return `${val.toFixed(1)}%`;
      case 'duration':
        return `${val.toFixed(1)}s`;
      default:
        return val.toLocaleString();
    }
  };

  const isPositive = changeDirection === 'normal' ? change > 0 : change < 0;

  return (
    <Box p={6} bg='gray.800' borderRadius='lg' data-testid={dataTestId}>
      <Stat>
        <Box display='flex' alignItems='center' mb={2}>
          <Icon as={icon} boxSize={5} color='brand.400' mr={2} />
          <StatLabel color='gray.400'>{label}</StatLabel>
        </Box>
        <StatNumber fontSize='2xl'>{formatValue(value)}</StatNumber>
        <StatHelpText mb={0}>
          <StatArrow type={isPositive ? 'increase' : 'decrease'} />
          {Math.abs(change).toFixed(1)}%
        </StatHelpText>
      </Stat>
    </Box>
  );
}
