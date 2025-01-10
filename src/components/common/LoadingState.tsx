import { Center, Spinner, Text, VStack } from '@chakra-ui/react';

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
  return (
    <Center minH='200px'>
      <VStack spacing={4}>
        <Spinner size='xl' color='brand.400' thickness='4px' />
        <Text color='gray.400'>{message}</Text>
      </VStack>
    </Center>
  );
}
