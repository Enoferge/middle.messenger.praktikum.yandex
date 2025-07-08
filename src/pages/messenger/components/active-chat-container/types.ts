import type { ChatInfo } from '@/api/chats';
import type { MessageBubbleProps } from '@/components/message-bubble/types';
import type { Block } from '@/core/block/block';
import type { Props } from '@/core/block/types';
import type { UserInfo } from '@/pages/profile-settings/types';

export interface ActiveChatContainerProps extends Props {
  user?: UserInfo | null
  activeChat?: ChatInfo;
  activeChatMessages?: Array<MessageBubbleProps>;
  onActiveChatUpdate?: () => void;
  showModal?: (content: Block) => void
  hideModal?: () => void
}
