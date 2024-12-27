import { ReactNode } from 'react';
import { User } from '../types/auth';
import { TeamMember } from '../types/team';
import { Organization } from '../types/team';

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

  organization: Organization | null;
  setOrganization: Function;
  members: TeamMember[] | null;
  setMembers: Function;
}

export interface AuthContextProviderProps {
  children: ReactNode;
}
