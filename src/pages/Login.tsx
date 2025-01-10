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
  Checkbox,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertDescription,
  Progress,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { loginSchema, type LoginFormData } from '../types/auth';
import { formatDistanceToNow } from 'date-fns';

export default function Login() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, loginAttempts, isLocked, lockUntil, incrementLoginAttempts, checkLockStatus } =
    useAuthStore();

  const navigate = useNavigate();
  const toast = useToast();

  const validateForm = () => {
    try {
      loginSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error: any) {
      const formErrors: Partial<LoginFormData> = {};
      error.errors.forEach((err: any) => {
        if (err.path) {
          formErrors[err.path[0] as keyof LoginFormData] = err.message;
        }
      });
      setErrors(formErrors);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (checkLockStatus()) {
      toast({
        title: 'Account Locked',
        description: `Please try again ${formatDistanceToNow(new Date(lockUntil!))}`,
        status: 'error',
      });
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Mock login - replace with actual auth
      if (formData.email && formData.password) {
        login(
          {
            id: '1',
            email: formData.email,
            name: 'Test User',
            role: 'admin',
            permissions: ['create:test', 'edit:test', 'run:test', 'view:reports'],
          },
          'mock-token',
          formData.rememberMe
        );
        navigate('/dashboard');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      incrementLoginAttempts();
      toast({
        title: 'Error',
        description: 'Invalid email or password',
        status: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box minH='100vh' display='flex' alignItems='center' justifyContent='center'>
      <Box w='400px' p={8} borderRadius='lg' bg='gray.800'>
        <VStack spacing={6}>
          <Heading size='lg'>TestSenseAI</Heading>
          <Text color='gray.400'>Sign in to your account</Text>

          {isLocked && lockUntil && (
            <Alert status='error' borderRadius='md'>
              <AlertIcon />
              <AlertDescription>
                Account locked. Try again {formatDistanceToNow(new Date(lockUntil))}
              </AlertDescription>
            </Alert>
          )}

          {!isLocked && loginAttempts > 0 && (
            <Box w='100%'>
              <Text mb={2} fontSize='sm' color='gray.400'>
                Login attempts: {loginAttempts}/5
              </Text>
              <Progress
                value={(loginAttempts / 5) * 100}
                colorScheme={loginAttempts > 3 ? 'red' : 'orange'}
                borderRadius='full'
              />
            </Box>
          )}

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <VStack spacing={4}>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  type='email'
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  isDisabled={isLocked}
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  type='password'
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  isDisabled={isLocked}
                />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>

              <FormControl>
                <Checkbox
                  isChecked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                  isDisabled={isLocked}>
                  Remember me
                </Checkbox>
              </FormControl>

              <Button
                type='submit'
                colorScheme='brand'
                w='100%'
                isLoading={isSubmitting}
                isDisabled={isLocked}>
                Sign In
              </Button>
            </VStack>
          </form>
        </VStack>
      </Box>
    </Box>
  );
}
