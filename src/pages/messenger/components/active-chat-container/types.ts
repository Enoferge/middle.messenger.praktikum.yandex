import type { MessengerCommonState } from '@/pages/messenger/types';
import type { MessageBubbleProps } from '@/components/message-bubble/types';
import type { Block } from '@/core/block/block';
import type { Props } from '@/core/block/types';
import type { ChatInfo } from '@/api/chats';

export interface ActiveChatContainerProps extends MessengerCommonState, Props {
  activeChatMessages?: Array<MessageBubbleProps>;
  updateUserChat?: (chatId: number, updatedChatInfo: Partial<ChatInfo>) => void;
  clearActiveChat?: () => void;
  showModal?: (content: Block) => void;
  hideModal?: () => void;
}
