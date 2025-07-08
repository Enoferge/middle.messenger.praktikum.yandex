import { webSocketService } from '@/core/websocket/websocket';
import type { WebSocketConfig, WebSocketEventHandlers } from '@/core/websocket/types';
import ChatsApi from '@/api/chats';

const chatsApi = new ChatsApi();

export interface ChatWebSocketManager {
  connectToChat(chatId: number, userId: number, handlers: WebSocketEventHandlers): Promise<void>;
  disconnectFromChat(): void;
  sendMessage(content: string): void;
  getOldMessages(offset?: number): void;
  isConnected(): boolean;
}

class ChatWebSocketManagerImpl implements ChatWebSocketManager {
  private currentChatId: number | null = null;

  async connectToChat(chatId: number, userId: number, handlers: WebSocketEventHandlers): Promise<void> {
    try {
      this.disconnectFromChat();

      const response = await chatsApi.getChatToken({ id: chatId });

      if ('token' in response.data) {
        const { token } = response.data;
        console.log('Websocket-chat: token received:', token);

        const config: WebSocketConfig = {
          userId,
          chatId,
          token,
        };

        webSocketService.connect(config, handlers);
        this.currentChatId = chatId;

        console.log(`Websocket-chat: Connected to chat ${chatId}`);
      } else {
        throw new Error('Websocket-chat: failed to get chat token');
      }
    } catch (error) {
      console.error('Websocket-chat: failed to connect to chat ', error);
      throw error;
    }
  }

  disconnectFromChat(): void {
    webSocketService.disconnect();
    this.currentChatId = null;
    console.log('Disconnected from chat WebSocket');
  }

  sendMessage(content: string): void {
    webSocketService.sendMessage(content);
  }

  getOldMessages(offset: number = 0): void {
    webSocketService.getOldMessages(offset);
  }

  isConnected(): boolean {
    return webSocketService.isConnected();
  }

  getCurrentChatId(): number | null {
    return this.currentChatId;
  }
}

export const chatWebSocketManager = new ChatWebSocketManagerImpl();
