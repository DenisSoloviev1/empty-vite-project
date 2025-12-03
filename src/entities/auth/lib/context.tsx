import { createContext, useContext } from 'react';

import type { AuthLoginParams } from '../model';
import { User } from '@/entities/user/model';

export interface AuthContextType {
  user: User | null;
  handleLogin: ({ login, password }: AuthLoginParams) => void;
  handleLogout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  return context;
};
