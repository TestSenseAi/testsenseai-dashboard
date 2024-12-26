import { Button, Text, useTheme } from '@chakra-ui/react';
import { LogOut } from 'lucide-react';

export function NavFooter() {
  const { theme } = useTheme();
  return (
    <Button
      display='flex'
      alignItems='center'
      gap={theme.spacing.sm}
      padding={theme.spacing.xs}
      borderRadius={theme.radius.sm}
      _hover={{
        backgroundColor: theme.colors.gray[0],
      }}>
      <LogOut size={20} />
      <Text>Logout</Text>
    </Button>
  );
}
