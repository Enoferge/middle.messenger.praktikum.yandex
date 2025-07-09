import type { MessengerCommonState } from '@/pages/messenger/types';
import type { MessageBubbleProps } from '@/components/message-bubble/types';
import type { Block } from '@/core/block/block';
import type { Props } from '@/core/block/types';

export interface ActiveChatContainerProps extends MessengerCommonState, Props {
  activeChatMessages?: Array<MessageBubbleProps>;
  updateUserChat?: (chatId: number, updatedChatInfo: Partial<any>) => void;
  clearActiveChat?: () => void;
  showModal?: (content: Block) => void;
  hideModal?: () => void;
}
