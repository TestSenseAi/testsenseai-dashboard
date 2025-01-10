import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, User } from '../types/auth';
import { addHours, isAfter } from 'date-fns';

const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_DURATION_HOURS = 1;
const SESSION_DURATION_HOURS = 24;

interface AuthStore extends AuthState {
  login: (user: User, token: string, rememberMe?: boolean) => void;
  logout: () => void;
  refreshToken: (token: string) => void;
  updateUser: (userData: Partial<User>) => void;
  incrementLoginAttempts: () => void;
  resetLoginAttempts: () => void;
  checkLockStatus: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      loginAttempts: 0,
      isLocked: false,

      login: (user: User, token: string, rememberMe = false) => {
        const sessionExpiry = addHours(
          new Date(),
          rememberMe ? SESSION_DURATION_HOURS * 7 : SESSION_DURATION_HOURS
        ).toISOString();

        set({
          user: {
            ...user,
            lastLogin: new Date().toISOString(),
          },
          token,
          isAuthenticated: true,
          sessionExpiry,
          loginAttempts: 0,
          isLocked: false,
          lockUntil: undefined,
        });
      },

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          sessionExpiry: undefined,
        }),

      refreshToken: (token: string) => set({ token }),

      updateUser: (userData: Partial<User>) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),

      incrementLoginAttempts: () => {
        const currentAttempts = get().loginAttempts + 1;
        if (currentAttempts >= MAX_LOGIN_ATTEMPTS) {
          set({
            isLocked: true,
            lockUntil: addHours(new Date(), LOCK_DURATION_HOURS).toISOString(),
            loginAttempts: currentAttempts,
          });
        } else {
          set({ loginAttempts: currentAttempts });
        }
      },

      resetLoginAttempts: () =>
        set({
          loginAttempts: 0,
          isLocked: false,
          lockUntil: undefined,
        }),

      checkLockStatus: () => {
        const state = get();
        if (!state.isLocked || !state.lockUntil) return false;

        if (isAfter(new Date(), new Date(state.lockUntil))) {
          set({
            isLocked: false,
            lockUntil: undefined,
            loginAttempts: 0,
          });
          return false;
        }
        return true;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        sessionExpiry: state.sessionExpiry,
        loginAttempts: state.loginAttempts,
        isLocked: state.isLocked,
        lockUntil: state.lockUntil,
      }),
    }
  )
);
