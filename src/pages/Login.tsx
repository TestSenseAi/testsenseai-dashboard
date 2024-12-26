import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const { login, isAuthenticated, isLoading, error, setIsLoading } = useAuthContext();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to='/dashboard' replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      console.log('error', err);
      toast({
        title: 'Error',
        description: 'Error trying to login',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box minH='100vh' display='flex' alignItems='center' justifyContent='center' bg='gray.900'>
      <Box w='400px' p={8} borderRadius='lg' bg='gray.800' boxShadow='xl'>
        <VStack spacing={6}>
          <Heading size='lg'>TestSenseAI</Heading>
          <Text color='gray.400'>Sign in to your account</Text>

          {error && (
            <Alert status='error' borderRadius='md'>
              <AlertIcon />
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </FormControl>

              <Button
                type='submit'
                colorScheme='brand'
                w='100%'
                isLoading={isLoading}
                loadingText='Signing in...'>
                Sign In
              </Button>
            </VStack>
          </form>
        </VStack>
      </Box>
    </Box>
  );
}
