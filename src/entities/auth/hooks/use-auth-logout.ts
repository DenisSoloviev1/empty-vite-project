import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToast } from '@heroui/toast';

import { authApi } from '../api';
import { setCookie } from '@shared/utils/cookie';

export const useAuthLogout = ({ onSuccess }: { onSuccess?: VoidFunction }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [authApi.baseKey, 'logout'],
    mutationFn: authApi.logout,
    onSuccess: () => {
      setCookie('coockieName', '', -1); // удаление кук
      queryClient.invalidateQueries({ queryKey: [authApi.baseKey] });
      onSuccess?.();
    },
    onError: (error) => {
      addToast({
        title: 'Не удалось выйти из аккаунта',
        description: error.message,
        color: 'danger',
      });
    },
  });

  return {
    handleLogout: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
