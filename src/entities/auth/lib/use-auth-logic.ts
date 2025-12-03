import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { appRouting } from '@app/config';

import { useAuthLogin, useAuthLogout } from '../hooks';

import { getCookie } from '@shared/utils/cookie';
import { useUserMe } from '@/entities/user/hooks';

export const useAuthLogic = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isInitialized, setIsInitialized] = useState(false);

  const { handleLogin, isLoading: isLoginLoading } = useAuthLogin({
    onSuccess: () => navigate(appRouting.main.path, { replace: true }),
  });

  const { handleLogout } = useAuthLogout({
    onSuccess: () => navigate(appRouting.auth.path, { replace: true }),
  });

  const { user, isLoading: isUserLoading, error: errorUserMe } = useUserMe();

  useEffect(() => {
    if (!getCookie('pointId') && !isUserLoading && !isInitialized) {
      setIsInitialized(true);
    } else if (!isUserLoading && user) {
      setIsInitialized(true);
      if (location.pathname === appRouting.auth.path) {
        navigate(appRouting.main.path, { replace: true });
      }
    } else if (errorUserMe) {
      setIsInitialized(true);
    }
  }, [
    user,
    isUserLoading,
    errorUserMe,
    location.pathname,
    navigate,
    isInitialized,
  ]);

  return {
    user: user ?? null,
    handleLogin,
    handleLogout,
    isLoading: isUserLoading || isLoginLoading,
    isInitialized,
  };
};
