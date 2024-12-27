import { Flex, Heading, Text, Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <Flex justify='space-between' align='center'>
      <Box>
        <Heading size='lg'>{title}</Heading>
        {description && (
          <Text color='gray.400' mt={1}>
            {description}
          </Text>
        )}
      </Box>
      {action}
    </Flex>
  );
}
