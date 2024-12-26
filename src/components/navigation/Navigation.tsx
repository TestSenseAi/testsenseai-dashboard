import { Box, Stack } from '@chakra-ui/react';
import { NavHeader } from './NavHeader';
import { NavItems } from './NavItems';
import { NavFooter } from './NavFooter';

export function Navigation() {
  return (
    <Box as='nav' p='md' bg='gray.50' borderRight='1px solid' borderColor='gray.200'>
      <Box mb='md'>
        <NavHeader />
      </Box>

      <Box flex='1' mt='md'>
        <Stack spacing='xs'>
          <NavItems />
        </Stack>
      </Box>

      <Box mt='auto'>
        <NavFooter />
      </Box>
    </Box>
  );
}
