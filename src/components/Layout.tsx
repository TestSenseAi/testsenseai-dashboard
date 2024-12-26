import React from 'react';
import { Box, Button, Stack, Text } from '@chakra-ui/react';
import {
  Layout as LayoutIcon,
  Home,
  TestTube2,
  FileStack,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react';
import { pxToRem } from '../utils/format';

const navItems = [
  { icon: Home, label: 'Dashboard' },
  { icon: TestTube2, label: 'Test Cases' },
  { icon: FileStack, label: 'Reports' },
  { icon: BarChart3, label: 'Analytics' },
  { icon: Settings, label: 'Settings' },
];

const Layout: React.FC<{ children: React.ReactNode }> = () => {
  return (
    <Box display='flex' flexDirection='column' minHeight='100vh'>
      <Box p='md'>
        <Button
          display='flex'
          alignItems='center'
          gap='sm'
          variant='ghost'
          leftIcon={<LayoutIcon style={{ width: pxToRem(24), height: pxToRem(24) }} />}>
          <Text fontSize='xl' fontWeight={600}>
            TestAI
          </Text>
        </Button>

        <Box>
          <Stack gap='xs'>
            {navItems.map(({ icon: Icon, label }) => (
              <Button
                key={label}
                display='flex'
                alignItems='center'
                gap='sm'
                variant='ghost'
                leftIcon={<Icon style={{ width: pxToRem(20), height: pxToRem(20) }} />}>
                <Text>{label}</Text>
              </Button>
            ))}
          </Stack>
        </Box>

        <Box>
          <Button
            display='flex'
            alignItems='center'
            gap='sm'
            variant='ghost'
            leftIcon={<LogOut style={{ width: pxToRem(20), height: pxToRem(20) }} />}>
            <Text>Logout</Text>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
