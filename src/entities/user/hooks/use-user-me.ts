import { useQuery } from '@tanstack/react-query';

import { userApi } from '../api';
import { getCookie } from '@shared/utils/cookie';

export const useUserMe = () => {
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [userApi.baseKey, 'me', getCookie('userId')],
    queryFn: ({ signal }) => userApi.me({ signal }),
    enabled: !!getCookie('ppsId'),
  });

  return {
    user,
    isLoading,
    error,
    refetch,
  };
};
