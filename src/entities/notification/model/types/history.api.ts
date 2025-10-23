export type NotificationHistoryParams = {
  signal: AbortSignal;
};

export type NotificationHistoryResponse = {
  notifications: {
    id: string;
    title: string;
    message: string;
    timestamp: number;
  }[];
};
