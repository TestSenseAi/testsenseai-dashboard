import { ReactNode } from 'react';
import { User } from '../types/auth';
import { TeamMember } from '../types/team';
import { Organization } from '../types/team';

export type Theme = 'light' | 'dark';

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  theme: Theme;
  organization: Organization | null;
  members: TeamMember[] | null;
  sessionExpiry?: string;
  lastActivity?: string;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  setTheme: (theme: Theme) => void;
  setOrganization: (org: Organization | null) => void;
  setMembers: (members: TeamMember[] | null) => void;
  clearError: () => void;
  checkSession: () => boolean;
  extendSession: () => void;
}

export interface AuthContextProviderProps {
  children: ReactNode;
}
