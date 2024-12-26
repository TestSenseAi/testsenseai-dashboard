import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import { DashboardStat } from './types';

export function StatCard({ icon: Icon, label, value, change }: DashboardStat) {
  return (
    <Box shadow='xs' p='md' borderRadius='md'>
      <Flex>
        <Icon size={20} />
        <Stack gap={0}>
          <Text fontSize='sm' color='gray.500'>
            {label}
          </Text>
          <Text fontSize='xl' fontWeight={600}>
            {value}
          </Text>
          <Text fontSize='sm' color='teal.600'>
            {change}
          </Text>
        </Stack>
      </Flex>
    </Box>
  );
}
