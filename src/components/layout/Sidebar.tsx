import { Box, VStack, Icon } from '@chakra-ui/react';
import { LayoutDashboard, TestTube2, FileBarChart, Settings } from 'lucide-react';
import { NavItem } from './NavItem';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
  { icon: TestTube2, label: 'Test Cases', to: '/test-cases' },
  { icon: FileBarChart, label: 'Reports', to: '/reports' },
  { icon: Settings, label: 'Settings', to: '/settings' },
];

export function Sidebar() {
  return (
    <Box bg='gray.800' w='64px' py={6} display='flex' flexDirection='column' alignItems='center'>
      <Box mb={8}>
        <Icon as={TestTube2} boxSize={8} color='brand.400' />
      </Box>
      <VStack spacing={4}>
        {navItems.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
      </VStack>
    </Box>
  );
}
