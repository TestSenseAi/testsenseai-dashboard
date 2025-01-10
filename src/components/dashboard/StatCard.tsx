import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

export interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  subValue: string;
  trend: 'up' | 'down';
  color: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  subValue,
  trend,
  color,
}) => {
  return (
    <Box
      data-testid={`stat-card-${label.toLowerCase().replace(' ', '-')}`}
      bg='gray.800'
      p={6}
      borderRadius='xl'
      width='100%'
      height='140px'
      display='flex'
      flexDirection='column'
      justifyContent='space-between'>
      <Flex direction='row' height='100%' justify='space-between'>
        <Flex align='center' gap={2}>
          <Icon as={icon} boxSize={5} color={color} />
          <Text color='gray.400' fontSize='sm' fontWeight='medium'>
            {label}
          </Text>
        </Flex>

        <Box>
          <Text
            fontSize='3xl'
            fontWeight='bold'
            color='white'
            lineHeight='1'
            mb={2}
            textAlign='right'>
            {value}
          </Text>
          <Flex align='center' gap={1}>
            <Icon
              as={trend === 'up' ? TrendingUp : TrendingDown}
              color={trend === 'up' ? 'green.400' : 'red.400'}
              size={14}
            />
            <Text
              color={trend === 'up' ? 'green.400' : 'red.400'}
              fontSize='sm'
              fontWeight='medium'>
              {subValue}
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
