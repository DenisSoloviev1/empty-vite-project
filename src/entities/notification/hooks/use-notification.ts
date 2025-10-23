import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { notificationApi } from '../api';

import { Notification } from '../model';

export const useNotification = () => {
  const queryClient = useQueryClient();

  const { data: history = [], isLoading } = useQuery({
    queryKey: [notificationApi.baseUrl, 'history'],
    queryFn: (meta) => notificationApi.getHistory({ signal: meta.signal }),
    select: (response) => response.notifications,
  });

  useEffect(() => {
    const handleNotification = (newNotification: Notification) => {
      queryClient.setQueryData(
        [notificationApi.baseUrl, 'history'],
        (old: Notification[] = []) => [...old, newNotification]
      );
    };

    notificationApi.getNotification(handleNotification);

    return () => {
      notificationApi.offNotifications();
    };
  }, []);

  return {
    notifications: history,
    isLoading,
  };
};
