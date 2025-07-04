import type { Props } from '@/core/block/types';
import type { ChatListItem } from '@/pages/messenger/types';

export interface ChatItemProps extends ChatListItem, Props {
  onClickChatItem?: (id: string) => void;
}
