import type { MessageBubbleProps } from '@/components/message-bubble/types';

export interface WebSocketMessage {
  content: string;
  type: 'message' | 'get old' | 'ping' | 'pong';
  id?: number;
  time?: string;
  user_id?: number;
}

export interface WebSocketConfig {
  userId: number;
  chatId: number;
  token: string;
}

export type WebSocketEventHandlers = {
  onMessage?: (message: MessageBubbleProps) => void;
  onOldMessages?: (messages: MessageBubbleProps[]) => void;
  onOpen?: () => void;
  onClose?: (event: CloseEvent) => void;
  onError?: (event: Event) => void;
};
