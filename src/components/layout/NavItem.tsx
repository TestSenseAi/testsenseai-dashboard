import { Box, Icon, Tooltip } from '@chakra-ui/react';
import { NavLink as RouterLink } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  to: string;
}

export function NavItem({ icon, label, to }: NavItemProps) {
  return (
    <Tooltip label={label} placement="right">
      <Box as={RouterLink} to={to} _activeLink={{ color: 'brand.400' }}>
        <Icon
          as={icon}
          boxSize={6}
          color="gray.400"
          _hover={{ color: 'white' }}
          transition="color 0.2s"
        />
      </Box>
    </Tooltip>
  );
}