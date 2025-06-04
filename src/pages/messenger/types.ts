import type { ChatItemProps } from '@/components/chat-item/types';
import type { MessageBubbleProps } from '@/components/message-bubble/types';
import type { Props } from '@/core/block/types';

export interface MessengerPageProps extends Props {
  chats: Array<ChatItemProps>;
  activeChatContactName?: string
  activeChatMessages: Array<MessageBubbleProps>;
}
