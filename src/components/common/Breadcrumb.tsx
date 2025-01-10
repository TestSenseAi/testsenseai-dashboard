import { HStack, Text } from '@chakra-ui/react';
import { ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path: string;
}

function getBreadcrumbItems(pathname: string): BreadcrumbItem[] {
  const paths = pathname.split('/').filter(Boolean);
  return paths.map((path, index) => {
    const label = path.charAt(0).toUpperCase() + path.slice(1);
    const fullPath = `/${paths.slice(0, index + 1).join('/')}`;
    return { label, path: fullPath };
  });
}

export function Breadcrumb() {
  const location = useLocation();
  const items = getBreadcrumbItems(location.pathname);

  if (items.length <= 1) return null;

  return (
    <HStack spacing={2} mb={6} color='gray.400'>
      <Link to='/'>
        <Text _hover={{ color: 'white' }}>Home</Text>
      </Link>
      {items.map((item, index) => (
        <HStack key={item.path} spacing={2}>
          <ChevronRight size={16} />
          {index === items.length - 1 ? (
            <Text color='white'>{item.label}</Text>
          ) : (
            <Link to={item.path}>
              <Text _hover={{ color: 'white' }}>{item.label}</Text>
            </Link>
          )}
        </HStack>
      ))}
    </HStack>
  );
}
