import { io, Socket } from 'socket.io-client';
// import { getCookie } from '../utils/cookie';

const API_BASE_URL = import.meta.env.VITE_PUBLIC_API_URL;

/**
 * Singleton class for managing WebSocket connections using Socket.IO
 * Provides connection management, message queuing, and room functionality
 */
class SocketInstance {
  private socket: Socket | null = null;
  private static instance: SocketInstance;
  private maxQueueSize = 100;
  private queueTimeoutMs = 5 * 60 * 1000;
  private messageQueue: Array<{
    event: string;
    data?: any;
    callback?: (arg: any) => void;
    timestamp: number;
  }> = [];

  /**
   * Gets the singleton instance of SocketInstance
   * @returns {SocketInstance} The singleton instance
   */
  static getInstance(): SocketInstance {
    if (!SocketInstance.instance) {
      SocketInstance.instance = new SocketInstance();
    }

    return SocketInstance.instance;
  }

  /**
   * Subscribes to a specific socket event
   *
   * @template T - The expected data type for the event
   * @param {string} event - The event name to subscribe to
   * @param {(data: T) => void} callback - Callback function that receives parsed event data
   * @returns {VoidFunction} Unsubscribe function - call to remove the event listener
   */
  subscribe<T>(event: string, callback: (data: T) => void) {
    this.connect();

    if (this.socket) {
      this.socket.on(event, callback);
    }

    return () => {
      if (this.socket) {
        this.socket.off(event, callback);
      }
    };
  }

 /**
   * Safely emits an event to the server
   * If socket is not connected, queues the message for later delivery
   * @template T - Type of the data being emitted
   * @param {string} event - Event name to emit
   * @param {T} data - Data to send with the event (optional)
   * @param {VoidFunction} callback - Callback function to execute after emission (optional)
   */
  emit<T>(event: string, data?: T, callback?: (arg: any) => void) {
    this.connect();

    if (this.socket?.connected) {
      this.socket.emit(event, data, callback);
    } else {
      if (this.messageQueue.length >= this.maxQueueSize) {
        this.messageQueue.shift();
      }
      this.messageQueue.push({
        event,
        data,
        callback,
        timestamp: Date.now(),
      });
    }
  }

  /**
   * Joins a specific room on the server
   * @param {string} roomId - Room identifier to join
   */
  joinRoom(roomId: string) {
    if (this.socket) {
      this.socket.emit('room:join', { roomId });
    }
  }

  /**
   * Leaves a specific room on the server
   * @param {string} roomId - Room identifier to leave
   */
  leaveRoom(roomId: string) {
    if (this.socket) {
      this.socket.emit('room:leave', { roomId });
    }
  }

  /**
   * Closes from the socket server and cleans up resources
   */
  close() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  /**
   * Cleans up all event listeners and clears the message queue
   * Useful for complete reset of the socket instance
   */
  clear(): void {
    this.socket?.removeAllListeners();
    this.messageQueue = [];
  }

  /**
   * Establishes connection to the socket server
   *
   * @returns {Socket} The socket instance
   * @private
   */
  private connect() {
    if (!this.socket) {
      this.socket = io(`${API_BASE_URL}`, {
        // auth: { token: getCookie('token') },
        path: '/realtime',
        reconnectionAttempts: 10,
        reconnectionDelay: 3000,
        reconnectionDelayMax: 30000,
        randomizationFactor: 0.5,
        withCredentials: true,
        transports: ['websocket', 'polling'],
      });

      this.socket.on('connect_error', (err) => {
        console.error('Connect error:', err.message);
      });

      this.socket.on('connect', () => {
        console.log('✅ Socket connected');
        this.flushQueue();
      });

      this.socket.on('reconnect_failed', () => {
        console.error('❌ Reconnect failed after 10 attempts');
        this.close();
      });

      this.socket.on('disconnect', () => {
        console.log('❌ Socket disconnected');
      });
    }
  }

  /**
   * Flushes the message queue by sending all queued messages
   * Called automatically when connection is established
   * @private
   */
  private flushQueue() {
    this.messageQueue = this.messageQueue.filter(
      (message) => Date.now() - message.timestamp < this.queueTimeoutMs,
    );
    this.messageQueue.forEach(({ event, data, callback }) => {
      this.socket?.emit(event, data, callback);
    });
    this.messageQueue = [];
  }
}

/**
 * Singleton instance of SocketInstance
 * Use this instance throughout the application for WebSocket communication
 */
export const socketInstance = SocketInstance.getInstance();
