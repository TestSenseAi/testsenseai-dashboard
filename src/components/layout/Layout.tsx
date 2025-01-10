import { Box, Flex, useColorMode } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function Layout() {
  const { colorMode } = useColorMode();

  return (
    <Flex minH='100vh' bg={colorMode === 'dark' ? 'gray.800' : 'gray.50'}>
      <Sidebar />
      <Box flex='1' ml='64px'>
        <Header />
        <Box as='main' p={8}>
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
}
