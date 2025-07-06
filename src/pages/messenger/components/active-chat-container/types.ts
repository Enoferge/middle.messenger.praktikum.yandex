import type { GetChatsResponseData } from '@/api/chats';
import type { MessageBubbleProps } from '@/components/message-bubble/types';
import type { Block } from '@/core/block/block';
import type { Props } from '@/core/block/types';

export interface ActiveChatContainerProps extends Props {
  activeChat?: GetChatsResponseData;
  activeChatMessages?: Array<MessageBubbleProps>;
  onActiveChatUpdate?: () => void;
  showModal?: (content: Block) => void
  hideModal?: () => void
}
