import { createContext, useContext, useEffect, useState } from 'react';
import { Permission, User, UserRole } from '../types/auth';
import { AuthContextProviderProps, Theme, AuthContextType } from './types';
import { Box } from '@chakra-ui/react';

const mockedData = {
  user: {
    id: '1',
    username: 'test',
    email: 'test@test.com',
    name: 'Test User',
    role: UserRole.Admin,
    permissions: [
      Permission.CreateTest,
      Permission.EditTest,
      Permission.DeleteTest,
      Permission.RunTest,
      Permission.ViewReports,
      Permission.ManageUsers,
      Permission.ManageSettings,
    ],
  },
  token: 'mock-token',
  isAuthenticated: true,
};

export interface LoginResponseProps {
  user: User;
  token: string;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: ({ children }: AuthContextProviderProps) => JSX.Element = ({
  children,
}: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [theme, setTheme] = useState<Theme>('dark');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    if (isAuthenticated) {
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call with axios and return mockedData
      const response: LoginResponseProps = await new Promise((resolve) => {
        setTimeout(() => resolve(mockedData), 1000);
      });
      console.log('email', email);
      console.log('password', password);
      setUser(response.user);
      setToken(response.token);
      setIsAuthenticated(response.isAuthenticated);
    } catch (error) {
      console.error('Login failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  const refreshToken = async () => {
    if (token) {
      return;
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          setToken(storedToken);
          setUser(mockedData.user);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Token validation failed', error);
          localStorage.removeItem('token');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const authContext: AuthContextType = {
    user,
    setUser,
    token,
    setToken,
    login,
    logout,
    isAuthenticated,
    setIsAuthenticated,
    refreshToken,
    isLoading,
    setIsLoading,
    error,
    setError,
    theme,
    setTheme,
  };

  return (
    <AuthContext.Provider value={authContext}>
      <Box data-testid='auth-context-container'>{children}</Box>
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
