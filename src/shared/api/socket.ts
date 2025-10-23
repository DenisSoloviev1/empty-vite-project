import { io, Socket } from 'socket.io-client';
// import { getCookie } from '../utils/cookie';

const API_BASE_SOCKET_URL = import.meta.env.VITE_PUBLIC_API_SOCKET_URL;

/**
 * Singleton class for managing WebSocket connections using Socket.IO
 * Provides connection management, message queuing, and room functionality
 */
class SocketInstance {
  private socket: Socket | null = null;
  private static instance: SocketInstance;
  private messageQueue: Array<{
    event: string;
    data?: any;
    callback?: VoidFunction;
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
   * Establishes connection to the WebSocket server
   * If socket doesn't exist, creates new connection with authentication
   * If socket exists but not connected, reconnects
   *
   * @returns {Socket} The connected socket instance
   */
  connect() {
    if (!this.socket) {
      this.socket = io(`${API_BASE_SOCKET_URL}/realtime`, {
        // auth: { token: getCookie('token') },
        autoConnect: false,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 20000,
        withCredentials: true,
        protocols: ['websocket', 'polling'],
      });

      this.socket.on('connect', () => {
        console.log('✅ Socket connected');
        this.flushQueue();
      });

      this.socket.on('disconnect', () => {
        console.log('❌ Socket disconnected');
      });
    }

    if (!this.socket.connected) {
      this.socket.connect();
    }

    return this.socket;
  }

  /**
   * Registers an event listener for the specified event
   * @param {string} event - Event name to listen for
   * @param {Function} callback - Callback function to execute when event is received
   * @template T - Type of the data received in the callback
   */
  on<T>(event: string, callback: (data: T) => void) {
    this.socket?.on(event, callback);
  }

  /**
   * Removes all listeners for the specified event
   * @param {string} event - Event name to remove listeners from
   * @param {Function} callback - Callback function to execute when event is off
   * @template T - Type of the data received in the callback
   */
  off<T>(event: string, callback: (data: T) => void) {
    this.socket?.off(event, callback);
  }

  /**
   * Safely emits an event to the server
   * If socket is not connected, queues the message for later delivery
   * @param {string} event - Event name to emit
   * @param {T} data - Data to send with the event (optional)
   * @param {VoidFunction} callback - Callback function to execute after emission (optional)
   * @template T - Type of the data being emitted
   * ```
   */
  emit<T>(event: string, data?: T, callback?: VoidFunction) {
    const socket = this.connect();

    if (socket.connected) {
      socket.emit(event, data, callback);
    } else {
      this.messageQueue.push({ event, data, callback });
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
   * Disconnects from the WebSocket server and cleans up resources
   */
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  /**
   * Flushes the message queue by sending all queued messages
   * Called automatically when connection is established
   * @private
   */
  private flushQueue() {
    this.messageQueue.forEach(({ event, data, callback }) => {
      this.socket?.emit(event, data, callback);
    });
    this.messageQueue = [];
  }

  /**
   * Cleans up all event listeners and clears the message queue
   * Useful for complete reset of the socket instance
   */
  clear(): void {
    this.socket?.removeAllListeners();
    this.messageQueue = [];
  }
}

/**
 * Singleton instance of SocketInstance
 * Use this instance throughout the application for WebSocket communication
 */
export const socketInstance = SocketInstance.getInstance();
