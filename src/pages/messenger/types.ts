import type { ChatItemProps } from '@/components/chat-item/types';
import type { MessageBubbleProps } from '@/components/message-bubble/types';
import type { Props } from '@/core/block/types';

export interface MessengerPageProps extends Props {
  activeChatName?: string;
  activeChatMessages?: Array<MessageBubbleProps>;
}

export interface MessengerPageState {
  userChats?: Array<ChatItemProps>;
}

export type MessengerPageContext = MessengerPageProps & MessengerPageState;