import type { MessageContent, WebSocketConfig, WebSocketEventHandlers, WebSocketMessage } from './types';

class WebSocketService {
  private socket: WebSocket | null = null;

  private config: WebSocketConfig | null = null;

  private eventHandlers: WebSocketEventHandlers = {};

  constructor() {
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  connect(config: WebSocketConfig, handlers: WebSocketEventHandlers = {}): void {
    this.config = config;
    this.eventHandlers = handlers;

    const url = `wss://ya-praktikum.tech/ws/chats/${config.userId}/${config.chatId}/${config.token}`;
    console.log('Websocket: connecting URL ', url);

    try {
      this.socket = new WebSocket(url);
      this.setupEventListeners();
    } catch (error) {
      console.error('WebSocket: error while connecting: ', error);
      this.eventHandlers.onError?.(error as Event);
    }
  }

  private setupEventListeners(): void {
    if (!this.socket) {
      return;
    }

    this.socket.addEventListener('open', this.handleOpen);
    this.socket.addEventListener('close', this.handleClose);
    this.socket.addEventListener('message', this.handleMessage);
    this.socket.addEventListener('error', this.handleError);
  }

  private handleOpen(): void {
    console.log('WebSocket: connection established');
    this.eventHandlers.onOpen?.();
  }

  private handleClose(event: CloseEvent): void {
    console.log('WebSocket: connection closed');

    this.eventHandlers.onClose?.(event);
  }

  private handleMessage(event: MessageEvent): void {
    const rawData = event.data;

    if (typeof rawData === 'string' && !rawData.startsWith('{') && !rawData.startsWith('[')) {
      console.log('WebSocket: received not-JSON text message ', rawData);

      return;
    }

    try {
      const data = JSON.parse(rawData);
      console.log('WebSocket: received JSON message ', data);

      if (Array.isArray(data)) {
        const messages = data.map((msg) => ({
          id: msg.id?.toString() || '',
          text: msg.content,
          time: msg.time || new Date().toISOString(),
          isIncoming: msg.user_id !== this.config?.userId,
        }));

        this.eventHandlers.onOldMessages?.(messages);
        return;
      }

      if (data.type === 'message') {
        const message: MessageContent = {
          id: data.id?.toString() || '',
          text: data.content,
          time: data.time || new Date().toISOString(),
          isIncoming: data.user_id !== this.config?.userId,
          userId: data.user_id,
        };

        this.eventHandlers.onMessage?.(message);
      } else if (data.type === 'pong') {
        console.log('WebSocket: pong received');
      }
    } catch (error) {
      console.error('WebSocket: failed to parse message as JSON:', error);
    }
  }

  private handleError(event: Event): void {
    console.error('WebSocket error:', event);
    this.eventHandlers.onError?.(event);
  }

  sendMessage(content: string): void {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.error('WebSocket: trying to sendMessage - socket is not connected');
      return;
    }

    const message: WebSocketMessage = {
      content,
      type: 'message',
    };

    try {
      this.socket.send(JSON.stringify(message));
      console.log('WebSocket: message sent:', message);
    } catch (error) {
      console.error('WebSocket: failed to send message:', error);
    }
  }

  getOldMessages(offset: number = 0): void {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.error('WebSocket: trying to getOldMessages - socket is not connected');

      return;
    }

    const message: WebSocketMessage = {
      content: offset.toString(),
      type: 'get old',
    };

    try {
      this.socket.send(JSON.stringify(message));
      console.log('WebSocket: get old messages request sent ', message);
    } catch (error) {
      console.error('WebSocket: failed to get old messages ', error);
    }
  }

  ping(): void {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      return;
    }

    const message: WebSocketMessage = {
      content: '',
      type: 'ping',
    };

    try {
      this.socket.send(JSON.stringify(message));
    } catch (error) {
      console.error('WebSocket: failed to send ping ', error);
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.removeEventListener('open', this.handleOpen);
      this.socket.removeEventListener('close', this.handleClose);
      this.socket.removeEventListener('message', this.handleMessage);
      this.socket.removeEventListener('error', this.handleError);

      if (this.socket.readyState === WebSocket.OPEN) {
        this.socket.close(1000, 'User disconnected');
      }

      this.socket = null;
    }

    this.config = null;
    this.eventHandlers = {};
  }

  isConnected(): boolean {
    return this.socket?.readyState === WebSocket.OPEN;
  }

  getConnectionState() {
    if (!this.socket) {
      return 'disconnected';
    }

    switch (this.socket.readyState) {
      case WebSocket.CONNECTING:
        return 'connecting';
      case WebSocket.OPEN:
        return 'connected';
      case WebSocket.CLOSING:
        return 'closing';
      case WebSocket.CLOSED:
        return 'closed';
      default:
        return 'unknown';
    }
  }
}

export const webSocketService = new WebSocketService();
