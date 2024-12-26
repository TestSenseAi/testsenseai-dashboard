import { Flex, IconButton, useColorMode, HStack, Text, Menu, MenuButton, MenuList, MenuItem, Avatar } from '@chakra-ui/react';
import { Bell, Moon, Sun } from 'lucide-react';
import { useAuthStore } from '../../store/auth';

export function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      py={4}
      px={6}
      borderBottomWidth="1px"
      borderColor="gray.700"
    >
      <Text fontSize="lg" fontWeight="semibold">
        TestSenseAI
      </Text>

      <HStack spacing={4}>
        <IconButton
          aria-label="Notifications"
          icon={<Bell size={20} />}
          variant="ghost"
          size="sm"
        />
        <IconButton
          aria-label="Toggle color mode"
          icon={colorMode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          onClick={toggleColorMode}
          variant="ghost"
          size="sm"
        />
        
        <Menu>
          <MenuButton>
            <Avatar size="sm" name={user?.name} />
          </MenuButton>
          <MenuList>
            <MenuItem>Profile</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
}