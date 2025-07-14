import type { Props } from '@/core/block/types';
import type { ChatListItem } from '@/types/messenger';

export interface ChatItemProps extends ChatListItem, Props {
  onClickChatItem?: (id: string) => void;
}
