import {
  Flex,
  IconButton,
  useColorMode,
  HStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Box,
  useToast,
} from '@chakra-ui/react';
import { Bell, Moon, Sun } from 'lucide-react';
import { useAuthStore } from '../../store/auth';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast({
      title: 'Logged out successfully',
      status: 'success',
      duration: 3000,
    });
  };

  return (
    <Flex
      as='header'
      align='center'
      justify='space-between'
      py={4}
      px={{ base: 4, md: 6 }}
      borderBottomWidth='1px'
      borderColor='gray.700'
      position='sticky'
      top={0}
      bg='gray.900'
      zIndex={10}>
      <Box ml={{ base: 12, md: 0 }}>
        <Text fontSize='lg' fontWeight='semibold' display={{ base: 'none', sm: 'block' }}>
          TestSenseAI
        </Text>
      </Box>

      <HStack spacing={{ base: 2, md: 4 }}>
        <IconButton
          aria-label='Notifications'
          icon={<Bell size={20} />}
          variant='ghost'
          size='sm'
        />
        <IconButton
          aria-label='Toggle color mode'
          icon={colorMode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          onClick={toggleColorMode}
          variant='ghost'
          size='sm'
        />

        <Menu>
          <MenuButton>
            <Avatar size='sm' name={user?.name} />
          </MenuButton>
          <MenuList>
            <MenuItem>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
}
