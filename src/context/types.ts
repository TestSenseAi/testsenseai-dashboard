import { ReactNode } from 'react';
import { User } from '../types/auth';

export type Theme = 'light' | 'dark';

export interface AuthContextType {
  user: User | null;
  setUser: Function;
  token: string | null;
  setToken: Function;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  isAuthenticated: boolean;
  setIsAuthenticated: Function;
  theme: Theme;
  setTheme: Function;
  isLoading: boolean;
  setIsLoading: Function;
  error: string | null;
  setError: Function;
}

export interface AuthContextProviderProps {
  children: ReactNode;
}
