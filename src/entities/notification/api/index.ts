import { apiInstance } from '@/shared/api/instance';
import { socketInstance } from '@/shared/api/socket';
import {
  NotificationHistoryParams,
  NotificationHistoryResponse,
} from '../model/types';

class NotificationApi {
  readonly baseUrl = 'notification';
  private static instance: NotificationApi;
  socket = socketInstance.connect();

  static getInstance(): NotificationApi {
    if (!NotificationApi.instance) {
      NotificationApi.instance = new NotificationApi();
    }

    return NotificationApi.instance;
  }

  getHistory({ signal }: NotificationHistoryParams) {
    return apiInstance<NotificationHistoryResponse>({
      path: `${this.baseUrl}/history`,
      signal,
    });
  }

  getNotification<T>(callback: (data: T) => void) {
    // this.socket.emit('notification:get', callback);
    this.socket.on('notification', callback);
  }

  offNotifications() {
    this.socket.off('notification');
  }
}

export const notificationApi = NotificationApi.getInstance();
