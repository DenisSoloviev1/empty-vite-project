import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';

import { appRouting } from '../config';

import { userApi } from '@/entities/user/api/user.api';
import { AuthLoginParams, User } from '@/entities/user/model/types';

import { getCookie, setCookie } from '@/shared/utils/cookie';

import { Spinner } from '@heroui/react';

type LoginOptions = AuthLoginParams;

interface AuthContextType {
  user: User | null;
  login: (loginData: LoginOptions) => void;
  logout: VoidFunction;
  isLoading: boolean;
  error: Error | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = new QueryClient();

  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const {
    data: userData,
    isLoading: isUserLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: [
      userApi.baseKey,
      userApi.auth.baseKey,
      'me',
      getCookie('accessToken'),
    ],
    queryFn: userApi.auth.me,
    // select:(response) => response.user
    enabled: !!getCookie('accessToken'), //
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (!getCookie('accessToken') && !isUserLoading && !isInitialized) {
      setUser(null);
      setIsInitialized(true);
    } else if (isSuccess && userData) {
      setUser(userData);
      setIsInitialized(true);
      if (location.pathname === appRouting.auth.path) {
        navigate(appRouting.main.path, { replace: true });
      }
    } else if (isError) {
      setUser(null);
      setIsInitialized(true);
    }
  }, [isSuccess, isError, userData]);

  const createAuthMutation = useMutation({
    mutationKey: [userApi.baseKey, userApi.auth.baseKey, 'login'],
    mutationFn: userApi.auth.login,
    onSuccess: (user) => {
      setUser(user);
      setCookie('accessToken', user.accessToken);
      navigate(appRouting.main.path, { replace: true });
    },
    onError: (err) => {
      console.error('Ошибка авторизации:', err);
    },
  });

  const login = ({ login, password, signal }: LoginOptions) => {
    createAuthMutation.mutate({ login, password, signal });
  };

  const logout = () => {
    setUser(null);
    setIsInitialized(false);
    setCookie('accessToken', '', -1);
    queryClient.removeQueries({ queryKey: ['user'] });
    navigate(appRouting.auth.path, { replace: true });
  };

  if (!isInitialized) {
    return (
      <div className='flex h-[100vh] w-full items-center justify-center'>
        <Spinner label='Загрузка ...' />
      </div>
    );
  }

  const value = {
    user,
    login,
    logout,
    isLoading: isUserLoading || createAuthMutation.isPending,
    error: createAuthMutation.error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
