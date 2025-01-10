import { Box, Icon, Tooltip, HStack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  to: string;
  showLabel?: boolean;
  onClick?: () => void;
}

export function NavItem({ icon, label, to, showLabel, onClick }: NavItemProps) {
  return (
    <Tooltip label={!showLabel ? label : undefined} placement='right'>
      <Box as={Link} to={to} _activeLink={{ color: 'brand.400' }} onClick={onClick}>
        <HStack spacing={2} px={3} py={2}>
          <Icon
            as={icon}
            boxSize={6}
            color='gray.400'
            _hover={{ color: 'white' }}
            transition='color 0.2s'
          />
          {showLabel && <Text>{label}</Text>}
        </HStack>
      </Box>
    </Tooltip>
  );
}
