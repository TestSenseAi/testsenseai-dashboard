import { Button, Text, useTheme } from '@chakra-ui/react';
import { Home, TestTube2, FileStack, BarChart3, Settings } from 'lucide-react';
import { NavItem } from './types';

const items: NavItem[] = [
  { icon: Home, label: 'Dashboard' },
  { icon: TestTube2, label: 'Test Cases' },
  { icon: FileStack, label: 'Reports' },
  { icon: BarChart3, label: 'Analytics' },
  { icon: Settings, label: 'Settings' },
];

export function NavItems() {
  const { theme } = useTheme();
  return (
    <>
      {items.map(({ icon: Icon, label }) => (
        <Button
          key={label}
          display='flex'
          alignItems='center'
          gap={theme.spacing.sm}
          padding={theme.spacing.xs}
          borderRadius={theme.radius.sm}
          _hover={{
            backgroundColor: theme.colors.gray[0],
          }}>
          <Icon size={20} />
          <Text>{label}</Text>
        </Button>
      ))}
    </>
  );
}
