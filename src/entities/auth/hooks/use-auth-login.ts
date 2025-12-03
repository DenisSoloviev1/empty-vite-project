import { useMutation } from '@tanstack/react-query';
import { addToast } from '@heroui/toast';

import { authApi } from '../api';
import { setCookie } from '@shared/utils/cookie';

export const useAuthLogin = ({ onSuccess }: { onSuccess?: VoidFunction }) => {
  const mutation = useMutation({
    mutationKey: [authApi.baseKey, 'login'],
    mutationFn: authApi.login,
    onSuccess: (response) => {
      setCookie('userId', response.userId);
      onSuccess?.();
    },
    onError: (error) => {
      addToast({
        title: 'Ошибка авторизации',
        description: error.message ?? 'Проверьте правильность логина и пароля',
        color: 'danger',
      });
    },
  });

  return {
    handleLogin: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
