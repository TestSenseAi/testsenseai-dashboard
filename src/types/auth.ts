import { z } from 'zod';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: Permission[];
  lastLogin?: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  timezone: string;
}

export type UserRole = 'admin' | 'manager' | 'tester' | 'viewer';

export type Permission =
  | 'create:test'
  | 'edit:test'
  | 'delete:test'
  | 'run:test'
  | 'view:reports'
  | 'manage:users'
  | 'manage:settings'
  | 'manage:projects';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  sessionExpiry?: string;
  loginAttempts: number;
  isLocked: boolean;
  lockUntil?: string;
}

// Validation schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
