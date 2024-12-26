import { Button, Text, useTheme } from '@chakra-ui/react';
import { Layout as LayoutIcon } from 'lucide-react';
import { pxToRem } from '../../utils/format';

export function NavHeader() {
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
      <LayoutIcon style={{ width: pxToRem(24), height: pxToRem(24) }} />
      <Text fontSize='xl' fontWeight={600}>
        TestAI
      </Text>
    </Button>
  );
}
