import { Box, VStack, Icon } from '@chakra-ui/react';
import { LayoutDashboard, TestTube2, FileBarChart, Settings, Folder, FileText } from 'lucide-react';
import { NavItem } from './NavItem';

interface SidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
  { icon: Folder, label: 'Projects', to: '/projects' },
  { icon: FileText, label: 'Requirements', to: '/requirements' },
  { icon: TestTube2, label: 'Test Cases', to: '/test-cases' },
  { icon: FileBarChart, label: 'Reports', to: '/reports' },
  { icon: Settings, label: 'Settings', to: '/settings' },
];

export function Sidebar({ isMobile, onClose }: SidebarProps) {
  return (
    <Box
      bg='gray.800'
      w={isMobile ? 'full' : '64px'}
      py={6}
      display='flex'
      flexDirection='column'
      alignItems='center'
      position={isMobile ? 'relative' : 'sticky'}
      top={0}
      h='100vh'>
      <Box mb={8}>
        <Icon as={TestTube2} boxSize={8} color='brand.400' />
      </Box>

      <VStack spacing={isMobile ? 6 : 4} align='center' width='full'>
        {navItems.map((item) => (
          <NavItem
            key={item.to}
            {...item}
            showLabel={isMobile}
            onClick={isMobile ? onClose : undefined}
          />
        ))}
      </VStack>
    </Box>
  );
}
