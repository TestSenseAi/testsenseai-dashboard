import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User, UserRole } from '../types/auth';
import { AuthContextProviderProps, Theme, AuthContextType, AuthState } from './types';
import { Box } from '@chakra-ui/react';
import { Organization, TeamMember } from '../types/team';
import { addHours, isAfter, isBefore } from 'date-fns';

const SESSION_DURATION = 24; // hours
const ACTIVITY_TIMEOUT = 30; // minutes
const TOKEN_REFRESH_INTERVAL = 15; // minutes

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  theme: 'dark',
  organization: null,
  members: null,
};

const mockedData: AuthContextType = {
  user: {
    id: '1',
    email: 'test@test.com',
    name: 'Test User',
    role: 'admin' as UserRole,
    permissions: [
      'create:test',
      'edit:test',
      'delete:test',
      'run:test',
      'view:reports',
      'manage:users',
      'manage:settings',
    ],
  },
  token: 'mock-token',
  isAuthenticated: true,
  isLoading: false,
  error: null,
  theme: 'dark',
  organization: null,
  members: null,
  sessionExpiry: new Date().toISOString(),
  lastActivity: new Date().toISOString(),
  login: async () => {},
  logout: () => {},
  refreshToken: async () => {},
  updateUser: () => {},
  setTheme: () => {},
  setOrganization: () => {},
  setMembers: () => {},
  clearError: () => {},
  checkSession: () => true,
  extendSession: () => {},
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [state, setState] = useState<AuthState>(initialState);
  const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(null);

  const updateState = (updates: Partial<AuthState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const clearError = useCallback(() => {
    updateState({ error: null });
  }, []);

  const login = async (email: string, password: string) => {
    if (!email || !password) {
      updateState({ error: 'Email and password are required' });
      return;
    }
    if (state.isAuthenticated) return;

    updateState({ isLoading: true, error: null });

    try {
      // Simulate API call
      const response = await new Promise<typeof mockedData>((resolve) => {
        setTimeout(() => resolve(mockedData), 1000);
      });

      const sessionExpiry = addHours(new Date(), SESSION_DURATION).toISOString();

      updateState({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        sessionExpiry,
        lastActivity: new Date().toISOString(),
      });

      localStorage.setItem('token', response.token ?? '');
      localStorage.setItem('sessionExpiry', sessionExpiry);

      startRefreshInterval();
    } catch (error) {
      updateState({
        error: error instanceof Error ? error.message : 'Login failed',
      });
    } finally {
      updateState({ isLoading: false });
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('sessionExpiry');
    if (refreshInterval) {
      clearInterval(refreshInterval);
      setRefreshInterval(null);
    }
    setState(initialState);
  }, [refreshInterval]);

  const refreshToken = async () => {
    if (!state.token) return;

    try {
      // Simulate token refresh
      const newToken = `${state.token}-refreshed`;
      updateState({ token: newToken });
      localStorage.setItem('token', newToken);
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
    }
  };

  const startRefreshInterval = useCallback(() => {
    if (refreshInterval) {
      clearInterval(refreshInterval);
    }
    const interval = setInterval(refreshToken, TOKEN_REFRESH_INTERVAL * 60 * 1000);
    setRefreshInterval(interval);
  }, [refreshInterval]);

  const checkSession = useCallback(() => {
    if (!state.sessionExpiry) return false;

    const now = new Date();
    const expiry = new Date(state.sessionExpiry);
    const lastActivity = state.lastActivity ? new Date(state.lastActivity) : now;
    const activityTimeout = addHours(lastActivity, ACTIVITY_TIMEOUT / 60);

    if (isAfter(now, expiry) || isAfter(now, activityTimeout)) {
      logout();
      return false;
    }

    return true;
  }, [state.sessionExpiry, state.lastActivity, logout]);

  const extendSession = useCallback(() => {
    if (!state.isAuthenticated) return;

    const newExpiry = addHours(new Date(), SESSION_DURATION).toISOString();
    updateState({
      sessionExpiry: newExpiry,
      lastActivity: new Date().toISOString(),
    });
    localStorage.setItem('sessionExpiry', newExpiry);
  }, [state.isAuthenticated]);

  const updateUser = useCallback(
    (userData: Partial<User>) => {
      if (!state.user) return;
      updateState({
        user: { ...state.user, ...userData },
      });
    },
    [state.user]
  );

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('token');
      const storedExpiry = localStorage.getItem('sessionExpiry');

      if (storedToken && storedExpiry) {
        const now = new Date();
        const expiry = new Date(storedExpiry);

        if (isBefore(now, expiry)) {
          try {
            updateState({
              token: storedToken,
              user: mockedData.user,
              isAuthenticated: true,
              sessionExpiry: storedExpiry,
            });
            startRefreshInterval();
          } catch (error) {
            console.error('Token validation failed:', error);
            localStorage.removeItem('token');
            localStorage.removeItem('sessionExpiry');
          }
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('sessionExpiry');
        }
      }

      updateState({ isLoading: false });
    };

    checkAuth();

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [startRefreshInterval, refreshInterval]);

  const authContext: AuthContextType = {
    ...state,
    login,
    logout,
    refreshToken,
    updateUser,
    setTheme: (theme: Theme) => updateState({ theme }),
    setOrganization: (organization: Organization | null) => updateState({ organization }),
    setMembers: (members: TeamMember[] | null) => updateState({ members }),
    clearError,
    checkSession,
    extendSession,
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
