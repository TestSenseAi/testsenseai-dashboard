import { create } from 'zustand';
import type { AuthState, User } from '../types/auth';

interface AuthStore extends AuthState {
  login: (user: User, token: string) => void;
  logout: () => void;
  refreshToken: (token: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  token: null,
  login: (user: User, token: string) => {
    set({ user, token, isAuthenticated: true });
  },
  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
  },
  refreshToken: (token: string) => {
    set({ token });
  },
}));
